import Icon from '../Icon';
import Picture from '../Picture';
import { ImagePlaceholder, Marker } from '../Placeholders';
import CarouselScript from '../CarouselScript';
import { altFor } from '../../data/image-alt';
import { t } from '../../data/content';
import { routes, type Lang } from '../../data/i18n';
import { serviceAreas, areaPath } from '../../data/service-areas';

// Card widths match .areas__track's grid-auto-columns in components.css.
const cardSizes =
  '(min-width: 80rem) 296px, (min-width: 64rem) calc((100vw - 3rem - 3rem) / 4), (min-width: 40rem) calc((100vw - 3rem - 2rem) / 2.6), 72vw';

/** Homepage: "Where We Serve" / "Dove operiamo". */
export default function ServiceAreas({ lang }: { lang: Lang }) {
  const c = t(lang).home.areas;

  return (
    <section className="section section--tint areas" aria-labelledby="areas-heading">
      <div className="wrap">
        <div className="section__head">
          <h2 id="areas-heading" className="accent-title">
            {c.heading}
          </h2>
          <p>{c.lead}</p>
        </div>

        <ul className="stats">
          {c.stats.map((stat) => (
            <li className="stat" key={stat.id}>
              <span className="stat__value">
                {/* PLACEHOLDER(TEXT:stat-1|stat-2|stat-3) until the figures are confirmed. */}
                {stat.value ?? <Marker type="TEXT" id={stat.id} note={stat.label} />}
              </span>
              <span className="stat__label">{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="carousel" data-carousel="">
          <div className="carousel__bar">
            <h3 className="carousel__title">{c.browseHeading}</h3>
            <div className="carousel__nav">
              <button type="button" className="round-btn" data-carousel-prev="" aria-label={c.prev} disabled>
                <Icon name="chevron-left" />
              </button>
              <button type="button" className="round-btn" data-carousel-next="" aria-label={c.next}>
                <Icon name="chevron-right" />
              </button>
            </div>
          </div>

          <ul className="areas__track" data-carousel-track="" aria-label={c.carouselLabel}>
            {serviceAreas.map((area) => {
              const name = area.name[lang];
              // Alt text is checked at build time even before the photo
              // exists, so it cannot ship without it.
              const alt = altFor(area.altKey, lang);
              return (
                <li className="area-card" key={area.id}>
                  <a className="area-card__link" href={areaPath(area, lang)}>
                    {area.photo ? (
                      <Picture
                        name={area.photo}
                        alt={alt}
                        sizes={cardSizes}
                        loading="lazy"
                        fetchPriority="auto"
                        className="area-card__media"
                      />
                    ) : (
                      <ImagePlaceholder
                        id={`city-${area.id}`}
                        note={name}
                        className="area-card__media img-placeholder--dark"
                      />
                    )}
                    <span className="area-card__name">{name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="areas__more">
          <a className="btn btn--outline" href={routes.locations[lang]}>
            {c.viewAll}
          </a>
        </div>
      </div>
      <CarouselScript />
    </section>
  );
}
