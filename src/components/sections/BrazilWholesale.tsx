'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BRAZIL_SECTION } from '@/data/site';

/**
 * Section: "Reines Açaí direkt aus Brasilien" — B2B pitch to café / bar /
 * hotel owners. Left column carries the copy + three benefit bullets;
 * right column carries the contact form that emails info@tylotech.de.
 */
export default function BrazilWholesale() {
  const s = BRAZIL_SECTION;

  return (
    <section
      id="wholesale"
      className="w-full bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-[60px] lg:py-[120px]"
    >
      <div className="mx-auto grid w-full max-w-[1220px] items-start gap-10 lg:grid-cols-2 lg:gap-14">
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
                  <p className="text-[13.5px] leading-[1.5] tracking-[-0.2px] text-ink/75 sm:text-sm">
                    {b.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* RIGHT — contact form (First name, Last name, Email, Phone).
            Submits to /api/wholesale which emails info@tylotech.de. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <WholesaleForm />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function WholesaleForm() {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/wholesale', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('ok');
      setFirst(''); setLast(''); setEmail(''); setPhone('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-3xl border border-plum/20 bg-plum p-8 text-cream shadow-[0_20px_40px_-20px_rgba(77,41,78,0.45)] sm:p-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-gold text-plum">
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden fill="none">
              <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className="font-display text-2xl uppercase leading-[1.1] tracking-[-0.5px]">
            Danke, wir melden uns!
          </h3>
          <p className="max-w-[380px] text-sm leading-[1.55] text-cream/90">
            Unser Team meldet sich innerhalb eines Werktags mit Preisen, Lieferfenstern und dem Datenblatt zum Püree.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] sm:p-8"
    >
      <div className="mb-5 flex flex-col gap-2">
        <p className="font-menu inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[-0.3px] text-plum sm:text-sm">
          <span aria-hidden className="inline-block size-1.5 rounded-full bg-gold" />
          Großhandel anfragen
        </p>
        <h3 className="font-display text-[clamp(1.35rem,3.6vw,1.75rem)] uppercase leading-[1.1] tracking-[-0.5px] text-plum">
          {BRAZIL_SECTION.ctaLabel === 'Großhandel anfragen' ? 'Preise & Muster anfordern' : BRAZIL_SECTION.ctaLabel}
        </h3>
        <p className="text-sm leading-[1.5] tracking-[-0.2px] text-ink/70">
          Trag dich ein, unser Team meldet sich innerhalb eines Werktags mit Preisen, Datenblatt und Lieferfenstern.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Field label="Vorname" value={firstName} onChange={setFirst} autoComplete="given-name" required />
        <Field label="Nachname" value={lastName} onChange={setLast} autoComplete="family-name" required />
        <Field label="E-Mail-Adresse" type="email" value={email} onChange={setEmail} autoComplete="email" required className="sm:col-span-2" />
        <Field label="Telefonnummer" type="tel" value={phone} onChange={setPhone} autoComplete="tel" required className="sm:col-span-2" />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
        whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="font-display mt-6 w-full whitespace-nowrap rounded-full bg-mauve px-4 py-3 text-base uppercase leading-[1.15] tracking-[-0.5px] text-cream outline-none focus-visible:ring-4 focus-visible:ring-gold/60 disabled:opacity-70 sm:text-lg lg:text-xl"
      >
        {status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
      </motion.button>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm leading-[1.5] text-[#b23b3b]">
          Das hat leider nicht geklappt. Bitte versuch es erneut oder schreib direkt an{' '}
          <a href="mailto:info@tylotech.de" className="underline">info@tylotech.de</a>.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
  className = '',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`group flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-[-0.3px] text-ink/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="min-h-11 w-full rounded-2xl bg-ink/[0.04] px-4 py-3 text-[15px] tracking-[-0.2px] text-ink placeholder:text-ink/40 outline-none transition focus:bg-white focus:ring-2 focus:ring-plum/40"
      />
    </label>
  );
}
