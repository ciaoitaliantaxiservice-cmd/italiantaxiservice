'use client';

/**
 * Behaviour for the server-rendered quote form (QuoteForm.tsx).
 *
 * Client-side validation: native constraints do the checking; this layer
 * exists for the error summary, the per-field messages and focus management,
 * which the browser's own bubbles do not provide accessibly. A valid request
 * is inserted into Supabase (quote_requests) with the public key. The
 * database validates it again, rate-limits it and checks the honeypot; the
 * notify-quote Edge Function then emails it. See supabase/README.md.
 */
import { useEffect } from 'react';

export default function QuoteFormScript() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('[data-quote-form]');
    if (!form) return;

    const summary = form.querySelector<HTMLElement>('[data-error-summary]');
    const summaryList = summary?.querySelector('ul');
    const unconfigured = form.querySelector<HTMLElement>('[data-unconfigured]');
    const success = form.querySelector<HTMLElement>('[data-success]');
    const failed = form.querySelector<HTMLElement>('[data-failed]');
    const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const endpoint = form.dataset.endpoint || '';
    const key = form.dataset.key || '';
    let sending = false;

    const controls = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input[required], select[required], textarea[required]'
      )
    );

    const messageFor = (el: HTMLElement) =>
      form.querySelector<HTMLElement>(`[data-error-for="${el.id}"]`);

    const showFieldError = (el: HTMLElement, show: boolean) => {
      el.setAttribute('aria-invalid', show ? 'true' : 'false');
      const msg = messageFor(el);
      if (msg) msg.dataset.visible = show ? 'true' : 'false';
    };

    // One row for the quote_requests table. Optional blanks become null.
    const payload = () => {
      const data = new FormData(form);
      const text = (name: string) => String(data.get(name) ?? '').trim();
      const opt = (name: string) => text(name) || null;
      const int = (name: string) => {
        const n = Number.parseInt(text(name), 10);
        return Number.isFinite(n) ? n : null;
      };
      return {
        name: text('name'),
        email: text('email'),
        phone: text('phone'),
        service: opt('service'),
        pickup: text('pickup'),
        dropoff: text('dropoff'),
        travel_date: text('date'),
        travel_time: opt('time'),
        passengers: int('passengers'),
        luggage: int('luggage'),
        // Sent only when chosen: needs the `vehicle` column
        // (supabase/migrations/20261113020000_vehicle_preference.sql).
        ...(opt('vehicle') ? { vehicle: opt('vehicle') } : {}),
        // The Rome booking form's "Return trip" box. Sent only when ticked:
        // needs the `return_trip` column
        // (supabase/migrations/20261116000000_return_trip.sql).
        ...(data.get('return_trip') === 'yes' ? { return_trip: true } : {}),
        flight: opt('flight'),
        notes: opt('notes'),
        consent: data.get('consent') === 'yes',
        language: text('language'),
        form_type: text('form_type') || 'booking',
        // The hidden honeypot. The database marks a filled one as spam, keeps
        // it out of the inbox, and still answers "created", so bots learn nothing.
        honeypot: opt('_company'),
        page: location.pathname,
      };
    };

    const send = async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        apikey: key,
        // Insert only: the anon role cannot read the row back.
        Prefer: 'return=minimal',
      };
      // Legacy anon keys are JWTs and also go in Authorization; the newer
      // sb_publishable_ keys must not.
      if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload()),
      });
      if (!res.ok) throw new Error(`Supabase ${res.status}`);
    };

    // Prefill. From the URL: ?vehicle=<id> (a "Book the …" button on another
    // page), ?pickup= and ?dropoff=. From "Book" links on the same page
    // (a[data-prefill] with data-pickup / data-dropoff / data-vehicle): the
    // fields are filled in place and the form scrolls into view, no reload.
    // Those links keep a real ?…#quote-form href for a new tab or no script.
    const vehicleSelect = form.querySelector<HTMLSelectElement>('#qf-vehicle');
    const setVehicle = (id: string | null | undefined) => {
      if (!id || !vehicleSelect) return;
      const match = Array.from(vehicleSelect.options).find((o) => o.dataset.vehicleId === id);
      if (match) vehicleSelect.value = match.value;
    };
    const setText = (name: string, value: string | null | undefined) => {
      const el = form.elements.namedItem(name);
      if (value && el instanceof HTMLInputElement) el.value = value.slice(0, 300);
    };
    const params = new URLSearchParams(location.search);
    setVehicle(params.get('vehicle'));
    setText('pickup', params.get('pickup'));
    setText('dropoff', params.get('dropoff'));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPrefill = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[data-prefill]');
      if (!link || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const d = link.dataset;
      setText('pickup', d.pickup);
      setText('dropoff', d.dropoff);
      setVehicle(d.vehicle);
      form.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    };
    document.addEventListener('click', onPrefill);

    // Clear a field's error as soon as it becomes valid again.
    const cleanups: (() => void)[] = [];
    controls.forEach((el) => {
      const onBlur = () => {
        if (el.checkValidity()) showFieldError(el, false);
      };
      const onInput = () => {
        if (el.getAttribute('aria-invalid') === 'true' && el.checkValidity()) {
          showFieldError(el, false);
        }
      };
      el.addEventListener('blur', onBlur);
      el.addEventListener('input', onInput);
      cleanups.push(() => {
        el.removeEventListener('blur', onBlur);
        el.removeEventListener('input', onInput);
      });
    });

    const onSubmit = async (event: SubmitEvent) => {
      // The form never navigates: the request goes out with fetch below.
      event.preventDefault();
      if (sending) return;

      const invalid = controls.filter((el) => !el.checkValidity());

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
      if (failed) failed.hidden = true;

      // No backend configured yet: keep the data in front of the user and
      // point them at a channel that actually reaches someone.
      if (!endpoint || !key) {
        if (unconfigured) {
          unconfigured.hidden = false;
          unconfigured.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
        return;
      }

      sending = true;
      form.setAttribute('aria-busy', 'true');
      if (submitBtn) submitBtn.disabled = true;

      try {
        await send();
        form.reset();
        if (success) {
          success.hidden = false;
          success.focus();
        }
      } catch {
        // Keep everything the visitor typed so they can retry or email it.
        if (failed) {
          failed.hidden = false;
          failed.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      } finally {
        sending = false;
        form.removeAttribute('aria-busy');
        if (submitBtn) submitBtn.disabled = false;
      }
    };

    form.addEventListener('submit', onSubmit);

    // Hand-over from the inline guard in QuoteForm.tsx: from now on this
    // handler owns submits, and one pressed before it was ready is sent now.
    const w = window as Window & { __quoteFormReady?: boolean; __quoteFormQueued?: boolean };
    w.__quoteFormReady = true;
    if (w.__quoteFormQueued) {
      w.__quoteFormQueued = false;
      form.requestSubmit();
    }

    return () => {
      document.removeEventListener('click', onPrefill);
      w.__quoteFormReady = false;
      form.removeEventListener('submit', onSubmit);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
