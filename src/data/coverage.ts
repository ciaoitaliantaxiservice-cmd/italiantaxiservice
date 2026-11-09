import type { Lang } from './i18n';

/**
 * Places on the contact page's coverage map. Coordinates are WGS84 decimal
 * degrees (city centres; airports at the terminal). The map is centred on
 * Rome; `zoom` is the starting zoom, chosen so Turin and the Amalfi Coast are
 * both in view on a phone.
 */
export interface Place {
  id: string;
  name: Record<Lang, string>;
  lat: number;
  lng: number;
}

export const MAP_CENTER = { lat: 41.9028, lng: 12.4964 }; // Rome
export const MAP_ZOOM = { phone: 5.5, wide: 6 };

export const coverageCities: Place[] = [
  { id: 'rome', name: { en: 'Rome', it: 'Roma' }, lat: 41.9028, lng: 12.4964 },
  { id: 'milan', name: { en: 'Milan', it: 'Milano' }, lat: 45.4642, lng: 9.19 },
  { id: 'florence', name: { en: 'Florence', it: 'Firenze' }, lat: 43.7696, lng: 11.2558 },
  { id: 'venice', name: { en: 'Venice', it: 'Venezia' }, lat: 45.4408, lng: 12.3155 },
  { id: 'naples', name: { en: 'Naples', it: 'Napoli' }, lat: 40.8518, lng: 14.2681 },
  { id: 'amalfi-coast', name: { en: 'Amalfi Coast', it: 'Costiera Amalfitana' }, lat: 40.634, lng: 14.6027 },
  { id: 'bologna', name: { en: 'Bologna', it: 'Bologna' }, lat: 44.4949, lng: 11.3426 },
  { id: 'pisa', name: { en: 'Pisa', it: 'Pisa' }, lat: 43.7228, lng: 10.4017 },
  { id: 'turin', name: { en: 'Turin', it: 'Torino' }, lat: 45.0703, lng: 7.6869 },
  { id: 'verona', name: { en: 'Verona', it: 'Verona' }, lat: 45.4384, lng: 10.9916 },
];

export const coverageAirports: Place[] = [
  { id: 'FCO', name: { en: 'Rome Fiumicino (FCO)', it: 'Roma Fiumicino (FCO)' }, lat: 41.8003, lng: 12.2389 },
  { id: 'CIA', name: { en: 'Rome Ciampino (CIA)', it: 'Roma Ciampino (CIA)' }, lat: 41.7994, lng: 12.5949 },
  { id: 'MXP', name: { en: 'Milan Malpensa (MXP)', it: 'Milano Malpensa (MXP)' }, lat: 45.6306, lng: 8.7281 },
  { id: 'LIN', name: { en: 'Milan Linate (LIN)', it: 'Milano Linate (LIN)' }, lat: 45.4451, lng: 9.2767 },
  { id: 'BGY', name: { en: 'Milan Bergamo (BGY)', it: 'Milano Bergamo (BGY)' }, lat: 45.6739, lng: 9.7042 },
  { id: 'FLR', name: { en: 'Florence Peretola (FLR)', it: 'Firenze Peretola (FLR)' }, lat: 43.81, lng: 11.2051 },
  { id: 'PSA', name: { en: 'Pisa Galilei (PSA)', it: 'Pisa Galilei (PSA)' }, lat: 43.6839, lng: 10.3927 },
  { id: 'BLQ', name: { en: 'Bologna Marconi (BLQ)', it: 'Bologna Marconi (BLQ)' }, lat: 44.5354, lng: 11.2887 },
  { id: 'VCE', name: { en: 'Venice Marco Polo (VCE)', it: 'Venezia Marco Polo (VCE)' }, lat: 45.5053, lng: 12.3519 },
  { id: 'TSF', name: { en: 'Treviso (TSF)', it: 'Treviso (TSF)' }, lat: 45.6484, lng: 12.1944 },
  { id: 'VRN', name: { en: 'Verona Villafranca (VRN)', it: 'Verona Villafranca (VRN)' }, lat: 45.3957, lng: 10.8885 },
  { id: 'TRN', name: { en: 'Turin Caselle (TRN)', it: 'Torino Caselle (TRN)' }, lat: 45.2008, lng: 7.6497 },
  { id: 'NAP', name: { en: 'Naples Capodichino (NAP)', it: 'Napoli Capodichino (NAP)' }, lat: 40.886, lng: 14.2908 },
];
