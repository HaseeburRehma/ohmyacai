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

  /* Gentle ±10px drift only — the cups are bottom-anchored with an 8px gap,
     so this never pushes them out of the clipped 710px frame. */
  const rightY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const leftY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section
      ref={ref}
      data-cta
      className="relative w-full overflow-hidden bg-white py-24 lg:h-[710px] lg:py-0"
    >
      {/* Two branded cups frame the copy — cup-2 right, cup-3 left. They are
          NOT mirrored (that would flip the "OH MY! Açaí" label): each side is
          its own cup, tilted outward.

          Fully on-screen, never cropped by the viewport edge: each sits in a
          bottom-anchored column at the section edge and is fit with
          object-contain, so the whole cup shows at any width. On narrower
          screens the inner part simply falls behind the centre text blocks
          (which are opaque), so the cups read as framing the copy rather than
          being sliced. */}
      <motion.div
        style={{ y: rightY }}
        className="pointer-events-none absolute bottom-[8px] right-0 hidden h-[74%] w-[30%] lg:block xl:w-[26%]"
        aria-hidden
      >
        <Image
          src="/img/panel/cup-2.png"
          alt=""
          fill
          sizes="30vw"
          className="rotate-[6deg] object-contain object-right-bottom drop-shadow-[16px_22px_30px_rgba(0,0,0,0.22)]"
        />
      </motion.div>
      <motion.div
        style={{ y: leftY }}
        className="pointer-events-none absolute bottom-[8px] left-0 hidden h-[74%] w-[30%] lg:block xl:w-[26%]"
        aria-hidden
      >
        <Image
          src="/img/panel/cup-3.png"
          alt=""
          fill
          sizes="30vw"
          className="rotate-[-6deg] object-contain object-left-bottom drop-shadow-[-16px_22px_30px_rgba(0,0,0,0.22)]"
        />
      </motion.div>

      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-6 px-6">
        <h2 className="flex flex-col items-center">
          <span className="sr-only">Mach deinen Açaí-Moment besonders</span>

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
              Mach deinen Açaí
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
              Moment besonders
            </span>
          </InView>
        </h2>

        <InView
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <p className="mt-4 max-w-[432px] text-center text-base leading-[1.2] tracking-[-0.5px] text-ink">
            Jeder Tag verdient eine bessere Açaí-Bowl — erfrischend, üppig und
            mit Bedacht gemacht.
          </p>
        </InView>

        <InView
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <PillButton href="#menu">Jetzt bestellen</PillButton>
        </InView>
      </div>
    </section>
  );
}
