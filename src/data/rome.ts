/**
 * The Rome location page (/en/locations/rome/, /it/localita/roma/): its
 * shared, language-neutral facts and its copy in both languages.
 *
 * Page id `loc-rome` (docs/seo-site-expansion-playbook.md §2.3). Every
 * placeholder ID below starts with it and is listed in docs/PLACEHOLDERS.md.
 *
 * Keywords (§5.1). EN primary: "Rome taxi" / "private transfer Rome";
 * secondary: Rome airport taxi, Fiumicino to Rome taxi, private driver Rome,
 * Rome transfer service. IT primary: "transfer privato Roma"; secondary:
 * taxi Roma, taxi Fiumicino Roma, autista privato Roma, transfer aeroporto Roma.
 *
 * `it` is typed as `typeof en`, so a key missing from either language fails
 * the build instead of falling back to the other one.
 */
import type { Lang } from './i18n';
import type { IconName } from './icons';

type L = Record<Lang, string>;

export const ROME_ID = 'loc-rome';

// ---------------------------------------------------------------------------
// Vehicles: the shared premium fleet in src/data/fleet.ts (also the booking
// form's "Vehicle type" options). Its placeholders are tracked there.

// ---------------------------------------------------------------------------
// Airports, port and station. Fares: PLACEHOLDER(PRICE:loc-rome-{id}-from).

export interface Gateway {
  id: string;
  icon: IconName;
  name: L;
  code: string;
  distance: L;
  chips: Record<Lang, string[]>;
  /** What the "Book" button puts in the pickup field. */
  pickup: L;
}

export const romeGateways: Gateway[] = [
  {
    id: 'fco',
    icon: 'plane',
    name: { en: 'Fiumicino Airport', it: 'Aeroporto di Fiumicino' },
    code: 'FCO',
    distance: { en: 'About 30 km to the centre · 45–60 min', it: 'Circa 30 km dal centro · 45–60 min' },
    chips: {
      en: ['Flight tracking', 'Meet & greet in arrivals', 'Waiting time included'],
      it: ['Volo monitorato', 'Accoglienza agli arrivi', 'Attesa inclusa'],
    },
    pickup: { en: 'Fiumicino Airport (FCO)', it: 'Aeroporto di Fiumicino (FCO)' },
  },
  {
    id: 'cia',
    icon: 'plane',
    name: { en: 'Ciampino Airport', it: 'Aeroporto di Ciampino' },
    code: 'CIA',
    distance: { en: 'About 15 km to the centre · 30–40 min', it: 'Circa 15 km dal centro · 30–40 min' },
    chips: {
      en: ['Flight tracking', 'Meet & greet in arrivals', 'Waiting time included'],
      it: ['Volo monitorato', 'Accoglienza agli arrivi', 'Attesa inclusa'],
    },
    pickup: { en: 'Ciampino Airport (CIA)', it: 'Aeroporto di Ciampino (CIA)' },
  },
  {
    id: 'civitavecchia',
    icon: 'ship',
    name: { en: 'Civitavecchia cruise port', it: 'Porto di Civitavecchia' },
    code: 'PORT',
    distance: { en: 'About 80 km to the centre · 1 h 15 min', it: 'Circa 80 km dal centro · 1 h 15 min' },
    chips: {
      en: ['Ship arrival tracked', 'Meet & greet at the terminal', 'Help with luggage'],
      it: ['Arrivo nave monitorato', 'Accoglienza al terminal', 'Aiuto con i bagagli'],
    },
    pickup: { en: 'Civitavecchia cruise port', it: 'Porto di Civitavecchia' },
  },
  {
    id: 'termini',
    icon: 'train',
    name: { en: 'Roma Termini station', it: 'Stazione Roma Termini' },
    code: 'RAIL',
    distance: { en: 'In the centre · 10–25 min to most hotels', it: 'In centro · 10–25 min dalla maggior parte degli hotel' },
    chips: {
      en: ['Train tracking', 'Meet & greet at the station', 'Waiting time included'],
      it: ['Treno monitorato', 'Accoglienza in stazione', 'Attesa inclusa'],
    },
    pickup: { en: 'Roma Termini station', it: 'Stazione Roma Termini' },
  },
];

// ---------------------------------------------------------------------------
// Popular intercity routes from Rome. Distances and times are typical road
// figures in normal traffic. Prices: PLACEHOLDER(PRICE:loc-rome-route-{id}-from).
// Route pages do not exist yet: see TODO-LINKS.md.

export interface RomeRoute {
  id: string;
  to: L;
  km: number;
  time: L;
}

export const romeRoutes: RomeRoute[] = [
  { id: 'florence', to: { en: 'Florence', it: 'Firenze' }, km: 275, time: { en: '3 h 15 min', it: '3 h 15 min' } },
  { id: 'naples', to: { en: 'Naples', it: 'Napoli' }, km: 225, time: { en: '2 h 30 min', it: '2 h 30 min' } },
  { id: 'amalfi-coast', to: { en: 'Amalfi Coast', it: 'Costiera Amalfitana' }, km: 275, time: { en: '3 h 30 min', it: '3 h 30 min' } },
  { id: 'positano', to: { en: 'Positano', it: 'Positano' }, km: 270, time: { en: '3 h 30 min', it: '3 h 30 min' } },
  { id: 'pisa', to: { en: 'Pisa', it: 'Pisa' }, km: 360, time: { en: '3 h 45 min', it: '3 h 45 min' } },
  { id: 'siena', to: { en: 'Siena', it: 'Siena' }, km: 230, time: { en: '2 h 30 min', it: '2 h 30 min' } },
  { id: 'orvieto', to: { en: 'Orvieto', it: 'Orvieto' }, km: 120, time: { en: '1 h 30 min', it: '1 h 30 min' } },
  { id: 'tivoli', to: { en: 'Tivoli', it: 'Tivoli' }, km: 35, time: { en: '45 min', it: '45 min' } },
  { id: 'civitavecchia', to: { en: 'Civitavecchia', it: 'Civitavecchia' }, km: 80, time: { en: '1 h 15 min', it: '1 h 15 min' } },
];

// ---------------------------------------------------------------------------
// Nearby major cities. No pages yet, so href="#": see TODO-LINKS.md.

export interface NearbyCity {
  id: string;
  name: L;
  region: L;
  km: number;
}

export const romeNearby: NearbyCity[] = [
  { id: 'florence', name: { en: 'Florence', it: 'Firenze' }, region: { en: 'Tuscany', it: 'Toscana' }, km: 275 },
  { id: 'naples', name: { en: 'Naples', it: 'Napoli' }, region: { en: 'Campania', it: 'Campania' }, km: 225 },
  { id: 'pisa', name: { en: 'Pisa', it: 'Pisa' }, region: { en: 'Tuscany', it: 'Toscana' }, km: 360 },
  { id: 'siena', name: { en: 'Siena', it: 'Siena' }, region: { en: 'Tuscany', it: 'Toscana' }, km: 230 },
  { id: 'perugia', name: { en: 'Perugia', it: 'Perugia' }, region: { en: 'Umbria', it: 'Umbria' }, km: 170 },
  { id: 'orvieto', name: { en: 'Orvieto', it: 'Orvieto' }, region: { en: 'Umbria', it: 'Umbria' }, km: 120 },
  { id: 'assisi', name: { en: 'Assisi', it: 'Assisi' }, region: { en: 'Umbria', it: 'Umbria' }, km: 180 },
  { id: 'viterbo', name: { en: 'Viterbo', it: 'Viterbo' }, region: { en: 'Lazio', it: 'Lazio' }, km: 85 },
];

// ---------------------------------------------------------------------------
// Top destinations in Rome. No pages yet, so href="#": see TODO-LINKS.md.
// Photos: PLACEHOLDER(IMG:loc-rome-dest-{id}), except the Colosseum, which
// uses the existing photo.

export interface Destination {
  id: string;
  name: L;
  line: L;
  /** Alt-text key, and the photo's file name once it exists. */
  altKey: string;
  /** Existing photo in src/assets (by file name), if there is one. */
  photo?: string;
}

export const romeDestinations: Destination[] = [
  {
    id: 'colosseum',
    name: { en: 'Colosseum', it: 'Colosseo' },
    line: {
      en: 'The largest amphitheatre ever built, opened in AD 80.',
      it: 'Il più grande anfiteatro mai costruito, inaugurato nell’80 d.C.',
    },
    altKey: 'rome-private-transfer-colosseum',
    photo: 'rome-private-transfer-colosseum',
  },
  {
    id: 'vatican',
    name: { en: 'Vatican & St. Peter’s', it: 'Vaticano e San Pietro' },
    line: {
      en: 'Michelangelo’s dome and the Sistine Chapel, in the world’s smallest state.',
      it: 'La cupola di Michelangelo e la Cappella Sistina, nello Stato più piccolo del mondo.',
    },
    altKey: 'rome-st-peters-basilica-vatican',
  },
  {
    id: 'trevi',
    name: { en: 'Trevi Fountain', it: 'Fontana di Trevi' },
    line: {
      en: 'Rome’s grandest Baroque fountain: toss a coin to make sure you come back.',
      it: 'La fontana barocca più scenografica di Roma: una moneta per tornarci.',
    },
    altKey: 'rome-trevi-fountain',
  },
  {
    id: 'pantheon',
    name: { en: 'Pantheon', it: 'Pantheon' },
    line: {
      en: 'A temple almost 2,000 years old, under the largest unreinforced concrete dome.',
      it: 'Un tempio di quasi 2.000 anni, sotto la più grande cupola in calcestruzzo non armato.',
    },
    altKey: 'rome-pantheon',
  },
  {
    id: 'spanish-steps',
    name: { en: 'Spanish Steps', it: 'Piazza di Spagna' },
    line: {
      en: 'The 18th-century staircase climbing to Trinità dei Monti.',
      it: 'La scalinata settecentesca che sale a Trinità dei Monti.',
    },
    altKey: 'rome-spanish-steps',
  },
  {
    id: 'forum',
    name: { en: 'Roman Forum', it: 'Foro Romano' },
    line: {
      en: 'The political heart of ancient Rome, beside the Palatine Hill.',
      it: 'Il cuore politico della Roma antica, ai piedi del Palatino.',
    },
    altKey: 'rome-roman-forum',
  },
  {
    id: 'trastevere',
    name: { en: 'Trastevere', it: 'Trastevere' },
    line: {
      en: 'Cobbled lanes, ivy-covered trattorias and the city’s liveliest evenings.',
      it: 'Vicoli acciottolati, trattorie coperte d’edera e le serate più vivaci della città.',
    },
    altKey: 'rome-trastevere',
  },
  {
    id: 'villa-borghese',
    name: { en: 'Villa Borghese', it: 'Villa Borghese' },
    line: {
      en: 'Rome’s central park, home to the Galleria Borghese.',
      it: 'Il grande parco nel cuore di Roma, con la Galleria Borghese.',
    },
    altKey: 'rome-villa-borghese',
  },
];

// ---------------------------------------------------------------------------
// Hotels we are often asked to drive to. Listed for convenience only: no
// partnership is implied. Star ratings to confirm:
// PLACEHOLDER(VERIFY:loc-rome-hotels). Photos: PLACEHOLDER(IMG:loc-rome-hotel-{id}).

export interface Hotel {
  id: string;
  name: string;
  area: L;
  stars: 4 | 5;
  altKey: string;
}

export const romeHotels: Hotel[] = [
  { id: 'hassler', name: 'Hotel Hassler Roma', area: { en: 'Spanish Steps', it: 'Trinità dei Monti' }, stars: 5, altKey: 'rome-hotel-hassler' },
  { id: 'de-russie', name: 'Hotel de Russie', area: { en: 'Piazza del Popolo', it: 'Piazza del Popolo' }, stars: 5, altKey: 'rome-hotel-de-russie' },
  { id: 'eden', name: 'Hotel Eden', area: { en: 'Via Veneto', it: 'Via Veneto' }, stars: 5, altKey: 'rome-hotel-eden' },
  { id: 'st-regis', name: 'The St. Regis Rome', area: { en: 'Piazza della Repubblica', it: 'Piazza della Repubblica' }, stars: 5, altKey: 'rome-hotel-st-regis' },
  { id: 'cavalieri', name: 'Rome Cavalieri', area: { en: 'Monte Mario', it: 'Monte Mario' }, stars: 5, altKey: 'rome-hotel-cavalieri' },
  { id: 'artemide', name: 'Hotel Artemide', area: { en: 'Via Nazionale', it: 'Via Nazionale' }, stars: 4, altKey: 'rome-hotel-artemide' },
];

// ---------------------------------------------------------------------------
// Copy

const en = {
  meta: {
    title: 'Rome Taxi & Private Transfers from Fiumicino | Ciao Italian Taxi Service',
    description:
      'Rome taxi and private transfers at a fixed price: Fiumicino and Ciampino pickups, Civitavecchia port runs and a private driver in Rome, 24/7.',
  },
  hero: {
    eyebrow: 'Rome · Lazio',
    h1: 'Rome taxi & private transfer service',
    lead:
      'Pre-booked Rome airport taxi transfers at one fixed price: Fiumicino to Rome taxi rides to your hotel door, Ciampino pickups, Civitavecchia cruise runs and a private driver in Rome by the hour.',
    trust: ['Fixed price before you book', 'Meet & greet in arrivals', 'Flight tracking', 'Available 24/7'],
  },
  form: {
    heading: 'Book your Rome transfer',
    note: 'Free quote. No payment needed now.',
    pickup: 'Pick-up location',
    pickupPh: 'Airport, station, hotel or address',
    dropoff: 'Drop-off location',
    dropoffPh: 'Where are you going?',
    date: 'Date',
    time: 'Time',
    vehicle: 'Vehicle type',
    vehicleNone: 'Suggest the right one',
    phone: 'Phone',
    notes: 'Notes',
    notesPh: 'Flight number, child seats, extra stops',
    returnTrip: 'Return trip',
    returnHint: 'add the return date and time in the notes',
    submit: 'Get my fixed price',
  },
  fleet: {
    eyebrow: 'Fleet',
    heading: 'Premium chauffeur cars in Rome',
    lead: 'Luxury saloons and a luxury van, each with a professional chauffeur, sized to your group and your luggage. Prices are per vehicle, not per person.',
    passengers: 'Passengers',
    bags: 'Bags',
    ac: 'Air conditioning',
    childSeat: 'Child seat on request',
    bestFor: 'Best for',
    from: 'From',
    book: 'Book this vehicle',
    similar: 'Each car is the model shown or a similar premium model of the same class.',
  },
  airports: {
    eyebrow: 'Airports, port & station',
    heading: 'Rome airport transfers',
    lead: 'Your driver tracks the arrival and waits for you with a name board, at the airports, the cruise port and Termini.',
    fare: 'Fixed fare',
    book: 'Book a pickup',
  },
  routes: {
    eyebrow: 'Intercity',
    heading: 'Popular routes from Rome',
    lead: 'Door to door with no changes, luggage in the boot all the way, and stops wherever you like.',
    distance: 'Distance',
    time: 'Approx. time',
    from: 'From',
    book: 'Book',
    note: 'Typical drive times in normal traffic. Allow extra at rush hour and on summer weekends.',
  },
  nearby: {
    eyebrow: 'Nearby',
    heading: 'Major cities near Rome',
    lead: 'Starting somewhere else? We drive between all of these and Rome, both ways.',
    fromRome: 'from Rome',
  },
  why: {
    eyebrow: 'Why us',
    heading: 'Why riders choose Ciao Italian Taxi Service',
    lead: 'Your driver watches your flight, knows the city and quotes one price that does not move.',
    cards: [
      { icon: 'timer' as IconName, title: 'Punctual', body: 'Pickups timed to your real landing time.' },
      { icon: 'shield-check' as IconName, title: 'Safe', body: 'Experienced local drivers, well-kept cars.' },
      { icon: 'tag' as IconName, title: 'Transparent', body: 'Fixed fares, tolls and waiting included.' },
      { icon: 'messages' as IconName, title: '24/7 support', body: 'Requests answered day and night.' },
    ],
    estimateTitle: 'Quick price estimate',
    estimateBody: 'Send your route with the form and get one fixed figure back before you commit to anything.',
    estimateCta: 'Get my estimate',
    videoNote: 'Intro video, 16:9 (provided later)',
  },
  destinations: {
    eyebrow: 'Sights',
    heading: 'Top ==destinations== in Rome',
    lead: 'Where most of our Rome rides end up. We drop you as close as the traffic rules allow.',
    prev: 'Previous destinations',
    next: 'Next destinations',
    label: 'Top destinations in Rome',
  },
  hotels: {
    eyebrow: 'Hotels',
    heading: 'Top ==hotels== in Rome',
    lead: 'Staying at one of these? Tell us and the address is filled in for you. Listed for convenience only, with no partnership implied.',
    type: 'Hotel',
    starsLabel: '{n}-star hotel',
    book: 'Book taxi to this hotel',
    prev: 'Previous hotels',
    next: 'Next hotels',
    label: 'Top hotels in Rome',
  },
  visit: {
    eyebrow: 'Rome',
    heading: 'Why travellers visit Rome',
    body:
      'Few cities stack 2,800 years of history this densely: ancient ruins, Renaissance churches and Baroque piazzas sit a short walk apart. Add some of Italy’s best cooking, the Vatican’s collections and an easy base for day trips, and Rome rewards a first visit and a tenth one alike.',
    chips: [
      { icon: 'landmark' as IconName, label: 'History' },
      { icon: 'utensils' as IconName, label: 'Food' },
      { icon: 'palette' as IconName, label: 'Art' },
      { icon: 'church' as IconName, label: 'Faith' },
    ],
  },
  blog: {
    eyebrow: 'Travel blog',
    heading: 'Rome travel blog',
    lead: 'Practical guides to arriving in Rome and getting around it.',
    read: 'Read the guide',
    all: 'All Rome travel guides',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Rome taxi and transfer questions',
    items: [
      {
        q: 'How much does a Fiumicino to Rome taxi transfer cost with you?',
        a: 'Every transfer has one fixed price per vehicle, quoted before you book and based on your exact address, the vehicle and the time. Tolls, luggage and the included waiting time are in it, so the figure you accept is the figure you pay.',
      },
      {
        q: 'How long will the driver wait at the airport?',
        a: 'We track your flight and time the pickup to the real landing time, so a delay costs you nothing. Waiting time after landing is included, and the exact allowance is written on your confirmation. [[DATA:loc-rome-faq-waiting]]',
      },
      {
        q: 'How do I pay?',
        a: 'Payment methods and any deposit are confirmed in writing with your quote, before you commit to anything. [[TEXT:loc-rome-faq-payment]]',
      },
      {
        q: 'Can you provide child seats?',
        a: 'Yes, at no extra cost. Tell us the children’s ages and weights when you book, and the right seats are fitted before the driver sets off.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'The cancellation terms are stated on your written quote, so you know them before you confirm. [[TEXT:loc-rome-faq-cancellation]]',
      },
      {
        q: 'Do you charge more at night?',
        a: 'No. We run 24 hours a day, and a dawn or midnight transfer costs the same fixed price. There is no night supplement added at the end.',
      },
      {
        q: 'Can we stop on the way from the airport?',
        a: 'Yes. A short stop, for a pharmacy, a key collection or a photo, can be added when you book. Longer stops are quoted as waiting time.',
      },
    ],
  },
  cta: {
    heading: 'Book your Rome taxi',
    body: 'Send the route and the travel date, and we reply with one fixed price, tolls and waiting time included.',
    book: 'Book now',
  },
  /** Sticky phone bar on this page. */
  bookNow: 'Book now',
};

export type RomeCopy = typeof en;

const it: RomeCopy = {
  meta: {
    title: 'Transfer privato Roma e taxi da Fiumicino | Ciao Italian Taxi Service',
    description:
      'Transfer privato a Roma a prezzo fisso: alternativa al taxi da Fiumicino e Ciampino, porto di Civitavecchia e autista privato a Roma, 24 ore su 24.',
  },
  hero: {
    eyebrow: 'Roma · Lazio',
    h1: 'Transfer privato a Roma e taxi dall’aeroporto',
    lead:
      'Transfer prenotati a prezzo fisso, l’alternativa al taxi da Fiumicino a Roma fino alla porta dell’hotel: ritiri a Ciampino, corse al porto di Civitavecchia e un autista privato a Roma anche a ore.',
    trust: ['Prezzo fisso prima di prenotare', 'Accoglienza agli arrivi', 'Volo monitorato', 'Attivi 24 ore su 24'],
  },
  form: {
    heading: 'Prenotate il transfer a Roma',
    note: 'Preventivo gratuito. Nessun pagamento ora.',
    pickup: 'Luogo di partenza',
    pickupPh: 'Aeroporto, stazione, hotel o indirizzo',
    dropoff: 'Destinazione',
    dropoffPh: 'Dove andate?',
    date: 'Data',
    time: 'Ora',
    vehicle: 'Tipo di veicolo',
    vehicleNone: 'Consigliatecelo voi',
    phone: 'Telefono',
    notes: 'Note',
    notesPh: 'Numero di volo, seggiolini, soste',
    returnTrip: 'Viaggio di ritorno',
    returnHint: 'indicate data e ora del ritorno nelle note',
    submit: 'Ricevi il prezzo fisso',
  },
  fleet: {
    eyebrow: 'Flotta',
    heading: 'Auto di lusso con autista a Roma',
    lead: 'Berline di lusso e un van premium, sempre con autista professionista, scelti in base al gruppo e ai bagagli. I prezzi sono per veicolo, non a persona.',
    passengers: 'Passeggeri',
    bags: 'Bagagli',
    ac: 'Aria condizionata',
    childSeat: 'Seggiolino su richiesta',
    bestFor: 'Ideale per',
    from: 'Da',
    book: 'Prenota questo veicolo',
    similar: 'Ogni auto è il modello indicato o un modello premium equivalente della stessa categoria.',
  },
  airports: {
    eyebrow: 'Aeroporti, porto e stazione',
    heading: 'Transfer dagli aeroporti di Roma',
    lead: 'L’autista segue l’arrivo e vi aspetta con un cartello col vostro nome: negli aeroporti, al porto crociere e a Termini.',
    fare: 'Tariffa fissa',
    book: 'Prenota il ritiro',
  },
  routes: {
    eyebrow: 'Tra città',
    heading: 'Tratte più richieste da Roma',
    lead: 'Porta a porta senza cambi, bagagli sempre nel bagagliaio e soste dove volete.',
    distance: 'Distanza',
    time: 'Tempo indicativo',
    from: 'Da',
    book: 'Prenota',
    note: 'Tempi di guida tipici con traffico normale. Calcolate un margine nelle ore di punta e nei weekend estivi.',
  },
  nearby: {
    eyebrow: 'Nei dintorni',
    heading: 'Grandi città vicino a Roma',
    lead: 'Partite da un’altra città? Copriamo tutte queste tratte da e per Roma.',
    fromRome: 'da Roma',
  },
  why: {
    eyebrow: 'Perché noi',
    heading: 'Perché i viaggiatori scelgono Ciao Italian Taxi Service',
    lead: 'L’autista segue il vostro volo, conosce la città e vi dà un prezzo che non cambia.',
    cards: [
      { icon: 'timer' as IconName, title: 'Puntuali', body: 'Ritiro calibrato sull’atterraggio reale.' },
      { icon: 'shield-check' as IconName, title: 'Sicuri', body: 'Autisti locali esperti, auto curate.' },
      { icon: 'tag' as IconName, title: 'Trasparenti', body: 'Tariffe fisse, pedaggi e attesa inclusi.' },
      { icon: 'messages' as IconName, title: 'Assistenza 24/7', body: 'Rispondiamo giorno e notte.' },
    ],
    estimateTitle: 'Preventivo rapido',
    estimateBody: 'Inviate la tratta con il modulo e ricevete un unico prezzo fisso, prima di impegnarvi.',
    estimateCta: 'Chiedi il preventivo',
    videoNote: 'Video di presentazione, 16:9 (in arrivo)',
  },
  destinations: {
    eyebrow: 'Da vedere',
    heading: 'Le ==mete più amate== di Roma',
    lead: 'Dove finiscono quasi tutte le nostre corse a Roma. Vi lasciamo il più vicino possibile, nei limiti del traffico.',
    prev: 'Mete precedenti',
    next: 'Mete successive',
    label: 'Le mete più amate di Roma',
  },
  hotels: {
    eyebrow: 'Hotel',
    heading: 'I ==migliori hotel== di Roma',
    lead: 'Alloggiate in uno di questi? Ditecelo e l’indirizzo viene inserito per voi. Elenco a puro titolo di comodità, senza alcuna partnership.',
    type: 'Hotel',
    starsLabel: 'Hotel {n} stelle',
    book: 'Prenota il taxi per questo hotel',
    prev: 'Hotel precedenti',
    next: 'Hotel successivi',
    label: 'I migliori hotel di Roma',
  },
  visit: {
    eyebrow: 'Roma',
    heading: 'Perché si viene a Roma',
    body:
      'Poche città concentrano 2.800 anni di storia in così poco spazio: rovine antiche, chiese rinascimentali e piazze barocche a pochi passi l’una dall’altra. Aggiungete una delle migliori cucine d’Italia, i Musei Vaticani e una base comoda per le gite, e Roma ripaga la prima visita come la decima.',
    chips: [
      { icon: 'landmark' as IconName, label: 'Storia' },
      { icon: 'utensils' as IconName, label: 'Cucina' },
      { icon: 'palette' as IconName, label: 'Arte' },
      { icon: 'church' as IconName, label: 'Fede' },
    ],
  },
  blog: {
    eyebrow: 'Blog di viaggio',
    heading: 'Blog di viaggio su Roma',
    lead: 'Guide pratiche per arrivare a Roma e muoversi in città.',
    read: 'Leggi la guida',
    all: 'Tutte le guide su Roma',
  },
  faq: {
    eyebrow: 'Domande',
    heading: 'Domande su taxi e transfer a Roma',
    items: [
      {
        q: 'Quanto costa con voi un transfer da Fiumicino a Roma?',
        a: 'Ogni transfer ha un unico prezzo fisso per veicolo, comunicato prima della prenotazione in base all’indirizzo esatto, al veicolo e all’orario. Pedaggi, bagagli e attesa inclusa sono già compresi: la cifra che accettate è quella che pagate.',
      },
      {
        q: 'Quanto aspetta l’autista in aeroporto?',
        a: 'Seguiamo il volo e fissiamo il ritiro sull’orario reale di atterraggio, quindi un ritardo non vi costa nulla. L’attesa dopo l’atterraggio è inclusa e la franchigia esatta è scritta nella conferma. [[DATA:loc-rome-faq-waiting]]',
      },
      {
        q: 'Come si paga?',
        a: 'Metodi di pagamento ed eventuale acconto vengono confermati per iscritto con il preventivo, prima di qualsiasi impegno. [[TEXT:loc-rome-faq-payment]]',
      },
      {
        q: 'Avete seggiolini per bambini?',
        a: 'Sì, senza costi aggiuntivi. Indicateci età e peso dei bambini al momento della prenotazione e i seggiolini giusti saranno montati prima della partenza.',
      },
      {
        q: 'Come funziona la cancellazione?',
        a: 'Le condizioni di cancellazione sono indicate nel preventivo scritto, così le conoscete prima di confermare. [[TEXT:loc-rome-faq-cancellation]]',
      },
      {
        q: 'Di notte costa di più?',
        a: 'No. Lavoriamo 24 ore su 24 e un transfer all’alba o a mezzanotte ha lo stesso prezzo fisso, senza supplementi notturni aggiunti alla fine.',
      },
      {
        q: 'Possiamo fermarci lungo il tragitto dall’aeroporto?',
        a: 'Sì. Una breve sosta, per una farmacia, il ritiro delle chiavi o una foto, si aggiunge al momento della prenotazione. Le soste più lunghe sono quotate come tempo di attesa.',
      },
    ],
  },
  cta: {
    heading: 'Prenotate il vostro taxi a Roma',
    body: 'Inviateci tratta e data del viaggio: rispondiamo con un unico prezzo fisso, pedaggi e attesa inclusi.',
    book: 'Prenota ora',
  },
  bookNow: 'Prenota ora',
};

export const romeCopy: Record<Lang, RomeCopy> = { en, it };

/**
 * Text for FAQPage JSON-LD: the visible answer without its [[PLACEHOLDER]]
 * markers, and with in-text links ([anchor](target)) reduced to their anchor.
 */
export function withoutMarkers(text: string): string {
  return text
    .replace(/\s*\[\[[^\]]+\]\]/g, '')
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .trim();
}

/** "275 km" / "275 km": the same in both languages, but kept in one place. */
export function km(n: number, lang: Lang): string {
  return `${n.toLocaleString(lang === 'en' ? 'en-GB' : 'it-IT')} km`;
}
