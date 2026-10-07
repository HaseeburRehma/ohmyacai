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
    return [
      { source: '/menu', destination: '/speisekarte', permanent: true },
      { source: '/order-online', destination: '/online-bestellen', permanent: true },
      { source: '/about-us', destination: '/ueber-uns', permanent: true },
      { source: '/contact', destination: '/kontakt', permanent: true },
      { source: '/privacy-policy', destination: '/datenschutz', permanent: true },
      { source: '/ingredients-allergens', destination: '/zutaten-allergene', permanent: true },
      { source: '/reviews', destination: '/bewertungen', permanent: true },
      { source: '/magazine', destination: '/magazin', permanent: true },
      { source: '/magazine/:slug', destination: '/magazin/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
