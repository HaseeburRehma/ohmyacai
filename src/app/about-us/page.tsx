import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import TextSplit from '@/components/sections/TextSplit';
import ValueCards from '@/components/sections/ValueCards';
import VideoFeature from '@/components/sections/VideoFeature';
import CtaSection from '@/components/sections/CtaSection';
import PillButton from '@/components/ui/PillButton';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/about-us';

export const metadata = pageMetadata({
  title: 'Über uns | Oh My Acai, dein Açaí Café in Düsseldorf Altstadt',
  description:
    'Wie Oh My Acai frisches Açaí in die Flinger Straße gebracht hat. Unser Team, unsere Zutaten und warum jede einzelne Bowl bei uns rein pflanzlich ist.',
  path: PATH,
});

export default function AboutPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Über uns', path: PATH }])]}>
      <PageHero
        crumbs={[{ name: 'Über uns', path: PATH }]}
        eyebrow="Oh My Açaí"
        title="Unsere Geschichte"
        accent="Geschichte"
        intro="Angefangen hat alles in der Flinger Straße in Düsseldorf, mit einer Idee: echtes Açaí, so wie man es aus Brasilien kennt, frisch gemixt mitten in der Altstadt."
        image={{ src: '/img/store.jpg', alt: 'Der Oh My Açaí Store in der Flinger Straße', position: 'center 42%' }}
      />
      <TextSplit
        title="Vom ersten Store zu zwei Städten"
        accent="zwei Städten"
        paragraphs={[
          'Unser Flagship-Store in der Flinger Straße 18 ist der Ort, an dem wir jede Bowl entwickelt und verfeinert haben. Inzwischen gibt es Oh My Açaí auch in Köln, in der Hohe Straße 105-107, mit denselben Rezepten und demselben Püree.',
          'Wir mixen unsere Bowls aus reinem Açaí-Püree auf einem veganen Chia-Pudding. Die Basis ist rein pflanzlich, bei Toppings wie Bueno oder Cheesecake sagen wir dir gern, was drin steckt.',
        ]}
      >
        <PillButton href="/duesseldorf">Düsseldorf</PillButton>
        <PillButton href="/koeln" variant="plum">Köln</PillButton>
      </TextSplit>
      <VideoFeature />
      <TextSplit
        tone="cream"
        imageLeft
        title="Açaí direkt aus Brasilien"
        accent="Brasilien"
        paragraphs={[
          'Unser Açaí beziehen wir von Partner-Kooperativen im Amazonasbecken. Dasselbe Püree, mit dem wir jede Bowl mixen, verkaufen wir auch an Cafés, Bars und Hotelküchen. Und wer Oh My Açaí in die eigene Stadt holen will, kann mit uns ein Franchise eröffnen.',
        ]}
        image={{ src: '/img/brazil-farm.jpg', alt: 'Açaí-Palmen im Amazonasbecken, Brasilien' }}
      >
        <PillButton href="/#wholesale" variant="plum">Großhandel</PillButton>
        <PillButton href="/franchise">Franchise</PillButton>
      </TextSplit>
      <ValueCards />
      <CtaSection />
    </PageShell>
  );
}
