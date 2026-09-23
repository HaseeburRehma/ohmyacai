'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SLIDES, ORDER_URL } from '@/data/site';

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

/** sRGB relative luminance of a #rrggbb colour (WCAG). */
function luminance(hex: string) {
  const ch = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function Slide({
  slide,
  index,
}: {
  slide: (typeof SLIDES)[number];
  index: number;
}) {
  /* The 4183 artboard draws white copy on every panel, but its beige panel
     (#d0c1b0) leaves that at ~1.5:1 — unreadable. Only that panel is light
     enough to flip: gold is 0.42, olive 0.35, brown 0.11, beige 0.55, so the
     0.5 threshold catches beige alone and leaves the four dark panels white,
     exactly as Figma draws them. */
  const onLight = luminance(slide.color) > 0.5;

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
      /* The Figma panel artwork carries the flat colour AND the berry
         texture with its fade. `auto 100%` scales it by HEIGHT so the texture
         keeps its true scale and the fade line stays at the halfway mark, and
         it repeats across the extra width of a panel wider than the 720px
         artboard — seamlessly, because the file is cropped to a whole number
         of the texture's 61px periods. */
      style={{
        backgroundColor: slide.color,
        backgroundImage: `url('${slide.bg}')`,
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'left top',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Cup — object-contain in a region between the title and the CTA.
          On mobile the region is tighter (inset-x-[18%] top-[42%]
          bottom-[16%]) so the cup reads at ~55% of the card instead of
          swallowing every pixel of copy on a 360-px Galaxy A55. From lg
          the Figma placement takes over (inset-x-8 / top-25 / bottom-4). */}
      <div
        data-slide-art
        className="pointer-events-none absolute inset-x-[18%] bottom-[16%] top-[42%] lg:inset-x-[8%] lg:bottom-[4%] lg:top-[25%]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          sizes="(max-width:1024px) 50vw, 46vw"
          className="rotate-[-7.11deg] object-contain object-bottom drop-shadow-[10px_18px_28px_rgba(0,0,0,0.28)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />
      </div>

      {/* Copy — Figma: inset 22px, 608 wide, 16px eyebrow, 48px title */}
      <div className={`absolute left-[max(1rem,2.45cqh)] top-[max(1rem,2.45cqh)] z-10 flex w-[min(86%,67.71cqh)] flex-col gap-[max(0.4rem,0.9cqh)] ${onLight ? 'text-ink' : 'text-white'}`}>
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
        aria-label={`Mehr über ${slide.title}`}
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
        href={ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-[max(1rem,2.45cqh)] left-[max(1rem,2.45cqh)] z-10 inline-flex min-h-11 items-center rounded-full bg-ink px-[max(1.1rem,2.67cqh)] py-[max(0.6rem,1.34cqh)] transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-105"
      >
        <span className="font-display text-[clamp(1rem,2.673cqh,1.75rem)] uppercase leading-[1.2] tracking-[-0.5px] text-white">
          Jetzt holen
        </span>
      </a>

      {/* index marker */}
      <span
        aria-hidden
        className={`font-menu absolute bottom-[max(1.1rem,2.7cqh)] right-[max(1.1rem,2.9cqh)] z-10 text-[clamp(0.75rem,2cqh,1.4rem)] ${onLight ? 'text-ink/60' : 'text-white/60'}`}
      >
        0{index + 1} / 0{SLIDES.length}
      </span>
    </article>
  );
}
