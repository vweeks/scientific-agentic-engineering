-- Schema for the sae-overview-poll D1 database.
-- Applied 2026-07-18; kept here so the database can be recreated.
-- Revised 2026-07-20: skepticism -> trust, overwhelm -> keepingup, added phase.
--   The live DB (empty at revision time) was migrated in place with:
--     ALTER TABLE responses RENAME COLUMN skepticism TO trust;
--     ALTER TABLE responses RENAME COLUMN overwhelm TO keepingup;
--     ALTER TABLE responses ADD COLUMN phase TEXT NOT NULL DEFAULT 'before';
--   ALTER ADD COLUMN cannot attach the phase CHECK, so on the migrated DB the
--   'before'|'after' enum is enforced by the worker. A fresh DB from this file
--   gets the CHECK too.

CREATE TABLE IF NOT EXISTS responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Day granularity on purpose: a second-precision timestamp would let poll
  -- rows be joined against invocation logs; the day alone cannot.
  created_at TEXT NOT NULL DEFAULT (date('now')),
  -- 'before' = baseline sentiment (overview page); 'after' = post-engagement
  -- (a later placement at the end of a tutorial/workshop). Compared as two
  -- populations, never as paired individuals — the poll stores no per-person id.
  phase TEXT NOT NULL DEFAULT 'before' CHECK (phase IN ('before', 'after')),
  familiarity INTEGER NOT NULL CHECK (familiarity BETWEEN 0 AND 100),
  adoption INTEGER NOT NULL CHECK (adoption BETWEEN 0 AND 100),
  keepingup INTEGER NOT NULL CHECK (keepingup BETWEEN 0 AND 100),
  trust INTEGER NOT NULL CHECK (trust BETWEEN 0 AND 100),
  ip_day_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_responses_iphash ON responses(ip_day_hash);
CREATE INDEX IF NOT EXISTS idx_responses_phase ON responses(phase);
