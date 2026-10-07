import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/sections/PageShell';
import PageHero from '@/components/sections/PageHero';
import RelatedLinks from '@/components/sections/RelatedLinks';
import { PAGE_LINKS } from '@/data/site';
import { ARTICLES } from '@/data/magazin';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

const PATH = '/magazin';

export const metadata = pageMetadata({
  title: 'Açaí & Matcha Magazin | Was ist Açaí? | Oh My Acai Düsseldorf',
  description:
    'Wissen rund um Açaí und Matcha aus unserem Düsseldorfer Café: Herkunft, Aussprache und was wirklich in eine richtig gute Açaí Bowl gehört.',
  path: PATH,
  image: '/img/brazil-farm.jpg',
});

export default function MagazinPage() {
  return (
    <PageShell jsonLd={[breadcrumbLd([{ name: 'Magazin', path: PATH }])]}>
      <PageHero
        crumbs={[{ name: 'Magazin', path: PATH }]}
        eyebrow="Wissen aus unserem Café"
        title="Açaí & Matcha Magazin"
        accent="Magazin"
        intro="Was ist Açaí, woher kommt die Beere, wie spricht man sie aus, und was ist eigentlich Matcha? Kurz und verständlich erklärt aus unserem Café in Düsseldorf."
      />
      <section className="w-full bg-white px-6 pb-16 pt-4 sm:px-10 lg:px-[60px] lg:pb-24">
        <ul className="mx-auto grid w-full max-w-[1220px] gap-6 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link href={`${PATH}/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-[#f7f3f7] transition-colors hover:bg-plum/[0.09]">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image src={a.image} alt={a.imageAlt} fill sizes="(max-width:768px) 92vw, 600px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6 sm:p-7">
                  <h2 className="font-display text-[clamp(1.35rem,3vw,1.9rem)] uppercase leading-tight tracking-[-0.5px] text-plum">{a.h1}</h2>
                  <p className="text-[15px] leading-[1.55] text-ink/75">{a.description}</p>
                  <span className="font-menu mt-auto pt-2 text-base uppercase text-mauve">Weiterlesen →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <RelatedLinks links={[PAGE_LINKS.bowls, PAGE_LINKS.matcha, PAGE_LINKS.zutaten, PAGE_LINKS.faq]} />
    </PageShell>
  );
}
