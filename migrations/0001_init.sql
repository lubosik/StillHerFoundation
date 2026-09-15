-- 0001_init.sql
-- The StillHer Foundation: initial D1 schema.
--
-- PII policy: every table stores ip_hash, a salted SHA-256 of the client IP.
-- The raw IP is never stored or logged. See docs/BACKEND.md.
--
-- Rollback (manual, run in reverse order if this migration must be undone):
--   DROP TABLE IF EXISTS rate_limits;
--   DROP TABLE IF EXISTS interest_registrations;
--   DROP TABLE IF EXISTS inquiries;
--   DROP TABLE IF EXISTS her_future_submissions;
--   DROP TABLE IF EXISTS subscribers;

-- 1. Newsletter / updates signups. Repeat signups are idempotent (UNIQUE on email).
CREATE TABLE IF NOT EXISTS subscribers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT    NOT NULL,
  source      TEXT    NOT NULL,
  ip_hash     TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscribers_email      ON subscribers (email);
CREATE INDEX        IF NOT EXISTS idx_subscribers_created_at ON subscribers (created_at);

-- 2. Her Future discovery call requests.
--    answers is a JSON object of enum-only answers. This table must never hold
--    income, assets, net worth, salary or account balance information.
CREATE TABLE IF NOT EXISTS her_future_submissions (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  pillar               TEXT    NOT NULL,
  answers              TEXT    NOT NULL,
  notes                TEXT,
  name                 TEXT    NOT NULL,
  email                TEXT    NOT NULL,
  phone                TEXT,
  disclaimer_accepted  INTEGER NOT NULL DEFAULT 0,
  ip_hash              TEXT,
  created_at           TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_her_future_created_at ON her_future_submissions (created_at);
CREATE INDEX IF NOT EXISTS idx_her_future_pillar     ON her_future_submissions (pillar);

-- 3. Press, partnership, speaker and event inquiries.
CREATE TABLE IF NOT EXISTS inquiries (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  org         TEXT,
  message     TEXT,
  ip_hash     TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_type       ON inquiries (type);

-- 4. Register-your-interest for The Good Weekend and Her Relief Retreat.
CREATE TABLE IF NOT EXISTS interest_registrations (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  event       TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  role        TEXT,
  ip_hash     TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_interest_created_at ON interest_registrations (created_at);
CREATE INDEX IF NOT EXISTS idx_interest_event      ON interest_registrations (event);

-- 5. Per-IP, per-route rate limiting in fixed 10 minute windows.
--    window_start is the unix epoch second at which the window began.
--    Rows older than one hour are pruned opportunistically by the Worker.
CREATE TABLE IF NOT EXISTS rate_limits (
  ip_hash       TEXT    NOT NULL,
  route         TEXT    NOT NULL,
  window_start  INTEGER NOT NULL,
  count         INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (ip_hash, route, window_start)
);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start ON rate_limits (window_start);
