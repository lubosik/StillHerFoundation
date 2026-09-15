/**
 * The StillHer Foundation: Cloudflare Worker.
 *
 * Responsibilities:
 *   1. JSON API under /api/* (subscribe, her-future, inquiry, interest).
 *   2. 301 redirects for legacy .html paths from the previous site.
 *   3. Everything else falls through to the static Astro build in dist/
 *      via the ASSETS binding.
 *
 * Plain ES module Worker. No framework, no dependencies.
 *
 * PII policy (non-negotiable):
 *   - Raw IPs are never stored or logged. Only a salted SHA-256 hash is kept.
 *   - Emails, names, phones and messages are never written to logs.
 *   - Logs carry only: request id, route, status, and a short reason code.
 *   - The Her Future funnel never ASKS for money information (income, assets,
 *     net worth, salary, account balances). Any request whose shape suggests
 *     a money question is rejected. See hasMoneyShapedKey.
 */

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const MAX_BODY_BYTES = 16 * 1024;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const RATE_LIMIT_PRUNE_PROBABILITY = 0.02;
const RATE_LIMIT_PRUNE_AGE_SECONDS = 60 * 60;

const LIMITS = {
  email: 254,
  name: 120,
  org: 160,
  message: 4000,
  notes: 2000,
  phone: 32,
  source: 64,
  turnstileToken: 2048,
};

const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const PHONE_PATTERN = /^[0-9+()\-.\s]{6,32}$/;

/* Control characters (excluding tab, LF, CR) and DEL. Hex escapes on purpose. */
const CONTROL_CHARS_SINGLE_LINE = /[\x00-\x1F\x7F]/;
const CONTROL_CHARS_MULTI_LINE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;

const INQUIRY_TYPES = new Set([
  'press_photo',
  'press_video',
  'press_news',
  'partnership',
  'speaker',
  'good_weekend',
  'retreat',
]);

const INTEREST_EVENTS = new Set(['good_weekend', 'retreat']);
const INTEREST_ROLES = new Set(['sponsor', 'golfer', 'guest']);

/*
 * Her Future answer schemas. Deliberately minimal: the funnel books a
 * discovery call, it does not profile the visitor. Every answer is an enum.
 * Do not add questions here without sign-off from the foundation.
 */
const YES_NO = ['yes', 'no'];

const HER_FUTURE_SCHEMAS = {
  /* "Do you currently have an IUL policy?" */
  iul: { has_iul_policy: YES_NO },
  /* "Do you currently have business insurance?" then, only if yes, "Are you happy with it?" */
  business_insurance: { has_business_insurance: YES_NO, happy_with_it: YES_NO },
  /* No questions. answers must be an empty object. */
  annuities: {},
  retirement: {},
};

/*
 * Keys that are only permitted when another key holds a given value. If the
 * condition is not met the key must be absent; its presence is rejected.
 */
const HER_FUTURE_CONDITIONAL_KEYS = {
  business_insurance: {
    happy_with_it: { dependsOn: 'has_business_insurance', when: 'yes' },
  },
};

/*
 * Money-information guard for the Her Future funnel.
 *
 * The guard exists to stop the foundation from COLLECTING financial data. It
 * is not there to police what a visitor chooses to write. So:
 *   - Every KEY anywhere in the payload is checked against this term list.
 *     A money-shaped key means a form (or a tampered request) is asking a
 *     money question. Reject.
 *   - VALUES inside `answers` are enums and are validated strictly by
 *     validateAnswers. Anything unexpected there is rejected.
 *   - `notes` is free text the visitor was invited to write. It is NOT
 *     scanned for money terms or currency amounts. "Diagnosed in 2019" and
 *     "protect my family's assets" are legitimate sentences and are stored
 *     as written, subject only to the length cap and control-char rules.
 * Do not "tighten" this back into a value scan. That was a bug.
 */
const MONEY_TERMS_PATTERN = new RegExp(
  [
    'income',
    'salary',
    'salaries',
    'wage',
    'wages',
    'earning',
    'earnings',
    'net[\\s_-]?worth',
    'asset',
    'assets',
    'balance',
    'balances',
    'account[\\s_-]?(number|no|num|balance)',
    'savings[\\s_-]?(amount|total|balance)',
    'portfolio[\\s_-]?(value|size|worth)',
    'annual[\\s_-]?revenue',
    'revenue',
    'household[\\s_-]?(income|earnings)',
    'per[\\s_-]?(year|annum|month)',
    '401k',
    '401\\(k\\)',
    'ira[\\s_-]?balance',
    'routing',
    'iban',
    'sort[\\s_-]?code',
    'ssn',
    'social[\\s_-]?security[\\s_-]?number',
  ].join('|'),
  'i'
);

const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/(www\.)?stillherfoundation\.org$/,
  /^https:\/\/stillher-foundation(-[a-z0-9-]+)?\.[a-z0-9-]+\.workers\.dev$/,
];

/**
 * Local origins are only trusted when explicitly enabled, which happens in
 * .dev.vars and never in production. Without this, any page a visitor runs on
 * their own machine could post to the live API.
 */
const LOCAL_ORIGIN_PATTERNS = [
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

const LEGACY_REDIRECTS = {
  '/index.html': '/road-to-her-smile',
  '/the-tradegy.html': '/road-to-her-smile/the-tragedy',
  '/her-road.html': '/road-to-her-smile/her-road',
  '/who-is-lia.html': '/road-to-her-smile/who-is-lia',
  '/film.html': '/road-to-her-smile#partnerships',
  '/mission.html': '/about',
  '/press.html': '/partnerships',
};

const FALLBACK_IP_SALT = 'stillher-dev-only-salt-set-IP_SALT-in-production';

/* ------------------------------------------------------------------ */
/* Per-isolate state                                                    */
/* ------------------------------------------------------------------ */

/* Warnings that should be emitted once per isolate, not once per request. */
const warnedOnce = new Set();
function warnOnce(key, message) {
  if (warnedOnce.has(key)) return;
  warnedOnce.add(key);
  console.warn(`[stillher] ${message}`);
}

/*
 * Cheap in-memory first gate for rate limiting. Keyed by `${route}:${ipHash}`.
 * This is per isolate and not authoritative; D1 is the source of truth.
 */
const memoryBuckets = new Map();
const MEMORY_BUCKET_CAP = 5000;

/* ------------------------------------------------------------------ */
/* Response helpers                                                     */
/* ------------------------------------------------------------------ */

function securityHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    ...extra,
  };
}

function corsHeaders(origin) {
  if (!origin) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body, status, headers = {}) {
  return new Response(JSON.stringify(body), { status, headers: securityHeaders(headers) });
}

function ok(headers) {
  return json({ ok: true }, 200, headers);
}

function fail(status, error, headers) {
  return json({ ok: false, error }, status, headers);
}

/* ------------------------------------------------------------------ */
/* Origin / CORS                                                        */
/* ------------------------------------------------------------------ */

function resolveAllowedOrigin(request, url, env) {
  const origin = request.headers.get('Origin');
  if (!origin) return { origin: null, allowed: true }; // non-browser client, no CORS needed
  if (origin === url.origin) return { origin, allowed: true };

  const patterns =
    env && env.ALLOW_LOCAL_ORIGINS === 'true'
      ? [...ALLOWED_ORIGIN_PATTERNS, ...LOCAL_ORIGIN_PATTERNS]
      : ALLOWED_ORIGIN_PATTERNS;

  const allowed = patterns.some((pattern) => pattern.test(origin));
  return { origin: allowed ? origin : null, allowed };
}

/* ------------------------------------------------------------------ */
/* IP hashing                                                           */
/* ------------------------------------------------------------------ */

async function hashIp(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  let salt = env.IP_SALT;
  if (!salt) {
    warnOnce('ip-salt', 'IP_SALT is not set. Falling back to a constant salt. Set IP_SALT before production.');
    salt = FALLBACK_IP_SALT;
  }
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/* ------------------------------------------------------------------ */
/* Rate limiting                                                        */
/* ------------------------------------------------------------------ */

function currentWindowStart() {
  return Math.floor(Date.now() / 1000 / RATE_LIMIT_WINDOW_SECONDS) * RATE_LIMIT_WINDOW_SECONDS;
}

function retryAfterSeconds(windowStart) {
  const end = windowStart + RATE_LIMIT_WINDOW_SECONDS;
  return Math.max(1, end - Math.floor(Date.now() / 1000));
}

function memoryGate(route, ipHash, windowStart) {
  const key = `${route}:${ipHash}`;
  const bucket = memoryBuckets.get(key);
  if (bucket && bucket.windowStart === windowStart) {
    bucket.count += 1;
    return bucket.count > RATE_LIMIT_MAX;
  }
  if (memoryBuckets.size >= MEMORY_BUCKET_CAP) memoryBuckets.clear();
  memoryBuckets.set(key, { windowStart, count: 1 });
  return false;
}

async function d1Gate(env, ctx, route, ipHash, windowStart) {
  const row = await env.DB.prepare(
    `INSERT INTO rate_limits (ip_hash, route, window_start, count)
     VALUES (?1, ?2, ?3, 1)
     ON CONFLICT (ip_hash, route, window_start)
     DO UPDATE SET count = count + 1, updated_at = datetime('now')
     RETURNING count`
  )
    .bind(ipHash, route, windowStart)
    .first();

  if (Math.random() < RATE_LIMIT_PRUNE_PROBABILITY) {
    const cutoff = Math.floor(Date.now() / 1000) - RATE_LIMIT_PRUNE_AGE_SECONDS;
    ctx.waitUntil(
      env.DB.prepare('DELETE FROM rate_limits WHERE window_start < ?1')
        .bind(cutoff)
        .run()
        .catch((err) => console.error('[stillher] rate_limits prune failed', safeErr(err)))
    );
  }

  return Number(row?.count ?? 0) > RATE_LIMIT_MAX;
}

/**
 * Returns null when allowed, or a 429 Response when limited.
 */
async function enforceRateLimit(env, ctx, route, ipHash, cors) {
  const windowStart = currentWindowStart();
  const limitedHeaders = { ...cors, 'Retry-After': String(retryAfterSeconds(windowStart)) };

  if (memoryGate(route, ipHash, windowStart)) {
    return fail(429, 'Too many requests. Please try again shortly.', limitedHeaders);
  }
  if (await d1Gate(env, ctx, route, ipHash, windowStart)) {
    return fail(429, 'Too many requests. Please try again shortly.', limitedHeaders);
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Turnstile                                                            */
/* ------------------------------------------------------------------ */

async function verifyTurnstile(env, token, request) {
  if (!env.TURNSTILE_SECRET_KEY) {
    warnOnce('turnstile', 'TURNSTILE_SECRET_KEY is not set. Skipping Turnstile verification; honeypot only.');
    return true;
  }
  if (typeof token !== 'string' || token.length === 0 || token.length > LIMITS.turnstileToken) {
    return false;
  }
  const payload = {
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  };
  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) payload.remoteip = remoteIp; // sent to Cloudflare only, never stored or logged

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return false;
  const data = await res.json().catch(() => null);
  return Boolean(data && data.success === true);
}

/* ------------------------------------------------------------------ */
/* Validation helpers                                                   */
/* ------------------------------------------------------------------ */

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isPresent(value) {
  return value !== undefined && value !== null && value !== '';
}

/**
 * Coerce and validate a string field.
 * opts: { required, max, multiline, label }
 */
function str(body, key, opts) {
  const { required = false, max, multiline = false, label = key } = opts;
  const raw = body[key];
  if (!isPresent(raw)) {
    if (required) throw new ValidationError(`${label} is required.`);
    return null;
  }
  if (typeof raw !== 'string') throw new ValidationError(`${label} must be text.`);
  const value = raw.trim();
  if (value.length === 0) {
    if (required) throw new ValidationError(`${label} is required.`);
    return null;
  }
  if (value.length > max) throw new ValidationError(`${label} is too long.`);
  const pattern = multiline ? CONTROL_CHARS_MULTI_LINE : CONTROL_CHARS_SINGLE_LINE;
  if (pattern.test(value)) throw new ValidationError(`${label} contains invalid characters.`);
  // A JSON escape such as "\ud800" decodes cleanly but leaves a lone surrogate,
  // which D1 would store as invalid UTF-8 and which breaks any later export.
  if (typeof value.isWellFormed === 'function' && !value.isWellFormed()) {
    throw new ValidationError(`${label} contains invalid characters.`);
  }
  return value;
}

function email(body, key = 'email') {
  const value = str(body, key, { required: true, max: LIMITS.email, label: 'Email' });
  if (!EMAIL_PATTERN.test(value)) throw new ValidationError('Please enter a valid email address.');
  return value.toLowerCase();
}

function oneOf(body, key, allowed, { required = true, label = key } = {}) {
  const value = str(body, key, { required, max: 64, label });
  if (value === null) return null;
  if (!allowed.has(value)) throw new ValidationError(`${label} is not a recognised option.`);
  return value;
}

function phone(body) {
  const value = str(body, 'phone', { required: false, max: LIMITS.phone, label: 'Phone' });
  if (value === null) return null;
  if (!PHONE_PATTERN.test(value)) throw new ValidationError('Please enter a valid phone number.');
  return value;
}

function isHoneypotTripped(body) {
  const hp = body.website;
  return hp !== undefined && hp !== null && String(hp).trim().length > 0;
}

/* ------------------------------------------------------------------ */
/* Her Future: money guard + answers schema                             */
/* ------------------------------------------------------------------ */

/**
 * True if any KEY anywhere in the payload looks like a money question.
 * Values are deliberately not inspected here; see the note on
 * MONEY_TERMS_PATTERN.
 */
function hasMoneyShapedKey(value, depth = 0) {
  // An absurdly nested payload is malformed, not a money question. It gets its
  // own error so the visitor is not told to remove fields they never sent.
  if (depth > 6) throw new ValidationError('Request is malformed.');
  if (Array.isArray(value)) {
    return value.some((v) => hasMoneyShapedKey(v, depth + 1));
  }
  if (isPlainObject(value)) {
    return Object.entries(value).some(
      ([k, v]) => MONEY_TERMS_PATTERN.test(k) || hasMoneyShapedKey(v, depth + 1)
    );
  }
  return false;
}

/**
 * Validate `answers` against the pillar schema. Every key must be in the
 * schema, every value must be one of the allowed enums, conditional keys
 * must be present exactly when their condition holds and absent otherwise.
 * For pillars with no questions, `answers` must be an empty object.
 */
function validateAnswers(pillar, answers) {
  if (!isPlainObject(answers)) throw new ValidationError('Answers must be an object.');
  const schema = HER_FUTURE_SCHEMAS[pillar];
  const conditional = HER_FUTURE_CONDITIONAL_KEYS[pillar] || {};

  for (const key of Object.keys(answers)) {
    if (!Object.prototype.hasOwnProperty.call(schema, key)) {
      throw new ValidationError('Answers contain an unexpected field.');
    }
  }

  const clean = {};
  for (const [key, allowed] of Object.entries(schema)) {
    const raw = answers[key];
    const rule = conditional[key];
    const applies = !rule || answers[rule.dependsOn] === rule.when;

    if (!applies) {
      if (isPresent(raw)) throw new ValidationError('Answers contain a field that does not apply.');
      continue;
    }
    if (!isPresent(raw)) throw new ValidationError('Please answer every question.');
    if (typeof raw !== 'string' || !allowed.includes(raw)) {
      throw new ValidationError('One of the answers is not a recognised option.');
    }
    clean[key] = raw;
  }
  return clean;
}

/* ------------------------------------------------------------------ */
/* Notifications (optional, never blocks the response)                  */
/* ------------------------------------------------------------------ */

function notify(env, ctx, subject, lines) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return;
  const from = env.NOTIFY_FROM || 'The StillHer Foundation <notifications@stillherfoundation.org>';
  const text = lines.join('\n');
  ctx.waitUntil(
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [env.NOTIFY_EMAIL], subject, text }),
    })
      .then((res) => {
        if (!res.ok) console.error(`[stillher] notify failed status=${res.status}`);
      })
      .catch((err) => console.error('[stillher] notify failed', safeErr(err)))
  );
}

/* ------------------------------------------------------------------ */
/* Route handlers. Each receives the parsed JSON body and either        */
/* returns normally on success or throws ValidationError.               */
/* ------------------------------------------------------------------ */

async function handleSubscribe({ body, env, ipHash }) {
  const value = email(body);
  const source = str(body, 'source', { required: true, max: LIMITS.source, label: 'Source' });

  await env.DB.prepare(
    `INSERT INTO subscribers (email, source, ip_hash) VALUES (?1, ?2, ?3)
     ON CONFLICT (email) DO NOTHING`
  )
    .bind(value, source, ipHash)
    .run();
}

async function handleHerFuture({ body, env, ctx, ipHash }) {
  if (hasMoneyShapedKey(body)) {
    throw new ValidationError(
      'This form does not ask about income, assets or accounts. Please remove those fields and try again.'
    );
  }

  const pillar = oneOf(body, 'pillar', new Set(Object.keys(HER_FUTURE_SCHEMAS)), { label: 'Pillar' });
  const answers = validateAnswers(pillar, body.answers);
  const notes = str(body, 'notes', { required: false, max: LIMITS.notes, multiline: true, label: 'Notes' });
  const name = str(body, 'name', { required: true, max: LIMITS.name, label: 'Name' });
  const value = email(body);
  const phoneValue = phone(body);

  if (body.disclaimerAccepted !== true) {
    throw new ValidationError('Please accept the discovery call terms to continue.');
  }

  await env.DB.prepare(
    `INSERT INTO her_future_submissions
       (pillar, answers, notes, name, email, phone, disclaimer_accepted, ip_hash)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, 1, ?7)`
  )
    .bind(pillar, JSON.stringify(answers), notes, name, value, phoneValue, ipHash)
    .run();

  const answerLines = Object.entries(answers).map(([k, v]) => `  ${k}: ${v}`);
  notify(env, ctx, `Her Future: new discovery call request (${pillar})`, [
    `Pillar: ${pillar}`,
    `Name: ${name}`,
    `Email: ${value}`,
    `Phone: ${phoneValue || 'not provided'}`,
    '',
    'Answers:',
    ...(answerLines.length ? answerLines : ['  (no questions for this pillar)']),
    '',
    'Notes:',
    notes || '(none)',
  ]);
}

async function handleInquiry({ body, env, ctx, ipHash }) {
  const type = oneOf(body, 'type', INQUIRY_TYPES, { label: 'Inquiry type' });
  const name = str(body, 'name', { required: true, max: LIMITS.name, label: 'Name' });
  const value = email(body);
  const org = str(body, 'org', { required: false, max: LIMITS.org, label: 'Organisation' });
  const message = str(body, 'message', { required: false, max: LIMITS.message, multiline: true, label: 'Message' });

  await env.DB.prepare(
    `INSERT INTO inquiries (type, name, email, org, message, ip_hash)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
  )
    .bind(type, name, value, org, message, ipHash)
    .run();

  notify(env, ctx, `New inquiry: ${type}`, [
    `Type: ${type}`,
    `Name: ${name}`,
    `Email: ${value}`,
    `Organisation: ${org || 'not provided'}`,
    '',
    'Message:',
    message || '(none)',
  ]);
}

async function handleInterest({ body, env, ctx, ipHash }) {
  const event = oneOf(body, 'event', INTEREST_EVENTS, { label: 'Event' });
  const name = str(body, 'name', { required: true, max: LIMITS.name, label: 'Name' });
  const value = email(body);
  const role = oneOf(body, 'role', INTEREST_ROLES, { required: event === 'good_weekend', label: 'Role' });

  await env.DB.prepare(
    `INSERT INTO interest_registrations (event, name, email, role, ip_hash)
     VALUES (?1, ?2, ?3, ?4, ?5)`
  )
    .bind(event, name, value, role, ipHash)
    .run();

  notify(env, ctx, `New interest registration: ${event}`, [
    `Event: ${event}`,
    `Name: ${name}`,
    `Email: ${value}`,
    `Role: ${role || 'not provided'}`,
  ]);
}

const ROUTES = {
  '/api/subscribe': handleSubscribe,
  '/api/her-future': handleHerFuture,
  '/api/inquiry': handleInquiry,
  '/api/interest': handleInterest,
};

/* ------------------------------------------------------------------ */
/* Request body parsing                                                 */
/* ------------------------------------------------------------------ */

async function readJsonBody(request) {
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return { error: fail(415, 'Content-Type must be application/json.') };
  }

  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_BODY_BYTES) {
    return { error: fail(413, 'Request body is too large.') };
  }

  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > MAX_BODY_BYTES) {
    return { error: fail(413, 'Request body is too large.') };
  }

  let parsed;
  try {
    parsed = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(buffer));
  } catch {
    return { error: fail(400, 'Request body is not valid JSON.') };
  }
  if (!isPlainObject(parsed)) {
    return { error: fail(400, 'Request body must be a JSON object.') };
  }
  return { body: parsed };
}

/* ------------------------------------------------------------------ */
/* API dispatcher                                                       */
/* ------------------------------------------------------------------ */

function withHeaders(response, headers) {
  const merged = new Headers(response.headers);
  for (const [k, v] of Object.entries(headers)) merged.set(k, v);
  return new Response(response.body, { status: response.status, headers: merged });
}

function safeErr(err) {
  /* Only the error name and message, never a stack, never request data. */
  return err && err.name ? `${err.name}: ${String(err.message || '').slice(0, 200)}` : String(err).slice(0, 200);
}

async function handleApi(request, env, ctx, url) {
  const requestId = crypto.randomUUID();
  const route = url.pathname;
  const log = (status, reason) =>
    console.log(`[stillher] rid=${requestId} route=${route} status=${status}${reason ? ` reason=${reason}` : ''}`);

  const { origin, allowed } = resolveAllowedOrigin(request, url, env);
  const cors = corsHeaders(origin);
  const baseHeaders = { ...cors, 'X-Request-Id': requestId };

  if (request.method === 'OPTIONS') {
    if (!allowed) {
      log(403, 'origin');
      return fail(403, 'Origin not allowed.', { 'X-Request-Id': requestId });
    }
    return new Response(null, { status: 204, headers: securityHeaders({ ...baseHeaders, Allow: 'POST, OPTIONS' }) });
  }

  const handler = ROUTES[route];
  if (!handler) {
    log(404, 'no-route');
    return fail(404, 'Not found.', baseHeaders);
  }

  if (request.method !== 'POST') {
    log(405, 'method');
    return fail(405, 'Method not allowed.', { ...baseHeaders, Allow: 'POST, OPTIONS' });
  }

  if (!allowed) {
    log(403, 'origin');
    return fail(403, 'Origin not allowed.', baseHeaders);
  }

  try {
    const ipHash = await hashIp(request, env);

    const limited = await enforceRateLimit(env, ctx, route, ipHash, baseHeaders);
    if (limited) {
      log(429, 'rate-limit');
      return limited;
    }

    const parsed = await readJsonBody(request);
    if (parsed.error) {
      log(parsed.error.status, 'body');
      return withHeaders(parsed.error, baseHeaders);
    }
    const body = parsed.body;

    /* Honeypot: silent success, nothing written. Bots learn nothing. */
    if (isHoneypotTripped(body)) {
      log(200, 'honeypot');
      return ok(baseHeaders);
    }

    const human = await verifyTurnstile(env, body.turnstileToken, request);
    if (!human) {
      log(403, 'turnstile');
      return fail(403, 'Verification failed. Please refresh and try again.', baseHeaders);
    }

    await handler({ body, env, ctx, ipHash, requestId });
    log(200);
    return ok(baseHeaders);
  } catch (err) {
    if (err instanceof ValidationError) {
      log(400, 'validation');
      return fail(400, err.message, baseHeaders);
    }
    console.error(`[stillher] rid=${requestId} route=${route} status=500 err=${safeErr(err)}`);
    return fail(500, 'Something went wrong. Please try again later.', baseHeaders);
  }
}

/* ------------------------------------------------------------------ */
/* Entry point                                                          */
/* ------------------------------------------------------------------ */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);

      /* Legacy .html redirects from the previous site. Listed in run_worker_first. */
      const redirectTarget = LEGACY_REDIRECTS[url.pathname];
      if (redirectTarget) {
        return Response.redirect(new URL(redirectTarget, url.origin).toString(), 301);
      }

      if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
        return await handleApi(request, env, ctx, url);
      }

      /* Static Astro build. Only reached for paths not in run_worker_first. */
      return await env.ASSETS.fetch(request);
    } catch (err) {
      console.error(`[stillher] unhandled err=${safeErr(err)}`);
      return fail(500, 'Something went wrong. Please try again later.');
    }
  },
};
