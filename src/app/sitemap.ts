import type { MetadataRoute } from 'next';
import { routes, LANGS, X_DEFAULT_LANG, type Lang, type RouteKey } from '../data/i18n';
import { absolute, CITY_PAGES_INDEXABLE } from '../data/seo';
import { cities, cityPath } from '../data/cities';

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

const indexableRoutes: RouteKey[] = ['home', 'locations', 'about', 'contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = indexableRoutes.map((key) => ({
    paths: { en: routes[key].en, it: routes[key].it },
    priority: key === 'home' ? 1.0 : 0.8,
  }));

  if (CITY_PAGES_INDEXABLE) {
    for (const city of cities) {
      entries.push({
        paths: { en: cityPath(city, 'en'), it: cityPath(city, 'it') },
        priority: 0.7,
      });
    }
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
