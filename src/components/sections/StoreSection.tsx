"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InView } from "@/components/motion-primitives/in-view";
import PillButton from "@/components/ui/PillButton";

const HEADING = ['Besuch', 'Deinen Eigenen', 'Store'];

/**
 * Figma: "Image Section → Content" — 675 × 520 rounded-24 photo on the left,
 * 64px Phonk heading + body + "Get Directions" on the right, 32px gap.
 */
export default function StoreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="location"
      className="w-full bg-white px-6 py-20 sm:px-10 lg:px-[60px] lg:py-[160px]"
    >
      <div
        ref={ref}
        className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-8 lg:flex-row"
      >
        <InView
          variants={{
            hidden: { opacity: 0, x: -50, scale: 0.97 },
            visible: { opacity: 1, x: 0, scale: 1 },
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.2 }}
          /* Figma's 675px is 51.14% of the 1320 container, and the container
             is capped at 1320 — so the percentage is pixel-identical from
             1440 up and scales below it. A hard 675px instead left the text
             column less than its min-content between `lg` and ~1100 and
             pushed 45px of horizontal overflow onto the page. */
          className="w-full lg:w-[51.14%] lg:shrink-0"
        >
          <div className="relative aspect-[675/520] w-full overflow-hidden rounded-3xl">
            {/* Figma crops to the lower 58% of the source (image scaled to
                173.31% height, offset −73.32%) — object-bottom reproduces it. */}
            <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
              <Image
                src="/img/store.jpg"
                alt="Gäste bestellen an der Theke von Oh My Açaí"
                fill
                sizes="(max-width:1024px) 92vw, 675px"
                className="object-cover object-bottom"
              />
            </motion.div>
          </div>
        </InView>

        <div className="flex w-full flex-col gap-7">
          {/* The trigger sits on the h2, not on the lines. Each line starts
              translated 110% down, i.e. entirely outside its own
              `overflow-hidden` clip box — and IntersectionObserver clips a
              target's rect by its ancestors' overflow, so the line reported a
              zero-area intersection and `whileInView` on it could never fire:
              the heading never appeared at all. The h2 is never clipped, so it
              drives the reveal and staggers the lines through variants. */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="font-display text-[clamp(2.25rem,5.6vw,4rem)] uppercase leading-[1.2] text-ink"
          >
            <span className="sr-only">Besuch deinen eigenen Store</span>
            {HEADING.map((line) => (
              <span key={line} aria-hidden className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <InView
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <p className="max-w-[640px] text-base leading-[1.2] tracking-[-0.5px] text-ink">
              Bei Oh My Açaí steckt in jeder Bowl mehr als nur Obst. Wir mixen
              samtiges Açaí mit frischen Früchten und knusprigem Granola zu
              einem ausgewogenen, erfrischenden Erlebnis.
            </p>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
            className="w-fit"
          >
            <PillButton href="#location">Route anzeigen</PillButton>
          </InView>
        </div>
      </div>
    </section>
  );
}
