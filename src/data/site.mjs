// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS.
// Every [[PLACEHOLDER]] below must be replaced before launch. See README.md.
// ---------------------------------------------------------------------------

/** Production origin. Drives canonicals, hreflang, OG URLs and sitemap.xml. */
export const SITE_URL = 'https://www.ciaoitaliantaxiservice.com';

/**
 * Where the quote form POSTs. Empty string = not wired up yet: the form still
 * validates, but on submit it shows a notice pointing at WhatsApp and email
 * instead of silently losing the enquiry.
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

  // E.164 for tel: and WhatsApp links. Keep both in sync.
  phoneE164: '+390000000000',
  phoneDisplay: '[[+39 000 000 0000]]',
  whatsappE164: '390000000000',

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

  // Opening hours for LocalBusiness. 24/7 dispatch is the assumption; confirm.
  hours: { opens: '00:00', closes: '23:59' },
};

/** `tel:` href. */
export const telHref = `tel:${site.phoneE164}`;

/** WhatsApp deep link with a language-appropriate prefilled message. */
export function whatsappHref(lang) {
  const text =
    lang === 'it'
      ? 'Ciao! Vorrei un preventivo per un transfer privato.'
      : 'Hello! I would like a quote for a private transfer.';
  return `https://wa.me/${site.whatsappE164}?text=${encodeURIComponent(text)}`;
}

export const emailHref = `mailto:${site.email}`;
