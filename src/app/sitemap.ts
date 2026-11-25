import type { MetadataRoute } from 'next';
import { routes, LANGS, X_DEFAULT_LANG, type Lang, type RouteKey } from '../data/i18n';
import { absolute, CITY_PAGES_INDEXABLE } from '../data/seo';
import { cities, cityPath } from '../data/cities';
import { posts, postPath } from '../data/blog';

/**
 * /sitemap.xml. Every entry carries a full xhtml:link alternate set including
 * x-default, and noindex pages are excluded by construction (the language
 * gate at `/`, both 404s, and city stubs while they are stubs).
 *
 * A URL must never be both noindex and in the sitemap, so the single
 * CITY_PAGES_INDEXABLE flag in src/data/seo.ts drives both.
 */
export const dynamic = 'force-static';

interface Entry {
  paths: Record<Lang, string>;
  priority: number;
}

const indexableRoutes: RouteKey[] = ['home', 'locations', 'blog', 'about', 'contact', 'quote'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = indexableRoutes.map((key) => ({
    paths: { en: routes[key].en, it: routes[key].it },
    priority: key === 'home' ? 1.0 : 0.8,
  }));

  // Cities with a full page are indexable on their own; the rest follow the flag.
  for (const city of cities) {
    if (city.fullPage || CITY_PAGES_INDEXABLE) {
      entries.push({
        paths: { en: cityPath(city, 'en'), it: cityPath(city, 'it') },
        priority: city.fullPage ? 0.9 : 0.7,
      });
    }
  }

  for (const post of posts) {
    entries.push({ paths: { en: postPath(post, 'en'), it: postPath(post, 'it') }, priority: 0.6 });
  }

  const lastModified = new Date().toISOString().slice(0, 10);

  return entries.flatMap((entry) =>
    LANGS.map((lang) => ({
      url: absolute(entry.paths[lang]),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: entry.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LANGS.map((l) => [l, absolute(entry.paths[l])])),
          'x-default': absolute(entry.paths[X_DEFAULT_LANG]),
        },
      },
    }))
  );
}
