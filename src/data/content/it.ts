// Copia italiana, scritta in italiano e non tradotta dall'inglese.
// Struttura, esempi e domande frequenti sono diversi da src/data/content/en.ts
// perché il pubblico italiano arriva con esigenze diverse (fattura, ZTL,
// trasferte di lavoro, eventi) rispetto al visitatore straniero.
//
// NOTA REDAZIONALE: non usare mai la sigla "NCC" né la parola "licenza" in
// questi testi. Si parla di "transfer privati" e "auto con autista".

import type { IconName } from '../icons';

export const it = {
  home: {
    heroLead:
      'Un’auto, un autista, una tariffa concordata prima di partire. Organizziamo transfer privati e servizi con autista fra aeroporti, città e coste italiane, con un preventivo scritto e nessun supplemento a sorpresa alla fine del viaggio.',
    heroTrust: [
      'Attivi 24 ore su 24',
      'Tariffa fissa concordata',
      'Monitoraggio di voli e treni',
      'Autisti della zona',
      'Fattura su richiesta',
    ],

    servicesHeading: 'I servizi più richiesti',
    services: [
      {
        icon: 'plane' as IconName,
        title: 'Trasferimenti aeroportuali e portuali',
        body:
          'Vi aspettiamo in arrivi con il cartello nominativo e ci occupiamo dei bagagli. Se il volo slitta, slitta anche il ritiro: seguiamo il numero del volo, non l’orologio.',
        points: ['Accoglienza dentro il terminal', 'Attesa inclusa', 'Imbarchi e porti crociere'],
      },
      {
        icon: 'car' as IconName,
        title: 'Trasferte di lavoro',
        body:
          'Per chi si muove fra sedi, fiere e appuntamenti nella stessa giornata. L’autista resta a disposizione fra una tappa e l’altra e il riepilogo delle corse arriva a fine mese.',
        points: ['Auto a disposizione a ore', 'Riepilogo mensile', 'Fattura elettronica'],
      },
      {
        icon: 'map-pin' as IconName,
        title: 'Eventi e occasioni',
        body:
          'Matrimoni, cerimonie e cene fuori città, quando serve coordinare più vetture e più orari senza che nessuno debba mettersi a guidare al ritorno.',
        points: ['Più vetture coordinate', 'Orari concordati', 'Un referente unico'],
      },
    ],

    howHeading: 'Come funziona, in concreto',
    how: [
      {
        title: 'Ci dite la tratta',
        body: 'Punto di ritiro, destinazione, data, ora e numero di passeggeri. Dal modulo o con una breve email.',
      },
      {
        title: 'Riceve un preventivo scritto',
        body: 'Una cifra sola che comprende vettura, autista, pedaggi e attesa inclusa. Se qualcosa può farla salire, lo diciamo prima.',
      },
      {
        title: 'Confermate e ce ne occupiamo noi',
        body: 'Il giorno prima riceve nome e numero dell’autista, più un referente da chiamare se cambia qualcosa.',
      },
    ],

    routesHeading: 'Tratte richieste più spesso',
    routesLead:
      'Alcuni esempi per dare un’idea di distanze e tempi. Ogni preventivo viene costruito sull’indirizzo esatto di ritiro e sul numero di persone.',
    routes: [
      { from: 'Aeroporto di Fiumicino (FCO)', to: 'Roma centro', time: 'circa 45 min', price: '[[TARIFFA]]' },
      { from: 'Aeroporto di Malpensa (MXP)', to: 'Milano centro', time: 'circa 50 min', price: '[[TARIFFA]]' },
      { from: 'Milano', to: 'Lago di Como', time: 'circa 1 h 15', price: '[[TARIFFA]]' },
      { from: 'Aeroporto di Napoli (NAP)', to: 'Sorrento', time: 'circa 1 h 15', price: '[[TARIFFA]]' },
      { from: 'Firenze', to: 'Chianti (giornata intera)', time: 'fino a 8 h', price: '[[TARIFFA]]' },
      { from: 'Aeroporto di Venezia (VCE)', to: 'Piazzale Roma', time: 'circa 25 min', price: '[[TARIFFA]]' },
    ],
    routesNote:
      'I tempi indicati valgono in condizioni di traffico normali e non sono garantiti. Le tariffe sono per vettura e non per passeggero.',

    whyHeading: 'Perché ci richiamano',
    why: [
      {
        icon: 'tag' as IconName,
        title: 'La cifra resta quella',
        body: 'Nessun tassametro, nessuna maggiorazione dell’ultimo momento, nessun supplemento aeroportuale scoperto a fine corsa.',
      },
      {
        icon: 'map-pin' as IconName,
        title: 'Autisti che vivono lì',
        body: 'Sanno da quale uscita del terminal si guadagna tempo e in quali vicoli un van semplicemente non entra.',
      },
      {
        icon: 'messages' as IconName,
        title: 'Un solo referente',
        body: 'La prenotazione resta alla stessa persona: non serve rispiegare tutto da capo a ogni messaggio.',
      },
      {
        icon: 'shield-check' as IconName,
        title: 'Documenti in ordine',
        body: 'Fattura elettronica, riepiloghi per la contabilità e condizioni messe per scritto prima della conferma.',
      },
    ],

    faqHeading: 'Domande frequenti',
    faq: [
      {
        q: 'Viaggiate anche di notte e all’alba?',
        a: 'Sì. Siamo attivi 24 ore su 24, 7 giorni su 7: voli all’alba, treni a tarda sera e arrivi a mezzanotte alla stessa tariffa fissa, senza supplementi notturni aggiunti alla fine. Prenotate in anticipo e l’autista vi aspetta all’arrivo.',
      },
      {
        q: 'Il preventivo è per persona o per vettura?',
        a: 'Per vettura. La cifra comprende l’auto, l’autista, i pedaggi autostradali e l’attesa inclusa, quindi quattro passeggeri pagano quanto uno sulla stessa tratta.',
      },
      {
        q: 'Rilasciate fattura?',
        a: 'Sì. Emettiamo fattura elettronica su richiesta: basta indicare in fase di prenotazione ragione sociale, partita IVA e codice destinatario o PEC. Per chi viaggia spesso prepariamo un riepilogo mensile delle corse.',
      },
      {
        q: 'Potete entrare nelle zone a traffico limitato?',
        a: 'Dipende dal comune e dalla fascia oraria. Verifichiamo la ZTL dell’indirizzo prima di confermare e, se l’accesso non è possibile, concordiamo un punto di ritiro a pochi passi anziché farlo scoprire all’autista sul posto.',
      },
      {
        q: 'Quanto tempo prima conviene prenotare?',
        a: 'Due o tre giorni bastano per un trasferimento aeroportuale ordinario. Per luglio e agosto in costiera, per le giornate a disposizione, per gli eventi con più vetture o quando serve un veicolo grande, meglio una settimana o più.',
      },
      {
        q: 'Come si paga?',
        a: 'I metodi accettati e le eventuali condizioni di acconto vengono confermati per scritto insieme al preventivo. [[CONFERMARE METODI DI PAGAMENTO E POLITICA DI ACCONTO]]',
      },
      {
        q: 'Si possono portare animali o bagagli ingombranti?',
        a: 'Di norma sì, ma va detto in fase di prenotazione. Trasportino, sacca da golf, passeggino, sacca da sci o custodia per strumenti musicali cambiano la vettura da assegnare, e preferiamo saperlo prima che a bagagliaio aperto.',
      },
    ],
  },

  locations: {
    lead:
      'Lavoriamo sulle tratte che ci vengono chieste più spesso: i grandi aeroporti, le città d’arte e le strade costiere che le collegano. Scegliete un’area per vedere aeroporti, porti e stazioni che copriamo.',
    secondary:
      'La vostra destinazione non è in elenco? Le tratte lunghe di sola andata e gli itinerari su più giorni si organizzano spesso senza difficoltà, e passare da una regione all’altra incide poco sulla tariffa. Scriveteci la tratta e vi diciamo con chiarezza se siamo le persone giuste.',
    gridHeading: 'Città e aree servite',
    comingSoonLabel: 'Pagina in preparazione',
    ctaHeading: 'Dovete organizzare un percorso?',
    ctaBody:
      'Indicate punto di ritiro e destinazione: rispondiamo con una cifra fissa e un tempo di percorrenza realistico.',
  },

  about: {
    storyHeading: 'Come è nata',
    story: [
      'Ciao Italian Taxi Service nasce da una lamentela che chiunque sia atterrato in Italia a mezzanotte riconoscerà: l’auto prenotata, confermata e pagata non c’era, e al telefono non rispondeva nessuno.',
      '[[NOME DEL FONDATORE]] aveva passato [[NUMERO]] anni a portare in giro ospiti fra [[CITTÀ]] e aveva visto la stessa scena ripetersi con i clienti di altri. La soluzione non era una flotta più grande: era un gruppo ristretto di autisti che rispondono al telefono e una tariffa concordata prima che qualcuno salga in macchina.',
      'Oggi coordiniamo [[NUMERO]] autisti in [[REGIONI]]. Non siamo i più economici, e non vogliamo essere i più grandi.',
    ],

    valuesHeading: 'Come lavoriamo',
    values: [
      {
        title: 'La cifra vera, subito',
        body: 'Nel preventivo ci sono pedaggi, attesa inclusa e il rientro dell’auto. Se una tratta ha un costo che non possiamo prevedere, lo segnaliamo come possibilità invece di scoprirlo insieme più tardi.',
      },
      {
        title: 'Conoscere la strada conta più della flotta',
        body: 'Preferiamo rinunciare a un servizio piuttosto che mandare un autista dove non è mai stato. Un autista che tira a indovinare su una costiera ad agosto vi costa più della corsa.',
      },
      {
        title: 'Al telefono risponde una persona',
        body: 'Qualcuno risponde. Il giorno della partenza questo conta più di qualsiasi altra promessa scritta in questa pagina.',
      },
      {
        title: 'Conti in chiaro',
        body: 'Fattura, riepiloghi e condizioni per scritto. Chi viaggia per lavoro deve poter passare tutto all’amministrazione senza rincorrere nessuno.',
      },
    ],

    trustHeading: 'I dati essenziali',
    trust: [
      { label: 'Attivi dal', value: '[[ANNO]]' },
      { label: 'Autisti nella rete', value: '[[NUMERO]]' },
      { label: 'Regioni coperte', value: '[[REGIONI]]' },
      { label: 'Lingue parlate', value: 'Italiano, inglese, [[ALTRE LINGUE]]' },
      { label: 'Sede legale', value: '[[CITTÀ, PAESE]]' },
    ],
    trustNote:
      'Ogni voce fra parentesi quadre è un segnaposto in attesa di un dato verificato. In questo sito non compaiono valutazioni, numeri di recensioni o cifre che non abbiamo confermato.',

    teamHeading: 'Come scegliamo gli autisti',
    team: [
      'Gli autisti entrano nella rete su segnalazione e viaggiamo con loro prima di affidargli un ospite. Controlliamo documenti, copertura assicurativa e stato della vettura all’ingresso e poi ogni [[INTERVALLO]]. [[DESCRIVERE LE VERIFICHE EFFETTIVAMENTE SVOLTE]]',
      'Quando gli orari lo permettono, chi viaggia resta con lo stesso autista per tutta la prenotazione. Sugli itinerari di più giorni di solito è possibile, e quando non lo è lo diciamo prima.',
    ],
  },

  contact: {
    lead:
      'Vi serve un transfer privato in Italia? Evitate la coda del taxi all’aeroporto di Fiumicino o Ciampino, prenotate un servizio con autista tra una città e l’altra o il transfer da Napoli alla Costiera Amalfitana. Compilate il modulo per una tariffa fissa: rispondiamo 24 ore su 24, 7 giorni su 7.',
    formHeading: 'Richiedete un preventivo per il transfer privato',
    formNote:
      'Rispondiamo entro [[TEMPO DI RISPOSTA]], di giorno e di notte. Niente è confermato finché non avete un preventivo scritto da noi.',
    methodsHeading: 'Preferite l’email?',
    methodsNote:
      'Scriveteci tratta, data e numero di passeggeri. Modulo e casella di posta sono gestiti dalle stesse persone.',
    hoursHeading: 'Aperti 24 ore su 24, 7 giorni su 7',
    hoursBody:
      'Accettiamo prenotazioni e rispondiamo alle richieste 24 ore su 24, 7 giorni su 7. Per i servizi già prenotati gli autisti sono raggiungibili a qualsiasi ora.',
    hoursMore:
      'Vi serve un servizio taxi 24 ore in Italia per un volo all’alba o un treno a tarda sera? I nostri transfer privati sono attivi giorno e notte: prenotate in anticipo e l’auto vi aspetta all’arrivo.',
    addressHeading: 'Sede legale',
    responseHeading: 'Prima di scriverci',
    responseBody:
      'Indicare numero del volo o del treno, indirizzo esatto di ritiro e quanti bagagli grandi ci sono fa arrivare una cifra precisa al primo scambio, invece di un giro di domande.',
    coverage: {
      eyebrow: 'Copertura',
      heading: 'La nostra copertura in Italia',
      intro:
        'Transfer privati e servizio con autista da Roma a Milano, Firenze, Venezia, Napoli e Costiera Amalfitana, oltre a Bologna, Pisa, Torino e Verona, con ritiri in tutti i principali aeroporti.',
      cardKicker: 'FCO · CIA',
      cardTitle: 'Transfer da Fiumicino e Ciampino',
      cardBody:
        'Al posto della fila per il taxi all’aeroporto di Fiumicino, l’autista vi aspetta agli arrivi con un cartello col vostro nome, segue il volo e vi porta fino a destinazione.',
      cardCta: 'Richiedi un preventivo',
      mapLabel: 'Mappa dell’Italia con le città e gli aeroporti serviti',
      citiesLabel: 'Le città che serviamo',
      airportsLabel: 'Gli aeroporti che serviamo',
    },
  },

  form: {
    name: 'Nome e cognome',
    email: 'Indirizzo email',
    phone: 'Telefono',
    pickup: 'Indirizzo di ritiro, aeroporto o stazione',
    dropoff: 'Destinazione',
    date: 'Data del viaggio',
    time: 'Ora del ritiro',
    passengers: 'Passeggeri',
    luggage: 'Bagagli grandi',
    service: 'Di cosa avete bisogno?',
    serviceOptions: [
      'Trasferimento aeroporto o porto',
      'Tratta fra due città',
      'Auto a disposizione a giornata',
      'Evento o cerimonia',
    ],
    flight: 'Numero del volo o del treno',
    flightHelp: 'Facoltativo, ma ci permette di seguire i ritardi e trattenere la vettura.',
    notes: 'Altro che dovremmo sapere',
    notesHelp: 'Seggiolini, esigenze di mobilità, tappe aggiuntive, bagagli ingombranti, fattura.',
    optional: 'facoltativo',
    required: 'obbligatorio',
    submit: 'Invia la richiesta',
    consent:
      'Acconsento all’uso di questi dati da parte di Ciao Italian Taxi Service per preparare e inviare il preventivo.',
    errors: {
      name: 'Inserite il vostro nome, così sappiamo a chi rispondere.',
      email: 'Inserite un indirizzo email valido, ad esempio nome@esempio.it.',
      phone: 'Inserite un numero di telefono al quale possiamo raggiungervi.',
      pickup: 'Indicate da dove parte il viaggio.',
      dropoff: 'Indicate dove termina il viaggio.',
      date: 'Scegliete la data del viaggio.',
      consent: 'Senza il vostro consenso non possiamo usare questi dati.',
      summary: 'Correggete questi punti prima di inviare:',
    },
    unconfigured:
      'Il modulo non è ancora collegato a una casella di posta. Inviate questi dati via email all’indirizzo indicato in questa pagina: vi rispondiamo allo stesso modo.',
    failed:
      'Non è stato possibile inviare la richiesta. Riprovate tra poco oppure inviateci i dati via email all’indirizzo indicato in questa pagina.',
    success: 'Grazie. La richiesta è arrivata e vi risponderemo con un preventivo a tariffa fissa.',
  },

  cta: {
    heading: 'Sapete già dove dovete andare?',
    body: 'Scriveteci la tratta e vi rispondiamo con una tariffa fissa, pedaggi e attesa compresi.',
    note: 'Rispondiamo 24 ore su 24. Per il preventivo non serve inserire dati di pagamento.',
  },

  notFound: {
    lead: 'La pagina che cercate non è qui. Potrebbe essere stata spostata, oppure il collegamento conteneva un errore.',
    linksHeading: 'Provate da qui',
  },
};
