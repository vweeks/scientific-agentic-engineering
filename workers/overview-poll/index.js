// sae-overview-poll — backend for the "Where people stand" sliders on the
// overview page. Two routes: POST /response, GET /aggregate.
//
// Privacy design: the client sends four integers (0–100). The caller's IP is
// used only to compute a rate-limit key — HMAC(secret, day + ip) — so the raw
// IP is never stored and keys cannot be correlated across days. Rate limit is
// intentionally a cap per day, not unique-forever: institutional NAT means one
// IP can be a whole lab.

const ALLOWED_ORIGINS = [
  'https://vweeks.github.io',
  'http://localhost:4321', // astro dev
  'http://localhost:4322',
];

const MAX_PER_DAY = 3;
// Axis names live in four places — AXES here, the AVG list in aggregate(),
// schema.sql, and pollAxes in src/pages/overview.astro. Keep them in sync:
// an axis missing from the SQL surfaces as a silent null, not an error.
const AXES = ['familiarity', 'adoption', 'skepticism', 'overwhelm'];

// Per-isolate aggregate memo: the Cache API is unavailable on workers.dev,
// so this is the layer that actually keeps /aggregate from hitting D1 on
// every request in production.
let aggMemo = { body: null, ts: 0 };

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function json(data, status, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
  });
}

async function ipDayHash(secret, ip) {
  const day = new Date().toISOString().slice(0, 10);
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`${day}|${ip}`));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function aggregate(db) {
  const row = await db.prepare(
    `SELECT COUNT(*) AS n,
            AVG(familiarity) AS familiarity, AVG(adoption) AS adoption,
            AVG(skepticism) AS skepticism, AVG(overwhelm) AS overwhelm
     FROM responses`,
  ).first();
  const averages = {};
  for (const axis of AXES) averages[axis] = row.n ? Math.round(row[axis]) : null;
  return { count: row.n, averages };
}

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeaders(request);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (!env.POLL_SALT_KEY) {
      return json({ error: 'service not configured' }, 503, cors);
    }

    if (request.method === 'GET' && url.pathname === '/aggregate') {
      // Layered, best-effort caching: per-isolate memo first, then the Cache
      // API (stored without CORS headers, re-decorated per request; a no-op
      // on workers.dev), then D1.
      const headers = { 'Cache-Control': 'public, max-age=60', ...cors };
      if (aggMemo.body && Date.now() - aggMemo.ts < 60_000) {
        return json(aggMemo.body, 200, headers);
      }
      let body = null;
      const cacheKey = new Request(`${url.origin}/aggregate`);
      try {
        const cached = await caches.default.match(cacheKey);
        if (cached) body = await cached.json();
      } catch { /* fall through to direct query */ }
      if (!body) {
        body = await aggregate(env.DB);
        try {
          ctx.waitUntil(
            caches.default.put(cacheKey, json(body, 200, { 'Cache-Control': 'public, max-age=60' })).catch(() => {}),
          );
        } catch { /* cache unavailable; serve uncached */ }
      }
      aggMemo = { body, ts: Date.now() };
      return json(body, 200, headers);
    }

    if (request.method === 'POST' && url.pathname === '/response') {
      if (Number(request.headers.get('Content-Length') ?? 0) > 1024) {
        return json({ error: 'body too large' }, 413, cors);
      }
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: 'invalid JSON' }, 400, cors);
      }
      const values = {};
      for (const axis of AXES) {
        const v = body?.[axis];
        if (!Number.isInteger(v) || v < 0 || v > 100) {
          return json({ error: `${axis} must be an integer 0-100` }, 400, cors);
        }
        values[axis] = v;
      }

      const ip = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
      const hash = await ipDayHash(env.POLL_SALT_KEY, ip);
      const { c } = await env.DB.prepare(
        'SELECT COUNT(*) AS c FROM responses WHERE ip_day_hash = ?',
      ).bind(hash).first();
      if (c >= MAX_PER_DAY) {
        return json({ error: 'daily limit reached' }, 429, cors);
      }

      await env.DB.prepare(
        `INSERT INTO responses (familiarity, adoption, skepticism, overwhelm, ip_day_hash)
         VALUES (?, ?, ?, ?, ?)`,
      ).bind(values.familiarity, values.adoption, values.skepticism, values.overwhelm, hash).run();

      // The response is stored at this point. The aggregate refresh is a
      // nicety, not a condition of success — if it fails, still report ok,
      // or the user will be told "not recorded" about a recorded row and
      // retry into a double count.
      let agg = {};
      try {
        agg = await aggregate(env.DB);
        aggMemo = { body: agg, ts: Date.now() };
      } catch { /* widget tolerates a missing aggregate */ }
      return json({ ok: true, ...agg }, 200, cors);
    }

    return json({ error: 'not found' }, 404, cors);
  },
};
