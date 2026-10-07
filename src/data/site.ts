/* Site copy, in German. The Figma artboard is in English; this is the
 * translated equivalent, kept in the same shape so every component reads
 * unchanged. Brand names (Oh My Açaí, the social networks) and the Latin
 * placeholder blocks the artboard ships with are left alone. */

export const ANNOUNCEMENT =
  'Entdecke in jeder Bowl die perfekte Harmonie aus frischen, lebendigen Aromen und wertvollen Zutaten — zu unserer Karte';

/** Every "Jetzt bestellen" button on the site lands on our own order page,
 *  so the one outbound Uber Eats link lives there (plus schema.org), not on
 *  a dozen buttons across every page. */
export const ORDER_URL = '/online-bestellen';

/** The shop's Uber Eats store (delivery + pickup). Only linked from
 *  /online-bestellen. */
export const UBER_EATS_URL =
  'https://www.ubereats.com/de/store/oh-my-acai/0chQmXzLWeqM6P1pC7jJAw';

/** Every delivery platform the Düsseldorf store is listed on. Only linked
 *  from /online-bestellen (and schema.org). */
export const DELIVERY_PLATFORMS = [
  { name: 'Wolt', url: 'https://wolt.com/de/deu/dusseldorf/restaurant/oh-my-acai-dusseldorf' },
  { name: 'Lieferando', url: 'https://www.lieferando.de/menu/oh-my-acai' },
  { name: 'Uber Eats', url: UBER_EATS_URL },
];

/** B2B: pure açaí puree imported from Brazilian partner cooperatives,
 *  sold to bars, cafés and hotel kitchens across DACH. */
export const BRAZIL_SECTION = {
  titleBefore: 'Reines Açaí ',
  titleAccent: 'direkt aus Brasilien',
  body:
    'Wir arbeiten mit Partner-Kooperativen im brasilianischen Amazonasbecken zusammen und beziehen unser Açaí-Püree tiefgefroren, unverdünnt und mit vollem Nährstoffprofil. Das gleiche Püree, mit dem wir in Düsseldorf & Köln jede Bowl mixen, verkaufen wir auch an Bars, Cafés und Hotelküchen im gesamten DACH-Raum.',
  bullets: [
    { title: '100% reines Frucht-Püree', body: 'Kein Sirup, kein Zucker, keine Zusätze. Nur die Beere, geerntet, entkernt und schockgefrostet.' },
    { title: 'Fair sourced', body: 'Direkter Bezug von Kleinfarmen im Estuário do Amazonas, mit fairen Preisen und langfristigen Verträgen.' },
    { title: 'Düsseldorf & Köln', body: 'Aus unseren zwei Stores tiefgefroren an deine Bar, dein Café oder deine Hotelküche geliefert.' },
  ],
  ctaLabel: 'Großhandel anfragen',
  ctaHref: 'mailto:info@ohmyacai.de?subject=Anfrage%20Gro%C3%9Fhandel%20A%C3%A7a%C3%AD-P%C3%BCree',
  imageSrc: '/img/brazil-farm.jpg',
  imageAlt: 'Açaí-Palmen (Euterpe oleracea) im Amazonasbecken',
  mapEmbed:
    'https://maps.google.com/maps?q=amazon+rainforest+brazil&t=&z=4&ie=UTF8&iwloc=&output=embed',
};


/** Instagram — @ohmyacai_dues. The reels are the shop's own cup photos; the
 *  section links out to the profile since the Graph API needs a token the
 *  site does not carry. */
export const INSTAGRAM = {
  handle: '@ohmyacai_dues',
  url: 'https://www.instagram.com/ohmyacai_dues/',
  heading: 'Frisch aus dem Feed',
  body: 'Echte Momente aus unseren Stores in Düsseldorf & Köln. Folge uns für Specials, neue Bowls und mehr.',
  /** Real reels from @ohmyacai_dues, downloaded so they play inline without
   *  a Graph API token. `code` is the Instagram shortcode — the "Auf
   *  Instagram ansehen" link uses it to open the original post. */
  reels: [
    {
      code: 'DcygjUJs8-C',
      video: '/instagram/DcygjUJs8-C.mp4',
      poster: '/instagram/DcygjUJs8-C.webp',
      alt: 'Bowl-Zubereitung: the process, the result',
    },
    {
      code: 'DdbrcrExmq1',
      video: '/instagram/DdbrcrExmq1.mp4',
      poster: '/instagram/DdbrcrExmq1.webp',
      alt: 'Zuckerfreie Açaí-Bowl im Special',
    },
    {
      code: 'DdUCZPuMOIr',
      video: '/instagram/DdUCZPuMOIr.mp4',
      poster: '/instagram/DdUCZPuMOIr.webp',
      alt: 'Açaí-Spot in Düsseldorf gefunden',
    },
    {
      code: 'DdMgssAMmDr',
      video: '/instagram/DdMgssAMmDr.mp4',
      poster: '/instagram/DdMgssAMmDr.webp',
      alt: 'Oh My Açaí — Signature Reel',
    },
  ],
};

export type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

/** Top-level nav. Groups open a dropdown on desktop and are listed flat in
 *  the mobile drawer. The group's own href is where a click on the label
 *  goes. */
export const NAV_LINKS: NavLink[] = [
  {
    label: 'Karte',
    href: '/speisekarte',
    children: [
      { label: 'Speisekarte & Preise', href: '/speisekarte' },
      { label: 'Açaí Bowls', href: '/acai-bowls-duesseldorf' },
      { label: 'Iced Matcha', href: '/matcha-duesseldorf' },
      { label: 'Zutaten & Allergene', href: '/zutaten-allergene' },
    ],
  },
  {
    label: 'Standorte',
    href: '/duesseldorf',
    children: [
      { label: 'Düsseldorf', href: '/duesseldorf' },
      { label: 'Köln', href: '/koeln' },
    ],
  },
  { label: 'Franchise', href: '/franchise' },
  {
    label: 'Mehr',
    href: '/ueber-uns',
    children: [
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Bewertungen', href: '/bewertungen' },
      { label: 'Magazin', href: '/magazin' },
      { label: 'Großhandel', href: '/#wholesale' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
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
    eyebrow: 'Banane, Erdbeere & Kokos',
    title: 'Açai Tropical',
    color: '#e6a002',
    bg: '/img/panel/panel-1.png',
    image: '/img/panel/cup-1.png',
  },
  {
    eyebrow: 'Bueno, Granola & Erdbeeren',
    title: 'Açai Bueno',
    color: '#8c5737',
    bg: '/img/panel/panel-2.png',
    image: '/img/panel/cup-2.png',
  },
  {
    eyebrow: 'Pistaziencreme, Granola & Banane',
    title: 'Açai Pistazie',
    color: '#99a75a',
    bg: '/img/panel/panel-3.png',
    image: '/img/panel/cup-3.png',
  },
  {
    eyebrow: 'Erdnussbutter, Granola & Banane',
    title: 'Açai Erdnussbutter',
    color: '#8c5737',
    bg: '/img/panel/panel-4.png',
    image: '/img/panel/cup-4.png',
  },
  {
    eyebrow: 'Cheesecake-Creme, Granola & Beeren',
    title: 'Açai Cheesecake',
    color: '#d0c1b0',
    bg: '/img/panel/panel-5.png',
    image: '/img/panel/cup-5.png',
  },
]

/** Signature bowls grid — 3 × 2 (Figma: Frame 44) */
/* Home "Signature Bowls" (Figma "Frame 44") — five full-bleed studio cards,
 * each a cup photographed on its own coloured backdrop with a bottom fade for
 * legible white copy. `fade` is the artboard's per-card gradient end colour. */
export const BOWLS = [
  { name: 'Açai Bueno',        price: 'ab €11,90', rating: '4.9', image: '/img/bowls/bueno.jpg',        video: '/img/bowls/bueno.mp4',        fade: '#5c3d2f' },
  { name: 'Açai Erdnussbutter',price: 'ab €11,90', rating: '4.8', image: '/img/bowls/erdnussbutter.jpg',video: '/img/bowls/erdnussbutter.mp4',fade: '#764f38' },
  { name: 'Açai Pistazie',     price: 'ab €11,90', rating: '4.9', image: '/img/bowls/pistazie.jpg',     video: '/img/bowls/pistazie.mp4',     fade: '#64653b' },
  { name: 'Açai Tropical',     price: 'ab €12,80', rating: '4.7', image: '/img/bowls/tropical.jpg',     video: '/img/bowls/tropical.mp4',     fade: '#a87728' },
  { name: 'Açai Cheesecake',   price: 'ab €11,90', rating: '4.8', image: '/img/bowls/cheesecake.jpg',   video: '/img/bowls/cheesecake.mp4',   fade: '#948377' },
];

/** Feature callouts floating over the video panel (Figma: placeholder copy
 *  was replaced with real Oh My Açaí value props).
 *  `pos` is lg-only: below that the cards sit in a grid, where a bare
 *  left/top would shove each one out of its grid cell. */
export const VIDEO_HEADING = {
  before: 'Mehr als eine ',
  accent: 'Bowl',
  after: ' — ein Ritual',
};

export const VIDEO_CARDS = [
  {
    title: 'Handverlesene Beeren',
    body: 'Wir wählen unsere Açaí-Beeren aus Partnerkooperativen im Amazonasbecken — jede Bowl schmeckt nach ihrem Ursprung.',
    pos: 'lg:left-[8.6%] lg:top-[24.5%]',
  },
  {
    title: 'Frisch aus der Region',
    body: 'Obst und Toppings kaufen wir jede Woche frisch bei Erzeugern in Düsseldorf und Umgebung ein.',
    pos: 'lg:left-[62.8%] lg:top-[32.8%]',
  },
  {
    title: 'Vegan von Haus aus',
    body: 'Açaí, Chia-Pudding und Obst sind rein pflanzlich, ohne Kompromisse beim Geschmack oder der Cremigkeit.',
    pos: 'lg:left-[10.6%] lg:top-[73%]',
  },
  {
    title: 'Ein Ort zum Bleiben',
    body: 'Weiche Sitzecken, ruhige Musik und kostenloses WLAN — gemacht für eine Pause, nicht für die Hektik.',
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
    q: 'Wo gibt es Açaí in Düsseldorf',
    a: 'Unseren Açaí Shop in Düsseldorf findest du in der Flinger Straße 18, mitten in der Altstadt. Hier mixen wir frische Açaí Bowls aus brasilianischem Açaí-Püree, unseren zweiten Store gibt es in Köln in der Hohe Straße 105-107.',
  },
  {
    q: 'Was ist in euren Açaí Bowls',
    a: 'Die Basis ist Püree aus der Açaí-Beere auf veganem Chia Pudding, mit Granola und frischem Obst: Erdbeeren, Heidelbeeren, Banane und Kokos. Als Topping wählst du Erdnussbutter, Pistazie, Bueno, Cheesecake oder Tropical.',
  },
  {
    q: 'Gibt es Takeaway und Lieferung',
    a: 'Ja. Jede Bowl gibt es als Takeaway zum Mitnehmen, und in Düsseldorf liefern wir über Wolt, Lieferando und Uber Eats.',
  },
  {
    q: 'Habt ihr vegane Optionen',
    a: 'Ja. Açaí, Chia Pudding, Obst und Kokos sind vegan, bei einzelnen Toppings sagen wir dir gern, was drin steckt. Ab 11 Uhr ist eine Bowl auch ein gutes spätes Frühstück in der Altstadt.',
  },
];

/** Google reviews widget (Figma: Frame 39) */
export const REVIEW_SUMMARY = {
  name: 'Oh My Acai',
  score: '5.0',
  count: '100+ Bewertungen auf',
};

export const REVIEWS = [
  {
    name: 'Lena Vogel',
    when: 'vor 2 Wochen',
    body: 'Beste Açaí Bowl in Düsseldorf! Cremig, frisch und die Toppings sind top. Komme definitiv wieder.',
  },
  {
    name: 'Marco Bianchi',
    when: 'vor 1 Monat',
    body: 'Super freundliches Team und die Bowls schmecken wie im Urlaub. Erdnussbutter ist mein Favorit.',
  },
  {
    name: 'Aylin Demir',
    when: 'vor 3 Wochen',
    body: 'Endlich echtes Açaí! Nicht zu süß, richtig cremig und schöne Portionen. Klare Empfehlung.',
  },
  {
    name: 'Jonas Keller',
    when: 'vor 5 Tagen',
    body: 'Schneller Service, faire Preise und die Bowl war perfekt. Der Laden sieht auch mega aus.',
  },
  {
    name: 'Sophie Wagner',
    when: 'vor 2 Monaten',
    body: 'Mega lecker und so frisch. Die Açai Pistazie ist mein absoluter Favorit — cremig und gut gebalanced.',
  },
  {
    name: 'Tom Fischer',
    when: 'vor 1 Woche',
    body: 'Immer wieder gerne. Qualität stimmt, Toppings sind großzügig und alles schmeckt frisch.',
  },
  {
    name: 'Nina Hoffmann',
    when: 'vor 4 Tagen',
    body: 'Vegane Optionen, toller Geschmack und nettes Personal. Perfekt für die Mittagspause.',
  },
  {
    name: 'David Klein',
    when: 'vor 3 Tagen',
    body: 'Die Açai Bueno ist unglaublich gut. Sättigt und schmeckt trotzdem leicht.',
  },
];

/** Footer (Figma: Footer - Desktop) — every entry points at a real section
 *  anchor on the home page. Placeholder rows the shop doesn't run
 *  (Blog, Reservierung, 404, Twitter, Pinterest) are dropped. */
export const FOOTER_PAGES: { label: string; href: string }[] = [
  { label: 'Speisekarte', href: '/speisekarte' },
  { label: 'Açaí Bowls',  href: '/acai-bowls-duesseldorf' },
  { label: 'Matcha',      href: '/matcha-duesseldorf' },
  { label: 'Bestellen',   href: '/online-bestellen' },
  { label: 'Über uns',    href: '/ueber-uns' },
  { label: 'Franchise',   href: '/franchise' },
  { label: 'Zutaten',     href: '/zutaten-allergene' },
  { label: 'Magazin',     href: '/magazin' },
  { label: 'Bewertungen', href: '/bewertungen' },
  { label: 'FAQ',         href: '/faq' },
  { label: 'Kontakt',     href: '/kontakt' },
];

/** Real social handles (opened in new tab). Order matches the store's own
 *  activity — Instagram (@ohmyacai_dues) is the primary account, TikTok
 *  (@ohmyacai.de) is where the reels get cross-posted. Facebook has no
 *  active page so it isn't linked. */
export const FOOTER_SOCIAL: { label: string; href: string }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/ohmyacai_dues/' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@ohmyacai.de' },
];

export const CONTACT = {
  email: 'info@ohmyacai.de',
  phone: '01573 2016134',
  address: ['Flinger Str. 18', '40213 Düsseldorf', 'Deutschland'],
};

/** Both store locations for the footer. Addresses match the two Oh My Açaí
 *  Google Business Profiles (Düsseldorf + Köln). */
export const LOCATIONS = [
  {
    label: 'Düsseldorf',
    page: '/duesseldorf',
    lines: ['Flinger Str. 18', '40213 Düsseldorf'],
    mapUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Oh+My+Acai+Flinger+Str.+18+40213+D%C3%BCsseldorf',
  },
  {
    label: 'Köln',
    page: '/koeln',
    lines: ['Hohe Str. 105-107', '50667 Köln'],
    mapUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Oh+My+Acai+Hohe+Str.+105-107+50667+K%C3%B6ln',
  },
];

export type StoreLocation = {
  slug: string;
  city: string;
  label: string;
  addressLines: string[];
  mapUrl: string;
  mapEmbed: string;
  hours: { day: string; time: string }[];
  photo?: { src: string; alt: string };
  /** how to get there, one short line each */
  arrival: { title: string; body: string }[];
};

/** Flagship — Oh My Açaí Düsseldorf. Hours per the Google Business Profile;
 *  open every day, through midnight on Fri/Sat. */
export const LOCATION_DUESSELDORF: StoreLocation = {
  slug: 'duesseldorf',
  city: 'Düsseldorf',
  label: 'Oh My Açaí Düsseldorf',
  addressLines: ['Flinger Str. 18', '40213 Düsseldorf', 'Deutschland'],
  mapUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Oh+My+Acai+Flinger+Str.+18+40213+D%C3%BCsseldorf',
  mapEmbed:
    'https://maps.google.com/maps?q=Flinger%20Str.%2018,%2040213%20D%C3%BCsseldorf&t=&z=16&ie=UTF8&iwloc=&output=embed',
  hours: [
    { day: 'Montag',     time: '11:00 – 22:00' },
    { day: 'Dienstag',   time: '11:00 – 22:00' },
    { day: 'Mittwoch',   time: '11:00 – 22:00' },
    { day: 'Donnerstag', time: '11:00 – 22:00' },
    { day: 'Freitag',    time: '11:00 – 00:00' },
    { day: 'Samstag',    time: '11:00 – 00:00' },
    { day: 'Sonntag',    time: '12:00 – 23:00' },
  ],
  photo: { src: '/img/store.jpg', alt: 'Oh My Açaí Store in der Flinger Straße 18, Düsseldorf Altstadt' },
  arrival: [
    { title: 'U-Bahn', body: 'Haltestelle Heinrich-Heine-Allee, von dort ein paar Minuten zu Fuß durch die Altstadt.' },
    { title: 'Zu Fuß', body: 'Die Flinger Straße ist Fußgängerzone, mitten zwischen Marktplatz und Heinrich-Heine-Allee.' },
    { title: 'Mit dem Auto', body: 'Am einfachsten über die Parkhäuser an der Heinrich-Heine-Allee.' },
  ],
};

/** Second store — Oh My Açaí Köln. Hours + address per the Google Business
 *  Profile the owner shared. */
export const LOCATION_COLOGNE: StoreLocation & { ratingLine: string } = {
  slug: 'koeln',
  city: 'Köln',
  label: 'Oh My Açaí Köln',
  addressLines: ['Hohe Str. 105-107', '50667 Köln', 'Deutschland'],
  ratingLine: '4,4 ★ auf Google (25+ Bewertungen)',
  mapUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Oh+My+Acai+Hohe+Str.+105-107+50667+K%C3%B6ln',
  mapEmbed:
    'https://maps.google.com/maps?q=Hohe%20Str.%20105-107,%2050667%20K%C3%B6ln&t=&z=16&ie=UTF8&iwloc=&output=embed',
  hours: [
    { day: 'Montag',     time: '11:00 – 20:30' },
    { day: 'Dienstag',   time: '11:00 – 20:30' },
    { day: 'Mittwoch',   time: '11:00 – 20:30' },
    { day: 'Donnerstag', time: '11:00 – 20:30' },
    { day: 'Freitag',    time: '11:00 – 20:30' },
    { day: 'Samstag',    time: '10:00 – 21:00' },
    { day: 'Sonntag',    time: '13:30 – 18:30' },
  ],
  arrival: [
    { title: 'Bahn', body: 'Köln Hbf oder Haltestelle Dom/Hbf, von dort wenige Minuten über die Hohe Straße.' },
    { title: 'Zu Fuß', body: 'Die Hohe Straße ist Fußgängerzone und verbindet den Dom mit der Schildergasse.' },
    { title: 'Mit dem Auto', body: 'Parkhäuser in der Innenstadt, zum Beispiel rund um den Dom und die Schildergasse.' },
  ],
};

export const STORES = [LOCATION_DUESSELDORF, LOCATION_COLOGNE];

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
    { value: '1', label: 'Flagship-Store in Düsseldorf' },
    { value: '30 +', label: 'Rezepte, Playbook & SOPs' },
    { value: '6 Wo.', label: 'Bis zur Eröffnung' },
  ],
};

export const FRANCHISE_FORM = {
  title: 'Franchise-Paket anfordern',
  body: 'Kosten, Gebietskarte und der Sechs-Wochen-Eröffnungsplan — innerhalb eines Werktags in deinem Postfach.',
  consent: 'Oh My Açaí darf mich zur Eröffnung einer eigenen Filiale kontaktieren.',
  submit: 'Franchise-Paket schicken',
  budgets: [
    'Unter 80.000 €',
    '80.000 – 150.000 €',
    '150.000 – 250.000 €',
    'Über 250.000 €',
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
    image: '/img/fr/step-1.webp',
    alt: 'Illustration: Franchise-Handschlag über einer Karte, Açaí-Bowl daneben',
    bg: 'bg-cream',
    /** Figma alternates which half the photo sits on */
    imageFirst: true,
  },
  {
    n: '02',
    label: 'Schritt 02',
    title: 'Aufbauen',
    body: 'Ladenbau, Technik, Kasse und Lieferwege übernimmt unser Team. Dein Team wird auf der kompletten Bowl-Karte geschult, bis jede Bowl genauso aussieht wie die, die wir in unserem Flagship-Store in Düsseldorf servieren.',
    image: '/img/fr/step-2.webp',
    alt: 'Illustration: Team baut die neue Oh My Açaí Bar auf und trainiert die Bowl-Karte',
    bg: 'bg-[#fdf3e3]',
    imageFirst: false,
  },
  {
    n: '03',
    label: 'Schritt 03',
    title: 'Servieren',
    body: 'Die Eröffnungswoche läuft gemeinsam mit dir — Launch-Kampagne, Lieferdienste und lokale Partner starten zusammen, damit die Schlange schon bei der ersten Bowl steht.',
    image: '/img/fr/step-3.webp',
    alt: 'Illustration: Eröffnungstag mit Warteschlange und einer Barista, die eine Bowl übergibt',
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
/** The four hero bowls the franchise pack ships with. The image is a
 *  background-removed cutout of each cup (rembg / u2net + WebP, ~57 KB
 *  each), so the cup floats on top of the solid-colour card exactly like
 *  the Figma "Meet Our Bowls" frame — no photo backdrop, no two-tone
 *  split. `color` is the card fill, chosen from Figma's palette. */
export const FRANCHISE_BOWLS = [
  { name: 'Açai Bueno',      image: '/img/bowls/bueno-cutout.webp',        color: '#e6a002' },
  { name: 'Açai Tropical',   image: '/img/bowls/tropical-cutout.webp',     color: '#8c5737' },
  { name: 'Açai Pistazie',   image: '/img/bowls/pistazie-cutout.webp',     color: '#7c8b3f' },
  { name: 'Açai Cheesecake', image: '/img/bowls/cheesecake-cutout.webp',   color: '#d0c1b0' },
];

export const FRANCHISE_BOWLS_HEAD = {
  titleBefore: 'Unsere ',
  titleAccent: 'Bowls',
  body: 'Jedes Franchise startet mit derselben Signature-Karte — unsere Signature Bowls nach den Rezepten, die unsere Küche im Laden verfeinert hat, dazu viermal im Jahr saisonale Specials, damit es an deiner Theke nie langweilig wird.',
};

export const FRANCHISE_WHY = {
  titleBefore: 'Warum ',
  titleAccent: 'Franchise',
  titleAfter: ' mit Oh My Açaí',
  body: 'Wir starten das Franchise mit dem Rezept, das in unserem Flagship-Store in Düsseldorf jeden Tag ausverkauft ist — mit fest verhandelten Lieferanten, geschulten Baristas und einem Eröffnungsplan, der jeden Schritt vorgibt. Du bringst den Standort und die Energie mit.',
  stats: [
    { value: '100 %', label: 'Echtes Açaí-Püree statt Pulver' },
    { value: '5', label: 'Signature Bowls von Tag 1' },
    { value: '6 Wo.', label: 'Vom Vertrag bis zur Eröffnung' },
  ],
};

export const FRANCHISE_PARTNER = {
  titleBefore: 'Stimmen unserer ',
  titleAccent: 'Partner',
  body: 'Ein Blick in unseren Flagship-Store in der Flinger Straße — Menschen, Bowls und der Ort, an dem wir das Konzept jeden Tag verfeinern. Das gleiche Erlebnis bringst du in deine Stadt.',
  /** The store's own reel from @ohmyacai_dues — "the process / the result",
   *  bowl-prep shot at the flagship. Downloaded from Instagram once and
   *  served locally so we don't depend on Instagram's embed (which blanks on
   *  most third-party origins). Swap the MP4 to update. */
  video: '/video/partner-reel.mp4',
  poster: '/img/partner-poster.jpg',
  reel: 'DcygjUJs8-C',
  profileUrl: 'https://www.instagram.com/ohmyacai_dues/',
};

/** Die Franchise-Seite nutzt dieselben fünf Fragen, mit Fragezeichen. */
export const FRANCHISE_FAQS = FAQS.map((f) => ({ ...f, q: `${f.q}?` }));

/** Legal — content from the client's Impressum & Datenschutz PDFs. */
export const COMPANY = {
  name: 'Ohmyacai UG (haftungsbeschränkt)',
  founder: 'Karim Asabar',
  street: 'Flinger Str. 18',
  city: '40213 Düsseldorf',
  country: 'Deutschland',
  phone: '01573 2016134',
  email: 'info@ohmyacai.de',
  web: 'ohmyacai.de',
};

export const IMPRESSUM = {
  title: 'Impressum',
  updated: 'Rechtliche Angaben',
  sections: [
    {
      heading: 'Angaben gemäß § 5 DDG',
      body:
        'Ohmyacai UG (haftungsbeschränkt)\nFlinger Str. 18\n40213 Düsseldorf\nDeutschland',
    },
    {
      heading: 'Vertreten durch',
      body: 'Karim Asabar (Geschäftsführer)',
    },
    {
      heading: 'Kontakt',
      body:
        'Telefon: 01573 2016134\nE-Mail: info@ohmyacai.de\nWeb: ohmyacai.de',
    },
    {
      heading: 'Registereintrag',
      body:
        'Eingetragen im Handelsregister\nRegistergericht: Amtsgericht Düsseldorf\nRegisternummer: HRB (wird nachgetragen)',
    },
    {
      heading: 'Umsatzsteuer-Identifikations\u00ADnummer',
      body:
        'Die Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz wird nachgetragen.',
    },
    {
      heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      body: 'Karim Asabar\nFlinger Str. 18, 40213 Düsseldorf',
    },
    {
      heading: 'Verbraucher\u00ADstreit\u00ADbeilegung / Universal\u00ADschlichtungs\u00ADstelle',
      body:
        'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    },
    {
      heading: 'Haftung für Inhalte',
      body:
        'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    },
    {
      heading: 'Haftung für Links',
      body:
        'Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    },
    {
      heading: 'Urheberrecht',
      body:
        'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
    },
  ],
};

export const DATENSCHUTZ = {
  title: 'Datenschutz\u00ADerklärung',
  updated: 'Datenschutz',
  sections: [
    {
      heading: '1 · Datenschutz auf einen Blick',
      body:
        'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen entnehmen Sie der nachfolgenden Datenschutzerklärung.',
    },
    {
      heading: '2 · Verantwortliche Stelle',
      body:
        'Verantwortlich für die Datenverarbeitung auf dieser Website ist:\n\nOhmyacai UG (haftungsbeschränkt)\nKarim Asabar\nFlinger Str. 18\n40213 Düsseldorf\nTelefon: 01573 2016134\nE-Mail: info@ohmyacai.de\n\nVerantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.',
    },
    {
      heading: '3 · Ihre Rechte',
      body:
        'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO). Sie haben außerdem ein Recht auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie ein Widerspruchsrecht (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit widerrufen.\n\nIhnen steht zudem ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständig ist in Nordrhein-Westfalen die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße 2–4, 40213 Düsseldorf.',
    },
    {
      heading: '4 · Hosting',
      body:
        'Wir hosten die Inhalte unserer Website bei einem externen Dienstleister. Die Erfassung und Verarbeitung Ihrer Daten erfolgt ausschließlich in Deutschland bzw. der Europäischen Union. Mit dem Anbieter haben wir einen Vertrag über Auftragsverarbeitung (AVV) geschlossen. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und effizienten Bereitstellung unserer Website (Art. 6 Abs. 1 lit. f DSGVO).',
    },
    {
      heading: '5 · Server-Log-Dateien',
      body:
        'Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:\n• Browsertyp und Browserversion\n• verwendetes Betriebssystem\n• Referrer URL\n• Hostname des zugreifenden Rechners\n• Uhrzeit der Serveranfrage\n• IP-Adresse\n\nEine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur technisch fehlerfreien Darstellung und Optimierung der Website.',
    },
    {
      heading: '6 · Kontaktaufnahme',
      body:
        'Wenn Sie uns per E-Mail (info@ohmyacai.de), Telefon oder Kontaktformular kontaktieren, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
    },
    {
      heading: '7 · Cookies',
      body:
        'Unsere Website verwendet gegebenenfalls Cookies. Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Für alle nicht notwendigen Cookies (z. B. Analyse, Marketing) holen wir Ihre Einwilligung über ein Cookie-Banner ein (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.',
    },
    {
      heading: '8 · Analyse-Tools und Drittanbieter',
      body:
        'Soweit auf dieser Website Dienste von Drittanbietern zum Einsatz kommen (z. B. Web-Analyse wie Google Analytics, Marketing-Pixel wie der Meta-Pixel, Kartendienste wie Google Maps oder Reservierungs- und Bestellsysteme), erfolgt deren Einsatz ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie über das Cookie-Banner erteilen. Die konkret eingesetzten Dienste sowie deren Anbieter und Datenverarbeitung werden hier aufgeführt, sobald sie aktiv genutzt werden.',
    },
    {
      heading: '9 · Soziale Medien',
      body:
        'Wir sind auf sozialen Netzwerken (z. B. Instagram, Facebook, TikTok) vertreten. Wenn Sie auf entsprechende Verlinkungen klicken, gelangen Sie auf die Seiten der jeweiligen Anbieter, für deren Datenverarbeitung deren eigene Datenschutzbestimmungen gelten.',
    },
    {
      heading: '10 · Speicherdauer',
      body:
        'Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Gesetzliche Aufbewahrungsfristen (z. B. handels- und steuerrechtlich) bleiben unberührt.',
    },
  ],
};


/* ------------------------------------------------------------------ *
 * Content pages (strategy sheet: /speisekarte, /acai-bowls-duesseldorf,
 * /matcha-duesseldorf, /online-bestellen, /faq, /ueber-uns, /kontakt)
 * ------------------------------------------------------------------ */

/** Bowl menu. Toppings and prices from the shop's own delivery listings
 *  (Wolt, Lieferando, Uber Eats, checked 2026-10-07): every bowl is açaí
 *  purée on chia pudding with granola, banana, strawberries, blueberries and
 *  coconut, plus its signature topping. Wolt sells 0,35 l (11,90 €) and
 *  0,5 l (13,50 €); Tropical is only on Lieferando (12,80 €) / Uber Eats. */
export const MENU_BOWLS = [
  {
    name: 'Açai Erdnussbutter',
    price: 'ab 11,90 €',
    body: 'Açaí-Püree auf veganem Chia-Pudding mit Erdnussbutter, Granola, Banane, Erdbeeren, Heidelbeeren und Kokosraspeln.',
    toppings: 'Erdnussbutter, Granola & Banane',
    image: '/img/bowls/erdnussbutter.jpg',
  },
  {
    name: 'Açai Pistazie',
    price: 'ab 11,90 €',
    body: 'Açaí-Püree auf veganem Chia-Pudding mit Pistaziencreme, Granola, Banane, Erdbeeren, Heidelbeeren und Kokosraspeln.',
    toppings: 'Pistaziencreme, Granola & Banane',
    image: '/img/bowls/pistazie.jpg',
  },
  {
    name: 'Açai Bueno',
    price: 'ab 11,90 €',
    body: 'Açaí-Püree auf veganem Chia-Pudding mit Bueno, Granola, Banane, Erdbeeren, Heidelbeeren und Kokosraspeln.',
    toppings: 'Bueno, Granola & Erdbeeren',
    image: '/img/bowls/bueno.jpg',
  },
  {
    name: 'Açai Tropical',
    price: 'ab 12,80 €',
    body: 'Açaí-Püree auf veganem Chia-Pudding mit Granola, Banane, Erdbeeren, Heidelbeeren und Kokosraspeln.',
    toppings: 'Banane, Erdbeere & Kokos',
    image: '/img/bowls/tropical.jpg',
  },
  {
    name: 'Açai Cheesecake',
    price: 'ab 11,90 €',
    body: 'Açaí-Püree auf veganem Chia-Pudding mit Cheesecake-Creme, Granola, Banane, Erdbeeren, Heidelbeeren und Kokosraspeln.',
    toppings: 'Cheesecake-Creme, Granola & Beeren',
    image: '/img/bowls/cheesecake.jpg',
  },
];

/** Iced Matcha line-up in Düsseldorf. Names and prices from the shop's
 *  Lieferando menu (ohmyacai-dusseldorf.de, checked 2026-10-07). */
export const MATCHA_DRINKS = [
  {
    name: 'Ohmy Matcha Mango',
    price: '6,50 €',
    body: 'Iced Matcha, geschichtet mit fruchtigem Mangopüree.',
    color: '#e6a002',
  },
  {
    name: 'Ohmy Matcha Strawberry',
    price: '6,50 €',
    body: 'Iced Matcha über einer Schicht aus Erdbeerpüree.',
    color: '#c8475f',
  },
  {
    name: 'Ohmy Matcha Spezial',
    price: '5,40 €',
    body: 'Unser Haus-Matcha auf Eis, pur und erfrischend.',
    color: '#7c8b3f',
  },
];

/** Cold drinks, from the Lieferando menu (prices incl. 0,25 € Pfand). */
export const COLD_DRINKS = [
  { name: 'Cola', price: '3,15 €' },
  { name: 'Cola Zero', price: '3,15 €' },
  { name: 'Fanta', price: '3,15 €' },
  { name: 'Sprite', price: '3,15 €' },
  { name: 'Mezzo Mix', price: '3,15 €' },
  { name: 'Wasser still', price: '2,95 €' },
  { name: 'Wasser sprudelnd', price: '2,95 €' },
];

/** Long-form FAQ for /faq. Questions are the 23 from the keyword sheet
 *  ("Selected keywords" → FAQs), worded as people search them. Answers stay
 *  within what is verified: menus and prices from Wolt / Lieferando / Uber
 *  Eats, both addresses, store hours. No nutrition or health claims. */
export const FAQ_PAGE = [
  {
    q: 'Was ist Açaí?',
    a: 'Açaí ist die kleine, dunkelviolette Beere der Açaí-Palme (Euterpe oleracea) aus dem Amazonasgebiet in Brasilien. Weil die frische Frucht schnell verdirbt, wird sie direkt nach der Ernte entkernt, zu Püree verarbeitet und tiefgefroren. Daraus mixen wir die cremige, eisgekühlte Basis jeder Bowl.',
  },
  {
    q: 'Was ist eine Açaí Bowl?',
    a: 'Eine Açaí Bowl ist eine dicke, gefrorene Smoothie Bowl aus Açaí-Püree, die man löffelt statt trinkt. Bei uns kommt sie auf veganen Chia-Pudding und wird mit Granola, Banane, Erdbeeren, Heidelbeeren, Kokosraspeln und einem Signature-Topping belegt.',
  },
  {
    q: 'Wie spricht man Açaí aus?',
    a: 'Ungefähr „a-sa-ÍH“, mit Betonung auf der letzten Silbe. Das „ç“ wird wie ein scharfes „s“ gesprochen, das Wort kommt aus dem brasilianischen Portugiesisch.',
  },
  {
    q: 'Woher kommt Açaí?',
    a: 'Die Açaí-Palme wächst im Amazonasgebiet, vor allem im brasilianischen Bundesstaat Pará rund um die Amazonasmündung. Unser Püree beziehen wir von Partner-Kooperativen aus dieser Region.',
  },
  {
    q: 'Wie schmeckt Açaí?',
    a: 'Reines Açaí schmeckt erdig-fruchtig, ein bisschen nach dunklen Beeren mit einem Hauch Kakao, und ist von Natur aus kaum süß. Die Süße in einer Bowl kommt vor allem vom Obst und den Toppings.',
  },
  {
    q: 'Ist Açaí vegan?',
    a: 'Ja. Açaí ist eine Frucht, das reine Püree ist rein pflanzlich.',
  },
  {
    q: 'Ist eine Açaí Bowl vegan?',
    a: 'Die Basis aus Açaí-Püree und Chia-Pudding ist vegan. Ob die ganze Bowl vegan ist, hängt vom Topping ab: Bei Bueno und Cheesecake-Creme frag bitte im Store nach, wir sagen dir genau, was drin steckt.',
  },
  {
    q: 'Was ist in einer Açaí Bowl?',
    a: 'Bei Oh My Açaí: Açaí-Püree, veganer Chia-Pudding, Granola, Banane, Erdbeeren, Heidelbeeren und Kokosraspeln, dazu je nach Bowl Erdnussbutter, Pistaziencreme, Bueno oder Cheesecake-Creme. Alle Details findest du unter Zutaten & Allergene.',
  },
  {
    q: 'Welche Toppings gibt es für Açaí Bowls?',
    a: 'Jede Bowl hat Granola, Banane, Erdbeeren, Heidelbeeren und Kokosraspeln. Das Signature-Topping macht den Unterschied: Erdnussbutter, Pistaziencreme, Bueno, Cheesecake-Creme oder unsere Tropical Bowl.',
  },
  {
    q: 'Enthält Açaí Zucker?',
    a: 'Reines Açaí-Püree enthält von Natur aus nur wenig Zucker. Obst und Toppings wie Bueno, Cheesecake-Creme oder Granola bringen zusätzliche Süße mit.',
  },
  {
    q: 'Wie viele Kalorien hat eine Açaí Bowl?',
    a: 'Das hängt stark von Größe (0,35 l oder 0,5 l) und Topping ab. Geprüfte Nährwertangaben für unsere Bowls bekommst du auf Nachfrage im Store.',
  },
  {
    q: 'Ist Granola glutenfrei?',
    a: 'In der Regel nicht: Granola wird meist aus Hafer gemacht und kann Gluten enthalten. Wenn du glutenfrei essen musst, sprich uns vor der Bestellung an.',
  },
  {
    q: 'Enthalten eure Bowls Nüsse?',
    a: 'Die Erdnussbutter Bowl enthält Erdnüsse, die Pistazie Bowl Pistazien. Auch in anderen Toppings können Nüsse oder Spuren davon stecken. Bei einer Nussallergie frag bitte vor der Bestellung im Store nach.',
  },
  {
    q: 'Kann ich meine Açaí Bowl individuell zusammenstellen?',
    a: 'Sprich uns an der Theke an. Wir passen Toppings gern an, soweit es möglich ist.',
  },
  {
    q: 'Kann ich Açaí Bowls in Düsseldorf bestellen?',
    a: 'Ja, über Wolt, Lieferando und Uber Eats. Alle Wege findest du auf der Seite Online bestellen.',
  },
  {
    q: 'Liefert Oh My Acai in Düsseldorf?',
    a: 'Ja. Unser Store in der Flinger Straße liefert über Wolt, Lieferando und Uber Eats im jeweiligen Liefergebiet in Düsseldorf.',
  },
  {
    q: 'Kann ich meine Bestellung abholen?',
    a: 'Ja. Stell in der Liefer-App auf Abholung um, dann wartet deine Bowl fertig an der Theke. Oder komm einfach vorbei und bestell direkt im Store.',
  },
  {
    q: 'Welche Größen gibt es?',
    a: 'Unsere Bowls gibt es je nach Bowl in 0,35 l und 0,5 l.',
  },
  {
    q: 'Wie viel kostet eine Açaí Bowl?',
    a: 'Ab 11,90 € für 0,35 l und ab 13,50 € für 0,5 l, je nach Bowl und Bestellweg. Die aktuellen Preise stehen auf unserer Speisekarte.',
  },
  {
    q: 'Gibt es Matcha bei Oh My Acai?',
    a: 'Ja, in Düsseldorf gibt es Iced Matcha: Ohmy Matcha Mango und Strawberry (je 6,50 €) und unseren Ohmy Matcha Spezial (5,40 €). Frisch zubereitet und auch zum Mitnehmen.',
  },
  {
    q: 'Gibt es vegane Optionen?',
    a: 'Ja. Açaí-Püree und Chia-Pudding sind vegan, ebenso Obst und Kokos. Bei einzelnen Toppings fragst du am besten kurz im Store nach.',
  },
  {
    q: 'Wo befindet sich Oh My Acai Düsseldorf?',
    a: 'In der Flinger Straße 18, 40213 Düsseldorf, mitten in der Altstadt, ein paar Gehminuten von der U-Bahn-Haltestelle Heinrich-Heine-Allee. Unseren zweiten Store findest du in Köln, Hohe Str. 105-107.',
  },
  {
    q: 'Wie sind die Öffnungszeiten?',
    a: 'Düsseldorf: Mo bis Do 11:00 bis 22:00, Fr und Sa 11:00 bis 00:00, So 12:00 bis 23:00. Köln: Mo bis Fr 11:00 bis 20:30, Sa 10:00 bis 21:00, So 13:30 bis 18:30.',
  },
  {
    q: 'Kann ich euer Açaí-Püree für mein Café kaufen?',
    a: 'Ja. Wir verkaufen dasselbe reine Açaí-Püree, das wir selbst verwenden, an Cafés, Bars und Hotelküchen. Schick uns einfach eine Anfrage über das Großhandel-Formular.',
  },
  {
    q: 'Kann ich ein Oh My Açaí Franchise eröffnen?',
    a: 'Ja, wir suchen Partner für neue Standorte. Alle Infos und das Anfrageformular findest du auf unserer Franchise-Seite.',
  },
];

/** Pick FAQ entries by their question text (keeps page subsets readable). */
export const faqByQ = (...qs: string[]) => qs.map((q) => {
  const f = FAQ_PAGE.find((x) => x.q === q);
  if (!f) throw new Error(`FAQ missing: ${q}`);
  return f;
});

/** Internal-link cards, one per page, anchor text = the page's keyword.
 *  Pages pick from these per the sheet's "Recommended Internal Links". */
export const PAGE_LINKS = {
  home: { href: '/', label: 'Açaí Düsseldorf', body: 'Unsere Startseite: Bowls, Stores und alles rund um Oh My Açaí.' },
  speisekarte: { href: '/speisekarte', label: 'Speisekarte & Preise', body: 'Alle Bowls, Größen und Preise, Iced Matcha und kalte Getränke.' },
  bowls: { href: '/acai-bowls-duesseldorf', label: 'Açaí Bowls Düsseldorf', body: 'Fünf Signature Bowls aus echtem Açaí-Püree, frisch gemacht in der Altstadt.' },
  matcha: { href: '/matcha-duesseldorf', label: 'Iced Matcha Düsseldorf', body: 'Mango, Strawberry oder Spezial, frisch zubereitet und to go.' },
  zutaten: { href: '/zutaten-allergene', label: 'Zutaten & Allergene', body: 'Was in jeder Bowl steckt, was vegan ist und wo Nüsse drin sind.' },
  ueber: { href: '/ueber-uns', label: 'Über Oh My Açaí', body: 'Unsere Geschichte, unser Açaí und die zwei Stores.' },
  duesseldorf: { href: '/duesseldorf', label: 'Açaí Café Altstadt', body: 'Flinger Straße 18: Öffnungszeiten, Anfahrt und Karte.' },
  bewertungen: { href: '/bewertungen', label: 'Bewertungen', body: 'Was Gäste über uns sagen, auf Google, Wolt, Lieferando und Uber Eats.' },
  bestellen: { href: '/online-bestellen', label: 'Açaí online bestellen', body: 'Lieferung über Wolt, Lieferando und Uber Eats oder Abholung im Store.' },
  faq: { href: '/faq', label: 'Häufige Fragen', body: 'Preise, Größen, vegan, Allergene, Lieferung: kurz beantwortet.' },
  magazin: { href: '/magazin', label: 'Açaí & Matcha Magazin', body: 'Was ist Açaí, wie spricht man es aus und was ist Matcha?' },
  kontakt: { href: '/kontakt', label: 'Kontakt', body: 'Telefon, E-Mail, Adressen und Öffnungszeiten beider Stores.' },
} as const;
