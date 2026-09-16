'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis owns the scroll; ScrollTrigger is updated on every Lenis frame so the
 * pinned product rail stays in sync with the smoothing.
 *
 * Lenis runs its own RAF (`autoRaf` defaults to true). An earlier version drove
 * it from the GSAP ticker with `autoRaf: false` — which is the documented
 * integration, but it makes scrolling depend on that one ticker callback: if
 * the instance isn't there when the callback is wired up, Lenis swallows wheel
 * events and never advances, and the page simply cannot scroll. Letting Lenis
 * drive itself removes that failure mode entirely, and `lagSmoothing(0)` keeps
 * GSAP from fighting it after a dropped frame.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        smoothWheel: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

/** Keeps ScrollTrigger's scroll position in step with Lenis, frame for frame. */
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}
