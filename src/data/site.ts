/* All copy below is transcribed verbatim from the Figma file. */

export const ANNOUNCEMENT =
  'Discover the perfect harmony of fresh, vibrant flavors and nourishing goodness in every bowl — Explore Our Menu';

export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Menu', href: '/#menu' },
  { label: 'Franchise', href: '/franchise' },
];

export const MARQUEE_WORDS = [
  'Chill Smooth',
  'Crafted Cold',
  'Sip Slow',
  'Blend Bold',
];

/** Horizontal product carousel — 5 full-bleed slides (Figma: Products) */
export const SLIDES = [
  {
    eyebrow: 'Strawberry, Mango & Berries',
    title: 'Tropical Mango Bowl',
    body: 'nutritious & delicious smoothies that blend effortlessly into your life',
    bg: '#e6a002',
    image: '/img/bowl-slide.png',
  },
  {
    eyebrow: 'Açaí, Banana & Granola',
    title: 'Classic Açaí Bowl',
    body: 'nutritious & delicious smoothies that blend effortlessly into your life',
    bg: '#4d294e',
    image: '/img/bowl-slide-2.png',
  },
  {
    eyebrow: 'Blueberry, Blackberry & Chia',
    title: 'Berry Bliss Bowl',
    body: 'nutritious & delicious smoothies that blend effortlessly into your life',
    bg: '#9d5988',
    image: '/img/bowl-slide.png',
  },
  {
    eyebrow: 'Cacao, Almond & Coconut',
    title: 'Cacao Crunch Bowl',
    body: 'nutritious & delicious smoothies that blend effortlessly into your life',
    bg: '#d4973c',
    image: '/img/bowl-slide-2.png',
  },
  {
    eyebrow: 'Peanut Butter, Banana & Oat',
    title: 'Peanut Butter Bowl',
    body: 'nutritious & delicious smoothies that blend effortlessly into your life',
    bg: '#4d294e',
    image: '/img/bowl-slide.png',
  },
];

/** Signature bowls grid — 3 × 2 (Figma: Frame 44) */
export const BOWLS = [
  { name: 'Classic Açaí Bowl', price: '$7.50', rating: '4.8', image: '/img/bowl-1.png' },
  { name: 'Tropical Mango Bowl', price: '$6.75', rating: '4.8', image: '/img/bowl-2.png' },
  { name: 'Berry Bliss Bowl', price: '$5.50', rating: '4.6', image: '/img/bowl-3.png' },
  { name: 'Cacao Crunch Bowl', price: '$6.00', rating: '4.9', image: '/img/bowl-4.png' },
  { name: 'Peanut Butter Bowl', price: '$7.00', rating: '4.8', image: '/img/bowl-5.png' },
  { name: 'Coconut Dream Bowl', price: '$7.25', rating: '4.8', image: '/img/bowl-6.png' },
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
    title: 'Quality Without Compromise',
    body: 'We carefully select our berries and  refine every step of the process to  ensure each bowl delivers.',
    bg: 'bg-plum',
    badge: '#4d294e',
  },
  {
    n: '02',
    title: 'Craft In\nEvery Bowl',
    body: 'From smooth blending to crunchy toppings, we focus on precision and care to create bowls that feel rich.',
    bg: 'bg-mauve',
    badge: '#9d5988',
  },
  {
    n: '03',
    title: 'All the Moments\nThat Matter',
    body: 'Oh My Açaí is more than a bowl — it’s  about creating space to pause,  connect, and enjoy your day.',
    bg: 'bg-gold',
    badge: '#d4973c',
  },
];

/** FAQ (Figma: FAQ Section → Content) */
export const FAQS = [
  {
    q: 'What makes Oh My Acai different',
    a: 'At Oh My Açaí, we focus on quality in every step — from sourcing premium berries to crafting each bowl with precision.',
  },
  {
    q: 'Do you offer takeaway and delivery',
    a: 'Yes — every bowl on the menu is available for takeaway, and delivery is live across the neighbourhood through our partners.',
  },
  {
    q: 'Are your ingredients ethically sourced',
    a: 'Our açaí is sourced from partner cooperatives in the Amazon basin, and our fruit is bought fresh from local growers each week.',
  },
  {
    q: 'Do you offer dairy free and vegan options',
    a: 'Almost the entire menu is dairy free and vegan by default. Swap any topping and we will flag anything that is not.',
  },
  {
    q: 'Is Oh My Acai a good place to relax',
    a: 'That is the whole idea — soft seating, slow music and free wifi, built for a pause rather than a rush.',
  },
];

/** Google reviews widget (Figma: Frame 39) */
export const REVIEW_SUMMARY = {
  name: 'Oh My Acai',
  score: '5.0',
  count: '471 reviews on',
};

export const REVIEWS = [
  {
    name: 'Jaspreet Singh',
    when: '3 months ago',
    body: 'Lorem ipsum dolor sit amet consectetur. Blandit pellentesque vitae gravida ultrices. In eleifend maecenas dictum felis. Ut porta lectus semper nunc est.',
  },
  {
    name: 'Amina Malik',
    when: '2 months ago',
    body: 'Proin fermentum, sapien vel interdum cursus, risus nibh varius libero, id pretium sem nulla ut justo. Sed at libero eget elit sollicitudin suscipit.',
  },
  {
    name: 'David Chen',
    when: '1 month ago',
    body: 'Cras scelerisque, nunc ac porta convallis, arcu purus malesuada risus, vel facilisis velit dui quis nunc. Integer ultrices efficitur arcu.',
  },
  {
    name: 'Fatima Alvi',
    when: '2 weeks ago',
    body: 'Duis hendrerit purus vel diam elementum, vitae aliquam ex sollicitudin. Vivamus ac libero vitae libero varius facilisis.',
  },
  {
    name: 'Mark Johnson',
    when: '5 days ago',
    body: 'Mauris et nulla sit amet purus auctor posuere. Curabitur a libero quis magna suscipit viverra. Pellentesque habitant morbi tristique.',
  },
  {
    name: 'Sara Ahmed',
    when: '4 days ago',
    body: 'Phasellus auctor risus et massa pharetra, ac posuere orci fermentum. Donec vel diam nec arcu aliquam vestibulum eu vel massa.',
  },
  {
    name: 'Lucas Pereira',
    when: '3 days ago',
    body: 'Sed feugiat justo vel risus dictum, at fermentum quam luctus. Suspendisse potenti. Praesent at nunc sit amet lectus volutpat.',
  },
  {
    name: 'Emma Rodriguez',
    when: '2 days ago',
    body: 'Integer lacinia quam sit amet augue pharetra, eu fermentum purus scelerisque. Cras vel magna a felis ultricies condimentum.',
  },
  {
    name: 'Omar El-Sayed',
    when: '1 day ago',
    body: 'Donec feugiat metus sit amet justo cursus gravida. Curabitur nec libero eu leo placerat consequat. Sed vitae pretium lectus.',
  },
  {
    name: 'Lina Wang',
    when: 'Just now',
    body: 'Vivamus nec magna vel urna facilisis fringilla ut vel felis. Nulla facilisi. Sed vitae massa vel leo elementum cursus a vel nisl.',
  },
];

/** Footer (Figma: Footer - Desktop) */
export const FOOTER_PAGES = [
  'About',
  'Blog',
  'Menu',
  'Location',
  'Reservation',
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
  eyebrow: 'Franchise Programme 2026',
  /** the middle span is set in gold in the artboard */
  titleBefore: 'Bring ',
  titleAccent: 'Oh My Açaí',
  titleAfter: ' To Your City',
  body: 'A turnkey açaí bar with the recipes, berry supply chain and launch playbook already built — tell us where you want to open.',
  stats: [
    { value: '24 +', label: 'Stores trading' },
    { value: '12', label: 'Countries' },
    { value: '6 wks', label: 'To opening day' },
  ],
};

export const FRANCHISE_FORM = {
  title: 'Request The Franchise Pack',
  body: 'Costs, territory map and the six-week opening plan — in your inbox within one working day.',
  consent: 'I’d like Oh My Açaí to contact me about opening a store.',
  submit: 'Send My Franchise Pack',
  budgets: [
    'Under $150k',
    '$150k – $250k',
    '$250k – $400k',
    '$400k +',
  ],
};

export const FRANCHISE_BANNER = {
  title: 'Açaí Franchise',
  body: 'A ready-made açaí bar in a box — store design, equipment, recipes and supplier network, delivered as one package so you can open fast and stay consistent.',
  cta: 'Learn More',
};

export const FRANCHISE_INTRO = {
  titleBefore: 'Start Serving Bowls In Just ',
  titleAccent: '6 Weeks',
  body: 'From the day you sign, our team runs the build with you — site selection, fit-out, barista training and the launch campaign. Six weeks later you are blending your first bowls, with recipes, suppliers and packaging already locked in.',
};

export const FRANCHISE_STEPS = [
  {
    n: '01',
    label: 'Step 01',
    title: 'Sign Up',
    body: 'We map the opportunity in your city together. You get the territory study, the investment breakdown and a look at the numbers behind a working Oh My Açaí bar before anything is signed.',
    image: '/img/fr/step-1.jpg',
    alt: 'An açaí glass shot in the studio',
    bg: 'bg-cream',
    /** Figma alternates which half the photo sits on */
    imageFirst: true,
  },
  {
    n: '02',
    label: 'Step 02',
    title: 'Set Up',
    body: 'Fit-out, equipment, POS and supply lines are handled by our team. Your crew trains on the full bowl menu until every build is identical to the one we serve in Los Angeles.',
    image: '/img/fr/step-2.jpg',
    alt: 'Two açaí glasses on the counter',
    bg: 'bg-[#fdf3e3]',
    imageFirst: false,
  },
  {
    n: '03',
    label: 'Step 03',
    title: 'Serve',
    body: 'Opening week is run with you — launch campaign, delivery platforms and local partnerships switched on together, so the queue is there from the first bowl you blend.',
    image: '/img/fr/step-3.jpg',
    alt: 'A flat lay of finished açaí bowls',
    bg: 'bg-[#fdeef4]',
    imageFirst: true,
  },
];

export const FRANCHISE_BOWLS = [
  { name: 'Classic Açaí Bowl', image: '/img/bowl-1.png', bg: 'bg-plum' },
  { name: 'Tropical Mango Bowl', image: '/img/bowl-2.png', bg: 'bg-gold' },
  { name: 'Berry Bliss Bowl', image: '/img/bowl-3.png', bg: 'bg-mauve' },
  { name: 'Cacao Crunch Bowl', image: '/img/bowl-4.png', bg: 'bg-plum' },
];

export const FRANCHISE_BOWLS_HEAD = {
  titleBefore: 'Meet Our ',
  titleAccent: 'Bowls',
  body: 'Every franchise opens with the same signature menu — six bowls built on the recipes our chefs refined in store, with seasonal specials dropped in four times a year so your counter never goes stale.',
};

export const FRANCHISE_WHY = {
  titleBefore: 'Why ',
  titleAccent: 'Franchise',
  titleAfter: ' With Oh My Açaí',
  body: 'We take the guesswork out of running an açaí bar — proven recipes, a locked-in berry supply chain and a marketing playbook that has already filled counters in twelve countries. You bring the location and the energy.',
  stats: [
    { value: '24 +', label: 'Stores trading across 12 countries' },
    { value: '12M', label: 'Açaí bowls served in the last year' },
    { value: '6 wks', label: 'From signed contract to opening day' },
  ],
};

export const FRANCHISE_PARTNER = {
  titleBefore: 'Partner ',
  titleAccent: 'Stories',
  body: 'Our partners came from hospitality, retail and none of the above. Hear how they found a site, opened in six weeks and built a queue that comes back — in their own words.',
  poster: '/img/store.jpg',
};

/** The Franchise artboard uses the same five questions, punctuated. */
export const FRANCHISE_FAQS = FAQS.map((f) => ({ ...f, q: `${f.q}?` }));
