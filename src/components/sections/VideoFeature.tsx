'use client';

import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { VIDEO_CARDS } from '@/data/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Figma: the 1320 × 1040 plum panel (rounded 60) with a centred bowl and four
 * gold callout cards floated around it, over the berry texture at 3% faded in
 * down the panel (`.berry-vectors`).
 *
 * That float composition needs width. At phone size the same 1320:1040 box is
 * only ~270px tall, which crushed the cards into unreadable 90px columns and
 * pushed two of them outside the panel. Below `lg` the panel therefore becomes
 * an ordinary stack — heading, bowl, then the cards in a grid — and the Figma
 * composition is restored from `lg` up.
 *
 * Depth: the panel is a 3D scene. Pointer position drives a small rotate on
 * the whole panel and each layer sits at its own translateZ.
 *
 * The cup is choreographed with GSAP ScrollTrigger rather than a plain scroll
 * transform: it rises, un-tilts and pushes toward the viewer as the panel
 * crosses the frame, its shadow tightens with it, and the callout cards fly in
 * on a stagger pinned to the same trigger — one timeline, so they stay in step
 * with each other instead of each running on its own observer.
 */
export default function VideoFeature() {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 } as const;
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [6, -6]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-4, 4]), spring);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [px, py]
  );
  const onPointerLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* Cup: scrubbed to the panel's travel through the viewport. */
        gsap.fromTo(
          '[data-video-cup]',
          { yPercent: 7, rotate: -18, scale: 0.95, z: -50 },
          {
            yPercent: -7,
            rotate: -12,
            scale: 1.02,
            z: 60,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );

        /* Its shadow tightens as the cup lifts. */
        gsap.fromTo(
          '[data-video-shadow]',
          { scaleX: 1.18, opacity: 0.25 },
          {
            scaleX: 0.82,
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );

        /* Callout cards fly in from their own side, on one stagger. */
        gsap.from('[data-video-card]', {
          opacity: 0,
          xPercent: (i) => (i % 2 === 0 ? -28 : 28),
          yPercent: 18,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 72%',
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section className="w-full bg-white py-16 lg:py-[120px]">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[60px]">
        <div
          ref={ref}
          data-video-panel
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative w-full rounded-[32px] lg:aspect-[1320/1040] lg:rounded-[60px]"
          style={{ perspective: '1500px' }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="berry-vectors relative flex size-full flex-col gap-6 overflow-hidden rounded-[32px] bg-plum px-5 py-10 sm:px-8 sm:py-12 lg:block lg:gap-0 lg:rounded-[60px] lg:p-0"
          >
            {/* Heading — Figma: centred, cap height at y 125 */}
            <motion.h2
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ translateZ: 40, transformStyle: 'preserve-3d' }}
              className="font-display relative text-center text-[clamp(1.5rem,7vw,2.25rem)] uppercase leading-[1.2] text-white lg:absolute lg:left-1/2 lg:top-[6%] lg:w-[min(90%,811px)] lg:-translate-x-1/2 lg:text-[clamp(1.5rem,4.4vw,4rem)]"
            >
              Lorem ipsum dolor sit amet
            </motion.h2>

            {/* Ground shadow ellipse (desktop composition only) */}
            <div
              aria-hidden
              className="absolute left-[52%] top-[88.1%] hidden h-[3.4%] w-[27.2%] -translate-x-1/2 lg:block"
            >
              <div
                data-video-shadow
                className="size-full rounded-[50%] bg-black/35 blur-2xl"
              />
            </div>

            {/* Bowl. Positioning and animation are on separate elements on
                purpose: GSAP writes the whole `transform`, so animating the
                same node would wipe the `-translate-x/y-1/2` centring and drop
                the cup into the corner. */}
            <div className="pointer-events-none relative mx-auto -my-4 h-[300px] w-[86%] sm:h-[360px] lg:absolute lg:left-[48.5%] lg:top-[62.3%] lg:mx-0 lg:h-[60.6%] lg:w-[33.5%] lg:-translate-x-1/2 lg:-translate-y-1/2">
              <div
                data-video-cup
                style={{ transformStyle: 'preserve-3d' }}
                className="relative size-full"
              >
                <Image
                  src="/img/bowl-hero-b.png"
                  alt="Açaí Bowl"
                  fill
                  sizes="(max-width: 1024px) 60vw, 34vw"
                  className="object-contain drop-shadow-[18px_24px_30px_rgba(0,0,0,0.45)] lg:object-fill lg:drop-shadow-[38px_44px_44px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>

            {/* Callout cards — a grid on phones, the Figma float from lg up.
                `lg:contents` drops the grid box so each card positions against
                the panel itself. */}
            <div className="relative grid gap-3 sm:grid-cols-2 sm:gap-4 lg:contents">
              {VIDEO_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  data-video-card
                  style={{
                    translateZ: 55 + i * 8,
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative z-10 flex flex-col gap-2 overflow-hidden rounded-2xl bg-gold-soft p-4 text-white lg:absolute lg:w-[27%] lg:gap-3 lg:rounded-3xl ${card.pos}`}
                >
                  <h3 className="font-display text-[clamp(0.95rem,4.2vw,1.15rem)] uppercase leading-[1.2] tracking-[-0.5px] lg:text-[clamp(0.6rem,1.6vw,1.5rem)]">
                    {card.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.3] tracking-[-0.5px] lg:text-[clamp(0.5rem,1.05vw,1rem)] lg:leading-[1.2]">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
