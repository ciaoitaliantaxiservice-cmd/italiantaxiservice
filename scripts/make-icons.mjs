/**
 * Builds every static brand asset from the approved concept's artwork, so the
 * favicon set, the app icons and the Open Graph image can never drift from
 * the mark in src/components/Logo.astro.
 *
 *   npm run icons
 *
 * The concept simplifies the mark as it shrinks, and this follows that:
 *   24 / 32px  green ring + red star only
 *   180-512px  ring, rim, five spokes and star on white (no tread teeth)
 *   emblem     the full mark with tread teeth and the red ribbon
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const CARBONE = '#1C1F1D';
const VERDE_FELCE = '#008C45';
const ROSSO = '#CD212A';
const BIANCO = '#F4F5F0';
const WHITE = '#FFFFFF';

const STAR =
  '100,66 108.2,88.7 132.3,89.5 113.3,104.3 120,127.5 100,114 80,127.5 86.7,104.3 67.7,89.5 91.8,88.7';

const SPOKES = [
  [100, 66, 100, 46],
  [132.3, 89.5, 151.4, 83.3],
  [120, 127.5, 131.7, 143.7],
  [80, 127.5, 68.3, 143.7],
  [67.7, 89.5, 48.6, 83.3],
];

const spokePaths = (stroke, width) =>
  `<g stroke="${stroke}" stroke-width="${width}" stroke-linecap="round">${SPOKES.map(
    ([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
  ).join('')}</g>`;

const teeth = (fill) =>
  `<g fill="${fill}">${Array.from({ length: 16 }, (_, i) => {
    const deg = i * 22.5;
    const t = deg === 0 ? '' : ` transform="rotate(${deg} 100 100)"`;
    return `<rect x="95" y="20" width="10" height="9" rx="1.5"${t}/>`;
  }).join('')}</g>`;

/** The smallest reading: a green ring with the red star. */
const favicon = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="14 14 172 172">
  <circle cx="100" cy="100" r="64" fill="none" stroke="${VERDE_FELCE}" stroke-width="22"/>
  <polygon points="100,58 110,87 141,88 117,107 125.5,137 100,120 74.5,137 83,107 59,88 90,87" fill="${ROSSO}"/>
</svg>`;

/** App icon: wheel and star on white, teeth dropped, strokes stepped up. */
const appIcon = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="${WHITE}"/>
  <circle cx="100" cy="100" r="66" fill="none" stroke="${CARBONE}" stroke-width="16"/>
  <circle cx="100" cy="100" r="56" fill="${WHITE}" stroke="${VERDE_FELCE}" stroke-width="4"/>
  ${spokePaths(VERDE_FELCE, 8)}
  <polygon points="${STAR}" fill="${WHITE}" stroke="${ROSSO}" stroke-width="6" stroke-linejoin="round"/>
</svg>`;

/** The full mark, ribbon and all. Used for the Organization logo. */
const emblem = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 190">
  ${teeth(CARBONE)}
  <circle cx="100" cy="100" r="66" fill="none" stroke="${CARBONE}" stroke-width="14"/>
  <circle cx="100" cy="100" r="57" fill="${WHITE}" stroke="${VERDE_FELCE}" stroke-width="3"/>
  ${spokePaths(VERDE_FELCE, 6)}
  <polygon points="${STAR}" fill="${WHITE}" stroke="${ROSSO}" stroke-width="4" stroke-linejoin="round"/>
  <polygon points="4,154 30,154 30,182 4,182 13,168" fill="#9E1A21"/>
  <polygon points="196,154 170,154 170,182 196,182 187,168" fill="#9E1A21"/>
  <polygon points="22,174 30,182 30,174" fill="#6E1016"/>
  <polygon points="178,174 170,182 170,174" fill="#6E1016"/>
  <rect x="22" y="146" width="156" height="28" fill="${ROSSO}"/>
  <line x1="26" y1="149.5" x2="174" y2="149.5" stroke="${WHITE}" stroke-width=".75" opacity=".5"/>
  <line x1="26" y1="170.5" x2="174" y2="170.5" stroke="${WHITE}" stroke-width=".75" opacity=".5"/>
  <text x="100" y="163.8" text-anchor="middle" font-family="Manrope, 'Segoe UI', Arial, sans-serif" font-weight="800" font-size="10" letter-spacing="1.6" fill="${WHITE}">CIAO ITALIAN TAXI</text>
</svg>`;

/**
 * Open Graph card, 1200x630.
 *
 * The wordmark is set in whatever serif the rasteriser can find, because the
 * brand fonts are not installed system-wide. That is fine for a placeholder
 * but it is NOT the typeface from the concept — see README, "Placeholders".
 */
const ogCard = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BIANCO}"/>
  <g>
    <rect x="0" y="0" width="400" height="10" fill="${VERDE_FELCE}"/>
    <rect x="400" y="0" width="400" height="10" fill="${WHITE}"/>
    <rect x="800" y="0" width="400" height="10" fill="${ROSSO}"/>
  </g>
  <g transform="translate(96 150) scale(0.95)">
    ${teeth(CARBONE)}
    <circle cx="100" cy="100" r="66" fill="none" stroke="${CARBONE}" stroke-width="14"/>
    <circle cx="100" cy="100" r="57" fill="${BIANCO}" stroke="${VERDE_FELCE}" stroke-width="3"/>
    ${spokePaths(VERDE_FELCE, 6)}
    <polygon points="${STAR}" fill="${WHITE}" stroke="${ROSSO}" stroke-width="4" stroke-linejoin="round"/>
  </g>
  <text x="330" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="68" fill="${CARBONE}">Ciao Italian Taxi Service</text>
  <text x="330" y="330" font-family="'Segoe UI', Arial, sans-serif" font-size="28" fill="#5A605C">Private transfers and chauffeured rides across Italy</text>
  <text x="330" y="372" font-family="'Segoe UI', Arial, sans-serif" font-size="28" fill="#5A605C">Transfer privati e auto con autista in tutta Italia</text>
  <rect x="96" y="470" width="1008" height="1" fill="#DADCD5"/>
  <text x="96" y="530" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="20" letter-spacing="2.8" fill="${VERDE_FELCE}">FIXED QUOTE BEFORE YOU TRAVEL</text>
</svg>`;

await mkdir(join(pub, 'icons'), { recursive: true });
await mkdir(join(pub, 'images'), { recursive: true });

// Scalable sources.
await writeFile(join(pub, 'favicon.svg'), favicon() + '\n');
await writeFile(join(pub, 'images', 'logo.svg'), emblem() + '\n');
await writeFile(join(pub, 'images', 'app-icon.svg'), appIcon() + '\n');
console.log('wrote favicon.svg, images/logo.svg, images/app-icon.svg');

const raster = [
  // The small sizes use the simplified reading, on a transparent ground.
  { svg: favicon(), size: 32, out: join(pub, 'icons', 'icon-32.png') },
  // App icons sit on white so the platform mask has something to crop.
  { svg: appIcon(), size: 180, out: join(pub, 'icons', 'apple-touch-icon.png') },
  { svg: appIcon(), size: 192, out: join(pub, 'icons', 'icon-192.png') },
  { svg: appIcon(), size: 512, out: join(pub, 'icons', 'icon-512.png') },
];

for (const { svg, size, out } of raster) {
  await sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toFile(out);
  console.log(`wrote ${out.replace(pub, 'public')} (${size}px)`);
}

await sharp(Buffer.from(ogCard()))
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(join(pub, 'images', 'og-default.png'));
console.log('wrote public/images/og-default.png (1200x630)');
