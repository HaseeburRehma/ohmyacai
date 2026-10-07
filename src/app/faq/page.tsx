import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import Faq from '@/components/sections/Faq';
import CtaSection from '@/components/sections/CtaSection';
import PillButton from '@/components/ui/PillButton';
import { FAQ_PAGE } from '@/data/site';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';

const PATH = '/faq';

export const metadata = pageMetadata({
  title: 'FAQ | Açaí, vegane Optionen, Allergene & Bestellung Düsseldorf',
  description:
    'Was ist Açaí, sind die Bowls vegan, was kosten sie und liefert ihr in Düsseldorf? Hier findest du Antworten auf die häufigsten Fragen unserer Gäste.',
  path: PATH,
});

export default function FaqPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'FAQ', path: PATH }]), faqLd(FAQ_PAGE)]}>
      <PageHero
        crumbs={[{ name: 'FAQ', path: PATH }]}
        eyebrow="Gut zu wissen"
        title="Häufige Fragen"
        accent="Fragen"
        intro="Was ist Açaí, sind die Bowls vegan, was kosten sie und wie bestellst du? Hier sind die Antworten. Deine Frage ist nicht dabei? Schreib uns."
      >
        <PillButton href="/contact" variant="mauve">Kontakt aufnehmen</PillButton>
      </PageHero>
      <Faq items={FAQ_PAGE} title="Alles rund um Oh My Açaí" />
      <CtaSection />
    </PageShell>
  );
}
