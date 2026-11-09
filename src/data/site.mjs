// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS.
// Every [[PLACEHOLDER]] below must be replaced before launch. See README.md.
// ---------------------------------------------------------------------------

/** Production origin. Drives canonicals, hreflang, OG URLs and sitemap.xml. */
export const SITE_URL = 'https://www.ciaoitaliantaxiservice.com';

/**
 * Where the quote form POSTs. Empty string = not wired up yet: the form still
 * validates, but on submit it shows a notice pointing at email instead of
 * silently losing the enquiry.
 *
 * [[SET THIS TO THE FORM ENDPOINT]] — e.g. a Formspree/Basin URL, a Netlify
 * function, or your own /api/quote handler.
 */
export const FORM_ENDPOINT = '';

export const site = {
  brand: 'Ciao Italian Taxi Service',
  // Shown in the footer and used for the Organization legal name.
  legalName: '[[REGISTERED COMPANY NAME]]',
  vatNumber: '[[VAT / P.IVA]]',

  // Requests come in through the quote form and email only. There is
  // deliberately no phone number, tel: link or WhatsApp anywhere on the site,
  // and no `telephone` in the JSON-LD (npm run verify enforces all three).
  email: '[[hello@example.com]]',

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

export const emailHref = `mailto:${site.email}`;
