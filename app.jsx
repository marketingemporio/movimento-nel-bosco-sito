/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

// ============ TWEAKS DEFAULTS ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#ffffff", "#3d2548", "#e8d5ec", "#8a4ea3", "#e8a5c4"],
  "headingFont": "Agrandir",
  "density": "airy",
  "shape": "shape-floral"
}/*EDITMODE-END*/;

// ============ DATA ============

const COURSES = [
  {
    id: "yoga",
    name: "Yoga",
    teacher: "Laura Albertini",
    blurb:
      "Ogni pratica è adattata al <strong>livello delle persone presenti</strong>, in modo che <strong>tutti</strong> possano trarne beneficio.",
    long:
      "Una pratica completa che unisce <strong>asana</strong>, <strong>respirazione</strong> e <strong>meditazione</strong>. Ogni lezione è pensata per accompagnare corpo e mente verso un <strong>equilibrio più profondo</strong>.",
    expect: ["60 minuti di pratica", "Tutti i livelli benvenuti", "12 posti disponibili"],
    glow: ["Energia", "Centratura", "Leggerezza"],
    shape: "shape-floral",
    slot: "course-yoga",
    placeholder: "ritratto / posizione yoga",
    placeholderSrc: "https://loremflickr.com/800/800/yoga,pose?lock=201",
    coursePlaceholderSrc: "https://loremflickr.com/1200/900/yoga,asana,practice?lock=301",
  },
  {
    id: "meditazione",
    name: "Meditazione",
    teacher: "Sara Silvestrini",
    blurb:
      "La <strong>pratica sacra della meditazione</strong> unita ai <strong>profumi magici degli oli essenziali</strong>.",
    long:
      "Una sessione guidata che accompagna nel <strong>silenzio interiore</strong>, sostenuta dall'<strong>aromaterapia</strong> per amplificare gli effetti rigeneranti del <strong>respiro consapevole</strong>.",
    expect: ["45 minuti di pratica", "Per principianti e esperti", "10 posti disponibili"],
    glow: ["Calma", "Chiarezza", "Presenza"],
    shape: "shape-floral-2",
    slot: "course-meditazione",
    placeholder: "candela / oli essenziali",
    placeholderSrc: "https://loremflickr.com/800/800/meditation,candle?lock=202",
    coursePlaceholderSrc: "https://loremflickr.com/1200/900/meditation,zen,calm?lock=302",
  },
  {
    id: "gravidanza",
    name: "Yoga Gravidanza",
    teacher: "Laura Albertini",
    blurb:
      "Una pratica leggera per <strong>sostenere la mamma</strong> durante la gestazione.",
    long:
      "<strong>Movimenti dolci</strong> e <strong>tecniche di respirazione</strong> pensate per accompagnare ogni trimestre, sciogliere le tensioni e creare un <strong>legame profondo con il bambino</strong>.",
    expect: ["50 minuti di pratica", "Dal 2° trimestre", "8 posti disponibili"],
    glow: ["Sostegno", "Connessione", "Serenità"],
    shape: "shape-floral-3",
    slot: "course-gravidanza",
    placeholder: "yoga prenatale",
    placeholderSrc: "https://loremflickr.com/800/800/prenatal,yoga,pregnancy?lock=203",
    coursePlaceholderSrc: "https://loremflickr.com/1200/900/pregnancy,yoga?lock=303",
  },
  {
    id: "pilates",
    name: "Pilates",
    teacher: "Camilla Rossini",
    blurb:
      "Una pratica per <strong>sostenere il corpo</strong> e la sua <strong>postura</strong>, a cura di Camilla Rossini Naturopata.",
    long:
      "Esercizi precisi che lavorano sul <strong>controllo</strong>, la <strong>fluidità</strong> e la <strong>consapevolezza del movimento</strong>. Ideale per ritrovare <strong>allineamento</strong> e <strong>tono profondo</strong>.",
    expect: ["55 minuti di pratica", "Tutti i livelli", "10 posti disponibili"],
    glow: ["Postura", "Tono", "Allineamento"],
    shape: "shape-floral",
    slot: "course-pilates",
    placeholder: "pilates / mat",
    placeholderSrc: "https://loremflickr.com/800/800/pilates,mat?lock=204",
    coursePlaceholderSrc: "https://loremflickr.com/1200/900/pilates,studio,reformer?lock=304",
  },
];

const SCHEDULE = {
  Lun: [
    { time: "08:00", name: "Yoga Mattutino", who: "Laura", course: "yoga" },
    { time: "18:30", name: "Pilates", who: "Camilla", course: "pilates" },
    { time: "20:00", name: "Yoga Vinyasa", who: "Laura", course: "yoga" },
  ],
  Mar: [
    { time: "10:00", name: "Yoga Gravidanza", who: "Laura", course: "gravidanza" },
    { time: "19:00", name: "Meditazione & Aromaterapia", who: "Sara", course: "meditazione" },
  ],
  Mer: [
    { time: "08:00", name: "Yoga Dolce", who: "Laura", course: "yoga" },
    { time: "18:30", name: "Pilates Posturale", who: "Camilla", course: "pilates" },
    { time: "20:00", name: "Meditazione Guidata", who: "Sara", course: "meditazione" },
  ],
  Gio: [
    { time: "10:00", name: "Yoga Gravidanza", who: "Laura", course: "gravidanza" },
    { time: "19:00", name: "Yoga Vinyasa", who: "Laura", course: "yoga" },
  ],
  Ven: [
    { time: "07:30", name: "Yoga del Risveglio", who: "Laura", course: "yoga" },
    { time: "18:00", name: "Pilates", who: "Camilla", course: "pilates" },
  ],
  Sab: [
    { time: "09:30", name: "Yoga & Meditazione", who: "Laura + Sara", course: "yoga" },
    { time: "11:00", name: "Pilates Open Class", who: "Camilla", course: "pilates" },
  ],
  Dom: [
    { time: "10:00", name: "Pratica Lenta", who: "Laura", course: "yoga" },
  ],
};

const TESTIMONIALS = [
  {
    quote:
      "Un luogo dove il <strong>tempo rallenta</strong>. Le pratiche di Laura mi hanno aiutata a ritrovare il <strong>respiro</strong> e una <strong>calma</strong> che pensavo persa.",
    name: "Giulia M.",
    role: "Allieva da 2 anni",
  },
  {
    quote:
      "L'<strong>aromaterapia</strong> unita alla <strong>meditazione</strong> è una combinazione magica. Esco da ogni sessione <strong>più leggera, più presente</strong>.",
    name: "Francesca T.",
    role: "Allieva da 1 anno",
  },
  {
    quote:
      "Camilla è <strong>preparata e attenta</strong>. Il suo Pilates ha <strong>trasformato la mia postura</strong> e fatto sparire i miei <strong>dolori cronici</strong>.",
    name: "Marco R.",
    role: "Allievo da 6 mesi",
  },
];

const FAQS = [
  {
    q: "Devo avere esperienza per partecipare?",
    a: "<strong>Assolutamente no.</strong> Ogni pratica viene adattata al livello dei presenti: chi è alle prime armi e chi ha esperienza trovano entrambi spazio per esplorare il proprio percorso.",
  },
  {
    q: "Cosa devo portare con me?",
    a: "<strong>Abbigliamento comodo</strong> e una <strong>bottiglia d'acqua</strong>. Il tappetino e i supporti li mettiamo a disposizione noi, oltre agli <strong>oli essenziali</strong> per le pratiche di aromaterapia.",
  },
  {
    q: "Posso fare una lezione di prova?",
    a: "Sì, <strong>la prima lezione è sempre una prova</strong>. Scrivici per prenotare il giorno e l'orario che preferisci.",
  },
  {
    q: "Come funzionano gli abbonamenti?",
    a: "Offriamo formule <strong>mensili</strong>, <strong>trimestrali</strong> e <strong>a pacchetto</strong>. Trovi tutti i dettagli alla pagina 'Memberships' o chiedi direttamente in segreteria.",
  },
  {
    q: "Da quale settimana di gravidanza posso iniziare lo Yoga Prenatale?",
    a: "Generalmente <strong>dal secondo trimestre</strong>, dopo aver consultato il tuo medico. Laura ha una <strong>formazione specifica</strong> per accompagnare ogni fase della gestazione.",
  },
];

// ============ HOOKS ============

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ============ COMPONENTS ============

function FloralDefs() {
  // SVG clip-path defs — three petal-ish silhouettes, drawn in 0..1 space
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <clipPath id="shape-floral" clipPathUnits="objectBoundingBox">
          <path d="M 0.50 0.02 C 0.66 -0.02 0.84 0.05 0.92 0.18 C 1.00 0.30 0.98 0.43 0.99 0.54 C 1.02 0.70 0.92 0.86 0.78 0.93 C 0.64 1.00 0.48 0.98 0.36 0.97 C 0.20 0.96 0.06 0.86 0.02 0.70 C -0.02 0.55 0.04 0.42 0.04 0.30 C 0.04 0.16 0.16 0.05 0.30 0.02 C 0.36 0.01 0.43 0.04 0.50 0.02 Z" />
        </clipPath>
        <clipPath id="shape-floral-2" clipPathUnits="objectBoundingBox">
          <path d="M 0.48 0.03 C 0.62 0.00 0.78 0.04 0.88 0.14 C 0.99 0.24 1.00 0.40 0.96 0.54 C 0.92 0.66 0.98 0.78 0.88 0.88 C 0.76 0.99 0.58 0.99 0.44 0.97 C 0.30 0.95 0.12 0.95 0.05 0.82 C -0.02 0.68 0.06 0.54 0.04 0.40 C 0.02 0.26 0.10 0.10 0.24 0.05 C 0.32 0.02 0.40 0.05 0.48 0.03 Z" />
        </clipPath>
        <clipPath id="shape-floral-3" clipPathUnits="objectBoundingBox">
          <path d="M 0.50 0.00 C 0.62 0.04 0.78 0.00 0.90 0.10 C 1.02 0.22 0.96 0.40 0.98 0.54 C 1.00 0.70 0.94 0.86 0.80 0.94 C 0.66 1.02 0.48 0.96 0.34 0.96 C 0.18 0.96 0.04 0.84 0.02 0.68 C 0.00 0.52 0.08 0.40 0.06 0.26 C 0.04 0.12 0.18 0.02 0.32 0.02 C 0.38 0.02 0.44 -0.01 0.50 0.00 Z" />
        </clipPath>
        <clipPath id="shape-blob" clipPathUnits="objectBoundingBox">
          <path d="M 0.5 0.02 C 0.78 0.02 0.98 0.22 0.98 0.5 C 0.98 0.78 0.78 0.98 0.5 0.98 C 0.22 0.98 0.02 0.78 0.02 0.5 C 0.02 0.22 0.22 0.02 0.5 0.02 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["I Corsi", "#corsi"],
    ["Orari", "#orari"],
    ["La Scuola", "#scuola"],
    ["Domande", "#faq"],
    ["Contatti", "#contatti"],
  ];
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="#" className="logo" aria-label="Movimento nel Bosco">
          <span className="logo__mark" aria-hidden="true">✻</span>
          <span className="logo__words">
            <span className="logo__line">movimento</span>
            <span className="logo__line logo__line--italic">nel bosco</span>
          </span>
        </a>
        <ul className="nav__links hide-mobile">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <a href="#contatti" className="btn btn--filled btn--small hide-mobile">
          Prenota Prova <span className="arrow">→</span>
        </a>
        <button
          className="nav__toggle"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          style={{ display: "none" }}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">A Brescia, immersi nel verde di Mompiano</span>
          <h1 className="serif">
            Corsi di Yoga, Pilates<br />e Meditazione
          </h1>
          <p>
            Uno spazio dove <strong>respiro</strong>, <strong>movimento</strong> e <strong>consapevolezza</strong> si incontrano.
            Pratiche guidate per <strong>ogni livello</strong>, sostenute dal potere dell'<strong>aromaterapia</strong>.
          </p>
          <div className="hero__cta">
            <a href="#contatti" className="btn btn--filled">
              Richiedi una prova <span className="arrow">→</span>
            </a>
            <a href="#corsi" className="btn">
              Esplora i corsi <span className="arrow">→</span>
            </a>
          </div>
          <div className="hero__chips">
            {COURSES.map((c) => (
              <a key={c.id} href={`#course-${c.id}`} className="tag">
                {c.name}
              </a>
            ))}
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__shape hero__shape--main">
            <image-slot id="hero-main" shape="rect" placeholder="immagine principale — yoga in studio" src="https://loremflickr.com/1200/900/yoga,studio,woman?lock=101"></image-slot>
            <svg className="hero__overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <use href="#shape-floral" />
            </svg>
          </div>
          <div className="hero__shape hero__shape--small">
            <image-slot id="hero-small" shape="circle" placeholder="dettaglio — oli / candela" src="https://loremflickr.com/600/600/candle,essentialoils?lock=102"></image-slot>
          </div>
          <div className="hero__leaf" aria-hidden="true">✻</div>
          <div className="hero__sticker">
            <span>Hari-Yoga</span>
            <span>·</span>
            <span>Yoga Alliance</span>
            <span>·</span>
            <span>Aromaterapia</span>
            <span>·</span>
            <span>Hari-Yoga</span>
            <span>·</span>
            <span>Yoga Alliance</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Marquee() {
  const items = ["benessere", "respiro", "movimento", "presenza", "natura", "equilibrio", "aromaterapia"];
  const row = (
    <span>
      {items.map((w, i) => (
        <span key={i}>{w}</span>
      ))}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="section intro" id="scuola">
      <div className="container intro__inner">
        <div className="intro__lead reveal">
          <span className="eyebrow">La scuola</span>
          <h2 className="serif">
            Più che movimento.<br />Una scuola con <em>aromaterapia</em>.
          </h2>
        </div>
        <div className="intro__body reveal">
          <p>
            Nei nostri corsi combiniamo <strong>yoga</strong>, <strong>pilates</strong> e <strong>tecniche di meditazione</strong>
            con il <strong>potere terapeutico degli oli essenziali</strong>. Una sinergia che crea
            un ambiente <strong>profondamente rilassante e rigenerante</strong>.
          </p>
          <p>
            Vogliamo essere una <strong>guida nel viaggio verso l'autoguarigione</strong> e il
            <strong>benessere naturale</strong>, riportando l'essere umano alla <strong>piena
            consapevolezza di sé</strong> mediante le forze della natura.
          </p>
          <ul className="intro__pillars">
            <li>
              <span className="eyebrow">01 — Mente e corpo</span>
              <p>Lavorare sul <strong>corpo</strong> per influire positivamente sulla <strong>mente</strong>.</p>
            </li>
            <li>
              <span className="eyebrow">02 — Leggerezza</span>
              <p>Alleggerire i pensieri e ritrovare <strong>calma</strong> e <strong>leggerezza</strong>.</p>
            </li>
            <li>
              <span className="eyebrow">03 — I tuoi obiettivi</span>
              <p>Accompagnarti verso i <strong>tuoi obiettivi</strong> con <strong>serenità</strong>.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Disciplines({ shape }) {
  return (
    <section className="section disciplines" id="corsi">
      <div className="container">
        <div className="section-head reveal">
          <span className="ornament" aria-hidden="true"></span>
          <h2>Movimento consapevole<br />per ogni corpo</h2>
          <p>
            <strong>Quattro percorsi distinti</strong>, una sola filosofia: <strong>ascoltare il corpo</strong>,
            <strong>calmare la mente</strong>, aprire spazio per la <strong>presenza</strong>.
          </p>
        </div>
        <div className="disciplines__grid">
          {COURSES.map((c, i) => (
            <article key={c.id} className="discipline reveal" style={{ "--i": i }}>
              <div className={`discipline__img ${shape}`}>
                <image-slot id={`discipline-${c.id}`} shape="rect" placeholder={c.placeholder} src={c.placeholderSrc}></image-slot>
              </div>
              <div className="discipline__meta">
                <span className="eyebrow">Con {c.teacher}</span>
                <h3 className="serif">{c.name}</h3>
                <p dangerouslySetInnerHTML={{ __html: c.blurb }} />
                <a href={`#course-${c.id}`} className="link">
                  Scopri il corso <span className="arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseDetail({ course, index, shape }) {
  const flip = index % 2 === 1;
  return (
    <section className="course" id={`course-${course.id}`}>
      <div className={`container course__inner ${flip ? "course__inner--flip" : ""}`}>
        <div className="course__art">
          <div className={`course__frame ${shape}`}>
            <image-slot id={course.slot} shape="rect" placeholder={course.placeholder} src={course.coursePlaceholderSrc}></image-slot>
          </div>
          <div className="course__index">
            <span className="eyebrow">Corso · 0{index + 1}</span>
          </div>
        </div>
        <div className="course__copy reveal">
          <span className="ornament" aria-hidden="true"></span>
          <h3 className="serif">{course.name}</h3>
          <span className="course__teacher eyebrow">Con {course.teacher}</span>
          <p className="course__blurb" dangerouslySetInnerHTML={{ __html: course.long }} />
          <div className="course__cols">
            <div>
              <span className="eyebrow">Cosa aspettarsi</span>
              <ul>
                {course.expect.map((e, i) => (
                  <li key={i}>
                    <span className="bullet" aria-hidden="true">✻</span> {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="eyebrow">Dopo la pratica</span>
              <ul>
                {course.glow.map((e, i) => (
                  <li key={i}>
                    <span className="bullet" aria-hidden="true">✻</span> {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a href="#contatti" className="btn">
            Prenota una prova <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  const days = Object.keys(SCHEDULE);
  const [active, setActive] = useState(days[0]);
  const [filter, setFilter] = useState("all");

  const visible = useMemo(() => {
    return SCHEDULE[active].filter(
      (s) => filter === "all" || s.course === filter
    );
  }, [active, filter]);

  return (
    <section className="section schedule" id="orari">
      <div className="container">
        <div className="section-head reveal">
          <span className="ornament" aria-hidden="true"></span>
          <h2>Il palinsesto della settimana</h2>
          <p>
            Lezioni durante <strong>tutta la settimana</strong>, su prenotazione. Filtra per
            disciplina o naviga giorno per giorno.
          </p>
        </div>

        <div className="schedule__controls reveal">
          <div className="schedule__days" role="tablist">
            {days.map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={active === d}
                className={`schedule__day ${active === d ? "is-active" : ""}`}
                onClick={() => setActive(d)}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="schedule__filter">
            <span className="eyebrow">Filtra</span>
            <div className="schedule__chips">
              {[["all", "Tutti"], ...COURSES.map((c) => [c.id, c.name])].map(
                ([id, label]) => (
                  <button
                    key={id}
                    className={`chip ${filter === id ? "is-active" : ""}`}
                    onClick={() => setFilter(id)}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="schedule__list">
          {visible.length === 0 ? (
            <div className="schedule__empty">
              <span className="serif" style={{ fontSize: 28 }}>
                Nessuna lezione con questo filtro
              </span>
              <p>Prova a cambiare disciplina o giorno.</p>
            </div>
          ) : (
            visible.map((s, i) => (
              <div key={i} className="schedule__row" style={{ "--i": i }}>
                <span className="schedule__time serif">{s.time}</span>
                <div className="schedule__what">
                  <span className="schedule__name">{s.name}</span>
                  <span className="schedule__who">con {s.who}</span>
                </div>
                <span className={`schedule__pill schedule__pill--${s.course}`}>
                  {COURSES.find((c) => c.id === s.course)?.name}
                </span>
                <a href="#contatti" className="schedule__book">
                  Prenota <span className="arrow">→</span>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="section testimonials">
      <div className="container testimonials__inner">
        <div className="testimonials__art">
          <div className="testimonials__frame shape-floral-2">
            <image-slot id="testi-photo" shape="rect" placeholder="atmosfera dello studio" src="https://loremflickr.com/900/1100/yoga,studio,interior?lock=401"></image-slot>
          </div>
        </div>
        <div className="testimonials__copy">
          <span className="ornament" aria-hidden="true"></span>
          <span className="eyebrow">Voci dalla scuola</span>
          <blockquote className="serif" key={idx} dangerouslySetInnerHTML={{ __html: `“${TESTIMONIALS[idx].quote}”` }} />
          <div className="testimonials__attrib">
            <span>{TESTIMONIALS[idx].name}</span>
            <span className="dot">·</span>
            <span className="eyebrow">{TESTIMONIALS[idx].role}</span>
          </div>
          <div className="testimonials__dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`dot-btn ${i === idx ? "is-active" : ""}`}
                onClick={() => setIdx(i)}
                aria-label={`Testimonianza ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container faq__inner">
        <div className="faq__head reveal">
          <span className="eyebrow">Domande frequenti</span>
          <h2 className="serif">Tutto quello che<br />ti stai chiedendo.</h2>
          <p>
            Non trovi la risposta? Scrivici, rispondiamo entro un giorno
            lavorativo.
          </p>
          <a href="#contatti" className="btn btn--small">
            Scrivici <span className="arrow">→</span>
          </a>
        </div>
        <ul className="faq__list reveal">
          {FAQS.map((f, i) => (
            <li key={i} className={`faq__item ${open === i ? "is-open" : ""}`}>
              <button
                className="faq__q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="faq__num">0{i + 1}</span>
                <span className="faq__text serif">{f.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <div className="faq__a" aria-hidden={open !== i}>
                <p dangerouslySetInnerHTML={{ __html: f.a }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", course: "yoga", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Inserisci il nome";
    if (!form.email.trim()) e.email = "Inserisci l'email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email non valida";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Scrivi qualche parola in più";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  return (
    <section className="section contact" id="contatti">
      <div className="container contact__inner">
        <div className="contact__copy">
          <span className="ornament" aria-hidden="true"></span>
          <h2 className="serif">Vieni a provare<br />una lezione.</h2>
          <p>
            Scrivici per fissare una <strong>prima lezione gratuita</strong> o per ricevere il
            palinsesto completo. Ti rispondiamo <strong>entro un giorno lavorativo</strong>.
          </p>

          <ul className="contact__info">
            <li>
              <span className="eyebrow">Dove</span>
              <p>Emporio nel Bosco<br />Via Fermi 2, Brescia · 25133</p>
            </li>
            <li>
              <span className="eyebrow">Quando</span>
              <p>Lun – Sab, palinsesto settimanale<br />Su prenotazione</p>
            </li>
            <li>
              <span className="eyebrow">Certificazioni</span>
              <p>Hari-Yoga · Yoga Alliance<br />Naturopatia & Aromaterapia</p>
            </li>
          </ul>
        </div>

        <div className="contact__form-wrap">
          <div className="contact__art">
            <div className="contact__frame shape-floral-3">
              <image-slot id="contact-photo" shape="rect" placeholder="lo studio · interno" src="https://loremflickr.com/900/1100/wellness,studio,minimal,wood?lock=402"></image-slot>
            </div>
          </div>

          {!sent ? (
            <form className="contact__form" onSubmit={submit} noValidate>
              <div className={`field ${errors.name ? "field--error" : ""}`}>
                <label>Nome</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Il tuo nome"
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className={`field ${errors.email ? "field--error" : ""}`}>
                <label>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tuonome@email.it"
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
              <div className="field">
                <label>Corso di interesse</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                  <option value="altro">Non lo so ancora</option>
                </select>
              </div>
              <div className={`field ${errors.message ? "field--error" : ""}`}>
                <label>Messaggio</label>
                <textarea
                  rows="3"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Raccontaci cosa stai cercando..."
                />
                {errors.message && (
                  <span className="field__error">{errors.message}</span>
                )}
              </div>
              <button type="submit" className="btn btn--filled">
                Invia richiesta <span className="arrow">→</span>
              </button>
            </form>
          ) : (
            <div className="contact__sent">
              <span className="ornament" aria-hidden="true"></span>
              <h3 className="serif">Grazie, {form.name.split(" ")[0]}.</h3>
              <p>
                Abbiamo ricevuto il tuo messaggio. Ti scriviamo entro un giorno
                lavorativo per fissare la prima lezione.
              </p>
              <button
                className="btn btn--small"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", course: "yoga", message: "" });
                }}
              >
                Invia un'altra richiesta <span className="arrow">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#" className="logo logo--light">
            <span className="logo__mark" aria-hidden="true">✻</span>
            <span className="logo__words">
              <span className="logo__line">movimento</span>
              <span className="logo__line logo__line--italic">nel bosco</span>
            </span>
          </a>
          <p>
            La scuola di yoga, pilates e meditazione di Emporio nel Bosco.<br />
            Fitoterapia, naturopatia e movimento consapevole a Brescia.
          </p>
        </div>
        <div className="footer__col">
          <span className="eyebrow">I corsi</span>
          <ul>
            {COURSES.map((c) => (
              <li key={c.id}><a href={`#course-${c.id}`}>{c.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <span className="eyebrow">La scuola</span>
          <ul>
            <li><a href="#scuola">Filosofia</a></li>
            <li><a href="#orari">Palinsesto</a></li>
            <li><a href="#faq">Domande frequenti</a></li>
            <li><a href="#contatti">Contatti</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <span className="eyebrow">Dove siamo</span>
          <ul>
            <li>Emporio nel Bosco</li>
            <li>Via Fermi 2</li>
            <li>Brescia · 25133</li>
            <li>Mompiano</li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Movimento nel Bosco</span>
        <span>Hari-Yoga · Yoga Alliance · Naturopatia</span>
      </div>
    </footer>
  );
}

// ============ TWEAKS ============

function Tweaks() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply palette
  useEffect(() => {
    const [bg, ink, accent, accent2, accent3] = t.palette;
    const root = document.documentElement;
    root.style.setProperty("--bg", bg);
    root.style.setProperty("--ink", ink);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-2", accent2);
    root.style.setProperty("--accent-3", accent3);
    // derive bg-2 by darkening bg slightly via hsl mix
    root.style.setProperty("--bg-2", `color-mix(in oklab, ${bg}, ${ink} 6%)`);
    root.style.setProperty("--ink-soft", `color-mix(in oklab, ${ink}, ${bg} 30%)`);
    root.style.setProperty("--ink-mute", `color-mix(in oklab, ${ink}, ${bg} 55%)`);
    root.style.setProperty("--line", `color-mix(in oklab, ${ink} 18%, transparent)`);
    root.style.setProperty("--line-soft", `color-mix(in oklab, ${ink} 8%, transparent)`);
  }, [t.palette]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--serif",
      `"${t.headingFont}", "Cormorant Garamond", Georgia, serif`
    );
  }, [t.headingFont]);

  useEffect(() => {
    document.body.dataset.density = t.density;
  }, [t.density]);

  // expose the shape choice on a body-data attr so the Disciplines component re-reads via prop
  useEffect(() => {
    document.body.dataset.shape = t.shape;
    // dispatch change for top-level listener
    window.dispatchEvent(new CustomEvent("shape-change", { detail: t.shape }));
  }, [t.shape]);

  const {
    TweaksPanel,
    TweakSection,
    TweakColor,
    TweakRadio,
    TweakSelect,
  } = window;

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette">
        <TweakColor
          label="Tavolozza"
          value={t.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
            ["#ffffff", "#3d2548", "#e8d5ec", "#8a4ea3", "#e8a5c4"],
            ["#ffffff", "#4a1d5c", "#f0d8e8", "#a55a8c", "#d680b0"],
            ["#ffffff", "#2d1b3d", "#dcc5e8", "#6a3a8a", "#f0bcd4"],
            ["#ffffff", "#5a2d6e", "#f5dce6", "#b85a8c", "#e8a5c4"],
          ]}
        />
      </TweakSection>
      <TweakSection label="Forma immagini">
        <TweakRadio
          label="Forma"
          value={t.shape}
          onChange={(v) => setTweak("shape", v)}
          options={[
            { value: "shape-floral", label: "Floreale" },
            { value: "shape-blob", label: "Cerchio" },
            { value: "shape-arch", label: "Arco" },
          ]}
        />
      </TweakSection>
      <TweakSection label="Tipografia">
        <TweakSelect
          label="Font titoli"
          value={t.headingFont}
          onChange={(v) => setTweak("headingFont", v)}
          options={[
            "Agrandir",
            "DM Serif Display",
            "Cormorant Garamond",
            "Playfair Display",
            "Fraunces",
          ]}
        />
      </TweakSection>
      <TweakSection label="Densità">
        <TweakRadio
          label="Spazio"
          value={t.density}
          onChange={(v) => setTweak("density", v)}
          options={[
            { value: "airy", label: "Arioso" },
            { value: "compact", label: "Compatto" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ============ APP ============

function App() {
  useReveal();
  const [shape, setShape] = useState(TWEAK_DEFAULTS.shape);
  useEffect(() => {
    const handler = (e) => setShape(e.detail);
    window.addEventListener("shape-change", handler);
    return () => window.removeEventListener("shape-change", handler);
  }, []);

  return (
    <>
      <FloralDefs />
      <Nav />
      <Hero />
      <Marquee />
      <Intro />
      <Disciplines shape={shape} />
      {COURSES.map((c, i) => (
        <CourseDetail key={c.id} course={c} index={i} shape={shape} />
      ))}
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <Tweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
