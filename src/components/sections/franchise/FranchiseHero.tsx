'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FRANCHISE_FORM, FRANCHISE_HERO } from '@/data/site';

/**
 * Figma: "Hero — Franchise" (4128:133) — 1440 × 780, bg #4d294e with the berry
 * texture at 3% (measured off the artboard render — see `.berry-vectors`). Copy left at x80/y215, the white enquiry card right at
 * x760/y94 (600 × 617, radius 32). Blueberry, strawberry and mango cutouts
 * bleed off the edges.
 *
 * Like the Home hero this is aspect-locked and full-bleed at `lg` so the
 * composition scales as one; below that it stacks.
 */
export default function FranchiseHero() {
  return (
    <section className="berry-vectors relative isolate w-full overflow-hidden bg-plum pt-[102px]">
      {/* Decorative fruit — Figma coordinates as % of the 1440 × 780 frame */}
      <Fruit
        src="/img/fruit-blueberry-lg.png"
        className="left-[-2.64%] top-[5.64%] h-[15.8%] w-[8.6%]"
        delay={0.15}
      />
      <Fruit
        src="/img/fruit-strawberry.png"
        className="bottom-[-3%] left-[-4.9%] h-[25%] w-[12.9%] rotate-8"
        delay={0.3}
      />
      <Fruit
        src="/img/fruit-mango.png"
        className="-right-[2.4%] bottom-[1.2%] h-[17.4%] w-[10.6%] -rotate-12"
        delay={0.45}
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 sm:px-10 lg:grid lg:min-h-[780px] lg:grid-cols-[600px_600px] lg:items-center lg:justify-between lg:gap-0 lg:px-[80px] lg:py-0">
        {/* Copy ------------------------------------------------------- */}
        <div className="flex flex-col items-start gap-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full bg-gold px-[18px] py-2 text-base font-bold uppercase leading-[1.2] tracking-[-0.5px] text-white"
          >
            {FRANCHISE_HERO.eyebrow}
          </motion.p>

          <h1 className="font-display max-w-[600px] text-[clamp(2.25rem,7vw,4rem)] uppercase leading-[1.2] text-white">
            <motion.span
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {FRANCHISE_HERO.titleBefore}
              <span className="text-gold">{FRANCHISE_HERO.titleAccent}</span>
              {FRANCHISE_HERO.titleAfter}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="max-w-[540px] text-base leading-[1.2] tracking-[-0.5px] text-white"
          >
            {FRANCHISE_HERO.body}
          </motion.p>

          {/* Proof stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="flex flex-wrap items-center gap-6 sm:gap-8"
          >
            {FRANCHISE_HERO.stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && (
                  <span aria-hidden className="h-11 w-px bg-white/30" />
                )}
                <div className="flex flex-col gap-0.5">
                  <span className="font-display text-[clamp(1.5rem,3vw,2rem)] uppercase leading-[1.1] tracking-[-1px] text-gold">
                    {s.value}
                  </span>
                  <span className="text-base leading-[1.2] tracking-[-0.5px] text-white/80">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enquiry card ------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[600px]"
        >
          <EnquiryForm />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Fruit({
  src,
  className,
  delay,
}: {
  src: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={`pointer-events-none absolute hidden lg:block ${className}`}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative size-full"
      >
        <Image src={src} alt="" fill sizes="15vw" className="object-contain" />
      </motion.div>
    </motion.div>
  );
}

const FIELD =
  'w-full rounded-2xl bg-cream px-5 py-[18px] text-base tracking-[-0.5px] text-ink outline-none transition placeholder:text-[#8a7e8b] focus-visible:ring-2 focus-visible:ring-mauve';

function EnquiryForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-6 rounded-[32px] bg-white p-6 shadow-[4px_10px_30px_rgba(0,0,0,0.35)] sm:p-10"
    >
      <div className="flex flex-col gap-2.5">
        <h2 className="font-display text-[clamp(1.5rem,3.2vw,2rem)] uppercase leading-[1.2] tracking-[-1px] text-plum">
          {FRANCHISE_FORM.title}
        </h2>
        <p className="text-base leading-[1.2] tracking-[-0.5px] text-[#8a7e8b]">
          {FRANCHISE_FORM.body}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <input required className={FIELD} placeholder="Vorname" aria-label="Vorname" autoComplete="given-name" />
          <input required className={FIELD} placeholder="Nachname" aria-label="Nachname" autoComplete="family-name" />
        </div>
        <input required type="email" className={FIELD} placeholder="E-Mail-Adresse" aria-label="E-Mail-Adresse" autoComplete="email" />
        <input required type="tel" className={FIELD} placeholder="Telefonnummer" aria-label="Telefonnummer" autoComplete="tel" />
        <div className="flex flex-col gap-4 sm:flex-row">
          <input required className={FIELD} placeholder="Wunschstadt" aria-label="Wunschstadt" autoComplete="address-level2" />
          <select
            required
            defaultValue=""
            aria-label="Investitionsbudget"
            className={`${FIELD} appearance-none bg-[url('/svg/caret.svg')] bg-[length:12px_8px] bg-[right_1.25rem_center] bg-no-repeat pr-12`}
          >
            <option value="" disabled>
              Investitionsbudget
            </option>
            {FRANCHISE_FORM.budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex min-h-11 cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          required
          className="size-5 shrink-0 appearance-none rounded-md border-[1.5px] border-mauve bg-white transition checked:bg-mauve checked:bg-[url('/svg/tick.svg')] checked:bg-[length:12px] checked:bg-center checked:bg-no-repeat"
        />
        <span className="text-sm leading-[1.2] tracking-[-0.5px] text-[#8a7e8b]">
          {FRANCHISE_FORM.consent}
        </span>
      </label>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="font-display w-full rounded-full bg-mauve px-6 py-3 text-2xl uppercase leading-[1.2] tracking-[-0.5px] text-cream outline-none focus-visible:ring-4 focus-visible:ring-gold/60"
      >
        {sent ? 'Thanks — check your inbox' : FRANCHISE_FORM.submit}
      </motion.button>

      <p aria-live="polite" className="sr-only">
        {sent ? 'Your franchise pack request has been recorded.' : ''}
      </p>
    </form>
  );
}
