import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import StoreDetail from '@/components/sections/StoreDetail';
import CtaSection from '@/components/sections/CtaSection';
import PillButton from '@/components/ui/PillButton';
import { LOCATION_COLOGNE as STORE } from '@/data/site';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/koeln';

export const metadata = pageMetadata({
  title: 'Açaí Bowls Köln Innenstadt | Hohe Straße 105-107 | Oh My Acai',
  description:
    'Oh My Acai in Köln: Hohe Straße 105-107, 50667 Köln, wenige Minuten vom Dom. Öffnungszeiten, Anfahrt und frische Açaí Bowls aus echtem Püree.',
  path: PATH,
});

export default function KoelnPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Köln', path: PATH }])]}>
      <PageHero
        crumbs={[{ name: 'Köln', path: PATH }]}
        eyebrow="Zweiter Standort"
        title="Besuch uns in der Hohe Straße"
        accent="Hohe Straße"
        intro="Unser Store in der Kölner Innenstadt liegt in der Fußgängerzone Hohe Straße 105-107, wenige Minuten vom Dom. Dieselben Bowls wie in Düsseldorf, jeden Tag frisch gemixt."
      >
        <PillButton href={STORE.mapUrl} newTab>Route anzeigen</PillButton>
      </PageHero>
      <StoreDetail store={STORE} />
      <CtaSection />
    </PageShell>
  );
}
