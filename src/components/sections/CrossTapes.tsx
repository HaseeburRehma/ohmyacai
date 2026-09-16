'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MarqueeRow } from './Marquee';

/**
 * Figma: "Frame 40" — 1440 × 349. Two 1526px tapes crossing:
 * plum at rotate(9.43°) skewX(-1.17°), gold at rotate(170.57°) skewX(1.17°)
 * with scaleY(-1). Scroll adds a counter-rotation so the X opens as you pass.
 */
export default function CrossTapes() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const tilt = useTransform(scrollYProgress, [0, 1], [3.6, -3.6]);

  return (
    <div
      ref={ref}
      className="relative h-[220px] w-full overflow-hidden sm:h-[300px] lg:h-[349px]"
    >
      <motion.div
        style={{ rotate: tilt }}
        className="absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="w-full origin-center"
          style={{ transform: 'rotate(9.43deg) skewX(-1.17deg)' }}
        >
          <MarqueeRow tone="plum" speed={48} />
        </div>
      </motion.div>

      <motion.div
        style={{ rotate: useTransform(tilt, (v) => -v) }}
        className="absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="w-full origin-center"
          style={{ transform: 'rotate(170.57deg) skewX(1.17deg) scaleY(-1)' }}
        >
          <MarqueeRow tone="gold" speed={48} reverse />
        </div>
      </motion.div>
    </div>
  );
}
