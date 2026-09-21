'use client';

import { motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';

type Section = { heading: string; body: string };

/**
 * Shared layout for the two legal pages (Impressum, Datenschutz). The body
 * strings can contain \n line breaks and simple "• " bullet lines — both are
 * preserved by rendering with `whitespace-pre-line`.
 */
export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <section className="w-full bg-white px-6 pb-24 pt-32 sm:px-10 lg:px-[60px] lg:pb-[140px] lg:pt-40">
      <div className="mx-auto w-full max-w-[860px]">
        <InView
          variants={{
            hidden: { opacity: 0, y: 34 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.4 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-mauve">
            {updated}
          </p>
          <h1 className="font-display mt-3 text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[1.1] tracking-[-0.5px] text-plum">
            {title}
          </h1>
        </InView>

        <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:gap-14">
          {sections.map((s, i) => (
            <InView
              key={s.heading}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.7,
                delay: Math.min(i * 0.04, 0.32),
                ease: [0.16, 1, 0.3, 1],
              }}
              viewOptions={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="font-display text-[clamp(1.2rem,2.6vw,1.6rem)] uppercase leading-[1.2] tracking-[-0.5px] text-plum">
                {s.heading}
              </motion.h2>
              <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.65] tracking-[-0.2px] text-ink/85">
                {s.body}
              </p>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
