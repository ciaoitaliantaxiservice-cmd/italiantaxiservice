export type Lang = 'en' | 'it';
export const LANGS: Lang[] = ['en', 'it'];

/** The language whose URL is advertised as hreflang="x-default". */
export const X_DEFAULT_LANG: Lang = 'en';

/** Stable page identity -> localised path, per language. */
export const routes = {
  home: { en: '/en/', it: '/it/' },
  locations: { en: '/en/locations/', it: '/it/localita/' },
  about: { en: '/en/about/', it: '/it/chi-siamo/' },
  contact: { en: '/en/contact/', it: '/it/contatti/' },
  notFound: { en: '/en/404/', it: '/it/404/' },
} as const;

export type RouteKey = keyof typeof routes;

/** html lang + og:locale values. */
export const htmlLang: Record<Lang, string> = { en: 'en', it: 'it' };
export const ogLocale: Record<Lang, string> = { en: 'en_GB', it: 'it_IT' };

export const langNames: Record<Lang, string> = { en: 'English', it: 'Italiano' };

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'it' : 'en';
}

/** UI chrome strings. Page copy lives in src/data/content.ts, not here. */
export const ui = {
  en: {
    skipToContent: 'Skip to main content',
    mainNav: 'Main navigation',
    breadcrumb: 'Breadcrumb',
    home: 'Home',
    locations: 'Locations',
    about: 'About',
    contact: 'Contact',
    getQuote: 'Get a quote',
    callUs: 'Call',
    whatsapp: 'WhatsApp',
    quote: 'Quote',
    switchLanguage: 'Switch language',
    viewInItalian: 'Leggi in italiano',
    footerLegal: 'All rights reserved.',
    vat: 'VAT',
    email: 'Email',
    phone: 'Phone',
    quickLinks: 'Quick links',
    getInTouch: 'Get in touch',
    mobileActions: 'Quick actions',
  },
  it: {
    skipToContent: 'Vai al contenuto principale',
    mainNav: 'Navigazione principale',
    breadcrumb: 'Percorso di navigazione',
    home: 'Home',
    locations: 'Località',
    about: 'Chi siamo',
    contact: 'Contatti',
    getQuote: 'Richiedi un preventivo',
    callUs: 'Chiama',
    whatsapp: 'WhatsApp',
    quote: 'Preventivo',
    switchLanguage: 'Cambia lingua',
    viewInItalian: 'Read in English',
    footerLegal: 'Tutti i diritti riservati.',
    vat: 'P. IVA',
    email: 'Email',
    phone: 'Telefono',
    quickLinks: 'Link utili',
    getInTouch: 'Scrivici',
    mobileActions: 'Azioni rapide',
  },
} as const;

/**
 * Keys that appear in the header/footer nav. Narrower than RouteKey on
 * purpose: `notFound` is a real route but has no nav label, and typing this as
 * RouteKey[] would let a label-less key reach `ui[lang][key]`.
 */
export type NavKey = Extract<RouteKey, 'home' | 'locations' | 'about' | 'contact'>;

export const navOrder: NavKey[] = ['home', 'locations', 'about', 'contact'];
