'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import PillButton from '@/components/ui/PillButton';
import { ORDER_URL } from '@/data/site';

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
      {/* Figma places the two cups diagonally: right cup TOP-right (tilted
          right), left cup BOTTOM-left (tilted left). Both stay well inside
          the section — ~38% of the 710 px height — so the text blocks sit
          front and centre and the cups read as corner ornaments, not the
          composition. object-contain keeps every side of the cup visible
          at any viewport. */}
      <motion.div
        style={{ y: rightY }}
        className="pointer-events-none absolute right-[3%] top-[6%] hidden h-[38%] w-[22%] md:block lg:h-[40%] lg:w-[20%] xl:w-[18%]"
        aria-hidden
      >
        <motion.div
          initial={{ rotate: 22, opacity: 0, x: 50, y: -30 }}
          whileInView={{ rotate: 12, opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative size-full"
        >
          <Image
            src="/img/panel/cup-2.png"
            alt=""
            fill
            sizes="20vw"
            className="object-contain drop-shadow-[12px_18px_24px_rgba(0,0,0,0.22)]"
          />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ y: leftY }}
        className="pointer-events-none absolute bottom-[6%] left-[3%] hidden h-[38%] w-[22%] md:block lg:h-[40%] lg:w-[20%] xl:w-[18%]"
        aria-hidden
      >
        <motion.div
          initial={{ rotate: -22, opacity: 0, x: -50, y: 30 }}
          whileInView={{ rotate: -12, opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative size-full"
        >
          <Image
            src="/img/panel/cup-3.png"
            alt=""
            fill
            sizes="20vw"
            className="object-contain drop-shadow-[-12px_18px_24px_rgba(0,0,0,0.22)]"
          />
        </motion.div>
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
          <PillButton href={ORDER_URL} newTab>Jetzt bestellen</PillButton>
        </InView>
      </div>
    </section>
  );
}
