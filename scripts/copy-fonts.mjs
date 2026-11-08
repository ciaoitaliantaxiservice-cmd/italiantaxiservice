// Copies the latin-subset .woff2 files for the brand fonts into /public/fonts.
// Run after bumping either font dependency:  npm run fonts
import { copyFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dest = join(root, 'public', 'fonts');

// Cormorant Garamond carries headings at 28px and up (weights 500 and 600).
// Manrope ships as one variable file covering every weight the design uses
// (400-800), which is cheaper than four static cuts.
const files = [
  [
    'node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2',
    'cormorant-garamond-latin-500.woff2',
  ],
  [
    'node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2',
    'cormorant-garamond-latin-600.woff2',
  ],
  [
    'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
    'manrope-latin-wght.woff2',
  ],
];

const keep = new Set(files.map(([, name]) => name));

await mkdir(dest, { recursive: true });

// Drop fonts from earlier design rounds so /public/fonts never accumulates
// files the stylesheet no longer references.
for (const existing of await readdir(dest)) {
  if (!keep.has(existing)) {
    await unlink(join(dest, existing));
    console.log(`removed stale ${existing}`);
  }
}

for (const [from, name] of files) {
  await copyFile(join(root, from), join(dest, name));
  console.log(`copied ${name}`);
}
