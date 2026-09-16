'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import BurstBadge from '@/components/ui/BurstBadge';
import { FRANCHISE_INTRO, FRANCHISE_STEPS } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Figma: "Intro — 6 Weeks" (4128:156) plus the three 1440 × 470 step bands
 * (4128:157–159). Each band is a 50/50 split — photo on one side, a tinted
 * panel with a numbered burst badge, a two-tone heading, copy and a "Read
 * More" pill on the other. The photo side alternates down the page.
 */
export default function FranchiseSteps() {
  return (
    <>
      {/* Intro ------------------------------------------------------- */}
      <section className="w-full bg-white px-6 py-20 sm:px-10 lg:px-[60px] lg:py-[107px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <InView
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.25 }}
          >
            <h2 className="font-display max-w-[620px] text-[clamp(1.9rem,5vw,3rem)] uppercase leading-[1.2] text-plum">
              {FRANCHISE_INTRO.titleBefore}
              <span className="text-gold">{FRANCHISE_INTRO.titleAccent}</span>
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
            <p className="max-w-[520px] text-base leading-[1.35] tracking-[-0.5px] text-ink">
              {FRANCHISE_INTRO.body}
            </p>
          </InView>
        </div>
      </section>

      {/* Steps ------------------------------------------------------- */}
      <div id="steps">
        {FRANCHISE_STEPS.map((step, i) => (
          <Step key={step.n} step={step} index={i} />
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Step({
  step,
  index,
}: {
  step: (typeof FRANCHISE_STEPS)[number];
  index: number;
}) {
  const photo = (
    <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[470px]">
      <motion.div
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative size-full"
      >
        <Image
          src={step.image}
          alt={step.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );

  const copy = (
    <div
      className={cn(
        'relative flex h-full flex-col justify-start px-6 pb-14 pt-[104px] sm:px-10 lg:px-[80px] lg:pb-0 lg:pt-[196px]',
        step.bg
      )}
    >
      {/* Numbered burst badge — Figma: 98 × 95 at x80 / y74, rotate −160° */}
      <motion.div
        initial={{ rotate: -200, scale: 0.6, opacity: 0 }}
        whileInView={{ rotate: -160, scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.9,
          delay: 0.15,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="absolute left-6 top-6 size-[74px] sm:left-10 lg:left-[80px] lg:top-[74px] lg:size-[98px]"
      >
        <div className="relative size-full">
          <BurstBadge fill="#4d294e" />
          <span
            className="font-menu absolute inset-0 grid place-items-center text-[clamp(1.5rem,3vw,2.5rem)] leading-none tracking-[-1px] text-white"
            style={{ transform: 'rotate(160deg)' }}
          >
            {step.n}
          </span>
        </div>
      </motion.div>

      <InView
        variants={{
          hidden: { opacity: 0, y: 34 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        viewOptions={{ once: true, amount: 0.3 }}
        className="flex max-w-[480px] flex-col gap-5"
      >
        <h3 className="font-display text-[clamp(1.4rem,3.2vw,2rem)] uppercase leading-[1.2] tracking-[-1px] text-plum">
          <span className="text-gold">{step.label}</span>: {step.title}
        </h3>
        <p className="text-base leading-[1.35] tracking-[-0.5px] text-ink">
          {step.body}
        </p>
        <motion.a
          href="#enquire"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display w-fit rounded-full bg-mauve px-6 py-2.5 text-xl uppercase leading-[1.2] tracking-[-0.5px] text-white"
        >
          Read More
        </motion.a>
      </InView>
    </div>
  );

  /* The photo always leads on phones; the Figma alternation only makes sense
     once there are two columns, so it is done with `order` rather than by
     rendering the image twice. */
  return (
    <section className="w-full lg:h-[470px]">
      <div className="grid lg:h-full lg:grid-cols-2">
        <div className={step.imageFirst ? '' : 'lg:order-2'}>{photo}</div>
        <div className={step.imageFirst ? '' : 'lg:order-1'}>{copy}</div>
      </div>
      <span className="sr-only">{`Step ${index + 1} of 3`}</span>
    </section>
  );
}
