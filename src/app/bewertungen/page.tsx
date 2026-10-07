import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import ReviewPlatforms from '@/components/sections/ReviewPlatforms';
import RelatedLinks from '@/components/sections/RelatedLinks';
import { PAGE_LINKS } from '@/data/site';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/bewertungen';

/* The sheet's title used "4,8 Sterne"; ratings differ per platform and change
   daily, so the page links to the live ratings instead of quoting a number. */
export const metadata = pageMetadata({
  title: 'Oh My Acai Bewertungen | Erfahrungen unserer Gäste in Düsseldorf',
  description:
    'Das sagen unsere Gäste über Açaí Bowls und Matcha bei Oh My Acai in Düsseldorf: Bewertungen von Google, Lieferando, Wolt und Uber Eats hier auf einen Blick.',
  path: PATH,
});

export default function BewertungenPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Bewertungen', path: PATH }])]}>
      <PageHero
        crumbs={[{ name: 'Bewertungen', path: PATH }]}
        eyebrow="Oh My Acai Erfahrungen"
        title="Das sagen unsere Gäste"
        accent="Gäste"
        intro="Echte Oh My Acai Bewertungen findest du dort, wo unsere Gäste bestellen und uns finden: auf Google, Wolt, Lieferando und Uber Eats. Hier sind alle Profile an einem Ort."
      />
      <ReviewPlatforms />
      <RelatedLinks links={[PAGE_LINKS.duesseldorf, PAGE_LINKS.bestellen, PAGE_LINKS.bowls, PAGE_LINKS.kontakt]} />
    </PageShell>
  );
}
