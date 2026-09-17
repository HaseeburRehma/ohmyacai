'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import Tilt3D from '@/components/ui/Tilt3D';
import { FRANCHISE_BOWLS, FRANCHISE_BOWLS_HEAD } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Figma: "Meet Our Bowls" (4128:160) — a centred two-tone heading over four
 * 315 × 340 rounded-24 cards. Each card carries the berry texture, a bowl
 * that overhangs the top edge by 40px, and its name at the bottom.
 */
export default function FranchiseBowls() {
  return (
    <section
      id="bowls"
      className="w-full bg-white px-6 py-20 sm:px-10 lg:px-[60px] lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Head ------------------------------------------------------- */}
        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
          <InView
            variants={{
              hidden: { opacity: 0, y: 34 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] uppercase leading-[1.2] tracking-[-0.5px] text-plum">
              {FRANCHISE_BOWLS_HEAD.titleBefore}
              <span className="text-gold">
                {FRANCHISE_BOWLS_HEAD.titleAccent}
              </span>
            </h2>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <p className="text-base leading-[1.35] tracking-[-0.5px] text-ink">
              {FRANCHISE_BOWLS_HEAD.body}
            </p>
          </InView>
        </div>

        {/* Cards ------------------------------------------------------ */}
        <div className="mt-24 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-[108px] lg:grid-cols-4">
          {FRANCHISE_BOWLS.map((bowl, i) => (
            <InView
              key={bowl.name}
              variants={{
                hidden: { opacity: 0, y: 56 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.85,
                delay: (i % 4) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, amount: 0.3 }}
            >
              <Tilt3D max={8} scale={1.03} className="aspect-[315/340] w-full">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  /* `--berry-*` tune the vectors for a card: stronger than the
                     3% the big plum bands use, and with the fade switched off,
                     because a 315 x 340 card is too small for a gradient to
                     read and at 3% the texture vanishes on the gold one. */
                  style={
                    {
                      transformStyle: 'preserve-3d',
                      '--berry-opacity': 0.1,
                      '--berry-fade': 1,
                    } as React.CSSProperties
                  }
                  className={cn(
                    'berry-vectors relative size-full overflow-hidden rounded-3xl',
                    bowl.bg
                  )}
                >
                  {/* Bowl — Figma: 236 × 314, centred, top −40 */}
                  <motion.div
                    variants={{
                      rest: { y: 0, z: 0, scale: 1 },
                      hover: { y: -12, z: 60, scale: 1.05 },
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="pointer-events-none absolute left-1/2 top-[-15%] h-[104%] w-[86%] -translate-x-1/2"
                  >
                    <Image
                      src={bowl.image}
                      alt={bowl.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 315px"
                      className="object-contain"
                    />
                  </motion.div>

                  <h3
                    style={{ transform: 'translateZ(30px)' }}
                    className="font-display absolute inset-x-[6.35%] bottom-[8%] text-[clamp(1.1rem,2vw,1.5rem)] uppercase leading-[1.25] tracking-[-0.5px] text-white"
                  >
                    {bowl.name}
                  </h3>
                </motion.div>
              </Tilt3D>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
