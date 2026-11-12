import { Fragment } from 'react';
import Icon from '../Icon';
import QuoteForm from '../QuoteForm';
import Placeholders from '../Placeholders';
import Tricolore from '../Tricolore';
import CoverageMap from '../CoverageMap';
import { t } from '../../data/content';
import { meta } from '../../data/seo';
import { ui, type Lang } from '../../data/i18n';
import { site, emailHref, bookingHref } from '../../data/site.mjs';

export default function ContactBody({ lang }: { lang: Lang }) {
  const c = t(lang).contact;
  const l = ui[lang];
  const h1 = meta.contact[lang].h1;

  const addressLines = [
    site.address.street,
    `${site.address.postalCode} ${site.address.city}`,
    site.address.region,
  ];

  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <Tricolore />
              <span className="label">{lang === 'en' ? 'Contact' : 'Contatti'}</span>
            </p>
            <h1>{h1}</h1>
            <p>{c.lead}</p>
          </div>

          <div className="contact-grid">
            <div>
              <QuoteForm lang={lang} heading={c.formHeading} headingLevel={2} note={c.formNote} />
            </div>

            <div className="stack">
              {/* Requests come in through the form or by email only. */}
              <div>
                <h2>{c.methodsHeading}</h2>
                <p className="muted" style={{ marginTop: 'var(--s-2)' }}>
                  {c.methodsNote}
                </p>
                <ul className="method-list" style={{ marginTop: 'var(--s-4)' }}>
                  <li>
                    <a className="method" href={emailHref}>
                      <Icon name="mail" />
                      <span>
                        <span className="method__label">{l.generalEnquiries}</span>
                        <span className="method__value">{site.emailInfo}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="method" href={bookingHref}>
                      <Icon name="mail" />
                      <span>
                        <span className="method__label">{l.bookings}</span>
                        <span className="method__value">{site.emailBooking}</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="panel">
                <h2 className="title-sm">{c.hoursHeading}</h2>
                <p style={{ marginTop: 'var(--s-2)' }}>{c.hoursBody}</p>
                <p className="muted" style={{ marginTop: 'var(--s-2)' }}>
                  {c.hoursMore}
                </p>
              </div>

              <div className="panel">
                <h2 className="title-sm">{c.responseHeading}</h2>
                <p style={{ marginTop: 'var(--s-2)' }}>{c.responseBody}</p>
              </div>

              <div className="panel">
                <h2 className="title-sm">{c.addressHeading}</h2>
                <address style={{ marginTop: 'var(--s-2)', fontStyle: 'normal' }} className="muted">
                  <Placeholders text={site.legalName} />
                  <br />
                  {addressLines.map((line, i) => (
                    <Fragment key={i}>
                      <Placeholders text={line} />
                      <br />
                    </Fragment>
                  ))}
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CoverageMap lang={lang} />
    </>
  );
}
