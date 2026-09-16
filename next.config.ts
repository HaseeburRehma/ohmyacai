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
};

export default nextConfig;
