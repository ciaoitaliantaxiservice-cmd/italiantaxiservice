/**
 * Every page under /en/ and /it/, in one table: path, title, description,
 * hreflang set, breadcrumbs and page-specific structured data. The route
 * src/app/[lang]/[[...slug]]/page.tsx renders from it, and generates exactly
 * these URLs (nothing else exists under /en/ or /it/).
 */
import { routes, ui, LANGS, type Lang, type RouteKey } from './i18n';
import { meta, alternatesFor, alternatesForRoute, type Alternate } from './seo';
import { cities, cityPath, type City } from './cities';
import { faqSchema, romeServiceSchema, milanServiceSchema, blogPostingSchema, type Crumb } from './schema';
import { t } from './content';
import { romeCopy, withoutMarkers } from './rome';
import { milanCopy } from './milan';
import { posts, postPath, type BlogPost } from './blog';

export type PageKind =
  | 'home'
  | 'locations'
  | 'blog'
  | 'about'
  | 'contact'
  | 'notFound'
  | 'city'
  | 'rome'
  | 'milan'
  | 'post';

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
  post?: BlogPost;
  /**
   * Where the phone sticky bar's main action goes, and its label, when the
   * page has its own booking form (default: the contact page's form).
   */
  book?: { href: string; label: string };
}

function routePage(kind: Exclude<PageKind, 'city' | 'rome' | 'milan' | 'post'>, lang: Lang): PageDef {
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

/** The full Rome location page (src/data/rome.ts). Indexable. */
function romePage(city: City, lang: Lang): PageDef {
  const path = cityPath(city, lang);
  const paths = { en: cityPath(city, 'en'), it: cityPath(city, 'it') };
  const c = romeCopy[lang];
  return {
    kind: 'rome',
    lang,
    title: c.meta.title,
    description: c.meta.description,
    path,
    alternates: alternatesFor(paths),
    altPaths: paths,
    current: 'locations',
    noindex: false,
    crumbs: [
      { name: ui[lang].home, path: routes.home[lang] },
      { name: ui[lang].locations, path: routes.locations[lang] },
      { name: city.name[lang], path },
    ],
    extraSchema: [
      romeServiceSchema(lang, path),
      // Exactly the visible questions and answers, minus [[PLACEHOLDER]] markers.
      faqSchema(c.faq.items.map((f) => ({ q: f.q, a: withoutMarkers(f.a) }))),
    ],
    city,
    book: { href: '#quote-form', label: c.bookNow },
  };
}

/** The full Milan location page (src/data/milan.ts). Indexable. */
function milanPage(city: City, lang: Lang): PageDef {
  const path = cityPath(city, lang);
  const paths = { en: cityPath(city, 'en'), it: cityPath(city, 'it') };
  const c = milanCopy[lang];
  return {
    kind: 'milan',
    lang,
    title: c.meta.title,
    description: c.meta.description,
    path,
    alternates: alternatesFor(paths),
    altPaths: paths,
    current: 'locations',
    noindex: false,
    crumbs: [
      { name: ui[lang].home, path: routes.home[lang] },
      { name: ui[lang].locations, path: routes.locations[lang] },
      { name: city.name[lang], path },
    ],
    extraSchema: [
      milanServiceSchema(lang, path),
      // Exactly the visible questions and answers, minus markers and link syntax.
      faqSchema(c.faq.items.map((f) => ({ q: f.q, a: withoutMarkers(f.a) }))),
    ],
    city,
    book: { href: '#quote-form', label: c.bookNow },
  };
}

function postPage(post: BlogPost, lang: Lang): PageDef {
  const path = postPath(post, lang);
  const paths = { en: postPath(post, 'en'), it: postPath(post, 'it') };
  return {
    kind: 'post',
    lang,
    title: post.title[lang],
    description: post.description[lang],
    path,
    alternates: alternatesFor(paths),
    altPaths: paths,
    current: 'blog',
    noindex: false,
    crumbs: [
      { name: ui[lang].home, path: routes.home[lang] },
      { name: ui[lang].blog, path: routes.blog[lang] },
      { name: post.h1[lang], path },
    ],
    extraSchema: [
      blogPostingSchema({
        lang,
        path,
        headline: post.h1[lang],
        description: post.description[lang],
        date: post.date,
      }),
    ],
    post,
  };
}

function cityPage(city: City, lang: Lang): PageDef {
  if (city.id === 'rome') return romePage(city, lang);
  if (city.id === 'milan') return milanPage(city, lang);
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
  routePage('blog', lang),
  routePage('about', lang),
  routePage('contact', lang),
  routePage('notFound', lang),
  ...cities.map((city) => cityPage(city, lang)),
  ...posts.map((post) => postPage(post, lang)),
]);

/** /en/locations/rome/ -> ['locations', 'rome'];  /en/ -> [] */
export function slugOf(page: PageDef): string[] {
  return page.path.split('/').filter(Boolean).slice(1);
}

export function findPage(lang: string, slug: string[] = []): PageDef | undefined {
  const key = slug.map((s) => decodeURIComponent(s)).join('/');
  return pages.find((p) => p.lang === lang && slugOf(p).join('/') === key);
}
