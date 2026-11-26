/* ==========================================================================
   data.js
   Qui stanno tutti i contenuti dell'app: modifica solo questo file
   per cambiare testi, date, percorsi e realtà locali.
   ========================================================================== */

/* Filtri mostrati sopra le uscite (id usato anche nelle uscite: "cat") */
const CHIPS = [
  { id: 'tutte', label: 'Tutte' },
  { id: 'storia', label: 'Storia' },
  { id: 'street', label: 'Street art' },
  { id: 'foto', label: 'Fotografia' },
  { id: 'natura', label: 'Natura urbana' }
];

/* Uscite in gruppo
   - tone: "brick" (rosa) oppure "pine" (verde) per il colore della data
   - posti: posti ancora disponibili
   - img: foto del luogo (nella cartella assets/img)
   - organizzatore: chi propone l'uscita
   - recensioni: stelle da 1 a 5, testo e foto facoltative
   - chatPartecipanti: quante persone sono già nella chat                  */
const USCITE = [
  {
    id: 'u1',
    cat: 'storia',
    tone: 'brick',
    date: 'Sab 29 nov · 10:00',
    title: 'Sanità, tra chiese e palazzi nobiliari',
    meta: 'Storia · 20-30 anni',
    posti: 6,
    img: 'assets/img/luogo-sanita.jpg',
    imgAlt: 'Vicolo del Rione Sanità con i panni stesi tra i palazzi',
    ritrovo: 'Piazza Sanità, davanti alla chiesa',
    descrizione: 'Tre ore a piedi nel rione, dal Palazzo dello Spagnolo al cimitero delle Fontanelle, con una sosta da un pasticcere storico. Si cammina quasi sempre in piano, con due brevi salite e qualche scalinata.',
    organizzatore: {
      nome: 'Giulia',
      cognome: 'Russo',
      ruolo: 'Guida volontaria · Cortile Vivo',
      img: 'assets/img/persona-giulia.jpg'
    },
    chatPartecipanti: 8,
    recensioni: [
      {
        nome: 'Elena',
        cognome: 'Ferraro',
        img: 'assets/img/persona-elena.jpg',
        stelle: 5,
        testo: 'Giulia conosce ogni vicolo e ogni storia. Tre ore volate, gruppo piccolo e attento. Tornerò per il percorso su Materdei.',
        foto: ['assets/img/foto-sanita.jpg']
      },
      {
        nome: 'Paolo',
        cognome: 'Greco',
        img: 'assets/img/persona-paolo.jpg',
        stelle: 4,
        testo: 'Bellissimo giro, forse un po’ affollato all’ingresso delle Fontanelle. Utile la pausa caffè a metà.'
      },
      {
        nome: 'Marta',
        cognome: 'Rinaldi',
        img: 'assets/img/persona-marta.jpg',
        stelle: 5,
        testo: 'La parte che mi è piaciuta di più? I cortili aperti dei palazzi. Da fare assolutamente con la luce del mattino.'
      }
    ]
  },
  {
    id: 'u2',
    cat: 'street',
    tone: 'pine',
    date: 'Dom 30 nov · 15:30',
    title: 'Murales a San Giovanni a Teduccio',
    meta: 'Street art · 30-40 anni',
    posti: 8,
    img: 'assets/img/luogo-san-giovanni.jpg',
    imgAlt: 'Murales verdi e grigi dipinti su un muro lungo la strada',
    ritrovo: 'Stazione di San Giovanni a Teduccio, uscita principale',
    descrizione: 'Un percorso tra i murales che hanno cambiato il volto del quartiere, con le storie degli artisti e delle associazioni che li hanno commissionati. Si cammina sul marciapiede, adatto a tutti.',
    organizzatore: {
      nome: 'Marco',
      cognome: 'De Luca',
      ruolo: 'Fotografo · Collettivo Forcella',
      img: 'assets/img/persona-marco.jpg'
    },
    chatPartecipanti: 12,
    recensioni: [
      {
        nome: 'Davide',
        cognome: 'Conte',
        img: 'assets/img/persona-davide.jpg',
        stelle: 5,
        testo: 'Marco racconta i murales come fossero film: artisti, committenti, storie di quartiere. Due ore piene.',
        foto: ['assets/img/foto-murales.jpg']
      },
      {
        nome: 'Ilenia',
        cognome: 'Russo',
        img: 'assets/img/persona-ilenia.jpg',
        stelle: 4,
        testo: 'Molto bello, peccato per un tratto di strada senza marciapiede. Le foto del gruppo sono stupende.'
      },
      {
        nome: 'Luca',
        cognome: 'Marino',
        img: 'assets/img/persona-luca.jpg',
        stelle: 5,
        testo: 'Ci siamo fermati a parlare con due ragazzi del cortile delle associazioni: la parte migliore della giornata.'
      }
    ]
  },
  {
    id: 'u3',
    cat: 'foto',
    tone: 'brick',
    date: 'Sab 6 dic · 9:30',
    title: 'Fotografia all’alba sul lungomare di Bagnoli',
    meta: 'Fotografia · tutte le età',
    posti: 5,
    img: 'assets/img/luogo-bagnoli.jpg',
    imgAlt: 'Il pontile di Bagnoli sul mare con la costa sullo sfondo',
    ritrovo: 'Pontile nord di Bagnoli, ingresso del lungomare',
    descrizione: 'Sveglia presto per la luce migliore: dal pontile alla spiaggia nuova, passando per l’ex area Italsider. Porta la macchina fotografica, il percorso è pianeggiante e dura circa due ore.',
    organizzatore: {
      nome: 'Sara',
      cognome: 'Iorio',
      ruolo: 'Fotografa · Oasi di Città',
      img: 'assets/img/persona-sara.jpg'
    },
    chatPartecipanti: 6,
    recensioni: [
      {
        nome: 'Anna',
        cognome: 'De Rosa',
        img: 'assets/img/persona-anna.jpg',
        stelle: 5,
        testo: 'Alba stupenda e Sara sapeva esattamente dove mettersi per lo scatto giusto. Consigliatissimo.',
        foto: ['assets/img/luogo-bagnoli.jpg']
      },
      {
        nome: 'Ciro',
        cognome: 'Esposito',
        img: 'assets/img/persona-ciro.jpg',
        stelle: 4,
        testo: 'Bel giro, un po’ freddo a dicembre ma ne vale la pena. Colazione al bar del porto alla fine.'
      }
    ]
  },
  {
    id: 'u4',
    cat: 'natura',
    tone: 'pine',
    date: 'Dom 7 dic · 10:00',
    title: 'Il Bosco di Capodimonte e i suoi sentieri',
    meta: 'Natura urbana · 40+ anni',
    posti: 10,
    img: 'assets/img/luogo-capodimonte.jpg',
    imgAlt: 'La Reggia di Capodimonte con le palme e il grande prato verde',
    ritrovo: 'Ingresso del Real Bosco, Porta Grande',
    descrizione: 'Una passeggiata lenta nei sentieri del bosco, tra alberi secolari e radure. Ritmo tranquillo, adatto a chi vuole camminare senza fatica e a chi cerca un po’ di silenzio.',
    organizzatore: {
      nome: 'Antonio',
      cognome: 'Esposito',
      ruolo: 'Naturalista volontario',
      img: 'assets/img/persona-antonio.jpg'
    },
    chatPartecipanti: 10,
    recensioni: [
      {
        nome: 'Teresa',
        cognome: 'Vitale',
        img: 'assets/img/persona-teresa.jpg',
        stelle: 5,
        testo: 'Antonio conosce ogni albero per nome. Due ore di pace a due passi dal centro.'
      },
      {
        nome: 'Giovanni',
        cognome: 'Russo',
        img: 'assets/img/persona-giovanni.jpg',
        stelle: 4,
        testo: 'Bella camminata, sentieri facili. Il gruppo 40+ è davvero rilassato, ideale per ricominciare a camminare.'
      }
    ]
  },
  {
    id: 'u5',
    cat: 'storia',
    tone: 'brick',
    date: 'Sab 13 dic · 16:00',
    title: 'Materdei e il Cavone, a passo lento',
    meta: 'Storia · 18-25 anni',
    posti: 4,
    img: 'assets/img/luogo-materdei.jpg',
    imgAlt: 'La piazzetta di Materdei con i palazzi e le auto parcheggiate',
    ritrovo: 'Piazzetta San Gennaro a Materdei',
    descrizione: 'Un anello breve tra scale, chiese e botteghe del quartiere, pensato per chi ha voglia di camminare senza fretta. Due salite ripide, il resto tutto in discesa.',
    organizzatore: {
      nome: 'Chiara',
      cognome: 'Lombardi',
      ruolo: 'Abitante del quartiere',
      img: 'assets/img/persona-chiara.jpg'
    },
    chatPartecipanti: 4,
    recensioni: [
      {
        nome: 'Sofia',
        cognome: 'Amendola',
        img: 'assets/img/persona-sofia.jpg',
        stelle: 5,
        testo: 'Chiara ci ha portato in una bottega di presepi che non avrei mai trovato da sola. Da rifare.'
      },
      {
        nome: 'Marco',
        cognome: 'Petrella',
        img: 'assets/img/persona-marco-p.jpg',
        stelle: 4,
        testo: 'Giro corto ma denso di storie. Le scale sono toste, prendetele con calma.'
      }
    ]
  }
];

/* Messaggi già presenti nelle chat delle uscite.
   I messaggi scritti durante la demo vengono aggiunti solo in memoria. */
const CHAT = {
  u1: [
    { nome: 'Giulia', img: 'assets/img/persona-giulia.jpg', testo: 'Ciao a tutti! Ci vediamo sabato alle 10 davanti alla chiesa. Porto io la mappa cartacea.', ora: '09:12' },
    { nome: 'Elena', img: 'assets/img/persona-elena.jpg', testo: 'Perfetto, arrivo in metro da Piazza Cavour.', ora: '09:20' },
    { nome: 'Paolo', img: 'assets/img/persona-paolo.jpg', testo: 'C’è posto per un’amica? Vorrebbe unirsi.', ora: '18:40' }
  ],
  u2: [
    { nome: 'Marco', img: 'assets/img/persona-marco.jpg', testo: 'Ci troviamo alle 15:20, così partiamo puntuali. Scarpe comode!', ora: '11:05' },
    { nome: 'Davide', img: 'assets/img/persona-davide.jpg', testo: 'Porto la macchina fotografica: se qualcuno vuole foto di gruppo le faccio io.', ora: '11:18' },
    { nome: 'Ilenia', img: 'assets/img/persona-ilenia.jpg', testo: 'Grazie! C’è un bar vicino alla stazione per un caffè prima?', ora: '12:02' }
  ],
  u3: [
    { nome: 'Sara', img: 'assets/img/persona-sara.jpg', testo: 'Appuntamento alle 9:15, il sole sorge verso le 9:40. Vestitevi a strati!', ora: '08:10' },
    { nome: 'Anna', img: 'assets/img/persona-anna.jpg', testo: 'Arrivo con il treno delle 8:50.', ora: '08:24' },
    { nome: 'Ciro', img: 'assets/img/persona-ciro.jpg', testo: 'C’è parcheggio vicino al pontile?', ora: '08:31' }
  ],
  u4: [
    { nome: 'Antonio', img: 'assets/img/persona-antonio.jpg', testo: 'Ci vediamo domenica alle 10 a Porta Grande. Il bosco apre alle 8:30.', ora: '10:00' },
    { nome: 'Teresa', img: 'assets/img/persona-teresa.jpg', testo: 'Porto una borraccia in più, se serve a qualcuno.', ora: '10:12' },
    { nome: 'Giovanni', img: 'assets/img/persona-giovanni.jpg', testo: 'Qualcuno viene da Materdei? Possiamo dividere l’auto.', ora: '17:45' }
  ],
  u5: [
    { nome: 'Chiara', img: 'assets/img/persona-chiara.jpg', testo: 'Ci vediamo alle 16 davanti alla chiesa. Finiamo con un caffè al mercato.', ora: '09:30' },
    { nome: 'Sofia', img: 'assets/img/persona-sofia.jpg', testo: 'Perfetto, ci sono!', ora: '09:41' },
    { nome: 'Marco', img: 'assets/img/persona-marco-p.jpg', testo: 'Posso portare mio fratello? Ha 19 anni.', ora: '13:07' }
  ]
};

/* Messaggi già presenti nelle chat dei percorsi.
   Le chiavi sono gli id dei percorsi (p1, p2, p3, p4). */
const PERCORSO_CHAT = {
  p1: [
    { nome: 'Chiara', img: 'assets/img/persona-chiara.jpg', testo: 'Ciao! Il gruppo è per chi ha 25-40 anni e voglia di camminare piano. Partiamo dalla chiesa.', ora: '10:02' },
    { nome: 'Elena', img: 'assets/img/persona-elena.jpg', testo: 'Perfetto, io ci sono. Le scale le prendo con calma!', ora: '10:15' },
    { nome: 'Marco', img: 'assets/img/persona-marco-p.jpg', testo: 'Qualcuno parte da piazza Dante? Possiamo salire insieme.', ora: '18:22' }
  ],
  p2: [
    { nome: 'Sara', img: 'assets/img/persona-sara.jpg', testo: 'Ci vediamo al pontile nord. Portate scarpe comode e, se volete, la macchina fotografica.', ora: '09:00' },
    { nome: 'Anna', img: 'assets/img/persona-anna.jpg', testo: 'Io arrivo in treno, c’è un bar aperto vicino alla stazione?', ora: '09:14' },
    { nome: 'Ciro', img: 'assets/img/persona-ciro.jpg', testo: 'Sì, quello davanti all’uscita. Ci troviamo lì alle 9:40?', ora: '09:20' }
  ],
  p3: [
    { nome: 'Giulia', img: 'assets/img/persona-giulia.jpg', testo: 'Il giro è breve ma pieno di storie. Chi vuole può fermarsi a mangiare una sfogliatella alla fine.', ora: '11:30' },
    { nome: 'Paolo', img: 'assets/img/persona-paolo.jpg', testo: 'Ci sto! Porto anche un’amica del corso di architettura.', ora: '11:52' },
    { nome: 'Marta', img: 'assets/img/persona-marta.jpg', testo: 'Bene, così siamo in tanti della stessa età.', ora: '12:05' }
  ],
  p4: [
    { nome: 'Marco', img: 'assets/img/persona-marco.jpg', testo: 'Percorso fotografico: fermate libere ogni volta che vedete uno scatto. Nessuna fretta.', ora: '15:10' },
    { nome: 'Ilenia', img: 'assets/img/persona-ilenia.jpg', testo: 'Che bello, io ho appena preso una reflex usata. Mi date qualche dritta?', ora: '15:18' },
    { nome: 'Davide', img: 'assets/img/persona-davide.jpg', testo: 'Certo! Alla fine scambiamo le foto del gruppo.', ora: '15:31' }
  ]
};

/* Percorsi
   - path, start, end: coordinate del disegno (area 84 x 84)
   - tappe: elenco dei punti del percorso mostrati nel dettaglio
   - eta, interessi: a chi è pensato il gruppo
   - guida: chi accompagna il gruppo
   - recensioni: stelle da 1 a 5, testo e foto facoltative
   - partecipanti: quante persone sono già nel gruppo                     */
const PERCORSI = [
  {
    id: 'p1',
    name: 'Materdei e il Cavone',
    zone: 'Materdei',
    color: '#D85A30',
    path: 'M14 66 C 24 50, 34 58, 40 42 S 58 30, 70 18',
    start: { x: 14, y: 66 },
    end: { x: 70, y: 18 },
    km: '3,2 km',
    durata: '1h 30',
    img: 'assets/img/luogo-materdei.jpg',
    imgAlt: 'La piazzetta di Materdei con i palazzi e le auto parcheggiate',
    eta: '25-40 anni',
    interessi: ['Storia', 'Artigianato'],
    partecipanti: 12,
    guida: {
      nome: 'Chiara',
      cognome: 'Lombardi',
      ruolo: 'Abitante del quartiere',
      img: 'assets/img/persona-chiara.jpg'
    },
    descrizione: 'Un anello breve che sale tra vicoli e scale di Materdei, dove le chiese barocche convivono con botteghe artigiane e cortili aperti. Il percorso è quasi tutto pedonale, con due salite ripide e qualche scalinata.',
    tappe: [
      'Chiesa di Santa Maria della Sanità e il chiostro, punto di partenza',
      'Il Cavone, la discesa storica che collega Materdei alla Sanità',
      'Bottega dei maestri presepiali, una realtà artigiana del quartiere'
    ],
    recensioni: [
      {
        nome: 'Elena',
        cognome: 'Ferraro',
        img: 'assets/img/persona-elena.jpg',
        stelle: 5,
        testo: 'Fatto in gruppo una domenica mattina: ritmo lento, tante storie e una vista bellissima sui tetti. Consigliato chiudere con un caffè al mercato.',
        foto: ['assets/img/foto-sanita.jpg']
      },
      {
        nome: 'Marco',
        cognome: 'Petrella',
        img: 'assets/img/persona-marco-p.jpg',
        stelle: 4,
        testo: 'Le scale sono toste ma Chiara sa dosare le pause. Gruppo piccolo, molto piacevole.'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Bagnoli, dall’ex area industriale al mare',
    zone: 'Bagnoli',
    color: '#1D7A6B',
    path: 'M12 24 C 30 22, 30 46, 46 48 S 66 62, 72 70',
    start: { x: 12, y: 24 },
    end: { x: 72, y: 70 },
    km: '4,5 km',
    durata: '2h',
    img: 'assets/img/luogo-bagnoli.jpg',
    imgAlt: 'Il pontile di Bagnoli sul mare con la costa sullo sfondo',
    eta: '30-45 anni',
    interessi: ['Mare', 'Rigenerazione urbana'],
    partecipanti: 9,
    guida: {
      nome: 'Sara',
      cognome: 'Iorio',
      ruolo: 'Fotografa · Oasi di Città',
      img: 'assets/img/persona-sara.jpg'
    },
    descrizione: 'Dalla memoria industriale di Bagnoli fino alla battigia, camminando tra capannoni dismessi, murales e il lungomare nuovo. Un percorso pianeggiante, adatto anche a chi cammina poco.',
    tappe: [
      'Ex area Italsider, tra archeologia industriale e progetti di rigenerazione',
      'Il pontile di Bagnoli e lo sguardo su Capo Miseno',
      'L’Oasi di Città, realtà locale che cura la spiaggia'
    ],
    recensioni: [
      {
        nome: 'Anna',
        cognome: 'De Rosa',
        img: 'assets/img/persona-anna.jpg',
        stelle: 5,
        testo: 'Sorprendente: sembra un altro pezzo di città. Bello il contrasto tra i capannoni e il mare, e Sara conosceva ogni storia.',
        foto: ['assets/img/luogo-bagnoli.jpg']
      },
      {
        nome: 'Ciro',
        cognome: 'Esposito',
        img: 'assets/img/persona-ciro.jpg',
        stelle: 4,
        testo: 'Percorso facile e panoramico. Il gruppo 30-45 è stato piacevole, ci siamo fermati a prendere un caffè alla fine.'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Rione Sanità, dal basso',
    zone: 'Sanità',
    color: '#D85A30',
    path: 'M10 40 C 22 20, 40 64, 52 40 S 66 20, 74 44',
    start: { x: 10, y: 40 },
    end: { x: 74, y: 44 },
    km: '2,8 km',
    durata: '1h 15',
    img: 'assets/img/luogo-sanita.jpg',
    imgAlt: 'Vicolo del Rione Sanità con i panni stesi tra i palazzi',
    eta: '20-35 anni',
    interessi: ['Storia', 'Architettura'],
    partecipanti: 14,
    guida: {
      nome: 'Giulia',
      cognome: 'Russo',
      ruolo: 'Guida volontaria · Cortile Vivo',
      img: 'assets/img/persona-giulia.jpg'
    },
    descrizione: 'Un percorso nel cuore della Sanità, tra palazzi nobiliari, vicoli e il cimitero delle Fontanelle. Si cammina quasi sempre in piano, con brevi tratti in salita.',
    tappe: [
      'Palazzo dello Spagnolo e la scala aperta del cortile',
      'Cimitero delle Fontanelle, tra fede popolare e memoria',
      'Pasticceria storica del rione, tappa dolce finale'
    ],
    recensioni: [
      {
        nome: 'Paolo',
        cognome: 'Greco',
        img: 'assets/img/persona-paolo.jpg',
        stelle: 5,
        testo: 'La Sanità raccontata da chi la vive: non il solito giro turistico. Gruppo piccolo e accogliente.',
        foto: ['assets/img/foto-sanita.jpg']
      },
      {
        nome: 'Marta',
        cognome: 'Rinaldi',
        img: 'assets/img/persona-marta.jpg',
        stelle: 4,
        testo: 'Bellissimi i cortili aperti dei palazzi. Un po’ di confusione in via dei Tribunali, per il resto ottimo.'
      }
    ]
  },
  {
    id: 'p4',
    name: 'I murales di San Giovanni a Teduccio',
    zone: 'San Giovanni',
    color: '#1D7A6B',
    path: 'M12 70 L 30 52 L 44 58 L 60 34 L 72 16',
    start: { x: 12, y: 70 },
    end: { x: 72, y: 16 },
    km: '3,6 km',
    durata: '1h 40',
    img: 'assets/img/luogo-san-giovanni.jpg',
    imgAlt: 'Murales verdi e grigi dipinti su un muro lungo la strada',
    eta: '25-40 anni',
    interessi: ['Street art', 'Fotografia'],
    partecipanti: 11,
    guida: {
      nome: 'Marco',
      cognome: 'De Luca',
      ruolo: 'Fotografo · Collettivo Forcella',
      img: 'assets/img/persona-marco.jpg'
    },
    descrizione: 'Un museo a cielo aperto tra i palazzi del quartiere: murales grandi come facciate, street art e storie di rigenerazione urbana. Percorso urbano pianeggiante.',
    tappe: [
      'Murales di via Taverna del Ferro',
      'Il cortile delle associazioni, presidio di comunità',
      'Ex scuola occupata e spazio giovani'
    ],
    recensioni: [
      {
        nome: 'Davide',
        cognome: 'Conte',
        img: 'assets/img/persona-davide.jpg',
        stelle: 5,
        testo: 'Bello camminare con chi conosce gli artisti e le storie dietro ogni muro. Da fare con la luce del pomeriggio.',
        foto: ['assets/img/foto-murales.jpg']
      },
      {
        nome: 'Ilenia',
        cognome: 'Russo',
        img: 'assets/img/persona-ilenia.jpg',
        stelle: 5,
        testo: 'Il gruppo era davvero in sintonia: stessa curiosità, stessa voglia di fermarsi a fotografare ogni dettaglio.'
      }
    ]
  }
];

/* Guide già verificate a cui si può proporre un'attività.
   "verificata" viene mostrato con un badge nella schermata Proponi. */
const GUIDE = [
  {
    id: 'g1',
    nome: 'Chiara',
    cognome: 'Lombardi',
    ruolo: 'Abitante del quartiere',
    zone: 'Materdei',
    interessi: ['Storia', 'Artigianato'],
    img: 'assets/img/persona-chiara.jpg',
    verificata: true
  },
  {
    id: 'g2',
    nome: 'Giulia',
    cognome: 'Russo',
    ruolo: 'Guida volontaria · Cortile Vivo',
    zone: 'Sanità',
    interessi: ['Storia', 'Architettura'],
    img: 'assets/img/persona-giulia.jpg',
    verificata: true
  },
  {
    id: 'g3',
    nome: 'Sara',
    cognome: 'Iorio',
    ruolo: 'Fotografa · Oasi di Città',
    zone: 'Bagnoli',
    interessi: ['Mare', 'Fotografia'],
    img: 'assets/img/persona-sara.jpg',
    verificata: true
  },
  {
    id: 'g4',
    nome: 'Marco',
    cognome: 'De Luca',
    ruolo: 'Fotografo · Collettivo Forcella',
    zone: 'San Giovanni',
    interessi: ['Street art', 'Fotografia'],
    img: 'assets/img/persona-marco.jpg',
    verificata: true
  },
  {
    id: 'g5',
    nome: 'Antonio',
    cognome: 'Esposito',
    ruolo: 'Naturalista volontario',
    zone: 'Capodimonte',
    interessi: ['Natura urbana', 'Botanica'],
    img: 'assets/img/persona-antonio.jpg',
    verificata: true
  }
];

/* Realtà locali: bg è il colore del pallino nella lista */
const REALTA = [
  { name: 'Cortile Vivo', meta: 'Volontariato · Sanità', bg: '#D85A30' },
  { name: 'Spazio Materdei', meta: 'Rigenerazione urbana · Materdei', bg: '#1D7A6B' },
  { name: 'Collettivo Forcella', meta: 'Teatro e cultura · Forcella', bg: '#1A2238' }
];

/* Un unico oggetto letto da app.js */
const DATA = {
  chips: CHIPS,
  uscite: USCITE,
  percorsi: PERCORSI,
  realta: REALTA,
  guide: GUIDE,
  chat: CHAT,
  percorsoChat: PERCORSO_CHAT
};
