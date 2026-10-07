'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ANNOUNCEMENT, CONTACT, FOOTER_SOCIAL, NAV_LINKS, type NavLink } from '@/data/site';
import PillButton from '@/components/ui/PillButton';
import { ORDER_URL } from '@/data/site';
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
  const pathname = usePathname();
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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
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
                <span className="sm:hidden">Frische, lebendige Aromen in jeder Bowl</span>
                <span className="hidden sm:inline">{ANNOUNCEMENT}</span>
              </p>
            </div>
            <button
              type="button"
              aria-label="Ankündigung schließen"
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
        <div className="flex min-w-0 shrink-0 items-center pl-2 sm:flex-1 sm:pl-6 lg:pl-8 xl:pl-[82px]">
          <ul className="hidden items-center gap-1 lg:flex xl:gap-[14px]">
            {NAV_LINKS.map((l) => (
              <DesktopNavItem key={l.label} link={l} />
            ))}
          </ul>
          <button
            type="button"
            aria-label="Menü öffnen"
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

        {/* Centre: logo — always links to the home page (not the current
            page's #top), so it works from /franchise, /impressum, /datenschutz. */}
        <Link href="/" aria-label="Oh My Açaí — zur Startseite" className="shrink-0">
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
        </Link>

        {/* Right: CTA */}
        <div className="flex min-w-0 shrink-0 items-center justify-end pr-2 sm:flex-1 sm:pr-4 lg:pr-8 xl:pr-[82px]">
          <PillButton href={ORDER_URL} labelClassName="text-[0.8125rem] sm:text-2xl">
            Jetzt bestellen
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
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-plum lg:hidden"
          >
            {/* Top bar — same height as the nav, logo left, close right */}
            <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
              <Link href="/" onClick={() => setOpen(false)} aria-label="Oh My Açaí — zur Startseite" className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-white">
                  <Image src="/img/logo-mark.png" alt="" width={320} height={324} className="h-8 w-8 object-contain" />
                </span>
                <span className="font-display text-base uppercase tracking-[-0.3px] text-white">Oh My Açaí</span>
              </Link>
              <button
                type="button"
                aria-label="Menü schließen"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Grouped, left-aligned list — scrolls on short phones */}
            <nav aria-label="Hauptmenü" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-4 sm:px-6">
              <ul className="mx-auto flex w-full max-w-[560px] flex-col gap-5">
                {NAV_LINKS.map((l, i) => {
                  const items = l.children ?? [{ label: l.label, href: l.href }];
                  return (
                    <motion.li
                      key={l.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i + 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {l.children && (
                        <p className="font-menu mb-1 px-3 text-[13px] uppercase tracking-[0.14em] text-gold">{l.label}</p>
                      )}
                      <ul className="overflow-hidden rounded-2xl bg-white/[0.06]">
                        {items.map((c) => {
                          const current = c.href === pathname;
                          return (
                            <li key={c.href} className="border-b border-white/10 last:border-b-0">
                              <Link
                                href={c.href}
                                onClick={() => setOpen(false)}
                                aria-current={current ? 'page' : undefined}
                                className={cn(
                                  'font-display flex min-h-[52px] items-center justify-between gap-3 px-3 text-[1.0625rem] uppercase leading-tight tracking-[-0.2px] transition-colors min-[400px]:text-lg',
                                  current ? 'bg-white/10 text-gold' : 'text-white active:bg-white/10'
                                )}
                              >
                                {c.label}
                                <svg viewBox="0 0 16 16" className="size-4 shrink-0 opacity-70" aria-hidden>
                                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Pinned footer — order CTA + direct contact */}
            <div className="shrink-0 border-t border-white/10 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
              <div className="mx-auto flex w-full max-w-[560px] flex-col gap-3">
                <PillButton href={ORDER_URL} onClick={() => setOpen(false)} className="w-full" labelClassName="text-lg">
                  Jetzt bestellen
                </PillButton>
                <div className="flex items-center justify-between text-[14px] text-cream/80">
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center hover:text-white">
                    {CONTACT.phone}
                  </a>
                  <div className="flex items-center gap-1">
                    {FOOTER_SOCIAL.map((sc) => (
                      <a
                        key={sc.label}
                        href={sc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center px-2 hover:text-white"
                      >
                        {sc.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */

const linkClass =
  'group font-nav relative flex min-h-10 items-center gap-1 px-[6px] text-base font-bold uppercase leading-6 text-plum';

/** Desktop link. Groups open a small dropdown on hover and on keyboard
 *  focus (focus-within), so every child page stays reachable by Tab. */
function DesktopNavItem({ link }: { link: NavLink }) {
  const underline = (
    <span className="absolute inset-x-[6px] bottom-1.5 h-[2px] origin-left scale-x-0 rounded-full bg-gold transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
  );

  if (!link.children) {
    return (
      <li>
        <Link href={link.href} className={linkClass}>
          {link.label}
          {underline}
        </Link>
      </li>
    );
  }

  return (
    <li className="group/item relative">
      <Link href={link.href} aria-haspopup="true" className={linkClass}>
        {link.label}
        <svg viewBox="0 0 12 12" className="size-3 transition-transform duration-300 group-hover/item:rotate-180 group-focus-within/item:rotate-180" aria-hidden>
          <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {underline}
      </Link>
      {/* pt-3 bridges the gap so the pointer can travel into the panel */}
      <div className="invisible absolute left-0 top-full z-10 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(.16,1,.3,1)] [transform:translateY(6px)] group-hover/item:visible group-hover/item:opacity-100 group-hover/item:[transform:none] group-focus-within/item:visible group-focus-within/item:opacity-100 group-focus-within/item:[transform:none]">
        <ul className="min-w-[230px] rounded-3xl bg-white p-2 shadow-[0_18px_44px_-14px_rgba(77,41,78,0.4)] ring-1 ring-plum/10">
          {link.children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="font-nav flex min-h-11 items-center rounded-2xl px-4 text-[15px] font-bold text-plum transition-colors hover:bg-plum/[0.07] focus-visible:bg-plum/[0.07] focus-visible:outline-none"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
