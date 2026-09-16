'use client';

import { ScrollProgress } from '@/components/motion-primitives/scroll-progress';

/** Thin gold reading-progress bar pinned above the nav. */
export default function ScrollBar() {
  return (
    <ScrollProgress
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold"
      springOptions={{ stiffness: 160, damping: 26, restDelta: 0.001 }}
    />
  );
}
