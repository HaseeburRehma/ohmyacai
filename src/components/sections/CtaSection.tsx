'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import PillButton from '@/components/ui/PillButton';

/**
 * Figma: "CTA Section" — 1440 × 710. Two −1° label blocks (plum then gold),
 * supporting copy, "Order Now", and a bowl bleeding off each side.
 */
export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rightY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const leftY = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  return (
    <section
      ref={ref}
      data-cta
      className="relative w-full overflow-hidden bg-white py-24 lg:h-[710px] lg:py-0"
    >
      {/* Bowls bleeding off the edges */}
      {/* Figma: IMG_3316 at rotate(−8.35°) bleeding off the right edge, and a
          mirrored copy off the left.

          The box is sized by HEIGHT with the art's own aspect ratio, not by a
          width percentage: this section is a fixed 710px tall but full width,
          so `w-[28.84%]` was 415px at 1440 and 554px at 1920 against the same
          554px height — i.e. the cups stretched wider the wider the screen.

          The bleed is a fixed 40px rather than the artboard's −120/1440, which
          as a percentage kept slicing more off the cups the wider the screen
          got. Deliberate deviation: both cups now read whole at every width. */}
      <motion.div
        style={{ y: rightY }}
        className="pointer-events-none absolute -right-10 top-[-7.72%] hidden aspect-[415.23/553.64] h-[77.98%] lg:block"
        aria-hidden
      >
        <Image
          src="/img/bowl-hero-a.png"
          alt=""
          fill
          sizes="30vw"
          className="rotate-[-8.35deg] object-contain"
        />
      </motion.div>
      <motion.div
        style={{ y: leftY }}
        className="pointer-events-none absolute -left-10 top-[39.18%] hidden aspect-[415.23/553.64] h-[77.98%] lg:block"
        aria-hidden
      >
        <Image
          src="/img/bowl-hero-a.png"
          alt=""
          fill
          sizes="30vw"
          className="object-contain"
          style={{ transform: 'scaleX(-1) rotate(-8.35deg)' }}
        />
      </motion.div>

      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-6 px-6">
        <h2 className="flex flex-col items-center">
          <span className="sr-only">Make your açaí moment special</span>

          <InView
            variants={{
              hidden: { opacity: 0, y: 44, rotate: -6 },
              visible: { opacity: 1, y: 0, rotate: -1 },
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.25 }}
          >
            <span
              aria-hidden
              className="font-display block rounded-2xl bg-plum px-6 py-5 text-center text-[clamp(1.6rem,4.6vw,4rem)] uppercase leading-[1.2] tracking-[-0.06em] text-white lg:px-10 lg:py-[26px]"
            >
              Make Your Acai
            </span>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 44, rotate: 5 },
              visible: { opacity: 1, y: 0, rotate: -1 },
            }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewOptions={{ once: true, amount: 0.25 }}
            className="-mt-2"
          >
            <span
              aria-hidden
              className="font-display block rounded-2xl bg-gold px-6 py-5 text-center text-[clamp(1.6rem,4.6vw,4rem)] uppercase leading-[1.2] tracking-[-0.06em] text-white lg:px-10 lg:py-[26px]"
            >
              Moment special
            </span>
          </InView>
        </h2>

        <InView
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <p className="mt-4 max-w-[432px] text-center text-base leading-[1.2] tracking-[-0.5px] text-ink">
            Every day deserves a better açaí bowl — one that feels refreshing,
            indulgent, and made with intention.
          </p>
        </InView>

        <InView
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <PillButton href="#menu">Order Now</PillButton>
        </InView>
      </div>
    </section>
  );
}
