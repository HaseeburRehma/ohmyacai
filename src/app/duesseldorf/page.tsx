import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import StoreDetail from '@/components/sections/StoreDetail';
import CtaSection from '@/components/sections/CtaSection';
import RelatedLinks from '@/components/sections/RelatedLinks';
import TextSplit from '@/components/sections/TextSplit';
import { PAGE_LINKS } from '@/data/site';
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
      <TextSplit
        tone="cream"
        title="Açaí in der Nähe der Altstadt"
        accent="in der Nähe"
        paragraphs={[
          'Du suchst eine Açaí Bowl in der Nähe? Unser Açaí Shop liegt in der Flinger Straße 18, mitten in der Düsseldorfer Altstadt und Innenstadt. Von der Bolkerstraße, dem Burgplatz und der U-Bahn-Haltestelle Heinrich-Heine-Allee sind es nur wenige Gehminuten, auch die Königsallee ist gleich um die Ecke.',
          'Vom Düsseldorf Hauptbahnhof fährst du mit der U-Bahn bis Heinrich-Heine-Allee und gehst von dort ein paar Minuten durch die Altstadt. Bei uns gibt es Açaí Bowls, Smoothie Bowls aus echtem Açaí und Iced Matcha, zum Bleiben oder als Açaí to go.',
        ]}
        bullets={[
          { title: 'Bolkerstraße & Burgplatz', body: 'Ein paar Gehminuten durch die Altstadt.' },
          { title: 'Heinrich-Heine-Allee', body: 'Nächste U-Bahn-Haltestelle, wenige Minuten zu Fuß.' },
          { title: 'Königsallee', body: 'Vom Kö-Bogen aus kurz über die Heinrich-Heine-Allee.' },
        ]}
      />
      <RelatedLinks links={[PAGE_LINKS.kontakt, PAGE_LINKS.bewertungen, PAGE_LINKS.bestellen, PAGE_LINKS.bowls]} />
      <CtaSection />
    </PageShell>
  );
}
