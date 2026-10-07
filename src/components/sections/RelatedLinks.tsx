'use client';

import Link from 'next/link';
import { InView } from '@/components/motion-primitives/in-view';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "Weiter geht's" — the internal links the SEO plan asks for on each page
 * (Cannibalization Map → Recommended Internal Links), as descriptive cards
 * so the anchor text carries the target page's keyword.
 */
export default function RelatedLinks({
  title = 'Auch interessant',
  links,
}: {
  title?: string;
  links: { href: string; label: string; body: string }[];
}) {
  return (
    <section className="w-full bg-white px-6 pb-16 pt-6 sm:px-10 lg:px-[60px] lg:pb-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <h2 className="font-display text-[clamp(1.4rem,3.6vw,2.25rem)] uppercase leading-[1.1] tracking-[-0.5px] text-ink">
          {title}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <InView
              as="li"
              key={l.href}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              viewOptions={{ once: true, amount: 0.3 }}
            >
              <Link
                href={l.href}
                className="group flex h-full flex-col gap-2 rounded-3xl bg-[#f7f3f7] p-5 transition-colors hover:bg-plum/[0.09] sm:p-6"
              >
                <span className="font-display flex items-center justify-between gap-3 text-lg uppercase leading-tight tracking-[-0.3px] text-plum">
                  {l.label}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
                <span className="text-[14px] leading-[1.5] text-ink/70">{l.body}</span>
              </Link>
            </InView>
          ))}
        </ul>
      </div>
    </section>
  );
}
