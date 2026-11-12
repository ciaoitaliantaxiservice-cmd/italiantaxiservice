import HeroPhoto from '../HeroPhoto';
import Icon from '../Icon';
import CtaBand from '../CtaBand';
import Tricolore from '../Tricolore';
import { altFor } from '../../data/image-alt';
import { t } from '../../data/content';
import { meta } from '../../data/seo';
import { routes, ui, type Lang } from '../../data/i18n';
import { emailHref } from '../../data/site.mjs';

export default function HomeBody({ lang }: { lang: Lang }) {
  const c = t(lang).home;
  const l = ui[lang];
  const h1 = meta.home[lang].h1;

  const labels =
    lang === 'en'
      ? {
          from: 'From',
          to: 'To',
          time: 'Typical time',
          price: 'From',
          coverage: 'Across Italy',
          services: 'Services',
          how: 'How it works',
          routes: 'Routes',
          why: 'Why us',
          faq: 'FAQ',
        }
      : {
          from: 'Da',
          to: 'A',
          time: 'Tempo indicativo',
          price: 'Da',
          coverage: 'In tutta Italia',
          services: 'Servizi',
          how: 'Come funziona',
          routes: 'Tratte',
          why: 'Perché noi',
          faq: 'Domande',
        };

  const heroAlt = altFor('private-chauffeur-transfer-italy', lang);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__col">
            <p className="eyebrow">
              <Tricolore />
              <span className="label">{labels.coverage}</span>
            </p>
            <h1>{h1}</h1>
            <p className="lead">{c.heroLead}</p>

            <div className="btn-row">
              <a className="btn btn--primary" href={`${routes.contact[lang]}#quote-form`}>
                <Icon name="tag" />
                {l.getQuote}
              </a>
              <a className="btn btn--outline" href={emailHref}>
                <Icon name="mail" />
                {l.emailUs}
              </a>
            </div>

            <ul className="hero__trust">
              {c.heroTrust.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="hero__media">
            {/* The chauffeur stands left of centre, so the crop is pulled left
                to keep him and the open door in frame on narrow screens. */}
            <HeroPhoto name="private-chauffeur-transfer-italy" alt={heroAlt} position="21% 50%" />
          </figure>
        </div>
      </section>

      {/* Trust strip. The eyebrow and h2 are kept for the outline and screen
          readers but hidden visually. */}
      <section className="trust-strip" aria-labelledby="why-heading">
        <div className="visually-hidden">
          <p>{labels.why}</p>
          <h2 id="why-heading">{c.whyHeading}</h2>
        </div>
        <ul className="wrap">
          {c.why.map((item) => (
            <li key={item.title}>
              <Icon name={item.icon} />
              <div>
                <h3 className="trust-strip__title">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="section" aria-labelledby="services-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{labels.services}</span>
            </p>
            <h2 id="services-heading">{c.servicesHeading}</h2>
          </div>

          <div className="card-grid">
            {c.services.map((service) => (
              <article className="card" key={service.title}>
                <Icon name={service.icon} className="card__icon" />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <ul className="card__list">
                  {service.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--tint" aria-labelledby="how-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{labels.how}</span>
            </p>
            <h2 id="how-heading">{c.howHeading}</h2>
          </div>

          <ol className="steps">
            {c.how.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Routes */}
      <section className="section" aria-labelledby="routes-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{labels.routes}</span>
            </p>
            <h2 id="routes-heading">{c.routesHeading}</h2>
            <p>{c.routesLead}</p>
          </div>

          <div className="routes__scroll">
            <table className="routes">
              <caption>{c.routesNote}</caption>
              <thead>
                <tr>
                  <th scope="col">{labels.from}</th>
                  <th scope="col">{labels.to}</th>
                  <th scope="col">{labels.time}</th>
                  <th scope="col">{labels.price}</th>
                </tr>
              </thead>
              <tbody>
                {c.routes.map((route) => (
                  <tr key={`${route.from}-${route.to}`}>
                    <th scope="row">{route.from}</th>
                    <td>{route.to}</td>
                    <td>{route.time}</td>
                    <td>
                      <span className="placeholder">{route.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ. Matches the FAQPage JSON-LD emitted by the page that renders this. */}
      <section className="section section--tint" aria-labelledby="faq-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{labels.faq}</span>
            </p>
            <h2 id="faq-heading">{c.faqHeading}</h2>
          </div>

          <div className="faq">
            {c.faq.map((item) => (
              <details key={item.q}>
                <summary>
                  <span>{item.q}</span>
                  <Icon name="chevron-down" className="faq__chevron" />
                </summary>
                <div>
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
