import type { Lang } from './i18n';

/**
 * The fleet shown in the homepage "Vehicle types" section, and the vehicle
 * choices in the quote form. Add a vehicle (e.g. a Mercedes-Benz V-Class van
 * for the "Small groups" tab) by adding one entry here: the section, its
 * tabs, the form's "Preferred vehicle" list and the ?vehicle= pre-selection
 * all read from this list.
 *
 * Unknown facts stay `null` and render as visible placeholders
 * ([[VEHICLE:s-class-pax]], [[PRICE:s-class-from]]…). Fill them in with real
 * numbers only; they never reach the JSON-LD. Tracked in docs/PLACEHOLDERS.md.
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
  /** Stored in the quote request and shown in the email alert. One language, so alerts read the same. */
  formValue: string;
  /** Booking button label. */
  cta: Record<Lang, string>;
  categories: FleetCategory[];
  description: Record<Lang, string>;
  bestFor: Record<Lang, string>;
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
    // PLACEHOLDER(IMG:vehicle-s-class) PLACEHOLDER(VEHICLE:s-class-pax)
    // PLACEHOLDER(VEHICLE:s-class-bags) PLACEHOLDER(PRICE:s-class-from)
    id: 's-class',
    name: { en: 'Mercedes-Benz S-Class', it: 'Mercedes-Benz Classe S' },
    formValue: 'Mercedes-Benz S-Class',
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
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'mercedes-s-class-chauffeur-car',
  },
  {
    // PLACEHOLDER(IMG:vehicle-e-class) PLACEHOLDER(VEHICLE:e-class-pax)
    // PLACEHOLDER(VEHICLE:e-class-bags) PLACEHOLDER(PRICE:e-class-from)
    id: 'e-class',
    name: { en: 'Mercedes-Benz E-Class', it: 'Mercedes-Benz Classe E' },
    formValue: 'Mercedes-Benz E-Class',
    cta: { en: 'Book the E-Class', it: 'Prenota la Classe E' },
    categories: ['individual', 'groups', 'events'],
    description: {
      en: 'The all-rounder of the fleet. Comfortable for three hours on the autostrada, discreet outside a hotel or a client’s office, and with a boot that takes proper holiday luggage.',
      it: 'La più versatile della flotta. Comoda per tre ore di autostrada, discreta davanti a un hotel o all’ufficio di un cliente, con un bagagliaio che accoglie le valigie di una vacanza vera.',
    },
    bestFor: {
      en: 'Airport transfers, city-to-city runs, couples and small families',
      it: 'Transfer aeroportuali, tratte fra città, coppie e piccole famiglie',
    },
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'mercedes-e-class-chauffeur-car',
  },
  {
    // PLACEHOLDER(IMG:vehicle-a-class) PLACEHOLDER(VEHICLE:a-class-pax)
    // PLACEHOLDER(VEHICLE:a-class-bags) PLACEHOLDER(PRICE:a-class-from)
    id: 'a-class',
    name: { en: 'Mercedes-Benz A-Class', it: 'Mercedes-Benz Classe A' },
    formValue: 'Mercedes-Benz A-Class',
    cta: { en: 'Book the A-Class', it: 'Prenota la Classe A' },
    categories: ['individual'],
    description: {
      en: 'Compact and easy to manoeuvre, made for historic centres, narrow coast roads and tight hotel entrances. A smart choice when you travel light and want to be dropped close to the door.',
      it: 'Compatta e agile, pensata per centri storici, strade costiere strette e ingressi d’albergo difficili. La scelta giusta se viaggiate leggeri e volete scendere il più vicino possibile alla porta.',
    },
    bestFor: {
      en: 'Solo travellers and couples with light luggage',
      it: 'Chi viaggia da solo o in coppia con bagaglio leggero',
    },
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'mercedes-a-class-chauffeur-car',
  },
  {
    // PLACEHOLDER(IMG:vehicle-5-series) PLACEHOLDER(VEHICLE:5-series-pax)
    // PLACEHOLDER(VEHICLE:5-series-bags) PLACEHOLDER(PRICE:5-series-from)
    id: '5-series',
    name: { en: 'BMW 5 Series', it: 'BMW Serie 5' },
    formValue: 'BMW 5 Series',
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
    passengers: null,
    suitcases: null,
    priceFrom: null,
    altKey: 'bmw-5-series-chauffeur-car',
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
