/* ==========================================================================
   app.js
   Logica dell'app: stato, navigazione tra schermate, filtri e rendering.
   I contenuti stanno in data.js, gli stili nei file dentro /css.
   ========================================================================== */

'use strict';

/* Chiavi usate per ricordare scelte e verifica nel browser */
const STORAGE_KEY = 'percorsi_shapers_hub_napoli:joined';
const PERCORSI_KEY = 'percorsi_shapers_hub_napoli:percorsi';
const VERIFY_KEY = 'percorsi_shapers_hub_napoli:verified';

/* Stato dell'app: tutto ciò che cambia mentre la si usa */
const state = {
  screen: 'home',      // schermata visibile
  filter: 'tutte',     // filtro attivo (id di CHIPS)
  q: '',               // testo di ricerca
  joined: loadJoined(STORAGE_KEY),          // uscite: { u1: true, ... }
  joinedPercorsi: loadJoined(PERCORSI_KEY), // percorsi: { p1: true, ... }
  verified: loadVerified(),                 // profilo verificato?
  percorso: 'p1',      // percorso aperto nel dettaglio
  uscita: 'u1',        // uscita aperta nel dettaglio
  chatType: 'uscita',  // a quale gruppo appartiene la chat aperta
  stars: 5,            // voto scelto nel form recensione dell'uscita
  percorsoStars: 5,    // voto scelto nel form recensione del percorso
  reviewOpen: false,   // (non più usato, mantenuto per compatibilità)
  uscitaReviewOpen: false,   // form recensione dell'uscita aperto?
  percorsoReviewOpen: false, // form recensione del percorso aperto?
  newReviews: {},            // recensioni uscite scritte nella demo
  newPercorsoReviews: {},    // recensioni percorsi scritte nella demo
  messages: {},              // messaggi uscite scritti nella demo
  percorsoMessages: {},      // messaggi percorsi scritti nella demo
  proposalType: 'tappa',     // tappa | percorso | gruppo | attivita
  guide: 'g1',               // guida scelta per un'attività
  sentType: 'tappa',         // tipo dell'ultima proposta inviata
  sentGuide: null,           // guida dell'ultima attività inviata
  sentName: '',              // titolo dell'ultima proposta inviata
  sent: false,               // proposta inviata?
  mapLayer: 'tutto',         // filtro della mappa (id di MAP_LAYERS)
  mapZone: 'Materdei'        // quartiere aperto nella scheda della mappa
};

/* Tipi di proposta della schermata "Proponi".
   Testi, campi e messaggio di conferma cambiano in base al tipo scelto. */
const PROPOSAL_TYPES = {
  tappa: {
    nome: 'Nome del posto',
    nomePlaceholder: 'Es. Palazzo dello Spagnolo',
    quartiere: 'Quartiere',
    descrizione: 'Perché merita di essere camminato',
    descrizionePlaceholder: 'Racconta il luogo e perché vorresti farlo conoscere.',
    hint: 'La squadra di mapping verifica il luogo sul posto prima di pubblicarlo.',
    submit: 'Invia la tappa',
    successTitle: 'Grazie! La tua tappa è arrivata.',
    successText: 'La squadra di mapping la verifica sul posto prima di pubblicarla.'
  },
  percorso: {
    nome: 'Nome del percorso',
    nomePlaceholder: 'Es. Dai Quartieri Spagnoli al mare',
    quartiere: 'Zona di partenza',
    descrizione: 'Racconta il percorso e le sue tappe',
    descrizionePlaceholder: 'Da dove parte, cosa si vede, quanto dura…',
    hint: 'La redazione controlla il tracciato e le tappe prima di pubblicarlo.',
    submit: 'Invia il percorso',
    successTitle: 'Grazie! La tua proposta di percorso è arrivata.',
    successText: 'La redazione controlla il tracciato e le tappe prima di pubblicarlo.'
  },
  gruppo: {
    nome: 'Nome del gruppo o dell’uscita',
    nomePlaceholder: 'Es. Passeggiata fotografica al Vomero',
    quartiere: 'Quartiere',
    descrizione: 'Racconta l’uscita e a chi è pensata',
    descrizionePlaceholder: 'Interessi, fascia d’età, ritmo della camminata…',
    hint: 'La proposta viene mostrata alle guide della zona, che possono organizzarla.',
    submit: 'Proponi il gruppo',
    successTitle: 'Grazie! La tua proposta di gruppo è arrivata.',
    successText: 'Le guide della zona la valutano e, se ci sono le condizioni, la trasformano in un’uscita.'
  },
  attivita: {
    nome: 'Titolo dell’attività',
    nomePlaceholder: 'Es. Laboratorio di fotografia ai Quartieri Spagnoli',
    quartiere: 'Quartiere',
    descrizione: 'Descrivi l’attività che vuoi proporre',
    descrizionePlaceholder: 'Che cosa si fa, quanto dura, a chi è rivolta…',
    hint: 'La proposta viene inviata direttamente alla guida scelta, che potrà accettarla e risponderti.',
    submit: 'Invia alla guida',
    successTitle: 'Proposta inviata alla guida.',
    successText: 'La guida valuterà l’attività e potrà risponderti dalla chat del gruppo.'
  }
};

/* Piccoli aiutanti per scrivere meno codice */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/* Trasforma i caratteri speciali in testo: evita che un messaggio
   scritto dall'utente "rompa" l'HTML della pagina */
function escapeHtml(text) {
  const caratteri = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text).replace(/[&<>"']/g, (c) => caratteri[c]);
}

/* --------------------------------------------------------------------------
   Scelte salvate nel browser (localStorage)
   -------------------------------------------------------------------------- */
function loadJoined(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch (error) {
    return {};
  }
}

function saveJoined(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    /* Se il browser blocca localStorage, l'app funziona comunque */
  }
}

function loadVerified() {
  try {
    return localStorage.getItem(VERIFY_KEY) === 'true';
  } catch (error) {
    return false;
  }
}

/* --------------------------------------------------------------------------
   Dati filtrati in base a ricerca e chip
   -------------------------------------------------------------------------- */
function currentUscite() {
  const q = state.q.trim().toLowerCase();

  return DATA.uscite.filter((uscita) => {
    const matchFilter = state.filter === 'tutte' || uscita.cat === state.filter;
    const matchText = !q || `${uscita.title} ${uscita.meta}`.toLowerCase().includes(q);
    return matchFilter && matchText;
  });
}

function currentPercorsi() {
  const q = state.q.trim().toLowerCase();

  return DATA.percorsi.filter((percorso) => {
    return !q || `${percorso.name} ${percorso.zone}`.toLowerCase().includes(q);
  });
}

function selectedPercorso() {
  return DATA.percorsi.find((p) => p.id === state.percorso) || DATA.percorsi[0];
}

function joinedCount() {
  return DATA.uscite.filter((u) => state.joined[u.id]).length;
}

function selectedUscita() {
  return DATA.uscite.find((u) => u.id === state.uscita) || DATA.uscite[0];
}

/* Recensioni dell'uscita: prima quelle scritte nella demo, poi quelle di data.js */
function reviewsOf(uscita) {
  return (state.newReviews[uscita.id] || []).concat(uscita.recensioni);
}

/* Lo stesso per i percorsi */
function reviewsOfPercorso(percorso) {
  return (state.newPercorsoReviews[percorso.id] || []).concat(percorso.recensioni);
}

/* Cinque stelle: quelle piene sono terracotta, le vuote grigie */
function starsHtml(stelle) {
  const stelle5 = Array.from({ length: 5 }, (_, i) => {
    return `<span class="${i < stelle ? 'is-on' : ''}">★</span>`;
  }).join('');

  return `<span class="stars" role="img" aria-label="${stelle} stelle su 5">${stelle5}</span>`;
}

/* Numero medio con la virgola, es. 4,7 */
function averageRating(recensioni) {
  if (!recensioni.length) return '—';
  const somma = recensioni.reduce((tot, r) => tot + r.stelle, 0);
  return (somma / recensioni.length).toFixed(1).replace('.', ',');
}

/* Una recensione: usata sia per le uscite sia per i percorsi */
function reviewItemHtml(recensione) {
  const nome = `${recensione.nome} ${recensione.cognome || ''}`.trim();
  const avatar = recensione.img
    ? `<img class="review-item__avatar" src="${recensione.img}" alt="" loading="lazy">`
    : `<span class="review-item__avatar review-item__avatar--initials" aria-hidden="true">${nome.charAt(0)}</span>`;

  const foto = recensione.foto && recensione.foto.length
    ? `<div class="review-photos">${recensione.foto.map((src) => `
        <img src="${src}" alt="Foto scattata durante il percorso" loading="lazy">
      `).join('')}</div>`
    : '';

  return `
    <article class="review-item">
      <header class="review-item__head">
        ${avatar}
        <div class="review-item__who">
          <p class="review-item__name">${nome}</p>
          ${starsHtml(recensione.stelle)}
        </div>
      </header>
      <p class="review-item__text">${recensione.testo}</p>
      ${foto}
    </article>`;
}

/* Riepilogo del voto mostrato accanto al titolo "Recensioni" */
function ratingSummaryHtml(recensioni) {
  if (!recensioni.length) return 'Nessuna recensione';

  return `<span class="rating-summary__star" aria-hidden="true">★</span> ${averageRating(recensioni)} · ${recensioni.length} ${recensioni.length === 1 ? 'recensione' : 'recensioni'}`;
}

/* --------------------------------------------------------------------------
   Pezzi di HTML generati dai dati
   -------------------------------------------------------------------------- */
function datePill(uscita) {
  const tone = uscita.tone === 'pine' ? 'date-pill--pine' : 'date-pill--brick';
  return `<p class="date-pill ${tone}">${uscita.date}</p>`;
}

function joinButton(uscita) {
  const joined = Boolean(state.joined[uscita.id]);

  return `
    <button class="btn btn--join ${joined ? 'is-joined' : ''}"
            type="button"
            data-join="${uscita.id}"
            aria-pressed="${joined}">
      ${joined ? 'Iscritto' : 'Unisciti'}
    </button>`;
}

/* Card usata nella home (orizzontale) e in Gruppi (a tutta larghezza) */
function uscitaCard(uscita, wide) {
  const joined = Boolean(state.joined[uscita.id]);
  const posti = Math.max(0, uscita.posti - (joined ? 1 : 0));

  return `
    <article class="card card--uscita ${wide ? 'is-wide' : ''}">
      <img class="card__media" src="${uscita.img}" alt="${uscita.imgAlt}" loading="lazy">

      <div class="card__content">
        ${datePill(uscita)}

        <h3 class="card__title">
          <button class="card__title-btn" type="button" data-uscita="${uscita.id}">
            ${uscita.title}
          </button>
        </h3>

        <p class="card__meta">${uscita.meta}</p>
        <p class="card__organizer">con ${uscita.organizzatore.nome} ${uscita.organizzatore.cognome}</p>

        <div class="card__footer">
          <p class="card__small">${posti} posti liberi</p>
          ${joinButton(uscita)}
        </div>
      </div>
    </article>`;
}

function percorsoCard(percorso, showBadge) {
  const badge = showBadge ? '<span class="badge">Fuori dal centro</span>' : '';
  const recensioni = reviewsOfPercorso(percorso);

  return `
    <button class="card card--percorso" type="button" data-open="${percorso.id}">
      <span class="card__media-wrap">
        <img class="card__media card__media--percorso" src="${percorso.img}" alt="${percorso.imgAlt}" loading="lazy">
        <svg class="route-badge" viewBox="0 0 84 84" aria-hidden="true">
          <path d="${percorso.path}" fill="none" stroke="#FFFFFF"
                stroke-width="3" stroke-linecap="round" stroke-dasharray="1 7"></path>
          <circle cx="${percorso.start.x}" cy="${percorso.start.y}" r="4" fill="#FFFFFF"></circle>
          <circle cx="${percorso.end.x}" cy="${percorso.end.y}" r="4" fill="#FFFFFF"></circle>
        </svg>
      </span>

      <span class="card__content">
        ${badge}
        <span class="card__title">${percorso.name}</span>
        <span class="card__meta">
          ${percorso.zone} · ${percorso.km} · ${percorso.durata} · ${percorso.tappe.length} tappe
        </span>
        <span class="card__rating">
          <span class="rating-summary">
            ${ratingSummaryHtml(recensioni)}
          </span>
          <span class="card__small">${percorso.partecipanti} nel gruppo · ${percorso.eta}</span>
        </span>
      </span>
    </button>`;
}

function realtaRow(realta, withAction) {
  /* In home "Sulla mappa" apre la mappa sul quartiere della realtà;
     nella mappa la riga mostra anche quanto è lontana */
  const action = withAction
    ? `<button class="list-row__action" type="button" data-map-zone="${realta.quartiere}">Sulla mappa</button>`
    : `<button class="list-row__action" type="button" data-demo="contatto">Contatta</button>`;

  const zona = quartiereByName(realta.quartiere);
  const distanza = !withAction && zona ? ` · ${zona.daTe}` : '';

  return `
    <div class="list-row">
      <span class="list-row__dot" style="background: ${realta.bg}"></span>
      <span class="list-row__text">
        <span class="list-row__name">${realta.name}</span>
        <span class="list-row__meta">${realta.meta}${distanza}</span>
      </span>
      ${action}
    </div>`;
}

/* --------------------------------------------------------------------------
   Mappa: quartieri, filtri e scheda del quartiere scelto
   -------------------------------------------------------------------------- */
function quartiereByName(nome) {
  return DATA.quartieri.find((q) => q.nome === nome);
}

/* Tutto ciò che si trova in un quartiere, diviso per tipo */
function contenutiQuartiere(nome) {
  return {
    percorsi: DATA.percorsi.filter((p) => p.zone === nome),
    uscite: DATA.uscite.filter((u) => u.quartiere === nome),
    realta: DATA.realta.filter((r) => r.quartiere === nome)
  };
}

/* Quanti elementi conta il filtro attivo */
function contaPerFiltro(contenuti) {
  if (state.mapLayer === 'tutto') {
    return contenuti.percorsi.length + contenuti.uscite.length + contenuti.realta.length;
  }
  return contenuti[state.mapLayer].length;
}

function plurale(n, uno, tanti) {
  return `${n} ${n === 1 ? uno : tanti}`;
}

function descriviContenuti(contenuti) {
  const parti = [];
  if (contenuti.percorsi.length) parti.push(plurale(contenuti.percorsi.length, 'percorso', 'percorsi'));
  if (contenuti.uscite.length) parti.push(plurale(contenuti.uscite.length, 'uscita', 'uscite'));
  if (contenuti.realta.length) parti.push(plurale(contenuti.realta.length, 'realtà locale', 'realtà locali'));
  return parti.join(', ') || 'niente in programma';
}

function mapPin(zona) {
  const contenuti = contenutiQuartiere(zona.nome);
  const n = contaPerFiltro(contenuti);
  const attivo = state.mapZone === zona.nome;
  const sei = zona.daTe === 'Sei qui';

  /* Posizione in percentuale: il bottone segue il disegno a ogni larghezza */
  const left = (zona.x / 360) * 100;
  const top = (zona.y / 280) * 100;

  return `
    <button class="map-pin ${attivo ? 'is-active' : ''} ${n ? '' : 'is-empty'}"
            type="button"
            style="left: ${left}%; top: ${top}%"
            data-map-zone="${zona.nome}"
            aria-pressed="${attivo}"
            aria-label="${zona.nome}: ${descriviContenuti(contenuti)}${sei ? ', sei qui' : ''}">
      <span class="map-pin__count" aria-hidden="true">
        ${n}
        ${sei ? '<span class="map-pin__you"></span>' : ''}
      </span>
      <span class="map-pin__name" aria-hidden="true">${zona.nome}</span>
    </button>`;
}

function zoneItemPercorso(p) {
  return `
    <button class="zone-item" type="button" data-open="${p.id}">
      <img class="zone-item__img" src="${p.img}" alt="" loading="lazy">
      <span class="zone-item__text">
        <span class="zone-item__kicker zone-item__kicker--route">Percorso</span>
        <span class="zone-item__title">${p.name}</span>
        <span class="zone-item__meta">${p.km} · ${p.durata} · ★ ${averageRating(reviewsOfPercorso(p))}</span>
      </span>
    </button>`;
}

function zoneItemUscita(u) {
  const joined = Boolean(state.joined[u.id]);
  const posti = Math.max(0, u.posti - (joined ? 1 : 0));

  return `
    <button class="zone-item" type="button" data-uscita="${u.id}">
      <img class="zone-item__img" src="${u.img}" alt="" loading="lazy">
      <span class="zone-item__text">
        <span class="zone-item__kicker zone-item__kicker--${u.tone === 'pine' ? 'pine' : 'brick'}">${u.date}</span>
        <span class="zone-item__title">${u.title}</span>
        <span class="zone-item__meta">${joined ? 'Sei iscritto' : `${posti} posti liberi`}</span>
      </span>
    </button>`;
}

function zoneItemRealta(r) {
  return `
    <div class="zone-item zone-item--static">
      <span class="zone-item__dot" style="background: ${r.bg}" aria-hidden="true"></span>
      <span class="zone-item__text">
        <span class="zone-item__kicker">Realtà locale</span>
        <span class="zone-item__title">${r.name}</span>
        <span class="zone-item__meta">${r.meta}</span>
      </span>
      <button class="list-row__action" type="button" data-demo="contatto">Contatta</button>
    </div>`;
}

function renderMappa() {
  const zona = quartiereByName(state.mapZone) || DATA.quartieri[0];
  const contenuti = contenutiQuartiere(zona.nome);
  const layer = state.mapLayer;

  $('#map-stats').textContent =
    `${DATA.quartieri.length} quartieri · ${plurale(DATA.percorsi.length, 'percorso', 'percorsi')} · ${plurale(DATA.uscite.length, 'uscita', 'uscite')} in programma`;

  $('#map-layers').innerHTML = DATA.mapLayers
    .map((l) => {
      const active = l.id === layer;
      return `
        <button class="chip ${active ? 'is-active' : ''}" type="button"
                data-map-layer="${l.id}" aria-pressed="${active}">
          ${l.label}
        </button>`;
    })
    .join('');

  $('#map-pins').innerHTML = DATA.quartieri.map(mapPin).join('');

  /* Scheda del quartiere */
  $('#zone-title').textContent = zona.nome;
  $('#zone-distance').textContent = zona.daTe;
  $('#zone-fact').textContent = zona.curiosita;

  const mostra = (tipo) => layer === 'tutto' || layer === tipo;
  const items = []
    .concat(mostra('percorsi') ? contenuti.percorsi.map(zoneItemPercorso) : [])
    .concat(mostra('uscite') ? contenuti.uscite.map(zoneItemUscita) : [])
    .concat(mostra('realta') ? contenuti.realta.map(zoneItemRealta) : []);

  const n = items.length;
  $('#zone-count').textContent = n ? plurale(n, 'cosa da fare', 'cose da fare') : '';
  $('#zone-count').hidden = !n;
  $('#zone-items').innerHTML = items.join('');

  const etichetta = DATA.mapLayers.find((l) => l.id === layer).label.toLowerCase();
  $('#zone-empty').hidden = n > 0;
  $('#zone-empty').innerHTML = layer === 'tutto'
    ? 'Qui non c’è ancora niente in programma. <button class="link-more" type="button" data-go="proponi">Proponi qualcosa</button>'
    : `Nessun elemento tra “${etichetta}” a ${zona.nome}. Prova un altro quartiere o filtro.`;
}

function openMapZone(nome) {
  if (!quartiereByName(nome)) return;

  if (state.screen !== 'mappa') {
    navigate('mappa', { mapZone: nome });
    return;
  }

  state.mapZone = nome;
  renderMappa();
}

/* --------------------------------------------------------------------------
   Render: aggiorna tutte le parti della pagina in base allo stato
   -------------------------------------------------------------------------- */
function render() {
  renderScreens();
  renderChips();
  renderUscite();
  renderPercorsi();
  renderRealta();
  renderMappa();
  renderDetail();
  renderUscita();
  renderJoined();
  renderProfilo();
  renderChat();
  renderProponi();
  renderQueryBanner();
  renderNav();
  syncSearchInputs();
}

function renderScreens() {
  $$('.screen').forEach((section) => {
    section.hidden = section.dataset.screen !== state.screen;
  });
}

function renderChips() {
  $$('[data-chips]').forEach((container) => {
    container.innerHTML = DATA.chips
      .map((chip) => {
        const active = state.filter === chip.id;
        return `
          <button class="chip ${active ? 'is-active' : ''}"
                  type="button"
                  data-filter="${chip.id}"
                  aria-pressed="${active}">
            ${chip.label}
          </button>`;
      })
      .join('');
  });
}

function renderUscite() {
  const uscite = currentUscite();

  $('#uscite-home').innerHTML = uscite.map((u) => uscitaCard(u, false)).join('');
  $('#uscite-gruppi').innerHTML = uscite.map((u) => uscitaCard(u, true)).join('');

  $('#uscite-home-empty').hidden = uscite.length > 0;
  $('#uscite-gruppi-empty').hidden = uscite.length > 0;

  const count = joinedCount();
  $('#joined-count').textContent = `Sei iscritto a ${count} ${count === 1 ? 'uscita' : 'uscite'}`;
}

function renderPercorsi() {
  const percorsi = currentPercorsi();

  $('#percorsi-home').innerHTML = DATA.percorsi
    .slice(0, 2)
    .map((p) => percorsoCard(p, true))
    .join('');

  $('#percorsi-list').innerHTML = percorsi.map((p) => percorsoCard(p, false)).join('');
  $('#percorsi-empty').hidden = percorsi.length > 0;
}

function renderRealta() {
  $('#realta-home').innerHTML = DATA.realta.map((r) => realtaRow(r, true)).join('');
  /* Nella mappa, prima le realtà più vicine (l'ordine di QUARTIERI) */
  const ordine = (r) => DATA.quartieri.findIndex((q) => q.nome === r.quartiere);
  const vicine = DATA.realta.slice().sort((a, b) => ordine(a) - ordine(b));
  $('#realta-mappa').innerHTML = vicine.map((r) => realtaRow(r, false)).join('');
}

function renderDetail() {
  const percorso = selectedPercorso();
  const joined = Boolean(state.joinedPercorsi[percorso.id]);
  const recensioni = reviewsOfPercorso(percorso);

  const path = $('#detail-path');
  path.setAttribute('d', percorso.path);
  path.setAttribute('stroke', percorso.color);

  const start = $('#detail-start');
  start.setAttribute('cx', percorso.start.x);
  start.setAttribute('cy', percorso.start.y);

  const end = $('#detail-end');
  end.setAttribute('cx', percorso.end.x);
  end.setAttribute('cy', percorso.end.y);
  end.setAttribute('fill', percorso.color);

  $('#percorso-img').src = percorso.img;
  $('#percorso-img').alt = percorso.imgAlt;
  $('#percorso-place').textContent = `${percorso.zone} · ${percorso.km}`;

  $('[data-detail="badge"]').textContent = `Fuori dal centro · ${percorso.zone}`;
  $('[data-detail="name"]').textContent = percorso.name;
  $('[data-detail="meta"]').textContent =
    `${percorso.km} · ${percorso.durata} · per ${percorso.eta}`;
  $('[data-detail="description"]').textContent = percorso.descrizione;

  $('#detail-steps').innerHTML = percorso.tappe.map((tappa) => `<li>${tappa}</li>`).join('');

  $('[data-detail="km"]').textContent = percorso.km;
  $('[data-detail="durata"]').textContent = percorso.durata;
  $('[data-detail="eta"]').textContent = percorso.eta;
  $('[data-detail="partecipanti"]').textContent =
    `${percorso.partecipanti + (joined ? 1 : 0)} persone`;

  $('#percorso-tags').innerHTML = percorso.interessi
    .map((interesse) => `<span class="tag">${interesse}</span>`)
    .join('');

  $('#percorso-guida-img').src = percorso.guida.img;
  $('#percorso-guida-img').alt = `Foto di ${percorso.guida.nome} ${percorso.guida.cognome}`;
  $('#percorso-guida-name').textContent = `${percorso.guida.nome} ${percorso.guida.cognome}`;
  $('#percorso-guida-role').textContent = percorso.guida.ruolo;

  const joinBtn = $('#percorso-join');
  joinBtn.textContent = joined ? 'Iscritto · annulla' : 'Unisciti al gruppo';
  joinBtn.classList.toggle('btn--primary', !joined);
  joinBtn.classList.toggle('btn--outline', joined);
  joinBtn.setAttribute('aria-pressed', String(joined));

  $('#percorso-rating').innerHTML = ratingSummaryHtml(recensioni);
  $('#percorso-reviews').innerHTML = recensioni.map(reviewItemHtml).join('');

  $('#percorso-review-form').hidden = !state.percorsoReviewOpen;
  $('#percorso-review-label').textContent = state.percorsoReviewOpen
    ? 'Chiudi il form'
    : 'Scrivi una recensione';

  $$('#percorso-review-form .star').forEach((star) => {
    const on = Number(star.dataset.percorsoStar) <= state.percorsoStars;
    star.classList.toggle('is-on', on);
    star.setAttribute('aria-pressed', String(on));
  });
}

function categoryLabel(uscita) {
  const chip = DATA.chips.find((c) => c.id === uscita.cat);
  return chip ? chip.label : 'Uscita in gruppo';
}

function renderUscita() {
  const uscita = selectedUscita();
  const joined = Boolean(state.joined[uscita.id]);
  const posti = Math.max(0, uscita.posti - (joined ? 1 : 0));
  const recensioni = reviewsOf(uscita);

  $('#uscita-img').src = uscita.img;
  $('#uscita-img').alt = uscita.imgAlt;
  $('#uscita-date').textContent = uscita.date;
  $('#uscita-badge').textContent = categoryLabel(uscita);
  $('#uscita-title').textContent = uscita.title;
  $('#uscita-meta').textContent = uscita.meta;
  $('#uscita-description').textContent = uscita.descrizione;
  $('#uscita-ritrovo').textContent = uscita.ritrovo;
  $('#uscita-posti').textContent = `${posti} su ${uscita.posti}`;

  $('#uscita-org-img').src = uscita.organizzatore.img;
  $('#uscita-org-img').alt = `Foto di ${uscita.organizzatore.nome} ${uscita.organizzatore.cognome}`;
  $('#uscita-org-name').textContent = `${uscita.organizzatore.nome} ${uscita.organizzatore.cognome}`;
  $('#uscita-org-role').textContent = uscita.organizzatore.ruolo;

  const joinBtn = $('#uscita-join');
  joinBtn.textContent = joined ? 'Iscritto · annulla' : 'Unisciti all’uscita';
  joinBtn.classList.toggle('btn--primary', !joined);
  joinBtn.classList.toggle('btn--outline', joined);
  joinBtn.setAttribute('aria-pressed', String(joined));

  $('#uscita-rating').innerHTML = ratingSummaryHtml(recensioni);
  $('#uscita-reviews').innerHTML = recensioni.map(reviewItemHtml).join('');

  $('#uscita-review-form').hidden = !state.uscitaReviewOpen;
  $('#uscita-review-label').textContent = state.uscitaReviewOpen
    ? 'Chiudi il form'
    : 'Scrivi una recensione';

  $$('#uscita-review-form .star').forEach((star) => {
    const on = Number(star.dataset.star) <= state.stars;
    star.classList.toggle('is-on', on);
    star.setAttribute('aria-pressed', String(on));
  });
}

function renderChat() {
  const isPercorso = state.chatType === 'percorso';
  const target = isPercorso ? selectedPercorso() : selectedUscita();
  const joined = isPercorso
    ? Boolean(state.joinedPercorsi[target.id])
    : Boolean(state.joined[target.id]);

  const partecipanti = isPercorso ? target.partecipanti : target.chatPartecipanti;
  const messaggiBase = isPercorso
    ? (DATA.percorsoChat[target.id] || [])
    : (DATA.chat[target.id] || []);
  const messaggiDemo = isPercorso
    ? (state.percorsoMessages[target.id] || [])
    : (state.messages[target.id] || []);
  const messaggi = messaggiBase.concat(messaggiDemo);

  $('#chat-avatar').src = isPercorso ? target.guida.img : target.organizzatore.img;
  $('#chat-avatar').alt = isPercorso
    ? `Foto di ${target.guida.nome}`
    : `Foto di ${target.organizzatore.nome}`;

  $('#chat-title').textContent = isPercorso ? target.name : target.title;
  $('#chat-sub').textContent = isPercorso
    ? `${partecipanti + (joined ? 1 : 0)} partecipanti · ${target.eta} · ${target.interessi.join(' · ')}`
    : `${partecipanti + (joined ? 1 : 0)} partecipanti · ${target.date}`;

  $('#chat-thread').innerHTML = messaggi.map((m) => {
    if (m.mio) {
      return `
        <div class="bubble bubble--mine">
          <p class="bubble__text">${m.testo}</p>
          <p class="bubble__time">${m.ora}</p>
        </div>`;
    }

    return `
      <div class="bubble">
        <img class="bubble__avatar" src="${m.img}" alt="" loading="lazy">
        <div class="bubble__body">
          <p class="bubble__name">${m.nome}</p>
          <p class="bubble__text">${m.testo}</p>
          <p class="bubble__time">${m.ora}</p>
        </div>
      </div>`;
  }).join('');

  $('#chat-gate').hidden = joined;
  $('#chat-gate-text').textContent = isPercorso
    ? 'Unisciti al gruppo per scrivere e conoscere gli altri.'
    : 'Unisciti all’uscita per scrivere nel gruppo.';
  $('#chat-form').hidden = !joined;

  const thread = $('#chat-thread');
  thread.scrollTop = thread.scrollHeight;
}

function renderJoined() {
  const uscite = DATA.uscite.filter((u) => state.joined[u.id]);
  const percorsi = DATA.percorsi.filter((p) => state.joinedPercorsi[p.id]);

  $('#joined-title-count').textContent = uscite.length;
  $('#joined-empty').hidden = uscite.length > 0;

  $('#joined-list').innerHTML = uscite
    .map((u) => `
      <div class="joined-card">
        <span class="joined-card__date">${u.date}</span>
        <span class="joined-card__title">${u.title}</span>
      </div>`)
    .join('');

  $('#joined-percorsi-count').textContent = percorsi.length;
  $('#joined-percorsi-empty').hidden = percorsi.length > 0;

  $('#joined-percorsi-list').innerHTML = percorsi
    .map((p) => `
      <div class="joined-card">
        <span class="joined-card__date">${p.zone} · ${p.eta}</span>
        <span class="joined-card__title">${p.name}</span>
        <span class="joined-card__meta">${p.partecipanti + 1} partecipanti · ${p.interessi.join(' · ')}</span>
      </div>`)
    .join('');
}

function renderProfilo() {
  $('#verify-title').textContent = state.verified ? 'Profilo verificato' : 'Profilo non verificato';
  $('#verify-desc').textContent = state.verified
    ? 'Puoi proporre tappe, percorsi, gruppi e attività alle guide verificate. Nome e zona sono visibili a chi partecipa.'
    : 'Per proporre una tappa, un percorso, un gruppo o un’attività serve un profilo verificato: così guide e gruppi sanno chi propone.';
  $('#verify-icon').textContent = state.verified ? '✓' : '!';
  $('#profilo-verify').classList.toggle('is-verified', state.verified);
  $('#verify-btn').hidden = state.verified;
}

function verifiedGuides() {
  const guide = DATA.guide.filter((guida) => guida.verificata);
  return guide.length ? guide : DATA.guide;
}

function renderGuideOptions() {
  const guide = verifiedGuides();
  const select = $('#proponi-guida');

  if (!select.options.length) {
    select.innerHTML = guide
      .map((guida) => `
        <option value="${guida.id}">
          ${guida.nome} ${guida.cognome} · ${guida.zone}
        </option>`)
      .join('');
  }

  const exists = guide.some((guida) => guida.id === state.guide);
  if (!exists) state.guide = guide[0].id;
  select.value = state.guide;
}

function renderGuidePreview() {
  const guide = verifiedGuides();
  const guida = guide.find((g) => g.id === state.guide) || guide[0];

  $('#guida-preview-img').src = guida.img;
  $('#guida-preview-img').alt = `Foto di ${guida.nome} ${guida.cognome}`;
  $('#guida-preview-name').textContent = `${guida.nome} ${guida.cognome}`;
  $('#guida-preview-role').textContent = guida.ruolo;
  $('#guida-preview-interests').textContent =
    `${guida.zone} · ${guida.interessi.join(' · ')}`;
}

function renderProponi() {
  const config = PROPOSAL_TYPES[state.proposalType];
  const verificato = state.verified;
  const inviata = state.sent;

  $('#proponi-gate').hidden = verificato || inviata;
  $('#proponi-verified').hidden = !verificato || inviata;
  $('#proponi-types').hidden = !verificato || inviata;
  $('#proponi-form').hidden = !verificato || inviata;
  $('#proponi-success').hidden = !inviata;

  /* Evidenzia il tipo scelto */
  $$('[data-proposal]').forEach((button) => {
    const attivo = button.dataset.proposal === state.proposalType;
    button.classList.toggle('is-active', attivo);
    button.setAttribute('aria-pressed', String(attivo));
  });

  /* Testi del form */
  $('#proponi-nome-label').textContent = config.nome;
  $('#proponi-nome').placeholder = config.nomePlaceholder;
  $('#proponi-quartiere-label').textContent = config.quartiere;
  $('#proponi-descrizione-label').textContent = config.descrizione;
  $('#proponi-descrizione').placeholder = config.descrizionePlaceholder;
  $('#proponi-hint').textContent = config.hint;
  $('#proponi-submit').textContent = config.submit;

  /* Campi che compaiono solo per alcuni tipi */
  const isAttivita = state.proposalType === 'attivita';
  const conData = state.proposalType === 'gruppo' || isAttivita;

  $('#proponi-guida-field').hidden = !isAttivita;
  $('#proponi-guida').required = isAttivita;
  $('#proponi-guida-preview').hidden = !isAttivita;
  $('#proponi-data-field').hidden = !conData;

  renderGuideOptions();
  if (isAttivita) renderGuidePreview();

  /* Messaggio di conferma */
  if (inviata) {
    if (state.sentType === 'attivita') {
      const guida = DATA.guide.find((g) => g.id === state.sentGuide) || DATA.guide[0];
      $('#proponi-success-title').textContent =
        `Proposta inviata a ${guida.nome} ${guida.cognome}.`;
      $('#proponi-success-text').textContent =
        `“${state.sentName}” è stata inviata alla guida verificata. Potrà accettarla e risponderti dalla chat del gruppo.`;
    } else {
      const sentConfig = PROPOSAL_TYPES[state.sentType];
      $('#proponi-success-title').textContent = sentConfig.successTitle;
      $('#proponi-success-text').textContent = sentConfig.successText;
    }
  }
}

function renderQueryBanner() {
  const query = state.q.trim();
  $('#query-banner').hidden = !query;
  $('#query-text').textContent = query;
}

function renderNav() {
  /* Il dettaglio illumina "Percorsi", uscita/chat illuminano "Gruppi",
     la chat di un percorso illumina "Percorsi", "Proponi" illumina "Profilo" */
  const tab = state.screen === 'dettaglio'
    ? 'percorsi'
    : state.screen === 'proponi'
      ? 'profilo'
      : state.screen === 'chat'
        ? (state.chatType === 'percorso' ? 'percorsi' : 'gruppi')
        : state.screen === 'uscita'
          ? 'gruppi'
          : state.screen;

  $$('.nav-item').forEach((item) => {
    const active = item.dataset.tab === tab;
    item.classList.toggle('is-active', active);

    if (active) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });
}

function syncSearchInputs() {
  $$('.js-search').forEach((input) => {
    if (input.value !== state.q) input.value = state.q;
  });
}

/* --------------------------------------------------------------------------
   Azioni
   -------------------------------------------------------------------------- */
function navigate(screen, extra) {
  state.screen = screen;
  state.uscitaReviewOpen = false;
  state.percorsoReviewOpen = false;

  if (screen === 'proponi') state.sent = false;

  Object.assign(state, extra || {});

  $('#app-scroll').scrollTop = 0;
  render();
}

function openPercorso(id) {
  state.percorso = id;
  state.percorsoStars = 5;
  state.percorsoReviewOpen = false;
  navigate('dettaglio');
}

function toggleJoin(id) {
  state.joined[id] = !state.joined[id];
  saveJoined(STORAGE_KEY, state.joined);
  render();
}

function togglePercorsoJoin(id) {
  state.joinedPercorsi[id] = !state.joinedPercorsi[id];
  saveJoined(PERCORSI_KEY, state.joinedPercorsi);
  render();
}

function verifyProfile() {
  if (state.verified) return;

  state.verified = true;

  try {
    localStorage.setItem(VERIFY_KEY, 'true');
  } catch (error) {
    /* la verifica resta valida almeno per questa sessione */
  }

  render();
  showToast('Profilo verificato (demo)');

  if (state.screen === 'proponi') $('#proponi-nome').focus();
}

function setProposalType(type) {
  if (!PROPOSAL_TYPES[type]) return;

  state.proposalType = type;
  renderProponi();
}

function showUsciteDelPercorso() {
  const percorso = selectedPercorso();
  navigate('gruppi', { q: percorso.zone, filter: 'tutte' });
}

/* --------------------------------------------------------------------------
   Dettaglio uscita, recensioni e chat
   -------------------------------------------------------------------------- */
function openUscita(id) {
  state.uscita = id;
  state.stars = 5;
  state.uscitaReviewOpen = false;
  navigate('uscita');
}

function openChat(type) {
  state.chatType = type;
  navigate('chat');
}

function toggleUscitaReview() {
  state.uscitaReviewOpen = !state.uscitaReviewOpen;
  renderUscita();

  if (state.uscitaReviewOpen) $('#uscita-review-text').focus();
}

function addUscitaReview(event) {
  event.preventDefault();

  const testo = $('#uscita-review-text').value.trim();
  if (!testo) return;

  const id = state.uscita;
  state.newReviews[id] = state.newReviews[id] || [];
  state.newReviews[id].unshift({
    nome: 'Tu',
    cognome: '',
    img: null,
    stelle: state.stars,
    testo: escapeHtml(testo)
  });

  event.target.reset();
  state.stars = 5;
  state.uscitaReviewOpen = false;
  render();
  showToast('Recensione pubblicata (demo)');
}

/* --------------------------------------------------------------------------
   Recensioni dei percorsi (stesse regole delle uscite)
   -------------------------------------------------------------------------- */
function togglePercorsoReview() {
  state.percorsoReviewOpen = !state.percorsoReviewOpen;
  renderDetail();

  if (state.percorsoReviewOpen) $('#percorso-review-text').focus();
}

function addPercorsoReview(event) {
  event.preventDefault();

  const testo = $('#percorso-review-text').value.trim();
  if (!testo) return;

  const id = state.percorso;
  state.newPercorsoReviews[id] = state.newPercorsoReviews[id] || [];
  state.newPercorsoReviews[id].unshift({
    nome: 'Tu',
    cognome: '',
    img: null,
    stelle: state.percorsoStars,
    testo: escapeHtml(testo)
  });

  event.target.reset();
  state.percorsoStars = 5;
  state.percorsoReviewOpen = false;
  render();
  showToast('Recensione pubblicata (demo)');
}

function sendChatMessage(event) {
  event.preventDefault();

  const input = $('#chat-input');
  const testo = input.value.trim();
  if (!testo) return;

  const isPercorso = state.chatType === 'percorso';
  const id = isPercorso ? state.percorso : state.uscita;
  const joined = isPercorso
    ? Boolean(state.joinedPercorsi[id])
    : Boolean(state.joined[id]);
  if (!joined) return;

  const store = isPercorso ? state.percorsoMessages : state.messages;

  store[id] = store[id] || [];
  store[id].push({
    mio: true,
    testo: escapeHtml(testo),
    ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  });

  input.value = '';
  renderChat();
  input.focus();
}

/* --------------------------------------------------------------------------
   Toast (messaggio temporaneo)
   -------------------------------------------------------------------------- */
let toastTimer;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

/* --------------------------------------------------------------------------
   Eventi
   -------------------------------------------------------------------------- */
document.addEventListener('click', (event) => {
  const goButton = event.target.closest('[data-go]');
  if (goButton) {
    navigate(goButton.dataset.go);
    return;
  }

  const openButton = event.target.closest('[data-open]');
  if (openButton) {
    openPercorso(openButton.dataset.open);
    return;
  }

  const joinButtonEl = event.target.closest('[data-join]');
  if (joinButtonEl) {
    toggleJoin(joinButtonEl.dataset.join);
    return;
  }

  const uscitaButton = event.target.closest('[data-uscita]');
  if (uscitaButton) {
    openUscita(uscitaButton.dataset.uscita);
    return;
  }

  if (event.target.closest('[data-join-uscita]')) {
    toggleJoin(state.uscita);

    if (state.screen === 'chat') $('#chat-input').focus();
    return;
  }

  if (event.target.closest('[data-join-percorso]')) {
    togglePercorsoJoin(state.percorso);

    if (state.screen === 'chat') $('#chat-input').focus();
    return;
  }

  if (event.target.closest('[data-join-chat]')) {
    if (state.chatType === 'percorso') {
      togglePercorsoJoin(state.percorso);
    } else {
      toggleJoin(state.uscita);
    }

    if (state.screen === 'chat') $('#chat-input').focus();
    return;
  }

  if (event.target.closest('[data-chat-percorso]')) {
    openChat('percorso');
    return;
  }

  if (event.target.closest('[data-chat]')) {
    openChat('uscita');
    return;
  }

  if (event.target.closest('[data-chat-back]')) {
    navigate(state.chatType === 'percorso' ? 'dettaglio' : 'uscita');
    return;
  }

  const starButton = event.target.closest('[data-star]');
  if (starButton) {
    state.stars = Number(starButton.dataset.star);
    renderUscita();
    return;
  }

  const percorsoStarButton = event.target.closest('[data-percorso-star]');
  if (percorsoStarButton) {
    state.percorsoStars = Number(percorsoStarButton.dataset.percorsoStar);
    renderDetail();
    return;
  }

  if (event.target.closest('[data-uscita-review]')) {
    toggleUscitaReview();
    return;
  }

  if (event.target.closest('[data-percorso-review]')) {
    togglePercorsoReview();
    return;
  }

  const mapZoneButton = event.target.closest('[data-map-zone]');
  if (mapZoneButton) {
    openMapZone(mapZoneButton.dataset.mapZone);
    return;
  }

  const mapLayerButton = event.target.closest('[data-map-layer]');
  if (mapLayerButton) {
    state.mapLayer = mapLayerButton.dataset.mapLayer;
    renderMappa();
    return;
  }

  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) {
    state.filter = filterButton.dataset.filter;
    render();
    return;
  }

  if (event.target.closest('[data-clear-q]')) {
    state.q = '';
    render();
    return;
  }

  if (event.target.closest('[data-verify]')) {
    verifyProfile();
    return;
  }

  const proposalButton = event.target.closest('[data-proposal]');
  if (proposalButton) {
    setProposalType(proposalButton.dataset.proposal);
    return;
  }

  if (event.target.closest('[data-new-proposal]')) {
    state.sent = false;
    state.proposalType = 'tappa';
    state.sentGuide = null;
    state.sentName = '';
    render();
    $('#app-scroll').scrollTop = 0;
    return;
  }

  if (event.target.closest('[data-see-uscite]')) {
    showUsciteDelPercorso();
    return;
  }

  const demoButton = event.target.closest('[data-demo]');
  if (demoButton) {
    showToast(`Demo: ${demoButton.dataset.demo} non ancora attivo`);
  }
});

/* Ricerca: un solo testo condiviso tra home, percorsi e gruppi */
document.addEventListener('input', (event) => {
  if (!event.target.matches('.js-search')) return;

  state.q = event.target.value;
  render();
});

/* Invio della proposta (solo se il profilo è verificato) */
$('#proponi-form').addEventListener('submit', (event) => {
  event.preventDefault();

  if (!state.verified) {
    showToast('Verifica il profilo per inviare una proposta');
    return;
  }

  state.sentType = state.proposalType;
  state.sentGuide = state.proposalType === 'attivita' ? state.guide : null;
  state.sentName = $('#proponi-nome').value.trim();
  state.sent = true;

  event.target.reset();
  $('#app-scroll').scrollTop = 0;
  render();
});

/* Scelta della guida per un'attività */
$('#proponi-guida').addEventListener('change', (event) => {
  state.guide = event.target.value;
  renderGuidePreview();
});

/* Recensioni, messaggi delle chat e verifica del profilo */
$('#uscita-review-form').addEventListener('submit', addUscitaReview);
$('#percorso-review-form').addEventListener('submit', addPercorsoReview);
$('#chat-form').addEventListener('submit', sendChatMessage);

/* Avvio */
render();
