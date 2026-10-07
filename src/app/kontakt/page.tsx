import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import ContactSection from '@/components/sections/ContactSection';
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
        intro="Ruf an, schreib uns eine Mail oder nutz das Formular. Adressen und Öffnungszeiten beider Stores findest du hier ebenfalls."
      />
      <ContactSection />
    </PageShell>
  );
}
