/**
 * The icons the site uses, by role. Each maps to one Lucide icon in
 * src/components/Icon.tsx, and only these are imported.
 *
 * The union lives here rather than in the component because .ts modules
 * (the content files) import it without pulling in React.
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
  | 'menu' //         mobile menu button, closed
  | 'close' //        mobile menu button, open (Lucide x)
  | 'chevron-down' // FAQ open/closed marker
  | 'chevron-left' // carousel: previous
  | 'chevron-right' // carousel: next
  | 'users' //        vehicle: passengers
  | 'luggage' //      vehicle: suitcases
  | 'home' // header: home
  | 'book-open' // blog
  | 'star' // hotel star rating
  | 'wifi' // vehicle: Wi-Fi
  | 'air-vent' // vehicle: air conditioning
  | 'baby' // vehicle: child seat
  | 'armchair' // vehicle: comfort level
  | 'landmark' // history / sights
  | 'utensils' // food
  | 'palette' // art
  | 'church' // religion
  | 'play' // video placeholder
  | 'train' // railway station
  | 'ship' // cruise port
  | 'route' // intercity route
  | 'calendar' // date
  | 'hotel' // hotels
  | 'arrow-right' // card link arrow
  | 'timer' // punctual
  | 'shopping-bag' // outlets, shopping
  | 'mountain' // lakes and mountains
  | 'briefcase' // business travel
  | 'building' // trade fairs, business district
  | 'shirt' // fashion
  | 'plus'; // accordion: closed
