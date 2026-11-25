import { t } from '../data/content';
import { type Lang } from '../data/i18n';
import { SUPABASE_URL, site, emailHref } from '../data/site.mjs';
import RichText from './RichText';
import ContactFormScript from './ContactFormScript';

/** Longest message accepted, here and in the contact-message Edge Function. */
export const MESSAGE_MAX = 1500;

/**
 * The contact page's message form (not the quote form, which lives on the
 * Get a quote page and is unchanged).
 *
 * How a message travels: the browser posts it (with a Cloudflare Turnstile
 * token) to the `contact-message` Supabase Edge Function. The function
 * verifies the token with Cloudflare, checks the honeypot, the 3-second
 * minimum and the rate limit (5 per IP per hour), cleans and re-validates
 * every field, stores the message and emails it to info@ through the same
 * Gmail SMTP set-up as the quote alerts. See supabase/README.md.
 *
 * The Turnstile site key is read at build time from TURNSTILE_SITE_KEY (see
 * .env.example). Without it, or without the function URL, the form still
 * validates and then points the visitor at email instead.
 */
export default function ContactForm({ lang }: { lang: Lang }) {
  const f = t(lang).contact.form;
  const siteKey = (process.env.TURNSTILE_SITE_KEY ?? '').trim();
  const endpoint = SUPABASE_URL ? `${SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/contact-message` : '';

  const star = (
    <span className="ct-req" aria-hidden="true">
      {' *'}
    </span>
  );
  const emailLink = (
    <a href={emailHref}>{site.emailInfo}</a>
  );

  return (
    <>
      <form
        className="form ct-form"
        id="contact-form"
        method="post"
        noValidate
        data-contact-form=""
        data-endpoint={endpoint}
        data-sitekey={siteKey}
        data-lang={lang}
        aria-labelledby="contact-form-heading"
      >
        <div className="form__head">
          <h2 id="contact-form-heading">{f.heading}</h2>
          <span className="note">{f.note}</span>
        </div>

        <div
          className="form__status form__status--error"
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
            <label htmlFor="ct-first">
              {f.firstName}
              {star}
            </label>
            <input
              type="text"
              id="ct-first"
              name="first_name"
              autoComplete="given-name"
              maxLength={100}
              required
              aria-describedby="ct-first-error"
            />
            <p className="field__error" id="ct-first-error" data-error-for="ct-first">
              {f.errors.firstName}
            </p>
          </div>
          <div className="field">
            <label htmlFor="ct-last">
              {f.lastName}
              {star}
            </label>
            <input
              type="text"
              id="ct-last"
              name="last_name"
              autoComplete="family-name"
              maxLength={100}
              required
              aria-describedby="ct-last-error"
            />
            <p className="field__error" id="ct-last-error" data-error-for="ct-last">
              {f.errors.lastName}
            </p>
          </div>
        </div>

        <div className="form__row form__row--2">
          <div className="field">
            <label htmlFor="ct-email">
              {f.email}
              {star}
            </label>
            <input
              type="email"
              id="ct-email"
              name="email"
              autoComplete="email"
              inputMode="email"
              maxLength={320}
              required
              aria-describedby="ct-email-error"
            />
            <p className="field__error" id="ct-email-error" data-error-for="ct-email">
              {f.errors.email}
            </p>
          </div>
          <div className="field">
            <label htmlFor="ct-phone">
              {`${f.phone} `}
              <span className="field__hint">{`(${f.optional})`}</span>
            </label>
            <input
              type="tel"
              id="ct-phone"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              maxLength={30}
              data-validate="phone"
              aria-describedby="ct-phone-hint ct-phone-error"
            />
            <p className="field__error" id="ct-phone-error" data-error-for="ct-phone">
              {f.errors.phone}
            </p>
            <p className="field__hint" id="ct-phone-hint">
              {f.phoneHint}
            </p>
          </div>
        </div>

        <div className="field">
          <label htmlFor="ct-message">
            {f.message}
            {star}
          </label>
          <textarea
            id="ct-message"
            name="message"
            rows={6}
            maxLength={MESSAGE_MAX}
            required
            aria-describedby="ct-message-count ct-message-error"
          ></textarea>
          <p className="ct-counter" id="ct-message-count" data-counter="" data-template={f.counter}>
            {f.counter.replace('{n}', '0')}
          </p>
          <p className="field__error" id="ct-message-error" data-error-for="ct-message">
            {f.errors.message}
          </p>
        </div>

        {/* Honeypot: bots fill it, people never see it. */}
        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor="ct-website">Website</label>
          <input type="text" id="ct-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="field field--check">
          <input type="checkbox" id="ct-consent" name="consent" value="yes" required aria-describedby="ct-consent-error" />
          <label htmlFor="ct-consent">
            {f.consent}
            {star}
          </label>
          <p className="field__error" id="ct-consent-error" data-error-for="ct-consent">
            {f.errors.consent}
          </p>
        </div>

        {/* Cloudflare Turnstile (invisible unless a check is needed). */}
        <div className="ct-turnstile" data-turnstile=""></div>

        <div>
          <button className="btn btn--primary btn--lg" type="submit">
            {f.submit}
          </button>
        </div>

        <div className="form__status form__status--success" role="status" tabIndex={-1} data-status="success" hidden>
          <strong>{f.successTitle}</strong>
          <br />
          <RichText text={f.success} lang={lang} />
        </div>
        <div className="form__status form__status--error" role="alert" data-status="failed" hidden>
          {`${f.failed} `}
          {emailLink}.
        </div>
        <div className="form__status form__status--error" role="alert" data-status="too-many" hidden>
          {`${f.tooMany} `}
          {emailLink}.
        </div>
        <div className="form__status form__status--error" role="alert" data-status="verify" hidden>
          {f.verify}
        </div>
        <div className="form__status form__status--info" role="status" data-status="unconfigured" hidden>
          {`${f.unconfigured} `}
          {emailLink}.
        </div>
      </form>
      {/* Until the script below is ready, a submit must not post to this
          static page (it would reload and lose the message). */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.getElementById('contact-form').addEventListener('submit',function(e){if(!window.__contactFormReady)e.preventDefault();});",
        }}
      />
      <ContactFormScript />
    </>
  );
}
