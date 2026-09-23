'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import Tilt3D from '@/components/ui/Tilt3D';
import { FRANCHISE_BOWLS, FRANCHISE_BOWLS_HEAD } from '@/data/site';

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
              <Tilt3D max={7} scale={1.02} className="aspect-[315/340] w-full">
                {/* Figma "Meet Our Bowls": solid colour card, two-line white
                    title top-left, and the bowl photo filling the bottom
                    two thirds. Toppings-forward crop (object-position:top)
                    keeps the strawberries + granola visible on every width
                    so every card reads the same. */}
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  style={{ backgroundColor: bowl.color } as React.CSSProperties}
                  className="@container relative size-full overflow-hidden rounded-3xl shadow-[0_10px_28px_-12px_rgba(0,0,0,0.35)]"
                >
                  <h3 className="font-display absolute left-[7%] right-[7%] top-[7%] z-10 text-[clamp(1rem,7.4cqw,1.6rem)] uppercase leading-[1.05] tracking-[-0.5px] text-white">
                    {bowl.name}
                  </h3>

                  <motion.div
                    variants={{ rest: { y: 0, scale: 1 }, hover: { y: -6, scale: 1.05 } }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%]"
                  >
                    <Image
                      src={bowl.image}
                      alt={bowl.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                      className="object-cover [object-position:center_top] drop-shadow-[6px_14px_22px_rgba(0,0,0,0.28)]"
                    />
                  </motion.div>
                </motion.div>
              </Tilt3D>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
