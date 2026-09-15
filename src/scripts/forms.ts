/**
 * One handler for every form on the site.
 *
 * A form opts in with `data-form` and `data-endpoint`. Fields are read by name.
 * Success and failure are announced in the `[data-status]` element, which is a
 * live region, so screen readers hear the result.
 *
 * Turnstile, when present, is read from the hidden input the widget injects.
 */

type Json = Record<string, unknown>;

const MESSAGES = {
  sending: 'Sending.',
  ok: 'Thank you. We have you.',
  invalidEmail: 'Please enter a valid email address.',
  required: 'Please fill in the required fields.',
  failed: 'Something went wrong. Please try again, or email us directly.',
  rateLimited: 'That is a few too many tries. Please wait a moment and try again.',
};

function setStatus(el: HTMLElement | null, text: string, state: 'ok' | 'error' | '') {
  if (!el) return;
  el.textContent = text;
  if (state) el.dataset.state = state;
  else delete el.dataset.state;
}

function collect(form: HTMLFormElement): Json {
  const data = new FormData(form);
  const out: Json = {};

  for (const [key, value] of data.entries()) {
    if (typeof value !== 'string') continue;

    // Checkbox groups and repeated names collapse into arrays.
    if (key in out) {
      const existing = out[key];
      out[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    } else {
      out[key] = value;
    }
  }

  // Turnstile injects its response under this name.
  const token = data.get('cf-turnstile-response');
  if (typeof token === 'string' && token) {
    out.turnstileToken = token;
    delete out['cf-turnstile-response'];
  }

  return out;
}

async function submit(form: HTMLFormElement) {
  const endpoint = form.dataset.endpoint;
  if (!endpoint) return;

  const status = form.querySelector<HTMLElement>('[data-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  if (!form.checkValidity()) {
    const bad = form.querySelector<HTMLInputElement>(':invalid');
    const msg = bad?.type === 'email' ? MESSAGES.invalidEmail : MESSAGES.required;
    setStatus(status, msg, 'error');
    bad?.focus();
    return;
  }

  button?.setAttribute('disabled', '');
  setStatus(status, MESSAGES.sending, '');

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collect(form)),
    });

    if (res.ok) {
      const successMsg = form.dataset.success || MESSAGES.ok;
      setStatus(status, successMsg, 'ok');
      form.reset();
      form.dispatchEvent(new CustomEvent('form:success', { bubbles: true }));
    } else if (res.status === 429) {
      setStatus(status, MESSAGES.rateLimited, 'error');
    } else {
      setStatus(status, MESSAGES.failed, 'error');
    }
  } catch {
    setStatus(status, MESSAGES.failed, 'error');
  } finally {
    button?.removeAttribute('disabled');
  }
}

export function initForms(root: ParentNode = document) {
  root.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    if (form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      void submit(form);
    });
  });
}

initForms();
