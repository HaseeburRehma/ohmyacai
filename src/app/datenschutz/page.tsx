import type { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import LegalPage from '@/components/sections/LegalPage';
import ScrollBar from '@/components/ui/ScrollBar';
import { DATENSCHUTZ } from '@/data/site';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Oh My Acai Düsseldorf, Flinger Str. 18',
  description:
    'Wie Oh My Acai personenbezogene Daten erhebt, verwendet und schützt, DSGVO-konform. Inklusive Cookies, Kontaktformular, Karten und Online-Bestellung.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <ScrollBar />
      <Navbar />
      <main>
        <LegalPage {...DATENSCHUTZ} />
      </main>
      <Footer />
    </>
  );
}
