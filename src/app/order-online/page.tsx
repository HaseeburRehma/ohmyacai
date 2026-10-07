import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import OrderOptions from '@/components/sections/OrderOptions';
import SignatureBowls from '@/components/sections/SignatureBowls';
import Faq from '@/components/sections/Faq';
import { FAQ_PAGE } from '@/data/site';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';

const PATH = '/order-online';
const FAQ = [3, 1, 5].map((i) => FAQ_PAGE[i]);

export const metadata = pageMetadata({
  title: 'Açaí Bowl bestellen Düsseldorf | Lieferung, Abholung & to go',
  description:
    'Açaí Bowls in Düsseldorf bestellen: Lieferung oder Abholung über Uber Eats, oder direkt to go in der Flinger Straße 18 in der Altstadt und in der Hohe Straße in Köln.',
  path: PATH,
});

export default function OrderOnlinePage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Online bestellen', path: PATH }]), faqLd(FAQ)]}>
      <PageHero
        crumbs={[{ name: 'Online bestellen', path: PATH }]}
        eyebrow="Lieferung · Abholung · to go"
        title="Online bestellen: Lieferung & Abholung"
        accent="Lieferung & Abholung"
        intro="Lass dir deine Bowl über Uber Eats liefern, bestell vor und hol sie ab, oder komm einfach in einem unserer Stores vorbei."
      />
      <OrderOptions />
      <SignatureBowls />
      <Faq items={FAQ} title="Fragen zur Bestellung" />
    </PageShell>
  );
}
