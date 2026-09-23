'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import { REVIEWS, REVIEW_SUMMARY } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Figma: "Frame 39" — a Google-reviews widget: a summary bar over a rail of
 * review cards with circular prev/next controls overlapping the rail edges.
 */
export default function Reviews() {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = rail.current;
    el?.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el?.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section
      id="reviews"
      className="w-full bg-white px-6 pb-24 sm:px-10 lg:px-[60px]"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4">
        {/* Summary bar ------------------------------------------------ */}
        <InView
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col items-start gap-4 overflow-hidden rounded-3xl bg-ink/[0.04] p-5 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-4">
              <Image
                src="/img/logo-badge.png"
                alt=""
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1.5">
                <p className="text-xl font-bold leading-none text-ink">
                  {REVIEW_SUMMARY.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-star">
                    {REVIEW_SUMMARY.score}
                  </span>
                  <Stars />
                </div>
                <p className="flex items-center gap-1.5 text-sm text-ink/80">
                  {REVIEW_SUMMARY.count} <GoogleG />
                </p>
              </div>
            </div>

            <motion.a
              href="#reviews"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-white px-6 py-4 text-base font-bold text-ink shadow-[0_2px_10px_rgba(17,17,17,0.06)]"
            >
              Bewertung schreiben
            </motion.a>
          </div>
        </InView>

        {/* Rail -------------------------------------------------------- */}
        <div className="relative">
          <div
            ref={rail}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
          >
            {REVIEWS.map((r, i) => (
              <InView
                key={r.name}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(i, 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewOptions={{ once: true, amount: 0.35 }}
                className="w-[min(85vw,424px)] shrink-0 snap-start"
              >
                <article className="flex h-full flex-col gap-1.5 rounded-3xl bg-ink/[0.04] p-5">
                  <div className="flex items-start gap-3">
                    <Image
                      src="/img/logo-badge.png"
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 shrink-0 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-bold leading-tight text-ink">
                        {r.name}
                      </p>
                      <p className="text-sm text-ink/70">{r.when}</p>
                    </div>
                    <GoogleG className="size-5" />
                  </div>
                  <Stars className="mt-1" />
                  <p className="mt-1 text-[15px] leading-[1.35] text-ink">
                    {r.body}
                  </p>
                </article>
              </InView>
            ))}
          </div>

          {/* Controls */}
          <RailButton
            dir="prev"
            disabled={atStart}
            onClick={() => scrollBy(-1)}
          />
          <RailButton dir="next" disabled={atEnd} onClick={() => scrollBy(1)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function RailButton({
  dir,
  disabled,
  onClick,
}: {
  dir: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Vorherige Bewertungen' : 'Nächste Bewertungen'}
      whileHover={{ scale: disabled ? 1 : 1.12 }}
      whileTap={{ scale: disabled ? 1 : 0.94 }}
      className={cn(
        'absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_4px_16px_rgba(17,17,17,0.18)] transition-opacity',
        dir === 'prev' ? '-left-3 lg:-left-5' : '-right-3 lg:-right-5',
        disabled && 'pointer-events-none opacity-0'
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
        <path
          d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
          fill="none"
          stroke="#111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn('flex gap-0.5', className)} aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4" aria-hidden>
          <path
            d="M10 1.5l2.47 5.2 5.53.72-4.05 3.9 1.03 5.68L10 14.3l-5 2.7 1.03-5.68L2 7.42l5.53-.72L10 1.5z"
            fill="#faa700"
          />
        </svg>
      ))}
    </span>
  );
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4', className)} aria-label="Google">
      <path d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.87z" fill="#4285F4" />
      <path d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3a7.2 7.2 0 0 1-10.71-3.78H1.36v3.09A12 12 0 0 0 12 24z" fill="#34A853" />
      <path d="M5.36 14.31a7.19 7.19 0 0 1 0-4.6V6.62H1.36a12 12 0 0 0 0 10.78l4-3.09z" fill="#FBBC05" />
      <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.36 6.62l4 3.09A7.2 7.2 0 0 1 12 4.75z" fill="#EA4335" />
    </svg>
  );
}
