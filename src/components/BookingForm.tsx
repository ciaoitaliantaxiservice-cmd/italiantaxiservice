import { t } from '../data/content';
import { type Lang } from '../data/i18n';
import { type RomeCopy } from '../data/rome';
import { fleet } from '../data/fleet';
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_TABLE } from '../data/site.mjs';
import QuoteFormScript from './QuoteFormScript';
import { EARLY_SUBMIT_GUARD } from './QuoteForm';

/**
 * The location pages' booking form (Rome, Milan): the hero's "booking bar".
 *
 * Same pipeline as the contact page's QuoteForm: same field names, the same
 * QuoteFormScript (validation, error summary, honeypot, send) and the same
 * Supabase insert, which the notify-quote function emails to the bookings
 * inbox (BOOKING_EMAIL_TO, see supabase/README.md). Only the layout and the
 * field set differ: no service or flight fields, a vehicle-type choice from
 * the shared premium fleet (src/data/fleet.ts), and a "Return trip" checkbox.
 * Each page passes its own wording (`copy`, the `form` block of its copy).
 *
 * Required fields are marked with an asterisk, explained by the note under
 * the heading; `required` itself is what assistive tech announces.
 */
export type BookingFormCopy = RomeCopy['form'];

export default function BookingForm({ lang, copy }: { lang: Lang; copy: BookingFormCopy }) {
  const f = t(lang).form;
  const r = copy;
  const today = new Date().toISOString().slice(0, 10);

  const endpoint =
    SUPABASE_URL && SUPABASE_ANON_KEY
      ? `${SUPABASE_URL.replace(/\/+$/, '')}/rest/v1/${SUPABASE_TABLE}`
      : '';

  const star = (
    <span className="bookbar__req" aria-hidden="true">
      {' *'}
    </span>
  );

  return (
    <>
      <form
        className="form bookbar"
        id="quote-form"
        method="post"
        noValidate
        data-quote-form=""
        data-endpoint={endpoint}
        data-key={endpoint ? SUPABASE_ANON_KEY : ''}
        aria-labelledby="quote-form-heading"
      >
        <div className="form__head">
          <h2 id="quote-form-heading">{r.heading}</h2>
          <span className="note">
            {`${r.note} `}
            <span aria-hidden="true">{`* ${f.required}`}</span>
          </span>
        </div>

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

        <div className="bookbar__grid">
          <div className="field bk-wide">
            <label htmlFor="qf-pickup">
              {r.pickup}
              {star}
            </label>
            <input
              type="text"
              id="qf-pickup"
              name="pickup"
              placeholder={r.pickupPh}
              required
              aria-describedby="qf-pickup-error"
            />
            <p className="field__error" id="qf-pickup-error" data-error-for="qf-pickup">
              {f.errors.pickup}
            </p>
          </div>

          <div className="field bk-wide">
            <label htmlFor="qf-dropoff">
              {r.dropoff}
              {star}
            </label>
            <input
              type="text"
              id="qf-dropoff"
              name="dropoff"
              placeholder={r.dropoffPh}
              required
              aria-describedby="qf-dropoff-error"
            />
            <p className="field__error" id="qf-dropoff-error" data-error-for="qf-dropoff">
              {f.errors.dropoff}
            </p>
          </div>

          <div className="field">
            <label htmlFor="qf-date">
              {r.date}
              {star}
            </label>
            <input type="date" id="qf-date" name="date" min={today} required aria-describedby="qf-date-error" />
            <p className="field__error" id="qf-date-error" data-error-for="qf-date">
              {f.errors.date}
            </p>
          </div>

          <div className="field">
            <label htmlFor="qf-time">{r.time}</label>
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

          {/* Pre-selected by the fleet cards' "Book" buttons (data-vehicle)
              or ?vehicle=<id>. Stored as the English class name. */}
          <div className="field bk-wide">
            <label htmlFor="qf-vehicle">{r.vehicle}</label>
            <select id="qf-vehicle" name="vehicle" defaultValue="">
              <option value="">{r.vehicleNone}</option>
              {fleet.map((v) => (
                <option value={v.formValue} data-vehicle-id={v.id} key={v.id}>
                  {`${v.name[lang]} · ${v.tier[lang]}`}
                </option>
              ))}
            </select>
          </div>

          <div className="field bk-wide">
            <label htmlFor="qf-name">
              {f.name}
              {star}
            </label>
            <input type="text" id="qf-name" name="name" autoComplete="name" required aria-describedby="qf-name-error" />
            <p className="field__error" id="qf-name-error" data-error-for="qf-name">
              {f.errors.name}
            </p>
          </div>

          <div className="field bk-wide">
            <label htmlFor="qf-email">
              {f.email}
              {star}
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

          <div className="field bk-wide">
            <label htmlFor="qf-phone">
              {r.phone}
              {star}
            </label>
            <input type="tel" id="qf-phone" name="phone" autoComplete="tel" required aria-describedby="qf-phone-error" />
            <p className="field__error" id="qf-phone-error" data-error-for="qf-phone">
              {f.errors.phone}
            </p>
          </div>

          <div className="field bk-wide">
            <label htmlFor="qf-notes">{r.notes}</label>
            <textarea id="qf-notes" name="notes" rows={1} placeholder={r.notesPh}></textarea>
          </div>
        </div>

        <div className="bookbar__foot">
          <div className="bookbar__checks">
            <div className="field field--check">
              <input type="checkbox" id="qf-return" name="return_trip" value="yes" aria-describedby="qf-return-hint" />
              <label htmlFor="qf-return">
                <strong>{r.returnTrip}</strong>
                <span className="muted" id="qf-return-hint">{` (${r.returnHint})`}</span>
              </label>
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
              <label htmlFor="qf-consent">
                {f.consent}
                {star}
              </label>
              <p className="field__error" id="qf-consent-error" data-error-for="qf-consent">
                {f.errors.consent}
              </p>
            </div>
          </div>

          <button className="btn btn--primary btn--lg bookbar__submit" type="submit">
            {r.submit}
          </button>
        </div>

        {/* Honeypot: bots fill it, people never see it. */}
        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor="qf-company">Company</label>
          <input type="text" id="qf-company" name="_company" tabIndex={-1} autoComplete="off" />
        </div>

        <input type="hidden" name="language" value={lang} />
        <input type="hidden" name="form_type" value="booking" />

        <div className="form__status form__status--info" data-unconfigured="" role="status" hidden>
          {f.unconfigured}
        </div>
        <div className="form__status form__status--error" data-failed="" role="alert" hidden>
          {f.failed}
        </div>
        <div className="form__status form__status--success" data-success="" role="status" tabIndex={-1} hidden>
          {f.success}
        </div>

        <QuoteFormScript />
      </form>
      <script dangerouslySetInnerHTML={{ __html: EARLY_SUBMIT_GUARD }} />
    </>
  );
}
