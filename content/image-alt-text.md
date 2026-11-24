# Image alt text

The single source of alt text for every image on the site. The build reads
this table (`src/data/image-alt.ts`): English goes on `/en/` pages, Italian on
`/it/` pages. Edit a cell here and rebuild; nothing else needs to change.

Rules the build enforces: every image the site renders must have a row, and
both cells must be filled. A missing row or an empty cell stops the build.

How to write one:

- Describe what is in the frame, as you would to someone on the phone.
- Write each language natively; do not translate word for word.
- Under about 160 characters. No "image of" or "photo of".
- Do not use alt text to stuff keywords; the file names and page copy do that.

| Image | English (`/en/`) | Italiano (`/it/`) |
|---|---|---|
| `private-chauffeur-transfer-italy` | A smiling chauffeur in a dark suit opens the rear door of a black saloon on a cobbled street of ochre houses with green shutters. | Su una via lastricata tra palazzi color ocra e persiane verdi, un autista sorridente in abito scuro apre la portiera posteriore di una berlina nera. |
| `italian-chauffeur-service-portrait` | A woman in a dark blazer and green silk scarf stands beside a black saloon on a sunlit street of ochre buildings. | Una donna in blazer scuro e foulard di seta verde, in piedi accanto a una berlina nera in una via assolata tra palazzi color ocra. |
| `rome-private-transfer-colosseum` | A chauffeur in a dark suit opens the rear door of a black saloon on a cobbled street, the Colosseum glowing in evening light behind. | Su una strada di sampietrini, l’autista in abito scuro apre la portiera posteriore di una berlina nera; alle spalle, il Colosseo nella luce del tramonto. |
| `milan-private-transfer-duomo-galleria` | Outside the Galleria Vittorio Emanuele II, with the Duomo beyond, a chauffeur holds open the door of a black saloon for a passenger carrying a briefcase. | Davanti alla Galleria Vittorio Emanuele II, con il Duomo sullo sfondo, l’autista tiene aperta la portiera della berlina nera per una passeggera con la valigetta. |
| `florence-private-transfer-duomo` | A black saloon waits in a narrow street of ochre houses and window boxes, with Brunelleschi’s dome and Giotto’s bell tower at the far end. | Una berlina nera ferma in una via stretta tra case color ocra e fioriere ai davanzali; in fondo, la cupola del Brunelleschi e il campanile di Giotto. |
| `venezia-transfer-piazzale-roma` | At Piazzale Roma in Venice, a chauffeur lifts a suitcase from a black saloon for a passenger, with the Ponte della Costituzione and a water taxi behind. | A Piazzale Roma, a Venezia, l’autista scarica una valigia dalla berlina nera per una passeggera; dietro, il Ponte della Costituzione e un taxi acqueo. |
| `naples-private-transfer-vesuvius` | A black saloon parked on the Naples waterfront under palm trees, with a ferry in the harbour and Vesuvius beyond. | Una berlina nera sul lungomare di Napoli, all’ombra delle palme, con un traghetto in porto e il Vesuvio sullo sfondo. |
| `amalfi-coast-private-transfer-positano` | A black saloon on the coast road above Positano, between a lemon tree and bougainvillea, with the village stepping down the cliff to the sea. | Una berlina nera sulla strada costiera sopra Positano, tra un limone e la bouganville, con il paese che scende a gradoni verso il mare. |
| `logo` | Ciao Italian Taxi Service | Ciao Italian Taxi Service, logo |
| `logo-emblem-reversed` | Ciao Italian Taxi Service | Ciao Italian Taxi Service, logo |

## Pending photos (homepage "Where We Serve" and "Vehicle types")

These photos are not shot or chosen yet; their slots show `[[IMG:…]]`
placeholders (see `docs/PLACEHOLDERS.md`). The alt text is written first, so
it doubles as the photo brief: pick or shoot a photo that matches the row,
or update the row to match the photo you use. Save the file under the key
below in `src/assets/` and set `photo` in `src/data/service-areas.ts` or
`src/data/fleet.ts`.

| Image | English (`/en/`) | Italiano (`/it/`) |
|---|---|---|
| `rome-service-area-colosseum` | The Colosseum in warm evening light, seen from a quiet street in central Rome. | Il Colosseo nella luce calda della sera, visto da una strada tranquilla del centro di Roma. |
| `milan-service-area-duomo` | The white marble spires of Milan Cathedral against a clear sky above Piazza del Duomo. | Le guglie di marmo bianco del Duomo di Milano contro il cielo limpido sopra piazza del Duomo. |
| `florence-service-area-duomo` | Terracotta rooftops of Florence with Brunelleschi’s dome rising above them. | I tetti in cotto di Firenze e, sopra di essi, la cupola del Brunelleschi. |
| `venice-service-area-grand-canal` | Gondolas and palazzi along the Grand Canal in Venice in soft morning light. | Gondole e palazzi affacciati sul Canal Grande a Venezia, nella luce morbida del mattino. |
| `naples-service-area-vesuvius` | The Bay of Naples with boats in the harbour and Vesuvius on the horizon. | Il golfo di Napoli con le barche in porto e il Vesuvio all’orizzonte. |
| `amalfi-coast-service-area-positano` | Positano’s pastel houses stepping down the cliff to the sea on the Amalfi Coast. | Le case color pastello di Positano che scendono a gradoni verso il mare, in Costiera Amalfitana. |
| `lake-como-service-area-bellagio` | The lakefront at Bellagio on Lake Como, with villas and mountains across the water. | Il lungolago di Bellagio sul Lago di Como, con ville e montagne sull’altra sponda. |
| `pisa-service-area-leaning-tower` | The Leaning Tower and the cathedral on Pisa’s Piazza dei Miracoli. | La Torre pendente e il Duomo in piazza dei Miracoli, a Pisa. |
| `bologna-service-area-two-towers` | Bologna’s Two Towers rising above red-roofed medieval streets. | Le Due Torri di Bologna che svettano sopra le vie medievali dai tetti rossi. |
| `verona-service-area-arena` | The Roman Arena on Piazza Bra in Verona on a sunny afternoon. | L’Arena romana in piazza Bra a Verona, in un pomeriggio di sole. |
| `mercedes-s-class-chauffeur-car` | A black Mercedes-Benz S-Class saloon, seen from the front three-quarter angle. | Una berlina Mercedes-Benz Classe S nera, vista di tre quarti dal davanti. |
| `mercedes-e-class-chauffeur-car` | A black Mercedes-Benz E-Class saloon, seen from the front three-quarter angle. | Una berlina Mercedes-Benz Classe E nera, vista di tre quarti dal davanti. |
| `bmw-5-series-chauffeur-car` | A black BMW 5 Series saloon, seen from the front three-quarter angle. | Una berlina BMW Serie 5 nera, vista di tre quarti dal davanti. |
| `bmw-7-series-chauffeur-car` | A black BMW 7 Series saloon, seen from the front three-quarter angle. | Una berlina BMW Serie 7 nera, vista di tre quarti dal davanti. |
| `mercedes-v-class-chauffeur-car` | A black Mercedes-Benz V-Class van with its sliding door open, showing the leather passenger seats. | Un van Mercedes-Benz Classe V nero con la porta scorrevole aperta, che lascia vedere i sedili in pelle. |

## Pending photos (Rome page: fleet, destinations, hotels)

Each photo must match its row (or the row is updated with it). File name = key.

| Key | English | Italiano |
|---|---|---|
| `rome-st-peters-basilica-vatican` | St. Peter’s Basilica and its dome seen across St. Peter’s Square in Vatican City. | La Basilica di San Pietro e la cupola viste da Piazza San Pietro, nella Città del Vaticano. |
| `rome-trevi-fountain` | The Trevi Fountain in Rome, with Neptune at the centre of the Baroque façade. | La Fontana di Trevi a Roma, con Nettuno al centro della facciata barocca. |
| `rome-pantheon` | The portico and columns of the Pantheon on Piazza della Rotonda in Rome. | Il pronao e le colonne del Pantheon su Piazza della Rotonda a Roma. |
| `rome-spanish-steps` | The Spanish Steps climbing to the Trinità dei Monti church in Rome. | La scalinata di Piazza di Spagna che sale alla chiesa di Trinità dei Monti a Roma. |
| `rome-roman-forum` | Columns and ruins of the Roman Forum below the Palatine Hill in Rome. | Colonne e rovine del Foro Romano ai piedi del Palatino, a Roma. |
| `rome-trastevere` | An ivy-covered lane with trattoria tables in Trastevere, Rome. | Un vicolo coperto d’edera con i tavoli di una trattoria a Trastevere, Roma. |
| `rome-villa-borghese` | Tree-lined paths and the lake temple in the Villa Borghese park in Rome. | Viali alberati e il tempietto sul lago nel parco di Villa Borghese a Roma. |
| `rome-hotel-hassler` | The entrance of Hotel Hassler Roma at the top of the Spanish Steps. | L’ingresso dell’Hotel Hassler Roma in cima a Trinità dei Monti. |
| `rome-hotel-de-russie` | The garden courtyard of Hotel de Russie near Piazza del Popolo in Rome. | Il giardino interno dell’Hotel de Russie vicino a Piazza del Popolo a Roma. |
| `rome-hotel-eden` | The façade of Hotel Eden near Via Veneto in Rome. | La facciata dell’Hotel Eden vicino a Via Veneto a Roma. |
| `rome-hotel-st-regis` | The entrance of The St. Regis Rome near Piazza della Repubblica. | L’ingresso del St. Regis Rome vicino a Piazza della Repubblica. |
| `rome-hotel-cavalieri` | Rome Cavalieri hotel on Monte Mario, with gardens in front. | L’hotel Rome Cavalieri su Monte Mario, con i giardini davanti. |
| `rome-hotel-artemide` | The façade of Hotel Artemide on Via Nazionale in Rome. | La facciata dell’Hotel Artemide in Via Nazionale a Roma. |

## Pending photos (Milan page: destinations, hotels)

The fleet photos are the shared ones above. Each photo must match its row (or
the row is updated with it). File name = key.

| Key | English | Italiano |
|---|---|---|
| `milan-duomo-cathedral-rooftop` | Visitors on the marble rooftop terraces of Milan Cathedral, among the Gothic spires. | Visitatori sulle terrazze di marmo del Duomo di Milano, tra le guglie gotiche. |
| `milan-galleria-vittorio-emanuele` | The glass-and-iron dome of the Galleria Vittorio Emanuele II in Milan, above its mosaic floor. | La cupola in vetro e ferro della Galleria Vittorio Emanuele II a Milano, sopra il pavimento a mosaico. |
| `milan-santa-maria-delle-grazie` | The brick church of Santa Maria delle Grazie in Milan, home of Leonardo’s Last Supper. | La chiesa in mattoni di Santa Maria delle Grazie a Milano, che custodisce il Cenacolo di Leonardo. |
| `milan-navigli-canal` | Bars and old houses along the Naviglio Grande canal in Milan at dusk. | Locali e case di ringhiera lungo il Naviglio Grande a Milano, all’imbrunire. |
| `milan-brera-district` | A cobbled street with café tables and flower boxes in the Brera district of Milan. | Una via acciottolata con i tavolini dei caffè e le fioriere nel quartiere di Brera, a Milano. |
| `milan-porta-nuova-bosco-verticale` | The tree-covered Bosco Verticale towers beside the glass skyscrapers of Porta Nuova in Milan. | Le torri del Bosco Verticale ricoperte di alberi accanto ai grattacieli di vetro di Porta Nuova, a Milano. |
| `milan-castello-sforzesco` | The brick gate tower of the Castello Sforzesco in Milan, seen across the fountain in front. | La torre d’ingresso in mattoni del Castello Sforzesco a Milano, vista oltre la fontana antistante. |
| `milan-teatro-alla-scala` | The neoclassical façade of the Teatro alla Scala opera house in Milan. | La facciata neoclassica del Teatro alla Scala a Milano. |
| `milan-hotel-four-seasons` | The cloistered courtyard of the Four Seasons Hotel Milano in the fashion district. | Il chiostro del Four Seasons Hotel Milano, nel quartiere della moda. |
| `milan-hotel-park-hyatt` | The entrance of Park Hyatt Milano, a few steps from the Galleria. | L’ingresso del Park Hyatt Milano, a pochi passi dalla Galleria. |
| `milan-hotel-armani` | The stone façade of the Armani Hotel Milano on Via Manzoni. | La facciata in pietra dell’Armani Hotel Milano in via Manzoni. |
| `milan-hotel-mandarin-oriental` | The entrance of the Mandarin Oriental, Milan, on a quiet street near Brera. | L’ingresso del Mandarin Oriental, Milan, in una via tranquilla vicino a Brera. |
| `milan-hotel-bulgari` | The garden terrace of the Bulgari Hotel Milano in Brera. | La terrazza sul giardino del Bulgari Hotel Milano, a Brera. |
| `milan-hotel-palazzo-parigi` | The grand entrance hall of Palazzo Parigi hotel in Milan. | La grande hall d’ingresso dell’hotel Palazzo Parigi a Milano. |
| `milan-hotel-principe-di-savoia` | The white façade of the Hotel Principe di Savoia on Piazza della Repubblica in Milan. | La facciata bianca dell’Hotel Principe di Savoia in piazza della Repubblica a Milano. |
| `milan-hotel-excelsior-gallia` | The Belle Époque façade of the Excelsior Hotel Gallia beside Milano Centrale station. | La facciata Belle Époque dell’Excelsior Hotel Gallia accanto alla stazione di Milano Centrale. |

## Pending photos (Milan blog posts)

One lead image per post, 16:9, at least 1600×900. File name = key, in
`src/assets/blog/`; then set `photo: true` on the post's `image` in
`src/data/blog-milan.ts`.

| Key | English | Italiano |
|---|---|---|
| `milan-taxi-rank-centrale-station` | White taxis waiting in line at the rank outside Milano Centrale station. | Taxi bianchi in fila al posteggio davanti alla stazione di Milano Centrale. |
| `milan-malpensa-arrivals-chauffeur` | A chauffeur holding a name board for arriving passengers in the arrivals hall at Milan Malpensa. | Un autista con un cartello con il nome dei passeggeri nella sala arrivi di Milano Malpensa. |
| `milan-taxi-or-uber-street` | A traveller with a phone and a suitcase on the kerb of a busy street in central Milan as a white taxi pulls up. | Una viaggiatrice con telefono e valigia sul marciapiede di una via trafficata del centro di Milano, mentre arriva un taxi bianco. |
| `milan-taxi-fares-meter` | The lit taxi meter on the dashboard of a Milan taxi at night, with city lights blurred beyond the windscreen. | Il tassametro acceso sul cruscotto di un taxi milanese di notte, con le luci della città sfocate oltre il parabrezza. |
| `milan-day-trip-lake-como-bellagio` | A black saloon on the lakeside road near Bellagio on Lake Como, with villas and mountains across the water. | Una berlina nera sulla strada del lago vicino a Bellagio, sul Lago di Como, con ville e montagne sull’altra sponda. |


Images with no alt text on purpose (decorative, `alt=""` or `aria-hidden`):
the inline header logo mark (the wordmark beside it names the link), the
Lucide icons (each sits next to a text label) and the map tiles.
