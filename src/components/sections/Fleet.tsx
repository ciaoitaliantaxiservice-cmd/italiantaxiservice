import type { ReactNode } from 'react';
import Icon from '../Icon';
import Picture from '../Picture';
import { ImagePlaceholder, Marker } from '../Placeholders';
import FleetScript from '../FleetScript';
import { altFor } from '../../data/image-alt';
import { t } from '../../data/content';
import { routes, type Lang } from '../../data/i18n';
import { fleet, fleetCategories, vehiclePlaceholderIds } from '../../data/fleet';

// The slide is ~84% of the media column (the next car peeks in beside it).
const slideSizes = '(min-width: 80rem) 600px, (min-width: 64rem) 48vw, 84vw';

/**
 * Without JavaScript there are no tabs or arrows: every vehicle's details are
 * listed one after another and the photos stay a swipeable strip.
 */
const NO_JS_CSS =
  '.fleet__tabs,.fleet__nav{display:none}.fleet__copy{display:flex;flex-direction:column;gap:var(--s-10)}.fleet__item{visibility:visible;opacity:1;transform:none}';

/** "Up to {n} passengers" with {n} filled by text or a placeholder marker. */
function fill(template: string, value: ReactNode): ReactNode {
  const [before, after = ''] = template.split('{n}');
  return (
    <>
      {before}
      {value}
      {after}
    </>
  );
}

/** Homepage: "Vehicle types" / "La nostra flotta". */
export default function Fleet({ lang }: { lang: Lang }) {
  const c = t(lang).home.fleet;
  const tabs = fleetCategories.filter((cat) => fleet.some((v) => v.categories.includes(cat.id)));
  const first = tabs[0].id;
  const inFirst = fleet.filter((v) => v.categories.includes(first));
  const activeId = inFirst[0].id;

  return (
    <section className="section fleet" aria-labelledby="fleet-heading" data-fleet="">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">
            <span className="label">{c.eyebrow}</span>
          </p>
          <h2 id="fleet-heading" className="accent-title">
            {c.heading}
          </h2>
          <p>{c.lead}</p>
        </div>

        <div className="fleet__tabs" role="tablist" aria-label={c.tabsLabel}>
          {tabs.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              className="fleet__tab"
              id={`fleet-tab-${cat.id}`}
              aria-selected={cat.id === first}
              aria-controls="fleet-panel"
              tabIndex={cat.id === first ? 0 : -1}
              data-category={cat.id}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        <div
          className="fleet__panel"
          id="fleet-panel"
          role="tabpanel"
          aria-labelledby={`fleet-tab-${first}`}
        >
          {/* Every vehicle's copy shares one grid cell, so the column is as
              tall as the longest and switching never moves the page. */}
          <div className="fleet__copy">
            {fleet.map((v) => {
              const ids = vehiclePlaceholderIds(v);
              return (
                <article
                  key={v.id}
                  className="fleet__item"
                  data-vehicle={v.id}
                  data-categories={v.categories.join(' ')}
                  data-state={v.id === activeId ? 'active' : 'after'}
                >
                  <ul className="fleet__badges">
                    <li>
                      <Icon name="users" />
                      <span>
                        {fill(
                          c.passengers,
                          v.passengers ?? <Marker type="VEHICLE" id={ids.pax} />
                        )}
                      </span>
                    </li>
                    <li>
                      <Icon name="luggage" />
                      <span>
                        {fill(
                          c.suitcases,
                          v.suitcases ?? <Marker type="VEHICLE" id={ids.bags} />
                        )}
                      </span>
                    </li>
                    <li>
                      <Icon name="tag" />
                      <span>
                        {fill(
                          c.priceFrom,
                          v.priceFrom != null ? (
                            c.formatPrice(v.priceFrom)
                          ) : (
                            <Marker type="PRICE" id={ids.price} />
                          )
                        )}
                      </span>
                    </li>
                  </ul>

                  <h3>{v.name[lang]}</h3>
                  <p className="fleet__desc">{v.description[lang]}</p>
                  <p className="fleet__best">
                    <strong>{`${c.bestFor} `}</strong>
                    {v.bestFor[lang]}
                  </p>
                  <div>
                    <a
                      className="btn btn--primary"
                      href={`${routes.contact[lang]}?vehicle=${v.id}#quote-form`}
                    >
                      <Icon name="car" />
                      {v.cta[lang]}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="fleet__media">
            <ul className="fleet__track" data-fleet-track="">
              {fleet.map((v) => {
                // Checked at build time even before the photo exists.
                const alt = altFor(v.altKey, lang);
                return (
                  <li
                    key={v.id}
                    className="fleet__slide"
                    data-vehicle={v.id}
                    data-categories={v.categories.join(' ')}
                    data-state={v.id === activeId ? 'active' : undefined}
                    hidden={!v.categories.includes(first)}
                  >
                    {v.photo ? (
                      <Picture
                        name={v.photo}
                        alt={alt}
                        sizes={slideSizes}
                        loading="lazy"
                        fetchPriority="auto"
                        className="fleet__photo"
                      />
                    ) : (
                      <ImagePlaceholder
                        id={vehiclePlaceholderIds(v).img}
                        note={v.name[lang]}
                        className="fleet__photo"
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="fleet__nav">
              <button
                type="button"
                className="round-btn"
                data-fleet-prev=""
                aria-label={c.prev}
                aria-controls="fleet-panel"
                disabled
              >
                <Icon name="chevron-left" />
              </button>
              <span className="fleet__count" data-fleet-count="" aria-live="polite">
                {c.position.replace('{i}', '1').replace('{n}', String(inFirst.length))}
              </span>
              <button
                type="button"
                className="round-btn"
                data-fleet-next=""
                aria-label={c.next}
                aria-controls="fleet-panel"
              >
                <Icon name="chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <noscript dangerouslySetInnerHTML={{ __html: `<style>${NO_JS_CSS}</style>` }} />
      <FleetScript position={c.position} />
    </section>
  );
}
