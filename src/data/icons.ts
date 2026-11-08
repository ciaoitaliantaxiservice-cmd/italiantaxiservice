/**
 * The icons the site uses, by role. Each maps to one Lucide icon in
 * src/components/Icon.astro, and only these are imported.
 *
 * The union lives here rather than in the component because .ts modules
 * (the content files) import it, and Vite will not type-strip an .astro
 * frontmatter when it is pulled in from plain TypeScript.
 */
export type IconName =
  | 'check' //        hero checklist
  | 'tag' //          price / get a quote
  | 'map-pin' //      locations, local knowledge
  | 'car' //          vehicles, city-to-city
  | 'clock' //        time, driver days
  | 'plane' //        airport transfers
  | 'shield-check' // reliability
  | 'messages' //     one contact for the whole booking
  | 'mail' //         email
  | 'whatsapp' //    WhatsApp (Lucide message-circle)
  | 'menu' //         mobile menu button, closed
  | 'close' //        mobile menu button, open (Lucide x)
  | 'chevron-down'; // FAQ open/closed marker
