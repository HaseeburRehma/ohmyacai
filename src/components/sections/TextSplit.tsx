'use client';

import Image from 'next/image';
import { InView } from '@/components/motion-primitives/in-view';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Copy block for the content pages: an H2 with an optional gold/mauve
 * accent, paragraphs, an optional bullet list, and an optional image on
 * either side. Stacks to one column below lg.
 */
export default function TextSplit({
  title,
  accent,
  paragraphs,
  bullets,
  image,
  imageLeft = false,
  tone = 'white',
  children,
}: {
  title: string;
  accent?: string;
  paragraphs: string[];
  bullets?: { title: string; body: string }[];
  image?: { src: string; alt: string; position?: string };
  imageLeft?: boolean;
  tone?: 'white' | 'cream';
  children?: React.ReactNode;
}) {
  const [before, after] = accent ? title.split(accent) : [title, ''];

  return (
    <section className={`w-full px-6 py-16 sm:px-10 lg:px-[60px] lg:py-[110px] ${tone === 'cream' ? 'bg-[#f7f3f7]' : 'bg-white'}`}>
      <div className={`mx-auto grid w-full items-center gap-10 ${image ? 'max-w-[1220px] lg:grid-cols-2 lg:gap-16' : 'max-w-[860px]'}`}>
        <InView
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: EASE }}
          viewOptions={{ once: true, amount: 0.2 }}
          className={`flex min-w-0 flex-col gap-5 ${image && imageLeft ? 'lg:order-2' : ''}`}
        >
          <h2 className="font-display text-balance text-[clamp(1.6rem,4.6vw,3rem)] uppercase leading-[1.1] tracking-[-0.5px] text-ink">
            {before}
            {accent && <span className="text-mauve">{accent}</span>}
            {after}
          </h2>
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-[1.6] tracking-[-0.3px] text-ink/80 sm:text-[17px]">
              {p}
            </p>
          ))}
          {bullets && (
            <ul className="mt-1 flex flex-col gap-4">
              {bullets.map((b, i) => (
                <InView
                  as="li"
                  key={b.title}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
                  viewOptions={{ once: true, amount: 0.5 }}
                  className="flex gap-4"
                >
                  <span aria-hidden className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-plum text-[13px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-bold text-plum">{b.title}</span>
                    <span className="block text-[15px] leading-[1.5] text-ink/75">{b.body}</span>
                  </span>
                </InView>
              ))}
            </ul>
          )}
          {children && <div className="mt-2 flex flex-wrap gap-3">{children}</div>}
        </InView>

        {image && (
          <InView
            variants={{ hidden: { opacity: 0, scale: 0.95, y: 30 }, visible: { opacity: 1, scale: 1, y: 0 } }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            viewOptions={{ once: true, amount: 0.2 }}
            className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl ${imageLeft ? 'lg:order-1' : ''}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width:1024px) 92vw, 580px"
              className="object-cover"
              style={{ objectPosition: image.position ?? 'center' }}
            />
          </InView>
        )}
      </div>
    </section>
  );
}
