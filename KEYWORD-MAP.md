# Keyword map — Ciao Italian Taxi Service

One primary cluster per page per language. No cluster is targeted twice, in either
language, which is what keeps the EN and IT trees from competing with each other
or with themselves.

**How this was built.** Live SERP sampling (Nov 2026) across EN and IT for airport
transfer, city-to-city, private-driver and price-intent queries covering Rome,
Milan, Florence, Venice, Naples and the Amalfi Coast. Volumes are not listed —
no keyword tool was licensed for this build, and inventing numbers would make
the map look more certain than it is. Priority below is a judgement call from
observed SERP composition and commercial intent, not a metric.

**Constraint applied throughout:** no licence or permit terminology. In Italian
this is a live risk, because the highest-volume commercial term in the market is
literally a licence category (`NCC` / *noleggio con conducente*). Every Italian
cluster below is therefore built on `transfer privato`, `auto con autista` and
`servizio con autista`. `scripts/verify-seo.mjs` fails the build if `NCC` or any
licence wording reaches rendered copy.

---

## English

### `/en/` — Home
**Primary cluster:** private transfers Italy / Italy chauffeur service

| Role | Query |
|---|---|
| Head | private transfer italy |
| Head | italy chauffeur service |
| Supporting | private driver italy airport |
| Supporting | italy airport transfer private car |
| Supporting | chauffeured car service italy |
| Long tail | fixed price transfer italy no meter |
| Long tail | english speaking driver italy transfer |

**On-page:** H1 names the service and the country. The services section splits
into the three intents (airport / city-to-city / driver day) so the page can rank
for the head term while funnelling each intent onward. FAQ targets the
question-shaped SERP features seen on these queries.
**Priority:** high.

### `/en/locations/` — Locations hub
**Primary cluster:** Italy transfer destinations / which cities covered

| Role | Query |
|---|---|
| Head | italy transfer destinations |
| Head | airport transfers italy cities |
| Supporting | transfer service rome milan florence venice |
| Supporting | italy private transfer coverage areas |
| Long tail | do private transfers cover the amalfi coast |

**On-page:** the hub's job is routing, not ranking for city head terms — those
belong to the city pages. Each card carries unique text and names the airports,
ports and stations for that area, which is the distinguishing content.
**Priority:** medium. Becomes high once the city pages are live and this page is
the internal-link spine.

### `/en/about/` — About
**Primary cluster:** brand and trust ("is X legitimate")

| Role | Query |
|---|---|
| Head | ciao italian taxi service |
| Head | ciao italian taxi service reviews |
| Supporting | is this italy transfer company reliable |
| Supporting | who are the drivers italy transfer |
| Long tail | italy private transfer company vetting drivers |

**On-page:** brand-defence page. Deliberately carries no rating markup and no
review claims; the trust table is factual placeholders only.
**Priority:** low for traffic, high for conversion — it is the page people open
before paying.

### `/en/contact/` — Contact
**Primary cluster:** transactional — get a quote / book a driver

| Role | Query |
|---|---|
| Head | italy transfer quote |
| Head | book private driver italy |
| Supporting | italy airport transfer booking |
| Supporting | request transfer price italy |
| Long tail | get a quote for a private transfer in italy |

**On-page:** the form is the content. Short lead, four required fields,
alternative channels beside it.
**Priority:** high intent, low volume.

---

## Italiano

### `/it/` — Home
**Cluster principale:** transfer privato Italia / auto con autista

| Ruolo | Query |
|---|---|
| Testa | transfer privato italia |
| Testa | auto con autista italia |
| Supporto | servizio transfer aeroporto italia |
| Supporto | trasferimento privato aeroporto prezzo fisso |
| Supporto | autista privato per trasferte di lavoro |
| Coda lunga | preventivo transfer privato tariffa fissa |
| Coda lunga | transfer con fattura per azienda |

**In pagina:** la pagina italiana è costruita su esigenze diverse da quella
inglese — trasferte di lavoro, eventi, fattura elettronica — non sulla
tripartizione aeroporto/città/giornata usata in inglese. Le FAQ coprono ZTL,
fattura e bagagli, che in italiano sono le domande reali.
**Priorità:** alta.

### `/it/localita/` — Località
**Cluster principale:** zone e aeroporti serviti

| Ruolo | Query |
|---|---|
| Testa | transfer aeroporti italiani città |
| Testa | zone servite transfer privato |
| Supporto | transfer roma milano firenze venezia napoli |
| Supporto | trasferimento costiera amalfitana con autista |
| Coda lunga | quali città coprite per i transfer privati |

**In pagina:** stesso ruolo di smistamento della versione inglese, con testi di
scheda scritti in italiano e non tradotti.
**Priorità:** media.

### `/it/chi-siamo/` — Chi siamo
**Cluster principale:** brand e affidabilità

| Ruolo | Query |
|---|---|
| Testa | ciao italian taxi service chi siamo |
| Testa | ciao italian taxi service opinioni |
| Supporto | servizio transfer privato affidabile italia |
| Supporto | come vengono scelti gli autisti |
| Coda lunga | azienda transfer privato con fattura elettronica |

**In pagina:** pagina di reputazione. Nessuna valutazione, nessuna recensione,
nessuna cifra non verificata.
**Priorità:** bassa per volume, alta per conversione.

### `/it/contatti/` — Contatti
**Cluster principale:** transazionale — preventivo

| Ruolo | Query |
|---|---|
| Testa | preventivo transfer privato |
| Testa | prenotare auto con autista |
| Supporto | richiesta preventivo trasferimento aeroporto |
| Supporto | contatti servizio transfer privato |
| Coda lunga | chiedere preventivo transfer con fattura |

**Priorità:** intento alto, volume basso.

---

## City pages — planned, currently `noindex`

The twelve city stubs (six areas × two languages) carry `noindex, follow` and are
excluded from `sitemap.xml`. Both are driven by the single
`CITY_PAGES_INDEXABLE` flag in `src/data/seo.ts`; flip it only once each page has
real routes, journey times and prices.

The city head terms below are the commercially valuable half of this map and are
reserved for those pages. **Do not** target them on the hub, or the hub and the
city page will compete.

| Area | EN primary | IT primary |
|---|---|---|
| Rome | rome airport transfer / fiumicino to rome private transfer | transfer fiumicino roma centro |
| Milan | malpensa airport transfer private / milan chauffeur service | transfer malpensa milano centro |
| Florence | florence airport transfer / private driver tuscany wine tour | transfer aeroporto firenze / autista privato chianti |
| Venice | venice airport transfer piazzale roma | transfer aeroporto venezia piazzale roma |
| Naples | naples airport transfer / naples to pompeii private driver | transfer aeroporto napoli / napoli pompei con autista |
| Amalfi Coast | naples to positano transfer / amalfi coast private driver | transfer napoli positano / costiera amalfitana con autista |

Per city page, when written:

- one primary cluster, named in H1 and title;
- a real route table with journey times and prices (not the placeholder table);
- the airports, ports and stations for that area;
- what is specific to driving there — Venice's handover point, the SS163's
  constraints, Rome's ZTL — since that is the only content competitors do not
  already have;
- at least 400 words of text that exists nowhere else on the site, in either
  language, before the flag is flipped.

---

## Cannibalisation guard

| Risk | Mitigation |
|---|---|
| EN and IT competing for the same query | Separate clusters per language plus reciprocal `hreflang` with one `x-default`. The Italian copy is written natively, so there is no near-duplicate text. |
| Hub vs city pages on city head terms | City head terms are reserved for city pages; the hub targets coverage-shaped queries only. |
| Thin city stubs diluting the site | `noindex` plus sitemap exclusion until each has real content. |
| Home vs contact on quote intent | Home targets the service, contact targets the transaction. Home's CTAs point at `/contact/#quote-form` rather than duplicating the form. |
| Duplicate titles or H1s creeping in | `npm run verify` fails on duplicate title, description or H1 across indexable pages. |

## Not yet done

- No licensed keyword-volume or difficulty data. Re-run this map against a real
  tool before committing budget to any cluster.
- No competitor gap analysis. The SERPs sampled are dominated by aggregators
  (Transfeero, Transferhood, Daytrip) and single-operator sites; a proper gap
  analysis would change the city-page priority order.
- No branded-vs-generic split in Search Console, since the site is not live.
