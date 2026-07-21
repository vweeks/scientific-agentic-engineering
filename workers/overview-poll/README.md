# sae-overview-poll

Cloudflare Worker + D1 backend for the "Where people stand" sliders on the
site's overview page. The static site lives on GitHub Pages; this is the one
standing service beside it.

## Endpoints

- `POST /response` — body `{phase, familiarity, adoption, keepingup, trust}`;
  the four axes are integers 0–100, `phase` is `"before"` or `"after"`
  (defaults to `"before"` if omitted). Returns `{ok, phases}`. `429` after
  three responses from one rate-limit key in a day.
- `GET /aggregate` — `{phases: {before, after}}`, each `{count, averages}`
  (per-axis averages are `null` until that phase has a response). Edge-cached
  60 seconds.

`phase` splits responses into two populations — `before` (baseline sentiment,
the overview page) and `after` (a later post-engagement placement). No
per-person id is stored, so individuals are never paired across phases; the
comparison is population-to-population.

CORS is allowlisted to `https://vweeks.github.io` and localhost dev ports.

## Privacy design

- Stored per response: four integers, the arrival day (deliberately not the
  time — second precision would be joinable against invocation logs), and a
  rate-limit key.
- The rate-limit key is `HMAC-SHA-256(POLL_SALT_KEY, "<YYYY-MM-DD>|<ip>")` —
  the raw IP is never stored, and keys cannot be joined across days against
  a database-only leak (whoever holds the secret could recompute keys, so
  guard the secret like the data).
- The limit is a daily cap (3/day), not unique-forever, deliberately:
  institutional NAT means one IP can be an entire lab.

## Operations

```sh
npx wrangler deploy                      # deploy from this directory
npx wrangler secret put POLL_SALT_KEY    # rotate the HMAC secret
npx wrangler d1 execute sae-overview-poll --remote --file=schema.sql
```

The Worker returns `503 service not configured` if `POLL_SALT_KEY` is unset.
The overview page hides the widget whenever `/aggregate` is unreachable, so
this service can be torn down at any time without breaking the site.

## Sunset

Project infrastructure question to revisit at fellowship end (April 2027):
keep, freeze (display final numbers statically and delete the Worker + DB),
or remove the widget. Decision deliberately deferred; nothing else depends on
this service.
