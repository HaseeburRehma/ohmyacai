import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.ohmyacai.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Content pages are switched off for now (see next.config.ts).
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/franchise`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
