# Ciao Italian Taxi Service — bilingual site, v1.2

Static, bilingual (EN/IT) marketing site for a private-transfer business.
Built with [Astro](https://astro.build) 5, output as plain HTML with about
2.4 KB of inlined JavaScript and no runtime framework. The visual design follows
the approved brand concept (see *Design system* below). Tailwind CSS 4,
Flowbite 4 and Lucide icons are installed and mapped to the brand (see
*Tailwind CSS, Flowbite and Lucide*).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> ./dist
npm run preview    # serve ./dist locally
npm run check      # Astro + TypeScript diagnostics
npm run verify     # audit ./dist against the SEO invariants
npm run audit      # build + verify in one go
npm run fonts      # re-copy the three self-hosted woff2 files from @fontsource
npm run icons      # outline the logo lettering, then rebuild masters, icons, manifest and OG image
```

---

## Read this first

Three things about this build you need to know before reviewing it.

**1. The approved concept is now applied, but its copy is not.** v1.1 brings the
logo, type, colour, spacing and components in line with the brand concept.
URLs, slugs, canonicals, hreflang, meta tags, JSON-LD (apart from the logo and
OG image URLs), the sitemap, robots.txt and every string of copy are unchanged
from v1. That was checked by diffing the two builds page by page, not
assumed. The concept's own sample copy includes licence claims and an invented
rating, so none of it was imported. See *Where the build departs from the
concept*.

**2. No licence is claimed anywhere, and that is enforced.** The brief ruled out
taxi and NCC licence claims. In Italian this is a live trap: the highest-intent
commercial term in that market, `NCC` (*noleggio con conducente*), **is** a
licence category, so the obvious Italian copy would have breached the rule.
The Italian pages are built on `transfer privato`, `auto con autista` and
`servizio con autista` instead.

`npm run verify` fails the build if `NCC`, `licence`, `license`, `licensed`,
`licenza` or `autorizzazione` reaches rendered copy, and if any licence
property appears in JSON-LD. There is a redaction note at the top of
`src/data/content/it.ts` for whoever edits the copy next.

**3. Requests come in through the quote form and email only. No phone, no
WhatsApp.** v1.2 removed calls; v1.3 removed WhatsApp too. Every place that
offers a way in now offers the form ("Get a quote") and "Email us", a
`mailto:` link: the hero, the utility bar above the header, the dark CTA band,
the full-screen mobile menu, the sticky mobile bar (Email us, Get a quote),
the contact page (form, then email) and the footer. JSON-LD carries no
`telephone` and no WhatsApp; the Organization's one `contactPoint` is email,
answered 24/7. `npm run verify` fails the build on any `tel:` link, any
`telephone` in JSON-LD, or the word WhatsApp or a `wa.me` link anywhere.

The service runs **24 hours a day, 7 days a week**: the contact page says so
("When we answer" is now "Open 24 hours, 7 days a week"), and
`LocalBusiness.openingHoursSpecification` is Monday-Sunday 00:00-23:59,
schema.org's form for 24 hours.

Where 24/7 appears, in both languages: the utility bar on every page, the
home hero checklist ("Available 24/7" / "Attivi 24 ore su 24"), the home
meta description, a home FAQ ("Do you drive at night and early in the
morning?", also in the FAQPage JSON-LD), the CTA band note, the footer blurb,
the Organization/LocalBusiness description, and the contact page (title, H1,
intro, form note and the 24/7 panel).

v1.3 copy and meta changes (everything else is word-for-word as before,
checked by diffing the builds):

| Where | Change |
|---|---|
| Contact page, both languages | Rewritten for search: title, description, H1, intro, form heading and note, the email and 24/7 panels, and the new coverage section. Targets "private transfer Italy", "airport taxi Rome Fiumicino", "chauffeur service Italy", "24 hour taxi Italy", "transfer Naples to Amalfi Coast" / "transfer privato", "taxi aeroporto Fiumicino", "servizio taxi 24 ore". |
| Home, "How a booking goes", step 1 | "...or a WhatsApp message" is now "...or a short email" (IT: "...o con una breve email") |
| Quote form, phone label | "Phone or WhatsApp number" is now "Phone number" (IT: "Telefono") |
| Quote form, not-connected notice | points at email only |
| Buttons | "Email us" / "Scrivici" replaces "WhatsApp" and the written-out address in the utility bar, hero, CTA band and sticky bar |

**How the keywords are used.** "taxi", "24 hour taxi" and "taxi aeroporto
Fiumicino" appear only as what a visitor searches for ("Skip the airport taxi
queue at Rome Fiumicino...", "Looking for a 24 hour taxi in Italy...? Book the
transfer ahead"), never as a description of the service, which stays "private
transfer" and "chauffeur service". **"NCC Italia" was requested but is not on
the site**: NCC is a licence category, the rule in point 2 bans it, and
`npm run verify` stopped the build when it appeared. If the business holds an
NCC licence, remove `NCC` from the verify script's banned words and add the
prepared sentence to `contact.hoursMore` in `src/data/content/it.ts`:
"Cercate un servizio taxi 24 ore o un NCC in Italia...".

Copy that mentions phones but is not a way to book is unchanged, e.g. "drivers
who answer their phones" on About.

---

## Design system — from the approved concept

| | Value | Where |
|---|---|---|
| Headings, 28px and up | Cormorant Garamond 500 / 600 | `src/styles/fonts.css` |
| Everything else | Manrope variable, 400–800 | `src/styles/fonts.css` |
| Verde Felce `#008C45` | graphics, rules, icons, step numerals, large display type only | `--c-verde-felce` |
| Verde Profondo `#00693A` | links, outline buttons, eyebrows, icons in text | `--c-verde-profondo` |
| Verde Chiaro `#5CC48C` | accents on the dark green only | `--c-verde-chiaro` |
| Rosso Scarlatto `#CD212A` | the "get a quote" action only, plus field errors | `--c-rosso` |
| Bianco Brillante `#F4F5F0` | section backgrounds | `--c-bianco` |
| Carbone `#1C1F1D` | body text | `--c-carbone` |
| Pietra `#5A605C` | secondary text, labels | `--c-pietra` |
| Notte Verde `#0F2A1E` / `#0B2016` | utility bar, CTA band / footer | `--c-notte`, `--c-notte-deep` |
| Spacing | 8px grid with a 4px half-step | `--s-*` in `global.css` |
| Corners | one 6px radius on buttons, fields, selects, cards, panels, the form and the language switch. The concept is square; `--radius: 0` restores that everywhere | `--radius` in `global.css` |
| Icons | Lucide, every icon 24px at a 1.5 stroke, `currentColor`; nothing else on the site sets an icon size | `src/components/Icon.astro`, `--icon-size` |
| Motion | one 180ms ease-out transition for hover, focus and press; lifts and zooms switch off under `prefers-reduced-motion` | `--dur`, `--ease` |
| Tricolore | one inline rule per eyebrow and one full-width cap on the footer; never a stripe background | `src/components/Tricolore.astro` |

**Logo.** One geometry, `src/data/logo.mjs`, drives every rendering: 16 tread
teeth and the tyre (the gear), the green rim, five spokes aligned with the
star's points, the Stella d'Italia as the hub, and a red ribbon bowed upward
across the lower teeth, with swallowtail tails, fine white rules and the full
name, CIAO ITALIAN TAXI SERVICE, in Cormorant Garamond Bold along its curve.
The name is never live text: `scripts/outline-logo-text.mjs` converts it (and
the OG card's text) to outlines in `src/data/logo-outlines.json`, using the
fonts' own kerning, so no file needs a font. Reversed (dark greens): the gear
turns Bianco, the green Verde Chiaro; star and ribbon stay.

Which reading where (the name stops reading below about 150px):

| Size | Reading | Where on the site |
|---|---|---|
| 150px and up | emblem, name on the ribbon | footer (reversed, 160px), root language gate and root 404 (160px); `LogoEmblem.astro`, an `<img>` with fixed width/height |
| header, 64px (52px on phones, 44px under 384px) | plain ribbon, no letters, inline SVG | `Logo.astro`, beside the live wordmark and tagline |
| every icon, 16-512px | **the site icon**: full colour (black gear, green wheel and spokes, red star, plain ribbon), heavier strokes | the favicon (`favicon.svg` and all three `favicon.ico` sizes, on a white rounded tile so it stays visible on dark tab strips), the iPhone/iPad home-screen icon and the manifest icons (on white) |

Since v1.3 there is one icon artwork everywhere, so the browser tab, the
phone home screen and an installed app all show the same green icon. (v1.2
used a simplified two-colour favicon that switched to a white ring in dark
browser themes; it read as "white" and is gone.)

Alt text: "Ciao Italian Taxi Service" (EN) and "Ciao Italian Taxi Service,
logo" (IT), from `content/image-alt-text.md`. The header mark is `aria-hidden`: the link's
visible wordmark already names it, and labelling the SVG too would make
screen readers announce the name twice.

`npm run icons` rebuilds everything below. `brand/` holds the masters and is
not served; `public/` is what the site serves.

| File | Artwork |
|---|---|
| `brand/logo-emblem.svg`, `logo-emblem-reversed.svg` | full emblem, name outlined |
| `brand/logo-horizontal.svg`, `logo-horizontal-it.svg` | header lockup (mark, wordmark, tagline), all outlined |
| `brand/logo-mark-plain.svg` | the mark with a plain ribbon |
| `brand/logo-usage-sheet.png` / `.pdf` / `.html` | clear space (the ribbon's depth), minimum sizes, colour versions; HTML from `scripts/make-usage-sheet.mjs` |
| `public/favicon.svg`, `public/favicon.ico` (16, 32, 48) | the site icon on a white rounded tile |
| `public/icons/apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` | the site icon on white, padded |
| `public/icons/icon-512-maskable.png` | the same inside the 80% safe zone |
| `public/images/logo.svg` | full emblem; the `logo` in `Organization` JSON-LD (same URL as before) |
| `public/images/logo-emblem-reversed.svg` | the footer emblem |
| `public/images/og-default.png` | 1200×630 Open Graph and Twitter card, text outlined in the brand fonts |
| `public/site.webmanifest` | 192, 512 and maskable icons; theme `#00693A`, background `#FFFFFF` |

Every page's `<head>` links `favicon.ico`, `favicon.svg`, the touch icon and
the manifest through `src/components/HeadIcons.astro`. The page
`<meta name="theme-color">` stays `#0F2A1E` on the site (it tints the phone
status bar over the dark utility bar), while the manifest uses `#00693A`.

### Where the build departs from the concept

Each of these is deliberate:

- **No licence or rating copy.** The concept's lockup tagline reads "Taxi · NCC
  · Transfers", and its sample copy includes "Licensed NCC drivers since
  [year]", "Autorizzazione NCC [n.]" and "[4.9] on Google / [000] verified
  reviews". None of it is used. The lockup tagline is "Private transfers ·
  Italia" / "Transfer privati · Italia" (`lockupTag` in `src/data/i18n.ts`).
- **Field borders are darker than drawn.** The concept's `#B9BDB5` is 1.9:1
  on white, and a field's border is the only thing that shows where the field
  is, so it fails WCAG 1.4.11 (3:1). It is now `#868B84`: 3.5:1 on white,
  3.2:1 on Bianco.
- **Form states use concept colours only.** The concept has no error, success
  or info styling. They are drawn as Bianco panels with a red, green or Pietra
  rule instead of introducing tinted backgrounds.
- **Copy and outline are v1's.** The footer keeps v1's headings, labels,
  "Email:" line (the "Phone:" line went in v1.2, "WhatsApp:" in v1.3) and the three city links. The concept's
  "Company / Contact / Language" columns are not used. Sub-section headings
  keep their v1 `<h2>` level and are drawn at the concept's h3 size
  (`.title-sm`).
- **The trust strip has no visible heading**, as in the concept, so the
  "Why us" eyebrow and its `<h2>` are visually hidden but stay in the outline.
  The strip sits under the hero as the concept shows. That is the only
  section-order change, and the headings and their levels are otherwise
  identical to v1.
- **The quote form stays on Contact.** The concept puts it in the home hero.
  Moving it would change page content, so the hero keeps v1's content in the
  concept's layout.
- **The full desktop header starts at 1088px (68rem), not 896px.** The
  concept's lockup is wider than v1's logo. Measured, the logo, nav and quote
  button only fit on one row from 1000px in English and 1088px in Italian, so
  at 896px both languages wrapped to a 143px header. Below 1088px the header is
  logo and Menu (v1.3: the language switch moved into the full-screen menu), and the sticky Email us / Get a quote bar
  stays on screen. That bar used to disappear at 768px, which left tablets
  with no quote action in v1. Now one of the two is visible at every width.
  As in v1, the header quote button is never shown on phones, where the sticky
  bar already carries it.
- **No Cormorant italic.** The concept sets one word of the headline in green
  italic. That needs markup inside frozen headline copy, so the italic face is
  not loaded at all, which saves 23 KB.
- **No "Privacy · Cookies" footer links**, because those pages do not exist yet.
  See *Not done*.
- **One colour outside the palette:** the amber `[[placeholder]]`
  highlight. It is an editorial marker, not design, and disappears with the
  placeholders.

### Tailwind CSS, Flowbite and Lucide

Installed for use from here on, set up so that nothing about the design
changed by adding them. Before the v1.2 restyle, the pages were screenshot
before and after adding them and compared pixel by pixel: 20 of 28 captures
identical. 7 differed by 1/255 on the hatch and shadow colours (the minifier
writes `rgb(… / .06)` as 8-digit hex). 1 differed in the anti-aliasing of the text
inside one native dropdown, with the same glyphs in the same positions.

| | Version | How it is wired |
|---|---|---|
| Tailwind CSS | 4.3.3 | `@tailwindcss/vite` in `astro.config.mjs`, which is what `astro add tailwind` sets up for Tailwind 4. Entry stylesheet: `src/styles/main.css`. |
| Flowbite | 4.0.2 | `@plugin 'flowbite/plugin'` in `main.css`. No Flowbite JavaScript is loaded anywhere yet. |
| Lucide | `@lucide/astro` 1.61.0 | `src/components/Icon.astro` imports each icon it uses, one module each. |

**`src/styles/main.css`** is the one stylesheet entry (fonts aside). The things
to know:

- **Cascade layers**, lowest first: `theme`, `base` (`global.css`),
  `components` (`components.css`), `utilities`. A utility class on an element
  therefore overrides component CSS, as Tailwind users expect.
- **Preflight is not imported.** Tailwind's reset would restyle headings, lists
  and form controls the design already styles. `global.css` is the reset.
- **Only brand values exist.** Tailwind's default colours, fonts, radii and
  shadows are removed. The theme points at the tokens in `global.css`, so a
  value is still changed in one place:
  `bg-verde-profondo`, `text-carbone`, `border-line`, `font-serif`,
  `font-sans`, `shadow-card`, `rounded-ui`, and so on. Spacing stays on
  Tailwind's 4px step, which is the site's own grid (`p-2` is `--s-2`, 8px).
  `md` (48rem) is the site's tablet step, and `nav` (68rem) is the full
  desktop header.
- **Purging.** Tailwind only emits utilities whose class names appear in
  `src/` (`source('../')`), so README text and `node_modules` never become CSS.
  It currently emits 15 small utilities picked up from ordinary words such as
  "fixed" and "block", none matching a class used on the site.
- **Flowbite** runs with `forms`, `charts`, `datatables` and `wysiwyg` off.
  Its form base styles would restyle every input and select, and the others
  are CSS for components the site doesn't use. Tooltips stay on. Flowbite's
  theme file is not imported, because it sets the sans font to Inter and
  brand colours to blue. Its semantic names (`brand`, `heading`, `body`,
  `danger`, `rounded-base`…) are mapped to the brand in `main.css`. If a
  Flowbite component needs a token that isn't mapped yet, map it to a brand
  colour there.

**When you first use an interactive Flowbite component** (dropdown, modal,
tooltip…), load only its module, only on the page that has it:

```astro
<script>
  import { initDropdowns } from 'flowbite';
  initDropdowns();
</script>
```

and add `@source '../../node_modules/flowbite';` to `main.css`, so the classes
Flowbite's JavaScript adds at runtime are generated.

**Icons.** Use `<Icon name="…" />`. The names are listed in
`src/data/icons.ts`, each mapped to one Lucide icon. To add one, import it in
`Icon.astro` from `@lucide/astro/icons/<lucide-name>` and add a name. The
select chevron and the date and time picker icons are the Lucide
`chevron-down`, `calendar` and `clock` as CSS data URIs, because the browser
draws those controls itself. Map markers use the Lucide `plane` for airports.

No indicator on the site is drawn in CSS any more: the mobile menu button
shows Lucide `menu` and `x` (swapped by its own `aria-expanded`, so the icon
and what screen readers hear always agree), the FAQ uses `chevron-down`
turned up when open, service-card lists tick with `check`, and each city
card's airport line starts with `map-pin`. Service-card icons sit on a 40px
round Bianco badge with a hairline ring; the icon inside is still 24px. The
only non-Lucide marks are the logo and the breadcrumb `/` separator, which is
typography rather than an icon.

### Photography

| Slot | Photo | Source (WebP) |
|---|---|---|
| Home hero | chauffeur opening the rear door of a black saloon | `src/assets/home/private-chauffeur-transfer-italy.webp` |
| About hero | woman in a dark blazer beside the car | `src/assets/about/italian-chauffeur-service-portrait.webp` |
| Rome card | Colosseum | `src/assets/locations/rome-private-transfer-colosseum.webp` |
| Milan card | Galleria and Duomo | `src/assets/locations/milan-private-transfer-duomo-galleria.webp` |
| Florence card | Duomo and Giotto's tower | `src/assets/locations/florence-private-transfer-duomo.webp` |
| Venice card | Piazzale Roma, Ponte della Costituzione | `src/assets/locations/venezia-transfer-piazzale-roma.webp` |
| Naples card | waterfront and Vesuvius | `src/assets/locations/naples-private-transfer-vesuvius.webp` |
| Amalfi Coast card | Positano | `src/assets/locations/amalfi-coast-private-transfer-positano.webp` |

Since v1.3 every source photo is WebP (converted from the 2.3–3.0 MB PNGs at
quality 90, now 200–510 KB each) with a descriptive, keyword-bearing file name.
The names survive into the built URLs, e.g.
`/_astro/rome-private-transfer-colosseum.HASH.webp`. The sources live in
`src/assets/`, not `public/`, because anything in `public/` is shipped
untouched. `<Picture>` from `astro:assets` serves WebP only (no JPG or PNG
fallback), resized per screen, with explicit width and height. The original
PNG of the new Venice photo is kept in `brand/reference/photo-originals/`.

Not WebP, on purpose: `public/images/og-default.png` (social networks' link
previews do not all read WebP), the PNG app icons and `favicon.ico` (formats
the platforms require), and the logo SVGs.

- **Alt text** lives in one file, `content/image-alt-text.md`: one row per
  image, English for `/en/` and Italian for `/it/`, written separately in each
  language. The build reads it (`src/data/image-alt.ts`) and **fails** if any
  image the site renders has no row or an empty cell. To change alt text, edit
  that file and rebuild.
- **Width, height and lazy loading.** Every `<img>` has `width` and `height`.
  Every image is `loading="lazy"` except the page hero (home and About), which
  is `eager` with `fetchpriority="low"` (measured: higher priority made the
  photo compete with the fonts and pushed phone LCP from 1.4s to 2.1s). The
  root language gate's logo is the one image on that page and counts as its
  hero. `npm run verify` fails on any image without alt, width or height, any
  PNG/JPG `<img>`, or more than one eager image on a page.
- **No layout shift.** Every photo sits in a box whose size is set by CSS (the
  16:9 card frame, the 560px hero slot), so nothing moves when it arrives.
- **Hero crops.** The hero slot is always 560px tall, so a 3:2 photo is
  cropped to the slot's shape. `object-position` keeps the subject in frame:
  21% horizontal on Home, centred on About. If you swap a photo, check the crop
  on a phone.
- **To add or replace a photo:** save it as WebP in `src/assets/...` with a
  descriptive name (`city-private-transfer-landmark.webp`), import it where it
  is used (`src/data/cities.ts` for city cards), and add a row for its file
  name to `content/image-alt-text.md`.

**Check these before launch:**

- **The About photo is presented as the team.** The page is "The people
  behind the wheel" and the slot's brief was "one of our drivers". If she is
  not actually one of your drivers, replace her before launch, because on a trust
  page that reads as a claim about who works for you. The alt text describes
  her without saying who she is.
- **The fleet.** Every photo shows the same Mercedes-Benz saloon. Keep them
  only if that is what you actually run.
- **Generated or real.** The set looks generated rather than photographed. The
  concept's photo direction asks for "real photo, not stock".

### Coverage map (contact page)

"Our coverage across Italy": a dark band with a full-width map centred on
Rome, pins for Rome, Milan, Florence, Venice, Naples, the Amalfi Coast,
Bologna, Pisa, Turin and Verona, plane markers for 13 airports (FCO, CIA, MXP,
LIN, BGY, FLR, PSA, BLQ, VCE, TSF, VRN, TRN, NAP), and a white overlay card
("Rome Fiumicino & Ciampino transfers", Get a quote). Places and coordinates:
`src/data/coverage.ts`. Component: `src/components/CoverageMap.astro`.

- **Leaflet + OpenStreetMap tiles**: no API key, no cookies. Leaflet is only
  downloaded when the section comes within 400px of the screen, so it adds
  nothing to the first load. The map box has a fixed height, so nothing shifts
  when it arrives.
- Scroll-wheel zoom is off (the page scrolls past the map, not into it), and
  on phones one finger scrolls the page; the + / − buttons zoom.
- The same cities and airports are in the markup as lists, for screen readers
  and for visitors without JavaScript (shown in place of the map).
- **Tiles.** OSM's public tile server is free for light use with the
  attribution shown in the corner, but its policy discourages heavy commercial
  traffic. If the site gets busy, change `TILE_URL` in `CoverageMap.astro` to a
  commercial provider (MapTiler, Stadia, Thunderforest; a free key covers a
  small site) and update `ATTRIBUTION`.

### Header and mobile menu

- **Utility bar.** The note and an "Email us" (`mailto:`) button, centred on
  phones and split left/right from 48rem. The address itself is not written
  out there; it is in the footer and on the contact page.
- **Phones and tablets (below 68rem).** One row: the logo left, Menu right. The
  lockup steps down (52px mark and 20px name; 44px and 18px under 384px) so the
  name stays on one line beside the button. Under 360px Menu shows its icon
  only, with the word kept for screen readers.
- **Full-screen menu.** Menu opens a menu that covers the whole screen, with
  the EN/IT switch and Close at the top, the four pages as large links, and
  Get a quote and Email us at the foot. Focus moves to Close and stays inside
  the menu; the page behind does not scroll; Escape or Close returns focus to
  Menu; tapping any link closes the menu at once as the page opens. The sticky
  bar is hidden while the menu is open.
- **Sticky bar.** Email us and Get a quote only.

---

## URL map

Lowercase, hyphenated slugs. Trailing slash on every page
(`trailingSlash: 'always'`, `build.format: 'directory'`).

| Page | English | Italian |
|---|---|---|
| Home | `/en/` | `/it/` |
| Locations hub | `/en/locations/` | `/it/localita/` |
| About | `/en/about/` | `/it/chi-siamo/` |
| Contact | `/en/contact/` | `/it/contatti/` |
| 404 (per language) | `/en/404/` | `/it/404/` |

Plus:

| Path | Purpose | Indexed |
|---|---|---|
| `/` | Language gate: detects browser language and redirects client-side; both languages as plain links without JS | no |
| `/404.html` | Bilingual catch-all served for unknown paths | no |
| `/en/locations/{rome,milan,florence,venice,naples,amalfi-coast}/` | City stubs | **no — see below** |
| `/it/localita/{roma,milano,firenze,venezia,napoli,costiera-amalfitana}/` | City stubs | **no — see below** |
| `/sitemap.xml` | Generated, with hreflang alternates | — |
| `/robots.txt` | Generated so the `Sitemap:` line tracks `SITE_URL` | — |

24 pages build. 8 indexable, 16 `noindex`.

### Adding a language or a page

URLs are keyed, never hardcoded. `routes` in `src/data/i18n.ts` maps a stable
page key to a localised path per language; `hreflang`, the language switch, the
nav, breadcrumbs and the sitemap all derive from it. Add a key there and the
plumbing follows.

City slugs differ per language (`florence` / `firenze`) and live on each city in
`src/data/cities.ts`.

---

## Project structure

```
content/
  image-alt-text.md   alt text for every image, EN and IT (read by the build)
src/
  assets/             source photos, WebP, descriptive names
  data/
    site.mjs          business details + SITE_URL + FORM_ENDPOINT — all placeholders live here
    i18n.ts           routes, nav order, UI chrome strings, x-default choice
    seo.ts            per-page title/description/H1, canonical + hreflang helpers, CITY_PAGES_INDEXABLE
    schema.ts         JSON-LD builders (placeholder-aware)
    cities.ts         the six areas, per-language slugs, names, card text and photos
    coverage.ts       cities and airports on the contact-page map
    image-alt.ts      reads content/image-alt-text.md; fails the build on a missing row
    logo.mjs          the logo geometry (header mark, masters, icons)
    icons.ts          the icon names, shared by Icon.astro and the content files
    content/
      en.ts           English page copy
      it.ts           Italian page copy — written natively, NOT a translation
      index.ts        typed so neither language can lose a key
  layouts/Base.astro  <head>, SEO, JSON-LD graph, header/footer/mobile bar
  components/
    Header, Footer, LangSwitch, MobileBar, Breadcrumbs, CtaBand, QuoteForm,
    Seo, Logo (inline mark), LogoEmblem (emblem image), HeadIcons, Icon (Lucide),
    HeroPhoto, Tricolore, Placeholders, CoverageMap (Leaflet, contact page)
    sections/         HomeBody, LocationsBody, AboutBody, ContactBody,
                      CityStubBody, NotFoundBody — one per page type, lang-driven
  pages/              thin: each sets SEO props and renders a section body
  styles/             main.css (Tailwind + Flowbite entry), fonts.css,
                      global.css (tokens + base), components.css
scripts/
  copy-fonts.mjs      re-copy the three latin woff2 files from @fontsource, prune stale ones
  outline-logo-text.mjs  logo and OG lettering to outlines (logo-outlines.json)
  make-icons.mjs      masters, favicons, app icons, manifest and OG image from the logo geometry
  make-usage-sheet.mjs   brand/logo-usage-sheet.html
  verify-seo.mjs      post-build audit (see below)
brand/                logo masters and the usage sheet (not served); reference/ holds
                      the logo brief, its reference images and photo originals
public/
  favicon.svg, favicon.ico, site.webmanifest, icons/, images/, fonts/
```

**Why page files are thin.** Each language's page file only declares SEO
metadata and renders a shared section component with a `lang` prop. The
*template* is shared; the *copy* is not — it comes from `content/en.ts` or
`content/it.ts`. So layout changes happen once, and the two languages' wording
can never accidentally converge.

`content/index.ts` types `it` against `typeof en`, so a missing key in either
language is a type error, not a blank space on the page. That is a structural
guarantee only — it does **not** mean the copy is parallel, and it should not
become parallel.

---

## SEO decisions, and why

**Self-referencing canonicals** on all 22 real URLs. Two deliberate exceptions:

- `/404.html` has **no canonical**. It is served for arbitrary unknown URLs, so
  a canonical here would tell crawlers that `/404.html` is the canonical version
  of whatever the visitor actually requested.
- `/` has a self-canonical but **no hreflang**.

**hreflang** — `en`, `it` and one `x-default` per page, reciprocal, including a
self-reference. Emitted in `<head>` *and* as `xhtml:link` alternates in
`sitemap.xml`.

`x-default` points at the **English** URL, not at `/`. The textbook target for
`x-default` is a language selector, and `/` is one — but `/` is `noindex` and
redirects, and advertising a noindex page as `x-default` means search engines
ignore it. Set via `X_DEFAULT_LANG` in `src/data/i18n.ts` if you disagree.

The language gate carries no hreflang at all. hreflang must be reciprocal, and
`/en/` and `/it/` point at each other; one-way links from `/` would invalidate
the whole cluster. The gate's body links and the sitemap handle discovery.

**The language switch links to the matching page in the other language**, not to
the homepage — `/en/about/` ↔ `/it/chi-siamo/`, derived from the same `routes`
map as hreflang, so the two cannot disagree.

**Titles ≤ 60 chars, descriptions ≤ 155**, unique per page per language, with
one `<h1>` each and no skipped heading levels. All machine-checked.

**JSON-LD** — one `@graph` per page carrying `Organization`, `LocalBusiness`,
`WebSite`, `BreadcrumbList` (where there is a breadcrumb trail), and `FAQPage`
on the two homepages only, because they are the only pages with a real FAQ.

Three rules enforced in `src/data/schema.ts`:

1. No licence, permit or authorisation properties.
2. No `aggregateRating`, `review`, `ratingValue` or `priceRange` — the site
   publishes no ratings and no prices, so claiming them in markup would be
   fabrication.
3. Any field still holding a `[[PLACEHOLDER]]` is **omitted**, not emitted. The
   markup is valid now and fills itself in as `site.mjs` gets real values. This
   covers `email`, the email `contactPoint`, `address`, `geo`,
   `vatID` and `sameAs`. There is no `telephone`: the site takes no calls.

**`BreadcrumbList` is generated from the same array that renders the visible
breadcrumbs**, so markup and page can't drift.

**Breadcrumbs are omitted on the homepages**, where a single-item trail adds
nothing.

**`robots.txt` disallows nothing.** Pages that should stay out of the index say
so with a `robots` meta tag, which is the only directive that reliably keeps a
URL out. Disallowing them in `robots.txt` would stop crawlers reading that tag.

**City stubs.** `noindex, follow` and excluded from the sitemap — a URL must
never be both `noindex` and in the sitemap. One flag,
`CITY_PAGES_INDEXABLE` in `src/data/seo.ts`, drives both, so they cannot
disagree. `follow` is kept so internal links still flow back to the hub.

### `npm run verify`

`scripts/verify-seo.mjs` audits `./dist` and exits non-zero on failure, so it
can gate a deploy. It checks title and description lengths and uniqueness,
exactly one `<h1>` and no skipped heading levels, self-referencing canonicals,
hreflang reciprocity and exactly one `x-default`, JSON-LD parsing plus the three
rules above, no `noindex` URL in the sitemap and no sitemap URL that was not
built, an absolute `Sitemap:` line, the licence-wording ban, and the booking
rules: no `tel:` link, no `telephone` in JSON-LD, and no WhatsApp anywhere. It
also checks every image: alt, width and height present, no PNG/JPG, and at
most one eager (hero) image per page.

It found seven real defects on first run, including a 63-character 404 title, a
156-character Italian description and a non-reciprocal hreflang set on the
language gate. Run it after any content edit.

---

## Accessibility

Targeting WCAG 2.1 AA.

Contrast shaped how the palette is used. Every text pairing in use, measured:

| Pairing | Ratio | Needs |
|---|---|---|
| Carbone `#1C1F1D` on white / Bianco | 16.63 / 15.17 | 4.5 |
| Pietra `#5A605C` on white / Bianco | 6.44 / 5.87 | 4.5 |
| Verde Profondo `#00693A` on white / Bianco | 6.81 / 6.22 | 4.5 |
| White on Rosso `#CD212A` (hover `#9E1A21`) | 5.46 (8.00) | 4.5 |
| Rosso error text on white / Bianco | 5.46 / 4.98 | 4.5 |
| Bianco on Notte `#0F2A1E` | 13.99 | 4.5 |
| Verde Chiaro `#5CC48C` on Notte | 7.10 | 4.5 |
| Footer text `#C9D3CC` on `#0B2016` | 11.09 | 4.5 |
| Field border `#868B84` on white / Bianco | 3.48 / 3.17 | 3.0 |
| Field border on hover (Pietra) / focus (Verde Profondo) | 6.44 / 6.81 | 3.0 |
| Focus ring, Verde Felce on white / Bianco | 4.34 / 3.96 | 3.0 |
| Focus ring, Verde Chiaro on Notte / footer | 7.10 / 7.89 | 3.0 |
| Verde Felce `#008C45` on white — graphics, 44px numerals | 4.34 | 3.0 |

**Do not** use `#008C45` for body-size text. At 4.34:1 it fails AA there,
which is why the concept keeps it for graphics and large type.

**Reflow (1.4.10).** Measured in Chrome: no page has horizontal overflow at 320,
360, 375, 390, 414, 768, 896, 1024, 1087, 1088, 1280, 1440 or 1920px, in either
language (169 page and width combinations).
The routes table scrolls inside its own container on small screens.

Also in place: a skip link; `aria-current="page"` in the nav and on breadcrumbs;
a real `<button>` with `aria-expanded` for the mobile nav (not a checkbox hack),
closing on Escape with focus returned; native `<details>`/`<summary>` for the
FAQ so it needs no JavaScript; 48px minimum touch targets; visible 3px focus
rings in the flag green (the light green on the dark bands); `prefers-reduced-motion` honoured; the form's error summary is
`role="alert"`, focused on failed submit, with links to each bad field and
`aria-invalid` on the inputs; in every row of the quote form the inputs start on
the same line whatever the label length, including when an error shows, via
CSS subgrid. Checked in both languages at four widths, with and without errors;
the full-screen menu keeps focus inside itself while open and returns it to
Menu on close; the coverage map's places are also listed as text; decorative SVG is `aria-hidden`; the decorative
tricolour and placeholder frames carry no meaning that text does not also carry.

**Measured:** Lighthouse accessibility 100 on every page tested (Lighthouse
runs axe-core). **Not verified:** no screen-reader pass with NVDA or VoiceOver.

## Performance

Static HTML, one CSS bundle (37.5 KB, 7.7 KB gzipped; Tailwind and Flowbite
added 2.4 KB gzipped) and **about 2.4 KB of inlined JavaScript**
across the whole site, in three scripts: mobile nav, form validation and the
language gate. There is no framework runtime, no third-party script, no cookie
banner and no analytics yet. The whole `dist` is about 13 MB, but 11.5 MB of
that is the 114 photo variants. A page only downloads the one variant per photo
that fits the screen.

Fonts are self-hosted, latin subset only: three woff2 files totalling 70 KB
(Cormorant Garamond 500 and 600, Manrope variable). Only the weights the concept
uses are loaded. All three are preloaded with `font-display: swap`, so the swap
happens before first paint on a normal connection.

**Measured (Lighthouse 12.6, median of five runs, production build served
gzipped as a host would, v1.1 and v1.2 runs alternated so machine load hits
both equally):**

| Page | v1.1 LCP | v1.2 Perf | A11y | Best pr. | SEO | v1.2 LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/en/` mobile | 1.44 s | 100 | 100 | 100 | 100 | 1.44 s | 0 |
| `/en/contact/` mobile | 1.36 s | 100 | 100 | 100 | 100 | 1.36 s | ≤ 0.0004 over 10 runs (v1.1: 0.027 on 1 run in 5) |
| `/en/locations/` mobile | 1.51 s | 100 | 100 | 100 | 100 | 1.51 s | 0 |
| `/en/` desktop | 0.33 s | 100 | 100 | 100 | 100 | 0.33 s | 0 |

Earlier v1.2 runs also scored 99–100 on `/it/`, `/it/contatti/` and
`/it/chi-siamo/` (mobile and desktop). Locally, without compression,
LCP reads about 0.2s higher on both versions, so compare like with like.

**No layout shift from the fonts or logo**, now in every case, not just when
the fonts win the race. Until v1.2, if Cormorant Garamond arrived after first
paint, the header wordmark, set meanwhile in Georgia (much wider, especially at
600), wrapped onto two lines on 320 and 390px phones. The page then jumped
21–26px when the font swapped in. Lighthouse caught it on about one run in five
(CLS 0.027). `fonts.css` now has a metric-matched fallback: Georgia scaled with
`size-adjust` to Cormorant's measured width (89.5% at 500, 77.4% at 600), so
lines break in the same places in both. Manrope needs none: it's within 2% of
Segoe UI and Arial. Checked deterministically: with fonts blocked against
loaded, `<main>` sits in exactly the same place on 8 pages at 7 widths. The logo
and every icon also carry intrinsic `width`/`height`.

Watch this when the last placeholder lands:

- The coverage map's tiles come from openstreetmap.org once a visitor scrolls
  to it. Leaflet loads only then, so the first paint is unaffected.

---

## Placeholders to fill in

Every placeholder is `[[LIKE THIS]]`, highlighted in yellow on the rendered page
(`src/components/Placeholders.astro`) so none can ship unnoticed. Find them all
with:

```bash
grep -rn '\[\[' src/
```

### Blocking — the site should not go live with these

| Placeholder | File | Notes |
|---|---|---|
| `SITE_URL` | `src/data/site.mjs` | Currently `https://www.ciaoitaliantaxiservice.com`. **Drives every canonical, hreflang and sitemap URL.** Wrong here = wrong everywhere. |
| `FORM_ENDPOINT` | `src/data/site.mjs` | Empty. The form validates, then shows a notice pointing at email rather than silently dropping the enquiry. Set it to a Formspree/Basin URL, a Netlify function or your own handler. |
| `[[hello@example.com]]` | `src/data/site.mjs` | |
| `[[REGISTERED COMPANY NAME]]`, `[[VAT / P.IVA]]` | `src/data/site.mjs` | Footer and `Organization.vatID`. Legally required in Italy. |

### Content

| Placeholder | File |
|---|---|
| `[[PRICE]]` ×6, `[[TARIFFA]]` ×6 — route tables | `content/en.ts`, `content/it.ts` |
| `[[FOUNDER NAME]]` / `[[NOME DEL FONDATORE]]`, `[[NUMBER]]` / `[[NUMERO]]`, `[[CITIES]]` / `[[CITTÀ]]`, `[[REGIONS]]` / `[[REGIONI]]`, `[[YEAR]]` / `[[ANNO]]` | About story + trust table |
| `[[OTHER LANGUAGES]]` / `[[ALTRE LINGUE]]`, `[[CITY, COUNTRY]]` / `[[CITTÀ, PAESE]]` | About trust table |
| `[[INTERVAL]]` / `[[INTERVALLO]]`, `[[DESCRIBE THE VETTING STEPS YOU ACTUALLY PERFORM]]` / `[[DESCRIVERE LE VERIFICHE EFFETTIVAMENTE SVOLTE]]` | About — driver vetting |
| `[[CONFIRM ACCEPTED PAYMENT METHODS AND DEPOSIT POLICY]]` / `[[CONFERMARE METODI DI PAGAMENTO E POLITICA DI ACCONTO]]` | Home FAQ. **This answer also goes into `FAQPage` JSON-LD** — fill it before submitting the site for rich results. |
| `[[RESPONSE TIME]]` / `[[TEMPO DI RISPOSTA]]` | Contact (opening hours are no longer a placeholder: 24/7) |
| `[[EMBED A MAP…]]` / `[[INSERIRE UNA MAPPA…]]` | Contact — or delete the section if there is no public office |
| Street, city, region, postcode, `[[LAT]]`, `[[LNG]]` | `src/data/site.mjs` — address and geo are suppressed from `LocalBusiness` until complete |
| `site.social` | `src/data/site.mjs` — empty strings are skipped in `sameAs` |
| `[[ADD twitter:site …]]` | `src/components/Seo.astro` |

`site.hours` is 24/7 (confirmed in the v1.3 brief) and feeds
`LocalBusiness.openingHoursSpecification` and the email `contactPoint`'s
`hoursAvailable`.

---

## Host configuration needed

**Root redirect.** `/` detects the browser language in a blocking inline script
and redirects, with both languages as links for anyone without JS. A static
build cannot issue a real 302. **Prefer a server-side redirect** on `/` keyed
off `Accept-Language` — it removes the client-side hop. Keep the gate as the
no-JS fallback.

**404 handling.** `/404.html` is the bilingual catch-all most static hosts serve
for any unknown path. `/en/404/` and `/it/404/` are per-language versions. If
your host can route by path prefix, serve those for `/en/*` and `/it/*` misses
and keep `/404.html` as the fallback — otherwise the per-language pages exist
but are only reachable directly. Both return the host's status code; make sure
that is a real **404**, not a 200.

**Trailing slashes.** The build emits directory-style URLs. Configure the host
to redirect `/en/about` → `/en/about/` with a 301, and do not let it also
redirect the other way, or you get a loop.

---

## Not done

Stated plainly so nothing here reads as verified when it is not.

- **No screen-reader pass.** Automated accessibility checks only (see
  *Accessibility*).
- **No form backend.** By design for v1; see `FORM_ENDPOINT`.
- **No city page content.** Twelve stubs, `noindex`. See `KEYWORD-MAP.md` for
  what each needs before the flag flips.
- **No legal pages.** An Italian business site handling personal data through a
  form needs a privacy policy and cookie notice before launch. Not in the brief's
  scope, but it blocks go-live. The form already asks for explicit consent.
- **No keyword volume data.** `KEYWORD-MAP.md` is built on live SERP sampling,
  not licensed metrics, and says so.
- **Italian copy has not been reviewed by a native speaker.** It is written as
  Italian rather than translated, with its own structure and its own FAQs
  (ZTL, fattura elettronica, bagagli) — but have a native speaker read it.

## Deliverables

- Working code — this repo.
- `KEYWORD-MAP.md` — one primary cluster per page per language, city-page
  reservations, cannibalisation guard.
- This README — structure, URL map, SEO decisions, every placeholder.
