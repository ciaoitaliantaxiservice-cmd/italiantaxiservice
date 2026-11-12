/**
 * Alt text for every image, read from content/image-alt-text.md at build
 * time so that file stays the single place to edit it. Server-only: it reads
 * the file from disk while the static pages are generated.
 *
 * The table rows look like:  | `image-key` | English | Italiano |
 * where the key is the image's file name without extension.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Lang } from './i18n';

const table = readFileSync(join(process.cwd(), 'content/image-alt-text.md'), 'utf8');

const rows = new Map<string, Record<Lang, string>>();
for (const line of table.split(/\r?\n/)) {
  const m = line.match(/^\|\s*`([^`]+)`\s*\|(.*)\|(.*)\|\s*$/);
  if (m) rows.set(m[1], { en: m[2].trim(), it: m[3].trim() });
}

/**
 * Alt text for an image key (its file name without extension), in the page's
 * language. Throws at build time if the row or the cell is missing, so an
 * image can never ship without alt text.
 */
export function altFor(key: string, lang: Lang): string {
  const text = rows.get(key)?.[lang];
  if (!text) {
    throw new Error(
      `No ${lang} alt text for image "${key}". Add a row to content/image-alt-text.md.`
    );
  }
  return text;
}
