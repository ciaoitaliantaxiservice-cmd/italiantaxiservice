import { routes, LANGS, X_DEFAULT_LANG, type Lang, type RouteKey } from './i18n';
import { SITE_URL } from './site.mjs';

/**
 * City pages ship as `noindex, follow` stubs. Set this to true only once every
 * city page has unique, substantive content — it controls both the robots meta
 * tag and inclusion in sitemap.xml.
 */
export const CITY_PAGES_INDEXABLE = false;

export interface Meta {
  title: string;
  description: string;
  h1: string;
}

type MetaByLang = Record<Lang, Meta>;

export const meta: Record<RouteKey, MetaByLang> = {
  home: {
    en: {
      title: 'Italy Private Transfers & Chauffeured Rides | Ciao',
      description:
        'Fixed-quote private transfers and chauffeured rides across Italy. Airport pickups, city-to-city journeys and private driver days. Quote in minutes.',
      h1: 'Private transfers and chauffeured rides across Italy',
    },
    it: {
      title: 'Transfer Privati e Auto con Autista in Italia | Ciao',
      description:
        'Transfer privati e auto con autista in tutta Italia, con preventivo fisso. Aeroporti, tratte tra città e giornate a disposizione. Rispondiamo in poche ore.',
      h1: 'Transfer privati e auto con autista in tutta Italia',
    },
  },
  locations: {
    en: {
      title: 'Transfer Destinations in Italy: Cities & Airports',
      description:
        'Where we drive: Rome, Milan, Florence, Venice, Naples and the Amalfi Coast, with the airports, ports and stations we cover in each area.',
      h1: 'Where we drive in Italy',
    },
    it: {
      title: 'Località Servite: Città e Aeroporti Italiani',
      description:
        'Le aree che copriamo: Roma, Milano, Firenze, Venezia, Napoli e Costiera Amalfitana, con aeroporti, porti e stazioni serviti in ciascuna zona.',
      h1: 'Le località che serviamo',
    },
  },
  about: {
    en: {
      title: 'About Ciao Italian Taxi Service | Our Drivers',
      description:
        'How Ciao Italian Taxi Service works: vetted local drivers, quotes agreed before you travel, and one point of contact from booking to drop-off.',
      h1: 'The people behind the wheel',
    },
    it: {
      title: 'Chi Siamo | Ciao Italian Taxi Service',
      description:
        'Come lavoriamo in Ciao Italian Taxi Service: autisti locali selezionati, preventivi concordati prima di partire e un solo referente dall’inizio alla fine.',
      h1: 'Chi guida, e perché conta',
    },
  },
  contact: {
    en: {
      title: 'Contact Us & Request a Transfer Quote | Ciao',
      description:
        'Tell us your route, date and passenger count and we will send a fixed quote. Reach us by phone, WhatsApp or email, seven days a week.',
      h1: 'Request a quote or ask us anything',
    },
    it: {
      title: 'Contatti e Preventivo Transfer | Ciao Italian Taxi',
      description:
        'Indicate tratta, data e numero di passeggeri: inviamo un preventivo a tariffa fissa. Ci trovate al telefono, su WhatsApp o via email, tutti i giorni.',
      h1: 'Chiedete un preventivo o scriveteci',
    },
  },
  notFound: {
    en: {
      title: 'Page Not Found | Ciao Italian Taxi Service',
      description: 'That page does not exist. Use the links below to find a destination, read about us, or request a transfer quote.',
      h1: 'We have taken a wrong turn',
    },
    it: {
      title: 'Pagina Non Trovata | Ciao Italian Taxi Service',
      description: 'Questa pagina non esiste. Usate i collegamenti qui sotto per trovare una località, conoscerci o chiedere un preventivo.',
      h1: 'Abbiamo sbagliato strada',
    },
  },
};

/** Absolute canonical URL for a path such as `/en/about/`. */
export function absolute(path: string): string {
  return new URL(path, SITE_URL).href;
}

export interface Alternate {
  hreflang: string;
  href: string;
}

/**
 * Reciprocal hreflang set for a page. Every page in the group lists the same
 * alternates, including itself, plus one x-default.
 */
export function alternatesFor(paths: Record<Lang, string>): Alternate[] {
  const list: Alternate[] = LANGS.map((l) => ({ hreflang: l, href: absolute(paths[l]) }));
  list.push({ hreflang: 'x-default', href: absolute(paths[X_DEFAULT_LANG]) });
  return list;
}

/** hreflang set for one of the four main pages. */
export function alternatesForRoute(key: RouteKey): Alternate[] {
  return alternatesFor({ en: routes[key].en, it: routes[key].it });
}
