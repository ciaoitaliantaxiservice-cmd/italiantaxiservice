import { Fragment } from 'react';
import Icon from '../Icon';
import Tricolore from '../Tricolore';
import Breadcrumbs from '../Breadcrumbs';
import ContactForm from '../ContactForm';
import Placeholders from '../Placeholders';
import RichText from '../RichText';
import { t } from '../../data/content';
import { meta } from '../../data/seo';
import { routes, ui, type Lang } from '../../data/i18n';
import type { Crumb } from '../../data/schema';
import { site, emailHref, bookingHref } from '../../data/site.mjs';

/**
 * The contact page (redesigned 25 Nov 2026). Section rhythm:
 *  1 dark hero (breadcrumbs, H1, intro) · 2 cream band: the message form in a
 *  white card overlapping the hero, info cards beside it · 3 "Why write to
 *  us" on a light tint · 4 a short FAQ on white.
 * The quote form has its own page (routes.quote); old links to
 * /contact/#quote-form or /contact/?vehicle=… are forwarded there.
 */
export default function ContactBody({ lang, crumbs }: { lang: Lang; crumbs: Crumb[] }) {
  const c = t(lang).contact;
  const l = ui[lang];
  const h1 = meta.contact[lang].h1;
  const quoteHref = routes.quote[lang];

  const addressLines = [
    site.address.street,
    `${site.address.postalCode} ${site.address.city}`,
    site.address.region,
  ];

  return (
    <>
      {/* Links made before the quote form moved: send them to its new page. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var q=location.search;if(location.hash==='#quote-form'||/[?&](vehicle|pickup|dropoff)=/.test(q)){location.replace(${JSON.stringify(
            quoteHref
          )}+q+'#quote-form');}})();`,
        }}
      />

      {/* 1. Hero */}
      <section className="ct-hero" aria-labelledby="contact-h1">
        <Breadcrumbs lang={lang} crumbs={crumbs} className="breadcrumbs--on-dark" />
        <div className="wrap ct-hero__inner">
          <p className="eyebrow ct-hero__eyebrow">
            <Tricolore />
            <span className="label">{c.eyebrow}</span>
          </p>
          <h1 id="contact-h1">{h1}</h1>
          <p className="ct-hero__lead">{c.lead}</p>
        </div>
      </section>

      {/* 2. Form card and info cards */}
      <section className="ct-main" aria-label={c.form.heading}>
        <div className="wrap ct-grid">
          <div className="ct-card ct-card--form">
            <ContactForm lang={lang} />
          </div>

          <aside className="ct-aside">
            <div className="ct-info">
              <span className="icon-badge" aria-hidden="true">
                <Icon name="mail" />
              </span>
              <div>
                <h2 className="ct-info__title">{c.cards.emailHeading}</h2>
                <ul className="ct-mails">
                  <li>
                    <span className="ct-mails__label">{l.generalEnquiries}</span>
                    <a href={emailHref}>{site.emailInfo}</a>
                  </li>
                  <li>
                    <span className="ct-mails__label">{l.bookings}</span>
                    <a href={bookingHref}>{site.emailBooking}</a>
                  </li>
                </ul>
                <p className="ct-info__note">{c.cards.emailNote}</p>
              </div>
            </div>

            <div className="ct-info">
              <span className="icon-badge" aria-hidden="true">
                <Icon name="clock" />
              </span>
              <div>
                <h2 className="ct-info__title">{c.cards.hoursHeading}</h2>
                <p>{c.cards.hoursBody}</p>
              </div>
            </div>

            <div className="ct-info">
              <span className="icon-badge" aria-hidden="true">
                <Icon name="map-pin" />
              </span>
              <div>
                <h2 className="ct-info__title">{c.cards.addressHeading}</h2>
                {/* PLACEHOLDER(DATA:address): src/data/site.mjs → site.address */}
                <address className="ct-address" data-placeholder="DATA:contact-address">
                  {addressLines.map((line, i) => (
                    <Fragment key={i}>
                      <Placeholders text={line} />
                      <br />
                    </Fragment>
                  ))}
                </address>
              </div>
            </div>

            <div className="ct-info ct-info--quote">
              <span className="icon-badge" aria-hidden="true">
                <Icon name="tag" />
              </span>
              <div>
                <h2 className="ct-info__title">{c.cards.quoteHeading}</h2>
                <p>{c.cards.quoteBody}</p>
                <a className="btn btn--primary" href={quoteHref}>
                  {c.cards.quoteCta}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. Why write to us */}
      <section className="section ct-why" aria-labelledby="contact-why-heading">
        <div className="wrap">
          <div className="section__head ct-why__head">
            <p className="eyebrow">
              <span className="label">{c.why.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="contact-why-heading">
              {c.why.heading}
            </h2>
          </div>
          <ul className="ct-why__list">
            {c.why.items.map((item) => (
              <li key={item.title}>
                <span className="icon-badge" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>
                  <RichText text={item.body} lang={lang} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. FAQ: matches the FAQPage JSON-LD (minus placeholder markers). */}
      <section className="section ct-faq" aria-labelledby="contact-faq-heading">
        <div className="wrap wrap--narrow">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{c.faq.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="contact-faq-heading">
              {c.faq.heading}
            </h2>
          </div>
          <div className="faq">
            {c.faq.items.map((item) => (
              <details key={item.q}>
                <summary>
                  <span>{item.q}</span>
                  <Icon name="chevron-down" className="faq__chevron" />
                </summary>
                <div>
                  <p>
                    <RichText text={item.a} lang={lang} />
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
