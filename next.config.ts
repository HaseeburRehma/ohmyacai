import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /**
     * The stock breakpoint list produces 8 device widths + 8 image widths per
     * <Image>, and this page has ~30 of them. In `next dev` that many
     * concurrent on-demand optimizations intermittently stall, and a bowl or
     * two renders blank. Trimming the list to the widths this layout actually
     * asks for cuts the work by more than half and keeps the srcset honest.
     */
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [128, 256, 384],
  },

  /**
   * Content pages moved to the German slugs from the SEO strategy sheet
   * ("Cannibalization Map" tab). 308s pass link equity on to the new URLs
   * and keep any shared / indexed English links working.
   */
  async redirects() {
    /* Content pages are switched off for now: only Home, Franchise and the
       legal pages are live. Temporary (307) redirects to the matching home
       section, so search engines don't treat the removal as permanent and
       the pages can come back by deleting the HIDDEN block. */
    const HIDDEN: [string, string][] = [
      ['/speisekarte', '/#menu'],
      ['/acai-bowls-duesseldorf', '/#bowls'],
      ['/matcha-duesseldorf', '/#menu'],
      ['/zutaten-allergene', '/#faq'],
      ['/duesseldorf', '/#location'],
      ['/koeln', '/#location'],
      ['/online-bestellen', '/'],
      ['/bewertungen', '/'],
      ['/faq', '/#faq'],
      ['/magazin/:slug*', '/'],
      ['/ueber-uns', '/'],
      ['/kontakt', '/#location'],
      // the sheet's English slugs, straight to the same targets
      ['/menu', '/#menu'],
      ['/order-online', '/'],
      ['/about-us', '/'],
      ['/contact', '/#location'],
      ['/ingredients-allergens', '/#faq'],
      ['/reviews', '/'],
      ['/magazine/:slug*', '/'],
    ];
    return [
      ...HIDDEN.map(([source, destination]) => ({ source, destination, permanent: false })),
      { source: '/privacy-policy', destination: '/datenschutz', permanent: true },
    ];
  },
};

export default nextConfig;
