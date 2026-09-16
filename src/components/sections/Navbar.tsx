'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ANNOUNCEMENT, NAV_LINKS } from '@/data/site';
import PillButton from '@/components/ui/PillButton';
import { cn } from '@/lib/utils';

/**
 * Figma: "Nav - Desktop 1" — a 32px gold announcement strip above a 70px
 * white bar (links left, logo centred, ORDER NOW right).
 * Behaviour added on top of the static frame: the strip is dismissible, and
 * the bar detaches into a floating pill once the hero is scrolled past.
 */
export default function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  /* Detach into a pill past the hero, and get out of the way while the
     reader is moving down — the pinned product rail needs the full frame. */
  useMotionValueEvent(scrollY, 'change', (y) => {
    setStuck(y > 120);
    const goingDown = y > lastY.current;
    setHidden(goingDown && y > 640 && !open);
    lastY.current = y;
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden ? '-120%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      {/* Announcement strip -------------------------------------------- */}
      <AnimatePresence initial={false}>
        {showBanner && !stuck && (
          <motion.div
            initial={{ height: 32, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative flex h-8 items-center overflow-hidden bg-gold"
          >
            <div className="mx-auto flex min-w-0 items-center gap-2 px-10 sm:px-14">
              <Image
                src="/svg/nav-berry.svg"
                alt=""
                width={21}
                height={24}
                className="hidden h-6 w-[21px] shrink-0 sm:block"
              />
              <p className="truncate text-[12px] font-bold tracking-[-0.5px] text-white sm:text-base">
                <span className="sm:hidden">Fresh, vibrant flavors in every bowl</span>
                <span className="hidden sm:inline">{ANNOUNCEMENT}</span>
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={() => setShowBanner(false)}
              /* 20px mark, but a 44px-wide hit area. It can't also be 44 tall:
                 the artboard's announcement strip is only 32px and clips. */
              className="absolute right-0 top-1/2 grid h-8 w-11 -translate-y-1/2 place-items-center text-white/90 transition hover:scale-110 hover:text-white sm:right-7"
            >
              <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav bar -------------------------------------------------------- */}
      <motion.nav
        animate={
          stuck
            ? { marginInline: 16, marginTop: 12, borderRadius: 999, height: 64 }
            : { marginInline: 0, marginTop: 0, borderRadius: 0, height: 70 }
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'pointer-events-auto relative flex items-center justify-between bg-white',
          stuck && 'shadow-[0_12px_40px_-12px_rgba(77,41,78,0.35)]'
        )}
      >
        {/* Left: links (desktop) / burger (mobile) */}
        <div className="flex min-w-0 shrink-0 items-center pl-2 sm:flex-1 sm:pl-6 lg:pl-[82px]">
          <ul className="hidden items-center gap-[14px] lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group font-nav relative flex min-h-10 items-center px-[6px] text-base font-bold uppercase leading-6 text-plum"
                >
                  {l.label}
                  <span className="absolute inset-x-[6px] bottom-1.5 h-[2px] origin-left scale-x-0 rounded-full bg-gold transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex size-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-[14px] w-6">
              <span className="absolute inset-x-0 top-0 h-[2px] rounded bg-plum" />
              <span className="absolute inset-x-0 top-1.5 h-[2px] rounded bg-plum" />
              <span className="absolute inset-x-0 top-3 h-[2px] rounded bg-plum" />
            </span>
          </button>
        </div>

        {/* Centre: logo */}
        <a href="#top" aria-label="Oh My Açaí — home" className="shrink-0">
          <motion.div whileHover={{ rotate: -6, scale: 1.06 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }}>
            <Image
              src="/img/logo-mark.png"
              alt="Oh My Açaí"
              width={320}
              height={324}
              priority
              className="h-12 w-[47px] object-contain sm:h-16 sm:w-[63px]"
            />
          </motion.div>
        </a>

        {/* Right: CTA */}
        <div className="flex min-w-0 shrink-0 items-center justify-end pr-2 sm:flex-1 sm:pr-4 lg:pr-[82px]">
          <PillButton href="/#menu" labelClassName="text-[0.8125rem] sm:text-2xl">
            Order Now
          </PillButton>
        </div>
      </motion.nav>

      {/* Mobile drawer -------------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-50 bg-plum lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 grid size-11 place-items-center text-white"
            >
              <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <ul className="flex h-full flex-col items-center justify-center gap-6">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl uppercase text-white"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
