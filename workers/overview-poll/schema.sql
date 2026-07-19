-- Schema for the sae-overview-poll D1 database.
-- Applied 2026-07-18; kept here so the database can be recreated.

CREATE TABLE IF NOT EXISTS responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Day granularity on purpose: a second-precision timestamp would let poll
  -- rows be joined against invocation logs; the day alone cannot.
  created_at TEXT NOT NULL DEFAULT (date('now')),
  familiarity INTEGER NOT NULL CHECK (familiarity BETWEEN 0 AND 100),
  adoption INTEGER NOT NULL CHECK (adoption BETWEEN 0 AND 100),
  skepticism INTEGER NOT NULL CHECK (skepticism BETWEEN 0 AND 100),
  overwhelm INTEGER NOT NULL CHECK (overwhelm BETWEEN 0 AND 100),
  ip_day_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_responses_iphash ON responses(ip_day_hash);
