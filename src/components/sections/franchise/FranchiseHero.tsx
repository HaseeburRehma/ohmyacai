'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

const PRIMARY =
  'font-display w-full whitespace-nowrap rounded-full bg-mauve px-4 py-3.5 text-lg uppercase leading-[1.15] tracking-[-0.5px] text-cream outline-none transition focus-visible:ring-4 focus-visible:ring-gold/60 disabled:cursor-not-allowed disabled:opacity-50 lg:text-2xl';

type Answers = {
  city: string;
  capital: string;
  timing: string;
  experience: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

const EMPTY: Answers = {
  city: '',
  capital: '',
  timing: '',
  experience: '',
  name: '',
  email: '',
  phone: '',
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEPS = FRANCHISE_FORM.steps;
const TOTAL = STEPS.length;

/**
 * Multi-step enquiry (Content Brief "Franchise Page — Multi-Step Form"):
 * the Light of Hope / Meta Instant Form mechanic — progress bar on top, one
 * question per step, choice steps auto-advance, contact details + consent
 * last. Xenia sits above the questions as the founder face.
 */
function EnquiryForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const stepRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const moved = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // The Danke card keeps the form's height so the page doesn't jump.
  const [formHeight, setFormHeight] = useState<number>();

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  // After the user moves between steps, put focus on the new step so
  // keyboard and screen-reader users land on the question. Not on first
  // load, so the mobile keyboard doesn't pop up uninvited.
  useEffect(() => {
    if (!moved.current) return;
    const el = stepRef.current;
    const target =
      el?.querySelector<HTMLElement>('input:not([type=checkbox]), [aria-pressed="true"], button') ??
      el;
    target?.focus({ preventScroll: true });
  }, [step]);

  const go = (to: number) => {
    clearTimeout(advanceTimer.current);
    moved.current = true;
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const choose = (key: keyof Answers, value: string) => {
    set(key, value);
    // A short beat so the tap registers visually before the slide.
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => go(step + 1), 260);
  };

  const contactOk =
    answers.name.trim().length > 1 &&
    EMAIL_RE.test(answers.email.trim()) &&
    answers.phone.trim().length > 4 &&
    answers.consent;

  async function submit() {
    if (status === 'sending' || !contactOk) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, company: honeypot.current?.value }),
      });
      if (res.ok) setFormHeight(formRef.current?.offsetHeight);
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') return <ThankYou minHeight={formHeight} />;

  const current = STEPS[step];
  const progress = ((step + 1) / TOTAL) * 100;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 0 && answers.city.trim()) go(1);
        else if (step === TOTAL - 1) submit();
      }}
      className="flex flex-col gap-6 rounded-[32px] bg-white p-6 shadow-[4px_10px_30px_rgba(0,0,0,0.35)] sm:p-10"
    >
      {/* Intro -------------------------------------------------------- */}
      <div className="flex flex-col gap-2.5">
        <h2 className="font-display text-[clamp(1.5rem,3.2vw,2rem)] uppercase leading-[1.2] tracking-[-1px] text-plum">
          {FRANCHISE_FORM.title}
        </h2>
        <p className="text-base leading-[1.3] tracking-[-0.5px] text-[#8a7e8b]">
          {FRANCHISE_FORM.body}
        </p>
      </div>

      <Founder />

      {/* Progress ----------------------------------------------------- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between text-sm font-bold uppercase leading-none tracking-[-0.3px]">
          <span className="text-mauve">
            Schritt {step + 1} / {TOTAL}
          </span>
          <span className="text-[#8a7e8b]">{current.label}</span>
        </div>
        <div
          role="progressbar"
          aria-label="Fortschritt"
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={step + 1}
          aria-valuetext={`Schritt ${step + 1} von ${TOTAL}: ${current.label}`}
          className="h-2.5 w-full overflow-hidden rounded-full bg-cream"
        >
          <motion.div
            className="h-full rounded-full bg-gold"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Step --------------------------------------------------------- */}
      <div className="relative min-h-[424px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            ref={stepRef}
            tabIndex={-1}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 outline-none"
          >
            <fieldset className="flex flex-col gap-4">
              <legend className="mb-4 text-xl font-bold leading-[1.25] tracking-[-0.5px] text-ink sm:text-2xl">
                {current.question}
              </legend>

              {current.key === 'city' && (
                <>
                  <input
                    name="city"
                    value={answers.city}
                    onChange={(e) => set('city', e.target.value)}
                    className={FIELD}
                    placeholder={current.placeholder}
                    aria-label={current.placeholder}
                    autoComplete="address-level2"
                    enterKeyHint="next"
                    maxLength={120}
                  />
                  <button
                    type="submit"
                    disabled={!answers.city.trim()}
                    className={PRIMARY}
                  >
                    {FRANCHISE_FORM.next}
                  </button>
                </>
              )}

              {'options' in current &&
                current.options.map((opt) => {
                  const key = current.key as 'capital' | 'timing' | 'experience';
                  const selected = answers[key] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => choose(key, opt)}
                      className={`flex min-h-[60px] w-full items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-bold leading-[1.2] tracking-[-0.5px] outline-none transition focus-visible:ring-4 focus-visible:ring-gold/60 sm:text-lg ${
                        selected
                          ? 'border-mauve bg-mauve text-cream'
                          : 'border-cream bg-cream text-plum hover:border-mauve/50'
                      }`}
                    >
                      {opt}
                      <span
                        aria-hidden
                        className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                          selected ? 'border-cream bg-cream' : 'border-mauve/40'
                        }`}
                      >
                        {selected && <span className="size-2.5 rounded-full bg-mauve" />}
                      </span>
                    </button>
                  );
                })}

              {current.key === 'contact' && (
                <>
                  <input
                    required
                    name="name"
                    value={answers.name}
                    onChange={(e) => set('name', e.target.value)}
                    className={FIELD}
                    placeholder={FRANCHISE_FORM.fields.name}
                    aria-label={FRANCHISE_FORM.fields.name}
                    autoComplete="name"
                    maxLength={120}
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    value={answers.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={FIELD}
                    placeholder={FRANCHISE_FORM.fields.email}
                    aria-label={FRANCHISE_FORM.fields.email}
                    autoComplete="email"
                    inputMode="email"
                    maxLength={200}
                  />
                  <input
                    required
                    name="phone"
                    type="tel"
                    value={answers.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    className={FIELD}
                    placeholder={FRANCHISE_FORM.fields.phone}
                    aria-label={FRANCHISE_FORM.fields.phone}
                    autoComplete="tel"
                    maxLength={40}
                  />
                  {/* Honeypot — hidden from people, filled by bots. */}
                  <input
                    ref={honeypot}
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute left-[-9999px] h-px w-px opacity-0"
                  />

                  <label className="flex min-h-11 cursor-pointer items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={answers.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      className="mt-px size-5 shrink-0 cursor-pointer appearance-none rounded-md border-[1.5px] border-mauve bg-white transition checked:bg-mauve checked:bg-[url('/svg/tick.svg')] checked:bg-[length:12px] checked:bg-center checked:bg-no-repeat focus-visible:ring-2 focus-visible:ring-mauve focus-visible:ring-offset-2"
                    />
                    <span className="text-sm leading-[1.35] tracking-[-0.3px] text-[#8a7e8b]">
                      {FRANCHISE_FORM.consent}{' '}
                      <Link
                        href={FRANCHISE_FORM.privacy.href}
                        target="_blank"
                        className="font-semibold text-mauve underline underline-offset-2"
                      >
                        {FRANCHISE_FORM.privacy.label}
                      </Link>
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={!contactOk || status === 'sending'}
                    whileTap={{ scale: contactOk ? 0.98 : 1 }}
                    className={PRIMARY}
                  >
                    {status === 'sending' ? 'Wird gesendet …' : FRANCHISE_FORM.submit}
                  </motion.button>

                  {status === 'error' && (
                    <p role="alert" className="text-sm leading-[1.4] tracking-[-0.5px] text-[#b23b3b]">
                      Das hat leider nicht geklappt. Bitte versuch es erneut oder schreib
                      uns direkt an{' '}
                      <a href="mailto:info@tylotech.de" className="underline">
                        info@tylotech.de
                      </a>
                      .
                    </p>
                  )}
                </>
              )}
            </fieldset>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Always rendered so the card height stays put on step 1. */}
      <button
        type="button"
        onClick={() => go(step - 1)}
        disabled={step === 0}
        aria-hidden={step === 0}
        className={`-mt-2 flex min-h-11 items-center gap-2 self-start text-sm font-bold uppercase tracking-[-0.3px] text-[#8a7e8b] outline-none transition hover:text-plum focus-visible:text-plum focus-visible:underline ${step === 0 ? 'invisible' : ''}`}
      >
        <span aria-hidden>←</span> {FRANCHISE_FORM.back}
      </button>
    </form>
  );
}

/** Xenia as the founder face — round photo, name line and a quote bubble. */
function Founder() {
  const f = FRANCHISE_FORM.founder;
  return (
    <figure className="flex items-center gap-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-plum ring-[3px] ring-gold ring-offset-2 ring-offset-white sm:size-[72px]">
        {f.photo ? (
          <Image
            src={f.photo}
            alt={`${f.name}, ${f.role} von Oh My Acai`}
            fill
            sizes="72px"
            className="object-cover object-top"
          />
        ) : (
          <span
            aria-hidden
            className="font-display grid size-full place-items-center text-3xl uppercase text-gold"
          >
            {f.name[0]}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <blockquote className="relative rounded-2xl rounded-tl-sm bg-cream px-4 py-2.5 text-sm italic leading-[1.35] tracking-[-0.3px] text-plum">
          „{f.quote}“
        </blockquote>
        <figcaption className="pl-1 text-sm font-bold leading-none tracking-[-0.3px] text-ink">
          {f.name} · {f.role}
        </figcaption>
      </div>
    </figure>
  );
}

function ThankYou({ minHeight }: { minHeight?: number }) {
  const t = FRANCHISE_FORM.thanks;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus({ preventScroll: true }), []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      style={{ minHeight }}
      className="flex min-h-[520px] flex-col items-center justify-center gap-5 rounded-[32px] bg-white p-8 text-center shadow-[4px_10px_30px_rgba(0,0,0,0.35)] outline-none sm:p-10"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="grid size-16 place-items-center rounded-full bg-mauve"
      >
        <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] uppercase leading-[1.1] tracking-[-1px] text-plum">
        {t.title}
      </h2>
      <p className="max-w-[400px] text-base leading-[1.4] tracking-[-0.5px] text-[#8a7e8b] sm:text-lg">
        {t.body}
      </p>
      <div className="mt-2 flex w-full max-w-[460px] flex-col gap-3 sm:flex-row">
        {t.actions.map((a, i) => (
          <Link
            key={a.href}
            href={a.href}
            className={`font-display flex-1 whitespace-nowrap rounded-full px-5 py-3.5 text-base uppercase leading-[1.15] tracking-[-0.5px] outline-none transition focus-visible:ring-4 focus-visible:ring-gold/60 ${
              i === 0
                ? 'bg-mauve text-cream hover:bg-plum'
                : 'border-2 border-mauve text-mauve hover:bg-mauve hover:text-cream'
            }`}
          >
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
