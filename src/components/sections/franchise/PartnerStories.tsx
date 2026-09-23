'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import { FRANCHISE_PARTNER } from '@/data/site';

/**
 * Partner Stories — landscape 1320 × 480 card (matches the Figma artboard),
 * with the shop's own reel from @ohmyacai_dues playing centred in a plum
 * frame. The reel itself is 9:16, so it's shown at native aspect with the
 * backdrop filling the sides — the standard "vertical video in landscape"
 * treatment, no cropping or distortion.
 */
export default function PartnerStories() {
  const [play, setPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function start() {
    setPlay(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  }

  const permalink = `https://www.instagram.com/reel/${FRANCHISE_PARTNER.reel}/`;

  return (
    <section className="w-full bg-white px-6 py-20 sm:px-10 lg:px-[60px] lg:py-20">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
          <InView
            variants={{ hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-[clamp(1.4rem,5vw,3rem)] uppercase leading-[1.15] tracking-[-0.5px] text-plum">
              {FRANCHISE_PARTNER.titleBefore}
              <span className="text-gold">
                {FRANCHISE_PARTNER.titleAccent}
              </span>
            </h2>
          </InView>

          <InView
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <p className="text-base leading-[1.35] tracking-[-0.5px] text-ink">
              {FRANCHISE_PARTNER.body}
            </p>
          </InView>
        </div>

        <InView
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.97 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.2 }}
          className="mt-10 lg:mt-[88px]"
        >
          {/* Landscape card, video fills edge-to-edge — the reel is now a
              true 16:9 crop of the store, so no letterbox / blurred
              backdrop is needed. 4:3 on phones so the shopfront still
              reads, 1320:480 from lg like the artboard. */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-plum shadow-[0_24px_60px_-24px_rgba(77,41,78,0.5)] sm:aspect-[16/9] lg:aspect-[1320/480]">
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              src={FRANCHISE_PARTNER.video}
              poster={FRANCHISE_PARTNER.poster}
              preload="metadata"
              playsInline
              controls={play}
              onEnded={() => setPlay(false)}
            />

            {!play && (
              <>
                <Image
                  src={FRANCHISE_PARTNER.poster}
                  alt="Oh My Açaí Flagship-Store in Düsseldorf"
                  fill
                  sizes="(max-width: 1024px) 92vw, 1320px"
                  className="object-cover"
                  priority={false}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent"
                />
                <motion.button
                  type="button"
                  onClick={start}
                  aria-label="Reel von @ohmyacai_dues abspielen"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.25)] outline-none backdrop-blur focus-visible:ring-4 focus-visible:ring-gold sm:size-16"
                >
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full border-2 border-white"
                  />
                  <svg viewBox="0 0 24 24" className="size-6 translate-x-0.5 sm:size-7" aria-hidden>
                    <path d="M8 5.5v13l11-6.5-11-6.5z" fill="#4d294e" />
                  </svg>
                </motion.button>
              </>
            )}

            {/* Handle badge, top-left of the card frame */}
            <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur sm:left-6 sm:top-6">
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="none">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
              </svg>
              @ohmyacai_dues
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-ink/70">
            <span>
              Reel von{' '}
              <a
                href={FRANCHISE_PARTNER.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-plum underline underline-offset-2 hover:text-mauve"
              >
                @ohmyacai_dues
              </a>
            </span>
            <a
              href={permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-semibold text-plum transition hover:bg-plum hover:text-white"
            >
              Auf Instagram ansehen →
            </a>
          </div>
        </InView>
      </div>
    </section>
  );
}
