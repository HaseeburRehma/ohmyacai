import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import MenuBoard from '@/components/sections/MenuBoard';
import CtaSection from '@/components/sections/CtaSection';
import RelatedLinks from '@/components/sections/RelatedLinks';
import TextSplit from '@/components/sections/TextSplit';

import PillButton from '@/components/ui/PillButton';
import { MENU_BOWLS, ORDER_URL, PAGE_LINKS } from '@/data/site';
import { SITE_URL, breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/speisekarte';

export const metadata = pageMetadata({
  title: 'Speisekarte & Preise | Açaí Bowls, Matcha & Getränke Düsseldorf',
  description:
    'Die komplette Speisekarte von Oh My Acai: fünf Açaí Bowls, Iced Matcha und kalte Getränke mit aktuellen Preisen für unser Café in Düsseldorf.',
  path: PATH,
  image: '/img/bowls/pistazie.jpg',
});

/* schema.org Menu: bowls with their real price; matcha has no published
   price, so it is listed without an offer. */
const MENU_LD = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  '@id': `${SITE_URL}${PATH}#menu`,
  name: 'Oh My Açaí Speisekarte',
  inLanguage: 'de-DE',
  hasMenuSection: [
    {
      '@type': 'MenuSection',
      name: 'Açaí Bowls',
      hasMenuItem: MENU_BOWLS.map((b) => ({
        '@type': 'MenuItem',
        name: b.name,
        description: b.body,
        offers: { '@type': 'Offer', price: b.price.replace(/[^\d,]/g, '').replace(',', '.'), priceCurrency: 'EUR' },
      })),
    },
  ],
};

export default function MenuPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Speisekarte', path: PATH }]), MENU_LD]}>
      <PageHero
        crumbs={[{ name: 'Speisekarte', path: PATH }]}
        eyebrow="Düsseldorf & Köln"
        title="Unsere Speisekarte & Preise"
        accent="& Preise"
        intro="Die komplette Oh My Acai Speisekarte (Menü) für Düsseldorf: fünf Signature Bowls aus echtem Açaí-Püree auf veganem Chia-Pudding, dazu Iced Matcha und kalte Getränke. Bowls ab 11,90 €, frisch gemacht, to go oder geliefert."
        image={{ src: '/img/bowls/pistazie.jpg', alt: 'Açai Pistazie Bowl von Oh My Açaí' }}
      >
        <PillButton href={ORDER_URL}>Jetzt bestellen</PillButton>
      </PageHero>
      <MenuBoard />
      <TextSplit
        tone="cream"
        title="Açaí Bowl Größen & Preise in Düsseldorf"
        accent="Größen & Preise"
        paragraphs={[
          'Unsere Açaí Bowls gibt es in zwei Größen: 0,35 l (350 ml) ab 11,90 € und 0,5 l (500 ml) ab 13,50 €. Der Açaí Bowl Preis in Düsseldorf hängt also von der Größe ab. Die Açaí Bowl Preise können je nach Bowl und Bestellweg leicht abweichen, im Store genauso wie bei Wolt, Lieferando oder Uber Eats.',
          'Zum Matcha Menü in Düsseldorf gehören Ohmy Matcha Mango und Strawberry für je 6,50 € und der Ohmy Matcha Spezial für 5,40 €. Shakes haben wir aktuell nicht auf der Karte.',
        ]}
      >
        <PillButton href={ORDER_URL}>Açaí Bowl bestellen</PillButton>
      </TextSplit>
      <RelatedLinks links={[PAGE_LINKS.bowls, PAGE_LINKS.matcha, PAGE_LINKS.zutaten, PAGE_LINKS.bestellen]} />
      <CtaSection />
    </PageShell>
  );
}
