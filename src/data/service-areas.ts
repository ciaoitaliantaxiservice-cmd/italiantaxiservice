import { cities } from './cities';
import { routes, type Lang } from './i18n';

/**
 * The service areas in the homepage "Where we serve" carousel, in display
 * order. Each links to its location page on the playbook's URL pattern
 * (/en/locations/{city}/, /it/localita/{citta}/), whether or not that page
 * is built yet: docs/PLACEHOLDERS.md lists the ones still missing.
 *
 * Photos: add the file to src/assets/ and set `photo` to its name. Until then
 * the card shows a placeholder of the same size. `altKey` is the row in
 * content/image-alt-text.md; the alt text is written already, so the photo
 * can be briefed to match it.
 */
export interface ServiceArea {
  id: string;
  slug: Record<Lang, string>;
  name: Record<Lang, string>;
  photo?: string;
  altKey: string;
}

export const serviceAreas: ServiceArea[] = [
  // PLACEHOLDER(IMG:city-rome)
  { id: 'rome', slug: { en: 'rome', it: 'roma' }, name: { en: 'Rome', it: 'Roma' }, altKey: 'rome-service-area-colosseum' },
  // PLACEHOLDER(IMG:city-milan)
  { id: 'milan', slug: { en: 'milan', it: 'milano' }, name: { en: 'Milan', it: 'Milano' }, altKey: 'milan-service-area-duomo' },
  // PLACEHOLDER(IMG:city-florence)
  { id: 'florence', slug: { en: 'florence', it: 'firenze' }, name: { en: 'Florence', it: 'Firenze' }, altKey: 'florence-service-area-duomo' },
  // PLACEHOLDER(IMG:city-venice)
  { id: 'venice', slug: { en: 'venice', it: 'venezia' }, name: { en: 'Venice', it: 'Venezia' }, altKey: 'venice-service-area-grand-canal' },
  // PLACEHOLDER(IMG:city-naples)
  { id: 'naples', slug: { en: 'naples', it: 'napoli' }, name: { en: 'Naples', it: 'Napoli' }, altKey: 'naples-service-area-vesuvius' },
  // PLACEHOLDER(IMG:city-amalfi-coast)
  {
    id: 'amalfi-coast',
    slug: { en: 'amalfi-coast', it: 'costiera-amalfitana' },
    name: { en: 'Amalfi Coast', it: 'Costiera Amalfitana' },
    altKey: 'amalfi-coast-service-area-positano',
  },
  // PLACEHOLDER(IMG:city-lake-como)
  {
    id: 'lake-como',
    slug: { en: 'lake-como', it: 'lago-di-como' },
    name: { en: 'Lake Como', it: 'Lago di Como' },
    altKey: 'lake-como-service-area-bellagio',
  },
  // PLACEHOLDER(IMG:city-pisa)
  { id: 'pisa', slug: { en: 'pisa', it: 'pisa' }, name: { en: 'Pisa', it: 'Pisa' }, altKey: 'pisa-service-area-leaning-tower' },
  // PLACEHOLDER(IMG:city-bologna)
  { id: 'bologna', slug: { en: 'bologna', it: 'bologna' }, name: { en: 'Bologna', it: 'Bologna' }, altKey: 'bologna-service-area-two-towers' },
  // PLACEHOLDER(IMG:city-verona)
  { id: 'verona', slug: { en: 'verona', it: 'verona' }, name: { en: 'Verona', it: 'Verona' }, altKey: 'verona-service-area-arena' },
];

// Areas that already have a city page must link to exactly that page.
for (const area of serviceAreas) {
  const city = cities.find((c) => c.id === area.id);
  if (city && (city.slug.en !== area.slug.en || city.slug.it !== area.slug.it)) {
    throw new Error(`service-areas.ts: slug for "${area.id}" differs from cities.ts`);
  }
}

export function areaPath(area: ServiceArea, lang: Lang): string {
  return `${routes.locations[lang]}${area.slug[lang]}/`;
}

/** True when the location page is built (it may still be a noindex stub). */
export function areaPageExists(area: ServiceArea): boolean {
  return cities.some((c) => c.id === area.id);
}
