import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import { MatchaGrid } from '@/components/sections/MenuBoard';
import TextSplit from '@/components/sections/TextSplit';
import CtaSection from '@/components/sections/CtaSection';
import PillButton from '@/components/ui/PillButton';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/matcha-duesseldorf';

export const metadata = pageMetadata({
  title: 'Matcha Düsseldorf | Iced Matcha mit Mango & Erdbeere to go',
  description:
    'Iced Matcha in der Düsseldorfer Altstadt: Mango, Erdbeere und unser Ohmy Matcha Spezial. Frisch zubereitet in der Flinger Straße 18, auch zum Mitnehmen.',
  path: PATH,
});

export default function MatchaPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Speisekarte', path: '/speisekarte' }, { name: 'Iced Matcha', path: PATH }])]}>
      <PageHero
        crumbs={[{ name: 'Speisekarte', path: '/speisekarte' }, { name: 'Iced Matcha', path: PATH }]}
        eyebrow="Flinger Straße 18 · Altstadt"
        title="Iced Matcha in Düsseldorf"
        accent="Iced Matcha"
        intro="Mango, Erdbeere oder unser Ohmy Matcha Spezial: Matcha auf Eis, frisch zubereitet in der Flinger Straße 18. Perfekt zur Bowl oder einfach zum Mitnehmen durch die Altstadt."
      >
        <PillButton href="/duesseldorf">Store finden</PillButton>
        <PillButton href="/speisekarte" variant="plum">Zur Speisekarte</PillButton>
      </PageHero>
      <MatchaGrid />
      <TextSplit
        tone="cream"
        title="Matcha trifft Açaí"
        accent="Açaí"
        paragraphs={[
          'Erdig-frischer Matcha und fruchtiges Açaí passen erstaunlich gut zusammen. Viele unserer Gäste nehmen zur Bowl einen Iced Matcha mit, gerade an warmen Tagen in der Altstadt.',
          'Du findest uns in der Flinger Straße 18, nur ein paar Minuten von der U-Bahn-Haltestelle Heinrich-Heine-Allee.',
        ]}
        image={{ src: '/img/store.jpg', alt: 'Oh My Açaí Store in der Flinger Straße 18', position: 'center 42%' }}
      >
        <PillButton href="/duesseldorf" variant="plum">Zeiten & Anfahrt</PillButton>
      </TextSplit>
      <CtaSection />
    </PageShell>
  );
}
