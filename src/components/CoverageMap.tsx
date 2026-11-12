/**
 * "Our coverage across Italy": a full-width map centred on Rome with the
 * main cities and airports, and an overlay card with a quote action.
 *
 * Leaflet + OpenStreetMap tiles: no API key, no cookies. Leaflet (about 40 KB
 * gzipped with its CSS) is only fetched when the section comes within 400px
 * of the viewport, so it never touches the first paint or Lighthouse's
 * initial load. The same cities and airports are listed in the markup for
 * screen readers and for anyone without JavaScript.
 *
 * OSM's public tiles are fine for a small site with attribution (shown in
 * the corner). If traffic grows, swap TILE_URL for a commercial provider:
 * see README, "Coverage map".
 */
import Icon from './Icon';
import CoverageMapScript from './CoverageMapScript';
import { t } from '../data/content';
import type { Lang } from '../data/i18n';
import { coverageCities, coverageAirports, MAP_CENTER, MAP_ZOOM } from '../data/coverage';

const NOSCRIPT_CSS =
  '<style>.coverage__map { display: none; } .coverage__lists { position: static; width: auto; height: auto; clip-path: none; white-space: normal; display: grid; gap: 1.5rem; margin-top: 2rem; color: #F4F5F0; } .coverage__lists h3 { color: #FFFFFF; }</style>';

export default function CoverageMap({ lang }: { lang: Lang }) {
  const c = t(lang).contact.coverage;

  const config = {
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    cities: coverageCities.map((p) => ({
      name: p.name[lang],
      lat: p.lat,
      lng: p.lng,
      main: p.id === 'rome',
    })),
    airports: coverageAirports.map((p) => ({ name: p.name[lang], lat: p.lat, lng: p.lng })),
  };

  return (
    <section className="coverage" aria-labelledby="coverage-heading">
      <div className="wrap">
        <div className="coverage__head">
          <p className="eyebrow eyebrow--on-dark">
            <span className="label">{c.eyebrow}</span>
          </p>
          <h2 id="coverage-heading">{c.heading}</h2>
          <p>{c.intro}</p>
        </div>

        <div className="coverage__frame">
          <div
            className="coverage__map"
            id="coverage-map"
            role="region"
            aria-label={c.mapLabel}
            data-config={JSON.stringify(config)}
          ></div>

          <div className="coverage__card">
            <p className="coverage__kicker">
              <Icon name="plane" />
              <span>{c.cardKicker}</span>
            </p>
            <h3>{c.cardTitle}</h3>
            <p>{c.cardBody}</p>
            <a className="btn btn--primary" href="#quote-form">
              <Icon name="tag" />
              {c.cardCta}
            </a>
          </div>
        </div>

        {/* The places on the map, as text: read by screen readers, and shown
            instead of the map when JavaScript is off. */}
        <div className="coverage__lists" data-coverage-lists="">
          <div>
            <h3>{c.citiesLabel}</h3>
            <ul>
              {coverageCities.map((p) => (
                <li key={p.id}>{p.name[lang]}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{c.airportsLabel}</h3>
            <ul>
              {coverageAirports.map((p) => (
                <li key={p.id}>{p.name[lang]}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Marker artwork for airports (a Lucide plane), cloned by the script.
          Never displayed itself. */}
      <span id="coverage-plane" hidden>
        <Icon name="plane" />
      </span>

      {/* Without JavaScript there is no map: show the lists instead. */}
      <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />

      <CoverageMapScript />
    </section>
  );
}
