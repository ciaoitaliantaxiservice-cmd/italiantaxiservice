'use client';

/**
 * Behaviour for the server-rendered contact form (ContactForm.tsx):
 * per-field errors and an error summary, the live "0 / 1500" counter,
 * Cloudflare Turnstile, and sending to the contact-message Edge Function.
 *
 * The browser checks are for the visitor's benefit only. The function checks
 * everything again (Turnstile token, honeypot, 3-second minimum, rate limit,
 * lengths and formats) before anything is stored or emailed.
 */
import { useEffect } from 'react';

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const PHONE_RE = /^\+?[0-9 ().\/-]{6,30}$/;

interface Turnstile {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  execute: (id?: string) => void;
}
type TurnstileWindow = Window & { turnstile?: Turnstile };

function loadTurnstile(): Promise<Turnstile> {
  const w = window as TurnstileWindow;
  if (w.turnstile) return Promise.resolve(w.turnstile);
  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => (w.turnstile ? resolve(w.turnstile) : reject(new Error('turnstile'))));
    script.addEventListener('error', () => reject(new Error('turnstile')));
  });
}

export default function ContactFormScript() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
    if (!form) return;

    const startedAt = Date.now();
    const endpoint = form.dataset.endpoint || '';
    const siteKey = form.dataset.sitekey || '';
    const lang = form.dataset.lang || 'en';
    const summary = form.querySelector<HTMLElement>('[data-error-summary]');
    const summaryList = summary?.querySelector('ul');
    const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const message = form.querySelector<HTMLTextAreaElement>('#ct-message');
    const counter = form.querySelector<HTMLElement>('[data-counter]');
    const statuses = Array.from(form.querySelectorAll<HTMLElement>('[data-status]'));
    const status = (name: string) => form.querySelector<HTMLElement>(`[data-status="${name}"]`);
    const controls = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        'input[required], textarea[required], input[data-validate]'
      )
    );
    let sending = false;
    let cancelled = false;

    // ---- live counter -------------------------------------------------------
    const updateCounter = () => {
      if (!message || !counter) return;
      const n = message.value.length;
      counter.textContent = (counter.dataset.template || '{n} / 1500').replace('{n}', String(n));
      counter.dataset.near = n >= message.maxLength - 100 ? 'true' : 'false';
    };
    message?.addEventListener('input', updateCounter);
    updateCounter();

    // ---- Turnstile ----------------------------------------------------------
    let token = '';
    let widgetId: string | undefined;
    let turnstile: Turnstile | undefined;
    let waiters: ((t: string) => void)[] = [];
    const container = form.querySelector<HTMLElement>('[data-turnstile]');
    if (siteKey && container) {
      loadTurnstile()
        .then((ts) => {
          if (cancelled) return;
          turnstile = ts;
          widgetId = ts.render(container, {
            sitekey: siteKey,
            action: 'contact',
            appearance: 'interaction-only',
            language: lang,
            callback: (t: string) => {
              token = t;
              waiters.forEach((fn) => fn(t));
              waiters = [];
            },
            'expired-callback': () => {
              token = '';
            },
            'error-callback': () => {
              token = '';
            },
          });
        })
        .catch(() => {
          /* Shown as "security check did not complete" on submit. */
        });
    }

    /** The current token, waiting up to 10 s for Turnstile to produce one. */
    const getToken = () =>
      new Promise<string>((resolve) => {
        if (token) return resolve(token);
        if (!turnstile) return resolve('');
        const timer = window.setTimeout(() => resolve(''), 10_000);
        waiters.push((t) => {
          window.clearTimeout(timer);
          resolve(t);
        });
      });

    const resetTurnstile = () => {
      token = '';
      if (turnstile && widgetId !== undefined) turnstile.reset(widgetId);
    };

    // ---- validation ---------------------------------------------------------
    const customCheck = (el: HTMLInputElement | HTMLTextAreaElement) => {
      const value = el.value.trim();
      let ok = true;
      if (el.id === 'ct-first' || el.id === 'ct-last') ok = value.length > 0;
      if (el.id === 'ct-email') ok = EMAIL_RE.test(value);
      if (el.id === 'ct-phone') {
        ok = value === '' || (PHONE_RE.test(value) && value.replace(/\D/g, '').length >= 6);
      }
      if (el.id === 'ct-message') ok = value.length > 0 && el.value.length <= (el as HTMLTextAreaElement).maxLength;
      el.setCustomValidity(ok ? '' : 'invalid');
      return el.checkValidity();
    };

    const messageFor = (el: HTMLElement) => form.querySelector<HTMLElement>(`[data-error-for="${el.id}"]`);
    const showFieldError = (el: HTMLElement, show: boolean) => {
      el.setAttribute('aria-invalid', show ? 'true' : 'false');
      const msg = messageFor(el);
      if (msg) msg.dataset.visible = show ? 'true' : 'false';
    };

    const cleanups: (() => void)[] = [];
    controls.forEach((el) => {
      const onBlur = () => {
        // Only flag a field once the visitor has left it with something in it.
        if (el.value.trim() !== '' || el.getAttribute('aria-invalid') === 'true') showFieldError(el, !customCheck(el));
      };
      const onInput = () => {
        if (el.getAttribute('aria-invalid') === 'true' && customCheck(el)) showFieldError(el, false);
      };
      el.addEventListener('blur', onBlur);
      el.addEventListener('input', onInput);
      el.addEventListener('change', onInput);
      cleanups.push(() => {
        el.removeEventListener('blur', onBlur);
        el.removeEventListener('input', onInput);
        el.removeEventListener('change', onInput);
      });
    });

    const hideStatuses = () => statuses.forEach((s) => (s.hidden = true));
    const show = (name: string) => {
      const el = status(name);
      if (!el) return;
      el.hidden = false;
      if (name === 'success') el.focus();
      else el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };

    // ---- submit -------------------------------------------------------------
    const onSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      if (sending) return;
      hideStatuses();

      const invalid = controls.filter((el) => !customCheck(el));
      controls.forEach((el) => showFieldError(el, invalid.includes(el)));
      if (invalid.length > 0) {
        if (summary && summaryList) {
          summaryList.innerHTML = '';
          invalid.forEach((el) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${el.id}`;
            link.textContent = messageFor(el)?.textContent ?? el.id;
            link.addEventListener('click', (e) => {
              e.preventDefault();
              el.focus();
            });
            li.appendChild(link);
            summaryList.appendChild(li);
          });
          summary.hidden = false;
          summary.focus();
        }
        return;
      }
      if (summary) summary.hidden = true;

      if (!endpoint || !siteKey) {
        show('unconfigured');
        return;
      }

      sending = true;
      form.setAttribute('aria-busy', 'true');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const turnstileToken = await getToken();
        if (!turnstileToken) {
          show('verify');
          return;
        }
        const data = new FormData(form);
        const text = (name: string) => String(data.get(name) ?? '').trim();
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: text('first_name'),
            last_name: text('last_name'),
            email: text('email'),
            phone: text('phone'),
            message: String(data.get('message') ?? ''),
            consent: data.get('consent') === 'yes',
            website: String(data.get('website') ?? ''),
            elapsed_ms: Date.now() - startedAt,
            turnstile_token: turnstileToken,
            language: lang,
            page: location.pathname,
          }),
        });
        resetTurnstile(); // a token is single-use
        if (res.ok) {
          form.reset();
          updateCounter();
          controls.forEach((el) => showFieldError(el, false));
          show('success');
        } else if (res.status === 429) {
          show('too-many');
        } else if (res.status === 403) {
          show('verify');
        } else {
          show('failed');
        }
      } catch {
        resetTurnstile();
        // Keep everything the visitor typed so they can retry or email it.
        show('failed');
      } finally {
        sending = false;
        form.removeAttribute('aria-busy');
        if (submitBtn) submitBtn.disabled = false;
      }
    };

    form.addEventListener('submit', onSubmit);
    const w = window as Window & { __contactFormReady?: boolean };
    w.__contactFormReady = true;
    return () => {
      w.__contactFormReady = false;
      cancelled = true;
      form.removeEventListener('submit', onSubmit);
      message?.removeEventListener('input', updateCounter);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
