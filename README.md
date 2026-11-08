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
npm run icons      # regenerate favicon, app icons, logo.svg and the OG image
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

**3. Booking is WhatsApp, email and the quote form. There is no phone.**
v1.2 removed every Call button, `tel:` link and phone number. Each
place that offered a call now offers WhatsApp or email instead: the hero,
the utility bar above the header, the dark CTA band, the sticky mobile bar
(WhatsApp, Email, Quote), the contact page (form, then WhatsApp, then email)
and the footer. JSON-LD carries no `telephone`; the Organization lists WhatsApp
and email as `contactPoint`s. Every WhatsApp link opens in a new tab with
`rel="noopener noreferrer"`. `npm run verify` fails the build on any `tel:` link,
any `telephone` in JSON-LD, or a WhatsApp link that does not open safely in a
new tab.

Two pieces of copy said "phone" and had to change with it; everything else
is word-for-word as before (checked by diffing the builds):

| Where | Was | Now |
|---|---|---|
| Contact meta description (EN), and its OG/Twitter copies | Reach us **by phone, WhatsApp** or email | Reach us **on WhatsApp or by** email |
| Contact meta description (IT), and its OG/Twitter copies | Ci trovate **al telefono, su WhatsApp** o via email | Ci trovate **su WhatsApp** o via email |
| Contact intro (EN) | the **phone and WhatsApp** details below | the **WhatsApp and email** details below |
| Contact intro (IT) | Se preferite parlarne **a voce, telefono e WhatsApp** qui sotto | Se preferite parlarne **direttamente, WhatsApp ed email** qui sotto |

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

**Logo.** `src/components/Logo.astro` carries the concept's geometry exactly:
16 tread teeth, the tyre, the rim, five spokes aligned with the star's points,
the Stella d'Italia as the hub and the red ribbon. It has four forms: the full
emblem, the icon (the concept drops the ribbon below 120px), and a reversed
version of each for dark green, which the footer uses. `npm run icons`
(`scripts/make-icons.mjs`) builds the static files from the same geometry,
following the concept's simplification at small sizes:

| File | Artwork |
|---|---|
| `public/favicon.svg`, `public/icons/icon-32.png` | ring + star (the concept's 24px reading) |
| `public/icons/apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` | wheel + spokes + star on white, no teeth |
| `public/images/logo.svg` | full emblem; the `logo` in `Organization` JSON-LD |
| `public/images/og-default.png` | 1200×630 Open Graph and Twitter card |
| `public/site.webmanifest` | references the 192 and 512 icons |

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
  "WhatsApp: / Email:" lines (the "Phone:" line went in v1.2) and the three city links. The concept's
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
  logo, language switch and Menu, and the sticky Call / WhatsApp / Quote bar
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
draws those controls itself. Lucide has no brand logos, so WhatsApp uses its
`message-circle`, which keeps the same stroke style as every other icon.

No indicator on the site is drawn in CSS any more: the mobile menu button
shows Lucide `menu` and `x` (swapped by its own `aria-expanded`, so the icon
and what screen readers hear always agree), the FAQ uses `chevron-down`
turned up when open, service-card lists tick with `check`, and each city
card's airport line starts with `map-pin`. Service-card icons sit on a 40px
round Bianco badge with a hairline ring; the icon inside is still 24px. The
only non-Lucide marks are the logo and the breadcrumb `/` separator, which is
typography rather than an icon.

### Photography

| Slot | Photo | Source |
|---|---|---|
| Home hero | chauffeur opening the rear door of a black saloon | `src/assets/home/hero.png` |
| About hero | woman in a dark blazer beside the car | `src/assets/about/portrait.png` |
| Locations cards | Rome, Milan, Florence, Naples, Amalfi Coast | `src/assets/locations/*.png` |
| Venice card | **placeholder kept on purpose**, see below | `src/assets/locations/venice.png` (unused) |

The sources are 2.3–3.0 MB PNGs. They live in `src/assets/`, not `public/`,
because anything in `public/` is shipped untouched. `<Picture>` from
`astro:assets` builds AVIF and WebP with a JPG fallback and explicit width and
height. A visitor downloads one file per photo, sized to their screen: a
desktop city card is about 15–65 KB and the home hero about 40–85 KB.

- **No layout shift.** Every photo sits in a box whose size is set by CSS (the
  16:9 card frame, the 560px hero slot), so nothing moves when it arrives.
  Measured CLS stays at 0.
- **Hero crops.** The hero slot is always 560px tall, so a 3:2 photo is
  cropped to the slot's shape. `object-position` keeps the subject in frame:
  21% horizontal on Home (the chauffeur stands left of centre), centred on
  About. Checked at 390, 1024 and 1440px. If you swap a photo, check the crop
  on a phone.
- **Loading** is measured, not guessed. Above-the-fold photos are
  `loading="eager"` with `fetchpriority="low"`. On desktop they are the LCP
  element, so they must be found at parse time. On phones they sit below the
  fold and the LCP is the headline, and higher priority made them compete with
  the fonts: `fetchpriority="high"` pushed phone LCP from 1.4s to 2.1s. Lower
  city cards are lazy. The numbers are in `src/components/HeroPhoto.astro`
  and `LocationsBody.astro`.
- **Alt text** describes what is in the frame, written separately in each
  language: `src/data/cities.ts` for the cards, and the section components for
  the two heroes.
- **To add or replace a city photo:** put a 16:9 image in
  `src/assets/locations/` and give that city a `photo` entry (image import
  plus alt text in both languages) in `src/data/cities.ts`.

**Check these before launch:**

- **Venice is deliberately not shown.** That photo has the car parked on the
  Grand Canal promenade by the Salute, where no car can go, and the Venice card
  right next to it says road transfers end at Piazzale Roma or the Tronchetto.
  It would contradict the copy, and to an Italian visitor it would look like
  the business does not know Venice. A Piazzale Roma handover shot would fit.
  To use the current one anyway, see the note at the top of `src/data/cities.ts`.
- **The About photo is presented as the team.** The page is "The people
  behind the wheel" and the slot's brief was "one of our drivers". If she is
  not actually one of your drivers, replace her before launch, because on a trust
  page that reads as a claim about who works for you. The alt text describes
  her without saying who she is.
- **The fleet.** Florence, Venice, Naples and Amalfi show the Mercedes-Benz
  badge clearly, and every photo shows the same car. Keep them only if that is
  what you actually run.
- **Generated or real.** The set looks generated rather than photographed. The
  concept's photo direction asks for "real photo, not stock".

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
src/
  data/
    site.mjs          business details + SITE_URL + FORM_ENDPOINT — all placeholders live here
    i18n.ts           routes, nav order, UI chrome strings, x-default choice
    seo.ts            per-page title/description/H1, canonical + hreflang helpers, CITY_PAGES_INDEXABLE
    schema.ts         JSON-LD builders (placeholder-aware)
    cities.ts         the six areas, per-language slugs, names and card text
    icons.ts          the icon names, shared by Icon.astro and the content files
    content/
      en.ts           English page copy
      it.ts           Italian page copy — written natively, NOT a translation
      index.ts        typed so neither language can lose a key
  layouts/Base.astro  <head>, SEO, JSON-LD graph, header/footer/mobile bar
  components/
    Header, Footer, LangSwitch, MobileBar, Breadcrumbs, CtaBand, QuoteForm,
    Seo, Logo, Icon (Lucide), HeroPhoto, Tricolore, Placeholders
    sections/         HomeBody, LocationsBody, AboutBody, ContactBody,
                      CityStubBody, NotFoundBody — one per page type, lang-driven
  pages/              thin: each sets SEO props and renders a section body
  styles/             main.css (Tailwind + Flowbite entry), fonts.css,
                      global.css (tokens + base), components.css
scripts/
  copy-fonts.mjs      re-copy the three latin woff2 files from @fontsource, prune stale ones
  make-icons.mjs      favicon, app icons, logo.svg and OG image from the logo geometry
  verify-seo.mjs      post-build audit (see below)
public/
  favicon.svg, site.webmanifest, icons/, images/, fonts/
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
   covers `email`, the WhatsApp and email `contactPoint`s, `address`, `geo`,
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
rules: no `tel:` link, no `telephone` in JSON-LD, and every WhatsApp link opening
in a new tab with `rel="noopener"`.

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
the WhatsApp links carry "(opens in a new tab)" for screen readers (the hero
button as its `aria-label`, which contains the visible "WhatsApp" as WCAG 2.5.3
requires); decorative SVG is `aria-hidden`; the decorative
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

- The contact map placeholder becomes a third-party iframe. Lazy-load it, or
  better, swap in a static image that links out.

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
| `FORM_ENDPOINT` | `src/data/site.mjs` | Empty. The form validates, then shows a notice pointing at WhatsApp/email rather than silently dropping the enquiry. Set it to a Formspree/Basin URL, a Netlify function or your own handler. |
| `[[WHATSAPP_NUMBER]]` (`whatsappNumber`) | `src/data/site.mjs` | Digits only, international, no "+" or spaces (e.g. `393331234567`). Builds every `https://wa.me/…` link and the WhatsApp `contactPoint`. |
| `[[WHATSAPP_NUMBER]]` (`whatsappDisplay`) | `src/data/site.mjs` | The same number as shown on the page (e.g. `+39 333 123 4567`): footer and contact page. |
| `[[hello@example.com]]` | `src/data/site.mjs` | |
| `[[REGISTERED COMPANY NAME]]`, `[[VAT / P.IVA]]` | `src/data/site.mjs` | Footer and `Organization.vatID`. Legally required in Italy. |
| `public/images/og-default.png` | `scripts/make-icons.mjs` | Generated from the logo, and correct in size and format, but the wordmark is set in a system serif because the brand fonts are not installed where the rasteriser runs. Have a designer export the final card at 1200×630 and drop it in at the same path. |

### Content

| Placeholder | File |
|---|---|
| `[[PRICE]]` ×6, `[[TARIFFA]]` ×6 — route tables | `content/en.ts`, `content/it.ts` |
| `[[FOUNDER NAME]]` / `[[NOME DEL FONDATORE]]`, `[[NUMBER]]` / `[[NUMERO]]`, `[[CITIES]]` / `[[CITTÀ]]`, `[[REGIONS]]` / `[[REGIONI]]`, `[[YEAR]]` / `[[ANNO]]` | About story + trust table |
| `[[OTHER LANGUAGES]]` / `[[ALTRE LINGUE]]`, `[[CITY, COUNTRY]]` / `[[CITTÀ, PAESE]]` | About trust table |
| `[[INTERVAL]]` / `[[INTERVALLO]]`, `[[DESCRIBE THE VETTING STEPS YOU ACTUALLY PERFORM]]` / `[[DESCRIVERE LE VERIFICHE EFFETTIVAMENTE SVOLTE]]` | About — driver vetting |
| `[[CONFIRM ACCEPTED PAYMENT METHODS AND DEPOSIT POLICY]]` / `[[CONFERMARE METODI DI PAGAMENTO E POLITICA DI ACCONTO]]` | Home FAQ. **This answer also goes into `FAQPage` JSON-LD** — fill it before submitting the site for rich results. |
| `[[RESPONSE TIME]]` / `[[TEMPO DI RISPOSTA]]`, `[[OPENING HOURS]]` / `[[ORARI]]` | Contact |
| `[[EMBED A MAP…]]` / `[[INSERIRE UNA MAPPA…]]` | Contact — or delete the section if there is no public office |
| Street, city, region, postcode, `[[LAT]]`, `[[LNG]]` | `src/data/site.mjs` — address and geo are suppressed from `LocalBusiness` until complete |
| `site.social` | `src/data/site.mjs` — empty strings are skipped in `sameAs` |
| `[[ADD twitter:site …]]` | `src/components/Seo.astro` |
| Venice card photo | Placeholder kept deliberately; see *Photography → Check these before launch* |

`site.hours` assumes 24/7 dispatch and feeds
`LocalBusiness.openingHoursSpecification`. **Confirm or change it** — it is an
assumption presented as fact, not a bracketed placeholder.

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
