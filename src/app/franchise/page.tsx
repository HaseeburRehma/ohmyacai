import type { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Marquee from '@/components/sections/Marquee';
import Faq from '@/components/sections/Faq';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/sections/Footer';
import ScrollBar from '@/components/ui/ScrollBar';
import FranchiseHero from '@/components/sections/franchise/FranchiseHero';
import FranchiseBanner from '@/components/sections/franchise/FranchiseBanner';
import FranchiseSteps from '@/components/sections/franchise/FranchiseSteps';
import FranchiseBowls from '@/components/sections/franchise/FranchiseBowls';
import FranchiseWhy from '@/components/sections/franchise/FranchiseWhy';
import PartnerStories from '@/components/sections/franchise/PartnerStories';
import { FRANCHISE_FAQS } from '@/data/site';

export const metadata: Metadata = {
  title: 'Franchise — Oh My Açaí',
  description:
    'A turnkey açaí bar with the recipes, berry supply chain and launch playbook already built. 24+ stores, 12 countries, six weeks to opening day.',
};

/**
 * Section order matches the Figma "Franchise" frame (4128:112) top to bottom:
 * Nav → Hero + enquiry form → Marquee → Banner → Intro → Steps 01-03 →
 * Meet Our Bowls → Why Franchise → Partner Stories → FAQ → CTA → Footer.
 *
 * Nav, Marquee, FAQ, CTA and Footer are the same components the Home page
 * uses — the artboard reuses those instances too.
 */
export default function FranchisePage() {
  return (
    <>
      <ScrollBar />
      <Navbar />
      <main>
        <FranchiseHero />
        <Marquee />
        <FranchiseBanner />
        <FranchiseSteps />
        <FranchiseBowls />
        <FranchiseWhy />
        <PartnerStories />
        <Faq items={FRANCHISE_FAQS} />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
