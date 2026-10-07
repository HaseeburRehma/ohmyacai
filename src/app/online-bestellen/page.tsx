import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import OrderOptions from '@/components/sections/OrderOptions';
import SignatureBowls from '@/components/sections/SignatureBowls';
import Faq from '@/components/sections/Faq';
import RelatedLinks from '@/components/sections/RelatedLinks';
import { PAGE_LINKS, faqByQ } from '@/data/site';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';

const PATH = '/online-bestellen';
const FAQ = faqByQ(
  'Liefert Oh My Acai in Düsseldorf?',
  'Kann ich meine Bestellung abholen?',
  'Kann ich Açaí Bowls in Düsseldorf bestellen?',
  'Wie viel kostet eine Açaí Bowl?',
  'Wie sind die Öffnungszeiten?',
);

export const metadata = pageMetadata({
  title: 'Açaí Bowl bestellen Düsseldorf | Lieferung, Abholung & to go',
  description:
    'Açaí Bowls und Matcha in ganz Düsseldorf bestellen, über Lieferando, Wolt und Uber Eats, oder direkt in der Flinger Straße 18 in der Altstadt abholen.',
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
        intro="Dein Açaí Lieferservice in Düsseldorf: Lass Açaí in Düsseldorf liefern, über Wolt, Lieferando oder Uber Eats (Delivery), bestell vor und hol sie ab, oder nimm sie als Takeaway direkt im Store mit."
      />
      <OrderOptions />
      <SignatureBowls />
      <Faq items={FAQ} title="Fragen zur Bestellung" />
      <RelatedLinks links={[PAGE_LINKS.speisekarte, PAGE_LINKS.bowls, PAGE_LINKS.matcha, PAGE_LINKS.duesseldorf]} />
    </PageShell>
  );
}
