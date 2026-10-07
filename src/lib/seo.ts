import type { Metadata } from 'next';

export const SITE_URL = 'https://www.ohmyacai.de';

/**
 * Metadata for a content page: title + description straight from the
 * strategy sheet, a self-referencing canonical, and matching Open Graph so
 * shares show the page's own copy instead of the home page's.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = '/img/store.jpg',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: 'Oh My Açaí',
      locale: 'de_DE',
      type: 'website',
      images: [{ url: image }],
    },
  };
}

/** schema.org BreadcrumbList — Startseite › … › current page. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Startseite', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === '/' ? '/' : c.path}`,
    })),
  };
}

/** schema.org FAQPage from the same q/a pairs the accordion renders. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
