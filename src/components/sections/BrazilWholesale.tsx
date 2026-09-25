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
        {/* LEFT — copy, bullets, CTA. Every child is scroll-revealed with
            a staggered delay so the section reads as one composed entry. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
          className="@container flex flex-col gap-5 sm:gap-6"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(1.6rem,5.4vw,3rem)] uppercase leading-[1.05] tracking-[-0.5px] text-plum lg:text-[clamp(2rem,3.5cqw,3.75rem)]"
          >
            {s.titleBefore}
            <span className="text-gold">{s.titleAccent}</span>
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[560px] text-[15px] leading-[1.55] tracking-[-0.2px] text-ink sm:text-base"
          >
            {s.body}
          </motion.p>

          {/* Bullets — each pops in on its own stagger step and shifts up
              subtly on hover so the three points feel interactive. */}
          <motion.ul
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
            }}
            className="flex flex-col gap-3"
          >
            {s.bullets.map((b) => (
              <motion.li
                key={b.title}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.97 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, boxShadow: '0 12px 26px -14px rgba(77,41,78,0.35)' }}
                className="flex gap-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_4px_14px_-8px_rgba(0,0,0,0.15)] sm:gap-4 sm:p-5"
              >
                <motion.span
                  aria-hidden
                  variants={{
                    hidden: { scale: 0.4, rotate: -90, opacity: 0 },
                    visible: { scale: 1, rotate: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                  className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-plum text-cream"
                >
                  <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden fill="none">
                    <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
                <div className="flex flex-col gap-1">
                  <p className="font-display text-[15px] uppercase leading-[1.15] tracking-[-0.3px] text-plum sm:text-base">
                    {b.title}
                  </p>
                  <p className="text-[13.5px] leading-[1.5] tracking-[-0.2px] text-ink/75 sm:text-sm">{b.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-fit"
          >
            <PillButton href={s.ctaHref}>{s.ctaLabel}</PillButton>
          </motion.div>
        </motion.div>

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
