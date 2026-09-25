import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import ProductCarousel from '@/components/sections/ProductCarousel';
import SignatureBowls from '@/components/sections/SignatureBowls';
import VideoFeature from '@/components/sections/VideoFeature';
import ValueCards from '@/components/sections/ValueCards';
import CrossTapes from '@/components/sections/CrossTapes';
import StoreSection from '@/components/sections/StoreSection';
import BrazilWholesale from '@/components/sections/BrazilWholesale';
import InstagramReels from '@/components/sections/InstagramReels';
import Reviews from '@/components/sections/Reviews';
import Faq from '@/components/sections/Faq';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/sections/Footer';
import ScrollBar from '@/components/ui/ScrollBar';

/**
 * Section order matches the Figma "Home" frame top to bottom:
 * Nav → Hero → Marquee → Products → Signature Bowls → Video panel →
 * Value cards → Crossed tapes → Store → Instagram → Reviews → FAQ → CTA → Footer.
 */
export default function Home() {
  return (
    <>
      <ScrollBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ProductCarousel />
        <SignatureBowls />
        <VideoFeature />
        <ValueCards />
        <BrazilWholesale />
        <CrossTapes />
        <StoreSection />
        <InstagramReels />
        <Reviews />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
