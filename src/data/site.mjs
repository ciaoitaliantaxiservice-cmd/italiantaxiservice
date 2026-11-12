// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS.
// Every [[PLACEHOLDER]] below must be replaced before launch. See README.md.
// ---------------------------------------------------------------------------

/** Production origin. Drives canonicals, hreflang, OG URLs and sitemap.xml. */
export const SITE_URL = 'https://www.ciaoitaliantaxiservice.com';

/**
 * Quote form backend: Supabase. Each request is inserted as one row in the
 * `quote_requests` table (create it with supabase/quote_requests.sql).
 *
 * The anon / publishable key is public by design: it ships in the browser and
 * Row Level Security only lets it INSERT, never read. Never put the
 * service_role / secret key here.
 *
 * While either value is empty the form still validates, then shows a notice
 * pointing at email instead of silently losing the enquiry.
 */
export const SUPABASE_URL = 'https://zuutmiilqhtqgfvowlns.supabase.co';
/** Publishable key (Supabase dashboard → Project Settings → API Keys). */
export const SUPABASE_ANON_KEY = 'sb_publishable_U44zQo4JW9_4lNq84hYXFQ_bO6ASP7O';
export const SUPABASE_TABLE = 'quote_requests';

export const site = {
  // The business name, exactly as written here, everywhere a name appears:
  // header, footer, copyright line, page titles, meta tags, structured data
  // and email sender names.
  brand: 'Ciao Italian Taxi Service',
  // Copyright line and Organization.legalName: the same name. The site is a
  // lead-generation and booking platform, so it shows no VAT / P.IVA,
  // company registration or licence numbers anywhere (npm run verify
  // enforces this).
  legalName: 'Ciao Italian Taxi Service',

  // Requests come in through the quote form and email only. There is
  // deliberately no phone number, tel: link or WhatsApp anywhere on the site,
  // and no `telephone` in the JSON-LD (npm run verify enforces all three).
  // ImprovMX forwards both addresses to the business Gmail inbox.
  /** General enquiries: "Email us" buttons, footer, contact page, schema. */
  emailInfo: 'info@ciaoitaliantaxiservice.com',
  /** Bookings and quotes: footer, contact page, schema (reservations). */
  emailBooking: 'booking@ciaoitaliantaxiservice.com',

  address: {
    street: '[[STREET ADDRESS]]',
    city: '[[CITY]]',
    region: '[[REGION]]',
    postalCode: '[[POSTCODE]]',
    countryCode: 'IT',
  },

  // Decimal degrees for LocalBusiness geo + the contact-page map embed.
  geo: { lat: '[[LAT]]', lng: '[[LNG]]' },

  // Leave as empty strings until the profiles exist; empty entries are skipped.
  social: { facebook: '', instagram: '', tripadvisor: '' },

  // Opening hours for LocalBusiness: 24 hours, 7 days (bookings and requests
  // are answered round the clock). 00:00-23:59 is schema.org's 24-hour form.
  hours: { opens: '00:00', closes: '23:59' },
};

/** General enquiries (info@). Every "Email us" button uses this. */
export const emailHref = `mailto:${site.emailInfo}`;
/** Bookings (booking@). */
export const bookingHref = `mailto:${site.emailBooking}`;
