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
              <Tilt3D max={8} scale={1.03} className="aspect-[315/340] w-full">
                {/* Figma "Meet Our Bowls" (4128:160): flat colour card + berry
                    texture, the branded cup bleeding up from the bottom with
                    its toppings showing, and the name top-left. */}
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  style={
                    {
                      backgroundColor: bowl.color,
                      '--berry-opacity': 0.1,
                      '--berry-fade': 1,
                    } as React.CSSProperties
                  }
                  className="@container berry-vectors relative size-full overflow-hidden rounded-3xl"
                >
                  <h3 className="font-display absolute left-[6.35%] right-[6.35%] top-[6.35%] z-10 text-[clamp(0.9rem,7.62cqw,1.5rem)] uppercase leading-[1.1] tracking-[-0.5px] text-white">
                    {bowl.name}
                  </h3>

                  {/* The cup sits in the region below the title and is fit with
                      object-contain, so the whole cup — base included — stays
                      inside the card at every width instead of bleeding off
                      the bottom edge. */}
                  <motion.div
                    variants={{
                      rest: { y: 0, scale: 1 },
                      hover: { y: -8, scale: 1.04 },
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-none absolute inset-x-[8%] bottom-[5%] top-[32%]"
                  >
                    <Image
                      src={bowl.image}
                      alt={bowl.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                      className="object-contain object-bottom drop-shadow-[6px_14px_22px_rgba(0,0,0,0.28)]"
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
