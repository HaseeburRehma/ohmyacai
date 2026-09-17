'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InView } from '@/components/motion-primitives/in-view';
import Scallop from '@/components/ui/Scallop';
import { FAQS } from '@/data/site';

/**
 * Figma: "FAQ Section → Content" — plum panel with a scalloped bottom edge,
 * 64px Phonk title, and white rounded-32 rows. Row 1 is open in the artboard;
 * the arrow points up when open, down when closed.
 */
export default function Faq({
  items = FAQS,
  title = 'Frequently Asked Questions',
}: {
  items?: { q: string; a: string }[];
  title?: string;
} = {}) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative w-full bg-white">
      <div className="relative bg-plum px-6 pb-4 pt-20 sm:px-10 lg:px-[60px] lg:pb-6 lg:pt-[160px]">
        <div className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <InView
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewOptions={{ once: true, amount: 0.2 }}
            >
              <h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[1.2] text-white">
                {title}
              </h2>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewOptions={{ once: true, amount: 0.3 }}
            >
              <p className="text-base tracking-[-0.5px] text-white">
                Everything you need to know before&nbsp; your first Oh My Açaí
                bowl.
              </p>
            </InView>
          </div>

          <div className="flex flex-col gap-6">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <InView
                  key={item.q}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewOptions={{ once: true, amount: 0.35 }}
                >
                  <div className="overflow-hidden rounded-[32px] bg-white">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-center justify-between gap-6 px-6 py-7 text-left outline-none focus-visible:ring-4 focus-visible:ring-gold/60 sm:px-10"
                      >
                        <span className="font-display text-[clamp(1.125rem,2.6vw,2rem)] leading-[1.2] tracking-[0.5px] text-plum">
                          {item.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 0 : 180 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="shrink-0"
                        >
                          <svg
                            viewBox="0 0 32 32"
                            className="size-7 text-mauve sm:size-8"
                            aria-hidden
                          >
                            <path
                              d="M16 27V5M16 5l-9 9M16 5l9 9"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.3 },
                          }}
                        >
                          <p className="px-6 pb-8 text-base leading-[1.35] tracking-[-0.5px] text-ink sm:px-10">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </InView>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative -mt-px text-plum">
        <Scallop flip />
      </div>
    </section>
  );
}
