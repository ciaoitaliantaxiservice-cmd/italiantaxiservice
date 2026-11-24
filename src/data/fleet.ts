import type { Lang } from './i18n';

/**
 * The one fleet, shared by every page: the homepage "Vehicle types" section,
 * the fleet sections of the location pages (Rome, Milan), the vehicle choice
 * in the contact form and in the location pages' booking forms, and the
 * ?vehicle= pre-selection. Premium and luxury chauffeur cars only (owner
 * decision, 24 Nov 2026): Mercedes-Benz E-Class, S-Class and V-Class, BMW
 * 5 Series and 7 Series. Add or remove a car here and every page follows.
 *
 * Unknown facts stay `null` and render as visible placeholders
 * ([[VEHICLE:s-class-bags]], [[PRICE:s-class-from]]…). Fill them in with real
 * numbers only; they never reach the JSON-LD. Tracked in docs/PLACEHOLDERS.md.
 * Each car is "or similar": the model class is promised, not a specific car.
 */

export type FleetCategory = 'individual' | 'groups' | 'events';

/** Tab order and labels. A tab with no vehicles is not rendered. */
export const fleetCategories: { id: FleetCategory; label: Record<Lang, string> }[] = [
  { id: 'individual', label: { en: 'Individual travel', it: 'Viaggi individuali' } },
  { id: 'groups', label: { en: 'Small groups', it: 'Piccoli gruppi' } },
  { id: 'events', label: { en: 'Events', it: 'Eventi' } },
];

export interface Vehicle {
  /** Stable id: the ?vehicle= value on the booking link and the placeholder prefix. */
  id: string;
  /** Display name per language (Mercedes calls it "Classe S" in Italy). */
  name: Record<Lang, string>;
  /** Class shown above the name on location-page cards. */
  tier: Record<Lang, string>;
  /** Stored in the quote request and shown in the email alert. One language, so alerts read the same. */
  formValue: string;
  /** Booking button label. */
  cta: Record<Lang, string>;
  categories: FleetCategory[];
  description: Record<Lang, string>;
  bestFor: Record<Lang, string>;
  /** Short "best for" tags for the location-page cards. */
  bestTags: Record<Lang, string[]>;
  /** Maximum passengers. null until confirmed. */
  passengers: number | null;
  /** Large suitcases. null until confirmed. */
  suitcases: number | null;
  /** One-way "from" price in EUR. null until confirmed. Never a guess. */
  priceFrom: number | null;
  /**
   * Photo: file name in src/assets/ (no extension) once it exists. Until then
   * the slide shows a placeholder. `altKey` is the row in
   * content/image-alt-text.md, already written so the photo can be briefed to match.
   */
  photo?: string;
  altKey: string;
}

export const fleet: Vehicle[] = [
  {
    // PLACEHOLDER(IMG:vehicle-e-class) PLACEHOLDER(VEHICLE:e-class-pax)
    // PLACEHOLDER(VEHICLE:e-class-bags) PLACEHOLDER(PRICE:e-class-from)
    id: 'e-class',
    name: { en: 'Mercedes-Benz E-Class', it: 'Mercedes-Benz Classe E' },
    tier: { en: 'Business saloon', it: 'Berlina business' },
    formValue: 'Mercedes-Benz E-Class (or similar)',
    cta: { en: 'Book the E-Class', it: 'Prenota la Classe E' },
    categories: ['individual', 'groups', 'events'],
    description: {
      en: 'The all-rounder of our premium fleet. Comfortable for three hours on the autostrada, discreet outside a hotel or a client’s office, and with a boot that takes proper holiday luggage.',
      it: 'La più versatile della nostra flotta premium. Comoda per tre ore di autostrada, discreta davanti a un hotel o all’ufficio di un cliente, con un bagagliaio che accoglie le valigie di una vacanza vera.',
    },
    bestFor: {
      en: 'Airport transfers, city-to-city runs, couples and small families',
      it: 'Transfer aeroportuali, tratte fra città, coppie e piccole famiglie',
    },
    bestTags: { en: ['Airport', 'City', 'Business'], it: ['Aeroporto', 'Città', 'Lavoro'] },
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'mercedes-e-class-chauffeur-car',
  },
  {
    // PLACEHOLDER(IMG:vehicle-5-series) PLACEHOLDER(VEHICLE:5-series-pax)
    // PLACEHOLDER(VEHICLE:5-series-bags) PLACEHOLDER(PRICE:5-series-from)
    id: '5-series',
    name: { en: 'BMW 5 Series', it: 'BMW Serie 5' },
    tier: { en: 'Business saloon', it: 'Berlina business' },
    formValue: 'BMW 5 Series (or similar)',
    cta: { en: 'Book the 5 Series', it: 'Prenota la Serie 5' },
    categories: ['individual', 'groups'],
    description: {
      en: 'A business saloon with a calm, composed ride and a cabin that stays quiet at motorway speed. A strong pick for the longer runs, like Milan to the lakes or Rome to Florence.',
      it: 'Una berlina business dalla guida composta, con un abitacolo che resta silenzioso anche in autostrada. Ideale per le tratte lunghe, come Milano verso i laghi o Roma–Firenze.',
    },
    bestFor: {
      en: 'Business travel and longer journeys between cities',
      it: 'Trasferte di lavoro e lunghe percorrenze fra città',
    },
    bestTags: { en: ['Business', 'Long distance'], it: ['Lavoro', 'Lunghe tratte'] },
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'bmw-5-series-chauffeur-car',
  },
  {
    // PLACEHOLDER(IMG:vehicle-s-class) PLACEHOLDER(VEHICLE:s-class-pax)
    // PLACEHOLDER(VEHICLE:s-class-bags) PLACEHOLDER(PRICE:s-class-from)
    id: 's-class',
    name: { en: 'Mercedes-Benz S-Class', it: 'Mercedes-Benz Classe S' },
    tier: { en: 'First-class saloon', it: 'Berlina di rappresentanza' },
    formValue: 'Mercedes-Benz S-Class (or similar)',
    cta: { en: 'Book the S-Class', it: 'Prenota la Classe S' },
    categories: ['individual', 'events'],
    description: {
      en: 'Our flagship saloon: a quiet, spacious rear cabin made for working, resting or simply watching Italy go by. It is the car we send when the journey should feel like part of the stay.',
      it: 'La nostra ammiraglia: un abitacolo posteriore silenzioso e spazioso, fatto per lavorare, riposare o guardare l’Italia scorrere dal finestrino. È l’auto che mandiamo quando anche il viaggio deve far parte del soggiorno.',
    },
    bestFor: {
      en: 'VIP guests, senior executives, weddings and long-haul arrivals',
      it: 'Ospiti VIP, dirigenti, matrimoni e arrivi da voli intercontinentali',
    },
    bestTags: { en: ['VIP', 'Executives', 'Weddings'], it: ['VIP', 'Dirigenti', 'Matrimoni'] },
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'mercedes-s-class-chauffeur-car',
  },
  {
    // PLACEHOLDER(IMG:vehicle-7-series) PLACEHOLDER(VEHICLE:7-series-pax)
    // PLACEHOLDER(VEHICLE:7-series-bags) PLACEHOLDER(PRICE:7-series-from)
    id: '7-series',
    name: { en: 'BMW 7 Series', it: 'BMW Serie 7' },
    tier: { en: 'First-class saloon', it: 'Berlina di rappresentanza' },
    formValue: 'BMW 7 Series (or similar)',
    cta: { en: 'Book the 7 Series', it: 'Prenota la Serie 7' },
    categories: ['individual', 'events'],
    description: {
      en: 'A first-class saloon with generous rear legroom and a hushed cabin, for the guest who wants to arrive rested. Equally at home at a gala dinner or after an overnight flight.',
      it: 'Una berlina di rappresentanza con ampio spazio per le gambe dietro e un abitacolo ovattato, per l’ospite che vuole arrivare riposato. A suo agio a una cena di gala come dopo un volo notturno.',
    },
    bestFor: {
      en: 'Executives, special occasions and long-haul arrivals',
      it: 'Dirigenti, occasioni speciali e arrivi da voli intercontinentali',
    },
    bestTags: { en: ['Executives', 'Events', 'Long-haul'], it: ['Dirigenti', 'Eventi', 'Voli lunghi'] },
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'bmw-7-series-chauffeur-car',
  },
  {
    // PLACEHOLDER(IMG:vehicle-v-class) PLACEHOLDER(VEHICLE:v-class-pax)
    // PLACEHOLDER(VEHICLE:v-class-bags) PLACEHOLDER(PRICE:v-class-from)
    id: 'v-class',
    name: { en: 'Mercedes-Benz V-Class', it: 'Mercedes-Benz Classe V' },
    tier: { en: 'Luxury van', it: 'Van di lusso' },
    formValue: 'Mercedes-Benz V-Class (or similar)',
    cta: { en: 'Book the V-Class', it: 'Prenota la Classe V' },
    categories: ['groups', 'events'],
    description: {
      en: 'A premium people carrier with facing seats and room for everyone’s luggage, so families and small groups travel together in one car instead of two. A favourite for ski trips, outlet days and Fashion Week teams.',
      it: 'Un van premium con sedili contrapposti e spazio per i bagagli di tutti, così famiglie e piccoli gruppi viaggiano insieme in un’auto sola invece che in due. Il preferito per la neve, le giornate agli outlet e i team della Fashion Week.',
    },
    bestFor: {
      en: 'Families, small groups, events and lots of luggage',
      it: 'Famiglie, piccoli gruppi, eventi e tanti bagagli',
    },
    bestTags: { en: ['Families', 'Groups', 'Events'], it: ['Famiglie', 'Gruppi', 'Eventi'] },
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'mercedes-v-class-chauffeur-car',
  },
];

/** Placeholder ids, shared by EN and IT (see docs/PLACEHOLDERS.md). */
export const vehiclePlaceholderIds = (v: Vehicle) => ({
  img: `vehicle-${v.id}`,
  pax: `${v.id}-pax`,
  bags: `${v.id}-bags`,
  price: `${v.id}-from`,
});

export function vehicleById(id: string): Vehicle | undefined {
  return fleet.find((v) => v.id === id);
}
