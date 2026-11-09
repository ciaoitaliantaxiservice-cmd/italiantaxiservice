/**
 * Alt text for every image, read from content/image-alt-text.md at build
 * time so that file stays the single place to edit it.
 *
 * The table rows look like:  | `image-key` | English | Italiano |
 * where the key is the image's file name without extension.
 */
import table from '../../content/image-alt-text.md?raw';
import type { Lang } from './i18n';

const rows = new Map<string, Record<Lang, string>>();
for (const line of table.split(/\r?\n/)) {
  const m = line.match(/^\|\s*`([^`]+)`\s*\|(.*)\|(.*)\|\s*$/);
  if (m) rows.set(m[1], { en: m[2].trim(), it: m[3].trim() });
}

/**
 * Alt text for an image key (or an imported image, whose file name is used),
 * in the page's language. Throws at build time if the row or the cell is
 * missing, so an image can never ship without alt text.
 */
export function altFor(image: string | { src: string }, lang: Lang): string {
  const key =
    typeof image === 'string'
      ? image
      : decodeURIComponent(image.src.split('/').pop()!.split('?')[0])
          // Astro adds a content hash to built asset names: name.HASH.webp
          .replace(/\.[^.]+$/, '')
          .replace(/\.[A-Za-z0-9_-]{6,}$/, '');
  const row = rows.get(key);
  const text = row?.[lang];
  if (!text) {
    throw new Error(
      `No ${lang} alt text for image "${key}". Add a row to content/image-alt-text.md.`
    );
  }
  return text;
}
