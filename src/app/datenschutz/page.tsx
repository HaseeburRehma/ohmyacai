import type { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import LegalPage from '@/components/sections/LegalPage';
import ScrollBar from '@/components/ui/ScrollBar';
import { DATENSCHUTZ } from '@/data/site';

export const metadata: Metadata = {
  title: 'Datenschutz — Oh My Açaí',
  description:
    'Datenschutzerklärung nach DSGVO — wie wir personenbezogene Daten auf ohmyacai.de erheben und verarbeiten.',
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
