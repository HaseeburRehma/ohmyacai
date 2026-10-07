'use client';

import { InView } from '@/components/motion-primitives/in-view';
import PillButton from '@/components/ui/PillButton';
import { DELIVERY_PLATFORMS } from '@/data/site';

const EASE = [0.16, 1, 0.3, 1] as const;

const GOOGLE = [
  {
    name: 'Google · Düsseldorf',
    body: 'Bewertungen für unseren Flagship-Store in der Flinger Straße 18.',
    url: 'https://www.google.com/maps/search/?api=1&query=Oh+My+Acai+Flinger+Str.+18+40213+D%C3%BCsseldorf',
  },
  {
    name: 'Google · Köln',
    body: 'Bewertungen für unseren Store in der Hohe Straße 105-107.',
    url: 'https://www.google.com/maps/search/?api=1&query=Oh+My+Acai+Hohe+Str.+105-107+50667+K%C3%B6ln',
  },
];

/**
 * /bewertungen — no copied or paraphrased reviews and no rating numbers
 * (they differ per platform and change daily). Each card links to the live
 * profile, where guests can read and leave reviews.
 */
export default function ReviewPlatforms() {
  const cards = [
    ...GOOGLE,
    ...DELIVERY_PLATFORMS.map((p) => ({
      name: p.name,
      body: `Bewertungen von Gästen, die über ${p.name} bestellt haben.`,
      url: p.url,
    })),
  ];

  return (
    <section className="w-full bg-white px-6 pb-16 pt-4 sm:px-10 lg:px-[60px] lg:pb-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <InView
              as="li"
              key={c.name}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: EASE }}
              viewOptions={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-4 rounded-3xl border border-ink/10 p-6 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.18)] sm:p-7"
            >
              <div className="flex gap-1 text-star" aria-hidden>
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} viewBox="0 0 20 20" className="size-5" fill="currentColor">
                    <path d="M10 1.5l2.47 5.2 5.53.72-4.05 3.9 1.03 5.68L10 14.3l-5 2.7 1.03-5.68L2 7.42l5.53-.72L10 1.5z" />
                  </svg>
                ))}
              </div>
              <h2 className="font-display text-xl uppercase leading-tight tracking-[-0.3px] text-plum">{c.name}</h2>
              <p className="text-[15px] leading-[1.5] text-ink/75">{c.body}</p>
              <div className="mt-auto pt-1">
                <PillButton href={c.url} newTab variant="plum" labelClassName="text-[1rem] sm:text-lg">
                  Bewertungen lesen
                </PillButton>
              </div>
            </InView>
          ))}
        </ul>

        <InView
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: EASE }}
          viewOptions={{ once: true, amount: 0.4 }}
          className="mt-10 flex flex-col items-start gap-4 rounded-3xl bg-gold p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <div>
            <p className="font-display text-[clamp(1.35rem,3vw,2rem)] uppercase leading-tight tracking-[-0.5px]">Warst du schon bei uns?</p>
            <p className="mt-1 max-w-[520px] text-[15px] leading-[1.5] text-white/90">
              Erzähl anderen von deiner Bowl. Jede ehrliche Bewertung hilft uns und anderen Gästen.
            </p>
          </div>
          <PillButton href={GOOGLE[0].url} newTab variant="ink">Bewertung schreiben</PillButton>
        </InView>
      </div>
    </section>
  );
}
