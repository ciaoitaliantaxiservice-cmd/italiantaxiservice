/**
 * Builds every brand file from the one geometry in src/data/logo.mjs, so the
 * masters, the favicons, the app icons and the Open Graph card can never
 * drift from the mark in the site header.
 *
 *   npm run icons      (outlines the lettering first, then runs this)
 *
 * brand/   master SVGs for print, signage and partners (all text outlined)
 *   logo-emblem.svg            full emblem, name on the ribbon (>= 150px)
 *   logo-emblem-reversed.svg   the same for dark greens
 *   logo-horizontal.svg        header lockup, English tagline
 *   logo-horizontal-it.svg     header lockup, Italian tagline
 *   logo-mark-plain.svg        the mark with a plain ribbon (header size)
 *
 * public/  what the site serves
 *   favicon.svg, favicon.ico (16, 32, 48)
 *   icons/apple-touch-icon.png (180), icon-192.png, icon-512.png,
 *   icons/icon-512-maskable.png, site.webmanifest
 *   images/logo.svg                 the emblem (JSON-LD logo, gate pages)
 *   images/logo-emblem-reversed.svg the emblem in the footer
 *   images/og-default.png           1200x630 social card
 */
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  COLORS,
  VIEWBOX,
  ASPECT,
  emblem,

  favicon,
  emblemSVG,
  horizontalSVG,
  outlines,
} from '../src/data/logo.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const brand = join(root, 'brand');
const LABEL = 'Ciao Italian Taxi Service';

await mkdir(brand, { recursive: true });
await mkdir(join(pub, 'icons'), { recursive: true });
await mkdir(join(pub, 'images'), { recursive: true });

const write = async (path, text) => {
  await writeFile(path, text + '\n');
  console.log(`wrote ${path.replace(root, '').replace(/\\/g, '/').slice(1)}`);
};

// ---------------------------------------------------------------- masters
const plainMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}" width="${VIEWBOX.w}" height="${VIEWBOX.h}" role="img" aria-label="${LABEL}"><title>${LABEL}</title>${emblem({ lettered: false })}</svg>`;

await write(join(brand, 'logo-emblem.svg'), emblemSVG({}, { label: LABEL }));
await write(join(brand, 'logo-emblem-reversed.svg'), emblemSVG({ reversed: true }, { label: LABEL }));
await write(join(brand, 'logo-horizontal.svg'), horizontalSVG({ lang: 'en', label: LABEL }));
await write(join(brand, 'logo-horizontal-it.svg'), horizontalSVG({ lang: 'it', label: LABEL }));
await write(join(brand, 'logo-mark-plain.svg'), plainMark);

// The site's copies. The <img> that shows them carries the alt text, so
// these carry no title of their own (it would show as a tooltip).
await write(join(pub, 'images', 'logo.svg'), emblemSVG({}));
await write(join(pub, 'images', 'logo-emblem-reversed.svg'), emblemSVG({ reversed: true }));

// ---------------------------------------------------------------- favicons
await write(join(pub, 'favicon.svg'), favicon());

/** Renders an SVG string to a PNG buffer at size x size, supersampled. */
const png = async (svg, size, ss = 4) =>
  sharp(Buffer.from(svg), { density: 72 * ss })
    .resize(size, size, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer();

/** Places the mark (any inner markup in the emblem grid) on a square. */
const onSquare = (inner, { size, markWidth, background }) => {
  const s = markWidth / VIEWBOX.w;
  const h = markWidth * ASPECT;
  const x = (size - markWidth) / 2;
  const y = (size - h) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${
    background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : ''
  }<g transform="translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${s.toFixed(5)}) translate(${-VIEWBOX.x} ${-VIEWBOX.y})">${inner}</g></svg>`;
};

// favicon.ico: PNG-compressed entries, which every current browser and
// Windows since Vista read. Every size is the same artwork as favicon.svg and
// the app icons (the full-colour mark on a white tile), so the tab, the
// taskbar and the phone home screen all show one icon.
const icoImages = [
  { size: 16, data: await png(favicon(), 16, 8) },
  { size: 32, data: await png(favicon(), 32, 8) },
  { size: 48, data: await png(favicon(), 48, 8) },
];
const header = Buffer.alloc(6 + 16 * icoImages.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoImages.length, 4);
let offset = header.length;
icoImages.forEach(({ size, data }, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(data.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += data.length;
});
await writeFile(join(pub, 'favicon.ico'), Buffer.concat([header, ...icoImages.map((i) => i.data)]));
console.log('wrote public/favicon.ico (16, 32, 48)');

// ---------------------------------------------------------------- app icons
// White ground with padding; the plain ribbon and heavier strokes.
const app = emblem({ lettered: false, heavy: true });
const appIcons = [
  { file: 'apple-touch-icon.png', size: 180, markWidth: 144 },
  { file: 'icon-192.png', size: 192, markWidth: 154 },
  { file: 'icon-512.png', size: 512, markWidth: 410 },
  // Maskable: the mark sits inside the 80% safe circle (radius 204.8), so no
  // platform mask crops it. Its half-diagonal here is 199px.
  { file: 'icon-512-maskable.png', size: 512, markWidth: 312 },
];
for (const { file, size, markWidth } of appIcons) {
  const out = join(pub, 'icons', file);
  await writeFile(out, await png(onSquare(app, { size, markWidth, background: COLORS.white }), size, 2));
  console.log(`wrote public/icons/${file} (${size}px)`);
}

// Replaced by favicon.ico and the new readings.
await rm(join(pub, 'icons', 'icon-32.png'), { force: true });
await rm(join(pub, 'images', 'app-icon.svg'), { force: true });

await write(
  join(pub, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'Ciao Italian Taxi Service',
      short_name: 'Ciao Taxi',
      description: 'Private transfers and chauffeured rides across Italy.',
      start_url: '/',
      scope: '/',
      display: 'browser',
      background_color: '#FFFFFF',
      theme_color: '#00693A',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2
  )
);

// ---------------------------------------------------------------- OG card
// Every word is an outline from the brand fonts, so the card renders the
// same here as anywhere else.
const og = outlines.og;
const ogCard = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${COLORS.bianco}"/>
  <rect x="0" y="0" width="400" height="10" fill="${COLORS.felce}"/>
  <rect x="400" y="0" width="400" height="10" fill="${COLORS.white}"/>
  <rect x="800" y="0" width="400" height="10" fill="${COLORS.rosso}"/>
  <g transform="translate(80 196) scale(1.087) translate(${-VIEWBOX.x} ${-VIEWBOX.y})">${emblem()}</g>
  <path transform="translate(360 268)" d="${og.title.d}" fill="${COLORS.carbone}"/>
  <path transform="translate(362 328)" d="${og.en.d}" fill="#5A605C"/>
  <path transform="translate(362 370)" d="${og.it.d}" fill="#5A605C"/>
  <rect x="96" y="470" width="1008" height="1" fill="#DADCD5"/>
  <path transform="translate(96 530)" d="${og.kicker.d}" fill="${COLORS.felce}"/>
</svg>`;
await sharp(Buffer.from(ogCard))
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(join(pub, 'images', 'og-default.png'));
console.log('wrote public/images/og-default.png (1200x630)');
