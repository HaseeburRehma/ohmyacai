import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import ContactSection from '@/components/sections/ContactSection';
import RelatedLinks from '@/components/sections/RelatedLinks';
import TextSplit from '@/components/sections/TextSplit';
import PillButton from '@/components/ui/PillButton';
import { CONTACT, PAGE_LINKS } from '@/data/site';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/kontakt';

export const metadata = pageMetadata({
  title: 'Kontakt | Oh My Acai Düsseldorf, Flinger Straße 18, Altstadt',
  description:
    'Kontaktiere Oh My Acai in Düsseldorf: Telefon, Adresse, Öffnungszeiten und Anfahrt zu unserem Açaí- und Matcha-Café in der Flinger Straße 18 in der Altstadt.',
  path: PATH,
});

export default function ContactPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Kontakt', path: PATH }])]}>
      <PageHero
        crumbs={[{ name: 'Kontakt', path: PATH }]}
        eyebrow="Wir sind für dich da"
        title="Kontakt"
        intro="Oh My Acai Kontakt: Ruf uns an, schreib eine Mail oder nutz das Formular. Unsere Telefonnummer, die Adresse in der Flinger Straße 18 und die Öffnungszeiten beider Stores findest du hier."
      />
      <ContactSection />
      <TextSplit
        tone="cream"
        title="Öffnungszeiten & Weg zu Oh My Acai Düsseldorf"
        accent="Weg zu Oh My Acai"
        paragraphs={[
          `Oh My Acai Öffnungszeiten in Düsseldorf: Montag bis Donnerstag 11:00 bis 22:00 Uhr, Freitag und Samstag 11:00 bis 00:00 Uhr, Sonntag 12:00 bis 23:00 Uhr. Telefon: ${CONTACT.phone}.`,
          'Der Weg zu uns: Flinger Str. 18, 40213 Düsseldorf, mitten in der Altstadt und ein paar Gehminuten von der U-Bahn-Haltestelle Heinrich-Heine-Allee.',
        ]}
      >
        <PillButton href="/duesseldorf" variant="plum">Anfahrt & Karte</PillButton>
      </TextSplit>
      <RelatedLinks links={[PAGE_LINKS.duesseldorf, PAGE_LINKS.bestellen, PAGE_LINKS.faq, PAGE_LINKS.bewertungen]} />
    </PageShell>
  );
}
