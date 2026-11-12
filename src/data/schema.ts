import { site, SITE_URL } from './site.mjs';
import { routes, type Lang } from './i18n';
import { absolute } from './seo';

/**
 * Structured data builders.
 *
 * Two rules enforced here:
 *  1. No licence, permit or authorisation properties of any kind, and no
 *     VAT, tax or company registration identifiers (vatID, taxID, leiCode…):
 *     the site is a lead-generation and booking platform.
 *  2. No `aggregateRating`, `review` or `priceRange` — we publish no ratings
 *     and no prices, so claiming them in markup would be fabrication.
 *
 * Any field whose value is still a [[PLACEHOLDER]] (or a known dummy) is
 * omitted rather than emitted, so the markup stays valid before launch and
 * fills itself in once src/data/site.mjs holds real values.
 */

function real(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (v === '') return false;
  return !v.includes('[[');
}

/** Drops every key whose value is undefined. */
function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;
}

/** Open every day: requests are answered 24 hours a day, 7 days a week. */
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

function postalAddress() {
  const parts = compact({
    '@type': 'PostalAddress',
    streetAddress: real(site.address.street) ? site.address.street : undefined,
    addressLocality: real(site.address.city) ? site.address.city : undefined,
    addressRegion: real(site.address.region) ? site.address.region : undefined,
    postalCode: real(site.address.postalCode) ? site.address.postalCode : undefined,
    addressCountry: site.address.countryCode,
  });
  // Country alone is not worth emitting as an address.
  return Object.keys(parts).length > 2 ? parts : undefined;
}

/**
 * How to get in touch: the quote form and two email addresses, info@ for
 * general enquiries and booking@ for bookings. The site takes no calls and
 * has no WhatsApp, so no node carries `telephone`. Both points are answered
 * around the clock.
 */
function contactPoints() {
  const availableLanguage = ['English', 'Italian'];
  const hoursAvailable = {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: DAYS,
    opens: site.hours.opens,
    closes: site.hours.closes,
  };
  const points = [
    real(site.emailInfo)
      ? {
          '@type': 'ContactPoint',
          name: 'General enquiries',
          contactType: 'customer service',
          email: site.emailInfo,
          availableLanguage,
          hoursAvailable,
        }
      : undefined,
    real(site.emailBooking)
      ? {
          '@type': 'ContactPoint',
          name: 'Bookings',
          contactType: 'reservations',
          email: site.emailBooking,
          availableLanguage,
          hoursAvailable,
        }
      : undefined,
  ].filter(Boolean);
  return points.length ? points : undefined;
}

function sameAs() {
  const urls = Object.values(site.social).filter(real);
  return urls.length ? urls : undefined;
}

const descriptions: Record<Lang, string> = {
  en: 'Private transfers and chauffeured rides between Italian airports, cities and coastal towns, available 24 hours a day, 7 days a week, quoted at a fixed price before travel.',
  it: 'Transfer privati e servizi con autista fra aeroporti, città e località costiere italiane, attivi 24 ore su 24, 7 giorni su 7, con tariffa fissa concordata prima del viaggio.',
};

export function organizationSchema(lang: Lang) {
  return compact({
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.brand,
    legalName: real(site.legalName) ? site.legalName : undefined,
    url: absolute(routes.home[lang]),
    logo: absolute('/images/logo.svg'),
    description: descriptions[lang],
    email: real(site.emailInfo) ? site.emailInfo : undefined,
    contactPoint: contactPoints(),
    address: postalAddress(),
    sameAs: sameAs(),
  });
}

export function localBusinessSchema(lang: Lang) {
  const geo =
    real(site.geo.lat) && real(site.geo.lng)
      ? { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng }
      : undefined;

  return compact({
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: site.brand,
    parentOrganization: { '@id': ORG_ID },
    url: absolute(routes.home[lang]),
    image: absolute('/images/og-default.png'),
    description: descriptions[lang],
    email: real(site.emailInfo) ? site.emailInfo : undefined,
    address: postalAddress(),
    geo,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAYS,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'Italy' },
      { '@type': 'City', name: 'Rome' },
      { '@type': 'City', name: 'Milan' },
      { '@type': 'City', name: 'Florence' },
      { '@type': 'City', name: 'Venice' },
      { '@type': 'City', name: 'Naples' },
      { '@type': 'Place', name: 'Amalfi Coast' },
    ],
  });
}

export function webSiteSchema(lang: Lang) {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: site.brand,
    url: absolute(routes.home[lang]),
    inLanguage: lang,
    publisher: { '@id': ORG_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Wraps the page's nodes in a single @graph so one script tag covers the page. */
export function graph(nodes: unknown[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
