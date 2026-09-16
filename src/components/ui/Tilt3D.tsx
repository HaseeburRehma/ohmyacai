'use client';

import { useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * A real 3D tilt: perspective lives on the wrapper and the tilting plane keeps
 * `transform-style: preserve-3d`, so descendants can sit at their own
 * `translateZ` and genuinely lift out of the card.
 *
 * motion-primitives' `Tilt` bakes `perspective()` into the element's own
 * transform, which flattens its children — fine for a flat card, not for the
 * layered depth this design wants.
 */
export default function Tilt3D({
  children,
  className,
  innerClassName,
  max = 9,
  scale = 1,
  perspective = 1100,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** peak rotation in degrees at the edges */
  max?: number;
  /** scale applied while pointing at it */
  scale?: number;
  perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const active = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.5 } as const;
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const s = useSpring(useTransform(active, [0, 1], [1, scale]), spring);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
      active.set(1);
    },
    [px, py, active]
  );

  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
    active.set(0);
  }, [px, py, active]);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn('relative', className)}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        style={{ rotateX, rotateY, scale: s, transformStyle: 'preserve-3d' }}
        className={cn('relative size-full', innerClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
}
