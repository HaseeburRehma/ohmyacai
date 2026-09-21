'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import { FRANCHISE_PARTNER } from '@/data/site';

/**
 * Partner Stories — a real reel from @ohmyacai_dues, embedded through
 * Instagram's official embed.js so the same markup renders on desktop and
 * mobile (a bare iframe hits a mobile login gate on some UAs; embed.js
 * negotiates that). The poster shows on load; clicking play mounts the
 * blockquote, calls `window.instgrm.Embeds.process()` and the reel appears.
 */

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export default function PartnerStories() {
  const [play, setPlay] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!play) return;
    // Instagram sometimes needs a nudge after we mount the blockquote.
    const t = window.setTimeout(() => {
      try {
        window.instgrm?.Embeds.process();
      } catch {}
    }, 60);
    return () => window.clearTimeout(t);
  }, [play]);

  const permalink = `https://www.instagram.com/reel/${FRANCHISE_PARTNER.reel}/`;

  return (
    <section className="w-full bg-white px-6 py-20 sm:px-10 lg:px-[60px] lg:py-20">
      {/* Loaded once; embed.js self-processes any new blockquote we add. */}
      {play && (
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="afterInteractive"
          onLoad={() => {
            try {
              window.instgrm?.Embeds.process();
            } catch {}
          }}
        />
      )}

      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
          <InView
            variants={{ hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.2] tracking-[-0.5px] text-plum">
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
          <div className="mx-auto max-w-[560px]">
            {!play ? (
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(77,41,78,0.5)]">
                <Image
                  src={FRANCHISE_PARTNER.poster}
                  alt="Blick in eine Filiale von Oh My Açaí"
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-plum/60 via-plum/10 to-transparent"
                />

                <motion.button
                  type="button"
                  onClick={() => setPlay(true)}
                  aria-label="Reel von @ohmyacai_dues abspielen"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.25)] outline-none backdrop-blur focus-visible:ring-4 focus-visible:ring-gold sm:size-20"
                >
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full border-2 border-white"
                  />
                  <svg viewBox="0 0 24 24" className="size-7 translate-x-0.5 sm:size-8" aria-hidden>
                    <path d="M8 5.5v13l11-6.5-11-6.5z" fill="#4d294e" />
                  </svg>
                </motion.button>

                <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="none">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
                  </svg>
                  @ohmyacai_dues
                </span>
              </div>
            ) : (
              /* Instagram's own container — embed.js upgrades it into the reel */
              <div ref={holderRef} className="ig-wrap flex justify-center">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={permalink}
                  data-instgrm-version="14"
                  style={{ maxWidth: '540px', width: '100%', minWidth: '260px', margin: 0 }}
                />
              </div>
            )}

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
          </div>
        </InView>
      </div>
    </section>
  );
}
