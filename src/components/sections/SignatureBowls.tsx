'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import Tilt3D from '@/components/ui/Tilt3D';
import Scallop from '@/components/ui/Scallop';
import { BOWLS, ORDER_URL } from '@/data/site';

/**
 * Figma: the gold "Union" blob (y 2056 → 3976) holding
 * "Title and Supporting Text" and the 3 × 2 "Frame 44" bowl grid.
 * The blob is rebuilt as scallop-cap + flat fill + flipped scallop-cap so the
 * bumps stay circular at any width.
 */
export default function SignatureBowls() {
  return (
    <section id="bowls" className="relative w-full bg-white">
      <div className="text-gold">
        <Scallop />
      </div>

      <div className="relative bg-gold">
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-24 pt-4 sm:px-10 lg:px-[60px] lg:pb-[140px]">
          {/* Title block ------------------------------------------------ */}
          <div className="flex flex-col gap-6 pb-14 lg:flex-row lg:items-end lg:justify-between lg:pb-[167px]">
            <InView
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewOptions={{ once: true, amount: 0.2 }}
            >
              <h2 className="font-display max-w-[811px] text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[1.2] text-white">
                Entdecke unsere
                <br />
                Signature Bowls
              </h2>
            </InView>

            <InView
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewOptions={{ once: true, amount: 0.3 }}
            >
              <p className="max-w-[377px] text-base tracking-[-0.5px] text-white lg:pb-[24px]">
                Eine Auswahl unserer Lieblinge — gemacht für alle, die Açaí
                lieben.
              </p>
            </InView>
          </div>

          {/* Grid ------------------------------------------------------- */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BOWLS.map((bowl, i) => (
              <BowlCard key={bowl.name} bowl={bowl} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="text-gold">
        <Scallop flip />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BowlCard({
  bowl,
  index,
}: {
  bowl: (typeof BOWLS)[number];
  index: number;
}) {
  const [active, setActive] = useState(false);
  const touched = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playNow = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState < 2) { try { v.load(); } catch {} }
    v.play().catch(() => {});
  };
  useEffect(() => {
    // On touch, tapping elsewhere on the document deactivates any active card.
    const off = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      const t = e.target as Node | null;
      const card = document.querySelectorAll('[data-bowl-card]');
      let inside = false;
      card.forEach((c) => { if (t && c.contains(t)) inside = true; });
      if (!inside) setActive(false);
    };
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, []);
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 56, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewOptions={{ once: true, amount: 0.3 }}
    >
      <Tilt3D max={7} scale={1.02} className="aspect-[424/540] w-full">
        {/* Figma "Frame 44" card: the cup photo fills the card on its own
            coloured backdrop, a bottom fade carries the white copy — rating
            top-right, name + price bottom-left, CTA bottom-right. */}
        <motion.a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial="rest"
          whileHover="hover"
          whileFocus="hover"
          data-bowl-card
          onPointerEnter={(e) => { if (e.pointerType !== 'touch') { setActive(true); playNow(); } }}
          onPointerLeave={(e) => { if (e.pointerType !== 'touch') setActive(false); }}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onClick={(e) => {
            // On touch, the first tap previews (activate); the second tap navigates.
            if (touched.current) return;
            touched.current = false;
            if (!active) {
              const isTouch = window.matchMedia('(hover: none)').matches;
              if (isTouch) {
                e.preventDefault();
                setActive(true);
                touched.current = true;
                window.setTimeout(() => { touched.current = false; }, 400);
              }
            }
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="group relative block size-full overflow-hidden rounded-3xl border-[1.5px] border-white/60 outline-none focus-visible:ring-4 focus-visible:ring-white/50"
        >
          <HoverMedia bowl={bowl} active={active} videoRef={videoRef} />

          {/* Bottom fade to the card's backdrop colour, for legible copy */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[52%]"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, ${bowl.fade} 78%)`,
            }}
          />

          {/* Rating — top right */}
          <div className="absolute right-6 top-6 flex items-center gap-1.5">
            <span className="font-menu text-xl leading-none tracking-[-0.5px] text-white">
              {bowl.rating}
            </span>
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
              <path
                d="M10 1.5l2.47 5.2 5.53.72-4.05 3.9 1.03 5.68L10 14.3l-5 2.7 1.03-5.68L2 7.42l5.53-.72L10 1.5z"
                fill="#fff"
              />
            </svg>
          </div>

          {/* Copy — bottom */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
            <h3 className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] uppercase leading-[1.1] tracking-[-0.5px] text-white">
              {bowl.name}
            </h3>
            <div className="flex items-end justify-between">
              <span className="font-menu text-[26px] leading-none tracking-[-0.5px] text-white">
                {bowl.price}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="flex h-6 flex-col overflow-hidden">
                  <motion.span
                    className="flex flex-col"
                    variants={{ rest: { y: 0 }, hover: { y: -24 } }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-menu block whitespace-nowrap text-lg uppercase leading-6 tracking-[-0.5px] text-white">
                      Diese Bowl holen
                    </span>
                    <span
                      aria-hidden
                      className="font-menu block whitespace-nowrap text-lg uppercase leading-6 tracking-[-0.5px] text-white"
                    >
                      Diese Bowl holen
                    </span>
                  </motion.span>
                </span>
                <motion.svg
                  viewBox="0 0 16 16"
                  className="size-4"
                  aria-hidden
                  variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <path
                    d="M2 8h11M9 4l4 4-4 4"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </span>
            </div>
          </div>
        </motion.a>
      </Tilt3D>
    </InView>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Image on rest, video on hover / focus / touch-tap. The video only mounts
 * when the card first scrolls into view (IntersectionObserver), so idle pages
 * download nothing extra. Preload="auto" so the mp4 is ready by the time
 * hover happens; play() is fired inside a rAF so browsers accept it as
 * user-gesture-adjacent. On leave the video pauses and rewinds so the next
 * hover restarts from frame 0. Skipped under prefers-reduced-motion.
 */
function HoverMedia({
  bowl,
  active,
  videoRef,
}: {
  bowl: (typeof BOWLS)[number];
  active: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active && !reduce) {
      // Kick network fetch even if the browser hadn't started preloading.
      if (v.readyState < 2) {
        try { v.load(); } catch {}
      }
      const onCanPlay = () => {
        v.currentTime = 0;
        v.play().catch(() => {});
      };
      if (v.readyState >= 2) {
        onCanPlay();
      } else {
        v.addEventListener('loadeddata', onCanPlay, { once: true });
        return () => v.removeEventListener('loadeddata', onCanPlay);
      }
    } else {
      v.pause();
      try { v.currentTime = 0; } catch {}
    }
  }, [active, reduce, videoRef]);

  return (
    <motion.div
      variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    >
      <Image
        src={bowl.image}
        alt={bowl.name}
        fill
        sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 424px"
        className="object-cover"
      />
      {!reduce && (
        <video
          ref={videoRef}
          src={bowl.video}
          poster={bowl.image}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className={`absolute inset-0 size-full object-cover transition-opacity duration-200 ease-out ${active ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </motion.div>
  );
}
