'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Scallop from '@/components/ui/Scallop';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Shared hero for the content pages (Speisekarte, Standorte, FAQ …).
 * Plum panel with the scalloped bottom edge the FAQ and footer use, a
 * breadcrumb trail, the page's single H1 (from the strategy sheet) and an
 * optional photo on the right. `accent` is the part of the title set in gold.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  accent,
  intro,
  image,
  children,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  accent?: string;
  intro: string;
  image?: { src: string; alt: string; position?: string };
  children?: React.ReactNode;
}) {
  const [before, after] = accent ? title.split(accent) : [title, ''];

  return (
    <section className="relative w-full bg-white">
      <div className="relative overflow-hidden bg-plum px-6 pb-6 pt-28 sm:px-10 lg:px-[60px] lg:pb-10 lg:pt-44">
        {/* soft brand watermark, decorative only */}
        <Image
          src="/img/logo-badge.png"
          alt=""
          aria-hidden
          width={768}
          height={768}
          className="pointer-events-none absolute -right-24 -top-10 size-[340px] rotate-12 opacity-[0.07] lg:-right-16 lg:size-[520px]"
        />

        <div
          className={`relative mx-auto grid w-full grid-cols-1 max-w-[1220px] items-center gap-10 ${image ? 'lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14' : ''}`}
        >
          <div className="@container flex min-w-0 flex-col items-start gap-5">
            <motion.nav
              aria-label="Brotkrumen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] tracking-[-0.2px] text-cream/70">
                <li>
                  <Link href="/" className="inline-flex min-h-8 items-center transition-colors hover:text-gold">Startseite</Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-2">
                    <span aria-hidden>›</span>
                    {i === crumbs.length - 1 ? (
                      <span aria-current="page" className="text-cream">{c.name}</span>
                    ) : (
                      <Link href={c.path} className="inline-flex min-h-8 items-center transition-colors hover:text-gold">{c.name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>

            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
                className="font-menu inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.06em] text-gold sm:text-sm"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                {eyebrow}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="font-display max-w-[760px] text-balance text-[clamp(1.75rem,6.4vw,4rem)] uppercase lg:text-[min(4rem,8.6cqw)] leading-[1.08] tracking-[-0.5px] text-white"
            >
              {before}
              {accent && <span className="text-gold">{accent}</span>}
              {after}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="max-w-[560px] text-base leading-[1.45] tracking-[-0.3px] text-cream/85 sm:text-[17px]"
            >
              {intro}
            </motion.p>

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="mt-1 flex flex-wrap items-center gap-3"
              >
                {children}
              </motion.div>
            )}
          </div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/10 lg:aspect-[5/4]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width:1024px) 92vw, 520px"
                className="object-cover"
                style={{ objectPosition: image.position ?? 'center' }}
              />
            </motion.div>
          )}
        </div>
      </div>
      <div className="-mt-px text-plum">
        <Scallop flip />
      </div>
    </section>
  );
}
