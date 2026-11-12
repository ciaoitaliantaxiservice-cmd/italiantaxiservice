import type { Lang } from './i18n';

// Card photos live in src/assets/locations/ as WebP with descriptive file
// names (the names survive into the built URLs, e.g. /images/photos/rome-
// private-transfer-colosseum.HASH-720.webp; see scripts/build-assets.mjs).
// Alt text lives in content/image-alt-text.md, keyed by file name.
// Venice: the car at Piazzale Roma, where road transfers really do end, with
// the Ponte della Costituzione behind.

export interface City {
  id: string;
  slug: Record<Lang, string>;
  name: Record<Lang, string>;
  /** Shown under the card title on the Locations hub. Unique per city AND per language. */
  cardText: Record<Lang, string>;
  /** Airport / port codes surfaced as a small meta line on the card. */
  gateways: Record<Lang, string>;
  /** Intro paragraph for the (noindex) city stub page. */
  stubIntro: Record<Lang, string>;
  /** 16:9 card photo. Cities without one keep the hatched placeholder. */
  photo?: {
    /** Source file name in src/assets/locations/ (no extension); also the
     *  row key in content/image-alt-text.md. */
    altKey: string;
  };
}

/**
 * City pages are intentionally thin stubs and are served with
 * `noindex, follow` until real routes, journey times and pricing land.
 * Flip `CITY_PAGES_INDEXABLE` to true in src/data/seo.ts once they have content —
 * that also adds them to sitemap.xml.
 */
export const cities: City[] = [
  {
    id: 'rome',
    slug: { en: 'rome', it: 'roma' },
    name: { en: 'Rome', it: 'Roma' },
    gateways: { en: 'FCO · CIA · Termini · Civitavecchia', it: 'FCO · CIA · Termini · Civitavecchia' },
    cardText: {
      en: 'Fiumicino and Ciampino runs, cruise connections to Civitavecchia, and unhurried days out to Tivoli or the Castelli Romani.',
      it: 'Collegamenti con Fiumicino e Ciampino, imbarchi a Civitavecchia e giornate senza fretta verso Tivoli o i Castelli Romani.',
    },
    stubIntro: {
      en: 'Chauffeured cars across Rome and Lazio: airport pickups with flight tracking, port transfers, and private days out beyond the ring road.',
      it: 'Auto con autista a Roma e nel Lazio: ritiri in aeroporto con monitoraggio del volo, transfer dal porto e giornate private oltre il Grande Raccordo.',
    },
    photo: {
      altKey: 'rome-private-transfer-colosseum',
    },
  },
  {
    id: 'milan',
    slug: { en: 'milan', it: 'milano' },
    name: { en: 'Milan', it: 'Milano' },
    gateways: { en: 'MXP · LIN · BGY · Centrale', it: 'MXP · LIN · BGY · Centrale' },
    cardText: {
      en: 'Malpensa, Linate and Bergamo pickups timed around meetings, plus runs north to Lake Como and the lakes.',
      it: 'Prelievi a Malpensa, Linate e Orio al Serio calibrati sugli appuntamenti, più le tratte verso il Lago di Como e i laghi.',
    },
    stubIntro: {
      en: 'Business-paced transfers in and out of Milan, with discreet drivers who know which terminal door saves you ten minutes.',
      it: 'Transfer da e per Milano al ritmo del lavoro, con autisti discreti che sanno quale uscita del terminal fa guadagnare dieci minuti.',
    },
    photo: {
      altKey: 'milan-private-transfer-duomo-galleria',
    },
  },
  {
    id: 'florence',
    slug: { en: 'florence', it: 'firenze' },
    name: { en: 'Florence', it: 'Firenze' },
    gateways: { en: 'FLR · PSA · Santa Maria Novella', it: 'FLR · PSA · Santa Maria Novella' },
    cardText: {
      en: 'The gateway to Tuscany: Peretola and Pisa arrivals, hill-town hopping, and cellar visits through Chianti at your own pace.',
      it: 'La porta della Toscana: arrivi a Peretola e Pisa, borghi collinari e visite in cantina nel Chianti con i vostri tempi.',
    },
    stubIntro: {
      en: 'Florence is where most Tuscan itineraries begin. We cover station and airport runs, plus full days through Chianti, Siena and the Val d’Orcia.',
      it: 'Firenze è il punto di partenza di quasi ogni itinerario toscano. Copriamo stazione e aeroporto, oltre a giornate intere tra Chianti, Siena e Val d’Orcia.',
    },
    photo: {
      altKey: 'florence-private-transfer-duomo',
    },
  },
  {
    id: 'venice',
    slug: { en: 'venice', it: 'venezia' },
    name: { en: 'Venice', it: 'Venezia' },
    gateways: { en: 'VCE · TSF · Piazzale Roma', it: 'VCE · TSF · Piazzale Roma' },
    cardText: {
      en: 'Road transfers end at Piazzale Roma or the Tronchetto, where we hand you over cleanly to your water transport.',
      it: 'I transfer su gomma terminano a Piazzale Roma o al Tronchetto, dove il passaggio al trasporto acqueo avviene senza intoppi.',
    },
    stubIntro: {
      en: 'Venice has no road access to the centre, so the handover point matters. We explain exactly where the car stops before you book.',
      it: 'A Venezia il centro non è raggiungibile in auto, quindi il punto di scambio conta. Spieghiamo dove si ferma l’auto già prima della prenotazione.',
    },
    photo: {
      altKey: 'venezia-transfer-piazzale-roma',
    },
  },
  {
    id: 'naples',
    slug: { en: 'naples', it: 'napoli' },
    name: { en: 'Naples', it: 'Napoli' },
    gateways: { en: 'NAP · Molo Beverello · Centrale', it: 'NAP · Molo Beverello · Centrale' },
    cardText: {
      en: 'Capodichino arrivals, ferry connections at Beverello for Capri and Ischia, and the Pompeii detour on the way south.',
      it: 'Arrivi a Capodichino, coincidenze al Beverello per Capri e Ischia e la sosta a Pompei scendendo verso sud.',
    },
    stubIntro: {
      en: 'Naples works best as a hub: airport, port and station in one tight triangle, with Pompeii and Vesuvius a short run away.',
      it: 'Napoli funziona bene come base: aeroporto, porto e stazione in un triangolo ristretto, con Pompei e il Vesuvio a breve distanza.',
    },
    photo: {
      altKey: 'naples-private-transfer-vesuvius',
    },
  },
  {
    id: 'amalfi-coast',
    slug: { en: 'amalfi-coast', it: 'costiera-amalfitana' },
    name: { en: 'Amalfi Coast', it: 'Costiera Amalfitana' },
    gateways: { en: 'Positano · Amalfi · Ravello · Sorrento', it: 'Positano · Amalfi · Ravello · Sorrento' },
    cardText: {
      en: 'The SS163 is narrow and slow by design. We size the vehicle to the road and build the timing around it, not against it.',
      it: 'La SS163 è strada stretta e lenta per natura. Scegliamo il veicolo in base alla strada e costruiamo i tempi di conseguenza.',
    },
    stubIntro: {
      en: 'Coastal driving here rewards patience and local knowledge: limited turning space, seasonal one-way schemes, and drop-offs that may end in steps.',
      it: 'Guidare in costiera premia pazienza e conoscenza locale: spazi di manovra ridotti, sensi unici stagionali e discese che a volte finiscono in scalinata.',
    },
    photo: {
      altKey: 'amalfi-coast-private-transfer-positano',
    },
  },
];

export function cityPath(city: City, lang: Lang): string {
  const base = lang === 'en' ? '/en/locations/' : '/it/localita/';
  return `${base}${city.slug[lang]}/`;
}

export function cityById(id: string): City {
  const found = cities.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown city id: ${id}`);
  return found;
}
