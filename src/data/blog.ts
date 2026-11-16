/**
 * The Rome travel blog: the hub at /en/blog/ and /it/blog/, and one page per
 * post at /en/blog/{slug}/ and /it/blog/{slug}/. Every post links back to the
 * Rome page and ends with a booking call to action.
 *
 * Body text is plain strings. Two inline forms are understood (see
 * BlogPostBody.tsx):
 *   [anchor text](target)  an internal link. Targets: `rome`, `rome#quote-form`,
 *                          `contact`, `blog`, `post:<id>`. Resolved to the
 *                          same-language URL, so a link can never cross languages.
 *   [[TYPE:ID]]            a placeholder (playbook §7), listed in docs/PLACEHOLDERS.md.
 */
import type { Lang } from './i18n';

type L = Record<Lang, string>;

export type Block = { h2: string } | { p: string } | { ul: string[] };

export interface BlogPost {
  id: string;
  slug: L;
  /** ISO date. Posts are listed newest first; ties keep this file's order. */
  date: string;
  title: L;
  description: L;
  h1: L;
  excerpt: L;
  minutes: number;
  body: Record<Lang, Block[]>;
}

export const BLOG_DATE = '2026-11-16';

export const posts: BlogPost[] = [
  {
    id: 'fiumicino-to-rome',
    slug: { en: 'fiumicino-airport-to-rome-city-centre', it: 'da-fiumicino-al-centro-di-roma' },
    date: BLOG_DATE,
    title: {
      en: 'Fiumicino Airport to Rome City Centre | Ciao Italian Taxi Service',
      it: 'Da Fiumicino al centro di Roma: come arrivare | Ciao Italian Taxi Service',
    },
    description: {
      en: 'Train, bus, taxi or private transfer: how to get from Fiumicino Airport (FCO) to central Rome, with journey times and tips for each option.',
      it: 'Treno, bus, taxi o transfer privato: come arrivare dall’aeroporto di Fiumicino (FCO) al centro di Roma, con tempi e consigli per ogni opzione.',
    },
    h1: {
      en: 'How to get from Fiumicino Airport to Rome city centre',
      it: 'Come arrivare dall’aeroporto di Fiumicino al centro di Roma',
    },
    excerpt: {
      en: 'Leonardo Express, regional trains, coaches, taxis or a driver waiting in arrivals: what each one is really like after a long flight.',
      it: 'Leonardo Express, regionali, bus, taxi o un autista che vi aspetta agli arrivi: com’è davvero ogni opzione dopo un volo lungo.',
    },
    minutes: 4,
    body: {
      en: [
        { p: 'Rome Fiumicino (FCO) sits on the coast about 30 km west of the historic centre. There are four realistic ways into the city, and the right one depends less on price than on your luggage, your arrival time and where exactly you are staying.' },
        { h2: 'Leonardo Express train' },
        { p: 'The non-stop train runs from the airport station to Roma Termini in about 32 minutes. It is quick and predictable, but Termini is rarely where your hotel is: most people still need a taxi, the metro or a walk with their bags at the other end.' },
        { h2: 'Regional train FL1' },
        { p: 'The FL1 stops at Trastevere, Ostiense and Tiburtina, not Termini. It suits you if your accommodation is near one of those stations, and it is the cheapest rail option, though it is slower and busier at commuter times.' },
        { h2: 'Coaches' },
        { p: 'Several coach companies run to Termini. Allow 50 minutes or more, depending on traffic on the A91 motorway into the city.' },
        { h2: 'Taxi or private transfer' },
        { p: 'Rome’s white taxis wait at the official rank outside arrivals and charge a regulated flat fare for rides to addresses inside the Aurelian Walls. A [Fiumicino to Rome private transfer](rome) goes one step further: the price is fixed before you fly, the driver tracks your flight and meets you inside the terminal with a name board, and the car goes straight to your door, even if that door is in a narrow lane of the centro storico.' },
        { ul: [
          'Best with several suitcases, children or a late arrival.',
          'Allow 45 to 60 minutes; longer at weekday rush hour.',
          'Book ahead in summer, when the taxi queue can be long.',
        ] },
        { h2: 'Which one should you choose?' },
        { p: 'Travelling light to a hotel near Termini? The train is hard to beat. Arriving with family, at night or after a long-haul flight, a pre-booked car takes the guesswork out of the first hour in Rome. Read how [fixed fares work in Rome](post:rome-taxi-prices), or [book your airport pickup](rome#quote-form) and get one price before you travel.' },
      ],
      it: [
        { p: 'L’aeroporto di Roma Fiumicino (FCO) si trova sulla costa, circa 30 km a ovest del centro storico. Le soluzioni per arrivare in città sono quattro, e la scelta dipende meno dal prezzo che dai bagagli, dall’orario di arrivo e da dove alloggiate esattamente.' },
        { h2: 'Treno Leonardo Express' },
        { p: 'Il treno diretto collega la stazione dell’aeroporto a Roma Termini in circa 32 minuti. È veloce e puntuale, ma raramente l’hotel è a Termini: quasi sempre serve poi un taxi, la metro o una camminata con le valigie.' },
        { h2: 'Treno regionale FL1' },
        { p: 'L’FL1 ferma a Trastevere, Ostiense e Tiburtina, non a Termini. Conviene se alloggiate vicino a una di queste stazioni ed è l’opzione su rotaia più economica, ma è più lenta e affollata negli orari dei pendolari.' },
        { h2: 'Autobus' },
        { p: 'Diverse compagnie di bus portano a Termini. Calcolate almeno 50 minuti, a seconda del traffico sull’autostrada A91.' },
        { h2: 'Taxi o transfer privato' },
        { p: 'I taxi bianchi di Roma aspettano al posteggio ufficiale fuori dagli arrivi e applicano una tariffa fissa regolamentata per le corse all’interno delle Mura Aureliane. Un [transfer privato da Fiumicino a Roma](rome) fa un passo in più: il prezzo è fissato prima del volo, l’autista segue il vostro aereo e vi accoglie nel terminal con un cartello, e l’auto vi porta fino alla porta, anche in un vicolo del centro storico.' },
        { ul: [
          'Ideale con più valigie, con bambini o con un arrivo serale.',
          'Calcolate 45-60 minuti, di più nelle ore di punta dei giorni feriali.',
          'D’estate prenotate in anticipo: la coda dei taxi può essere lunga.',
        ] },
        { h2: 'Quale scegliere?' },
        { p: 'Viaggiate leggeri verso un hotel vicino a Termini? Il treno è difficile da battere. Se arrivate in famiglia, di notte o dopo un volo intercontinentale, un’auto prenotata vi toglie ogni pensiero nella prima ora a Roma. Scoprite come funzionano [le tariffe fisse a Roma](post:rome-taxi-prices) oppure [prenotate il ritiro in aeroporto](rome#quote-form) e ricevete un prezzo prima di partire.' },
      ],
    },
  },
  {
    id: 'rome-taxi-prices',
    slug: { en: 'rome-taxi-prices-fixed-fares', it: 'prezzi-taxi-roma-tariffe-fisse' },
    date: BLOG_DATE,
    title: {
      en: 'Rome Taxi Prices & Fixed Fares Explained | Ciao Italian Taxi Service',
      it: 'Prezzi taxi a Roma e tariffe fisse spiegate | Ciao Italian Taxi Service',
    },
    description: {
      en: 'How taxi fares work in Rome, what the airport flat fare covers, which extras apply, and how a fixed-price private transfer compares.',
      it: 'Come funzionano le tariffe dei taxi a Roma, cosa copre la tariffa fissa dall’aeroporto, quali supplementi esistono e come si confronta un transfer privato.',
    },
    h1: {
      en: 'Rome taxi prices and tips: fixed fares explained',
      it: 'Prezzi dei taxi a Roma e consigli: le tariffe fisse spiegate',
    },
    excerpt: {
      en: 'Meters, flat airport fares, luggage and night supplements: what you actually pay in Rome, and how to avoid surprises.',
      it: 'Tassametro, tariffe fisse dagli aeroporti, bagagli e supplementi notturni: cosa si paga davvero a Roma e come evitare sorprese.',
    },
    minutes: 4,
    body: {
      en: [
        { p: 'Rome has two kinds of car with a driver for hire: the white, metered city taxis, and pre-booked private transfers with a price agreed in advance. Knowing how each one charges is the easiest way to avoid an argument at the end of a ride.' },
        { h2: 'How Rome’s white taxis charge' },
        { p: 'Inside the city, official taxis run on the meter. The fare starts with a base charge that varies by time of day, adds a rate per kilometre and per minute in slow traffic, and can include supplements, for example at night or on public holidays. Always take a taxi from an official rank or book one by phone or app; never accept a ride from someone approaching you in the arrivals hall.' },
        { h2: 'The airport flat fare' },
        { p: 'From Fiumicino and Ciampino there is a regulated flat fare to addresses inside the Aurelian Walls, the ring of ancient walls around the historic centre. [[VERIFY:blog-rome-taxi-flat-fares]] If your hotel is outside them, the meter applies, so check the address before you get in.' },
        { h2: 'What a fixed-price transfer includes' },
        { p: 'A [private transfer in Rome](rome) is quoted per vehicle, before you travel, for your exact pickup and drop-off. With us the quote covers:' },
        { ul: [
          'the vehicle and the driver, door to door;',
          'motorway tolls and luggage, with no per-bag charge;',
          'flight tracking and waiting time after landing;',
          'the same price at night, at dawn and on public holidays.',
        ] },
        { h2: 'Tips for paying less and stressing less' },
        { ul: [
          'Groups of four or more often pay less per person in a pre-booked minivan than in two taxis.',
          'Give your flight number, so a delay never turns into a waiting charge.',
          'Ask for a return quote at the same time if you know your departure date.',
        ] },
        { p: 'Arriving at Fiumicino? Our [guide from Fiumicino to the city centre](post:fiumicino-to-rome) compares every option. When you are ready, [send your route for a fixed price](rome#quote-form).' },
      ],
      it: [
        { p: 'A Roma esistono due tipi di auto con conducente: i taxi bianchi con tassametro e i transfer privati prenotati, con prezzo concordato prima. Sapere come si paga ciascuno è il modo più semplice per evitare discussioni a fine corsa.' },
        { h2: 'Come si pagano i taxi bianchi' },
        { p: 'In città i taxi ufficiali viaggiano a tassametro. La tariffa parte da una quota fissa che cambia con l’orario, aggiunge un importo al chilometro e al minuto nel traffico lento e può prevedere supplementi, per esempio di notte o nei festivi. Prendete il taxi solo ai posteggi ufficiali o prenotatelo per telefono o app, e non accettate passaggi da chi vi avvicina nella sala arrivi.' },
        { h2: 'La tariffa fissa dagli aeroporti' },
        { p: 'Da Fiumicino e Ciampino esiste una tariffa fissa regolamentata verso gli indirizzi all’interno delle Mura Aureliane, la cinta di mura antiche che racchiude il centro storico. [[VERIFY:blog-rome-taxi-flat-fares]] Se l’hotel è fuori dalle mura vale il tassametro: controllate l’indirizzo prima di salire.' },
        { h2: 'Cosa include un transfer a prezzo fisso' },
        { p: 'Un [transfer privato a Roma](rome) si quota per veicolo, prima del viaggio, sul vostro indirizzo di partenza e di arrivo. Con noi il preventivo comprende:' },
        { ul: [
          'veicolo e autista, porta a porta;',
          'pedaggi autostradali e bagagli, senza costi per valigia;',
          'monitoraggio del volo e attesa dopo l’atterraggio;',
          'lo stesso prezzo di notte, all’alba e nei giorni festivi.',
        ] },
        { h2: 'Consigli per spendere meno e stressarsi meno' },
        { ul: [
          'Dalle quattro persone in su un monovolume prenotato costa spesso meno a testa di due taxi.',
          'Indicate il numero di volo: così un ritardo non diventa mai un costo di attesa.',
          'Se conoscete già la data di partenza, chiedete subito anche il ritorno.',
        ] },
        { p: 'Arrivate a Fiumicino? La nostra [guida da Fiumicino al centro](post:fiumicino-to-rome) confronta tutte le opzioni. Quando siete pronti, [inviateci la tratta per un prezzo fisso](rome#quote-form).' },
      ],
    },
  },
  {
    id: 'day-trips-from-rome',
    slug: { en: 'best-day-trips-from-rome-by-car', it: 'gite-da-roma-in-auto' },
    date: BLOG_DATE,
    title: {
      en: 'Best Day Trips from Rome by Private Car | Ciao Italian Taxi Service',
      it: 'Le migliori gite da Roma in auto privata | Ciao Italian Taxi Service',
    },
    description: {
      en: 'Tivoli, Orvieto, Civita di Bagnoregio, Ostia Antica, the Castelli Romani and Pompeii: the best day trips from Rome with a private driver.',
      it: 'Tivoli, Orvieto, Civita di Bagnoregio, Ostia Antica, Castelli Romani e Pompei: le gite da Roma più belle con un autista privato.',
    },
    h1: {
      en: 'The best day trips from Rome by private car',
      it: 'Le gite più belle da Roma in auto privata',
    },
    excerpt: {
      en: 'Six easy escapes from the city, with drive times, and why a car and driver beats juggling trains and buses for a day out.',
      it: 'Sei fughe facili dalla città, con i tempi di guida, e perché auto e autista battono treni e bus per una giornata fuori.',
    },
    minutes: 5,
    body: {
      en: [
        { p: 'Rome is a superb base for day trips, but many of the best ones are awkward by public transport: a train, then a bus, then a walk uphill. With a [private driver from Rome](rome) the car waits at every stop, and you decide how long to stay.' },
        { h2: 'Tivoli: Villa d’Este and Hadrian’s Villa' },
        { p: 'About 35 km and 45 minutes east. Two UNESCO sites in one day: the Renaissance fountains of Villa d’Este and the vast ruins of Emperor Hadrian’s country retreat, a few kilometres apart.' },
        { h2: 'Orvieto' },
        { p: 'About 120 km and 1 h 30 min north, on a cliff of volcanic rock. Its striped cathedral is one of the finest in Italy, and the underground city of caves and wells is worth the guided tour.' },
        { h2: 'Civita di Bagnoregio' },
        { p: 'Near Orvieto, so the two pair well. The village sits on an eroding hilltop reached only by a long footbridge; arrive early to have it almost to yourself.' },
        { h2: 'Ostia Antica' },
        { p: 'Ancient Rome’s port, about 30 km away and often quieter than the Forum. Streets, baths, a theatre and mosaics, with very few crowds.' },
        { h2: 'Castelli Romani' },
        { p: 'The hill towns south-east of the city: Frascati for its white wine, Castel Gandolfo above Lake Albano, and Ariccia for porchetta. Short drives between each make this a relaxed half day.' },
        { h2: 'Pompeii' },
        { p: 'About 240 km and 2 h 45 min south. It is a long day, but by car it is a direct one, and it can turn into a one-way trip that ends on the Amalfi Coast: see our [Rome to Amalfi Coast transfer guide](post:rome-to-amalfi).' },
        { h2: 'Planning tips' },
        { ul: [
          'Book timed tickets for Villa d’Este, the Vatican and Pompeii before the day.',
          'Leave by 8:00 for longer trips to beat the traffic on the ring road.',
          'Tell us your stops when you book and we quote the whole day at once.',
        ] },
        { p: 'Ready to plan yours? [Send us your itinerary](rome#quote-form) and we come back with one fixed price for the car and driver.' },
      ],
      it: [
        { p: 'Roma è una base perfetta per le gite, ma molte delle più belle sono scomode con i mezzi: un treno, poi un bus, poi una salita a piedi. Con un [autista privato da Roma](rome) l’auto vi aspetta a ogni tappa e decidete voi quanto fermarvi.' },
        { h2: 'Tivoli: Villa d’Este e Villa Adriana' },
        { p: 'Circa 35 km e 45 minuti a est. Due siti UNESCO in un giorno: le fontane rinascimentali di Villa d’Este e le grandi rovine della residenza di campagna dell’imperatore Adriano, a pochi chilometri l’una dall’altra.' },
        { h2: 'Orvieto' },
        { p: 'Circa 120 km e 1 h 30 min a nord, su una rupe di tufo. Il Duomo a strisce è tra i più belli d’Italia e la città sotterranea di grotte e pozzi merita la visita guidata.' },
        { h2: 'Civita di Bagnoregio' },
        { p: 'Vicina a Orvieto, quindi si abbinano bene. Il borgo sorge su un colle che si sgretola, raggiungibile solo da un lungo ponte pedonale: arrivate presto per averlo quasi tutto per voi.' },
        { h2: 'Ostia Antica' },
        { p: 'L’antico porto di Roma, a circa 30 km, spesso più tranquillo del Foro. Strade, terme, un teatro e mosaici, con pochissima folla.' },
        { h2: 'Castelli Romani' },
        { p: 'I borghi sui colli a sud-est della città: Frascati per il vino bianco, Castel Gandolfo sopra il lago Albano, Ariccia per la porchetta. Brevi tratti tra un paese e l’altro, per una mezza giornata senza fretta.' },
        { h2: 'Pompei' },
        { p: 'Circa 240 km e 2 h 45 min a sud. È una giornata lunga, ma in auto è diretta, e può diventare un viaggio di sola andata che finisce in Costiera: leggete la nostra [guida al transfer da Roma alla Costiera Amalfitana](post:rome-to-amalfi).' },
        { h2: 'Consigli per organizzarsi' },
        { ul: [
          'Prenotate in anticipo i biglietti a orario per Villa d’Este, Vaticano e Pompei.',
          'Per le gite lunghe partite entro le 8:00, prima del traffico sul Raccordo.',
          'Indicateci le tappe quando prenotate: quotiamo l’intera giornata in una volta.',
        ] },
        { p: 'Pronti a organizzare la vostra? [Inviateci l’itinerario](rome#quote-form) e vi rispondiamo con un unico prezzo fisso per auto e autista.' },
      ],
    },
  },
  {
    id: 'rome-to-amalfi',
    slug: { en: 'rome-to-amalfi-coast-transfer-guide', it: 'da-roma-alla-costiera-amalfitana' },
    date: BLOG_DATE,
    title: {
      en: 'Rome to Amalfi Coast: Transfer Guide | Ciao Italian Taxi Service',
      it: 'Da Roma alla Costiera Amalfitana in transfer | Ciao Italian Taxi Service',
    },
    description: {
      en: 'How to travel from Rome to Positano, Amalfi or Ravello: drive times, the route, a stop at Pompeii, and tips for luggage and summer traffic.',
      it: 'Come andare da Roma a Positano, Amalfi o Ravello: tempi, percorso, la sosta a Pompei e consigli su bagagli e traffico estivo.',
    },
    h1: {
      en: 'Rome to the Amalfi Coast: a private transfer guide',
      it: 'Da Roma alla Costiera Amalfitana: guida al transfer privato',
    },
    excerpt: {
      en: 'Door to door in about three and a half hours, with Pompeii on the way: how the drive works and what to know before you book.',
      it: 'Porta a porta in circa tre ore e mezza, con Pompei lungo la strada: come funziona il viaggio e cosa sapere prima di prenotare.',
    },
    minutes: 4,
    body: {
      en: [
        { p: 'By public transport, Rome to Positano means a train to Naples, another train or a ferry, and often a bus up the coast with your suitcases. A private transfer does it in one go: about 270 km and around three and a half hours from your hotel in Rome to the door of your hotel on the coast.' },
        { h2: 'The route' },
        { p: 'The drive follows the A1 motorway south to Naples, then the coast motorway towards Salerno. For Positano and Sorrento the car crosses the Sorrento peninsula; for Amalfi and Ravello it usually enters the coast road from Vietri sul Mare. The last stretch is the famous Amalfi Drive: beautiful, narrow and slow by design.' },
        { h2: 'Stop at Pompeii on the way' },
        { p: 'Pompeii is almost exactly on the route, so a two to three hour visit turns a transfer into a day to remember. The driver keeps your luggage locked in the car while you explore. Book your entry tickets in advance.' },
        { h2: 'Tips before you book' },
        { ul: [
          'Positano hotels are often down steps from the road: tell us, and we plan the drop-off point and porter time.',
          'In July and August, leave Rome early: the coast road is busiest from late morning.',
          'Large groups may need two smaller vehicles instead of one large van on the coast road.',
          'Ask us about a return trip or a transfer on to Naples airport at the end of your stay.',
        ] },
        { h2: 'How long and how much?' },
        { p: 'Allow 3 h 30 min to Positano or Amalfi without stops, more in summer traffic. The price is fixed per vehicle and includes tolls and luggage. See the [Rome to Amalfi Coast route](rome#routes) on our Rome page, then [request your fixed price](rome#quote-form). Planning more trips out of the city? Our [best day trips from Rome](post:day-trips-from-rome) has six more ideas.' },
      ],
      it: [
        { p: 'Con i mezzi pubblici, da Roma a Positano significa un treno fino a Napoli, poi un altro treno o un traghetto, e spesso un bus lungo la costa con le valigie. Un transfer privato lo fa in un’unica soluzione: circa 270 km e tre ore e mezza dall’hotel a Roma alla porta dell’hotel in Costiera.' },
        { h2: 'Il percorso' },
        { p: 'Si scende sull’A1 fino a Napoli, poi lungo l’autostrada verso Salerno. Per Positano e Sorrento l’auto attraversa la penisola sorrentina; per Amalfi e Ravello di solito entra sulla costiera da Vietri sul Mare. L’ultimo tratto è la celebre Amalfitana: bellissima, stretta e lenta per natura.' },
        { h2: 'Una sosta a Pompei' },
        { p: 'Pompei è praticamente sul percorso, quindi una visita di due o tre ore trasforma il transfer in una giornata da ricordare. L’autista custodisce i bagagli chiusi in auto mentre visitate gli scavi. Prenotate i biglietti in anticipo.' },
        { h2: 'Consigli prima di prenotare' },
        { ul: [
          'Molti hotel di Positano sono sotto il livello della strada, con scale: ditecelo e organizziamo il punto di discesa e il facchino.',
          'A luglio e agosto partite presto da Roma: la costiera è più trafficata dalla tarda mattinata.',
          'Per i gruppi numerosi, due veicoli più piccoli possono essere meglio di un minibus sulla costiera.',
          'Chiedeteci il ritorno o un transfer verso l’aeroporto di Napoli a fine soggiorno.',
        ] },
        { h2: 'Quanto tempo e quanto costa?' },
        { p: 'Calcolate 3 h 30 min fino a Positano o Amalfi senza soste, di più con il traffico estivo. Il prezzo è fisso per veicolo e comprende pedaggi e bagagli. Trovate la [tratta da Roma alla Costiera Amalfitana](rome#routes) nella nostra pagina su Roma, poi [chiedete il vostro prezzo fisso](rome#quote-form). Volete altre idee fuori città? Ecco le [gite più belle da Roma](post:day-trips-from-rome).' },
      ],
    },
  },
  {
    id: 'getting-around-rome',
    slug: { en: 'getting-around-rome-taxi-metro-private-driver', it: 'muoversi-a-roma-taxi-metro-autista' },
    date: BLOG_DATE,
    title: {
      en: 'Getting Around Rome: Taxi, Metro or Driver | Ciao Italian Taxi Service',
      it: 'Muoversi a Roma: taxi, metro o autista? | Ciao Italian Taxi Service',
    },
    description: {
      en: 'Taxi, metro or private driver? How to get around Rome, where each option works best, and when walking beats them all.',
      it: 'Taxi, metro o autista privato? Come muoversi a Roma, quando conviene ogni soluzione e quando camminare batte tutto.',
    },
    h1: {
      en: 'Getting around Rome: taxi vs metro vs private driver',
      it: 'Muoversi a Roma: taxi, metro o autista privato',
    },
    excerpt: {
      en: 'The metro misses much of the historic centre, taxis are best from a rank, and a driver makes sense for airports and day trips.',
      it: 'La metro non copre gran parte del centro storico, i taxi si prendono al posteggio e l’autista conviene per aeroporti e gite.',
    },
    minutes: 4,
    body: {
      en: [
        { p: 'Rome’s historic centre is compact, and much of it is best seen on foot. For everything else, there are three main choices, and each has a clear sweet spot.' },
        { h2: 'Metro' },
        { p: 'Rome has three metro lines. Line A serves the Vatican area, the Spanish Steps and Termini; Line B serves the Colosseum and Termini; Line C runs to the south-east and is being extended towards the centre. The catch: much of the historic centre, including the Pantheon, Piazza Navona and Trastevere, has no station nearby. The metro is cheap and quick between the stations it does serve, and crowded at rush hour.' },
        { h2: 'Taxi' },
        { p: 'Official taxis are white and metered. Hailing one in the street is hard; use the ranks at stations and main squares, or an app. They are good for short hops at night or in the rain, but traffic can make the meter climb.' },
        { h2: 'Private driver' },
        { p: 'A [private driver in Rome](rome) is booked in advance at a fixed price. It is the easiest choice for airport and station transfers with luggage, for families, for evenings spread across the city, and for days out of Rome. You can book point to point or keep the car and driver by the hour.' },
        { h2: 'Which one, when?' },
        { ul: [
          'Arrival and departure days: a pre-booked transfer, door to door.',
          'Sightseeing in the centre: walk, with the metro for longer jumps.',
          'A dinner across town: a taxi from the nearest rank.',
          'Day trips and multi-stop days: a driver for the day.',
        ] },
        { p: 'For your arrival, start with our [Fiumicino to Rome guide](post:fiumicino-to-rome) and the [Rome taxi prices explained](post:rome-taxi-prices). Then [book your Rome transfer](rome#quote-form) and get one fixed price.' },
      ],
      it: [
        { p: 'Il centro storico di Roma è compatto e gran parte si visita meglio a piedi. Per tutto il resto ci sono tre scelte principali, ciascuna con il suo punto di forza.' },
        { h2: 'Metro' },
        { p: 'Roma ha tre linee di metropolitana. La A serve la zona del Vaticano, Piazza di Spagna e Termini; la B il Colosseo e Termini; la C corre verso sud-est ed è in prolungamento verso il centro. Il limite: gran parte del centro storico, tra cui Pantheon, Piazza Navona e Trastevere, non ha una stazione vicina. Tra le stazioni che serve la metro è economica e veloce, ma affollata nelle ore di punta.' },
        { h2: 'Taxi' },
        { p: 'I taxi ufficiali sono bianchi e a tassametro. Fermarne uno per strada è difficile: usate i posteggi di stazioni e piazze principali, o un’app. Vanno bene per brevi spostamenti la sera o con la pioggia, ma nel traffico il tassametro sale.' },
        { h2: 'Autista privato' },
        { p: 'Un [autista privato a Roma](rome) si prenota in anticipo a prezzo fisso. È la scelta più semplice per i transfer da aeroporti e stazioni con i bagagli, per le famiglie, per le serate in giro per la città e per le gite fuori Roma. Si prenota da punto a punto oppure a ore, con auto e autista a disposizione.' },
        { h2: 'Cosa usare, e quando' },
        { ul: [
          'Giorni di arrivo e partenza: un transfer prenotato, porta a porta.',
          'Visite in centro: a piedi, con la metro per i tratti lunghi.',
          'Una cena dall’altra parte della città: un taxi dal posteggio più vicino.',
          'Gite e giornate con più tappe: un autista per la giornata.',
        ] },
        { p: 'Per l’arrivo, partite dalla nostra [guida da Fiumicino a Roma](post:fiumicino-to-rome) e dai [prezzi dei taxi a Roma](post:rome-taxi-prices). Poi [prenotate il transfer a Roma](rome#quote-form) e ricevete un unico prezzo fisso.' },
      ],
    },
  },
];

/** Newest first; same-day posts keep their order in `posts`. */
export function latestPosts(n?: number): BlogPost[] {
  const sorted = posts
    .map((p, i) => ({ p, i }))
    .sort((a, b) => b.p.date.localeCompare(a.p.date) || a.i - b.i)
    .map(({ p }) => p);
  return n ? sorted.slice(0, n) : sorted;
}

export function postPath(post: BlogPost, lang: Lang): string {
  return `/${lang}/blog/${post.slug[lang]}/`;
}

export function postById(id: string): BlogPost {
  const found = posts.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown blog post id: ${id}`);
  return found;
}

/** "16 November 2026" / "16 novembre 2026" */
export function formatDate(iso: string, lang: Lang): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const blogCopy = {
  en: {
    eyebrow: 'Travel blog',
    lead: 'Practical guides for arriving in Rome, getting around the city and planning trips beyond it, written by the people who drive those roads every day.',
    listHeading: 'Latest Rome guides',
    read: 'Read the guide',
    minutes: '{n} min read',
    ctaHeading: 'Need a ride in Rome?',
    ctaBody: 'Send your route and date and we reply with one fixed price, tolls and waiting time included.',
    ctaButton: 'Book your Rome transfer',
    ctaRome: 'See Rome transfers',
    related: 'More Rome guides',
    published: 'Published',
  },
  it: {
    eyebrow: 'Blog di viaggio',
    lead: 'Guide pratiche per arrivare a Roma, muoversi in città e organizzare le gite fuori porta, scritte da chi quelle strade le percorre ogni giorno.',
    listHeading: 'Le ultime guide su Roma',
    read: 'Leggi la guida',
    minutes: '{n} min di lettura',
    ctaHeading: 'Vi serve un’auto a Roma?',
    ctaBody: 'Inviateci tratta e data: rispondiamo con un unico prezzo fisso, pedaggi e attesa inclusi.',
    ctaButton: 'Prenota il transfer a Roma',
    ctaRome: 'Transfer a Roma',
    related: 'Altre guide su Roma',
    published: 'Pubblicato il',
  },
} satisfies Record<Lang, Record<string, string>>;
