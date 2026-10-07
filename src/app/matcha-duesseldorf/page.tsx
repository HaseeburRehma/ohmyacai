import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import { MatchaGrid } from '@/components/sections/MenuBoard';
import TextSplit from '@/components/sections/TextSplit';
import CtaSection from '@/components/sections/CtaSection';
import RelatedLinks from '@/components/sections/RelatedLinks';
import { PAGE_LINKS } from '@/data/site';
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
        intro="Matcha trinken in der Düsseldorfer Altstadt: Ohmy Matcha Mango, Erdbeer Matcha (Strawberry) oder unser Ohmy Matcha Spezial, frisch zubereitet in der Flinger Straße 18. Perfekt zur Bowl oder als Matcha Drink zum Mitnehmen."
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
      <TextSplit
        title="Dein Matcha Café in der Altstadt"
        accent="Matcha Café"
        paragraphs={[
          'Oh My Açaí ist Açaí- und Matcha-Café in einem. Im Store in der Flinger Straße 18 bereiten wir jeden Iced Matcha frisch zu, geschichtet über Fruchtpüree und Eis. Du kannst ihn vor Ort trinken oder als Matcha to go mitnehmen.',
          'Lieber liefern lassen? Matcha bestellen in Düsseldorf geht über unsere Liefer-Partner, alle Wege findest du auf der Bestellseite.',
        ]}
      >
        <PillButton href="/online-bestellen">Matcha bestellen</PillButton>
        <PillButton href="/magazin/was-ist-matcha" variant="plum">Was ist Matcha?</PillButton>
      </TextSplit>
      <p lang="ja" className="mx-auto w-full max-w-[860px] px-6 pb-10 text-center text-[15px] text-ink/60 sm:px-10">
        デュッセルドルフ旧市街の抹茶: Oh My Açaí, Flinger Straße 18
      </p>
      <RelatedLinks links={[PAGE_LINKS.speisekarte, PAGE_LINKS.bestellen, PAGE_LINKS.magazin, PAGE_LINKS.duesseldorf]} />
      <CtaSection />
    </PageShell>
  );
}
