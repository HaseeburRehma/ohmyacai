'use client';

import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import Tilt3D from '@/components/ui/Tilt3D';
import BurstBadge from '@/components/ui/BurstBadge';
import { VALUE_CARDS } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Figma: "Cards Section" — three 413 × 359 rounded-32 cards, 40px gap,
 * each with a rotated starburst badge overhanging the top-left corner.
 *
 * The artboard pins the copy at fixed percentages inside a fixed-aspect box.
 * That only works while the card is wide: on a phone the same box is ~300px
 * tall and the copy ends up floating in the middle with dead space under it.
 * So below `md` the card sizes to its content with ordinary padding, and the
 * Figma geometry takes over from `md` up.
 */
export default function ValueCards() {
  return (
    <section
      id="about"
      className="w-full bg-white px-6 py-24 sm:px-10 lg:px-[60px] lg:py-[160px]"
    >
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-16 md:grid-cols-3 md:gap-10">
        {VALUE_CARDS.map((card, i) => (
          <InView
            key={card.n}
            variants={{
              hidden: { opacity: 0, y: 64 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.9,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewOptions={{ once: true, amount: 0.25 }}
          >
            <Tilt3D max={7} scale={1.02}>
              <div
                style={{ transformStyle: 'preserve-3d' }}
                className={cn(
                  'relative flex w-full flex-col justify-center gap-4 overflow-visible rounded-[32px] px-6 pb-8 pt-16',
                  'md:block md:aspect-[413/359] md:gap-0 md:p-0',
                  card.bg
                )}
              >
                {/* Starburst badge — Figma: 98 × 95, rotate −160°, top −50 */}
                <motion.div
                  initial={{ rotate: -200, scale: 0.6, opacity: 0 }}
                  whileInView={{ rotate: -160, scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + i * 0.12,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  style={{ translateZ: 70, transformStyle: 'preserve-3d' }}
                  className="absolute -top-[13.9%] left-0 size-[23.7%]"
                >
                  <div className="relative size-full">
                    <BurstBadge fill={card.badge} />
                    <span
                      className="font-menu absolute inset-0 grid place-items-center text-[clamp(1.25rem,2.9vw,2.5rem)] leading-none tracking-[-1px] text-white"
                      style={{ transform: 'rotate(160deg)' }}
                    >
                      {card.n}
                    </span>
                  </div>
                </motion.div>

                {/* Copy */}
                <div
                  style={{ transform: 'translateZ(34px)' }}
                  className="relative flex flex-col md:absolute md:inset-x-[4.8%] md:top-[28%]"
                >
                  <h3 className="font-display whitespace-pre-line text-[clamp(1.25rem,4.6vw,1.5rem)] uppercase leading-[1.2] tracking-[-0.5px] text-white md:text-[clamp(1rem,1.8vw,1.5rem)]">
                    {card.title}
                  </h3>
                </div>
                <p
                  style={{ transform: 'translateZ(22px)' }}
                  className="relative text-[0.95rem] leading-[1.35] tracking-[-0.5px] text-white md:absolute md:inset-x-[4.8%] md:top-[60%] md:text-[clamp(0.8rem,1.15vw,1rem)] md:leading-[1.2]"
                >
                  {card.body}
                </p>
              </div>
            </Tilt3D>
          </InView>
        ))}
      </div>
    </section>
  );
}
