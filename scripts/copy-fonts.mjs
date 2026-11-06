// Re-copies the latin-subset .woff2 files from the @fontsource packages into
// /public/fonts. Run after bumping either font dependency:  npm run fonts
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dest = join(root, 'public', 'fonts');

const files = [
  [
    'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    'inter-latin-wght-normal.woff2',
  ],
  [
    'node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff2',
    'dm-serif-display-latin-400-normal.woff2',
  ],
];

await mkdir(dest, { recursive: true });

for (const [from, name] of files) {
  await copyFile(join(root, from), join(dest, name));
  console.log(`copied ${name}`);
}
