'use client';

import Link from 'next/link';
import { InView } from '@/components/motion-primitives/in-view';
import PillButton from '@/components/ui/PillButton';
import { DELIVERY_PLATFORMS, STORES } from '@/data/site';

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = { hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0 } };

/**
 * /online-bestellen — the one place the site links out to the delivery
 * platforms (Wolt, Lieferando, Uber Eats). Walk-in pickup at either store
 * needs no account at all.
 */
export default function OrderOptions() {
  return (
    <section className="w-full bg-white px-6 pb-20 pt-4 sm:px-10 lg:px-[60px] lg:pb-[120px]">
      <div className="mx-auto grid w-full grid-cols-1 max-w-[1220px] gap-6 lg:grid-cols-3">
        {/* Delivery — the main card */}
        <InView
          variants={rise}
          transition={{ duration: 0.9, ease: EASE }}
          viewOptions={{ once: true, amount: 0.2 }}
          className="relative flex flex-col gap-5 overflow-hidden rounded-3xl bg-gold p-6 text-white sm:p-9 lg:col-span-2"
        >
          <p className="font-menu w-fit rounded-full bg-white/20 px-3 py-1 text-sm uppercase tracking-[0.06em]">
            Lieferung & Vorbestellung
          </p>
          <h2 className="font-display max-w-[560px] text-[clamp(1.6rem,4.4vw,2.75rem)] uppercase leading-[1.08] tracking-[-0.5px]">
            Nach Hause oder ins Büro geliefert
          </h2>
          <p className="max-w-[560px] text-base leading-[1.55] tracking-[-0.3px] text-white/90">
            Unser Store in der Flinger Straße liefert über Wolt, Lieferando und Uber Eats, gut gekühlt im jeweiligen
            Liefergebiet in Düsseldorf. In der App kannst du auch auf Abholung umstellen, dann wartet deine Bowl
            fertig an der Theke.
          </p>
          <ol className="grid gap-3 text-[15px] sm:grid-cols-3">
            {['Plattform wählen', 'Bowl auswählen', 'Liefern oder abholen'].map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3">
                <span className="font-menu text-xl leading-none">0{i + 1}</span>
                <span className="font-bold leading-tight">{s}</span>
              </li>
            ))}
          </ol>
          <ul className="mt-1 flex flex-wrap gap-3">
            {DELIVERY_PLATFORMS.map((p) => (
              <li key={p.name}>
                <PillButton href={p.url} newTab variant="ink" labelClassName="text-[1rem] sm:text-xl">
                  {p.name}
                </PillButton>
              </li>
            ))}
          </ul>
        </InView>

        {/* Walk-in */}
        <InView
          variants={rise}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          viewOptions={{ once: true, amount: 0.2 }}
          className="@container flex flex-col gap-5 rounded-3xl bg-plum p-7 text-white sm:p-9"
        >
          <p className="font-menu w-fit rounded-full bg-white/10 px-3 py-1 text-sm uppercase tracking-[0.06em] text-gold">
            To go im Store
          </p>
          <h2 className="font-display text-[min(2.25rem,9.5cqw)] uppercase leading-[1.08] tracking-[-0.5px]">
            Einfach vorbeikommen
          </h2>
          <p className="text-[15px] leading-[1.55] text-cream/85">
            Bestell direkt an der Theke und nimm deine Bowl mit. Beide Stores haben jeden Tag geöffnet.
          </p>
          <ul className="flex flex-col gap-3">
            {STORES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3 transition-colors hover:bg-white/15"
                >
                  <span>
                    <span className="font-display block uppercase leading-tight text-gold">{s.city}</span>
                    <span className="block text-[14px] text-cream/80">{s.addressLines[0]}</span>
                  </span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
}
