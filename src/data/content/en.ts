// English page copy. Written independently of src/data/content/it.ts —
// the two are not translations of each other and must not be merged.

export const en = {
  home: {
    heroLead:
      'One car, one driver, one agreed price. We arrange private transfers and chauffeured rides between Italian airports, cities and coastlines, so the travelling part of your trip stops being the part you worry about.',
    heroTrust: [
      'Fixed quote before you book',
      'Flight and train times tracked',
      'English-speaking drivers',
      'Child seats on request',
    ],

    servicesHeading: 'Three ways people use us',
    services: [
      {
        title: 'Airport and port transfers',
        body:
          'We meet you in arrivals with a name board and carry the bags. If the flight slips, the pickup slides with it at no extra charge, because we watch the arrival board rather than the clock.',
        points: ['Meet-and-greet inside the terminal', 'Waiting time included', 'Cruise terminal drop-offs'],
      },
      {
        title: 'City-to-city journeys',
        body:
          'Rome to Florence, Milan to the lakes, Naples down the coast. A direct run, door to door, with room to stop for lunch or a viewpoint if the mood takes you.',
        points: ['No changes, no platforms', 'Luggage never leaves the car', 'Stops you choose en route'],
      },
      {
        title: 'Private driver days',
        body:
          'The car and driver stay with you for the day. Useful for vineyards, hill towns and anywhere a return train would decide your schedule for you.',
        points: ['Half or full days', 'Itinerary built with you', 'Driver waits at every stop'],
      },
    ],

    howHeading: 'How a booking actually goes',
    how: [
      {
        title: 'Tell us the route',
        body: 'Pickup, destination, date, time and how many of you there are. Thirty seconds on the form or a WhatsApp message.',
      },
      {
        title: 'We quote a fixed price',
        body: 'One figure covering the vehicle, driver, tolls and waiting time. If something would push it up, we say so before you commit.',
      },
      {
        title: 'You confirm, we handle the rest',
        body: 'You get the driver’s name and number the day before, and a single contact to call if anything changes.',
      },
    ],

    routesHeading: 'Frequently requested routes',
    routesLead:
      'Indicative journeys to give you a sense of distance and timing. Every quote is built for your exact pickup address and party size.',
    routes: [
      { from: 'Fiumicino Airport (FCO)', to: 'Rome city centre', time: 'approx. 45 min', price: '[[PRICE]]' },
      { from: 'Malpensa Airport (MXP)', to: 'Milan city centre', time: 'approx. 50 min', price: '[[PRICE]]' },
      { from: 'Florence', to: 'Siena and Chianti (full day)', time: 'up to 8 hrs', price: '[[PRICE]]' },
      { from: 'Naples Airport (NAP)', to: 'Positano', time: 'approx. 1 hr 45 min', price: '[[PRICE]]' },
      { from: 'Venice Airport (VCE)', to: 'Piazzale Roma', time: 'approx. 25 min', price: '[[PRICE]]' },
      { from: 'Rome', to: 'Florence (direct)', time: 'approx. 3 hrs 15 min', price: '[[PRICE]]' },
    ],
    routesNote:
      'Journey times assume normal traffic and are not guarantees. Prices are per vehicle, not per passenger.',

    whyHeading: 'Why people come back',
    why: [
      {
        title: 'The price you were quoted',
        body: 'No meter, no surge, no surprise airport supplement at the end of the ride.',
      },
      {
        title: 'Drivers who live there',
        body: 'They know which gate your terminal actually uses and where a coach cannot turn around.',
      },
      {
        title: 'One thread, one person',
        body: 'Your booking stays with the same contact instead of restarting with every message.',
      },
      {
        title: 'Vehicles sized to the road',
        body: 'A minivan is wrong for the Amalfi Coast in August. We will tell you that before you book it.',
      },
    ],

    faqHeading: 'Questions we get asked',
    faq: [
      {
        q: 'How far ahead should I book?',
        a: 'Two to three days is comfortable for a standard airport run. For July and August on the Amalfi Coast, for full-day hires, or for anything needing a larger vehicle, give us a week or more.',
      },
      {
        q: 'What happens if my flight is delayed?',
        a: 'We track the flight number you give us and move the pickup to the new arrival time. Waiting time is included for the period stated in your confirmation, and we will tell you clearly what happens beyond it.',
      },
      {
        q: 'Is the quote per person or per vehicle?',
        a: 'Per vehicle. The figure covers the car, the driver, motorway tolls and the included waiting time, so four passengers pay the same as one on the same route.',
      },
      {
        q: 'Where exactly will the driver meet me at the airport?',
        a: 'Inside the terminal, in the arrivals hall, holding a board with your name. Your confirmation names the specific meeting point for that terminal, and the driver’s mobile number is on it.',
      },
      {
        q: 'Can you provide child seats?',
        a: 'Yes, at no extra cost, but we need to know the ages and weights of the children when you book so the right seat is fitted before the driver sets off.',
      },
      {
        q: 'How do I pay?',
        a: 'Payment methods and any deposit terms are confirmed in writing with your quote. [[CONFIRM ACCEPTED PAYMENT METHODS AND DEPOSIT POLICY]]',
      },
    ],
  },

  locations: {
    lead:
      'We work across the stretch of Italy where most visitors actually travel: the airport cities, the art capitals and the coast roads between them. Pick an area to see the airports, ports and stations we cover there.',
    secondary:
      'Not on the list? Long one-way runs and multi-day itineraries are often straightforward to arrange, and crossing a regional border rarely changes the price much. Send us the route and we will tell you plainly whether we are the right people for it.',
    gridHeading: 'Cities and areas',
    comingSoonLabel: 'Detail page in progress',
    ctaHeading: 'Working out a route?',
    ctaBody:
      'Send us the pickup point and destination and we will come back with a fixed figure and a realistic journey time.',
  },

  about: {
    storyHeading: 'Where this started',
    story: [
      'Ciao Italian Taxi Service began with a complaint that anyone who has landed in Italy at midnight will recognise: the car that was booked, confirmed and paid for was not there, and nobody answered the phone.',
      '[[FOUNDER NAME]] had spent [[NUMBER]] years driving visitors between [[CITIES]] and had watched the same thing happen to other people’s guests. The fix was not a bigger fleet. It was a small group of drivers who answer their phones, and one price agreed before anyone gets in the car.',
      'Today we coordinate [[NUMBER]] drivers across [[REGIONS]]. We are deliberately not the cheapest option, and we are deliberately not the largest.',
    ],

    valuesHeading: 'What we hold ourselves to',
    values: [
      {
        title: 'Say the real number first',
        body: 'The quote includes tolls, waiting time and the drive back out of wherever we have taken you. If a route carries a cost we cannot predict, we name it as a possibility rather than discovering it together later.',
      },
      {
        title: 'Local knowledge over fleet size',
        body: 'We would rather turn a job down than send a driver somewhere they do not know. A driver guessing at a coastal road in high season costs you more than the fare.',
      },
      {
        title: 'Answer the phone',
        body: 'Someone picks up. On the day you travel, that matters more than any other promise on this page.',
      },
      {
        title: 'Match the car to the road',
        body: 'Vehicle choice is a safety and timing decision, not an upsell. Sometimes the right answer is a smaller car, and sometimes it is two of them.',
      },
    ],

    trustHeading: 'The practical details',
    trust: [
      { label: 'Operating since', value: '[[YEAR]]' },
      { label: 'Drivers in the network', value: '[[NUMBER]]' },
      { label: 'Regions covered', value: '[[REGIONS]]' },
      { label: 'Languages spoken', value: 'English, Italian, [[OTHER LANGUAGES]]' },
      { label: 'Registered office', value: '[[CITY, COUNTRY]]' },
      { label: 'VAT number', value: '[[VAT / P.IVA]]' },
    ],
    trustNote:
      'Every bracketed item above is a placeholder waiting on a verified fact. Nothing on this site states a rating, a review count or a figure we have not confirmed.',

    teamHeading: 'How the drivers are chosen',
    team: [
      'Drivers join the network by referral, and we ride with them before they carry a guest. We check documents, insurance and vehicle condition at onboarding and again every [[INTERVAL]]. [[DESCRIBE THE VETTING STEPS YOU ACTUALLY PERFORM]]',
      'Guests travel with the same driver for the whole booking wherever scheduling allows. On multi-day itineraries that is usually possible, and we will say so upfront when it is not.',
    ],
  },

  contact: {
    lead:
      'The form is the fastest route to a price, because it asks for the four things we need in order to quote. If you would rather talk it through, the phone and WhatsApp details below reach the same team.',
    formHeading: 'Request a quote',
    formNote:
      'We reply within [[RESPONSE TIME]] during office hours. Nothing is confirmed until you have a written quote from us.',
    methodsHeading: 'Other ways to reach us',
    hoursHeading: 'When we answer',
    hoursBody:
      'Office hours: [[OPENING HOURS]]. Drivers on the road are reachable at any hour for journeys already booked.',
    mapHeading: 'Where we are based',
    mapNote:
      'Map placeholder. [[EMBED A MAP OF THE REGISTERED OFFICE, OR REMOVE THIS SECTION IF THERE IS NO PUBLIC OFFICE]]',
    addressHeading: 'Registered address',
    responseHeading: 'Before you write',
    responseBody:
      'Including your flight or train number, the exact pickup address and the number of large suitcases gets you an accurate price first time instead of a round of questions.',
  },

  form: {
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone or WhatsApp number',
    pickup: 'Pickup address, airport or station',
    dropoff: 'Destination',
    date: 'Date of travel',
    time: 'Pickup time',
    passengers: 'Passengers',
    luggage: 'Large suitcases',
    service: 'What do you need?',
    serviceOptions: [
      'Airport or port transfer',
      'City-to-city journey',
      'Private driver day',
      'Something else',
    ],
    flight: 'Flight or train number',
    flightHelp: 'Optional, but it lets us track delays and hold the car.',
    notes: 'Anything else we should know',
    notesHelp: 'Child seats, mobility needs, extra stops, oversized luggage.',
    optional: 'optional',
    required: 'required',
    submit: 'Send my request',
    consent:
      'I agree to Ciao Italian Taxi Service using these details to prepare and send my quote.',
    errors: {
      name: 'Please enter your name so we know who to reply to.',
      email: 'Please enter a valid email address, for example name@example.com.',
      phone: 'Please enter a phone number we can reach you on.',
      pickup: 'Please tell us where the journey starts.',
      dropoff: 'Please tell us where the journey ends.',
      date: 'Please choose the date you are travelling.',
      consent: 'We need your agreement before we can use these details.',
      summary: 'Please fix the following before sending:',
    },
    unconfigured:
      'This form is not connected to a mailbox yet. Please send these details by WhatsApp or email using the buttons above and we will reply the same way.',
    success: 'Thank you. Your request is with us and we will reply with a fixed quote.',
  },

  cta: {
    heading: 'Know where you are going?',
    body: 'Send us the route and we will come back with one fixed price, including tolls and waiting time.',
    note: 'No payment details needed to get a quote.',
  },

  notFound: {
    lead: 'The page you asked for is not here. It may have moved, or the link may have had a typo in it.',
    linksHeading: 'Try one of these instead',
  },
};
