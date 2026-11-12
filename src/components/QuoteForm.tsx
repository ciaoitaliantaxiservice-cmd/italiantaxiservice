import { t } from '../data/content';
import { type Lang } from '../data/i18n';
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_TABLE } from '../data/site.mjs';
import QuoteFormScript from './QuoteFormScript';

/**
 * Runs as soon as the form is parsed, before React has started. A submit in
 * that first moment would otherwise be a plain browser POST to this static
 * page, and the request would be lost. It is held instead, and sent by
 * QuoteFormScript the moment it is ready.
 */
const EARLY_SUBMIT_GUARD = `(function () {
  var form = document.getElementById('quote-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    if (!window.__quoteFormReady) {
      e.preventDefault();
      window.__quoteFormQueued = true;
    }
  });
})();`;

interface Props {
  lang: Lang;
  /** Rendered as the form's accessible name. */
  heading: string;
  /** Heading level so the form slots into each page's outline correctly. */
  headingLevel?: 2 | 3;
  note?: string;
}

export default function QuoteForm({ lang, heading, headingLevel = 2, note }: Props) {
  const f = t(lang).form;
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  const today = new Date().toISOString().slice(0, 10);

  // Supabase REST insert endpoint; empty until both URL and key are set.
  const endpoint =
    SUPABASE_URL && SUPABASE_ANON_KEY
      ? `${SUPABASE_URL.replace(/\/+$/, '')}/rest/v1/${SUPABASE_TABLE}`
      : '';

  return (
    <>
      <form
        className="form"
        id="quote-form"
        method="post"
        noValidate
        data-quote-form=""
        data-endpoint={endpoint}
        data-key={endpoint ? SUPABASE_ANON_KEY : ''}
        aria-labelledby="quote-form-heading"
      >
        <div className="form__head">
          <Heading id="quote-form-heading">{heading}</Heading>
          {note && <span className="note">{note}</span>}
        </div>

        {/* Error summary. Populated by script, focused on failed submit. */}
        <div
          className="form__status form__status--error"
          id="form-errors"
          role="alert"
          tabIndex={-1}
          data-error-summary=""
          hidden
        >
          <strong>{f.errors.summary}</strong>
          <ul></ul>
        </div>

        <div className="form__row form__row--2">
          <div className="field">
            <label htmlFor="qf-name">
              {`${f.name} `}
              <span className="field__hint">{`(${f.required})`}</span>
            </label>
            <input
              type="text"
              id="qf-name"
              name="name"
              autoComplete="name"
              required
              aria-describedby="qf-name-error"
            />
            <p className="field__error" id="qf-name-error" data-error-for="qf-name">
              {f.errors.name}
            </p>
          </div>

          <div className="field">
            <label htmlFor="qf-email">
              {`${f.email} `}
              <span className="field__hint">{`(${f.required})`}</span>
            </label>
            <input
              type="email"
              id="qf-email"
              name="email"
              autoComplete="email"
              required
              aria-describedby="qf-email-error"
            />
            <p className="field__error" id="qf-email-error" data-error-for="qf-email">
              {f.errors.email}
            </p>
          </div>
        </div>

        <div className="form__row form__row--2">
          <div className="field">
            <label htmlFor="qf-phone">
              {`${f.phone} `}
              <span className="field__hint">{`(${f.required})`}</span>
            </label>
            <input
              type="tel"
              id="qf-phone"
              name="phone"
              autoComplete="tel"
              required
              aria-describedby="qf-phone-error"
            />
            <p className="field__error" id="qf-phone-error" data-error-for="qf-phone">
              {f.errors.phone}
            </p>
          </div>

          <div className="field">
            <label htmlFor="qf-service">{f.service}</label>
            <select id="qf-service" name="service">
              {f.serviceOptions.map((opt) => (
                <option value={opt} key={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form__row form__row--2">
          <div className="field">
            <label htmlFor="qf-pickup">
              {`${f.pickup} `}
              <span className="field__hint">{`(${f.required})`}</span>
            </label>
            <input type="text" id="qf-pickup" name="pickup" required aria-describedby="qf-pickup-error" />
            <p className="field__error" id="qf-pickup-error" data-error-for="qf-pickup">
              {f.errors.pickup}
            </p>
          </div>

          <div className="field">
            <label htmlFor="qf-dropoff">
              {`${f.dropoff} `}
              <span className="field__hint">{`(${f.required})`}</span>
            </label>
            <input
              type="text"
              id="qf-dropoff"
              name="dropoff"
              required
              aria-describedby="qf-dropoff-error"
            />
            <p className="field__error" id="qf-dropoff-error" data-error-for="qf-dropoff">
              {f.errors.dropoff}
            </p>
          </div>
        </div>

        <div className="form__row form__row--3">
          <div className="field">
            <label htmlFor="qf-date">
              {`${f.date} `}
              <span className="field__hint">{`(${f.required})`}</span>
            </label>
            <input
              type="date"
              id="qf-date"
              name="date"
              min={today}
              required
              aria-describedby="qf-date-error"
            />
            <p className="field__error" id="qf-date-error" data-error-for="qf-date">
              {f.errors.date}
            </p>
          </div>

          <div className="field">
            <label htmlFor="qf-time">
              {`${f.time} `}
              <span className="field__hint">{`(${f.optional})`}</span>
            </label>
            <input type="time" id="qf-time" name="time" />
          </div>

          <div className="field">
            <label htmlFor="qf-passengers">{f.passengers}</label>
            <input
              type="number"
              id="qf-passengers"
              name="passengers"
              min="1"
              max="16"
              defaultValue="2"
              inputMode="numeric"
            />
          </div>

          <div className="field">
            <label htmlFor="qf-luggage">{f.luggage}</label>
            <input
              type="number"
              id="qf-luggage"
              name="luggage"
              min="0"
              max="20"
              defaultValue="2"
              inputMode="numeric"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="qf-flight">
            {`${f.flight} `}
              <span className="field__hint">{`(${f.optional})`}</span>
          </label>
          <input type="text" id="qf-flight" name="flight" aria-describedby="qf-flight-help" />
          <p className="field__hint" id="qf-flight-help">
            {f.flightHelp}
          </p>
        </div>

        <div className="field">
          <label htmlFor="qf-notes">
            {`${f.notes} `}
              <span className="field__hint">{`(${f.optional})`}</span>
          </label>
          <textarea id="qf-notes" name="notes" rows={4} aria-describedby="qf-notes-help"></textarea>
          <p className="field__hint" id="qf-notes-help">
            {f.notesHelp}
          </p>
        </div>

        <div className="field field--check">
          <input
            type="checkbox"
            id="qf-consent"
            name="consent"
            value="yes"
            required
            aria-describedby="qf-consent-error"
          />
          <label htmlFor="qf-consent">{f.consent}</label>
          <p className="field__error" id="qf-consent-error" data-error-for="qf-consent">
            {f.errors.consent}
          </p>
        </div>

        {/* Honeypot: bots fill it, people never see it. */}
        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor="qf-company">Company</label>
          <input type="text" id="qf-company" name="_company" tabIndex={-1} autoComplete="off" />
        </div>

        <input type="hidden" name="language" value={lang} />
        {/* Quote/booking form: alerts go to booking@. A general contact form
            would send "enquiry" (alerts to info@). */}
        <input type="hidden" name="form_type" value="booking" />

        <div>
          <button className="btn btn--primary btn--lg" type="submit">
            {f.submit}
          </button>
        </div>

        <div className="form__status form__status--info" data-unconfigured="" role="status" hidden>
          {f.unconfigured}
        </div>

        <div className="form__status form__status--error" data-failed="" role="alert" hidden>
          {f.failed}
        </div>

        <div
          className="form__status form__status--success"
          data-success=""
          role="status"
          tabIndex={-1}
          hidden
        >
          {f.success}
        </div>

        <QuoteFormScript />
      </form>
      <script dangerouslySetInnerHTML={{ __html: EARLY_SUBMIT_GUARD }} />
    </>
  );
}
