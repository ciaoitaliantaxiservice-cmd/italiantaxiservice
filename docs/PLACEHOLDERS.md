# Placeholders

Every `[[TYPE:ID]]` still on the site (see `docs/seo-site-expansion-playbook.md` §7).
The same ID is used in EN and IT, so one fix fills both. Delete a row when
it is filled.

Find them in the built site with
`grep -o 'data-placeholder="[^"]*"' -r dist | sort -u`, and in the source
with `grep -rn "PLACEHOLDER(" src`.

## Homepage: "Where We Serve" / "Dove operiamo"

Pages: `/en/` and `/it/`.

| ID | Type | What's needed | Where to fill it | Status |
|---|---|---|---|---|
| stat-1 | TEXT | Number of cities and areas served, e.g. "10+" | `home.areas.stats` in `src/data/content/en.ts` and `it.ts` | open |
| stat-2 | TEXT | Number of airports covered | same | open |
| stat-3 | TEXT | Years of service | same | open |
| city-rome | IMG | Rome: the Colosseum in evening light | `photo` in `src/data/service-areas.ts` | open |
| city-milan | IMG | Milan: the Duomo spires | same | open |
| city-florence | IMG | Florence: rooftops and Brunelleschi’s dome | same | open |
| city-venice | IMG | Venice: the Grand Canal | same | open |
| city-naples | IMG | Naples: the bay with Vesuvius | same | open |
| city-amalfi-coast | IMG | Positano on the Amalfi Coast | same | open |
| city-lake-como | IMG | Bellagio lakefront on Lake Como | same | open |
| city-pisa | IMG | The Leaning Tower, Piazza dei Miracoli | same | open |
| city-bologna | IMG | Bologna’s Two Towers | same | open |
| city-verona | IMG | The Arena, Piazza Bra | same | open |

**City photo spec:** portrait 4:5 crop (at least 960×1200), WebP, with the
subject centred, because a dark overlay and the city name sit over the middle.
Each photo's alt text (EN and IT) is already written in
`content/image-alt-text.md`; choose a photo that matches it, or update the row.
Put the file in `src/assets/` under the key from that table, for example
`rome-service-area-colosseum.webp`.

## Homepage: "Vehicle types" / "La nostra flotta"

Pages: `/en/` and `/it/`. All values go in `src/data/fleet.ts`. Prices and
capacities are never added to the JSON-LD.

| ID | Type | What's needed | Status |
|---|---|---|---|
| vehicle-s-class | IMG | Photo of the Mercedes-Benz S-Class | open |
| s-class-pax | VEHICLE | Maximum passengers | open |
| s-class-bags | VEHICLE | Large suitcases | open |
| s-class-from | PRICE | One-way "from" price, EUR | open |
| vehicle-e-class | IMG | Photo of the Mercedes-Benz E-Class | open |
| e-class-pax | VEHICLE | Maximum passengers | open |
| e-class-bags | VEHICLE | Large suitcases | open |
| e-class-from | PRICE | One-way "from" price, EUR | open |
| vehicle-a-class | IMG | Photo of the Mercedes-Benz A-Class | open |
| a-class-pax | VEHICLE | Maximum passengers | open |
| a-class-bags | VEHICLE | Large suitcases | open |
| a-class-from | PRICE | One-way "from" price, EUR | open |
| vehicle-5-series | IMG | Photo of the BMW 5 Series | open |
| 5-series-pax | VEHICLE | Maximum passengers | open |
| 5-series-bags | VEHICLE | Large suitcases | open |
| 5-series-from | PRICE | One-way "from" price, EUR | open |

**Vehicle photo spec:** landscape 4:3 (at least 1200×900), WebP. Use the
actual car (or the same model and colour), front three-quarter view, with a
clean background. The alt text in `content/image-alt-text.md` assumes a black
car, so change it if the car is another colour.

**Adding a van later (e.g. V-Class):** add one entry to `fleet` in
`src/data/fleet.ts` with `categories: ['groups', 'events']`. The tabs, the
slides and the form's "Preferred vehicle" list update from that.

## Location pages linked from the homepage but not built yet

The "Where We Serve" cards link to these on purpose, ahead of the pages, so
they return 404 until built. Build each one per the playbook (EN and IT
together).

| Area | EN | IT | Status |
|---|---|---|---|
| Lake Como | `/en/locations/lake-como/` | `/it/localita/lago-di-como/` | missing (404) |
| Pisa | `/en/locations/pisa/` | `/it/localita/pisa/` | missing (404) |
| Bologna | `/en/locations/bologna/` | `/it/localita/bologna/` | missing (404) |
| Verona | `/en/locations/verona/` | `/it/localita/verona/` | missing (404) |

These exist only as thin noindex stubs. They are not missing, but they still
need the full playbook build:

| Area | EN | IT | Status |
|---|---|---|---|
| Rome | `/en/locations/rome/` | `/it/localita/roma/` | stub (noindex) |
| Milan | `/en/locations/milan/` | `/it/localita/milano/` | stub (noindex) |
| Florence | `/en/locations/florence/` | `/it/localita/firenze/` | stub (noindex) |
| Venice | `/en/locations/venice/` | `/it/localita/venezia/` | stub (noindex) |
| Naples | `/en/locations/naples/` | `/it/localita/napoli/` | stub (noindex) |
| Amalfi Coast | `/en/locations/amalfi-coast/` | `/it/localita/costiera-amalfitana/` | stub (noindex) |
