import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import MenuBoard from '@/components/sections/MenuBoard';
import CtaSection from '@/components/sections/CtaSection';
import PillButton from '@/components/ui/PillButton';
import { MENU_BOWLS, ORDER_URL } from '@/data/site';
import { SITE_URL, breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/menu';

export const metadata = pageMetadata({
  title: 'Speisekarte & Preise | Açaí Bowls, Matcha & Shakes Düsseldorf',
  description:
    'Die komplette Speisekarte von Oh My Acai: fünf Açaí Bowls, Iced Matcha, Shakes und kalte Getränke mit aktuellen Preisen für unser Café in Düsseldorf.',
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
        intro="Fünf Signature Bowls aus echtem Açaí-Püree auf veganem Chia-Pudding, dazu Iced Matcha und kalte Getränke. Bowls ab 11,90 €, frisch gemacht, to go oder geliefert."
        image={{ src: '/img/bowls/pistazie.jpg', alt: 'Açai Pistazie Bowl von Oh My Açaí' }}
      >
        <PillButton href={ORDER_URL}>Jetzt bestellen</PillButton>
      </PageHero>
      <MenuBoard />
      <CtaSection />
    </PageShell>
  );
}
