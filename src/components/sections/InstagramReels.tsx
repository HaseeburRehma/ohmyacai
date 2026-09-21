'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import { INSTAGRAM } from '@/data/site';

/**
 * Instagram reels — an auto-advancing slider of the shop's own reels from
 * @ohmyacai_dues. One reel plays at a time, in the same preview: play/pause
 * and mute/unmute controls live over the video, and the auto-advance pauses
 * whenever the video is playing (or the user is hovering). Small thumbnails
 * below act as dots — click one to jump to it.
 *
 * The video files are checked into /public/instagram so playback is
 * cross-origin-safe and doesn't rely on the Meta Graph API. `alt` is the
 * caption, `code` is the Instagram shortcode for the deep link.
 */
export default function InstagramReels() {
  const reels = INSTAGRAM.reels;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hover, setHover] = useState(false);
  const [prefersReduce, setPrefersReduce] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setPrefersReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  /* Auto-advance every 6s, but only while nothing is playing and the user
     isn't hovering — respect reduced-motion by skipping it entirely. */
  useEffect(() => {
    if (prefersReduce || playing || hover) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % reels.length), 6000);
    return () => window.clearTimeout(id);
  }, [index, playing, hover, prefersReduce, reels.length]);

  /* When the active reel changes, reset to the poster (paused). */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  }, [index]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  const active = reels[index];

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

        {/* Slider ---------------------------------------------------- */}
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="mx-auto flex max-w-[540px] flex-col items-center gap-6"
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-plum shadow-[0_18px_44px_-18px_rgba(77,41,78,0.55)]">
            {/* One <video> element that swaps its src per active reel. Keeping
                a single element (rather than mounting/unmounting per slide)
                avoids the browser tearing down + re-creating decoders. */}
            <video
              ref={videoRef}
              key={active.code}
              className="absolute inset-0 size-full object-cover"
              src={active.video}
              poster={active.poster}
              muted={muted}
              playsInline
              loop
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
            />

            {/* Fade-transition of the whole slide so the swap reads as a
                slider, not just a poster flicker. */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active.code + ':overlay'}
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: playing ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute inset-0"
              >
                <Image
                  src={active.poster}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 92vw, 540px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/45 via-transparent to-plum/10" />
              </motion.div>
            </AnimatePresence>

            {/* Handle badge, top-left */}
            <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <InstagramGlyph className="size-3.5" />
              {INSTAGRAM.handle}
            </span>

            {/* Auto-advance progress ring — top-right */}
            <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2">
              <span className="text-xs font-semibold text-white/85">
                {String(index + 1).padStart(2, '0')} / {String(reels.length).padStart(2, '0')}
              </span>
            </div>

            {/* Centre play button (only when paused) */}
            <AnimatePresence>
              {!playing && (
                <motion.button
                  key="play"
                  type="button"
                  onClick={togglePlay}
                  aria-label="Reel abspielen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.25)] outline-none backdrop-blur focus-visible:ring-4 focus-visible:ring-gold sm:size-20"
                >
                  <svg viewBox="0 0 24 24" className="size-7 translate-x-0.5 sm:size-8" aria-hidden>
                    <path d="M8 5.5v13l11-6.5-11-6.5z" fill="#4d294e" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Bottom controls: prev, play/pause, mute, next, open-on-IG */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
              <div className="flex items-center gap-1.5">
                <IconBtn
                  label="Vorheriger Reel"
                  onClick={() =>
                    setIndex((i) => (i - 1 + reels.length) % reels.length)
                  }
                >
                  <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </IconBtn>
                <IconBtn
                  label={playing ? 'Reel pausieren' : 'Reel abspielen'}
                  onClick={togglePlay}
                >
                  {playing ? (
                    <path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  ) : (
                    <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
                  )}
                </IconBtn>
                <IconBtn
                  label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
                  onClick={toggleMute}
                >
                  {muted ? (
                    <>
                      <path d="M4 10v4h3l4 3V7l-4 3H4z" fill="currentColor" />
                      <path d="M15 9l4 6M19 9l-4 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      <path d="M4 10v4h3l4 3V7l-4 3H4z" fill="currentColor" />
                      <path d="M15 9c1.2 1 1.8 2 1.8 3s-.6 2-1.8 3M17 6c2.4 1.8 3.5 3.8 3.5 6s-1.1 4.2-3.5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </>
                  )}
                </IconBtn>
                <IconBtn
                  label="Nächster Reel"
                  onClick={() => setIndex((i) => (i + 1) % reels.length)}
                >
                  <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </IconBtn>
              </div>

              <a
                href={`https://www.instagram.com/reel/${active.code}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-plum transition hover:bg-white sm:inline-flex"
              >
                Auf Instagram →
              </a>
            </div>
          </div>

          {/* Thumbnail strip — doubles as dots + preview + jump-to */}
          <div className="flex w-full items-center justify-center gap-3">
            {reels.map((r, i) => (
              <button
                key={r.code}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Reel ${i + 1} von ${reels.length}: ${r.alt}`}
                aria-current={i === index}
                className={`relative aspect-[9/16] w-14 shrink-0 overflow-hidden rounded-xl outline-none transition sm:w-16 ${
                  i === index
                    ? 'ring-2 ring-plum ring-offset-2 ring-offset-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={r.poster}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full bg-white/90 text-plum outline-none backdrop-blur transition hover:bg-white focus-visible:ring-4 focus-visible:ring-white/40"
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        {children}
      </svg>
    </button>
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
