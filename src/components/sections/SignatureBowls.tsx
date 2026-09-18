'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import Tilt3D from '@/components/ui/Tilt3D';
import Scallop from '@/components/ui/Scallop';
import { BOWLS } from '@/data/site';

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
      <Tilt3D max={8} scale={1.02} className="aspect-[424/539] w-full">
      <motion.a
        href="#menu"
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        style={{ transformStyle: 'preserve-3d' }}
        className="group relative block size-full overflow-hidden rounded-3xl bg-white outline-none focus-visible:ring-4 focus-visible:ring-plum/40"
      >
        {/* Bowl artwork — Figma: rotate 2.6°, centred at 50% / 50% − 73.58 */}
        <motion.div
          variants={{
            rest: { scale: 1, y: 0, z: 0 },
            hover: { scale: 1.06, y: -10, z: 55 },
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="pointer-events-none absolute left-1/2 top-[38%] h-[82%] w-[86%] -translate-x-1/2 -translate-y-1/2"
        >
          {/* object-contain, not object-fill: the branded cups have a fixed
              950:1450 aspect and must not be stretched to the card box. */}
          <Image
            src={bowl.image}
            alt={bowl.name}
            fill
            sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 424px"
            className="rotate-[2.6deg] object-contain drop-shadow-[6px_14px_22px_rgba(0,0,0,0.16)]"
          />
        </motion.div>

        {/* Rating */}
        <div className="absolute inset-x-6 top-6 flex items-center justify-end gap-1.5">
          <span className="font-menu text-xl leading-6 tracking-[-0.5px] text-plum">
            {bowl.rating}
          </span>
          <Image
            src="/svg/card-star.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
        </div>

        {/* Title */}
        <h3 className="font-menu absolute left-6 top-[80.9%] text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-1px] text-plum">
          {bowl.name}
        </h3>

        {/* Price + secondary CTA */}
        <div className="absolute inset-x-6 bottom-[4.4%] flex items-end justify-between">
          <span className="font-menu text-[26px] leading-[31.2px] tracking-[-0.5px] text-plum">
            {bowl.price}
          </span>

          <span className="flex items-center gap-1.5">
            <span className="flex h-6 flex-col overflow-hidden">
              <motion.span
                className="flex flex-col"
                variants={{ rest: { y: 0 }, hover: { y: -24 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-menu block whitespace-nowrap text-xl leading-6 tracking-[-0.5px] text-mauve">
                  Diese Bowl holen
                </span>
                <span
                  aria-hidden
                  className="font-menu block whitespace-nowrap text-xl leading-6 tracking-[-0.5px] text-mauve"
                >
                  Diese Bowl holen
                </span>
              </motion.span>
            </span>
            <motion.span
              variants={{ rest: { x: 0 }, hover: { x: 5 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <Image
                src="/svg/card-arrow.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
            </motion.span>
          </span>
        </div>
      </motion.a>
      </Tilt3D>
    </InView>
  );
}
