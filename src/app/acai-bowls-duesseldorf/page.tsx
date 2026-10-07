import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import SignatureBowls from '@/components/sections/SignatureBowls';
import TextSplit from '@/components/sections/TextSplit';
import Faq from '@/components/sections/Faq';
import CtaSection from '@/components/sections/CtaSection';
import PillButton from '@/components/ui/PillButton';
import { FAQ_PAGE, ORDER_URL } from '@/data/site';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';

const PATH = '/acai-bowls-duesseldorf';
const FAQ = [0, 1, 2, 7].map((i) => FAQ_PAGE[i]);

export const metadata = pageMetadata({
  title: 'Açaí Bowl Düsseldorf Altstadt | 5 vegane Bowls, frisch gemacht',
  description:
    'Açaí Bowls in Düsseldorf: Erdnussbutter, Pistazie, Tropical, Cheesecake und Bueno. Alle vegan, mit Granola, frischem Obst und cremigem Chia Pudding.',
  path: PATH,
  image: '/img/bowls/bueno.jpg',
});

export default function AcaiBowlsPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Açaí Bowls', path: PATH }]), faqLd(FAQ)]}>
      <PageHero
        crumbs={[{ name: 'Speisekarte', path: '/speisekarte' }, { name: 'Açaí Bowls', path: PATH }]}
        eyebrow="Flinger Straße 18 · Altstadt"
        title="Açaí Bowls in Düsseldorf"
        accent="Açaí Bowls"
        intro="Erdnussbutter, Pistazie, Tropical, Cheesecake und Bueno: fünf Bowls aus echtem Açaí-Püree auf veganem Chia-Pudding, mit Granola, Banane, Beeren und Kokos. Ab 11,90 €."
        image={{ src: '/img/bowls/bueno.jpg', alt: 'Açai Bueno Bowl in der Düsseldorfer Altstadt' }}
      >
        <PillButton href={ORDER_URL}>Jetzt bestellen</PillButton>
        <PillButton href="/speisekarte" variant="plum">Zur Speisekarte</PillButton>
      </PageHero>
      <SignatureBowls />
      <TextSplit
        title="Was steckt in einer Açaí Bowl?"
        accent="Açaí Bowl"
        paragraphs={[
          'Die Basis ist reines Açaí-Püree aus Brasilien, eisgekühlt cremig gemixt. Darunter liegt ein samtiger, veganer Chia-Pudding, obendrauf kommen Granola, Banane, Erdbeeren, Heidelbeeren, Kokosraspeln und das Topping, das deiner Bowl ihren Namen gibt.',
        ]}
        bullets={[
          { title: 'Açaí-Püree', body: 'Die Beere der Açaí-Palme, direkt nach der Ernte verarbeitet und tiefgefroren.' },
          { title: 'Veganer Chia-Pudding', body: 'Die cremige Schicht unter jeder Bowl, rein pflanzlich.' },
          { title: 'Granola, Obst & Topping', body: 'Banane, Erdbeeren, Heidelbeeren und Kokos, dazu Erdnussbutter, Pistaziencreme, Bueno oder Cheesecake-Creme.' },
        ]}
        image={{ src: '/img/bowls/erdnussbutter.jpg', alt: 'Açai Erdnussbutter Bowl mit Granola und Banane' }}
      />
      <TextSplit
        tone="cream"
        imageLeft
        title="Direkt aus dem Amazonas"
        accent="Amazonas"
        paragraphs={[
          'Unser Açaí kommt von Partner-Kooperativen im brasilianischen Amazonasbecken. Die Beeren werden nach der Ernte entkernt, püriert und schockgefrostet, ohne Sirup und ohne Zuckerzusatz im Püree.',
          'Dasselbe Püree verkaufen wir auch an Cafés, Bars und Hotelküchen.',
        ]}
        image={{ src: '/img/brazil-farm.jpg', alt: 'Açaí-Palmen im Amazonasbecken, Brasilien' }}
      >
        <PillButton href="/#wholesale" variant="plum">Großhandel anfragen</PillButton>
      </TextSplit>
      <Faq items={FAQ} title="Fragen zu unseren Bowls" />
      <CtaSection />
    </PageShell>
  );
}
