import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import StoreDetail from '@/components/sections/StoreDetail';
import CtaSection from '@/components/sections/CtaSection';
import PillButton from '@/components/ui/PillButton';
import { LOCATION_DUESSELDORF as STORE } from '@/data/site';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/duesseldorf';

export const metadata = pageMetadata({
  title: 'Açaí Café Düsseldorf Altstadt | Flinger Straße 18 | Oh My Acai',
  description:
    'Oh My Acai findest du in der Flinger Straße 18, 40213 Düsseldorf. Öffnungszeiten, Anfahrt ab Heinrich-Heine-Allee und der kurze Weg durch die Altstadt.',
  path: PATH,
});

export default function DuesseldorfPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Düsseldorf', path: PATH }])]}>
      <PageHero
        crumbs={[{ name: 'Düsseldorf', path: PATH }]}
        eyebrow="Unser Flagship-Store"
        title="Besuch uns in der Flinger Straße 18"
        accent="Flinger Straße 18"
        intro="Mitten in der Düsseldorfer Altstadt, ein paar Minuten von der Heinrich-Heine-Allee: Hier mixen wir jeden Tag frische Açaí Bowls und Iced Matcha, zum Bleiben oder to go."
        image={{ src: STORE.photo!.src, alt: STORE.photo!.alt, position: 'center 42%' }}
      >
        <PillButton href={STORE.mapUrl} newTab>Route anzeigen</PillButton>
      </PageHero>
      <StoreDetail store={STORE} />
      <CtaSection />
    </PageShell>
  );
}
