import type { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import LegalPage from '@/components/sections/LegalPage';
import ScrollBar from '@/components/ui/ScrollBar';
import { IMPRESSUM } from '@/data/site';

export const metadata: Metadata = {
  title: 'Impressum — Oh My Açaí',
  description:
    'Rechtliche Angaben der Ohmyacai UG (haftungsbeschränkt), Flinger Str. 18, 40213 Düsseldorf.',
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <ScrollBar />
      <Navbar />
      <main>
        <LegalPage {...IMPRESSUM} />
      </main>
      <Footer />
    </>
  );
}
