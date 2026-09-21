/* Site copy, in German. The Figma artboard is in English; this is the
 * translated equivalent, kept in the same shape so every component reads
 * unchanged. Brand names (Oh My Açaí, the social networks) and the Latin
 * placeholder blocks the artboard ships with are left alone. */

export const ANNOUNCEMENT =
  'Entdecke in jeder Bowl die perfekte Harmonie aus frischen, lebendigen Aromen und wertvollen Zutaten — zu unserer Karte';

/** Ordering runs through the shop's Uber Eats page. */
export const ORDER_URL =
  'https://www.ubereats.com/de-en/store/oh-my-acai/0chQmXzLWeqM6P1pC7jJAw?diningMode=DELIVERY';

/** Instagram — @ohmyacai_dues. The reels are the shop's own cup photos; the
 *  section links out to the profile since the Graph API needs a token the
 *  site does not carry. */
export const INSTAGRAM = {
  handle: '@ohmyacai_dues',
  url: 'https://www.instagram.com/ohmyacai_dues/',
  heading: 'Frisch aus dem Feed',
  body: 'Echte Momente aus unserem Store in Düsseldorf. Folge uns für Specials, neue Bowls und mehr.',
  reels: [
    { image: '/img/instagram/reel-1.jpg', alt: 'Açaí Bowl vor dem Oh My Açaí Store' },
    { image: '/img/instagram/reel-2.jpg', alt: 'Açaí Bowl mit Erdbeeren in der Hand' },
    { image: '/img/instagram/reel-3.jpg', alt: 'Schokoladige Açaí Bowl mit Toppings' },
    { image: '/img/instagram/reel-4.jpg', alt: 'Açaí Bowl vor der Menütafel' },
  ],
};

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
/* Home "Signature Bowls" (Figma "Frame 44") — five full-bleed studio cards,
 * each a cup photographed on its own coloured backdrop with a bottom fade for
 * legible white copy. `fade` is the artboard's per-card gradient end colour. */
export const BOWLS = [
  { name: 'Klassische Açaí Bowl', price: '€12,90', rating: '4.8', image: '/img/signature/acai.jpg',   fade: '#864f33' },
  { name: 'Tropische Mango Bowl', price: '€12,90', rating: '4.8', image: '/img/signature/mango.jpg',  fade: '#fcba3f' },
  { name: 'Beeren-Traum Bowl',    price: '€12,90', rating: '4.6', image: '/img/signature/green.jpg',  fade: '#abb264' },
  { name: 'Kakao-Crunch Bowl',    price: '€12,90', rating: '4.9', image: '/img/signature/cream.jpg',  fade: '#d2c3b0' },
  { name: 'Erdnussbutter Bowl',   price: '€12,90', rating: '4.8', image: '/img/signature/peanut.jpg', fade: '#895331' },
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
    body: 'Fast unsere gesamte Karte ist milchfrei und vegan — ohne Kompromisse beim Geschmack oder der Cremigkeit.',
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
  count: '480+ Bewertungen auf',
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
    body: 'Mega lecker und so frisch. Die Beeren-Traum Bowl ist ein Traum, wie der Name schon sagt.',
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
    body: 'Die Kakao-Crunch Bowl ist unglaublich gut. Sättigt und schmeckt trotzdem leicht.',
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
  email: 'info@ohmyacai.de',
  phone: '01573 2016134',
  address: ['Flinger Str. 18', '40213 Düsseldorf', 'Deutschland'],
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
  { name: 'Klassische Açaí Bowl', image: '/img/panel/cup-1.png', color: '#e6a002' },
  { name: 'Tropische Mango Bowl', image: '/img/panel/cup-2.png', color: '#8c5737' },
  { name: 'Beeren-Traum Bowl',    image: '/img/panel/cup-3.png', color: '#99a75a' },
  { name: 'Kakao-Crunch Bowl',    image: '/img/panel/cup-4.png', color: '#d0c1b0' },
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
    { value: '100 %', label: 'Vegane, natürliche Zutaten' },
    { value: '5', label: 'Signature Bowls von Tag 1' },
    { value: '6 Wo.', label: 'Vom Vertrag bis zur Eröffnung' },
  ],
};

export const FRANCHISE_PARTNER = {
  titleBefore: 'Stimmen unserer ',
  titleAccent: 'Partner',
  body: 'Ein Blick in unseren Flagship-Store in der Flinger Straße — Menschen, Bowls und der Ort, an dem wir das Konzept jeden Tag verfeinern. Das gleiche Erlebnis bringst du in deine Stadt.',
  poster: '/img/store.jpg',
  /** Ambient partner-story film. When you have a partner interview, replace
   *  this URL with the mp4 (or set it to '' to show only the poster). */
  video:
    '/video/partner-preview.mp4',
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
      heading: 'Umsatzsteuer-Identifikationsnummer',
      body:
        'Die Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz wird nachgetragen.',
    },
    {
      heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      body: 'Karim Asabar\nFlinger Str. 18, 40213 Düsseldorf',
    },
    {
      heading: 'Verbraucherstreitbeilegung / Universalschlichtungsstelle',
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
  title: 'Datenschutzerklärung',
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
