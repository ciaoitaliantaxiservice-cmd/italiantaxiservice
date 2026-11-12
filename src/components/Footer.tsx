import LogoEmblem from './LogoEmblem';
import Tricolore from './Tricolore';
import { routes, navOrder, ui, otherLang, htmlLang, type Lang } from '../data/i18n';
import { cities, cityPath } from '../data/cities';
import { site, emailHref, bookingHref } from '../data/site.mjs';

interface Props {
  lang: Lang;
  altPaths: Record<Lang, string>;
}

export default function Footer({ lang, altPaths }: Props) {
  const l = ui[lang];
  const other = otherLang(lang);
  const year = new Date().getFullYear();

  const blurb =
    lang === 'en'
      ? 'Private transfers and chauffeured rides between Italian airports, cities and coastal towns, 24 hours a day, 7 days a week.'
      : 'Transfer privati e servizi con autista fra aeroporti, città e località costiere italiane, 24 ore su 24, 7 giorni su 7.';

  return (
    <footer className="site-footer">
      {/* The page's one full-width tricolore, capping the footer. */}
      <Tricolore variant="band" />

      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          {/* The full emblem, reversed for the dark ground: Bianco gear, Verde
              Chiaro wheel, name on the ribbon (160px, above the 150px minimum). */}
          <div className="site-footer__lockup">
            <LogoEmblem lang={lang} reversed loading="lazy" />
            <h2 className="site-footer__name">{site.brand}</h2>
          </div>
          <p>{blurb}</p>
          <p>
            <a href={altPaths[other]} hrefLang={htmlLang[other]} lang={htmlLang[other]}>
              {l.viewInItalian}
            </a>
          </p>
        </div>

        <div className="site-footer__col">
          <h2 className="label">{l.quickLinks}</h2>
          <ul>
            {navOrder.map((key) => (
              <li key={key}>
                <a href={routes[key][lang]}>{l[key]}</a>
              </li>
            ))}
            {cities.slice(0, 3).map((city) => (
              <li key={city.id}>
                <a href={cityPath(city, lang)}>{city.name[lang]}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="label">{l.getInTouch}</h2>
          <ul>
            <li>
              {`${l.generalEnquiries}: `}
              <a href={emailHref}>{site.emailInfo}</a>
            </li>
            <li>
              {`${l.bookings}: `}
              <a href={bookingHref}>{site.emailBooking}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap site-footer__legal">
        <span>{`© ${year} ${site.legalName}. ${l.footerLegal}`}</span>
      </div>
    </footer>
  );
}
