# Prompt: revise the Ciao Italian Taxi Service logo (full-name ribbon)

Attach these reference files with the prompt:
- `logo-full-name-reference.png`: the approved emblem (2048px, transparent background)
- `logo-full-name-reference.svg`: the same emblem as editable SVG
- `logo-full-name-usage-sheet.png`: how it behaves on dark backgrounds, in the header and at icon sizes

---

**Role:** Act as a senior brand identity designer and front-end developer. Finalise the logo for **Ciao Italian Taxi Service** and apply it across the website.

**What stays the same:** The current mark is the black gear with tread teeth (a cogwheel redrawn as a car tyre), a green rim, five green spokes and a white Stella d'Italia with a red outline at the centre. Keep its proportions, colours and stroke weights as they appear in the reference.

**What to add:** Add a curved red ribbon across the bottom of the gear, inspired by the ribbon on Italy's national emblem (but not copied from it). Use the attached reference image as the target:
- The ribbon is a gentle upward smile that overlaps the lower teeth of the gear. Each end folds back into a darker tail with a notched (swallowtail) cut.
- It carries the full company name, **CIAO ITALIAN TAXI SERVICE**, in white capitals in Cormorant Garamond Bold, set along the curve and centred, with slight letter-spacing.
- Two fine white lines at about 45% opacity run just inside the ribbon's top and bottom edges.
- Colours: ribbon #CD212A, tails #9E1A21, fold shadows #6E1016, gear #1C1F1D, green #008C45, star outline #CD212A on a white fill. On dark backgrounds (#0F2A1E), the gear turns #F4F5F0 and the green turns #5CC48C.

**Rules for different sizes:**
- **150px wide and up** (hero, About page, footer, signage, vehicle doors, social cover images): full emblem with the name on the ribbon.
- **Website header** (about 64 to 80px): the emblem with a plain ribbon (no letters), with the wordmark "Ciao Italian Taxi Service" beside it and "PRIVATE TRANSFERS · ITALIA" underneath.
- **App icon and small sizes** (48 to 180px): a plain ribbon, with thicker strokes and no spokes below 48px.
- **Favicon** (16 and 32px): gear ring, a solid red star and a plain red ribbon band only.

**Deliverables:**
1. Master SVGs with every letter converted to outlines, so no font is needed: `logo-emblem.svg`, `logo-emblem-reversed.svg`, `logo-horizontal.svg` (header lockup) and `logo-mark-plain.svg`.
2. Icons: `favicon.svg`, `favicon.ico` (16, 32 and 48), `apple-touch-icon.png` (180, on a white background with padding), `icon-192.png`, `icon-512.png` and a maskable `icon-512-maskable.png`, plus `site.webmanifest` with name, short_name, theme_color #00693A and background_color #FFFFFF.
3. Replace the logo everywhere on the site (header, footer, mobile menu, Open Graph/social image, JSON-LD `logo` URL, email signature if there is one), in **both the English and Italian versions**. Add the favicon and manifest `<link>` tags to every page's `<head>`.
4. Accessibility and SEO: an `alt`/`aria-label` of "Ciao Italian Taxi Service" (Italian pages: "Ciao Italian Taxi Service, logo"), a fixed width and height on every logo image to avoid layout shift, and inline SVG in the header.
5. A one-page logo usage sheet showing clear space (equal to the ribbon's height), the minimum size for the lettered version (150px) and the colour versions.

**Avoid:** recreating the official Italian state emblem (no olive or oak branches and no "Repubblica Italiana" wording), gradients, drop shadows, and bevels. Keep it flat and crisp.
