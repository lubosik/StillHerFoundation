# Backend review, final

Reviewed against the live deployment at https://stillher-foundation.lubosikongwa.workers.dev
Scope: worker.js, wrangler.jsonc, migrations/0001_init.sql, docs/BACKEND.md, .dev.vars.example, .gitignore

Original verdict: NEEDS FIXES. 1 blocker, 6 warnings.
Status after fixes: all 7 addressed. See "Resolution" at the end.

## BLOCKER

**1. Canonical URL and sitemap disagreed with the URL actually served.**
`astro.config.mjs` had `trailingSlash: 'ignore'` while `wrangler.jsonc` set `html_handling: "drop-trailing-slash"`. The Worker served `/about` and 307 redirected `/about/`, but every page head said `<link rel="canonical" href="https://stillherfoundation.org/about/">` and all 15 sitemap entries carried a trailing slash.

On the real domain this would point every canonical and every sitemap entry at a URL that redirects, with a 307 that crawlers read as temporary. Google would index the redirect target while being told the canonical is somewhere else, weakening indexing of a brand new site at launch.

Fixed: `trailingSlash: 'never'` in `astro.config.mjs`. Canonicals and sitemap now emit the slashless form, matching what the Worker serves.

## WARNINGS

**W1. Lone UTF-16 surrogates stored as invalid UTF-8.** A JSON escape such as `"\ud800"` passes `TextDecoder({fatal:true})` but leaves a lone surrogate, which D1 stored as bytes `ED A0 80`. No security impact, but the row is malformed for any export. Fixed with an `isWellFormed()` check in `str()`.

**W2. Local origins trusted against production.** `http://localhost` and `http://127.0.0.1` were in the CORS allow list, so any locally served page could post to the live API. Impact limited to spam, since the honeypot and rate limits still applied. Fixed: local patterns now apply only when `ALLOW_LOCAL_ORIGINS` is the string "true", which lives in `.dev.vars` and never in production.

**W3. The in-memory rate limit gate does not engage in production.** Requests spread across Worker isolates, so no single map reaches the threshold and D1 carries every request. The limit still holds correctly because D1 is the real counter. `docs/BACKEND.md` overstated it. Documentation corrected.

**W4. Depth guard borrowed the money guard's error message.** A payload nested more than six levels deep returned "This form does not ask about income, assets or accounts", telling visitors to remove fields they never sent. Fixed: it now returns "Request is malformed."

**W5. Dead code path for `/api`.** `run_worker_first` only matches `/api/*`, so a bare `/api` is served by static assets and never reaches the Worker. Kept as a guard with a comment explaining why it is unreachable.

**W6. Frontend and backend length limits drifted.** `InquiryForm.astro` set `maxlength="2000"` on the message while the Worker allowed 4000. Aligned to 4000.

## PASSED, with live evidence

**Input validation.** Email length, pattern, unicode and type all rejected correctly. Trimming and lowercasing confirmed in stored rows. Length caps enforced on every field. Null bytes, tabs in single line fields, DEL and vertical tab rejected. CRLF and tab preserved in multiline fields. Emoji and RTL text stored correctly. Whitespace only rejected as required. Every enum rejected out of range values. 20KB bodies rejected with 413, both with and without Content-Length.

**The Her Future money rule.** Schemas verified as exactly `iul: {has_iul_policy}`, `business_insurance: {has_business_insurance, happy_with_it}` with the second conditional on the first being "yes", `annuities: {}`, `retirement: {}`. The guard scans keys only, never values. Money shaped keys rejected at top level, inside `answers`, and three levels deep. Critically, a note reading "I was diagnosed in 2019 and I want to protect my family's assets. My income dropped to $40,000." returned 200 and stored verbatim, which is the correct behaviour: the rule constrains what the foundation asks, not what a visitor volunteers.

**Rate limiting.** Five per route per IP, then 429 with `Retry-After`. A different route from the same IP was not blocked. Origin, method and unknown route rejections all returned without incrementing the counter. The opportunistic prune of old rows worked.

**Honeypot and Turnstile.** A honeypot filled request returned 200 and wrote zero rows, verified by row count before and after. A numeric honeypot value was caught. A whitespace only value was correctly treated as empty. With `TURNSTILE_SECRET_KEY` unset, 40 Worker invocations produced exactly 4 skip warnings, one per isolate rather than one per request.

**PII and logging.** 44 captured log lines, all of the form `[stillher] rid=<uuid> route=/api/... status=NNN reason=<code>`. A regex sweep for emails, names, phone fragments, note text, any `@`, or a dotted IPv4 found zero hits. Stored `ip_hash` values are 64 hex characters with no dots. Static page hits produced no Worker log at all.

**Error handling.** Zero 500s across 60+ probes. All six `prepare()` calls use bound parameters, no concatenation. SQL injection attempts in every string field were stored byte for byte and all five tables survived. Prototype pollution via `__proto__` and `constructor` ignored at top level and rejected inside `answers`. 3000 deep nested arrays parsed without fault.

**CORS and headers.** No wildcard. A lookalike domain, an http downgrade, and a null origin were all rejected. `x-content-type-options`, `cache-control: no-store`, `referrer-policy` and `x-request-id` present on every response including error codes.

**Config and secrets.** `run_worker_first` is exactly `/api/*` plus the seven legacy paths, confirmed by the tail showing static pages never invoke the Worker. `.dev.vars` is gitignored and has never been committed. Secret scans across the working tree and all tracked files found no matches on this branch.

**Redirects.** All seven legacy `.html` paths 301 to the correct targets. An unknown path returns the custom 404.

## Resolution

All 7 findings fixed on branch `rebuild/foundation`:

| Finding | Fix |
|---|---|
| Blocker 1 | `trailingSlash: 'never'` in astro.config.mjs |
| W1 | `isWellFormed()` check in `str()` |
| W2 | `ALLOW_LOCAL_ORIGINS` env gate on local CORS patterns |
| W3 | BACKEND.md corrected |
| W4 | Separate "Request is malformed." message for the depth guard |
| W5 | Comment explaining the unreachable guard |
| W6 | InquiryForm maxlength aligned to 4000 |

## VERDICT: APPROVED after fixes

The Worker was solid throughout. The single blocker was a URL form mismatch between the Astro build and the asset handler, not a fault in the Worker itself. Everything security critical passed on the first pass with live evidence.

## Known compromised credentials, outside this branch

Two credentials exist in git history and must be revoked regardless of this review:
1. A GitHub personal access token that was hardcoded in the old `origin` remote URL.
2. An OpenRouter key committed in `generate-images.js` on `main` and under the `legacy-rths-v1` tag.

Neither is present on `rebuild/foundation`.
