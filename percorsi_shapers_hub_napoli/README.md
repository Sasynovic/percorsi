# percorsi_shapers_hub_napoli

Prototipo dell'app **Percorsi**, versione "scompattata" del file originale
`Percorsi — mockup home page.html`: non c'è più React né un bundle da aprire,
ma solo HTML, CSS e JavaScript normali, divisi in file facili da modificare.

## Come aprirlo

Fai doppio clic su `index.html`.
Non serve installare niente, né avviare un server.

> Se apri il file con doppio clic o dentro l'anteprima di un editor, alcuni
> browser limitano `localStorage`: in quel caso le iscrizioni non restano dopo
> il ricaricamento. Per provare tutto senza limiti usa un piccolo server locale
> (ad esempio l'estensione "Live Server" di VS Code).

## Struttura

```
percorsi_shapers_hub_napoli/
├── index.html          → tutte le schermate (contenuto e struttura)
├── css/
│   ├── base.css        → reset, font, colori (variabili CSS), cornice app
│   ├── components.css  → bottoni, campi, chip, card, liste, navigazione
│   └── screens.css     → regole specifiche delle singole schermate
├── js/
│   ├── data.js         → testi e dati: uscite, percorsi, guide, chat
│   └── app.js          → stato, navigazione, filtri, rendering
├── assets/
│   ├── fonts/
│   │   ├── public-sans.woff2
│   │   └── rubik.woff2
│   └── img/            → foto dei luoghi, volti e foto delle recensioni
└── README.md
```

## Da dove partire per modificare

| Cosa vuoi cambiare | File |
| --- | --- |
| Testi, date, titoli, posti disponibili | `js/data.js` |
| Foto dei luoghi, volti e recensioni | `assets/img/` |
| Percorsi (guida, età, interessi, recensioni) | `js/data.js` |
| Guide verificate a cui proporre un'attività | `js/data.js` (array `GUIDE`) |
| Messaggi già presenti nelle chat delle uscite | `js/data.js` (oggetto `CHAT`) |
| Messaggi già presenti nelle chat dei percorsi | `js/data.js` (oggetto `PERCORSO_CHAT`) |
| Verifica del profilo (demo) | `js/app.js` (`state.verified`) |
| Colori e font di tutto il sito | `css/base.css` (blocco `:root`) |
| Aspetto di bottoni e card | `css/components.css` |
| Spaziature di una singola schermata | `css/screens.css` |
| Struttura di una schermata | `index.html` |
| Comportamento (click, filtri, navigazione) | `js/app.js` |

### Aggiungere un'uscita

In `js/data.js`, dentro l'array `USCITE`, copia un blocco esistente e cambia i valori:

```js
{
  id: 'u6',              // deve essere unico
  cat: 'storia',         // deve combaciare con un id di CHIPS
  tone: 'brick',         // 'brick' (rosa) o 'pine' (verde)
  date: 'Sab 20 dic · 10:00',
  title: 'Titolo dell’uscita',
  meta: 'Storia · 25-35 anni',
  posti: 6,
  img: 'assets/img/luogo-sanita.jpg',
  imgAlt: 'Descrizione della foto per chi non la vede',
  ritrovo: 'Piazza Sanità, davanti alla chiesa',
  descrizione: 'Due righe che raccontano l’uscita.',
  organizzatore: {
    nome: 'Nome',
    cognome: 'Cognome',
    ruolo: 'Guida volontaria · Associazione',
    img: 'assets/img/persona-giulia.jpg'
  },
  chatPartecipanti: 8,
  recensioni: [
    {
      nome: 'Nome',
      cognome: 'Cognome',
      img: 'assets/img/persona-elena.jpg',
      stelle: 5,               // da 1 a 5
      testo: 'Com’è andata l’uscita…',
      foto: ['assets/img/foto-sanita.jpg']   // facoltativo
    }
  ]
}
```

Poi, se vuoi che la nuova uscita abbia già dei messaggi, aggiungi una voce
nell'oggetto `CHAT` in fondo al file:

```js
u6: [
  { nome: 'Nome', img: 'assets/img/persona-giulia.jpg', testo: 'Ciao a tutti!', ora: '09:12' }
]
```

Non serve toccare l'HTML: card, dettaglio e chat vengono creati automaticamente.

### Aggiungere un percorso

In `PERCORSI` aggiungi un oggetto come questo:

```js
{
  id: 'p5',
  name: 'Nome del percorso',
  zone: 'Quartiere',
  color: '#D85A30',
  path: 'M12 60 C 30 40, 50 50, 72 20', // disegno del tracciato
  start: { x: 12, y: 60 },
  end: { x: 72, y: 20 },
  km: '3 km',
  durata: '1h',
  img: 'assets/img/luogo-materdei.jpg',
  imgAlt: 'Descrizione della foto per chi non la vede',
  eta: '25-40 anni',
  interessi: ['Storia', 'Architettura'],
  partecipanti: 10,
  guida: {
    nome: 'Nome',
    cognome: 'Cognome',
    ruolo: 'Guida volontaria · Associazione',
    img: 'assets/img/persona-chiara.jpg'
  },
  descrizione: 'Due righe che raccontano il percorso.',
  tappe: ['Prima tappa', 'Seconda tappa', 'Terza tappa'],
  recensioni: [
    {
      nome: 'Nome',
      cognome: 'Cognome',
      img: 'assets/img/persona-elena.jpg',
      stelle: 5,
      testo: 'Com’è stato camminare con questo gruppo…',
      foto: ['assets/img/foto-sanita.jpg'] // facoltativo
    }
  ]
}
```

`path`, `start` ed `end` usano un'area di disegno 84 × 84: puoi cambiare i numeri
per ottenere una forma diversa. Le coordinate di `start`/`end` devono stare
sugli estremi della linea.

Poi, se vuoi che il percorso abbia già dei messaggi, aggiungi una voce
nell'oggetto `PERCORSO_CHAT`:

```js
p5: [
  { nome: 'Nome', img: 'assets/img/persona-chiara.jpg', testo: 'Ciao a tutti!', ora: '10:00' }
]
```

Non serve toccare l'HTML: card, dettaglio, recensioni e chat vengono creati
automaticamente.

### Aggiungere una guida verificata

Nella schermata **Proponi** si può scegliere di inviare un'attività a una guida
già verificata. Le guide stanno nell'array `GUIDE`, sempre in `js/data.js`:

```js
{
  id: 'g6',
  nome: 'Nome',
  cognome: 'Cognome',
  ruolo: 'Guida volontaria · Associazione',
  zone: 'Quartiere',
  interessi: ['Storia', 'Artigianato'],
  img: 'assets/img/persona-chiara.jpg',
  verificata: true      // solo le guide con true compaiono nel menu
}
```

Il menu "A quale guida verificata vuoi proporla?" e la scheda di anteprima
(foto, ruolo, zona e interessi) si aggiornano da soli. Se aggiungi una guida con
`verificata: false`, resta nei dati ma non viene mostrata finché non la approvi.

I testi dei quattro tipi di proposta (titoli dei campi, suggerimenti e messaggio
di conferma) stanno in `PROPOSAL_TYPES`, all'inizio di `js/app.js`.

## Come funziona il codice

- **Stato**: l'oggetto `state` in `js/app.js` contiene schermata attiva, filtro,
  testo di ricerca, iscrizioni, percorso/uscita aperti, recensioni e messaggi
  scritti durante la demo.
- **`render()`**: ridisegna tutte le parti che dipendono dai dati. Viene chiamata
  a ogni azione (click, ricerca, filtro).
- **Navigazione**: ogni elemento con `data-go="nome-schermata"` cambia schermata.
  Le schermate sono le `<section data-screen="...">` in `index.html`.
- **Filtri**: i chip hanno `data-filter`, le card delle uscite hanno `data-join`.
  I click vengono gestiti tutti in un unico punto (`document.addEventListener`).
- **Dettaglio percorso**: ogni card ha `data-open="p1"` e apre la schermata
  `dettaglio` con foto, guida, età, interessi, tracciato, tappe e recensioni.
- **Dettaglio uscita**: il titolo di ogni card ha `data-uscita="u1"` e apre la
  schermata `uscita`, riempita con i dati di quell'uscita.
- **Recensioni**: valgono sia per le uscite sia per i percorsi. Le stelle sono
  generate da `stelle` (1–5). Una recensione scritta durante la demo viene
  aggiunta a `state.newReviews` (uscite) o `state.newPercorsoReviews` (percorsi)
  e resta solo fino al ricaricamento.
- **Chat**: i messaggi di partenza sono in `DATA.chat` (uscite) e
  `DATA.percorsoChat` (percorsi). Quelli scritti durante la demo finiscono in
  `state.messages` o `state.percorsoMessages` (solo in memoria). La stessa
  schermata `chat` mostra l'una o l'altra in base a `state.chatType`; chi non è
  iscritto la vede in sola lettura.
- **Verifica del profilo**: il profilo parte come "non verificato". Senza
  verifica, la schermata `proponi` mostra solo il blocco informativo e il form
  resta nascosto. Il bottone "Verifica il profilo (demo)" imposta
  `state.verified` e sblocca il form.
- **Proposte**: dopo la verifica si sceglie il tipo con `data-proposal`
  (`tappa`, `percorso`, `gruppo`, `attivita`). I testi dei campi cambiano in base
  al tipo; per `attivita` compare anche il menu delle guide verificate
  (`state.guide`) con l'anteprima della guida scelta. `state.sentType`,
  `state.sentGuide` e `state.sentName` servono a comporre il messaggio di
  conferma, che per un'attività nomina la guida scelta.
- **Iscrizioni e verifica**: vengono salvate in `localStorage`, quindi restano
  anche dopo aver ricaricato la pagina. Le chiavi sono
  `percorsi_shapers_hub_napoli:joined`, `percorsi_shapers_hub_napoli:percorsi`
  e `percorsi_shapers_hub_napoli:verified`.

## Schermate presenti

1. **Home** — ricerca, uscite in gruppo, percorsi in evidenza, realtà locali.
2. **Percorsi** — elenco con foto, voto medio, età e interessi.
3. **Dettaglio percorso** — foto, guida, distanza, durata, età, partecipanti,
   tracciato, tappe, iscrizione al gruppo, chat e recensioni con stelle e foto.
4. **Gruppi** — uscite filtrabili per interesse, iscrizione.
5. **Dettaglio uscita** — foto del luogo, organizzatore, ritrovo, posti,
   iscrizione, chat e recensioni con stelle e foto.
6. **Chat** — messaggi del gruppo dell'uscita o del percorso, con campo di
   scrittura per chi è iscritto.
7. **Mappa** — mappa illustrativa e realtà locali.
8. **Profilo** — verifica del profilo, uscite prenotate e percorsi scelti.
9. **Proponi** — accessibile solo con profilo verificato; si sceglie tra tappa,
   percorso, gruppo e attività. Per un'attività si seleziona la guida verificata
   e si vede la sua scheda prima dell'invio. Dopo l'invio si può tornare alla
   home o compilare un'altra proposta.

## Immagini

Le immagini stanno in `assets/img/` e hanno nomi parlanti:

| File | Uso | Formato consigliato |
| --- | --- | --- |
| `luogo-*.jpg` | foto del luogo nella card e nel dettaglio | 1200 × 750 px |
| `persona-*.jpg` | volti di organizzatori e recensori | 240 × 240 px (quadrata) |
| `foto-*.jpg` | foto allegate alle recensioni | 720 × 540 px |

Per sostituire una foto basta rimpiazzare il file mantenendo lo stesso nome,
oppure cambiare il percorso dentro `js/data.js`. Le immagini sono già ritagliate
e compresse: se ne aggiungi di nuove, meglio restare sotto i 250 KB ciascuna.

### Crediti delle foto

Le foto dei luoghi vengono da [Wikimedia Commons](https://commons.wikimedia.org)
e sono usate con licenza CC BY-SA (o pubblico dominio). Se pubblichi il progetto,
mantieni l'attribuzione e la licenza indicata:

- `luogo-sanita.jpg`, `foto-sanita.jpg` — *Rione sanità 1* di Barrosh.m (CC BY-SA 3.0)
  e *Rione Sanità (Naples)* di Alexandre (CC BY-SA 4.0)
- `luogo-san-giovanni.jpg` — *Un Murale per Giancarlo Siani* di Silviasca (CC BY-SA 4.0)
- `luogo-bagnoli.jpg` — *Pontile Nord Bagnoli Napoli* di Armando Tripodi (pubblico dominio)
- `luogo-capodimonte.jpg` — *Real Bosco di Capodimonte (9923)* di Giuseppe Guida (CC BY-SA 4.0)
- `luogo-materdei.jpg` — *Napoli - Piazzetta San Gennaro a Materdei 7599* di Phyrexian (CC BY-SA 4.0)
- `foto-murales.jpg` — *Roxy In The Box street art in Naples* di Mattia Luigi Nappi (CC BY-SA 4.0)

I ritratti in `persona-*.jpg` sono immagini segnaposto del servizio
[i.pravatar.cc](https://i.pravatar.cc): non corrispondono a persone reali e
vanno sostituiti con foto vere (con il consenso delle persone) prima di
pubblicare l'app.

## Note

- Il progetto è pensato per una visualizzazione mobile (390 × 844). Su schermi
  grandi viene mostrato come un telefono centrato; sotto i 480 px occupa tutto
  lo schermo.
- I testi di percorsi, tappe e recensioni sono contenuti dimostrativi: sostituiscili
  con i contenuti reali in `js/data.js`.
- La verifica del profilo è **simulata**: un click imposta il flag nel browser.
  In un'app reale la verifica va fatta lato server (documento, telefono o account
  verificato) e il flag non deve poter essere modificato dal browser.
- Anche l'invio di un'attività a una guida è simulato: la proposta resta solo in
  memoria e non arriva a nessuno. In un'app reale servirebbe un backend con
  notifiche e risposta della guida.
- I gruppi dei percorsi sono caratterizzati da età e interessi (`eta`,
  `interessi`): servono a far incontrare persone simili nelle passeggiate.
- I font sono inclusi localmente (subset latino). Le licenze originali
  (SIL Open Font License) restano valide.
- I pulsanti "Napoli" e "Notifiche" mostrano un piccolo messaggio demo: sono
  segnaposto per funzioni non presenti nel prototipo.
