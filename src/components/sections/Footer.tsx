'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { InView } from '@/components/motion-primitives/in-view';
import Scallop from '@/components/ui/Scallop';
import { CONTACT, FOOTER_PAGES, FOOTER_SOCIAL } from '@/data/site';

/**
 * Figma: "Footer - Desktop" — 1440 × 1011 plum panel with a scalloped top
 * edge, three link columns, a credit row, and the 212px Boldonse wordmark
 * cropped by the bottom of the frame.
 */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const markY = useTransform(scrollYProgress, [0, 1], [70, 0]);

  return (
    <footer ref={ref} className="relative w-full bg-white">
      <div className="relative z-10 -mb-px text-plum">
        <Scallop />
      </div>

      <div className="relative overflow-hidden bg-plum pt-6">
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-2 sm:px-10 lg:px-[60px]">
          {/* Logo + tagline ------------------------------------------- */}
          <InView
            variants={{ hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.35 }}
          >
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-start">
              {/* Footer badge links to the home page from any route; the
                  "Nach oben" scroller is the separate button in the credit row. */}
              <Link
                href="/"
                aria-label="Oh My Açaí — zur Startseite"
                className="block"
              >
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                >
                {/* The badge asset is the disc itself, edge to edge. The old
                    /img/logo.png was the same mark sitting in the middle of a
                    512px white square — the disc was 49% of it — so at 120px
                    the footer showed a big white circle with a 59px logo
                    floating inside it. */}
                <Image
                  src="/img/logo-badge.png"
                  alt="Oh My Açaí"
                  width={768}
                  height={768}
                  className="size-[120px] rounded-full object-contain drop-shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
                />
                </motion.div>
              </Link>

              <p className="font-display text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.2] tracking-[-1px] text-white lg:text-right">
                Mach jeden Açaí-Moment
                <br />
                zu einem bewussten
              </p>
            </div>
          </InView>

          {/* Link columns --------------------------------------------- */}
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 lg:mt-[120px]">
            <ul className="flex flex-col gap-[19px]">
              {FOOTER_PAGES.map((label, i) => (
                <FooterLink key={label} label={label} delay={i * 0.05} />
              ))}
            </ul>

            <div className="flex flex-col items-start gap-10 sm:items-center sm:text-center">
              <div className="flex flex-col gap-2 sm:items-center">
                <h3 className="font-display text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.2] tracking-[-1px] text-white">
                  Kontakt
                </h3>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-11 items-center text-base tracking-[-0.5px] text-mist transition-colors hover:text-gold"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="inline-flex min-h-11 items-center text-base tracking-[-0.5px] text-mist transition-colors hover:text-gold"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <div className="flex flex-col gap-2 sm:items-center">
                <h3 className="font-display text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.2] tracking-[-1px] text-white">
                  Oh My Acai
                </h3>
                <address className="text-base not-italic leading-[1.2] tracking-[-0.5px] text-mist">
                  {CONTACT.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>

            <ul className="flex flex-col gap-[19px] sm:items-end">
              {FOOTER_SOCIAL.map((item, i) => (
                <FooterLink
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  external
                  delay={i * 0.05}
                />
              ))}
            </ul>
          </div>

          {/* Credit row ------------------------------------------------ */}
          <div className="relative mt-16 lg:mt-20">
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-0 block h-px origin-left bg-white/25"
            />
            <div className="flex flex-col items-center gap-3 pt-6 text-base tracking-[-0.5px] text-white/80 sm:flex-row sm:justify-between">
              <p>© 2026 Oh My Açaí. Alle Rechte vorbehalten.</p>
              <a
                href="/impressum"
                className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
              >
                Datenschutz
              </a>
              <button
                type="button"
                onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}
                className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
              >
                Nach oben
              </button>
            </div>
          </div>
        </div>

        {/* Cropped wordmark ------------------------------------------- */}
        <div className="relative mt-8 h-[clamp(52px,9.9vw,142px)] overflow-hidden">
          {/* Figma: Boldonse 212.35px / tracking −9.95px, baseline cropped */}
          <motion.p
            style={{ y: markY }}
            aria-hidden
            className="absolute inset-x-0 top-[15%] whitespace-nowrap text-center uppercase text-white"
          >
            <span
              className="inline-block leading-none"
              style={{
                fontFamily: 'var(--font-boldonse), system-ui',
                fontSize: 'clamp(3.9rem,14.75vw,13.27rem)',
                letterSpacing: '-0.047em',
              }}
            >
              OH MY Acai
            </span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

function FooterLink({
  label,
  delay,
  href = '#',
  external = false,
}: {
  label: string;
  delay: number;
  href?: string;
  external?: boolean;
}) {
  return (
    <li>
      <motion.a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={external ? `${label} — in neuem Tab öffnen` : label}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        /* padding on the anchor keeps the tap target ≥44px; the clip box is a
           child so it can stay exactly one line tall */
        className="font-display inline-flex min-h-11 items-center py-1.5 text-[clamp(1.4rem,3.2vw,2rem)] leading-[1.2] tracking-[-1px] outline-none"
      >
        <span className="block h-[1.2em] overflow-hidden">
        <motion.span
          variants={{ rest: { y: 0 }, hover: { y: '-50%' } }}
          transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          <span className="block text-white">{label}</span>
          <span aria-hidden className="block text-gold">
            {label}
          </span>
        </motion.span>
        </span>
      </motion.a>
    </li>
  );
}
