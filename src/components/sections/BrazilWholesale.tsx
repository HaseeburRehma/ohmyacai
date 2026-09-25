'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import PillButton from '@/components/ui/PillButton';
import { BRAZIL_SECTION } from '@/data/site';

/**
 * Section: "Reines Açaí — direkt aus Brasilien".
 * B2B pitch to bar / café / hotel owners: the same puree Oh My Açaí serves
 * in Düsseldorf, sold wholesale across DACH. Content sits in the left
 * column, an açaí-palm photo (Euterpe oleracea, Amazon rainforest) and an
 * Amazon map card sit on the right.
 */
export default function BrazilWholesale() {
  const s = BRAZIL_SECTION;

  return (
    <section
      id="wholesale"
      className="w-full bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-[60px] lg:py-[120px]"
    >
      <div className="mx-auto grid w-full max-w-[1220px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* LEFT — copy, bullets, CTA. */}
        <div className="@container flex flex-col gap-6">
          <InView
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <p className="font-menu inline-flex items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[-0.3px] text-plum sm:text-sm">
              <span aria-hidden className="inline-block size-1.5 rounded-full bg-gold" />
              {s.eyebrow}
            </p>
          </InView>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.1] tracking-[-0.5px] text-plum lg:text-[clamp(2rem,3.5cqw,3.75rem)]"
          >
            <span className="sr-only">
              {s.titleBefore}
              {s.titleAccent}
            </span>
            <motion.span
              aria-hidden
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {s.titleBefore}
              <span className="text-gold">{s.titleAccent}</span>
            </motion.span>
          </motion.h2>

          <InView
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <p className="max-w-[560px] text-base leading-[1.55] tracking-[-0.3px] text-ink">
              {s.body}
            </p>
          </InView>

          <InView
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.25 }}
          >
            <ul className="flex flex-col gap-3">
              {s.bullets.map((b) => (
                <li key={b.title} className="flex gap-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_4px_14px_-8px_rgba(0,0,0,0.15)]">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-plum text-cream"
                  >
                    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden fill="none">
                      <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="font-display text-[15px] uppercase leading-[1.15] tracking-[-0.3px] text-plum sm:text-base">
                      {b.title}
                    </p>
                    <p className="text-sm leading-[1.4] tracking-[-0.2px] text-ink/75">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </InView>

          <InView
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
            className="w-fit"
          >
            <PillButton href={s.ctaHref}>{s.ctaLabel}</PillButton>
          </InView>
        </div>

        {/* RIGHT — photo + Amazon map, matching the store-section stack. */}
        <InView
          variants={{ hidden: { opacity: 0, x: 40, scale: 0.97 }, visible: { opacity: 1, x: 0, scale: 1 } }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-5"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] lg:h-[440px] lg:aspect-auto">
            <Image
              src={s.imageSrc}
              alt={s.imageAlt}
              fill
              sizes="(max-width:1024px) 92vw, 560px"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-plum/45 via-transparent to-transparent"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-plum backdrop-blur sm:bottom-5 sm:left-5 sm:text-sm">
              Amazonasbecken · Brasilien
            </span>
          </div>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-ink/10 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.25)] lg:h-[220px] lg:aspect-auto">
            <iframe
              title="Karte: Amazonasbecken, Brasilien"
              src={s.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </InView>
      </div>
    </section>
  );
}
