import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import SignatureBowls from '@/components/sections/SignatureBowls';
import TextSplit from '@/components/sections/TextSplit';
import Faq from '@/components/sections/Faq';
import CtaSection from '@/components/sections/CtaSection';
import PillButton from '@/components/ui/PillButton';
import RelatedLinks from '@/components/sections/RelatedLinks';
import { ORDER_URL, PAGE_LINKS, faqByQ } from '@/data/site';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';

const PATH = '/acai-bowls-duesseldorf';
const FAQ = faqByQ(
  'Was ist eine Açaí Bowl?',
  'Welche Toppings gibt es für Açaí Bowls?',
  'Ist eine Açaí Bowl vegan?',
  'Wie viel kostet eine Açaí Bowl?',
  'Welche Größen gibt es?',
  'Kann ich Açaí Bowls in Düsseldorf bestellen?',
);

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
        title="Unsere Açaí Bowl Toppings"
        accent="Toppings"
        paragraphs={[
          'Jede Bowl beginnt mit derselben Basis, das Signature-Topping macht den Unterschied. Unsere Pistazien Açaí Bowl kommt mit cremiger Pistaziencreme, die Erdnussbutter Bowl (Peanut Butter Açaí Bowl) mit Erdnussbutter, dazu Bueno, Cheesecake-Creme und die fruchtige Açai Tropical.',
          'Darunter: Açaí mit Granola, Chia Pudding, Erdbeeren, Heidelbeeren, Banane und Kokos. Die Basis ist vegan, kühl und cremig wie Sorbet, für viele unserer Gäste die frische Alternative zu Eis oder Dessert.',
        ]}
        image={{ src: '/img/bowls/pistazie.jpg', alt: 'Pistazien Açaí Bowl mit Pistaziencreme, Granola und Beeren' }}
      >
        <PillButton href="/zutaten-allergene" variant="plum">Zutaten & Allergene</PillButton>
      </TextSplit>
      <TextSplit
        title="Açaí Bowl kaufen in der Innenstadt"
        accent="Innenstadt"
        paragraphs={[
          'Unsere Açaí Bowls gibt es frisch gemixt in der Flinger Straße 18, mitten in der Düsseldorfer Altstadt und Innenstadt. Bestell an der Theke und nimm deine Bowl zum Mitnehmen mit, oder lass dir deine Açaí Smoothie Bowl über Wolt, Lieferando oder Uber Eats liefern.',
          'Wer eine Smoothie Bowl in Düsseldorf sucht, die wirklich aus Açaí gemacht ist, findet sie hier: echtes Püree, kein Pulver.',
        ]}
      >
        <PillButton href={ORDER_URL}>Online bestellen</PillButton>
        <PillButton href="/duesseldorf" variant="plum">Store & Öffnungszeiten</PillButton>
      </TextSplit>
      <p lang="ja" className="mx-auto w-full max-w-[860px] px-6 pb-10 text-center text-[15px] text-ink/60 sm:px-10">
        デュッセルドルフ旧市街のアサイーボウル: Oh My Açaí, Flinger Straße 18
      </p>
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
      <RelatedLinks links={[PAGE_LINKS.speisekarte, PAGE_LINKS.zutaten, PAGE_LINKS.bestellen, PAGE_LINKS.magazin]} />
      <CtaSection />
    </PageShell>
  );
}
