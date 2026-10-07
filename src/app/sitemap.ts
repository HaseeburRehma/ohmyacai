import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.ohmyacai.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...[
      '/menu',
      '/acai-bowls-duesseldorf',
      '/matcha-duesseldorf',
      '/duesseldorf',
      '/koeln',
      '/order-online',
    ].map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 })),
    ...['/about-us', '/faq', '/contact'].map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/franchise`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
