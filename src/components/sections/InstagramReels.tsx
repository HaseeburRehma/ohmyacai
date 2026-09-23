'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import { INSTAGRAM } from '@/data/site';

/**
 * Instagram reels — a 4-in-a-row grid on desktop that auto-advances through
 * the shop's clips: every 5s the "active" (playing) reel moves to the next
 * card. The active card plays its mp4 muted+looped; the other three show
 * their posters. Any card can be clicked to make it active + play/pause;
 * hovering pauses auto-advance; touch: tap a poster to make it active and
 * play. Under prefers-reduced-motion the auto-advance is skipped and reels
 * only play on tap/click.
 *
 * A scroll-snap rail on phones (one reel visible at a time, auto-advances
 * scrollLeft in sync with `index`), the 4-up row from `lg`.
 */
export default function InstagramReels() {
  const reels = INSTAGRAM.reels;
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  /* Auto-advance every 5s unless: reduced-motion, hover, or user manually
     paused a reel. */
  useEffect(() => {
    if (reduce || hover || manuallyPaused) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % reels.length),
      5000
    );
    return () => window.clearTimeout(id);
  }, [index, hover, manuallyPaused, reduce, reels.length]);

  /* Keep the mobile scroll-snap rail in sync with `index`. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.children[index] as HTMLElement | undefined;
    if (!card) return;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: 'smooth' });
  }, [index]);

  return (
    <section
      id="instagram"
      className="w-full bg-white px-6 py-16 sm:px-10 lg:px-[60px] lg:py-[110px]"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Head ------------------------------------------------------- */}
        <div className="flex flex-col items-start justify-between gap-6 pb-10 sm:flex-row sm:items-end lg:pb-14">
          <InView
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.4 }}
          >
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.1] tracking-[-0.5px] text-plum">
                {INSTAGRAM.heading}
              </h2>
              <p className="max-w-[520px] text-base leading-[1.35] tracking-[-0.5px] text-ink">
                {INSTAGRAM.body}
              </p>
            </div>
          </InView>

          <InView
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.4 }}
            className="shrink-0"
          >
            <motion.a
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-plum px-6 py-3 text-cream outline-none focus-visible:ring-4 focus-visible:ring-mauve/50"
            >
              <InstagramGlyph />
              <span className="font-display text-lg uppercase leading-none tracking-[-0.5px]">
                {INSTAGRAM.handle}
              </span>
            </motion.a>
          </InView>
        </div>

        {/* 4-up grid on lg, snap rail on mobile ---------------------- */}
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative"
        >
          <div
            ref={railRef}
            className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
          >
            {reels.map((reel, i) => (
              <ReelCard
                key={reel.code}
                reel={reel}
                index={i}
                total={reels.length}
                active={i === index}
                onActivate={(pause) => {
                  setIndex(i);
                  setManuallyPaused(pause);
                }}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {reels.map((r, i) => (
              <button
                key={r.code}
                type="button"
                onClick={() => { setIndex(i); setManuallyPaused(false); }}
                aria-label={`Reel ${i + 1} von ${reels.length}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-plum' : 'w-2 bg-plum/25 hover:bg-plum/45'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ReelCard({
  reel,
  index,
  total,
  active,
  onActivate,
}: {
  reel: (typeof INSTAGRAM.reels)[number];
  index: number;
  total: number;
  active: boolean;
  onActivate: (paused: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  const onTogglePlay = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const v = videoRef.current;
      if (!v) return;
      if (!active) {
        onActivate(false);
        return;
      }
      if (v.paused) {
        v.play().catch(() => {});
        onActivate(false);
      } else {
        v.pause();
        onActivate(true);
      }
    },
    [active, onActivate]
  );

  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 44, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{
        duration: 0.75,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewOptions={{ once: true, amount: 0.25 }}
      className="w-[64%] shrink-0 snap-center sm:w-[42%] lg:w-auto"
    >
      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={`Reel ${index + 1} von ${total}: ${reel.alt}${active && playing ? ' (pausieren)' : ' (abspielen)'}`}
        className={`group relative block aspect-[9/16] w-full overflow-hidden rounded-3xl bg-plum outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-mauve/50 ${
          active ? 'ring-2 ring-plum ring-offset-4 ring-offset-white' : ''
        }`}
      >
        {/* Video always mounted (native controls false); Play/pause driven by
            the button. Poster stays as background image so paused cards show a
            clean still. */}
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src={reel.video}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* legibility gradient + play/pause glyph */}
        <div
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 transition-opacity ${active && playing ? 'opacity-40' : 'opacity-100'}`}
        />
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 backdrop-blur-sm transition ${active && playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        >
          {active && playing ? (
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M8 5v14M16 5v14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" fill="#fff" />
            </svg>
          )}
        </span>
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="none">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
          </svg>
          <span className="text-xs font-bold tracking-[-0.3px]">{INSTAGRAM.handle}</span>
        </span>
      </button>
    </InView>
  );
}

function InstagramGlyph({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}
