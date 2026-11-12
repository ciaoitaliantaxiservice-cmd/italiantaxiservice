import CtaBand from '../CtaBand';
import Icon from '../Icon';
import Picture from '../Picture';
import Tricolore from '../Tricolore';
import { altFor } from '../../data/image-alt';
import { t } from '../../data/content';
import { meta } from '../../data/seo';
import { type Lang } from '../../data/i18n';
import { cities, cityPath } from '../../data/cities';

// Card image widths: one column on phones, two from 46rem, three from 67rem,
// capped by the 80rem wrap. Lets the browser pick the smallest file that is
// still sharp at the device's pixel ratio.
const thumbSizes =
  '(min-width: 80rem) 410px, (min-width: 67rem) calc((100vw - 3rem) / 3), (min-width: 46rem) calc((100vw - 3rem) / 2), calc(100vw - 2rem)';

export default function LocationsBody({ lang }: { lang: Lang }) {
  const c = t(lang).locations;
  const h1 = meta.locations[lang].h1;

  const thumbAlt = (name: string) =>
    lang === 'en'
      ? `Photo placeholder for ${name}: a street-level view with a waiting car.`
      : `Segnaposto fotografico per ${name}: una veduta dalla strada con l’auto in attesa.`;

  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <Tricolore />
              <span className="label">{lang === 'en' ? 'Coverage' : 'Copertura'}</span>
            </p>
            <h1>{h1}</h1>
            <p>{c.lead}</p>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="cities-heading">
        <div className="wrap">
          <h2 id="cities-heading" className="visually-hidden">
            {c.gridHeading}
          </h2>

          <div className="card-grid card-grid--wide">
            {cities.map((city) => (
              <article className="city-card" key={city.id}>
                <div className="city-card__thumb">
                  {/* Lazy, like every image except the page heroes. */}
                  {city.photo ? (
                    <Picture
                      name={city.photo.altKey}
                      alt={altFor(city.photo.altKey, lang)}
                      sizes={thumbSizes}
                      loading="lazy"
                      fetchPriority="auto"
                    />
                  ) : (
                    <span>{thumbAlt(city.name[lang])}</span>
                  )}
                </div>
                <div className="city-card__body">
                  <h3>
                    <a href={cityPath(city, lang)}>{city.name[lang]}</a>
                  </h3>
                  <p className="city-card__gateways">
                    <Icon name="map-pin" />
                    <span>{city.gateways[lang]}</span>
                  </p>
                  <p>{city.cardText[lang]}</p>
                  <p className="city-card__flag">{c.comingSoonLabel}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="prose" style={{ marginTop: 'var(--s-14)' }}>
            <h2>
              {lang === 'en' ? 'Somewhere else in mind?' : 'Avete in mente un’altra destinazione?'}
            </h2>
            <p style={{ marginTop: 'var(--s-4)' }}>{c.secondary}</p>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} heading={c.ctaHeading} body={c.ctaBody} />
    </>
  );
}
