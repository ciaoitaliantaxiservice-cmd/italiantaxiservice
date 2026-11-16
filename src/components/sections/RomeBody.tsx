/**
 * The Rome location page. Section order, by intent (owner brief, 16 Nov 2026):
 *  1 hero + booking form · 2 fleet · 3 airport transfers · 4 intercity routes
 *  5 nearby cities · 6 why us · 7 top destinations · 8 hotels · 9 why visit
 *  10 blog · 11 FAQ · 12 CTA band.
 *
 * Copy and facts: src/data/rome.ts. Placeholders: docs/PLACEHOLDERS.md.
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
import CarouselScript from '../CarouselScript';
import RichText from '../RichText';
import { ImagePlaceholder, Marker, PricePlaceholder } from '../Placeholders';
import { altFor } from '../../data/image-alt';
import { routes, type Lang } from '../../data/i18n';
import {
  romeCopy,
  romeVehicles,
  romeGateways,
  romeRoutes,
  romeNearby,
  romeDestinations,
  romeHotels,
  ROME_ID,
  km,
} from '../../data/rome';
import { latestPosts, postPath, formatDate, blogCopy } from '../../data/blog';

/** href for a same-page "Book" link: real query string + the form anchor. */
function bookHref(params: Record<string, string>): string {
  return `?${new URLSearchParams(params).toString()}#quote-form`;
}

export default function RomeBody({ lang }: { lang: Lang }) {
  const c = romeCopy[lang];
  const romeName = lang === 'en' ? 'Rome' : 'Roma';
  const bc = blogCopy[lang];

  return (
    <>
      {/* 1. Hero + booking form, both above the fold on desktop. */}
      <section className="rome-hero" aria-labelledby="rome-h1">
        <div className="wrap rome-hero__head">
          <p className="eyebrow rome-hero__eyebrow">
            <Tricolore />
            <span className="label">{c.hero.eyebrow}</span>
          </p>
          <h1 id="rome-h1">{c.hero.h1}</h1>
          <p className="rome-hero__lead">{c.hero.lead}</p>
          <ul className="rome-hero__trust">
            {c.hero.trust.map((item) => (
              <li key={item}>
                <Icon name="check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="wrap rome-hero__form">
          <BookingForm lang={lang} />
        </div>
      </section>

      {/* 2. Fleet */}
      <section className="section" id="fleet" aria-labelledby="rome-fleet-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{c.fleet.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="rome-fleet-heading">
              {c.fleet.heading}
            </h2>
            <p>{c.fleet.lead}</p>
          </div>

          <ul className="rgrid rgrid--4">
            {romeVehicles.map((v) => {
              // Called for pending photos too, so the alt row must exist first.
              const alt = altFor(v.altKey, lang);
              return (
                <li className="rcard" key={v.id}>
                  <div className="rcard__media">
                    {/* PLACEHOLDER(IMG:loc-rome-{id}) until the photo is in src/assets/rome/ */}
                    {v.photo ? (
                      <Picture
                        name={v.altKey}
                        alt={alt}
                        sizes="(min-width: 64rem) 300px, (min-width: 40rem) 45vw, 90vw"
                        loading="lazy"
                      />
                    ) : (
                      <ImagePlaceholder id={`${ROME_ID}-${v.id}`} note={v.name.en} />
                    )}
                  </div>
                  <div className="rcard__body">
                    <h3 className="rcard__title">{v.name[lang]}</h3>
                    <ul className="chips">
                      <li>
                        <Icon name="users" />
                        <span>{v.pax[lang]}</span>
                      </li>
                      <li>
                        <Icon name="luggage" />
                        <span>
                          {`${c.fleet.bags}: `}
                          {/* PLACEHOLDER(VEHICLE:loc-rome-{id}-bags) */}
                          <Marker type="VEHICLE" id={`${ROME_ID}-${v.id}-bags`} />
                        </span>
                      </li>
                      <li>
                        <Icon name="air-vent" />
                        <span>{c.fleet.ac}</span>
                      </li>
                      {v.wifi && (
                        // PLACEHOLDER(VERIFY:loc-rome-fleet-wifi)
                        <li data-placeholder={`VERIFY:${ROME_ID}-fleet-wifi`}>
                          <Icon name="wifi" />
                          <span>{c.fleet.wifi}</span>
                        </li>
                      )}
                      <li>
                        <Icon name="baby" />
                        <span>{c.fleet.childSeat}</span>
                      </li>
                      <li>
                        <Icon name="armchair" />
                        <span>{v.comfort[lang]}</span>
                      </li>
                    </ul>
                    <div className="rcard__best">
                      <span className="label">{c.fleet.bestFor}</span>
                      <ul className="chips chips--soft">
                        {v.bestFor[lang].map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rcard__foot">
                      <p className="price">
                        <span>{c.fleet.from}</span>{' '}
                        {/* PLACEHOLDER(PRICE:loc-rome-{id}-from) */}
                        <PricePlaceholder id={`${ROME_ID}-${v.id}-from`} note={`${v.name.en}, one way`} />
                      </p>
                      <a
                        className="btn btn--outline"
                        href={bookHref({ vehicle: v.id })}
                        data-prefill=""
                        data-vehicle={v.id}
                      >
                        {c.fleet.book}
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3. Airport transfers. Airport pages are not built yet: TODO-LINKS.md. */}
      <section className="section section--tint" id="airports" aria-labelledby="rome-airports-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{c.airports.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="rome-airports-heading">
              {c.airports.heading}
            </h2>
            <p>{c.airports.lead}</p>
          </div>

          <ul className="rgrid rgrid--4">
            {romeGateways.map((g) => (
              <li className="rcard rcard--plain" key={g.id}>
                <div className="rcard__body">
                  <div className="rcard__top">
                    <span className="icon-badge">
                      <Icon name={g.icon} />
                    </span>
                    <span className="code-tag">{g.code}</span>
                  </div>
                  <h3 className="rcard__title">{g.name[lang]}</h3>
                  <p className="rcard__meta">{g.distance[lang]}</p>
                  <ul className="chips chips--soft">
                    {g.chips[lang].map((chip) => (
                      <li key={chip}>
                        <Icon name="check" />
                        <span>{chip}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rcard__foot">
                    <p className="price">
                      <span>{c.airports.fare}</span>{' '}
                      {/* PLACEHOLDER(PRICE:loc-rome-{id}-from) */}
                      <PricePlaceholder id={`${ROME_ID}-${g.id}-from`} note={`${g.name.en} to central Rome, sedan`} />
                    </p>
                    <a
                      className="btn btn--outline"
                      href={bookHref({ pickup: g.pickup[lang] })}
                      data-prefill=""
                      data-pickup={g.pickup[lang]}
                    >
                      {c.airports.book}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Intercity routes. Route pages are not built yet: TODO-LINKS.md. */}
      <section className="section" id="routes" aria-labelledby="rome-routes-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{c.routes.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="rome-routes-heading">
              {c.routes.heading}
            </h2>
            <p>{c.routes.lead}</p>
          </div>

          <ul className="rgrid rgrid--3">
            {romeRoutes.map((r) => (
              <li className="route-card" key={r.id}>
                <h3 className="route-card__title">
                  <span>{romeName}</span>
                  <Icon name="arrow-right" />
                  <span>{r.to[lang]}</span>
                </h3>
                <dl className="route-card__facts">
                  <div>
                    <dt>{c.routes.distance}</dt>
                    <dd>{km(r.km, lang)}</dd>
                  </div>
                  <div>
                    <dt>{c.routes.time}</dt>
                    <dd>{r.time[lang]}</dd>
                  </div>
                  <div>
                    <dt>{c.routes.from}</dt>
                    <dd>
                      {/* PLACEHOLDER(PRICE:loc-rome-route-{id}-from) */}
                      <PricePlaceholder id={`${ROME_ID}-route-${r.id}-from`} note={`Rome to ${r.to.en}, sedan, one way`} />
                    </dd>
                  </div>
                </dl>
                <a
                  className="btn btn--outline route-card__btn"
                  href={bookHref({ pickup: romeName, dropoff: r.to[lang] })}
                  data-prefill=""
                  data-pickup={romeName}
                  data-dropoff={r.to[lang]}
                >
                  {c.routes.book}
                </a>
              </li>
            ))}
          </ul>
          <p className="note rgrid__note">{c.routes.note}</p>
        </div>
      </section>

      {/* 5. Nearby major cities */}
      <section className="section section--tint" id="nearby" aria-labelledby="rome-nearby-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{c.nearby.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="rome-nearby-heading">
              {c.nearby.heading}
            </h2>
            <p>{c.nearby.lead}</p>
          </div>

          <ul className="rgrid rgrid--4">
            {romeNearby.map((city) => {
              // TODO: link city page when created (listed in TODO-LINKS.md)
              const href = '#';
              return (
                <li key={city.id}>
                  <a className="link-card" href={href}>
                    <Icon name="map-pin" className="link-card__icon" />
                    <span className="link-card__text">
                      <span className="link-card__title">{city.name[lang]}</span>
                      <span className="link-card__meta">
                        {`${city.region[lang]} · ${km(city.km, lang)} ${c.nearby.fromRome}`}
                      </span>
                    </span>
                    <Icon name="chevron-right" className="link-card__arrow" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6. Why riders choose us */}
      <section className="section" id="why" aria-labelledby="rome-why-heading">
        <div className="wrap why-split">
          <div>
            <div className="section__head">
              <p className="eyebrow">
                <span className="label">{c.why.eyebrow}</span>
              </p>
              <h2 id="rome-why-heading">
                {c.why.headingBefore}
                <mark className="hl">{c.why.headingMark}</mark>
                {c.why.headingAfter}
              </h2>
              <p>{c.why.lead}</p>
            </div>
            <ul className="mini-grid">
              {c.why.cards.map((card) => (
                <li className="mini-card" key={card.title}>
                  <Icon name={card.icon} className="mini-card__icon" />
                  <h3 className="mini-card__title">{card.title}</h3>
                  <p>{card.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="why-split__side">
            <div className="mini-card mini-card--wide">
              <h3 className="mini-card__title">{c.why.estimateTitle}</h3>
              <p>{c.why.estimateBody}</p>
              <a className="text-link" href="#quote-form">
                {c.why.estimateCta}
              </a>
            </div>
            {/* PLACEHOLDER(IMG:loc-rome-video): intro video, provided later. */}
            <div className="video-slot">
              <ImagePlaceholder id={`${ROME_ID}-video`} note={c.why.videoNote} className="img-placeholder--dark" />
              <span className="video-slot__play" aria-hidden="true">
                <Icon name="play" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Top destinations (carousel). Destination pages: TODO-LINKS.md. */}
      <section className="section section--tint" id="destinations" aria-labelledby="rome-dest-heading">
        <div className="wrap" data-carousel="">
          <div className="carousel__bar carousel__bar--head">
            <div className="section__head">
              <p className="eyebrow">
                <span className="label">{c.destinations.eyebrow}</span>
              </p>
              <h2 className="accent-title" id="rome-dest-heading">
                {c.destinations.heading}
              </h2>
              <p>{c.destinations.lead}</p>
            </div>
            <div className="carousel__nav">
              <button className="round-btn" type="button" data-carousel-prev="" aria-label={c.destinations.prev} disabled>
                <Icon name="chevron-left" />
              </button>
              <button className="round-btn" type="button" data-carousel-next="" aria-label={c.destinations.next}>
                <Icon name="chevron-right" />
              </button>
            </div>
          </div>
          <ul className="areas__track rail" data-carousel-track="" aria-label={c.destinations.label}>
            {romeDestinations.map((d) => {
              const alt = altFor(d.altKey, lang);
              // TODO: link destination page when created (listed in TODO-LINKS.md)
              const href = '#';
              return (
                <li className="dest-card" key={d.id}>
                  <a className="dest-card__link" href={href}>
                    <span className="dest-card__media">
                      {d.photo ? (
                        <Picture
                          name={d.photo}
                          alt={alt}
                          sizes="(min-width: 64rem) 300px, (min-width: 40rem) 40vw, 72vw"
                          loading="lazy"
                        />
                      ) : (
                        // PLACEHOLDER(IMG:loc-rome-dest-{id})
                        <ImagePlaceholder id={`${ROME_ID}-dest-${d.id}`} note={d.name.en} />
                      )}
                    </span>
                    <h3 className="dest-card__name">{d.name[lang]}</h3>
                    <p className="dest-card__line">{d.line[lang]}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 8. Hotels (carousel) */}
      <section className="section" id="hotels" aria-labelledby="rome-hotels-heading">
        <div className="wrap" data-carousel="">
          <div className="carousel__bar carousel__bar--head">
            <div className="section__head">
              <p className="eyebrow">
                <span className="label">{c.hotels.eyebrow}</span>
              </p>
              <h2 className="accent-title" id="rome-hotels-heading">
                {c.hotels.heading}
              </h2>
              <p>{c.hotels.lead}</p>
            </div>
            <div className="carousel__nav">
              <button className="round-btn" type="button" data-carousel-prev="" aria-label={c.hotels.prev} disabled>
                <Icon name="chevron-left" />
              </button>
              <button className="round-btn" type="button" data-carousel-next="" aria-label={c.hotels.next}>
                <Icon name="chevron-right" />
              </button>
            </div>
          </div>
          {/* Star ratings to confirm: PLACEHOLDER(VERIFY:loc-rome-hotels) */}
          <ul
            className="areas__track rail"
            data-carousel-track=""
            aria-label={c.hotels.label}
            data-placeholder={`VERIFY:${ROME_ID}-hotels`}
          >
            {romeHotels.map((h) => {
              altFor(h.altKey, lang); // the row must exist before the photo does
              const dropoff = `${h.name}, ${h.area[lang]}, ${romeName}`;
              return (
                <li className="rcard hotel-card" key={h.id}>
                  <div className="rcard__media">
                    {/* PLACEHOLDER(IMG:loc-rome-hotel-{id}) */}
                    <ImagePlaceholder id={`${ROME_ID}-hotel-${h.id}`} note={h.name} />
                  </div>
                  <div className="rcard__body">
                    <p className="hotel-card__type">
                      <span>{c.hotels.type}</span>
                      <span className="stars" role="img" aria-label={c.hotels.starsLabel.replace('{n}', String(h.stars))}>
                        {Array.from({ length: h.stars }, (_, i) => (
                          <Icon name="star" key={i} />
                        ))}
                      </span>
                    </p>
                    <h3 className="rcard__title">{h.name}</h3>
                    <p className="rcard__meta">
                      <Icon name="map-pin" />
                      <span>{h.area[lang]}</span>
                    </p>
                    <div className="rcard__foot">
                      <a
                        className="btn btn--outline"
                        href={bookHref({ dropoff })}
                        data-prefill=""
                        data-dropoff={dropoff}
                      >
                        <Icon name="car" />
                        {c.hotels.book}
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <CarouselScript />
      </section>

      {/* 9. Why travellers visit Rome */}
      <section className="section section--tint" aria-labelledby="rome-visit-heading">
        <div className="wrap visit">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{c.visit.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="rome-visit-heading">
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
      </section>

      {/* 10. Blog: the latest three posts */}
      <section className="section" id="blog" aria-labelledby="rome-blog-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{c.blog.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="rome-blog-heading">
              {c.blog.heading}
            </h2>
            <p>{c.blog.lead}</p>
          </div>
          <ul className="rgrid rgrid--3">
            {latestPosts(3).map((post) => (
              <li className="post-card" key={post.id}>
                <p className="post-card__meta">
                  <Icon name="book-open" />
                  <span>
                    {`${formatDate(post.date, lang)} · ${bc.minutes.replace('{n}', String(post.minutes))}`}
                  </span>
                </p>
                <h3 className="post-card__title">
                  <a href={postPath(post, lang)}>{post.h1[lang]}</a>
                </h3>
                <p>{post.excerpt[lang]}</p>
                <span className="post-card__more" aria-hidden="true">
                  {c.blog.read}
                  <Icon name="arrow-right" />
                </span>
              </li>
            ))}
          </ul>
          <p className="rgrid__more">
            <a className="btn btn--outline" href={routes.blog[lang]}>
              {c.blog.all}
            </a>
          </p>
        </div>
      </section>

      {/* 11. FAQ. Matches the FAQPage JSON-LD (minus placeholder markers). */}
      <section className="section section--tint" id="faq" aria-labelledby="rome-faq-heading">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <span className="label">{c.faq.eyebrow}</span>
            </p>
            <h2 className="accent-title" id="rome-faq-heading">
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

      {/* 12. Final CTA. No phone or WhatsApp: the site takes neither (owner rule). */}
      <CtaBand lang={lang} heading={c.cta.heading} body={c.cta.body} quote={{ href: '#quote-form', label: c.cta.book }} />
    </>
  );
}
