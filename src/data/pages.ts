/**
 * Every page under /en/ and /it/, in one table: path, title, description,
 * hreflang set, breadcrumbs and page-specific structured data. The route
 * src/app/[lang]/[[...slug]]/page.tsx renders from it, and generates exactly
 * these URLs (nothing else exists under /en/ or /it/).
 */
import { routes, ui, LANGS, type Lang, type RouteKey } from './i18n';
import { meta, alternatesFor, alternatesForRoute, type Alternate } from './seo';
import { cities, cityPath, type City } from './cities';
import { faqSchema, type Crumb } from './schema';
import { t } from './content';

export type PageKind = 'home' | 'locations' | 'about' | 'contact' | 'notFound' | 'city';

export interface PageDef {
  kind: PageKind;
  lang: Lang;
  title: string;
  description: string;
  /** This page's own path, e.g. /en/about/. Becomes the canonical. */
  path: string;
  /** Reciprocal hreflang set, including self and x-default. */
  alternates: Alternate[];
  /** Equivalent page per language, for the language switch. */
  altPaths: Record<Lang, string>;
  current?: RouteKey;
  noindex: boolean;
  /** Visible breadcrumbs and BreadcrumbList (only when 2+ items). */
  crumbs?: Crumb[];
  /** Page-specific JSON-LD nodes, e.g. FAQPage. */
  extraSchema: unknown[];
  city?: City;
}

function routePage(kind: Exclude<PageKind, 'city'>, lang: Lang): PageDef {
  const m = meta[kind][lang];
  const l = ui[lang];
  const crumbs =
    kind === 'home' || kind === 'notFound'
      ? undefined
      : [
          { name: l.home, path: routes.home[lang] },
          { name: l[kind], path: routes[kind][lang] },
        ];
  return {
    kind,
    lang,
    title: m.title,
    description: m.description,
    path: routes[kind][lang],
    alternates: alternatesForRoute(kind),
    altPaths: { en: routes[kind].en, it: routes[kind].it },
    current: kind === 'notFound' ? undefined : kind,
    noindex: kind === 'notFound',
    crumbs,
    // FAQPage only on the homepage, the one page with a real FAQ.
    extraSchema: kind === 'home' ? [faqSchema(t(lang).home.faq)] : [],
  };
}

function cityPage(city: City, lang: Lang): PageDef {
  const path = cityPath(city, lang);
  const name = city.name[lang];
  const paths = { en: cityPath(city, 'en'), it: cityPath(city, 'it') };
  return {
    kind: 'city',
    lang,
    title:
      lang === 'en'
        ? `${name} Private Transfers & Chauffeured Rides`
        : `Transfer Privati a ${name} con Autista`,
    description:
      lang === 'en'
        ? `Chauffeured transfers in ${name} and the surrounding area. Tell us the route and we will send a fixed quote. Detailed routes and prices coming soon.`
        : `Servizio con autista a ${name} e dintorni. Indicate la tratta e inviamo un preventivo a tariffa fissa. Tratte e tariffe dettagliate in arrivo.`,
    path,
    alternates: alternatesFor(paths),
    altPaths: paths,
    current: 'locations',
    // noindex until this page has real routes, times and prices. Controlled
    // here and in sitemap.xml via CITY_PAGES_INDEXABLE.
    noindex: true,
    crumbs: [
      { name: ui[lang].home, path: routes.home[lang] },
      { name: ui[lang].locations, path: routes.locations[lang] },
      { name, path },
    ],
    extraSchema: [],
    city,
  };
}

export const pages: PageDef[] = LANGS.flatMap((lang) => [
  routePage('home', lang),
  routePage('locations', lang),
  routePage('about', lang),
  routePage('contact', lang),
  routePage('notFound', lang),
  ...cities.map((city) => cityPage(city, lang)),
]);

/** /en/locations/rome/ -> ['locations', 'rome'];  /en/ -> [] */
export function slugOf(page: PageDef): string[] {
  return page.path.split('/').filter(Boolean).slice(1);
}

export function findPage(lang: string, slug: string[] = []): PageDef | undefined {
  const key = slug.map((s) => decodeURIComponent(s)).join('/');
  return pages.find((p) => p.lang === lang && slugOf(p).join('/') === key);
}
