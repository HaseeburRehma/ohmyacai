import type { Metadata, Viewport } from 'next';
import { Lato, Bayon, Manrope, Boldonse, Archivo } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import { DELIVERY_PLATFORMS } from '@/data/site';

/* Body copy — Figma: Lato Regular / Bold, 16px, -0.5px tracking */
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

/* Menu + price type — Figma: Bayon Regular */
const bayon = Bayon({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bayon',
  display: 'swap',
});

/* Nav links — Figma: Manrope Bold */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-manrope',
  display: 'swap',
});

/* Footer wordmark — Figma: Boldonse Regular, 212px */
const boldonse = Boldonse({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-boldonse',
  display: 'swap',
});

/**
 * Display face.
 * Figma uses "Phonk Regular DEMO" (Slava Antipov) — a licensed demo font we
 * can't redistribute. Archivo at wdth 118 / wght 900 is the closest free
 * match: same wide geometric grotesque skeleton and squared counters.
 * `--font-phonk` resolves to the real Phonk @font-face first (see
 * globals.css); Archivo only takes over when that file is absent.
 */
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const SITE_URL = 'https://www.ohmyacai.de';
const SITE_TITLE = 'Açaí Düsseldorf | Açaí Bowls & Iced Matcha in der Altstadt';
const SITE_DESCRIPTION =
  'Frische Açaí Bowls und Iced Matcha in der Düsseldorfer Altstadt. Vor Ort genießen, mitnehmen oder liefern lassen. Flinger Straße 18, jetzt auch in Köln.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Oh My Açaí',
    locale: 'de_DE',
    type: 'website',
    images: [{ url: '/img/store.jpg', width: 1440, height: 1920, alt: 'Oh My Açaí Store in Düsseldorf' }],
  },
};

/* schema.org structured data — the brand plus one CafeOrCoffeeShop node per
   store, so Google can show address, opening hours and an order action for
   both locations. Kept in sync with LOCATIONS / hours on the page. */
const OPENING_DUS = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '11:00', closes: '22:00' },
  { days: ['Friday', 'Saturday'], opens: '11:00', closes: '23:59' },
  { days: ['Sunday'], opens: '12:00', closes: '23:00' },
];
const OPENING_CGN = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '20:30' },
  { days: ['Saturday'], opens: '10:00', closes: '21:00' },
  { days: ['Sunday'], opens: '13:30', closes: '18:30' },
];
const ORDER_TARGET = DELIVERY_PLATFORMS.map((p) => p.url);

function store(id: string, name: string, street: string, zip: string, city: string, geo: [number, number], hours: typeof OPENING_DUS) {
  return {
    '@type': 'CafeOrCoffeeShop',
    '@id': `${SITE_URL}/#${id}`,
    name,
    url: SITE_URL,
    image: `${SITE_URL}/img/store.jpg`,
    logo: `${SITE_URL}/img/logo-badge.png`,
    servesCuisine: ['Açaí Bowls', 'Smoothie Bowls', 'Vegan'],
    priceRange: '€€',
    acceptsReservations: false,
    hasMenu: `${SITE_URL}/#menu`,
    parentOrganization: { '@id': `${SITE_URL}/#org` },
    address: { '@type': 'PostalAddress', streetAddress: street, postalCode: zip, addressLocality: city, addressCountry: 'DE' },
    geo: { '@type': 'GeoCoordinates', latitude: geo[0], longitude: geo[1] },
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Oh My Açaí',
      legalName: 'Ohmyacai UG (haftungsbeschränkt)',
      url: SITE_URL,
      logo: `${SITE_URL}/img/logo-badge.png`,
      email: 'info@ohmyacai.de',
      telephone: '+4915732016134',
      sameAs: ['https://www.instagram.com/ohmyacai_dues/', 'https://www.tiktok.com/@ohmyacai.de'],
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Oh My Açaí', inLanguage: 'de-DE', publisher: { '@id': `${SITE_URL}/#org` } },
    {
      ...store('duesseldorf', 'Oh My Açaí Düsseldorf', 'Flinger Str. 18', '40213', 'Düsseldorf', [51.2264, 6.7733], OPENING_DUS),
      telephone: '+4915732016134',
      /* The Wolt / Lieferando / Uber Eats listings are all for the Flinger Straße store. */
      potentialAction: { '@type': 'OrderAction', target: ORDER_TARGET },
    },
    store('koeln', 'Oh My Açaí Köln', 'Hohe Str. 105-107', '50667', 'Köln', [50.9376, 6.9571], OPENING_CGN),
  ],
};

export const viewport: Viewport = {
  themeColor: '#4d294e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* The font variables must live on :root (i.e. <html>) — the `--font-*`
       aliases in globals.css are declared there and would resolve to an
       invalid value if the fonts were only defined further down the tree. */
    <html
      lang="de"
      className={`${lato.variable} ${bayon.variable} ${manrope.variable} ${boldonse.variable} ${archivo.variable}`}
      style={
        {
          '--font-phonk': `Phonk, ${archivo.style.fontFamily}`,
        } as React.CSSProperties
      }
    >
      {/* Guard against Google Translate crashing React 18/19.
          When the Translate extension swaps text nodes on the fly, React
          tries to remove or insert nodes whose parent has moved and
          throws NotFoundError, which takes the whole tree down (the
          "This page couldn't load" screen the user sees). Patching
          removeChild + insertBefore to no-op when the parent-child
          relationship is broken lets React recover cleanly. Inline in
          head so it runs before hydration. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (typeof Node !== 'function' || !Node.prototype) return;
                var origRemove = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child){
                  if (child && child.parentNode !== this) { return child; }
                  return origRemove.apply(this, arguments);
                };
                var origInsert = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, refNode){
                  if (refNode && refNode.parentNode !== this) {
                    return origInsert.call(this, newNode, null);
                  }
                  return origInsert.apply(this, arguments);
                };
              })();
            `,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
