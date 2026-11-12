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
      title: 'Italy Private Transfers & Chauffeured Rides | Ciao Italian Taxi Service',
      description:
        'Fixed-quote private transfers and chauffeured rides across Italy, 24/7. Airport pickups, city-to-city journeys and private driver days.',
      h1: 'Private transfers and chauffeured rides across Italy',
    },
    it: {
      title: 'Transfer Privati e Auto con Autista in Italia | Ciao Italian Taxi Service',
      description:
        'Transfer privati e auto con autista in tutta Italia, 24 ore su 24, con preventivo fisso. Aeroporti, tratte tra città e giornate a disposizione.',
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
      title: 'Private Transfer Italy 24/7: Contact & Quote | Ciao Italian Taxi Service',
      description:
        'Book a private transfer in Italy 24 hours a day: Rome Fiumicino airport pickups, chauffeur service between cities and Naples to Amalfi Coast transfers.',
      h1: 'Private transfer in Italy: get a quote 24/7',
    },
    it: {
      title: 'Transfer privato Italia 24 ore: contatti | Ciao Italian Taxi Service',
      description:
        'Transfer privato in Italia 24 ore su 24: ritiri all’aeroporto di Fiumicino e Ciampino, servizio con autista e transfer da Napoli alla Costiera Amalfitana.',
      h1: 'Transfer privato in Italia: preventivo 24 ore su 24',
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
