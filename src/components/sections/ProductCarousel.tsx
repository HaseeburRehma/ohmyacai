'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SLIDES } from '@/data/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Figma: "Products" — five 720 × 898 panels laid out across 3600px inside a
 * 1440 viewport, i.e. exactly two panels in frame.
 *
 * On the web the section pins and the rail scrubs sideways with vertical
 * scroll. Each panel is exactly half the viewport wide, so two are in frame at
 * every width — the artboard's 2-up reading — rather than 2.7 at 1920, which
 * left a sliced third panel hanging off the edge.
 *
 * Each panel is a 3D card: it rotates on Y as it crosses the frame, so the
 * rail reads as depth rather than a flat filmstrip. The bowl stays centred —
 * only Z and a few px of Y move, never X, so nothing slides out of its panel.
 */
export default function ProductCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const railEl = rail.current;
      const rootEl = root.current;
      if (!railEl || !rootEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const distance = () => railEl.scrollWidth - window.innerWidth;

          const tween = gsap.to(railEl, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: rootEl,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          /* Depth lives on the artwork, not the panel: rotating or scaling
             the panels themselves opens white gaps between them, so they stay
             flush and edge-to-edge as in the artboard. The bowl rides forward
             on Z as its panel crosses the frame — Z and Y only, never X, so it
             cannot leave its panel, and its centre state is z:0 / y:0, exactly
             the Figma placement. */
          gsap.utils.toArray<HTMLElement>('[data-slide-art]').forEach((art) => {
            gsap.fromTo(
              art,
              { z: -70, y: 24 },
              {
                z: -70,
                y: 24,
                ease: 'none',
                immediateRender: false,
                keyframes: {
                  '0%': { z: -70, y: 24 },
                  '50%': { z: 0, y: 0 },
                  '100%': { z: -70, y: 24 },
                },
                scrollTrigger: {
                  trigger: art,
                  containerAnimation: tween,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              }
            );
          });

          return () => {
            tween.scrollTrigger?.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="menu"
      className="relative w-full overflow-hidden lg:h-[100svh] lg:max-h-[1000px] lg:min-h-[620px]"
      style={{ perspective: '1800px' }}
    >
      <div
        ref={rail}
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto lg:overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {SLIDES.map((slide, i) => (
          <Slide key={slide.title + i} slide={slide} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Slide({
  slide,
  index,
}: {
  slide: (typeof SLIDES)[number];
  index: number;
}) {
  return (
    <article
      /* A size container, so everything inside can be keyed to the panel's
         HEIGHT (cqh). The artboard panel is 720 x 898; this one is half the
         viewport wide by the viewport tall, so it gets wider on big screens
         without getting taller. Sizing by width (cqw) therefore grew the type
         and thinned the texture until the copy ran into the cup. Keyed to
         height, the vertical composition is Figma's at every width and the
         extra width is just more background. All values below are the Figma
         px divided by 898. */
      className="group relative h-[68svh] min-h-[440px] w-[86vw] shrink-0 snap-center overflow-hidden [container-type:size] sm:h-[74svh] sm:w-[68vw] lg:h-full lg:w-1/2"
      style={{ backgroundColor: slide.bg, transformStyle: 'preserve-3d' }}
    >
      {/* Berry texture over the lower half — Figma "Vector", 452 of 898.
          The product panel is the ONLY surface that carries it: the artboard
          also has a faint one on the cards, FAQ, footer and franchise bands,
          but it was dropped there by request so the texture stays a signature
          of this section.

          0.22 against the artboard's 0.28: measured on a texture-only crop the
          Figma weave has a mean alpha of 0.0476 and this sits at 0.0387, so it
          reads a touch lighter by request while keeping the same weight. */}
      <div
        aria-hidden
        className="berry-pattern absolute inset-x-0 bottom-0 h-[50.3%] [--pattern-opacity:0.22] [--pattern-size:6.793cqh_7.350cqh]"
      />

      {/* Bowl — Figma: pre-rotation box 623.5 × 831.3, centred at 50% / 53.36%.
          Driven by HEIGHT + the art's own aspect: a half-viewport panel is
          wider than the 720:898 artboard one, so a width percentage would
          stretch the cup as the screen widens. */}
      <div
        data-slide-art
        className="pointer-events-none absolute left-1/2 top-[53.36%] h-[92.58%] w-[86.6%] -translate-x-1/2 -translate-y-1/2 lg:aspect-[623.5/831.3] lg:w-auto"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          sizes="(max-width:1024px) 86vw, 46vw"
          className="rotate-[-3.11deg] object-contain transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />
      </div>

      {/* Copy — Figma: inset 22px, 608 wide, 16px eyebrow, 48px title */}
      <div className="absolute left-[max(1rem,2.45cqh)] top-[max(1rem,2.45cqh)] z-10 flex w-[min(86%,67.71cqh)] flex-col gap-[max(0.4rem,0.9cqh)] text-white">
        <p className="text-[clamp(0.8125rem,1.782cqh,1.25rem)] font-bold uppercase tracking-[-0.5px]">
          {slide.eyebrow}
        </p>
        <h3 className="font-display text-[clamp(1.5rem,5.345cqh,3.75rem)] uppercase leading-[1.2]">
          {slide.title}
        </h3>
        <p className="text-[clamp(0.8125rem,1.782cqh,1.25rem)] tracking-[-0.5px]">
          {slide.body}
        </p>
      </div>

      {/* Plus badge — Figma: 48px, top/right 22 */}
      <button
        type="button"
        aria-label={`More about ${slide.title}`}
        className="absolute right-[max(1rem,2.45cqh)] top-[max(1rem,2.45cqh)] z-10 grid size-[max(2.75rem,5.345cqh)] place-items-center rounded-full border border-ink bg-white transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] hover:rotate-90 hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="size-1/2" aria-hidden>
          <path
            d="M5 12h14M12 5v14"
            stroke="#111"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* CTA */}
      <a
        href="#menu"
        className="absolute bottom-[max(1rem,2.45cqh)] left-[max(1rem,2.45cqh)] z-10 inline-flex min-h-11 items-center rounded-full bg-ink px-[max(1.1rem,2.67cqh)] py-[max(0.6rem,1.34cqh)] transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-105"
      >
        <span className="font-display text-[clamp(1rem,2.673cqh,1.75rem)] uppercase leading-[1.2] tracking-[-0.5px] text-white">
          Get Now
        </span>
      </a>

      {/* index marker */}
      <span
        aria-hidden
        className="font-menu absolute bottom-[max(1.1rem,2.7cqh)] right-[max(1.1rem,2.9cqh)] z-10 text-[clamp(0.75rem,2cqh,1.4rem)] text-white/60"
      >
        0{index + 1} / 0{SLIDES.length}
      </span>
    </article>
  );
}
