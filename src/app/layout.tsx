import type { Metadata, Viewport } from 'next';
import { Lato, Bayon, Manrope, Boldonse, Archivo } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';

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

export const metadata: Metadata = {
  title: 'Oh My Açaí — Frisch gemixte Momente beginnen hier',
  description:
    'Nahrhafte & köstliche Açaí-Bowls, die sich mühelos in deinen Alltag einfügen. Über 17.000 Fünf-Sterne-Bewertungen.',
  openGraph: {
    title: 'Oh My Açaí — Frisch gemixte Momente beginnen hier',
    description:
      'Nahrhafte & köstliche Açaí-Bowls, die sich mühelos in deinen Alltag einfügen.',
    type: 'website',
  },
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
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
