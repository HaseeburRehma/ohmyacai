'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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
  const active = useMobileSlider(root, rail);

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
        className="no-scrollbar flex h-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[7vw] py-6 sm:gap-4 sm:px-[16vw] lg:gap-0 lg:overflow-visible lg:p-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {SLIDES.map((slide, i) => (
          <Slide key={slide.title + i} slide={slide} index={i} />
        ))}
      </div>

      {/* Mobile pagination — tap to jump, reflects the centred card. */}
      <div className="flex items-center justify-center gap-2 py-4 pb-6 lg:hidden">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`${s.title} anzeigen`}
            aria-current={i === active}
            onClick={() => scrollToSlide(rail.current, i)}
            className={`h-2 rounded-full relative before:absolute before:inset-x-[-4px] before:inset-y-[-14px] before:content-[''] transition-all duration-300 ${
              i === active ? 'w-7 bg-plum' : 'w-2 bg-plum/25'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function scrollToSlide(railEl: HTMLDivElement | null, i: number) {
  const card = railEl?.children[i] as HTMLElement | undefined;
  if (!railEl || !card) return;
  railEl.scrollTo({
    left: card.offsetLeft - (railEl.clientWidth - card.clientWidth) / 2,
    behavior: 'smooth',
  });
}

/**
 * Below lg the rail is a native swipe slider. This adds the "slider" feel on
 * top of native scrolling (so swipe stays 60fps and accessible):
 *  - off-centre cards scale down and dim, driven by their distance from the
 *    rail centre on every scroll frame;
 *  - auto-advance every 4.5 s with a smooth scroll, paused while the user is
 *    touching, for 6 s after any interaction, while the section is off
 *    screen, and entirely under prefers-reduced-motion;
 *  - returns the centred index for the pagination dots.
 * At lg the desktop GSAP rail takes over and every inline style is cleared.
 */
function useMobileSlider(
  root: React.RefObject<HTMLElement | null>,
  rail: React.RefObject<HTMLDivElement | null>
) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const railEl = rail.current;
    const rootEl = root.current;
    if (!railEl || !rootEl) return;

    const mq = window.matchMedia('(max-width: 1023px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cards = Array.from(railEl.children) as HTMLElement[];
    let raf = 0;
    let timer: number | undefined;
    let pausedUntil = 0;
    let touching = false;
    let inView = false;
    let current = 0;

    const paint = () => {
      raf = 0;
      if (!mq.matches) return;
      const centre = railEl.scrollLeft + railEl.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      cards.forEach((card, i) => {
        const mid = card.offsetLeft + card.clientWidth / 2;
        const d = Math.min(Math.abs(mid - centre) / card.clientWidth, 1);
        if (d < bestD) { bestD = d; best = i; }
        card.style.transform = `scale(${1 - d * 0.08})`;
        card.style.opacity = String(1 - d * 0.35);
      });
      if (best !== current) { current = best; setActive(best); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };

    const clear = () => cards.forEach((c) => { c.style.transform = ''; c.style.opacity = ''; });

    const tick = () => {
      if (mq.matches && inView && !touching && !reduce.matches && Date.now() > pausedUntil) {
        scrollToSlide(railEl, (current + 1) % cards.length);
      }
      timer = window.setTimeout(tick, 4500);
    };

    const hold = () => { pausedUntil = Date.now() + 6000; };
    const onTouchStart = () => { touching = true; hold(); };
    const onTouchEnd = () => { touching = false; hold(); };
    const onMq = () => { if (mq.matches) paint(); else clear(); };

    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(rootEl);

    railEl.addEventListener('scroll', onScroll, { passive: true });
    railEl.addEventListener('touchstart', onTouchStart, { passive: true });
    railEl.addEventListener('touchend', onTouchEnd, { passive: true });
    railEl.addEventListener('pointerdown', hold, { passive: true });
    window.addEventListener('resize', onScroll);
    mq.addEventListener('change', onMq);
    paint();
    timer = window.setTimeout(tick, 4500);

    return () => {
      io.disconnect();
      railEl.removeEventListener('scroll', onScroll);
      railEl.removeEventListener('touchstart', onTouchStart);
      railEl.removeEventListener('touchend', onTouchEnd);
      railEl.removeEventListener('pointerdown', hold);
      window.removeEventListener('resize', onScroll);
      mq.removeEventListener('change', onMq);
      if (raf) cancelAnimationFrame(raf);
      if (timer !== undefined) window.clearTimeout(timer);
      clear();
    };
  }, [root, rail]);

  return active;
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
      className="group relative h-[68svh] min-h-[440px] w-[86vw] shrink-0 snap-center snap-always overflow-hidden rounded-3xl shadow-[0_16px_36px_-18px_rgba(0,0,0,0.45)] will-change-transform [container-type:size] sm:h-[74svh] sm:w-[68vw] lg:h-full lg:w-1/2 lg:rounded-none lg:shadow-none"
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
          On mobile the cup sits at roughly two-thirds of the card
          (inset-x-[12%] top-[36%] bottom-[14%]) — a touch bigger than
          before so the bowl reads clearly, and clear of the copy area
          up top and the CTA at the bottom. From lg the Figma placement
          takes over (inset-x-8 / top-25 / bottom-4). */}
      <div
        data-slide-art
        className="pointer-events-none absolute inset-x-[12%] bottom-[14%] top-[36%] lg:inset-x-[8%] lg:bottom-[4%] lg:top-[25%]"
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

      {/* Copy — Figma: inset 22px, 608 wide, 16px eyebrow, 48px title.
          Column shrinks on mobile so long titles like ERDNUSSBUTTER never
          overrun the right-edge plus badge, and the h3 hyphenates at word
          boundaries if it does need to wrap. */}
      <div className={`absolute left-[max(1rem,2.45cqh)] top-[max(1rem,2.45cqh)] z-10 flex w-[min(72%,67.71cqh)] flex-col gap-[max(0.4rem,0.9cqh)] ${onLight ? 'text-ink' : 'text-white'}`}>
        <p className="text-[clamp(0.75rem,1.782cqh,1.25rem)] font-bold uppercase tracking-[-0.5px]">
          {slide.eyebrow}
        </p>
        <h3 className="font-display text-[clamp(1.15rem,4.6cqh,3.5rem)] uppercase leading-[1.1] [hyphens:auto] [overflow-wrap:break-word]">
          {slide.title}
        </h3>
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
