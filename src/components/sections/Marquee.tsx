'use client';

import Image from 'next/image';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { MARQUEE_WORDS } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Figma: "Section" — 1440 × 100, bg #d4973c, 21px vertical padding,
 * 48px Phonk uppercase items separated by a 28 × 32 berry glyph, gap 32.
 */
export function MarqueeRow({
  className,
  reverse = false,
  speed = 62,
  tone = 'gold',
}: {
  className?: string;
  reverse?: boolean;
  speed?: number;
  tone?: 'gold' | 'plum';
}) {
  return (
    <div
      className={cn(
        'flex h-[100px] items-center overflow-hidden py-[21px]',
        tone === 'gold' ? 'bg-gold' : 'bg-plum',
        className
      )}
    >
      <InfiniteSlider gap={32} speed={speed} speedOnHover={22} reverse={reverse}>
        {MARQUEE_WORDS.map((word) => (
          <div key={word} className="flex items-center gap-8">
            <Image
              src="/svg/berry.svg"
              alt=""
              width={28}
              height={32}
              className="h-8 w-7 shrink-0"
            />
            <span className="font-display whitespace-nowrap text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[1.2] tracking-[-0.5px] text-white">
              {word}
            </span>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}

export default function Marquee() {
  return <MarqueeRow />;
}
