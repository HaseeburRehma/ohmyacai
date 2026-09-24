'use client';

import Image from 'next/image';
import { useCallback, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import PillButton from '@/components/ui/PillButton';
import { ORDER_URL } from '@/data/site';

/**
 * Figma: "Hero Section → Content" — 1440 × 898, bg #4d294e.
 *
 * The whole composition is authored against that 1440 × 898 frame and rendered
 * as a full-bleed, aspect-locked stage, so every element keeps its exact Figma
 * position at *any* viewport width — no dead bands at 1920, no reflow at 1280.
 * Type scales with the stage via container query units (`cqw`), clamped so it
 * stays readable once the layout stacks on phones.
 *
 * Depth: the stage is a 3D scene. Pointer position drives a small rotateX /
 * rotateY on the scene, and every layer sits at its own translateZ, so the
 * fruit, the cups and the copy separate with real perspective rather than a
 * flat 2D shift.
 */

type Fruit = {
  src: string;
  alt: string;
  /** left / top / width / height as % of the 1440 × 898 frame */
  l: number;
  t: number;
  w: number;
  h: number;
  /** px travelled over the hero's scroll */
  depth: number;
  /** z position in the 3D scene — larger = nearer the viewer */
  z: number;
  spin?: number;
  delay?: number;
};

const FRUIT: Fruit[] = [
  { src: '/img/fruit-strawberry.png', alt: '', l: 13.13, t: -14.37, w: 25, h: 42.09, depth: 190, z: 120, spin: -14, delay: 0.1 },
  { src: '/img/fruit-blueberry-lg.png', alt: '', l: 1.46, t: 25.95, w: 8.06, h: 12.81, depth: 120, z: 80, spin: 18, delay: 0.24 },
  { src: '/img/fruit-straw-slice-sm.png', alt: '', l: 50, t: 21.05, w: 6.94, h: 9.8, depth: 90, z: 40, spin: -20, delay: 0.3 },
  { src: '/img/fruit-mango.png', alt: '', l: 50, t: 53.79, w: 13.89, h: 19.93, depth: 210, z: 140, spin: 10, delay: 0.36 },
  { src: '/img/fruit-blackberry.png', alt: '', l: 83.82, t: 57.68, w: 6.94, h: 12.03, depth: 130, z: 90, spin: -16, delay: 0.42 },
  { src: '/img/fruit-pineapple.png', alt: '', l: 72.92, t: 69.71, w: 8.33, h: 15.26, depth: 170, z: 130, spin: 14, delay: 0.48 },
  { src: '/img/fruit-banana.png', alt: '', l: 5.49, t: 73.39, w: 7.64, h: 11.58, depth: 110, z: 70, spin: -12, delay: 0.54 },
  { src: '/img/fruit-blueberry-sm.png', alt: '', l: 40.83, t: 93.76, w: 5.21, h: 8.69, depth: 80, z: 30, spin: 22, delay: 0.6 },
];

const HEADLINE = ['Düsseldorfs', 'Beste'];

const SPRING = { stiffness: 110, damping: 20, mass: 0.6 } as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  /* Pointer → 3D scene rotation (−0.5 … 0.5 from the stage centre). */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [7, -7]), SPRING);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-5, 5]), SPRING);

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

  /* Scroll choreography. */
  const bowlY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate w-full overflow-hidden bg-plum"
    >
      {/* Aspect-locked, full-bleed stage. @container makes `cqw` track it. */}
      <div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="@container relative w-full [perspective:1600px] max-lg:min-h-[78svh] max-lg:pb-6 lg:aspect-[1440/898]"
      >
        {/* Radial glow — Figma "Ellipse 1" (516px circle at 847,191 + 405px
            blur), rebuilt as the gradient it resolves to when sampled. */}
        <div
          aria-hidden
          className="absolute left-[44.1%] top-[-2.34%] h-[104.7%] w-[65.3%] rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,255,255,0.33) 0%, rgba(255,255,255,0.24) 66%, rgba(255,255,255,0.10) 87%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* 3D scene ---------------------------------------------------- */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="pointer-events-none absolute inset-0"
        >
          {FRUIT.map((f) => (
            <FruitPiece key={f.src} fruit={f} progress={scrollYProgress} />
          ))}

          {/* Cup 1 — the branded mango cup, the taller one behind, tilted
              22.72° as in the artboard. object-contain so the cup keeps its
              950:1450 aspect inside the box instead of stretching. */}
          <motion.div
            style={{ y: bowlY, translateZ: 90, transformStyle: 'preserve-3d' }}
            /* Mobile: cup sits inside the right edge (right-[4%]) with a
               small gap, sized at 46% × 60% so it fills the space next to
               the CTA button instead of leaving an empty band beside it.
               bottom-[4%] hugs the marquee for a tight composition. */
            className="absolute left-[59.78%] top-[20.76%] h-[69.96%] w-[32.72%] max-lg:left-auto max-lg:right-[4%] max-lg:top-auto max-lg:bottom-[4%] max-lg:h-[46%] max-lg:w-[60%]"
          >
            <motion.div
              initial={{ opacity: 0, x: 60, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative size-full rotate-[8deg] lg:rotate-[22.72deg]"
            >
              <Image
                src="/img/panel/cup-1.png"
                alt="Açaí Bowl mit Erdbeere, Banane und Granola"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-contain drop-shadow-[4px_10px_30px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </motion.div>

          {/* Cup 2 — the branded açaí cup, the shorter one in front, tilted
              −15.17°. lg only; on phones just the single cup 1 reads. */}
          <motion.div
            style={{ y: bowlY, translateZ: 150, transformStyle: 'preserve-3d' }}
            className="absolute left-[55.17%] top-[24.55%] hidden h-[47.03%] w-[20.57%] lg:block"
          >
            <motion.div
              initial={{ opacity: 0, y: 70, rotate: -28 }}
              animate={{ opacity: 1, y: 0, rotate: -15.17 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
              className="relative size-full"
            >
              <Image
                src="/img/panel/cup-2.png"
                alt=""
                fill
                priority
                sizes="22vw"
                className="object-contain drop-shadow-[26px_30px_34px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copy — Figma: left 106 (7.36%), centred on the frame + 50px ---- */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="absolute left-6 top-[15%] z-10 w-[min(88%,516px)] sm:left-10 sm:top-[16%] lg:left-[7.36%] lg:top-1/2 lg:w-[35.83%] lg:-translate-y-[calc(50%-3.5cqw)]"
        >
          <div className="flex flex-col gap-[max(1.25rem,2.2cqw)]">
            <div className="flex flex-col gap-[max(0.75rem,1.1cqw)]">
              {/* Rating row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-2 gap-y-1"
              >
                <Image
                  src="/svg/hero-stars.svg"
                  alt="5 von 5 Sternen"
                  width={142}
                  height={24}
                  className="h-5 w-[118px] sm:h-6 sm:w-[142px] lg:h-[1.67cqw] lg:w-[9.86cqw]"
                />
                <p className="whitespace-nowrap text-[13px] tracking-[-0.5px] text-white sm:text-base lg:text-[clamp(0.875rem,1.111cqw,1.4rem)]">
                  100+ 5-Sterne-Bewertungen auf
                </p>
                <Image
                  src="/svg/hero-google.svg"
                  alt="Google"
                  width={71}
                  height={24}
                  className="h-5 w-[59px] sm:h-6 sm:w-[71px] lg:h-[1.67cqw] lg:w-[4.91cqw]"
                />
              </motion.div>

              {/* Headline — per-line mask reveal */}
              <h1 className="font-display text-[clamp(1.75rem,6.8vw,2.75rem)] uppercase leading-[1.1] text-white lg:text-[clamp(2.6rem,3.85cqw,4.8rem)]">
                <span className="sr-only">Düsseldorfs beste Açaí Bowls</span>
                {HEADLINE.map((line, i) => (
                  <span key={line} aria-hidden className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.95,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.12 + i * 0.09,
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Start Here badge — Figma: rotate −4.54°, #d4973c, radius 24 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.86, rotate: 6 }}
                animate={{ opacity: 1, scale: 1, rotate: -4.54 }}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.55,
                }}
                className="-mt-1 w-fit origin-left rounded-3xl bg-gold px-[15px] py-[5px]"
              >
                <p className="font-display whitespace-nowrap text-[clamp(1.6rem,6.4vw,2.6rem)] uppercase leading-[1.15] text-white lg:text-[clamp(2.5rem,3.75cqw,4.6rem)]">
                  Acai Bowls
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="text-[15px] tracking-[-0.5px] text-white sm:text-base lg:text-[clamp(0.875rem,1.111cqw,1.4rem)]"
              >
                Cremige Açaí Bowls aus echtem Püree, frische Toppings, jeden
                Tag frisch gemacht – mitten in Düsseldorf
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="w-fit"
            >
              <PillButton href={ORDER_URL} newTab>Jetzt bestellen</PillButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FruitPiece({
  fruit,
  progress,
}: {
  fruit: Fruit;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [0, -fruit.depth]);
  const rotate = useTransform(progress, [0, 1], [0, fruit.spin ?? 0]);

  return (
    <motion.div
      style={{
        y,
        rotate,
        translateZ: fruit.z,
        left: `${fruit.l}%`,
        top: `${fruit.t}%`,
        width: `${fruit.w}%`,
        height: `${fruit.h}%`,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        ease: [0.34, 1.56, 0.64, 1],
        delay: fruit.delay ?? 0,
      }}
      className="absolute hidden will-change-transform lg:block"
    >
      {/* gentle idle float, layered under the scroll + 3D transforms */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5 + (fruit.depth % 4),
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative size-full"
      >
        <Image
          src={fruit.src}
          alt={fruit.alt}
          fill
          sizes="20vw"
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
