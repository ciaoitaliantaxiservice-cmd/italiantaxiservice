/**
 * The Ciao Italian Taxi Service mark: one set of geometry for every place it
 * appears. src/components/Logo.astro (the inline header mark) and
 * scripts/make-icons.mjs (the master SVGs, favicons, app icons and the Open
 * Graph card) both build from these functions, so they cannot drift apart.
 *
 * Construction, on a 200-unit grid centred at (100, 100):
 *   gear     16 tread teeth (r 71-80) and a tyre wall (r 66, 14 wide)
 *   wheel    green rim (r 57, 3 wide) and five spokes, one per star point
 *   hub      the Stella d'Italia: white fill, red outline
 *   ribbon   a red band bowed upward like a smile across the lower teeth,
 *            darker swallowtail tails folding back behind each end, two fine
 *            white rules inside its edges, and the full name in Cormorant
 *            Garamond Bold set along its curve (as outlines, see below)
 *
 * The lettering is never live text: scripts/outline-logo-text.mjs converts
 * it to outlines in logo-outlines.json, so no file needs a font installed.
 *
 * Readings by size (the name only reads from about 150px wide):
 *   emblem   >= 150px   gear, wheel, star, ribbon with the name
 *   mark     header     the same with a plain ribbon (no letters, no rules)
 *   icon     16-512px   plain ribbon, heavier strokes: the one site icon,
 *                       on a white tile for the favicon and on white for
 *                       the home-screen and manifest icons
 */
import outlines from './logo-outlines.json' with { type: 'json' };

export const COLORS = {
  carbone: '#1C1F1D',
  felce: '#008C45',
  chiaro: '#5CC48C',
  rosso: '#CD212A',
  tail: '#9E1A21',
  fold: '#6E1016',
  bianco: '#F4F5F0',
  notte: '#0F2A1E',
  white: '#FFFFFF',
};

/** Tight box around the emblem (teeth top 19.8, ribbon foot 201, tails ±114). */
export const VIEWBOX = { x: -15, y: 19, w: 230, h: 183 };
export const viewBox = `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`;
/** Height / width, for sizing any rendering without layout shift. */
export const ASPECT = VIEWBOX.h / VIEWBOX.w;

const STAR =
  '100,66 108.2,88.7 132.3,89.5 113.3,104.3 120,127.5 100,114 80,127.5 86.7,104.3 67.7,89.5 91.8,88.7';
const SPOKES = [
  [100, 66, 100, 46],
  [132.3, 89.5, 151.4, 83.3],
  [120, 127.5, 131.7, 143.7],
  [80, 127.5, 68.3, 143.7],
  [67.7, 89.5, 48.6, 83.3],
];

const teeth = (fill, w = 10, h = 9) =>
  `<g fill="${fill}">${Array.from({ length: 16 }, (_, i) => {
    const t = i === 0 ? '' : ` transform="rotate(${i * 22.5} 100 100)"`;
    return `<rect x="${100 - w / 2}" y="${29 - h}" width="${w}" height="${h}" rx="1.5"${t}/>`;
  }).join('')}</g>`;

const spokes = (stroke, width) =>
  `<g stroke="${stroke}" stroke-width="${width}" stroke-linecap="round">${SPOKES.map(
    ([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
  ).join('')}</g>`;

/** The band alone: top edge M8,150 Q100,196 192,150, 28 units deep. */
const BAND = 'M8 150Q100 196 192 150L192 178Q100 224 8 178Z';

function ribbon({ lettered }) {
  const { tail, fold, rosso, white } = COLORS;
  return [
    // Tails behind the band, each with a swallowtail notch, and the fold
    // shadow where the band turns back into them.
    `<polygon points="14,156 -14,152 -4,169 -14,188 14,186" fill="${tail}"/>`,
    `<polygon points="186,156 214,152 204,169 214,188 186,186" fill="${tail}"/>`,
    `<polygon points="8,178 14,186 14,178" fill="${fold}"/>`,
    `<polygon points="192,178 186,186 186,178" fill="${fold}"/>`,
    `<path d="${BAND}" fill="${rosso}"/>`,
    // The fine rules and the name only resolve at emblem sizes.
    lettered &&
      `<path d="M12 154Q100 199 188 154M12 174Q100 219 188 174" fill="none" stroke="${white}" stroke-width=".7" opacity=".45"/>`,
    lettered && `<path d="${outlines.ribbon.d}" fill="${white}"/>`,
  ]
    .filter(Boolean)
    .join('');
}

/**
 * The emblem's inner markup (no <svg> wrapper), in the 200-unit grid.
 *
 * reversed  for the dark greens: gear Bianco, green Verde Chiaro, the wheel
 *           left open so the ground shows through; star and ribbon unchanged
 * lettered  the name on the ribbon (150px wide and up)
 * heavy     app-icon strokes, stepped up so the mark survives 48-180px
 */
export function emblem({ reversed = false, lettered = true, heavy = false } = {}) {
  const gear = reversed ? COLORS.bianco : COLORS.carbone;
  const green = reversed ? COLORS.chiaro : COLORS.felce;
  const disc = reversed ? 'none' : COLORS.white;
  return [
    teeth(gear),
    `<circle cx="100" cy="100" r="66" fill="none" stroke="${gear}" stroke-width="${heavy ? 16 : 14}"/>`,
    `<circle cx="100" cy="100" r="${heavy ? 56 : 57}" fill="${disc}" stroke="${green}" stroke-width="${heavy ? 4 : 3}"/>`,
    spokes(green, heavy ? 8 : 6),
    `<polygon points="${STAR}" fill="${COLORS.white}" stroke="${COLORS.rosso}" stroke-width="${heavy ? 6 : 4}" stroke-linejoin="round"/>`,
    ribbon({ lettered }),
  ].join('');
}

/**
 * The site icon: the full-colour mark (gear, green wheel and spokes, red
 * star, plain ribbon, heavier app strokes) centred in a square. One artwork
 * for every icon slot, so the browser tab, the home screen and the manifest
 * icons all look the same.
 */
export function iconInner({ markWidth, size }) {
  const s = markWidth / VIEWBOX.w;
  const h = markWidth * ASPECT;
  const x = (size - markWidth) / 2;
  const y = (size - h) / 2;
  return `<g transform="translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${s.toFixed(5)}) translate(${-VIEWBOX.x} ${-VIEWBOX.y})">${emblem({ lettered: false, heavy: true })}</g>`;
}

/**
 * favicon.svg and every .ico size: the site icon on a white rounded tile. The
 * tile keeps the gear visible on a dark tab strip without swapping colours,
 * so the tab shows the same green icon as the phone home screen.
 */
export function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" rx="40" fill="${COLORS.white}"/>${iconInner({ markWidth: 188, size: 200 })}</svg>`;
}

/** A complete standalone SVG of the emblem. */
export function emblemSVG(opts = {}, { label } = {}) {
  const a11y = label ? ` role="img" aria-label="${label}"><title>${label}</title>` : '>';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${VIEWBOX.w}" height="${VIEWBOX.h}"${a11y}${emblem(opts)}</svg>`;
}

/**
 * Horizontal lockup (header style, for documents and email): the plain-ribbon
 * mark with the wordmark beside it and the tagline underneath, all outlined.
 * Proportions follow the site header: mark 64px wide, name 26px, tag 10px
 * tracked 0.2em, 12px gap.
 */
export function horizontalSVG({ lang = 'en', reversed = false, label } = {}) {
  const ink = reversed ? COLORS.bianco : COLORS.carbone;
  const sub = reversed ? '#C9D3CC' : '#5A605C';
  const markW = 160;
  const markH = markW * ASPECT;
  const s = markW / VIEWBOX.w;
  const nameSize = 65; // 26 / 64 x 160
  const tagSize = 25; // 10 / 64 x 160
  const gap = 30;
  const textX = markW + gap;
  const nameBase = markH / 2 + 4;
  const tagBase = nameBase + 38;
  const tag = outlines.tagline[lang];
  const nameW = (outlines.wordmark.width * nameSize) / outlines.wordmark.size;
  const tagW = (tag.width * tagSize) / tag.size;
  const W = Math.ceil(textX + Math.max(nameW, tagW) + 4);
  const H = Math.ceil(markH);
  const a11y = label ? ` role="img" aria-label="${label}"><title>${label}</title>` : '>';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"${a11y}<g transform="scale(${s.toFixed(5)}) translate(${-VIEWBOX.x} ${-VIEWBOX.y})">${emblem({ reversed, lettered: false })}</g><path transform="translate(${textX} ${nameBase.toFixed(2)}) scale(${nameSize / outlines.wordmark.size})" d="${outlines.wordmark.d}" fill="${ink}"/><path transform="translate(${textX} ${tagBase.toFixed(2)}) scale(${tagSize / tag.size})" d="${tag.d}" fill="${sub}"/></svg>`;
}

export { outlines };
