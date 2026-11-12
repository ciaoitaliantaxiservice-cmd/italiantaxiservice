import HeroPhoto from '../HeroPhoto';
import CtaBand from '../CtaBand';
import Placeholders from '../Placeholders';
import Tricolore from '../Tricolore';
import { altFor } from '../../data/image-alt';
import { t } from '../../data/content';
import { meta } from '../../data/seo';
import { type Lang } from '../../data/i18n';

export default function AboutBody({ lang }: { lang: Lang }) {
  const c = t(lang).about;
  const h1 = meta.about[lang].h1;
  const portraitAlt = altFor('italian-chauffeur-service-portrait', lang);

  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <Tricolore />
              <span className="label">{lang === 'en' ? 'About us' : 'Chi siamo'}</span>
            </p>
            <h1>{h1}</h1>
          </div>

          <div className="hero__grid">
            <div className="hero__col prose">
              <h2>{c.storyHeading}</h2>
              {c.story.map((para) => (
                <p key={para}>
                  <Placeholders text={para} />
                </p>
              ))}
            </div>
            <figure className="hero__media">
              <HeroPhoto
                name="italian-chauffeur-service-portrait"
                alt={portraitAlt}
                position="47% 30%"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="values-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{lang === 'en' ? 'Values' : 'Valori'}</span>
            </p>
            <h2 id="values-heading">{c.valuesHeading}</h2>
          </div>

          <div className="card-grid card-grid--wide">
            {c.values.map((value) => (
              <article className="card" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="trust-heading">
        <div className="wrap contact-grid">
          <div>
            <div className="section__head">
              <p className="eyebrow">
                <span className="label">{lang === 'en' ? 'Drivers' : 'Autisti'}</span>
              </p>
              <h2 id="trust-heading">{c.teamHeading}</h2>
            </div>
            <div className="prose">
              {c.team.map((para) => (
                <p key={para}>
                  <Placeholders text={para} />
                </p>
              ))}
            </div>
          </div>

          <div className="panel">
            <h2 className="title-sm">{c.trustHeading}</h2>
            <dl className="spec-list" style={{ marginTop: 'var(--s-4)' }}>
              {c.trust.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    <Placeholders text={row.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="note" style={{ marginTop: 'var(--s-4)' }}>
              {c.trustNote}
            </p>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
