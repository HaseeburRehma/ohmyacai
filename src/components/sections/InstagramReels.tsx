'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import { INSTAGRAM } from '@/data/site';

/**
 * Instagram reels strip — the shop's own cup photos in a 9:16 reel slider that
 * links out to @ohmyacai_dues. A scroll-snap rail on phones, a four-up row from
 * `lg`. The Graph API needs a token the static site can't carry, so the cards
 * are curated stills that deep-link to the profile rather than a live embed.
 */
export default function InstagramReels() {
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

        {/* Reels ----------------------------------------------------- */}
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
          {INSTAGRAM.reels.map((reel, i) => (
            <InView
              key={reel.image}
              variants={{
                hidden: { opacity: 0, y: 44, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{
                duration: 0.8,
                delay: (i % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, amount: 0.25 }}
              className="w-[64%] shrink-0 snap-center sm:w-[42%] lg:w-auto"
            >
              <motion.a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${reel.alt} — auf Instagram ansehen`}
                initial="rest"
                whileHover="hover"
                whileFocus="hover"
                whileTap={{ scale: 0.98 }}
                className="group relative block aspect-[9/16] w-full overflow-hidden rounded-3xl bg-plum outline-none focus-visible:ring-4 focus-visible:ring-mauve/50"
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={reel.image}
                    alt={reel.alt}
                    fill
                    sizes="(max-width:640px) 64vw, (max-width:1024px) 42vw, 300px"
                    className="object-cover"
                  />
                </motion.div>

                {/* legibility gradient + play glyph */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
                />
                <motion.span
                  aria-hidden
                  variants={{ rest: { opacity: 0.85, scale: 1 }, hover: { opacity: 1, scale: 1.1 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 backdrop-blur-sm"
                >
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                    <path d="M8 5v14l11-7L8 5z" fill="#fff" />
                  </svg>
                </motion.span>
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
                  <InstagramGlyph className="size-4" />
                  <span className="text-xs font-bold tracking-[-0.3px]">
                    {INSTAGRAM.handle}
                  </span>
                </span>
              </motion.a>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function InstagramGlyph({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}
