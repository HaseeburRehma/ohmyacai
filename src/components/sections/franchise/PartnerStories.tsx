'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import Tilt3D from '@/components/ui/Tilt3D';
import { FRANCHISE_PARTNER } from '@/data/site';

/**
 * Figma: "Partner Stories" (4128:162) — centred two-tone heading, supporting
 * copy, and a 1320 × 480 film card with a play control.
 *
 * The artboard has no video file attached, so this is the poster frame with a
 * working play affordance; drop a source into the <video> when there is one.
 */
export default function PartnerStories() {
  return (
    <section className="w-full bg-white px-6 py-20 sm:px-10 lg:px-[60px] lg:py-20">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
          <InView
            variants={{
              hidden: { opacity: 0, y: 34 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.2] tracking-[-0.5px] text-plum">
              {FRANCHISE_PARTNER.titleBefore}
              <span className="text-gold">
                {FRANCHISE_PARTNER.titleAccent}
              </span>
            </h2>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <p className="text-base leading-[1.35] tracking-[-0.5px] text-ink">
              {FRANCHISE_PARTNER.body}
            </p>
          </InView>
        </div>

        <InView
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.97 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.2 }}
          className="mt-10 lg:mt-[88px]"
        >
          <Tilt3D max={5} scale={1.01} perspective={1600}>
            <div className="group relative aspect-[1320/480] w-full overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(77,41,78,0.5)]">
              <Image
                src={FRANCHISE_PARTNER.poster}
                alt="Inside an Oh My Açaí store"
                fill
                sizes="(max-width: 1024px) 92vw, 1320px"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent"
              />

              <motion.button
                type="button"
                aria-label="Play partner stories film"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ transform: 'translateZ(50px)' }}
                className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.25)] outline-none backdrop-blur focus-visible:ring-4 focus-visible:ring-gold sm:size-20"
              >
                {/* a ring that keeps pulsing so the control reads as live */}
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-white"
                />
                <svg viewBox="0 0 24 24" className="size-7 translate-x-0.5 sm:size-8" aria-hidden>
                  <path d="M8 5.5v13l11-6.5-11-6.5z" fill="#4d294e" />
                </svg>
              </motion.button>
            </div>
          </Tilt3D>
        </InView>
      </div>
    </section>
  );
}
