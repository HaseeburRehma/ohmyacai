'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import { CONTACT, STORES } from '@/data/site';

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

/** /contact — direct lines + both stores on the left, message form right. */
export default function ContactSection() {
  return (
    <section className="w-full bg-white px-6 pb-20 pt-4 sm:px-10 lg:px-[60px] lg:pb-[120px]">
      <div className="mx-auto grid w-full max-w-[1220px] items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <InView
          variants={rise}
          transition={{ duration: 0.9, ease: EASE }}
          viewOptions={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="group rounded-3xl bg-plum p-6 text-white transition-transform hover:-translate-y-0.5"
            >
              <p className="font-menu text-sm uppercase tracking-[0.08em] text-gold">Telefon</p>
              <p className="font-display mt-2 text-xl uppercase leading-tight tracking-[-0.5px]">{CONTACT.phone}</p>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="group rounded-3xl bg-gold p-6 text-white transition-transform hover:-translate-y-0.5"
            >
              <p className="font-menu text-sm uppercase tracking-[0.08em] text-white/80">E-Mail</p>
              <p className="font-display mt-2 break-all text-xl uppercase leading-tight tracking-[-0.5px]">{CONTACT.email}</p>
            </a>
          </div>

          {STORES.map((s) => (
            <div key={s.slug} className="rounded-3xl border border-ink/10 p-6 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-4">
                <div>
                  <p className="font-display text-xl uppercase leading-tight tracking-[-0.5px] text-plum">{s.label}</p>
                  <address className="mt-1 not-italic text-[15px] leading-[1.5] text-ink/80">
                    {s.addressLines.slice(0, 2).join(', ')}
                  </address>
                </div>
                <Link
                  href={`/${s.slug}`}
                  className="font-menu inline-flex min-h-11 shrink-0 items-center text-sm uppercase text-mauve underline-offset-4 hover:underline"
                >
                  Zeiten & Anfahrt →
                </Link>
              </div>
            </div>
          ))}

          <p className="text-[14px] leading-[1.55] text-ink/65">
            Für Großhandel und Franchise gibt es eigene Formulare:{' '}
            <Link href="/#wholesale" className="font-semibold text-plum underline-offset-4 hover:underline">Großhandel</Link>
            {' · '}
            <Link href="/franchise" className="font-semibold text-plum underline-offset-4 hover:underline">Franchise</Link>
          </p>
        </InView>

        <InView
          variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          viewOptions={{ once: true, amount: 0.15 }}
        >
          <ContactForm />
        </InView>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', store: '', message: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('ok');
      setForm({ name: '', email: '', store: '', message: '', company: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-3xl bg-plum p-8 text-center text-cream sm:p-10">
        <h2 className="font-display text-2xl uppercase leading-[1.1] tracking-[-0.5px]">Danke für deine Nachricht!</h2>
        <p className="mx-auto mt-3 max-w-[360px] text-sm leading-[1.55] text-cream/90">
          Wir melden uns so schnell wie möglich per E-Mail bei dir.
        </p>
      </div>
    );
  }

  const input =
    'min-h-11 w-full rounded-2xl bg-ink/[0.04] px-4 py-3 text-[15px] tracking-[-0.2px] text-ink outline-none transition focus:bg-white focus:ring-2 focus:ring-plum/40';

  return (
    <form onSubmit={onSubmit} className="relative rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] sm:p-8">
      <h2 className="font-display text-[clamp(1.35rem,3.6vw,1.75rem)] uppercase leading-[1.1] tracking-[-0.5px] text-plum">
        Schreib uns
      </h2>
      <p className="mt-2 text-sm leading-[1.5] text-ink/70">Fragen, Feedback oder eine Bestellung für dein Team? Wir antworten per E-Mail.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase text-ink/60">Name</span>
          <input className={input} value={form.name} onChange={(e) => set('name')(e.target.value)} autoComplete="name" required />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase text-ink/60">E-Mail-Adresse</span>
          <input type="email" className={input} value={form.email} onChange={(e) => set('email')(e.target.value)} autoComplete="email" required />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase text-ink/60">Store (optional)</span>
          <select className={input} value={form.store} onChange={(e) => set('store')(e.target.value)}>
            <option value="">Egal / allgemein</option>
            {STORES.map((s) => (
              <option key={s.slug} value={s.city}>{s.city}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase text-ink/60">Nachricht</span>
          <textarea
            className={`${input} min-h-[140px] resize-y`}
            value={form.message}
            onChange={(e) => set('message')(e.target.value)}
            required
            minLength={5}
          />
        </label>
        {/* honeypot */}
        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={form.company}
          onChange={(e) => set('company')(e.target.value)}
          className="absolute -left-[9999px] size-px opacity-0"
        />
      </div>

      <p className="mt-4 text-[12px] leading-[1.5] text-ink/55">
        Mit dem Absenden verarbeiten wir deine Angaben zur Beantwortung deiner Anfrage, siehe{' '}
        <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>.
      </p>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
        whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
        className="font-display mt-5 w-full rounded-full bg-mauve px-4 py-3 text-base uppercase leading-[1.15] tracking-[-0.5px] text-cream outline-none focus-visible:ring-4 focus-visible:ring-gold/60 disabled:opacity-70 sm:text-lg"
      >
        {status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
      </motion.button>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm leading-[1.5] text-[#b23b3b]">
          Das hat leider nicht geklappt. Schreib uns direkt an{' '}
          <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>.
        </p>
      )}
    </form>
  );
}
