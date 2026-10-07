import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.ohmyacai.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...[
      '/speisekarte',
      '/acai-bowls-duesseldorf',
      '/matcha-duesseldorf',
      '/duesseldorf',
      '/koeln',
      '/online-bestellen',
    ].map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 })),
    ...['/zutaten-allergene', '/bewertungen', '/magazin', '/magazin/was-ist-acai', '/magazin/was-ist-matcha', '/ueber-uns', '/faq', '/kontakt'].map((p) => ({
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
