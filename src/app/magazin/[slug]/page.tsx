import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import RelatedLinks from '@/components/sections/RelatedLinks';
import { PAGE_LINKS } from '@/data/site';
import { ARTICLES } from '@/data/magazin';
import { SITE_URL, breadcrumbLd, pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.description, path: `/magazin/${a.slug}`, image: a.image });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();
  const path = `/magazin/${a.slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.h1,
    description: a.description,
    image: `${SITE_URL}${a.image}`,
    datePublished: a.published,
    inLanguage: 'de-DE',
    author: { '@id': `${SITE_URL}/#org` },
    publisher: { '@id': `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };

  const related = a.slug === 'was-ist-matcha'
    ? [PAGE_LINKS.matcha, PAGE_LINKS.speisekarte, PAGE_LINKS.duesseldorf, PAGE_LINKS.magazin]
    : [PAGE_LINKS.bowls, PAGE_LINKS.zutaten, PAGE_LINKS.speisekarte, PAGE_LINKS.magazin];

  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Magazin', path: '/magazin' }, { name: a.h1, path }]), articleLd]}>
      <PageHero
        crumbs={[{ name: 'Magazin', path: '/magazin' }, { name: a.h1, path }]}
        eyebrow="Açaí & Matcha Magazin"
        title={a.h1}
        accent={a.accent}
        intro={a.intro}
      />
      <article className="w-full bg-white px-6 pb-16 pt-4 sm:px-10 lg:px-[60px] lg:pb-24">
        <div className="mx-auto w-full max-w-[760px]">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <Image src={a.image} alt={a.imageAlt} fill sizes="(max-width:800px) 92vw, 760px" className="object-cover" />
          </div>
          {a.sections.map((s) => (
            <section key={s.h2} className="mt-10 lg:mt-12">
              <h2 className="font-display text-[clamp(1.35rem,3.6vw,2rem)] uppercase leading-[1.12] tracking-[-0.5px] text-plum">{s.h2}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 30)} className="mt-4 text-[17px] leading-[1.7] tracking-[-0.2px] text-ink/85">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
      <RelatedLinks title="Weiterlesen" links={related} />
    </PageShell>
  );
}
