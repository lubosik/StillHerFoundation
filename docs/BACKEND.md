# StillHer Foundation: Backend

The site is a static Astro build served by Cloudflare Workers Static Assets. A
single Worker (`worker.js`) runs in front of it for two jobs only:

1. The JSON API under `/api/*`.
2. 301 redirects for the seven legacy `.html` URLs from the previous site.

Every other request is served directly from `dist/` and never invokes the
Worker. There is no framework and no runtime dependency.

Files owned by the backend:

| File                   | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `worker.js`            | Worker entry point, API, redirects        |
| `wrangler.jsonc`       | Worker, assets and D1 configuration       |
| `migrations/*.sql`     | D1 schema, applied with `wrangler d1`     |
| `.dev.vars.example`    | Documented env vars for local dev         |
| `docs/BACKEND.md`      | This document                             |

## How routing works

`wrangler.jsonc` sets `assets.run_worker_first` to:

```
/api/*
/index.html
/the-tradegy.html
/her-road.html
/who-is-lia.html
/film.html
/mission.html
/press.html
```

Only those paths reach the Worker. Static Assets serves everything else on
its own, so page loads never pay for a Worker invocation.

The legacy `.html` paths are listed explicitly because `run_worker_first`
is scoped to `/api/*` by default. Without them, Static Assets would serve
`/index.html` from `dist/` (or 404 the others) and the Worker would never see
the request. If a new legacy path needs a redirect, add it to BOTH
`LEGACY_REDIRECTS` in `worker.js` AND `run_worker_first` in `wrangler.jsonc`.

Redirects (all 301):

| From                 | To                                   |
| -------------------- | ------------------------------------ |
| `/index.html`        | `/road-to-her-smile`                 |
| `/the-tradegy.html`  | `/road-to-her-smile/the-tragedy`     |
| `/her-road.html`     | `/road-to-her-smile/her-road`        |
| `/who-is-lia.html`   | `/road-to-her-smile/who-is-lia`      |
| `/film.html`         | `/road-to-her-smile#partnerships`    |
| `/mission.html`      | `/about`                             |
| `/press.html`        | `/partnerships`                      |

`not_found_handling` is `404-page`, so an unknown path serves `dist/404.html`
with a 404 status. The frontend must ship a `src/pages/404.astro`.

## API

### Common behaviour (every route)

- Method: `POST` only. Anything else returns `405` with `Allow: POST, OPTIONS`.
  `OPTIONS` returns `204` for CORS preflight.
- `Content-Type` must start with `application/json`, otherwise `415`.
- Body is capped at 16 KB. Larger bodies return `413`, whether or not a
  `Content-Length` header is present.
- Malformed JSON or a non-object body returns `400`.
- Every string is trimmed, length-capped and rejected if it contains control
  characters or null bytes. Multiline fields (`message`, `notes`) allow tab,
  LF and CR only.
- Email is validated against a strict pattern, capped at 254 characters and
  stored lowercased.
- Honeypot: if the `website` field is present and non-empty the Worker
  returns `200 { ok: true }` and writes nothing. The response is identical to
  a real success so bots learn nothing.
- Turnstile: see below.
- Rate limit: 5 requests per IP per route per 10 minutes. Excess returns
  `429` with a `Retry-After` header (seconds until the window resets).
- Response body is always JSON: `{ ok: true }` or
  `{ ok: false, error: "<safe message>" }`. Error messages are written for
  display to the visitor. Stack traces, SQL and internal messages are never
  returned.
- Every API response carries `X-Content-Type-Options: nosniff`,
  `Cache-Control: no-store`, `Referrer-Policy: strict-origin-when-cross-origin`
  and an `X-Request-Id` (a UUID that also appears in the log line).
- Any unexpected error is caught and returned as a generic `500`.

Field limits:

| Field     | Max length |
| --------- | ---------- |
| email     | 254        |
| name      | 120        |
| org       | 160        |
| message   | 4000       |
| notes     | 2000       |
| phone     | 32         |
| source    | 64         |

Status codes used: `200`, `204`, `400`, `403`, `404`, `405`, `413`, `415`,
`429`, `500`.

### CORS

Allowed origins:

- The request's own origin (same-origin form posts).
- `https://stillherfoundation.org` and `https://www.stillherfoundation.org`
- `https://stillher-foundation.<anything>.workers.dev` (including preview
  aliases like `stillher-foundation-<branch>.<account>.workers.dev`)
- `http://localhost:<port>` and `http://127.0.0.1:<port>` for local dev

A request with any other `Origin` header gets `403`. Requests with no
`Origin` header (curl, server-to-server) are allowed through; browsers always
send one. No wildcard is used.

### `POST /api/subscribe`

Request:

```json
{ "email": "her@example.com", "source": "footer", "website": "", "turnstileToken": "..." }
```

- `email` required.
- `source` required, max 64. Free-form label of where the signup came from
  (e.g. `footer`, `road-to-her-smile`, `support`).

Repeat signups with the same email return `200` and do not create a second
row (UNIQUE index on `subscribers.email`).

### `POST /api/her-future`

Request:

```json
{
  "pillar": "iul",
  "answers": {
    "has_iul_policy": "no"
  },
  "notes": "Prefer afternoons.",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1 (555) 010-2020",
  "disclaimerAccepted": true,
  "website": "",
  "turnstileToken": "..."
}
```

- `pillar` required, one of `iul`, `business_insurance`, `annuities`,
  `retirement`.
- `answers` required, an object containing EXACTLY the keys for that pillar
  (no extras, none missing). Every value must be one of the listed options.
  Free text is not accepted inside `answers`.
- `notes` optional, max 2000, multiline.
- `name` required, max 120.
- `email` required.
- `phone` optional, max 32, digits/spaces/`+()-.` only.
- `disclaimerAccepted` must be boolean `true` (the string `"true"` is
  rejected).

Answer schemas per pillar. These are deliberately minimal: the funnel books a
discovery call, it does not profile the visitor. The frontend must render
exactly these questions with exactly these values, and nothing else. Adding a
question requires sign-off from the foundation.

| Pillar               | Key                      | Options      | Question on the form                          |
| -------------------- | ------------------------ | ------------ | --------------------------------------------- |
| `iul`                | `has_iul_policy`         | `yes`, `no`  | "Do you currently have an IUL policy?"        |
| `business_insurance` | `has_business_insurance` | `yes`, `no`  | "Do you currently have business insurance?"   |
|                      | `happy_with_it`          | `yes`, `no`  | "Are you happy with it?" Only shown, and only accepted, when `has_business_insurance` is `yes`. If it arrives alongside `has_business_insurance: no` the request is rejected with 400. |
| `annuities`          | (none)                   |              | No questions. `answers` must be `{}`.         |
| `retirement`         | (none)                   |              | No questions. `answers` must be `{}`.         |

Examples of valid `answers`:

```json
{ "has_iul_policy": "yes" }
{ "has_business_insurance": "no" }
{ "has_business_insurance": "yes", "happy_with_it": "no" }
{}
```

#### The foundation never asks about money

The Her Future funnel is a discovery call booking form, not a financial
questionnaire. The rule is that WE never ASK about income, assets, net worth,
salary or account balances. The Worker enforces that in two layers, both
before any write:

1. **Money-shaped keys are rejected, everywhere in the payload.** Every key
   at every depth of the request body is checked against a term list
   (`income`, `salary`, `wage`, `earning`, `net_worth`, `asset`, `balance`,
   `revenue`, `401k`, `account_number`, `routing`, `iban`, `ssn`, and
   similar). A key like `salary` or `net_worth` means a form, or a tampered
   request, is asking a money question. That is the thing we must never do,
   so it is rejected with `400` and nothing is stored.
2. **`answers` values are strict enums.** Every key in `answers` must be in
   the pillar's schema, every value must be one of the listed options, and
   conditional keys must be absent when their condition does not hold.
   Anything unexpected there is a tampering signal and is rejected.

What the guard deliberately does NOT do: it does not scan `notes` (or any
other free-text value) for money words or currency amounts. `notes` is a box
we invited the visitor to write in. "I was diagnosed in 2019 and I want to
protect my family's assets" is an honest sentence and is stored as written,
subject only to the 2000 character cap and the control-character rules. An
earlier version of this guard rejected years, the word "assets" and the word
"earning" in notes, which turned real visitors into silent 400s. That was a
bug. The guard exists to stop the foundation from collecting financial data,
not to police what a visitor chooses to tell us. Do not tighten it back into
a value scan.

If the frontend ever needs a new question, add it to `HER_FUTURE_SCHEMAS` in
`worker.js` as an enum with foundation sign-off. Do not add free-text or
numeric answer fields.

### `POST /api/inquiry`

Request:

```json
{ "type": "partnership", "name": "Sam", "email": "sam@example.org", "org": "Acme", "message": "...", "website": "", "turnstileToken": "..." }
```

- `type` required, one of `press_photo`, `press_video`, `press_news`,
  `partnership`, `speaker`, `good_weekend`, `retreat`.
- `name` required, max 120.
- `email` required.
- `org` optional, max 160.
- `message` optional, max 4000, multiline.

### `POST /api/interest`

Request:

```json
{ "event": "good_weekend", "name": "G", "email": "g@example.org", "role": "golfer", "website": "", "turnstileToken": "..." }
```

- `event` required, one of `good_weekend`, `retreat`.
- `name` required, max 120.
- `email` required.
- `role` one of `sponsor`, `golfer`, `guest`. Required when `event` is
  `good_weekend`, optional for `retreat`.

## Bot protection

### Honeypot

Every form must include a hidden `website` input that real users never see or
fill. If it arrives non-empty, the Worker returns a normal success and drops
the request. This is the baseline gate and is always on.

### Turnstile

If the secret `TURNSTILE_SECRET_KEY` is set, every POST must carry a
`turnstileToken` (the token from the Turnstile widget). The Worker verifies
it against `https://challenges.cloudflare.com/turnstile/v0/siteverify` and
returns `403` if verification fails. The client IP is passed to Cloudflare as
`remoteip` for that verification only; it is not stored or logged.

If `TURNSTILE_SECRET_KEY` is NOT set, verification is skipped entirely and the
honeypot is the only gate. The Worker logs one warning per isolate (not per
request) so this is visible in production logs without being noisy. This is
the intended state until the frontend wires the widget in and the site key /
secret pair exists.

Order of checks on a POST: origin, rate limit, body parse, honeypot,
Turnstile, validation, write. Honeypot runs before Turnstile so a bot that
fills the trap never triggers a siteverify call.

## Rate limiting

Two layers, both keyed by `(route, ip_hash)` in fixed 10-minute windows, with
a limit of 5 requests per window:

1. **In-memory per isolate.** A `Map` in the Worker's global scope. This is a
   cheap first gate: a burst that has already blown the limit is rejected
   without a D1 round trip. It is not authoritative (each isolate has its own
   map, and isolates come and go) and it is bounded at 5000 keys, after which
   it is cleared.
2. **D1 `rate_limits` table.** The source of truth. A single upsert
   (`INSERT ... ON CONFLICT DO UPDATE SET count = count + 1 RETURNING count`)
   increments and reads the counter atomically. Rows older than one hour are
   pruned on roughly 2% of requests via `ctx.waitUntil`, so cleanup never
   delays a response.

Why both: D1 alone would cost a database write on every abusive request. The
memory layer absorbs the bulk of a burst against a single isolate for free,
while D1 makes the limit hold across isolates and colos.

Rate limiting runs before the body is read, so oversized and malformed
requests also count toward the limit. The `429` response carries
`Retry-After` in seconds.

Limits are constants at the top of `worker.js` (`RATE_LIMIT_MAX`,
`RATE_LIMIT_WINDOW_SECONDS`).

## Notifications (optional)

If BOTH `RESEND_API_KEY` and `NOTIFY_EMAIL` are set, the Worker sends a
plain-text email to `NOTIFY_EMAIL` via Resend for every successful
`her-future`, `inquiry` and `interest` submission. Subscribes do not notify.
The send happens inside `ctx.waitUntil()`, so it never delays or fails the
visitor's response; a failed send is logged with its HTTP status only.

If either variable is missing, notifications are silently skipped.

`NOTIFY_FROM` is optional and must be an address on a domain verified in
Resend. Default: `The StillHer Foundation <notifications@stillherfoundation.org>`.

## D1 schema

Migration: `migrations/0001_init.sql`. Every table has `id INTEGER PRIMARY
KEY AUTOINCREMENT`, `created_at TEXT NOT NULL DEFAULT (datetime('now'))` and
`ip_hash TEXT` (salted SHA-256, see PII policy). Indexes exist on every
`created_at` and on the enum column used for filtering.

```
subscribers
  id, email (UNIQUE), source, ip_hash, created_at

her_future_submissions
  id, pillar, answers (JSON text), notes, name, email, phone,
  disclaimer_accepted (0/1), ip_hash, created_at

inquiries
  id, type, name, email, org, message, ip_hash, created_at

interest_registrations
  id, event, name, email, role, ip_hash, created_at

rate_limits
  ip_hash, route, window_start (unix seconds), count, created_at, updated_at
  PRIMARY KEY (ip_hash, route, window_start)
```

All queries use bound parameters (`?1`, `?2`, ...). No SQL is ever built by
string concatenation with request data.

Rollback for `0001_init.sql` is documented at the top of the file (drop the
five tables in reverse order).

## Environment variables

All are optional in local development. The Worker degrades safely when a
value is missing.

| Variable               | Required in prod | Purpose                                                                 |
| ---------------------- | ---------------- | ----------------------------------------------------------------------- |
| `IP_SALT`              | Yes              | Salt for hashing IPs. Without it a constant dev salt is used and a warning is logged once. Generate with `openssl rand -hex 32`. |
| `TURNSTILE_SECRET_KEY` | Recommended      | Enables Turnstile verification. Unset = honeypot only.                  |
| `RESEND_API_KEY`       | No               | Enables notification emails (with `NOTIFY_EMAIL`).                      |
| `NOTIFY_EMAIL`         | No               | Inbox that receives notifications (with `RESEND_API_KEY`).              |
| `NOTIFY_FROM`          | No               | Sender address for notifications. Must be on a Resend-verified domain.  |

Local: copy `.dev.vars.example` to `.dev.vars` (gitignored) and fill in
values. `wrangler dev` loads it automatically.

Production: `npx wrangler secret put <NAME>` for each one. Never put secrets
in `wrangler.jsonc`.

## Setup commands (orchestrator)

Run once, in order:

```bash
# 1. Create the database. Copy the printed database_id into wrangler.jsonc,
#    replacing PLACEHOLDER_SET_AFTER_CREATE.
npx wrangler d1 create stillher-foundation

# 2. Apply migrations to the remote database.
npx wrangler d1 migrations apply stillher-foundation --remote

# 3. Set production secrets (each prompts for the value).
npx wrangler secret put IP_SALT
npx wrangler secret put TURNSTILE_SECRET_KEY   # once the widget is wired in
npx wrangler secret put RESEND_API_KEY         # optional
npx wrangler secret put NOTIFY_EMAIL           # optional

# 4. Build and deploy.
npm run deploy
```

Local development:

```bash
npx wrangler d1 migrations apply stillher-foundation --local
npm run build
npx wrangler dev
```

`package.json` already has `db:local`, `db:remote`, `preview` and `deploy`
scripts for these.

Note: `wrangler d1 migrations apply` prompts for confirmation. In a
non-interactive shell it auto-answers yes.

## PII policy

- **IPs.** The raw client IP is never written to D1 and never logged. It is
  hashed with SHA-256 and a secret salt (`IP_SALT`) before storage. The only
  place the raw IP travels is to Cloudflare's own Turnstile siteverify
  endpoint, when Turnstile is enabled. Without the salt the hash cannot be
  reversed by rainbow table.
- **Logs.** Each API request produces one log line:
  `[stillher] rid=<uuid> route=<path> status=<code> reason=<short-code>`.
  No email, name, phone, message, notes, IP or request body ever appears in a
  log. Unexpected errors log only the error name and first 200 characters of
  its message, never a stack trace or the request.
- **Responses.** Error messages are generic and safe to show. No SQL, stack
  or internal detail is returned.
- **Her Future.** The form never asks about money, and any request shaped
  like a money question is rejected before storage. Free-text notes are
  stored as the visitor wrote them. See the section above.
- **Notification emails** carry the submitter's details to Nani's inbox. That
  is their purpose. They go over TLS to Resend and are not logged.
- **Retention.** Nothing in the Worker deletes submission rows. `rate_limits`
  rows are pruned after one hour because they have no lasting value.

## Local verification performed (15 Sep 2026)

`npx wrangler deploy --dry-run` compiles and parses the config cleanly.

Migrations applied locally (15 statements). All four endpoints exercised
against `wrangler dev` with valid, invalid, oversized, honeypot and burst
payloads. Every case returned the status and body described above. Honeypot
requests wrote no rows. A 7-request burst from one IP produced five `200`s
and two `429`s with `Retry-After`, and the D1 counter stopped at 5 (the
memory gate absorbed requests 6 and 7). All seven legacy paths returned `301`
with the correct `Location`. The dev log contained zero emails, IPs, or
names; both once-per-isolate warnings appeared exactly once.

Second pass after the Her Future schema and money-guard corrections: 21
`/api/her-future` cases. Valid `iul`, both `business_insurance` shapes,
`annuities` and `retirement` with `{}` all returned `200` and stored the
expected `answers` JSON. `happy_with_it` alongside `has_business_insurance:
no`, an unexpected answers key, a stray key on a no-question pillar, a
missing or non-enum answer, and money-shaped keys at the top level, inside
`answers` and nested three levels deep all returned `400` with nothing
stored. Notes containing "diagnosed in 2019", "my family's assets", "my
income dropped", "$40,000" and "250000" all returned `200` and were stored
verbatim. The null-byte and 2000-character rules on `notes` still return
`400`. Log: zero emails, IPs or visitor text, zero `500`s.

Gotcha for local dev: wrangler keys the local D1 file by `database_id`. If
`database_id` changes, run `npm run db:local` again or every request will
`500` with `no such table: rate_limits`.
