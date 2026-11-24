/**
 * The Milan location page (/en/locations/milan/, /it/localita/milano/): its
 * shared, language-neutral facts and its copy in both languages.
 *
 * Page id `loc-milan` (docs/seo-site-expansion-playbook.md §2.3). Every
 * placeholder ID below starts with it and is listed in docs/PLACEHOLDERS.md.
 *
 * Keywords (§5.1, owner brief 24 Nov 2026). EN primary: "Milan taxi service";
 * secondary: milan taxi, taxi milan airport, milan airport taxi service, taxi
 * from milan airport, taxi transfer from milan airport, milan bergamo airport
 * taxi service, milan taxi booking online, book a taxi in milan, best taxi
 * service in milan, getting a taxi in milan, milan taxi service number.
 * IT primary: "taxi Milano" / "transfer privato Milano"; secondary: taxi
 * Malpensa Milano, taxi Linate, taxi Orio al Serio Milano, autista privato
 * Milano, prenotare un taxi a Milano.
 *
 * Distances and drive times are typical road figures in normal traffic.
 * Prices are placeholders until the owner sets them; none is invented.
 *
 * `it` is typed as `typeof en`, so a key missing from either language fails
 * the build instead of falling back to the other one.
 */
import type { Lang } from './i18n';
import type { IconName } from './icons';
import type { Gateway, NearbyCity, Destination, Hotel } from './rome';

type L = Record<Lang, string>;

export const MILAN_ID = 'loc-milan';

// ---------------------------------------------------------------------------
// Airports and the main station. Fares: PLACEHOLDER(PRICE:loc-milan-{id}-from).
// Airport pages are not built yet: see TODO-LINKS.md.

export const milanGateways: Gateway[] = [
  {
    id: 'mxp',
    icon: 'plane',
    name: { en: 'Milan Malpensa Airport', it: 'Aeroporto di Milano Malpensa' },
    code: 'MXP',
    distance: { en: 'About 50 km to the centre · 50–60 min', it: 'Circa 50 km dal centro · 50–60 min' },
    chips: {
      en: ['Terminal 1 and Terminal 2', 'Flight tracking', 'Meet & greet in arrivals'],
      it: ['Terminal 1 e Terminal 2', 'Volo monitorato', 'Accoglienza agli arrivi'],
    },
    pickup: { en: 'Milan Malpensa Airport (MXP)', it: 'Aeroporto di Milano Malpensa (MXP)' },
  },
  {
    id: 'lin',
    icon: 'plane',
    name: { en: 'Milan Linate Airport', it: 'Aeroporto di Milano Linate' },
    code: 'LIN',
    distance: { en: 'About 8 km to the centre · 20–30 min', it: 'Circa 8 km dal centro · 20–30 min' },
    chips: {
      en: ['The city airport', 'Flight tracking', 'Meet & greet in arrivals'],
      it: ['L’aeroporto di città', 'Volo monitorato', 'Accoglienza agli arrivi'],
    },
    pickup: { en: 'Milan Linate Airport (LIN)', it: 'Aeroporto di Milano Linate (LIN)' },
  },
  {
    id: 'bgy',
    icon: 'plane',
    name: { en: 'Milan Bergamo Airport (Orio al Serio)', it: 'Aeroporto di Bergamo Orio al Serio' },
    code: 'BGY',
    distance: { en: 'About 50 km to central Milan · 50–60 min', it: 'Circa 50 km dal centro di Milano · 50–60 min' },
    chips: {
      en: ['Early and late flights', 'Flight tracking', 'Meet & greet in arrivals'],
      it: ['Voli all’alba e a tarda sera', 'Volo monitorato', 'Accoglienza agli arrivi'],
    },
    pickup: { en: 'Milan Bergamo Airport (BGY)', it: 'Aeroporto di Bergamo Orio al Serio (BGY)' },
  },
  {
    id: 'centrale',
    icon: 'train',
    name: { en: 'Milano Centrale station', it: 'Stazione di Milano Centrale' },
    code: 'RAIL',
    distance: { en: 'In the city · 10–25 min to most hotels', it: 'In città · 10–25 min dalla maggior parte degli hotel' },
    chips: {
      en: ['Train tracking', 'Meet & greet on the concourse', 'Help with luggage'],
      it: ['Treno monitorato', 'Accoglienza in stazione', 'Aiuto con i bagagli'],
    },
    pickup: { en: 'Milano Centrale station', it: 'Stazione di Milano Centrale' },
  },
];

// ---------------------------------------------------------------------------
// Intercity routes and day trips, grouped. Prices:
// PLACEHOLDER(PRICE:loc-milan-route-{id}-from). Route pages: TODO-LINKS.md.

export type MilanRouteGroup = 'lakes' | 'outlets' | 'cities';

export interface MilanRoute {
  id: string;
  group: MilanRouteGroup;
  to: L;
  km: number;
  time: L;
}

export const milanRouteGroups: { id: MilanRouteGroup; icon: IconName; title: L; line: L }[] = [
  {
    id: 'lakes',
    icon: 'mountain',
    title: { en: 'Lakes & Switzerland', it: 'Laghi e Svizzera' },
    line: { en: 'Lake Como, Lake Maggiore and over the border to Lugano.', it: 'Lago di Como, Lago Maggiore e oltre confine fino a Lugano.' },
  },
  {
    id: 'outlets',
    icon: 'shopping-bag',
    title: { en: 'Outlet shopping', it: 'Shopping negli outlet' },
    line: { en: 'A day at the outlets, with the boot free for the bags.', it: 'Una giornata agli outlet, con il bagagliaio libero per gli acquisti.' },
  },
  {
    id: 'cities',
    icon: 'route',
    title: { en: 'City to city', it: 'Da città a città' },
    line: { en: 'Door to door across northern Italy, with no changes.', it: 'Porta a porta nel Nord Italia, senza cambi.' },
  },
];

export const milanRoutes: MilanRoute[] = [
  { id: 'como', group: 'lakes', to: { en: 'Como', it: 'Como' }, km: 50, time: { en: '1 h', it: '1 h' } },
  { id: 'bellagio', group: 'lakes', to: { en: 'Bellagio', it: 'Bellagio' }, km: 80, time: { en: '1 h 30 min', it: '1 h 30 min' } },
  { id: 'stresa', group: 'lakes', to: { en: 'Stresa (Lake Maggiore)', it: 'Stresa (Lago Maggiore)' }, km: 90, time: { en: '1 h 15 min', it: '1 h 15 min' } },
  { id: 'lugano', group: 'lakes', to: { en: 'Lugano, Switzerland', it: 'Lugano, Svizzera' }, km: 80, time: { en: '1 h 15 min', it: '1 h 15 min' } },
  { id: 'serravalle', group: 'outlets', to: { en: 'Serravalle Designer Outlet', it: 'Serravalle Designer Outlet' }, km: 105, time: { en: '1 h 15 min', it: '1 h 15 min' } },
  { id: 'fidenza', group: 'outlets', to: { en: 'Fidenza Village', it: 'Fidenza Village' }, km: 110, time: { en: '1 h 15 min', it: '1 h 15 min' } },
  { id: 'franciacorta', group: 'outlets', to: { en: 'Franciacorta Village', it: 'Franciacorta Village' }, km: 85, time: { en: '1 h', it: '1 h' } },
  { id: 'turin', group: 'cities', to: { en: 'Turin', it: 'Torino' }, km: 140, time: { en: '1 h 45 min', it: '1 h 45 min' } },
  { id: 'verona', group: 'cities', to: { en: 'Verona', it: 'Verona' }, km: 160, time: { en: '1 h 50 min', it: '1 h 50 min' } },
  { id: 'venice', group: 'cities', to: { en: 'Venice', it: 'Venezia' }, km: 275, time: { en: '3 h', it: '3 h' } },
];

// ---------------------------------------------------------------------------
// Nearby cities. No pages yet, so href="#": see TODO-LINKS.md.

export const milanNearby: NearbyCity[] = [
  { id: 'monza', name: { en: 'Monza', it: 'Monza' }, region: { en: 'Lombardy', it: 'Lombardia' }, km: 20 },
  { id: 'pavia', name: { en: 'Pavia', it: 'Pavia' }, region: { en: 'Lombardy', it: 'Lombardia' }, km: 40 },
  { id: 'como', name: { en: 'Como', it: 'Como' }, region: { en: 'Lombardy', it: 'Lombardia' }, km: 50 },
  { id: 'bergamo', name: { en: 'Bergamo', it: 'Bergamo' }, region: { en: 'Lombardy', it: 'Lombardia' }, km: 50 },
  { id: 'lugano', name: { en: 'Lugano', it: 'Lugano' }, region: { en: 'Ticino, Switzerland', it: 'Canton Ticino, Svizzera' }, km: 80 },
  { id: 'brescia', name: { en: 'Brescia', it: 'Brescia' }, region: { en: 'Lombardy', it: 'Lombardia' }, km: 95 },
  { id: 'turin', name: { en: 'Turin', it: 'Torino' }, region: { en: 'Piedmont', it: 'Piemonte' }, km: 140 },
  { id: 'verona', name: { en: 'Verona', it: 'Verona' }, region: { en: 'Veneto', it: 'Veneto' }, km: 160 },
];

// ---------------------------------------------------------------------------
// Top destinations in Milan. No pages yet, so href="#": see TODO-LINKS.md.
// Photos: PLACEHOLDER(IMG:loc-milan-dest-{id}).

export const milanDestinations: Destination[] = [
  {
    id: 'duomo',
    name: { en: 'Duomo di Milano', it: 'Duomo di Milano' },
    line: {
      en: 'Begun in 1386: walk the marble rooftop among the spires, with the Alps on a clear day.',
      it: 'Iniziato nel 1386: si cammina sulle terrazze di marmo tra le guglie, con le Alpi nelle giornate limpide.',
    },
    altKey: 'milan-duomo-cathedral-rooftop',
  },
  {
    id: 'galleria',
    name: { en: 'Galleria Vittorio Emanuele II', it: 'Galleria Vittorio Emanuele II' },
    line: {
      en: 'The glass-roofed 19th-century arcade between the Duomo and La Scala.',
      it: 'La galleria ottocentesca con la volta di vetro, tra il Duomo e la Scala.',
    },
    altKey: 'milan-galleria-vittorio-emanuele',
  },
  {
    id: 'last-supper',
    name: { en: 'The Last Supper', it: 'Il Cenacolo' },
    line: {
      en: 'Leonardo’s mural at Santa Maria delle Grazie. Book entry well ahead.',
      it: 'Il capolavoro di Leonardo a Santa Maria delle Grazie. Prenotate l’ingresso con largo anticipo.',
    },
    altKey: 'milan-santa-maria-delle-grazie',
  },
  {
    id: 'navigli',
    name: { en: 'Navigli', it: 'Navigli' },
    line: {
      en: 'Canal-side evenings, aperitivo bars and a monthly antiques market.',
      it: 'Serate lungo i canali, l’aperitivo e il mercatino dell’antiquariato una volta al mese.',
    },
    altKey: 'milan-navigli-canal',
  },
  {
    id: 'brera',
    name: { en: 'Brera', it: 'Brera' },
    line: {
      en: 'Cobbled lanes, small galleries and the Old Masters of the Pinacoteca.',
      it: 'Vie acciottolate, piccole gallerie e i grandi maestri della Pinacoteca.',
    },
    altKey: 'milan-brera-district',
  },
  {
    id: 'porta-nuova',
    name: { en: 'Porta Nuova', it: 'Porta Nuova' },
    line: {
      en: 'The new skyline: the Bosco Verticale towers and Piazza Gae Aulenti.',
      it: 'Lo skyline nuovo: il Bosco Verticale e piazza Gae Aulenti.',
    },
    altKey: 'milan-porta-nuova-bosco-verticale',
  },
  {
    id: 'castello',
    name: { en: 'Castello Sforzesco', it: 'Castello Sforzesco' },
    line: {
      en: 'The Sforza castle, home to Michelangelo’s last sculpture.',
      it: 'Il castello degli Sforza, che custodisce l’ultima scultura di Michelangelo.',
    },
    altKey: 'milan-castello-sforzesco',
  },
  {
    id: 'scala',
    name: { en: 'Teatro alla Scala', it: 'Teatro alla Scala' },
    line: {
      en: 'The world-famous opera house, with a museum open by day.',
      it: 'Il teatro d’opera più celebre al mondo, con il museo aperto di giorno.',
    },
    altKey: 'milan-teatro-alla-scala',
  },
];

// ---------------------------------------------------------------------------
// Hotels we are often asked to drive to. Listed for convenience only: no
// partnership is implied. List and star ratings to confirm:
// PLACEHOLDER(VERIFY:loc-milan-hotels). Photos: PLACEHOLDER(IMG:loc-milan-hotel-{id}).

export const milanHotels: Hotel[] = [
  { id: 'four-seasons', name: 'Four Seasons Hotel Milano', area: { en: 'Quadrilatero della Moda', it: 'Quadrilatero della Moda' }, stars: 5, altKey: 'milan-hotel-four-seasons' },
  { id: 'park-hyatt', name: 'Park Hyatt Milano', area: { en: 'Galleria and Duomo', it: 'Galleria e Duomo' }, stars: 5, altKey: 'milan-hotel-park-hyatt' },
  { id: 'armani', name: 'Armani Hotel Milano', area: { en: 'Via Manzoni', it: 'Via Manzoni' }, stars: 5, altKey: 'milan-hotel-armani' },
  { id: 'mandarin', name: 'Mandarin Oriental, Milan', area: { en: 'Brera', it: 'Brera' }, stars: 5, altKey: 'milan-hotel-mandarin-oriental' },
  { id: 'bulgari', name: 'Bulgari Hotel Milano', area: { en: 'Brera', it: 'Brera' }, stars: 5, altKey: 'milan-hotel-bulgari' },
  { id: 'palazzo-parigi', name: 'Palazzo Parigi', area: { en: 'Porta Nuova', it: 'Porta Nuova' }, stars: 5, altKey: 'milan-hotel-palazzo-parigi' },
  { id: 'principe', name: 'Hotel Principe di Savoia', area: { en: 'Piazza della Repubblica', it: 'Piazza della Repubblica' }, stars: 5, altKey: 'milan-hotel-principe-di-savoia' },
  { id: 'gallia', name: 'Excelsior Hotel Gallia', area: { en: 'Milano Centrale', it: 'Milano Centrale' }, stars: 5, altKey: 'milan-hotel-excelsior-gallia' },
];

// ---------------------------------------------------------------------------
// Copy

const en = {
  meta: {
    title: 'Milan Taxi Service & Airport Transfers | Ciao Italian Taxi Service',
    description:
      'Milan taxi service at a fixed price: Malpensa, Linate and Bergamo airport transfers, Fiera Milano runs and Lake Como trips by private chauffeur, 24/7.',
  },
  hero: {
    eyebrow: 'Milan · Lombardy',
    h1: 'Milan taxi service & private airport transfers',
    lead:
      'A Milan taxi service you book online at one fixed price: a premium car and a professional chauffeur for Malpensa, Linate and Bergamo airport transfers, Fiera Milano and Fashion Week days, and trips out to Lake Como, the outlets and Lugano.',
    trust: ['Fixed price before you book', 'Flight tracking', 'Meet & greet in arrivals', 'Available 24/7'],
  },
  form: {
    heading: 'Book a taxi in Milan online',
    note: 'Milan taxi booking online: free quote, no payment now.',
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
    eyebrow: 'Premium fleet',
    heading: 'Luxury chauffeur cars in Milan',
    lead: 'Business and first-class saloons and a luxury van, each driven by a professional chauffeur. One price per vehicle, not per person.',
    passengers: 'Passengers',
    bags: 'Bags',
    ac: 'Air conditioning',
    childSeat: 'Child seat on request',
    bestFor: 'Best for',
    from: 'From',
    book: 'Book this car',
    similar: 'Each car is the model shown or a similar premium model of the same class.',
  },
  airports: {
    eyebrow: 'Airports & station',
    heading: 'Milan airport taxi service',
    lead: 'A taxi transfer from Milan airport with a chauffeur who tracks your flight, waits in arrivals with your name and takes you straight to your door. Bergamo included.',
    fare: 'Fixed fare to central Milan',
    book: 'Book a pickup',
  },
  routes: {
    eyebrow: 'Beyond the city',
    heading: 'Day trips and routes from Milan',
    lead: 'Lakes, outlets and cities across the north, door to door, with stops wherever you like.',
    distance: 'Distance',
    time: 'Approx. time',
    from: 'From',
    book: 'Book',
    note: 'Typical drive times in normal traffic. Allow extra at rush hour, on Friday evenings and on summer weekends towards the lakes. Lugano is in Switzerland: bring a passport or ID card.',
  },
  nearby: {
    eyebrow: 'Nearby',
    heading: 'Cities near Milan',
    lead: 'Starting somewhere else in Lombardy or over the border? We drive between all of these and Milan, both ways.',
    fromMilan: 'from Milan',
  },
  why: {
    eyebrow: 'Why us',
    heading: 'The best taxi service in Milan is the one already waiting for you',
    lead: 'Getting a taxi in Milan is easy for short hops. For airports, meetings and early flights, a pre-booked chauffeur takes the guesswork out.',
    reasons: [
      { icon: 'timer' as IconName, title: 'Timed to your flight', body: 'We track the landing at Malpensa, Linate or Bergamo, so a delay never costs you extra.' },
      { icon: 'briefcase' as IconName, title: 'Business-ready', body: 'Discreet drivers, quiet cars and pickups set around your meetings and trade-fair hours.' },
      { icon: 'tag' as IconName, title: 'One fixed price', body: 'Tolls, luggage and the included waiting time are in the figure you accept.' },
      { icon: 'map-pin' as IconName, title: 'Local know-how', body: 'Drivers who know the Area C hours, the Malpensa terminals and the hotel side entrances.' },
    ],
    estimateTitle: 'Quick price estimate',
    estimateBody: 'Send your route and get one fixed figure back before you commit to anything.',
    estimateCta: 'Get my estimate',
    videoNote: 'Intro video, 16:9 (provided later)',
  },
  destinations: {
    eyebrow: 'Sights',
    heading: 'Top ==destinations== in Milan',
    lead: 'Where our Milan rides end up most often. We drop you as close as Area C and the pedestrian streets allow.',
    label: 'Top destinations in Milan',
  },
  hotels: {
    eyebrow: 'Hotels',
    heading: 'Top ==hotels== in Milan',
    lead: 'Staying at one of these? Tap the button and the address is filled in for you. Listed for convenience only, with no partnership implied.',
    starsLabel: '{n}-star hotel',
    book: 'Book a car to this hotel',
    label: 'Top hotels in Milan',
  },
  visit: {
    eyebrow: 'Milan',
    heading: 'Why travellers visit Milan',
    body:
      'Milan works hard and lives well. Leonardo’s Last Supper and the Duomo share the centre with the fashion houses of the Quadrilatero, the Navigli fill up at aperitivo time, and La Scala still sets the standard for opera. It is also the gateway to the lakes, the Alps and Switzerland, all within two hours by car.',
    chips: [
      { icon: 'shirt' as IconName, label: 'Fashion' },
      { icon: 'palette' as IconName, label: 'Art & design' },
      { icon: 'utensils' as IconName, label: 'Food' },
      { icon: 'mountain' as IconName, label: 'Lakes' },
    ],
    eventsHeading: 'Milan for business and events',
    events: [
      {
        icon: 'shirt' as IconName,
        title: 'Fashion Week',
        body: 'Shows across the city in February and September. Book a car by the hour so you can move between venues without waiting for a taxi.',
      },
      {
        icon: 'building' as IconName,
        title: 'Fiera Milano, Rho',
        body: 'The trade-fair grounds north-west of the city, home to the Salone del Mobile and many other shows. Drop-offs at the gate closest to your hall.',
      },
      {
        icon: 'briefcase' as IconName,
        title: 'Porta Nuova and CityLife',
        body: 'The business districts, with office towers and hotels a short drive from Centrale and Linate.',
      },
    ],
  },
  blog: {
    eyebrow: 'Travel blog',
    heading: 'Milan travel guides',
    lead: 'Getting a taxi in Milan, airport transfers compared, fares explained and the best day trips by car.',
    read: 'Read the guide',
    all: 'All travel guides',
    featured: 'Start here',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Milan taxi questions, answered',
    lead: 'The questions we hear most from people arriving in Milan. Anything else, ask us with the booking form.',
    ask: 'Ask us a question',
    items: [
      {
        q: 'How to order a taxi in Milan?',
        a: 'There are three ways. Take a white city taxi from an official rank (at the airports, Milano Centrale and the main squares), call a radio-taxi line or use a taxi app, or pre-book a private transfer. With us you book online: send the [booking form](milan#quote-form) with the route, date and time and we reply by email with one fixed price. Looking for a Milan taxi service number? We take bookings in writing rather than by phone, so every detail is confirmed before you travel.',
      },
      {
        q: 'What is the best taxi service in Milan?',
        a: 'It depends on the trip. For a short ride across the centre, the nearest city taxi rank is hard to beat. For airport runs, early flights, heavy luggage, groups or a full day of meetings, a pre-booked chauffeur is usually the better choice: the price is fixed in advance, the driver tracks your flight and meets you in arrivals, and the car is a premium saloon or van. That is the service we run.',
      },
      {
        q: 'Is a taxi or Uber cheaper in Milan?',
        a: 'Usually neither is the cheap option you may know from other countries. In Italy, Uber does not offer rides with private drivers: in Milan the app books premium cars with professional chauffeurs, or a regular city taxi, so it is rarely cheaper than a taxi from the rank, and app prices change with demand. A metered taxi depends on traffic. A pre-booked transfer has one fixed price per vehicle, which often works out cheaper per person for families and groups. [[VERIFY:loc-milan-faq-uber]]',
      },
      {
        q: 'Which taxi service works in Milan?',
        a: 'Milan’s white city taxis work around the clock from ranks, by phone and through apps, and they serve all three airports. Ride-hailing apps work too, with professional drivers only. Pre-booked private transfer services, like ours, cover the same airports plus Milano Centrale, Fiera Milano in Rho and longer trips to Lake Como, the outlets and Switzerland, at a price agreed before you travel.',
      },
      {
        q: 'Are taxis expensive in Milan?',
        a: 'Short rides in the centre are reasonable, but the meter adds up in traffic and on longer runs: the fare starts with a fixed charge that varies by time of day and adds a rate per kilometre and per minute. City taxis apply a flat fare between Malpensa and Milan, while Linate and Bergamo rides are generally metered. Our guide to [Milan taxi fares](post:milan-taxi-fares) explains the details and when a fixed-price transfer costs less. [[VERIFY:loc-milan-faq-flat-fare]]',
      },
      {
        q: 'Does Uber operate in Milan?',
        a: 'Yes, but not as the ride-sharing service known in many other countries. Private individuals cannot drive for it in Italy. In Milan the app connects you with professional chauffeurs in premium cars and, in some cases, with regular city taxis. Read [taxi or Uber in Milan](post:milan-taxi-or-uber) for a full comparison. [[VERIFY:loc-milan-faq-uber]]',
      },
      {
        q: 'How long will the driver wait at Malpensa or Linate?',
        a: 'We track your flight and set the pickup to the real landing time, so a delay costs you nothing. Waiting time after landing is included, and the exact allowance is written on your confirmation. [[DATA:loc-milan-faq-waiting]]',
      },
      {
        q: 'Can you cover Fashion Week or a trade fair at Fiera Milano?',
        a: 'Yes. Book a car and chauffeur by the hour or by the day, with pickups between hotel, venues and dinners. These weeks fill up early, so send your dates as soon as you have them.',
      },
    ],
  },
  cta: {
    heading: 'Book your Milan taxi transfer',
    body: 'Send the route and the travel date, and we reply with one fixed price, tolls and waiting time included.',
    book: 'Book now',
  },
  /** Sticky phone bar on this page. */
  bookNow: 'Book now',
};

export type MilanCopy = typeof en;

const it: MilanCopy = {
  meta: {
    title: 'Taxi Milano e transfer privato dagli aeroporti | Ciao Italian Taxi Service',
    description:
      'Taxi a Milano a prezzo fisso: transfer privato da Malpensa, Linate e Orio al Serio, corse in Fiera a Rho e gite sul Lago di Como con autista, 24 ore su 24.',
  },
  hero: {
    eyebrow: 'Milano · Lombardia',
    h1: 'Taxi a Milano e transfer privato con autista',
    lead:
      'L’alternativa al taxi a Milano che prenotate online a prezzo fisso: auto premium e autista professionista per i transfer da Malpensa, Linate e Orio al Serio, le giornate in Fiera e alla Fashion Week, le gite sul Lago di Como, agli outlet e a Lugano.',
    trust: ['Prezzo fisso prima di prenotare', 'Volo monitorato', 'Accoglienza agli arrivi', 'Attivi 24 ore su 24'],
  },
  form: {
    heading: 'Prenotate online il taxi a Milano',
    note: 'Preventivo gratuito, nessun pagamento ora.',
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
    eyebrow: 'Flotta premium',
    heading: 'Auto di lusso con autista a Milano',
    lead: 'Berline business e di rappresentanza e un van di lusso, sempre con autista professionista. Un prezzo per veicolo, non a persona.',
    passengers: 'Passeggeri',
    bags: 'Bagagli',
    ac: 'Aria condizionata',
    childSeat: 'Seggiolino su richiesta',
    bestFor: 'Ideale per',
    from: 'Da',
    book: 'Prenota quest’auto',
    similar: 'Ogni auto è il modello indicato o un modello premium equivalente della stessa categoria.',
  },
  airports: {
    eyebrow: 'Aeroporti e stazione',
    heading: 'Taxi dagli aeroporti di Milano',
    lead: 'Un transfer dall’aeroporto con autista che segue il volo, vi aspetta agli arrivi con il vostro nome e vi porta fino alla porta. Anche da Bergamo Orio al Serio.',
    fare: 'Tariffa fissa per il centro di Milano',
    book: 'Prenota il ritiro',
  },
  routes: {
    eyebrow: 'Fuori città',
    heading: 'Gite e tratte da Milano',
    lead: 'Laghi, outlet e città del Nord, porta a porta, con soste dove volete.',
    distance: 'Distanza',
    time: 'Tempo indicativo',
    from: 'Da',
    book: 'Prenota',
    note: 'Tempi di guida tipici con traffico normale. Calcolate un margine nelle ore di punta, il venerdì sera e nei weekend estivi verso i laghi. Lugano è in Svizzera: portate passaporto o carta d’identità.',
  },
  nearby: {
    eyebrow: 'Nei dintorni',
    heading: 'Città vicino a Milano',
    lead: 'Partite da un’altra città lombarda o da oltre confine? Copriamo tutte queste tratte da e per Milano.',
    fromMilan: 'da Milano',
  },
  why: {
    eyebrow: 'Perché noi',
    heading: 'Il miglior servizio a Milano? Quello che vi sta già aspettando',
    lead: 'Per i brevi spostamenti in centro il taxi va benissimo. Per aeroporti, riunioni e voli all’alba, un autista prenotato vi toglie ogni pensiero.',
    reasons: [
      { icon: 'timer' as IconName, title: 'Sul vostro volo', body: 'Seguiamo l’atterraggio a Malpensa, Linate o Orio al Serio: un ritardo non vi costa nulla.' },
      { icon: 'briefcase' as IconName, title: 'Pronti per il lavoro', body: 'Autisti discreti, auto silenziose e ritiri sugli orari di riunioni e fiere.' },
      { icon: 'tag' as IconName, title: 'Un prezzo fisso', body: 'Pedaggi, bagagli e attesa inclusa sono già nella cifra che accettate.' },
      { icon: 'map-pin' as IconName, title: 'Conoscono Milano', body: 'Orari di Area C, terminal di Malpensa e ingressi laterali degli hotel: li conoscono a memoria.' },
    ],
    estimateTitle: 'Preventivo rapido',
    estimateBody: 'Inviate la tratta e ricevete un unico prezzo fisso, prima di impegnarvi.',
    estimateCta: 'Chiedi il preventivo',
    videoNote: 'Video di presentazione, 16:9 (in arrivo)',
  },
  destinations: {
    eyebrow: 'Da vedere',
    heading: 'Le ==mete più belle== di Milano',
    lead: 'Dove finiscono più spesso le nostre corse a Milano. Vi lasciamo il più vicino possibile, nei limiti di Area C e delle zone pedonali.',
    label: 'Le mete più belle di Milano',
  },
  hotels: {
    eyebrow: 'Hotel',
    heading: 'I ==migliori hotel== di Milano',
    lead: 'Alloggiate in uno di questi? Premete il pulsante e l’indirizzo viene inserito per voi. Elenco a puro titolo di comodità, senza alcuna partnership.',
    starsLabel: 'Hotel {n} stelle',
    book: 'Prenota l’auto per questo hotel',
    label: 'I migliori hotel di Milano',
  },
  visit: {
    eyebrow: 'Milano',
    heading: 'Perché si viene a Milano',
    body:
      'Milano lavora sodo e vive bene. Il Cenacolo di Leonardo e il Duomo condividono il centro con le maison del Quadrilatero, i Navigli si riempiono all’ora dell’aperitivo e la Scala resta il riferimento per l’opera. Ed è la porta dei laghi, delle Alpi e della Svizzera, tutti a meno di due ore d’auto.',
    chips: [
      { icon: 'shirt' as IconName, label: 'Moda' },
      { icon: 'palette' as IconName, label: 'Arte e design' },
      { icon: 'utensils' as IconName, label: 'Cucina' },
      { icon: 'mountain' as IconName, label: 'Laghi' },
    ],
    eventsHeading: 'Milano per lavoro ed eventi',
    events: [
      {
        icon: 'shirt' as IconName,
        title: 'Fashion Week',
        body: 'Sfilate in tutta la città a febbraio e settembre. Prenotate un’auto a ore e passate da una location all’altra senza aspettare un taxi.',
      },
      {
        icon: 'building' as IconName,
        title: 'Fiera Milano, Rho',
        body: 'Il polo fieristico a nord-ovest della città, sede del Salone del Mobile e di tante altre fiere. Vi lasciamo all’ingresso più vicino al vostro padiglione.',
      },
      {
        icon: 'briefcase' as IconName,
        title: 'Porta Nuova e CityLife',
        body: 'I quartieri degli affari, con torri di uffici e hotel a pochi minuti da Centrale e da Linate.',
      },
    ],
  },
  blog: {
    eyebrow: 'Blog di viaggio',
    heading: 'Guide di viaggio su Milano',
    lead: 'Come prendere un taxi a Milano, i transfer dagli aeroporti a confronto, le tariffe spiegate e le gite più belle in auto.',
    read: 'Leggi la guida',
    all: 'Tutte le guide di viaggio',
    featured: 'Da leggere prima',
  },
  faq: {
    eyebrow: 'Domande',
    heading: 'Taxi a Milano: le risposte',
    lead: 'Le domande che ci fanno più spesso i viaggiatori in arrivo a Milano. Per tutto il resto, scriveteci con il modulo.',
    ask: 'Fateci una domanda',
    items: [
      {
        q: 'Come si prenota un taxi a Milano?',
        a: 'I modi sono tre. Prendere un taxi bianco a un posteggio ufficiale (negli aeroporti, a Milano Centrale e nelle piazze principali), chiamare un radiotaxi o usare un’app, oppure prenotare in anticipo un transfer privato. Con noi si prenota online: inviate il [modulo di prenotazione](milan#quote-form) con tratta, data e ora e vi rispondiamo via email con un unico prezzo fisso. Cercate un numero di telefono? Prendiamo le prenotazioni per iscritto, non al telefono, così ogni dettaglio è confermato prima della partenza.',
      },
      {
        q: 'Qual è il miglior servizio taxi a Milano?',
        a: 'Dipende dal viaggio. Per una corsa breve in centro, il posteggio taxi più vicino è imbattibile. Per aeroporti, voli all’alba, molti bagagli, gruppi o una giornata di riunioni, di solito conviene un autista prenotato: il prezzo è fissato prima, l’autista segue il volo e vi accoglie agli arrivi, e l’auto è una berlina o un van premium. È il servizio che offriamo.',
      },
      {
        q: 'A Milano costa meno il taxi o Uber?',
        a: 'Di solito nessuno dei due è l’opzione economica che si trova in altri Paesi. In Italia Uber non offre corse con autisti privati: a Milano l’app prenota auto premium con autisti professionisti oppure un normale taxi, quindi raramente costa meno di un taxi preso al posteggio, e i prezzi in app cambiano con la domanda. Il taxi a tassametro dipende dal traffico. Un transfer prenotato ha un unico prezzo fisso per veicolo, spesso più conveniente a persona per famiglie e gruppi. [[VERIFY:loc-milan-faq-uber]]',
      },
      {
        q: 'Quali servizi taxi funzionano a Milano?',
        a: 'I taxi bianchi del Comune funzionano 24 ore su 24, ai posteggi, al telefono e tramite app, e servono tutti e tre gli aeroporti. Funzionano anche le app di trasporto, solo con autisti professionisti. I servizi di transfer privato su prenotazione, come il nostro, coprono gli stessi aeroporti più Milano Centrale, la Fiera di Rho e i viaggi più lunghi verso il Lago di Como, gli outlet e la Svizzera, con un prezzo concordato prima di partire.',
      },
      {
        q: 'I taxi a Milano sono cari?',
        a: 'Le corse brevi in centro hanno prezzi ragionevoli, ma nel traffico e sulle tratte lunghe il tassametro sale: la tariffa parte da una quota fissa che varia secondo l’orario e aggiunge un importo al chilometro e al minuto. Tra Malpensa e Milano i taxi applicano una tariffa fissa, mentre da Linate e da Bergamo di norma si paga a tassametro. La nostra guida alle [tariffe dei taxi a Milano](post:milan-taxi-fares) spiega i dettagli e quando un transfer a prezzo fisso costa meno. [[VERIFY:loc-milan-faq-flat-fare]]',
      },
      {
        q: 'Uber funziona a Milano?',
        a: 'Sì, ma non come il servizio di ride sharing diffuso in molti altri Paesi: in Italia i privati non possono guidare per Uber. A Milano l’app vi mette in contatto con autisti professionisti su auto premium e, in alcuni casi, con i normali taxi. Leggete [taxi o Uber a Milano](post:milan-taxi-or-uber) per un confronto completo. [[VERIFY:loc-milan-faq-uber]]',
      },
      {
        q: 'Quanto aspetta l’autista a Malpensa o a Linate?',
        a: 'Seguiamo il volo e fissiamo il ritiro sull’orario reale di atterraggio, quindi un ritardo non vi costa nulla. L’attesa dopo l’atterraggio è inclusa e la franchigia esatta è scritta nella conferma. [[DATA:loc-milan-faq-waiting]]',
      },
      {
        q: 'Potete seguirci durante la Fashion Week o una fiera a Rho?',
        a: 'Sì. Prenotate auto e autista a ore o a giornata, con spostamenti tra hotel, location e cene. Quelle settimane si riempiono presto: inviateci le date appena le avete.',
      },
    ],
  },
  cta: {
    heading: 'Prenotate il vostro transfer a Milano',
    body: 'Inviateci tratta e data del viaggio: rispondiamo con un unico prezzo fisso, pedaggi e attesa inclusi.',
    book: 'Prenota ora',
  },
  bookNow: 'Prenota ora',
};

export const milanCopy: Record<Lang, MilanCopy> = { en, it };
