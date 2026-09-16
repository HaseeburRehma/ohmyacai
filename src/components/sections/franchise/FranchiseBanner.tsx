'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import { FRANCHISE_BANNER } from '@/data/site';

/**
 * Figma: "Banner — Açaí Franchise" (4128:155) — 1440 × 440, a darkened store
 * photo with the title, a line of copy and a gold pill centred over it.
 */
export default function FranchiseBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden lg:h-[440px]"
    >
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <Image
          src="/img/fr/banner.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-plum/[0.84]" />

      <div className="relative mx-auto flex h-full max-w-[760px] flex-col items-center justify-center gap-4 px-6 py-16 text-center lg:py-0">
        <InView
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.2] text-white">
            {FRANCHISE_BANNER.title}
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
          <p className="max-w-[560px] text-base leading-[1.35] tracking-[-0.5px] text-white/85">
            {FRANCHISE_BANNER.body}
          </p>
        </InView>

        <InView
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.3 }}
          className="mt-2"
        >
          <motion.a
            href="#steps"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display inline-block rounded-full bg-gold px-7 py-3 text-xl uppercase leading-[1.2] tracking-[-0.5px] text-white"
          >
            {FRANCHISE_BANNER.cta}
          </motion.a>
        </InView>
      </div>
    </section>
  );
}
