'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import { InView } from '@/components/motion-primitives/in-view';
import { FRANCHISE_WHY } from '@/data/site';

/**
 * Figma: "Why Franchise" (4128:161) — 1440 × 560 plum band with the berry
 * texture, a two-tone heading left, supporting copy right, and three
 * 426 × 190 stat tiles below.
 *
 * The numbers count up the first time the band is seen — the figure is the
 * point of the section, so it earns the motion.
 */
export default function FranchiseWhy() {
  return (
    <section className="relative w-full overflow-hidden bg-plum px-6 py-20 sm:px-10 lg:px-[60px] lg:py-[90px]">
      <div aria-hidden className="berry-pattern absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1320px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <InView
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.25 }}
          >
            <h2 className="font-display max-w-[620px] text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.2] text-white">
              {FRANCHISE_WHY.titleBefore}
              <span className="text-gold">{FRANCHISE_WHY.titleAccent}</span>
              {FRANCHISE_WHY.titleAfter}
            </h2>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <p className="max-w-[480px] text-base leading-[1.35] tracking-[-0.5px] text-white/80">
              {FRANCHISE_WHY.body}
            </p>
          </InView>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-[84px]">
          {FRANCHISE_WHY.stats.map((stat, i) => (
            <InView
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 44, scale: 0.97 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{
                duration: 0.85,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, amount: 0.3 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full flex-col items-center justify-center gap-3 rounded-3xl bg-white/[0.08] px-6 py-10 text-center lg:h-[190px] lg:py-0"
              >
                <CountUp
                  value={stat.value}
                  className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-none tracking-[-1px] text-gold"
                />
                <span className="max-w-[360px] text-base leading-[1.3] tracking-[-0.5px] text-white/80">
                  {stat.label}
                </span>
              </motion.div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Counts the leading number of a label like "24 +", "12M" or "6 wks" up from
 * zero, keeping whatever prefix/suffix the artboard uses.
 */
function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';

  /* A MotionValue rather than React state: framer renders it straight to the
     DOM node, so the count costs no re-renders. */
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView || !match) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const controls = animate(count, target, {
      duration: reduce ? 0 : 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, target, match, count]);

  return (
    <motion.span ref={ref} className={className}>
      {match ? text : value}
    </motion.span>
  );
}
