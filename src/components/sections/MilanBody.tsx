/**
 * The Milan location page. Same sections as the Rome page (owner brief,
 * 24 Nov 2026), with its own layouts so the two pages do not read as copies:
 *  1 split dark hero + overlapping booking form · 2 fleet (horizontal cards)
 *  3 airports (departure-board rows) · 4 routes (grouped by trip type)
 *  5 nearby cities (pills) · 6 why us (video first) · 7 top destinations
 *  (numbered mosaic) · 8 top hotels (compact rows) · 9 why visit + events
 *  10 blog (featured + list) · 11 FAQ (two-column accordion) · 12 CTA band.
 *
 * Copy and facts: src/data/milan.ts. Placeholders: docs/PLACEHOLDERS.md.
 * Links not built yet (href="#"): TODO-LINKS.md.
 *
 * "Book" buttons are links with data-prefill: QuoteFormScript fills the
 * booking form in place and scrolls to it. Their href (?…#quote-form) still
 * works in a new tab.
 */
import Icon from '../Icon';
import CtaBand from '../CtaBand';
import Tricolore from '../Tricolore';
import Picture from '../Picture';
import BookingForm from '../BookingForm';
import RichText from '../RichText';
import Marked, { unmarked } from '../Marked';
import { ImagePlaceholder, Marker, PricePlaceholder } from '../Placeholders';
import { altFor } from '../../data/image-alt';
import { routes, type Lang } from '../../data/i18n';
import { fleet, vehiclePlaceholderIds } from '../../data/fleet';
import { km } from '../../data/rome';
import {
  milanCopy,
  milanGateways,
  milanRouteGroups,
  milanRoutes,
  milanNearby,
  milanDestinations,
  milanHotels,
  MILAN_ID,
} from '../../data/milan';
import { latestPosts, postPath, formatDate, blogCopy } from '../../data/blog';

const HERO_PHOTO = 'milan-private-transfer-duomo-galleria';

/** href for a same-page "Book" link: real query string + the form anchor. */
function bookHref(params: Record<string, string>): string {
  return `?${new URLSearchParams(params).toString()}#quote-form`;
}

function Eyebrow({ text }: { text: string }) {
  return (
    <p className="eyebrow">
      <span className="label">{text}</span>
    </p>
  );
}

export default function MilanBody({ lang }: { lang: Lang }) {
  const c = milanCopy[lang];
  const milanName = lang === 'en' ? 'Milan' : 'Milano';
  const bc = blogCopy[lang];
  const [featured, ...morePosts] = latestPosts(5, 'milan');

  return (
    <>
      {/* 1. Hero: dark split band (copy + photo); the booking form overlaps its foot. */}
      <section className="mi-hero" aria-labelledby="milan-h1">
        <div className="mi-hero__band">
          <div className="wrap mi-hero__grid">
            <div className="mi-hero__copy">
              <p className="eyebrow mi-hero__eyebrow">
                <Tricolore />
                <span className="label">{c.hero.eyebrow}</span>
              </p>
              <h1 id="milan-h1">{c.hero.h1}</h1>
              <p className="mi-hero__lead">{c.hero.lead}</p>
              <ul className="mi-hero__trust">
                {c.hero.trust.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mi-hero__media">
              <Picture
                name={HERO_PHOTO}
                alt={altFor(HERO_PHOTO, lang)}
                sizes="(min-width: 64rem) 560px, (min-width: 40rem) 80vw, 92vw"
                loading="eager"
                fetchPriority="low"
              />
            </div>
          </div>
        </div>
        <div className="wrap mi-hero__form">
          <BookingForm lang={lang} copy={c.form} />
        </div>
      </section>

      {/* 2. Fleet: horizontal cards, the shared premium fleet. */}
      <section className="section" id="fleet" aria-labelledby="milan-fleet-heading">
        <div className="wrap">
          <div className="section__head">
            <Eyebrow text={c.fleet.eyebrow} />
            <h2 className="accent-title" id="milan-fleet-heading">
              {c.fleet.heading}
            </h2>
            <p>{c.fleet.lead}</p>
          </div>

          <ul className="mi-cars">
            {fleet.map((v) => {
              const alt = altFor(v.altKey, lang);
              const ph = vehiclePlaceholderIds(v);
              return (
                <li className="mi-car" key={v.id}>
                  <div className="mi-car__media">
                    {/* PLACEHOLDER(IMG:vehicle-{id}) until the photo is in src/assets/ */}
                    {v.photo ? (
                      <Picture name={v.photo} alt={alt} sizes="(min-width: 64rem) 240px, 40vw" loading="lazy" />
                    ) : (
                      <ImagePlaceholder id={ph.img} note={v.name.en} />
                    )}
                  </div>
                  <div className="mi-car__body">
                    <p className="mi-car__tier">{v.tier[lang]}</p>
                    <h3 className="mi-car__name">{v.name[lang]}</h3>
                    <dl className="mi-car__specs">
                      <div>
                        <dt>
                          <Icon name="users" />
                          <span>{c.fleet.passengers}</span>
                        </dt>
                        {/* PLACEHOLDER(VEHICLE:{id}-pax) */}
                        <dd>{v.passengers ?? <Marker type="VEHICLE" id={ph.pax} />}</dd>
                      </div>
                      <div>
                        <dt>
                          <Icon name="luggage" />
                          <span>{c.fleet.bags}</span>
                        </dt>
                        {/* PLACEHOLDER(VEHICLE:{id}-bags) */}
                        <dd>{v.suitcases ?? <Marker type="VEHICLE" id={ph.bags} />}</dd>
                      </div>
                    </dl>
                    <p className="mi-car__desc">{v.description[lang]}</p>
                    <ul className="mi-car__extras">
                      <li>
                        <Icon name="air-vent" />
                        <span>{c.fleet.ac}</span>
                      </li>
                      <li>
                        <Icon name="baby" />
                        <span>{c.fleet.childSeat}</span>
                      </li>
                    </ul>
                    <ul className="chips chips--soft" aria-label={c.fleet.bestFor}>
                      {v.bestTags[lang].map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="mi-car__foot">
                      <p className="price">
                        <span>{c.fleet.from}</span>{' '}
                        {/* PLACEHOLDER(PRICE:{id}-from) */}
                        {v.priceFrom !== null ? (
                          `€${v.priceFrom}`
                        ) : (
                          <PricePlaceholder id={ph.price} note={`${v.name.en}, one way`} />
                        )}
                      </p>
                      <a className="text-link mi-link" href={bookHref({ vehicle: v.id })} data-prefill="" data-vehicle={v.id}>
                        {c.fleet.book}
                        <Icon name="arrow-right" />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="note rgrid__note">{c.fleet.similar}</p>
        </div>
      </section>

      {/* 3. Airports: departure-board rows on a dark band. Airport pages: TODO-LINKS.md. */}
      <section className="section mi-dark" id="airports" aria-labelledby="milan-airports-heading">
        <div className="wrap">
          <div className="section__head">
            <Eyebrow text={c.airports.eyebrow} />
            <h2 id="milan-airports-heading">{c.airports.heading}</h2>
            <p>{c.airports.lead}</p>
          </div>
          <ul className="mi-board">
            {milanGateways.map((g) => (
              <li className="mi-board__row" key={g.id}>
                <span className="mi-board__code" aria-hidden="true">
                  {g.code}
                </span>
                <div className="mi-board__info">
                  <h3 className="mi-board__name">
                    <Icon name={g.icon} />
                    <span>{g.name[lang]}</span>
                  </h3>
                  <p className="mi-board__meta">{g.distance[lang]}</p>
                  <ul className="mi-board__chips">
                    {g.chips[lang].map((chip) => (
                      <li key={chip}>{chip}</li>
                    ))}
                  </ul>
                </div>
                <div className="mi-board__fare">
                  <p className="price">
                    <span>{c.airports.fare}</span>{' '}
                    {/* PLACEHOLDER(PRICE:loc-milan-{id}-from) */}
                    <PricePlaceholder id={`${MILAN_ID}-${g.id}-from`} note={`${g.name.en} to central Milan, E-Class`} />
                  </p>
                  <a
                    className="btn btn--on-dark"
                    href={bookHref({ pickup: g.pickup[lang] })}
                    data-prefill=""
                    data-pickup={g.pickup[lang]}
                  >
                    {c.airports.book}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Routes and day trips, grouped. Route pages: TODO-LINKS.md. */}
      <section className="section" id="routes" aria-labelledby="milan-routes-heading">
        <div className="wrap">
          <div className="section__head">
            <Eyebrow text={c.routes.eyebrow} />
            <h2 className="accent-title" id="milan-routes-heading">
              {c.routes.heading}
            </h2>
            <p>{c.routes.lead}</p>
          </div>
          <div className="mi-routes">
            {milanRouteGroups.map((group) => (
              <div className="mi-routes__group" key={group.id}>
                <div className="mi-routes__head">
                  <span className="icon-badge">
                    <Icon name={group.icon} />
                  </span>
                  <h3>{group.title[lang]}</h3>
                  <p>{group.line[lang]}</p>
                </div>
                <ul className="mi-routes__list">
                  {milanRoutes
                    .filter((r) => r.group === group.id)
                    .map((r) => (
                      <li key={r.id}>
                        <div className="mi-routes__dest">
                          <span className="mi-routes__to">{r.to[lang]}</span>
                          <span className="mi-routes__facts">
                            <span className="visually-hidden">{`${c.routes.distance}: `}</span>
                            {km(r.km, lang)}
                            {' · '}
                            <span className="visually-hidden">{`${c.routes.time}: `}</span>
                            {r.time[lang]}
                            {' · '}
                            {`${c.routes.from} `}
                            {/* PLACEHOLDER(PRICE:loc-milan-route-{id}-from) */}
                            <PricePlaceholder id={`${MILAN_ID}-route-${r.id}-from`} note={`Milan to ${r.to.en}, E-Class, one way`} />
                          </span>
                        </div>
                        <a
                          className="mi-routes__book"
                          href={bookHref({ pickup: milanName, dropoff: r.to[lang] })}
                          data-prefill=""
                          data-pickup={milanName}
                          data-dropoff={r.to[lang]}
                          aria-label={`${c.routes.book}: ${milanName} – ${r.to[lang]}`}
                        >
                          {c.routes.book}
                          <Icon name="arrow-right" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="note rgrid__note">{c.routes.note}</p>
        </div>
      </section>

      {/* 5. Nearby cities: pills. No pages yet, so href="#": TODO-LINKS.md. */}
      <section className="section section--tint" id="nearby" aria-labelledby="milan-nearby-heading">
        <div className="wrap mi-nearby">
          <div className="section__head">
            <Eyebrow text={c.nearby.eyebrow} />
            <h2 className="accent-title" id="milan-nearby-heading">
              {c.nearby.heading}
            </h2>
            <p>{c.nearby.lead}</p>
          </div>
          <ul className="mi-pills">
            {milanNearby.map((city) => {
              // TODO: link city page when created (listed in TODO-LINKS.md)
              const href = '#';
              return (
                <li key={city.id}>
                  <a className="mi-pill" href={href}>
                    <Icon name="map-pin" />
                    <span className="mi-pill__name">{city.name[lang]}</span>
                    <span className="mi-pill__meta">{`${km(city.km, lang)} ${c.nearby.fromMilan} · ${city.region[lang]}`}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6. Why us: video first, numbered reasons beside it. */}
      <section className="section" id="why" aria-labelledby="milan-why-heading">
        <div className="wrap mi-why">
          <div className="mi-why__media">
            {/* PLACEHOLDER(IMG:loc-milan-video): intro video, provided later. */}
            <div className="video-slot">
              <ImagePlaceholder id={`${MILAN_ID}-video`} note={c.why.videoNote} className="img-placeholder--dark" />
              <span className="video-slot__play" aria-hidden="true">
                <Icon name="play" />
              </span>
            </div>
            <div className="mi-why__estimate">
              <h3>{c.why.estimateTitle}</h3>
              <p>{c.why.estimateBody}</p>
              <a className="btn btn--primary" href="#quote-form">
                <Icon name="tag" />
                {c.why.estimateCta}
              </a>
            </div>
          </div>
          <div>
            <div className="section__head">
              <Eyebrow text={c.why.eyebrow} />
              <h2 className="accent-title" id="milan-why-heading">
                {c.why.heading}
              </h2>
              <p>{c.why.lead}</p>
            </div>
            <ol className="mi-reasons">
              {c.why.reasons.map((r) => (
                <li key={r.title}>
                  <Icon name={r.icon} className="mi-reasons__icon" />
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7. Top destinations: a numbered mosaic. Destination pages: TODO-LINKS.md. */}
      <section className="section section--tint" id="destinations" aria-labelledby="milan-dest-heading">
        <div className="wrap">
          <div className="section__head">
            <Eyebrow text={c.destinations.eyebrow} />
            <h2 id="milan-dest-heading">
              <Marked text={c.destinations.heading} />
            </h2>
            <p>{c.destinations.lead}</p>
          </div>
          <ol className="mi-mosaic" aria-label={unmarked(c.destinations.label)}>
            {milanDestinations.map((d, i) => {
              altFor(d.altKey, lang); // the row must exist before the photo does
              // TODO: link destination page when created (listed in TODO-LINKS.md)
              const href = '#';
              return (
                <li className="mi-tile" key={d.id}>
                  <a className="mi-tile__link" href={href}>
                    <div className="mi-tile__media">
                      {/* PLACEHOLDER(IMG:loc-milan-dest-{id}) */}
                      <ImagePlaceholder id={`${MILAN_ID}-dest-${d.id}`} note={d.name.en} />
                    </div>
                    <span className="mi-tile__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="mi-tile__text">
                      <h3 className="mi-tile__name">{d.name[lang]}</h3>
                      <p className="mi-tile__line">{d.line[lang]}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 8. Top hotels: compact rows. */}
      <section className="section" id="hotels" aria-labelledby="milan-hotels-heading">
        <div className="wrap">
          <div className="section__head">
            <Eyebrow text={c.hotels.eyebrow} />
            <h2 id="milan-hotels-heading">
              <Marked text={c.hotels.heading} />
            </h2>
            <p>{c.hotels.lead}</p>
          </div>
          {/* List and star ratings to confirm: PLACEHOLDER(VERIFY:loc-milan-hotels) */}
          <ul className="mi-hotels" aria-label={c.hotels.label} data-placeholder={`VERIFY:${MILAN_ID}-hotels`}>
            {milanHotels.map((h) => {
              altFor(h.altKey, lang); // the row must exist before the photo does
              const dropoff = `${h.name}, ${h.area[lang]}, ${milanName}`;
              return (
                <li className="mi-hotel" key={h.id}>
                  <div className="mi-hotel__thumb">
                    {/* PLACEHOLDER(IMG:loc-milan-hotel-{id}) */}
                    <ImagePlaceholder id={`${MILAN_ID}-hotel-${h.id}`} note={h.name} />
                  </div>
                  <div className="mi-hotel__body">
                    <h3 className="mi-hotel__name">{h.name}</h3>
                    <p className="mi-hotel__meta">
                      <span className="stars" role="img" aria-label={c.hotels.starsLabel.replace('{n}', String(h.stars))}>
                        {Array.from({ length: h.stars }, (_, i) => (
                          <Icon name="star" key={i} />
                        ))}
                      </span>
                      <span>{h.area[lang]}</span>
                    </p>
                    <a className="text-link mi-link" href={bookHref({ dropoff })} data-prefill="" data-dropoff={dropoff}>
                      <Icon name="car" />
                      {c.hotels.book}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 9. Why visit Milan, with business and events beside it. */}
      <section className="section section--tint" aria-labelledby="milan-visit-heading">
        <div className="wrap mi-visit">
          <div>
            <div className="section__head">
              <Eyebrow text={c.visit.eyebrow} />
              <h2 className="accent-title" id="milan-visit-heading">
                {c.visit.heading}
              </h2>
              <p>{c.visit.body}</p>
            </div>
            <ul className="chips chips--lg">
              {c.visit.chips.map((chip) => (
                <li key={chip.label}>
                  <Icon name={chip.icon} />
                  <span>{chip.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mi-events">
            <p className="label mi-events__label">{c.visit.eventsHeading}</p>
            <ul>
              {c.visit.events.map((e) => (
                <li className="mi-event" key={e.title}>
                  <span className="icon-badge">
                    <Icon name={e.icon} />
                  </span>
                  <div>
                    <h3>{e.title}</h3>
                    <p>{e.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 10. Blog: the featured guide, then the others as a list. */}
      <section className="section" id="blog" aria-labelledby="milan-blog-heading">
        <div className="wrap">
          <div className="section__head">
            <Eyebrow text={c.blog.eyebrow} />
            <h2 className="accent-title" id="milan-blog-heading">
              {c.blog.heading}
            </h2>
            <p>{c.blog.lead}</p>
          </div>
          <div className="mi-blog">
            {featured && (
              <article className="mi-blog__featured">
                <p className="label mi-blog__flag">{c.blog.featured}</p>
                <h3 className="mi-blog__title">
                  <a href={postPath(featured, lang)}>{featured.h1[lang]}</a>
                </h3>
                <p>{featured.excerpt[lang]}</p>
                <p className="post-card__meta">
                  <Icon name="book-open" />
                  <span>{`${formatDate(featured.date, lang)} · ${bc.minutes.replace('{n}', String(featured.minutes))}`}</span>
                </p>
                <span className="post-card__more" aria-hidden="true">
                  {c.blog.read}
                  <Icon name="arrow-right" />
                </span>
              </article>
            )}
            <ul className="mi-blog__list">
              {morePosts.map((post) => (
                <li key={post.id}>
                  <h3 className="mi-blog__item">
                    <a href={postPath(post, lang)}>{post.h1[lang]}</a>
                  </h3>
                  <p>{post.excerpt[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="rgrid__more">
            <a className="btn btn--outline" href={routes.blog[lang]}>
              {c.blog.all}
            </a>
          </p>
        </div>
      </section>

      {/* 11. FAQ: two columns, numbered accordion. Matches the FAQPage JSON-LD. */}
      <section className="section section--tint" id="faq" aria-labelledby="milan-faq-heading">
        <div className="wrap mi-faq">
          <div className="mi-faq__side">
            <Eyebrow text={c.faq.eyebrow} />
            <h2 className="accent-title" id="milan-faq-heading">
              {c.faq.heading}
            </h2>
            <p>{c.faq.lead}</p>
            <a className="btn btn--outline" href="#quote-form">
              {c.faq.ask}
            </a>
          </div>
          <div className="mi-faq__list">
            {c.faq.items.map((item, i) => (
              <details className="mi-qa" key={item.q}>
                <summary>
                  <span className="mi-qa__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mi-qa__q">{item.q}</span>
                  <Icon name="plus" className="mi-qa__icon" />
                </summary>
                <div className="mi-qa__a">
                  <p>
                    <RichText text={item.a} lang={lang} />
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA. No phone or WhatsApp: the site takes neither (owner rule). */}
      <CtaBand lang={lang} heading={c.cta.heading} body={c.cta.body} quote={{ href: '#quote-form', label: c.cta.book }} />
    </>
  );
}
