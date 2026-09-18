/* Site copy, in German. The Figma artboard is in English; this is the
 * translated equivalent, kept in the same shape so every component reads
 * unchanged. Brand names (Oh My Açaí, the social networks) and the Latin
 * placeholder blocks the artboard ships with are left alone. */

export const ANNOUNCEMENT =
  'Entdecke in jeder Bowl die perfekte Harmonie aus frischen, lebendigen Aromen und wertvollen Zutaten — zu unserer Karte';

export const NAV_LINKS = [
  { label: 'Über uns', href: '/#about' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Karte', href: '/#menu' },
  { label: 'Franchise', href: '/franchise' },
];

export const MARQUEE_WORDS = [
  'Eisig Cremig',
  'Kalt Gerührt',
  'Langsam Genießen',
  'Mutig Gemixt',
];

/** Horizontal product carousel — 5 full-bleed slides (Figma: Products).
 *  Backgrounds and cups both come from the Figma "Products" frame (4183:1514):
 *  each panel is a flat colour with the gold berry-vector texture composited
 *  into the bottom half, cropped to 671px (11 × the texture's 61px period) so
 *  it repeats horizontally without a seam on panels wider than the 720px
 *  artboard. `color` backs the image so no sub-pixel gap can show through.
 *  `image` is the panel's own branded cup photo (Buenoacai 1–5), trimmed and
 *  re-canvassed to a shared 950 × 1450 box so all five sit identically. */
export const SLIDES = [
  {
    eyebrow: 'Erdbeere, Mango & Beeren',
    title: 'Tropische Mango Bowl',
    body: 'nahrhafte & köstliche Smoothies, die sich mühelos in deinen Alltag einfügen',
    color: '#e6a002',
    bg: '/img/panel/panel-1.png',
    image: '/img/panel/cup-1.png',
  },
  {
    eyebrow: 'Açaí, Banane & Granola',
    title: 'Klassische Açaí Bowl',
    body: 'nahrhafte & köstliche Smoothies, die sich mühelos in deinen Alltag einfügen',
    color: '#8c5737',
    bg: '/img/panel/panel-2.png',
    image: '/img/panel/cup-2.png',
  },
  {
    eyebrow: 'Heidelbeere, Brombeere & Chia',
    title: 'Beeren-Traum Bowl',
    body: 'nahrhafte & köstliche Smoothies, die sich mühelos in deinen Alltag einfügen',
    color: '#99a75a',
    bg: '/img/panel/panel-3.png',
    image: '/img/panel/cup-3.png',
  },
  {
    eyebrow: 'Kakao, Mandel & Kokos',
    title: 'Kakao-Crunch Bowl',
    body: 'nahrhafte & köstliche Smoothies, die sich mühelos in deinen Alltag einfügen',
    color: '#8c5737',
    bg: '/img/panel/panel-4.png',
    image: '/img/panel/cup-4.png',
  },
  {
    eyebrow: 'Erdnussbutter, Banane & Hafer',
    title: 'Erdnussbutter Bowl',
    body: 'nahrhafte & köstliche Smoothies, die sich mühelos in deinen Alltag einfügen',
    color: '#d0c1b0',
    bg: '/img/panel/panel-5.png',
    image: '/img/panel/cup-5.png',
  },
]

/** Signature bowls grid — 3 × 2 (Figma: Frame 44) */
/* The grid shares the branded Buenoacai cups with the product panels, so a
 * flavour shows the same cup everywhere. The five panel flavours map 1:1 to
 * their panel cups; Kokos-Traum has no panel, so it reuses the açaí cup
 * (cup-2) — placed on card 6, which is not adjacent to card 1's cup-2. */
export const BOWLS = [
  { name: 'Klassische Açaí Bowl', price: '$7.50', rating: '4.8', image: '/img/panel/cup-2.png' },
  { name: 'Tropische Mango Bowl', price: '$6.75', rating: '4.8', image: '/img/panel/cup-1.png' },
  { name: 'Beeren-Traum Bowl', price: '$5.50', rating: '4.6', image: '/img/panel/cup-3.png' },
  { name: 'Kakao-Crunch Bowl', price: '$6.00', rating: '4.9', image: '/img/panel/cup-4.png' },
  { name: 'Erdnussbutter Bowl', price: '$7.00', rating: '4.8', image: '/img/panel/cup-5.png' },
  { name: 'Kokos-Traum Bowl', price: '$7.25', rating: '4.8', image: '/img/panel/cup-2.png' },
];

/** Feature callouts floating over the video panel (Figma: placeholder copy).
 *  `pos` is lg-only: below that the cards sit in a grid, where a bare
 *  left/top would shove each one out of its grid cell. */
export const VIDEO_CARDS = [
  {
    title: 'Lorem ipsum dolor sit amet',
    body: 'Lorem ipsum dolor sit amet consectetur. Iaculis massa sem nullam interdum quis vitae a. Sed orci.',
    pos: 'lg:left-[8.6%] lg:top-[24.5%]',
  },
  {
    title: 'Lorem ipsum dolor sit amet',
    body: 'Lorem ipsum dolor sit amet consectetur. Sed rhoncus ac justo mattis eu ac morbi at velit vel.',
    pos: 'lg:left-[62.8%] lg:top-[32.8%]',
  },
  {
    title: 'Lorem ipsum dolor sit amet',
    body: 'Lorem ipsum dolor sit amet consectetur. Habitant velit odio at eget nam risus et rhoncus.',
    pos: 'lg:left-[10.6%] lg:top-[73%]',
  },
  {
    title: 'Lorem ipsum dolor sit amet',
    body: 'Lorem ipsum dolor sit amet consectetur. Enim sed mauris leo egestas pulvinar etiam aliquam.',
    pos: 'lg:left-[65.4%] lg:top-[64.6%]',
  },
];

/** Three value cards (Figma: Cards Section) */
export const VALUE_CARDS = [
  {
    n: '01',
    title: 'Qualität ohne Kompromisse',
    body: 'Wir wählen unsere Beeren mit Sorgfalt aus und verfeinern jeden Schritt, damit jede Bowl hält, was sie verspricht.',
    bg: 'bg-plum',
    badge: '#4d294e',
  },
  {
    n: '02',
    title: 'Handwerk in\njeder Bowl',
    body: 'Vom cremigen Mixen bis zum knusprigen Topping arbeiten wir präzise und sorgfältig — für Bowls, die richtig satt machen.',
    bg: 'bg-mauve',
    badge: '#9d5988',
  },
  {
    n: '03',
    title: 'Für alle Momente,\ndie zählen',
    body: 'Oh My Açaí ist mehr als eine Bowl — es geht um den Raum, kurz innezuhalten, sich zu treffen und den Tag zu genießen.',
    bg: 'bg-gold',
    badge: '#d4973c',
  },
];

/** FAQ (Figma: FAQ Section → Content) */
export const FAQS = [
  {
    q: 'Was macht Oh My Açaí besonders',
    a: 'Bei Oh My Açaí zählt Qualität in jedem Schritt — vom Einkauf erstklassiger Beeren bis zur präzisen Zubereitung jeder einzelnen Bowl.',
  },
  {
    q: 'Gibt es Takeaway und Lieferung',
    a: 'Ja — jede Bowl auf der Karte gibt es zum Mitnehmen, und im ganzen Viertel liefern wir über unsere Partner aus.',
  },
  {
    q: 'Sind eure Zutaten fair beschafft',
    a: 'Unser Açaí kommt von Partnerkooperativen im Amazonasbecken, unser Obst kaufen wir jede Woche frisch bei Erzeugern aus der Region.',
  },
  {
    q: 'Habt ihr milchfreie und vegane Optionen',
    a: 'Fast die gesamte Karte ist von Haus aus milchfrei und vegan. Tausch jedes Topping nach Belieben — wir sagen dir, wenn etwas nicht vegan ist.',
  },
  {
    q: 'Kann man bei Oh My Açaí gut entspannen',
    a: 'Genau darum geht es — weiche Sitzecken, ruhige Musik und kostenloses WLAN, gemacht für eine Pause statt für Hektik.',
  },
];

/** Google reviews widget (Figma: Frame 39) */
export const REVIEW_SUMMARY = {
  name: 'Oh My Acai',
  score: '5.0',
  count: '471 Bewertungen auf',
};

export const REVIEWS = [
  {
    name: 'Jaspreet Singh',
    when: 'vor 3 Monaten',
    body: 'Lorem ipsum dolor sit amet consectetur. Blandit pellentesque vitae gravida ultrices. In eleifend maecenas dictum felis. Ut porta lectus semper nunc est.',
  },
  {
    name: 'Amina Malik',
    when: 'vor 2 Monaten',
    body: 'Proin fermentum, sapien vel interdum cursus, risus nibh varius libero, id pretium sem nulla ut justo. Sed at libero eget elit sollicitudin suscipit.',
  },
  {
    name: 'David Chen',
    when: 'vor 1 Monat',
    body: 'Cras scelerisque, nunc ac porta convallis, arcu purus malesuada risus, vel facilisis velit dui quis nunc. Integer ultrices efficitur arcu.',
  },
  {
    name: 'Fatima Alvi',
    when: 'vor 2 Wochen',
    body: 'Duis hendrerit purus vel diam elementum, vitae aliquam ex sollicitudin. Vivamus ac libero vitae libero varius facilisis.',
  },
  {
    name: 'Mark Johnson',
    when: 'vor 5 Tagen',
    body: 'Mauris et nulla sit amet purus auctor posuere. Curabitur a libero quis magna suscipit viverra. Pellentesque habitant morbi tristique.',
  },
  {
    name: 'Sara Ahmed',
    when: 'vor 4 Tagen',
    body: 'Phasellus auctor risus et massa pharetra, ac posuere orci fermentum. Donec vel diam nec arcu aliquam vestibulum eu vel massa.',
  },
  {
    name: 'Lucas Pereira',
    when: 'vor 3 Tagen',
    body: 'Sed feugiat justo vel risus dictum, at fermentum quam luctus. Suspendisse potenti. Praesent at nunc sit amet lectus volutpat.',
  },
  {
    name: 'Emma Rodriguez',
    when: 'vor 2 Tagen',
    body: 'Integer lacinia quam sit amet augue pharetra, eu fermentum purus scelerisque. Cras vel magna a felis ultricies condimentum.',
  },
  {
    name: 'Omar El-Sayed',
    when: 'vor 1 Tag',
    body: 'Donec feugiat metus sit amet justo cursus gravida. Curabitur nec libero eu leo placerat consequat. Sed vitae pretium lectus.',
  },
  {
    name: 'Lina Wang',
    when: 'gerade eben',
    body: 'Vivamus nec magna vel urna facilisis fringilla ut vel felis. Nulla facilisi. Sed vitae massa vel leo elementum cursus a vel nisl.',
  },
];

/** Footer (Figma: Footer - Desktop) */
export const FOOTER_PAGES = [
  'Über uns',
  'Blog',
  'Karte',
  'Standort',
  'Reservierung',
  '404',
];

export const FOOTER_SOCIAL = ['Instagram', 'Facebook', 'Twitter', 'Pinterest'];

export const CONTACT = {
  email: 'hello@ohmyacai.com',
  phone: '+880 1234 567 890',
  address: ['1258 Melrose Ave Los ', 'Angeles, CA 90046 ', 'United States'],
};

/* ------------------------------------------------------------------ *
 * Franchise page — Figma "Screens / Franchise" (node 4128:112, 1440 × 8254)
 * ------------------------------------------------------------------ */

export const FRANCHISE_HERO = {
  eyebrow: 'Franchise-Programm 2026',
  /** the middle span is set in gold in the artboard */
  titleBefore: 'Hol ',
  titleAccent: 'Oh My Açaí',
  titleAfter: ' in deine Stadt',
  body: 'Eine schlüsselfertige Açaí-Bar: Rezepte, Beeren-Lieferkette und Eröffnungsplan stehen bereits — sag uns einfach, wo du starten willst.',
  stats: [
    { value: '24 +', label: 'Filialen am Start' },
    { value: '12', label: 'Länder' },
    { value: '6 Wo.', label: 'Bis zur Eröffnung' },
  ],
};

export const FRANCHISE_FORM = {
  title: 'Franchise-Paket anfordern',
  body: 'Kosten, Gebietskarte und der Sechs-Wochen-Eröffnungsplan — innerhalb eines Werktags in deinem Postfach.',
  consent: 'Oh My Açaí darf mich zur Eröffnung einer eigenen Filiale kontaktieren.',
  submit: 'Franchise-Paket schicken',
  budgets: [
    'Unter 150.000 $',
    '150.000 – 250.000 $',
    '250.000 – 400.000 $',
    'Über 400.000 $',
  ],
};

export const FRANCHISE_BANNER = {
  title: 'Açaí-Franchise',
  body: 'Eine fertige Açaí-Bar im Paket — Ladenbau, Technik, Rezepte und Lieferantennetz aus einer Hand, damit du schnell eröffnest und überall gleich gut bleibst.',
  cta: 'Mehr erfahren',
};

export const FRANCHISE_INTRO = {
  titleBefore: 'Bowls servieren in nur ',
  titleAccent: '6 Wochen',
  body: 'Ab dem Tag der Unterschrift begleitet dich unser Team durch den Aufbau — Standortsuche, Ladenbau, Barista-Schulung und Eröffnungskampagne. Sechs Wochen später mixt du deine ersten Bowls, mit fest eingeplanten Rezepten, Lieferanten und Verpackungen.',
};

export const FRANCHISE_STEPS = [
  {
    n: '01',
    label: 'Schritt 01',
    title: 'Anmelden',
    body: 'Wir schauen uns gemeinsam an, was in deiner Stadt möglich ist. Du bekommst die Gebietsanalyse, die Investitionsübersicht und einen Blick auf die Zahlen einer laufenden Oh My Açaí Bar — bevor irgendetwas unterschrieben wird.',
    image: '/img/fr/step-1.jpg',
    alt: 'Ein Açaí-Becher, im Studio fotografiert',
    bg: 'bg-cream',
    /** Figma alternates which half the photo sits on */
    imageFirst: true,
  },
  {
    n: '02',
    label: 'Schritt 02',
    title: 'Aufbauen',
    body: 'Ladenbau, Technik, Kasse und Lieferwege übernimmt unser Team. Dein Team wird auf der kompletten Bowl-Karte geschult, bis jede Bowl genauso aussieht wie die, die wir in Los Angeles servieren.',
    image: '/img/fr/step-2.jpg',
    alt: 'Zwei Açaí-Becher auf dem Tresen',
    bg: 'bg-[#fdf3e3]',
    imageFirst: false,
  },
  {
    n: '03',
    label: 'Schritt 03',
    title: 'Servieren',
    body: 'Die Eröffnungswoche läuft gemeinsam mit dir — Launch-Kampagne, Lieferdienste und lokale Partner starten zusammen, damit die Schlange schon bei der ersten Bowl steht.',
    image: '/img/fr/step-3.jpg',
    alt: 'Fertige Açaí-Bowls von oben fotografiert',
    bg: 'bg-[#fdeef4]',
    imageFirst: true,
  },
];

/** The cards use `/img/fr/` rather than the shared `/img/bowl-*.png`: the
 *  originals are all 378 × 504, but the cup inside each sits at a different
 *  height and size, so one CSS box rendered four different cups. These are the
 *  same photos re-canvassed to Figma's 236 × 314 bowl box with the cup filling
 *  the height and centred, which makes the four cards identical by
 *  construction rather than by per-card nudging. */
export const FRANCHISE_BOWLS = [
  { name: 'Klassische Açaí Bowl', image: '/img/fr/bowl-1.png', bg: 'bg-plum' },
  { name: 'Tropische Mango Bowl', image: '/img/fr/bowl-2.png', bg: 'bg-gold' },
  { name: 'Beeren-Traum Bowl', image: '/img/fr/bowl-3.png', bg: 'bg-mauve' },
  { name: 'Kakao-Crunch Bowl', image: '/img/fr/bowl-4.png', bg: 'bg-plum' },
];

export const FRANCHISE_BOWLS_HEAD = {
  titleBefore: 'Unsere ',
  titleAccent: 'Bowls',
  body: 'Jedes Franchise startet mit derselben Signature-Karte — sechs Bowls nach den Rezepten, die unsere Küche im Laden verfeinert hat, dazu viermal im Jahr saisonale Specials, damit es an deiner Theke nie langweilig wird.',
};

export const FRANCHISE_WHY = {
  titleBefore: 'Warum ',
  titleAccent: 'Franchise',
  titleAfter: ' mit Oh My Açaí',
  body: 'Wir nehmen dir das Rätselraten beim Betrieb einer Açaí-Bar ab — erprobte Rezepte, eine fest gesicherte Beeren-Lieferkette und ein Marketing-Playbook, das in zwölf Ländern schon Theken gefüllt hat. Du bringst den Standort und die Energie mit.',
  stats: [
    { value: '24 +', label: 'Filialen in zwölf Ländern' },
    { value: '12 Mio.', label: 'Açaí-Bowls im letzten Jahr' },
    { value: '6 Wo.', label: 'Vom Vertrag bis zur Eröffnung' },
  ],
};

export const FRANCHISE_PARTNER = {
  titleBefore: 'Stimmen unserer ',
  titleAccent: 'Partner',
  body: 'Unsere Partner kommen aus der Gastronomie, dem Einzelhandel und aus ganz anderen Branchen. Hör, wie sie einen Standort gefunden, in sechs Wochen eröffnet und sich eine Stammkundschaft aufgebaut haben — in ihren eigenen Worten.',
  poster: '/img/store.jpg',
};

/** Die Franchise-Seite nutzt dieselben fünf Fragen, mit Fragezeichen. */
export const FRANCHISE_FAQS = FAQS.map((f) => ({ ...f, q: `${f.q}?` }));
