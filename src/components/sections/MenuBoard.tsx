'use client';

import Image from 'next/image';
import Link from 'next/link';
import { InView } from '@/components/motion-primitives/in-view';
import { COLD_DRINKS, MATCHA_DRINKS, MENU_BOWLS } from '@/data/site';

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

/**
 * The full menu as a printed-menu style board: one row per item with a
 * dotted leader to the price. Bowls carry their real price; matcha has no
 * published price yet, so it reads "im Store" rather than a guess.
 */
export default function MenuBoard({ showMatcha = true }: { showMatcha?: boolean }) {
  return (
    <section id="karte" className="w-full bg-white px-6 pb-20 pt-4 sm:px-10 lg:px-[60px] lg:pb-[120px]">
      <div className="mx-auto flex w-full max-w-[1020px] flex-col gap-16 lg:gap-24">
        <MenuGroup
          title="Açaí Bowls"
          note="Açaí-Püree auf veganem Chia-Pudding mit Granola, Banane, Erdbeeren, Heidelbeeren und Kokos. Je nach Bowl in 0,35 l und 0,5 l."
          link={{ href: '/acai-bowls-duesseldorf', label: 'Mehr über unsere Bowls' }}
        >
          {MENU_BOWLS.map((b, i) => (
            <InView
              as="li"
              key={b.name}
              variants={rise}
              transition={{ duration: 0.8, delay: (i % 3) * 0.06, ease: EASE }}
              viewOptions={{ once: true, amount: 0.3 }}
              className="flex items-center gap-4 py-5 sm:gap-6"
            >
              <div className="relative size-[76px] shrink-0 overflow-hidden rounded-2xl sm:size-[96px]">
                <Image src={b.image} alt={b.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display min-w-0 text-[clamp(1.05rem,2.6vw,1.5rem)] uppercase leading-[1.1] tracking-[-0.5px] text-plum">
                    {b.name}
                  </h3>
                  <span aria-hidden className="hidden flex-1 translate-y-[-4px] border-b-2 border-dotted border-plum/25 sm:block" />
                  <span className="font-menu ml-auto shrink-0 text-[clamp(1.25rem,2.6vw,1.6rem)] leading-none text-ink sm:ml-0">
                    {b.price}
                  </span>
                </div>
                <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.04em] text-mauve">{b.toppings}</p>
                <p className="mt-1.5 text-[15px] leading-[1.45] tracking-[-0.2px] text-ink/75">{b.body}</p>
              </div>
            </InView>
          ))}
        </MenuGroup>

        {showMatcha && (
          <MenuGroup
            title="Iced Matcha"
            note="Frisch zubereitet in Düsseldorf, auch zum Mitnehmen."
            link={{ href: '/matcha-duesseldorf', label: 'Mehr über unseren Matcha' }}
          >
            {MATCHA_DRINKS.map((d, i) => (
              <InView
                as="li"
                key={d.name}
                variants={rise}
                transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
                viewOptions={{ once: true, amount: 0.3 }}
                className="flex items-center gap-4 py-5 sm:gap-6"
              >
                <MatchaGlass color={d.color} className="h-[76px] w-[76px] shrink-0 sm:size-[96px]" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display min-w-0 text-[clamp(1.05rem,2.6vw,1.5rem)] uppercase leading-[1.1] tracking-[-0.5px] text-plum">
                      {d.name}
                    </h3>
                    <span aria-hidden className="hidden flex-1 translate-y-[-4px] border-b-2 border-dotted border-plum/25 sm:block" />
                    <span className="font-menu ml-auto shrink-0 text-[clamp(1.25rem,2.6vw,1.6rem)] leading-none text-ink sm:ml-0">
                      {d.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-[1.45] tracking-[-0.2px] text-ink/75">{d.body}</p>
                </div>
              </InView>
            ))}
          </MenuGroup>
        )}

        <div>
          <InView variants={rise} transition={{ duration: 0.9, ease: EASE }} viewOptions={{ once: true, amount: 0.4 }}>
            <h2 className="font-display border-b-2 border-plum pb-5 text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.05] tracking-[-0.5px] text-ink">
              Kalte Getränke
            </h2>
          </InView>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {COLD_DRINKS.map((d) => (
              <li key={d.name} className="flex items-baseline gap-3 border-b border-ink/10 py-3.5">
                <span className="font-display text-[clamp(1rem,2vw,1.15rem)] uppercase tracking-[-0.3px] text-plum">{d.name}</span>
                <span aria-hidden className="flex-1 translate-y-[-4px] border-b-2 border-dotted border-plum/20" />
                <span className="font-menu text-lg leading-none text-ink">{d.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-ink/55">inkl. 0,25 € Pfand</p>
        </div>

        <InView variants={rise} transition={{ duration: 0.8, ease: EASE }} viewOptions={{ once: true, amount: 0.4 }}>
          <p className="rounded-3xl bg-[#f7f3f7] p-6 text-[15px] leading-[1.55] text-ink/80 sm:p-8">
            <strong className="text-plum">Allergene:</strong> Je nach Bowl können Nüsse (Erdnuss, Pistazie), Gluten
            (Granola, Hafer) und Milch enthalten sein. Sprich uns vor der Bestellung im Store an, wir zeigen dir die
            vollständige Allergenliste. Preise inkl. MwSt. laut unseren Lieferdienst-Karten, im Store und je
            nach Plattform können sie abweichen.
          </p>
        </InView>
      </div>
    </section>
  );
}

function MenuGroup({
  title,
  note,
  link,
  children,
}: {
  title: string;
  note: string;
  link: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <div>
      <InView variants={rise} transition={{ duration: 0.9, ease: EASE }} viewOptions={{ once: true, amount: 0.4 }}>
        <div className="flex flex-col gap-3 border-b-2 border-plum pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.05] tracking-[-0.5px] text-ink">
              {title}
            </h2>
            <p className="mt-2 max-w-[520px] text-[15px] leading-[1.45] text-ink/70">{note}</p>
          </div>
          <Link
            href={link.href}
            className="font-menu inline-flex min-h-11 shrink-0 items-center gap-1.5 text-base uppercase text-mauve underline-offset-4 hover:underline"
          >
            {link.label} <span aria-hidden>→</span>
          </Link>
        </div>
      </InView>
      <ul className="divide-y divide-ink/10">{children}</ul>
    </div>
  );
}

/** Illustrated iced-matcha glass: fruit layer, matcha layer, ice. Stands in
 *  until the shop has drink photos. */
export function MatchaGlass({ color, className = '' }: { color: string; className?: string }) {
  return (
    <div className={`grid place-items-center rounded-2xl bg-[#eef1e3] ${className}`}>
      <svg viewBox="0 0 60 80" className="h-[78%]" aria-hidden>
        <defs>
          <clipPath id={`glass-${color.slice(1)}`}>
            <path d="M12 10h36l-4 62a6 6 0 0 1-6 5H22a6 6 0 0 1-6-5z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#glass-${color.slice(1)})`}>
          <rect x="0" y="0" width="60" height="80" fill="#fff" />
          <rect x="0" y="50" width="60" height="30" fill={color} />
          <path d="M0 50c10-4 20 4 30 0s20-4 30 0v-26H0z" fill="#7c8b3f" />
          <rect x="18" y="16" width="10" height="10" rx="2" fill="#fff" opacity=".7" transform="rotate(12 23 21)" />
          <rect x="31" y="20" width="10" height="10" rx="2" fill="#fff" opacity=".6" transform="rotate(-10 36 25)" />
        </g>
        <path d="M12 10h36l-4 62a6 6 0 0 1-6 5H22a6 6 0 0 1-6-5z" fill="none" stroke="#4d294e" strokeWidth="2" />
        <path d="M36 2l-4 30" stroke="#4d294e" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** /matcha-duesseldorf — the three drinks as tall coloured cards. */
export function MatchaGrid() {
  return (
    <section className="w-full bg-white px-6 pb-16 pt-4 sm:px-10 lg:px-[60px] lg:pb-[100px]">
      <ul className="mx-auto grid w-full max-w-[1220px] gap-5 sm:grid-cols-3">
        {MATCHA_DRINKS.map((d, i) => (
          <InView
            as="li"
            key={d.name}
            variants={{ hidden: { opacity: 0, y: 50, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            viewOptions={{ once: true, amount: 0.3 }}
            className="flex flex-col overflow-hidden rounded-3xl text-white"
          >
            <div className="grid aspect-[4/3] place-items-center" style={{ background: d.color }}>
              <MatchaGlass color={d.color} className="size-[150px] bg-white/85 sm:size-[170px]" />
            </div>
            <div className="flex flex-1 flex-col gap-2 bg-plum p-6">
              <h2 className="font-display text-[clamp(1.25rem,2.4vw,1.6rem)] uppercase leading-[1.1] tracking-[-0.5px]">{d.name}</h2>
              <p className="text-[15px] leading-[1.5] text-cream/85">{d.body}</p>
              <p className="font-menu mt-auto pt-2 text-lg uppercase text-gold">{d.price} · to go</p>
            </div>
          </InView>
        ))}
      </ul>
    </section>
  );
}
