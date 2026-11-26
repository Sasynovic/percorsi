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
   - quartiere: dove si svolge, deve combaciare con un nome di QUARTIERI
   - passioni: passioni consigliate per chi vuole partecipare
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
    passioni: ['Storia', 'Architettura'],
    posti: 6,
    img: 'assets/img/luogo-sanita.jpg',
    imgAlt: 'Vicolo del Rione Sanità con i panni stesi tra i palazzi',
    quartiere: 'Sanità',
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
    passioni: ['Street art', 'Fotografia'],
    posti: 8,
    img: 'assets/img/luogo-san-giovanni.jpg',
    imgAlt: 'Murales verdi e grigi dipinti su un muro lungo la strada',
    quartiere: 'San Giovanni',
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
    passioni: ['Fotografia', 'Mare'],
    posti: 5,
    img: 'assets/img/luogo-bagnoli.jpg',
    imgAlt: 'Il pontile di Bagnoli sul mare con la costa sullo sfondo',
    quartiere: 'Bagnoli',
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
    passioni: ['Natura urbana', 'Botanica'],
    posti: 10,
    img: 'assets/img/luogo-capodimonte.jpg',
    imgAlt: 'La Reggia di Capodimonte con le palme e il grande prato verde',
    quartiere: 'Capodimonte',
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
    passioni: ['Storia', 'Artigianato'],
    posti: 4,
    img: 'assets/img/luogo-materdei.jpg',
    imgAlt: 'La piazzetta di Materdei con i palazzi e le auto parcheggiate',
    quartiere: 'Materdei',
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
   - etaPassate: età di chi ha già fatto il percorso; l'app ne ricava
     l'"età consigliata" (la fascia in cui sta la maggior parte di loro)
   - passioni: passioni consigliate per chi vuole farlo
   - guida: chi ha proposto il percorso (mostrato come "Proposto da")
   - recensioni: stelle da 1 a 5, testo e foto facoltative                */
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
    etaPassate: [24, 26, 27, 28, 29, 30, 31, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 44],
    passioni: ['Storia', 'Artigianato'],
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
      },
      {
        nome: 'Luca',
        cognome: 'Marino',
        img: 'assets/img/persona-luca.jpg',
        stelle: 4,
        testo: 'Il Cavone è più ripido di quanto sembri, ma le botteghe dei presepiali ripagano la fatica. Da fare di mattina.'
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
    etaPassate: [29, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 46, 48, 52],
    passioni: ['Mare', 'Rigenerazione urbana', 'Fotografia'],
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
    etaPassate: [19, 21, 22, 22, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 29, 30, 31, 33, 35, 38],
    passioni: ['Storia', 'Architettura'],
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
      },
      {
        nome: 'Luca',
        cognome: 'Marino',
        img: 'assets/img/persona-luca.jpg',
        stelle: 5,
        testo: 'La scala del Palazzo dello Spagnolo vista dal vivo vale il percorso da sola. Tappe ben scelte, ritmo giusto per fermarsi a fotografare.',
        foto: ['assets/img/foto-sanita.jpg']
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
    etaPassate: [23, 25, 26, 27, 27, 28, 29, 29, 30, 31, 32, 33, 34, 35, 36, 38, 40],
    passioni: ['Street art', 'Fotografia'],
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

/* Realtà locali
   - quartiere: deve combaciare con un nome di QUARTIERI (serve per la mappa)
   - bg: colore del pallino nella lista                                     */
const REALTA = [
  { name: 'Cortile Vivo', meta: 'Volontariato · Sanità', quartiere: 'Sanità', bg: '#D85A30' },
  { name: 'Spazio Materdei', meta: 'Rigenerazione urbana · Materdei', quartiere: 'Materdei', bg: '#1D7A6B' },
  { name: 'Collettivo Forcella', meta: 'Teatro e cultura · Forcella', quartiere: 'Forcella', bg: '#1A2238' }
];

/* Quartieri mostrati sulla mappa
   - nome: deve essere uguale a "zone" dei percorsi e a "quartiere"
     di uscite e realtà locali: così la mappa li collega da sola
   - x, y: posizione sul disegno (area 360 × 280, 0,0 = in alto a sinistra)
   - daTe: quanto è lontano dal quartiere del profilo (Materdei)
   - curiosita: una frase mostrata nella scheda del quartiere              */
const QUARTIERI = [
  {
    nome: 'Materdei',
    x: 168, y: 128,
    daTe: 'Sei qui',
    curiosita: 'Il nome viene dalla chiesa di Santa Maria Mater Dei. Dalle sue scale si scende a piedi fino alla Sanità, lungo il Cavone.'
  },
  {
    nome: 'Sanità',
    x: 214, y: 100,
    daTe: '15 min a piedi',
    curiosita: 'Qui è nato Totò, nel 1898. Sotto il rione si aprono catacombe e cave di tufo usate per secoli.'
  },
  {
    nome: 'Capodimonte',
    x: 226, y: 44,
    daTe: '25 min a piedi',
    curiosita: 'Il Real Bosco, voluto dai Borbone nel Settecento, è uno dei parchi urbani più grandi d’Italia.'
  },
  {
    nome: 'Forcella',
    x: 256, y: 150,
    daTe: '20 min a piedi',
    curiosita: 'Il nome viene dalla forma a “Y” dell’incrocio delle sue strade, antico simbolo della scuola pitagorica.'
  },
  {
    nome: 'Bagnoli',
    x: 46, y: 170,
    daTe: '35 min in metro',
    curiosita: 'Dove oggi si passeggia sul pontile, fino agli anni Novanta c’era l’acciaieria Italsider.'
  },
  {
    nome: 'San Giovanni',
    x: 312, y: 164,
    daTe: '30 min in treno',
    curiosita: 'Le facciate dei palazzi popolari sono diventate tele: alcuni murales sono alti quanto l’intero edificio.'
  }
];

/* Filtri della mappa: cosa mostrare nei quartieri */
const MAP_LAYERS = [
  { id: 'tutto', label: 'Tutto' },
  { id: 'percorsi', label: 'Percorsi' },
  { id: 'uscite', label: 'Uscite' },
  { id: 'realta', label: 'Realtà locali' }
];

/* Profilo di chi usa l'app (dati di esempio)
   - nome + cognome: le recensioni con lo stesso nome e cognome, in uscite e
     percorsi, compaiono da sole in "Le tue recensioni"
   - usciteFatte: uscite a cui ha già partecipato (id di USCITE + data)     */
const PROFILO = {
  nome: 'Luca',
  cognome: 'Marino',
  foto: 'assets/img/persona-luca.jpg',
  eta: 31,
  professione: 'Architetto restauratore',
  quartiere: 'Materdei',
  membroDa: 'marzo 2025',
  bio: 'Restauro palazzi storici per lavoro e nel tempo libero cammino la città con la macchina fotografica al collo. Mi piacciono i cortili nascosti e le facciate che raccontano storie.',
  passioni: ['Architettura', 'Street art', 'Fotografia', 'Storia'],
  usciteFatte: [
    { uscita: 'u2', data: 'Dom 26 ott' },
    { uscita: 'u3', data: 'Sab 18 ott' },
    { uscita: 'u1', data: 'Sab 4 ott' }
  ]
};

/* Un unico oggetto letto da app.js */
const DATA = {
  chips: CHIPS,
  uscite: USCITE,
  percorsi: PERCORSI,
  realta: REALTA,
  quartieri: QUARTIERI,
  mapLayers: MAP_LAYERS,
  guide: GUIDE,
  profilo: PROFILO,
  chat: CHAT,
  percorsoChat: PERCORSO_CHAT
};
