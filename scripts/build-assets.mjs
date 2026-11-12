/**
 * Runs before every `next build` / `next dev` (see package.json).
 *
 * 1. Photos. Every WebP source in src/assets/ is resized to the widths its
 *    slot needs (WebP, quality 80, never upscaled) and written to
 *    public/images/photos/<name>.<hash>-<width>.webp. The hash is taken from
 *    the source file, so a replaced photo always gets a new URL. A manifest
 *    of the files and the source dimensions is written to
 *    src/data/photo-manifest.json for the <Picture> component.
 *
 * 2. Leaflet's stylesheet, copied to public/vendor/leaflet/ so the coverage
 *    map can load it only when the map comes into view.
 *
 * Both outputs under public/ are generated, and ignored by git.
 */
import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir, writeFile, rm, cp, stat } from 'node:fs/promises';
import { join, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'src/assets');
const OUT = join(root, 'public/images/photos');
const MANIFEST = join(root, 'src/data/photo-manifest.json');

/** Widths per slot, by source folder (see HeroPhoto and LocationsBody). */
const WIDTHS = {
  home: [840, 1024, 1260, 1536],
  about: [840, 1024, 1260, 1536],
  locations: [360, 480, 720, 960, 1280],
};
const QUALITY = 80;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.name.endsWith('.webp')) yield full;
  }
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const manifest = {};
for await (const file of walk(SRC)) {
  const folder = relative(SRC, dirname(file)).split(/[\\/]/)[0];
  const widths = WIDTHS[folder];
  if (!widths) throw new Error(`No widths configured for src/assets/${folder}/`);

  const buf = await readFile(file);
  const name = basename(file, '.webp');
  const hash = createHash('sha256').update(buf).digest('hex').slice(0, 8);
  const { width, height } = await sharp(buf).metadata();

  // The srcset widths that fit the source, plus the source width itself for
  // the <img src> fallback.
  const all = [...new Set([...widths.filter((w) => w <= width), width])];
  const files = {};
  for (const w of all) {
    const out = `${name}.${hash}-${w}.webp`;
    await sharp(buf)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(join(OUT, out));
    files[w] = `/images/photos/${out}`;
  }
  manifest[name] = { width, height, srcset: widths.filter((w) => w <= width), files };
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`photos: ${Object.keys(sorted).length} sources -> public/images/photos/`);

// Leaflet CSS (and its images folder, referenced relatively from the CSS).
const leaflet = join(root, 'node_modules/leaflet/dist');
const vendor = join(root, 'public/vendor/leaflet');
await rm(vendor, { recursive: true, force: true });
await mkdir(vendor, { recursive: true });
await cp(join(leaflet, 'leaflet.css'), join(vendor, 'leaflet.css'));
if ((await stat(join(leaflet, 'images')).catch(() => null))?.isDirectory()) {
  await cp(join(leaflet, 'images'), join(vendor, 'images'), { recursive: true });
}
console.log('leaflet: css copied to public/vendor/leaflet/');
