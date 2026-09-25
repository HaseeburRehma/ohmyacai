"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InView } from "@/components/motion-primitives/in-view";
import PillButton from "@/components/ui/PillButton";
import { LOCATION_COLOGNE } from "@/data/site";

const HEADING = ['Besuche unseren', 'Store'];

/** Google Business Profile — Oh my acai · Flinger Str. 18, 40213 Düsseldorf.
 *  Direct Maps directions URL (opens the routing UI on any device with
 *  Oh My Açaí, Flinger Str. 18, 40213 Düsseldorf as the destination). */
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Oh+My+Acai+Flinger+Str.+18+40213+D%C3%BCsseldorf';
const MAPS_EMBED =
  'https://maps.google.com/maps?q=Flinger%20Str.%2018,%2040213%20D%C3%BCsseldorf&t=&z=16&ie=UTF8&iwloc=&output=embed';

/** Opening hours as shown on the Google Business Profile. Monday first —
 *  the shop is open every day and the times run through midnight on Fri/Sat. */
const HOURS: { day: string; time: string }[] = [
  { day: 'Montag',     time: '11:00 – 22:00' },
  { day: 'Dienstag',   time: '11:00 – 22:00' },
  { day: 'Mittwoch',   time: '11:00 – 22:00' },
  { day: 'Donnerstag', time: '11:00 – 22:00' },
  { day: 'Freitag',    time: '11:00 – 00:00' },
  { day: 'Samstag',    time: '11:00 – 00:00' },
  { day: 'Sonntag',    time: '12:00 – 23:00' },
];

/**
 * Figma: "Image Section → Content" — 675 × 520 rounded-24 photo on the left,
 * 64px Phonk heading + body + "Get Directions" on the right, 32px gap.
 */
export default function StoreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="location"
      className="w-full bg-white px-6 py-20 sm:px-10 lg:px-[60px] lg:py-[160px]"
    >
      <div
        ref={ref}
        className="mx-auto grid w-full max-w-[1220px] gap-8 lg:grid-cols-2 lg:gap-14"
      >
        {/* LEFT column — storefront photo (top) + Google Maps (bottom). */}
        <InView
          variants={{
            hidden: { opacity: 0, x: -50, scale: 0.97 },
            visible: { opacity: 1, x: 0, scale: 1 },
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-5"
        >
          {/* Storefront photo — landscape 4:3 card with object-cover so
              the shot fills the frame side-to-side (no letterbox). The
              crop pans through the middle of the source (object-position
              center 42%) so the OH MY! Açaí disc, the menu boards and
              the counter all read together, without dead brick above or
              floor below. */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <motion.div style={{ y: imgY }} className="absolute inset-0">
              <Image
                src="/img/store.jpg"
                alt="Oh My Açaí Storefront — Flinger Straße"
                fill
                sizes="(max-width:1024px) 92vw, 560px"
                className="object-cover [object-position:center_42%]"
              />
            </motion.div>
          </div>

          {/* Google Maps embed sits under the photo with a matching card
              treatment. Fixed 260 px tall from lg so image + map together
              track the height of the copy column on desktop. */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-ink/10 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.25)] lg:aspect-auto lg:h-[260px]">
            <iframe
              title="Karte: Oh My Açaí, Flinger Str. 18, 40213 Düsseldorf"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </InView>

        {/* RIGHT column — heading, paragraph, hours card, CTA. */}
        <div className="@container flex w-full flex-col gap-6 lg:justify-center">
          {/* The trigger sits on the h2, not on the lines. Each line starts
              translated 110% down, i.e. entirely outside its own
              `overflow-hidden` clip box — and IntersectionObserver clips a
              target's rect by its ancestors' overflow, so the line reported a
              zero-area intersection and `whileInView` on it could never fire:
              the heading never appeared at all. The h2 is never clipped, so it
              drives the reveal and staggers the lines through variants. */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            /* Sized against the column, not the viewport, so the heading
               always sets as the three lines below. Measured at every
               breakpoint: the largest size that keeps "Deinen Eigenen" on one
               line is 9.36% of the column width, and the ratio holds because
               both scale together. 9.1cqw leaves a little slack, capped at
               Figma's 64px so it never grows past the design. */
            className="font-display text-[min(2.25rem,6.6cqw)] uppercase leading-[1.15] text-ink lg:text-[min(4rem,9.1cqw)]"
          >
            <span className="sr-only">Besuche unseren Store</span>
            {HEADING.map((line) => (
              <span key={line} aria-hidden className="block overflow-hidden whitespace-nowrap">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <InView
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
          >
            <p className="max-w-[640px] text-base leading-[1.2] tracking-[-0.5px] text-ink">
              Bei Oh My Açaí steckt in jeder Bowl mehr als nur Obst. Wir mixen
              samtiges Açaí mit frischen Früchten und knusprigem Granola zu
              einem ausgewogenen, erfrischenden Erlebnis.
            </p>
          </InView>

          {/* Opening hours — sourced from the Google Business Profile.
              Cleaner card: white surface, plum accent bar, two rows per
              line so it scans as a real schedule instead of a bulleted
              list. */}
          <InView
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-5 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.15)] sm:p-6">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-plum" />
              <div className="mb-4 flex items-center gap-2.5 text-plum">
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-display text-lg uppercase tracking-[-0.5px]">Öffnungszeiten</p>
              </div>
              <dl className="divide-y divide-ink/10">
                {HOURS.map((row) => (
                  <div key={row.day} className="flex items-center justify-between py-2 text-[15px]">
                    <dt className="font-semibold text-ink">{row.day}</dt>
                    <dd className="tabular-nums text-ink/70">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            viewOptions={{ once: true, amount: 0.3 }}
            className="w-fit"
          >
            <PillButton href={MAPS_URL} newTab>Route anzeigen</PillButton>
          </InView>
        </div>
      </div>

      {/* Second location — Oh My Açaí Köln.
          Layout is content-left (heading, address, hours card, Route
          button) and media-right (map + brand image tile). Same visual
          language as the Düsseldorf grid so both stores read together. */}
      <div className="mx-auto mt-16 w-full max-w-[1220px] lg:mt-24">
        <InView
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewOptions={{ once: true, amount: 0.2 }}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-14">
            {/* LEFT — content */}
            <div className="@container flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <p className="font-menu inline-flex w-fit items-center gap-2 rounded-full bg-plum/10 px-3 py-1 text-xs font-bold uppercase tracking-[-0.3px] text-plum sm:text-sm">
                  <span aria-hidden className="inline-block size-1.5 rounded-full bg-plum" />
                  Zweiter Standort
                </p>
                <h3 className="font-display text-[min(2.25rem,6.6cqw)] uppercase leading-[1.1] tracking-[-0.5px] text-ink lg:text-[min(3.5rem,7.8cqw)]">
                  {LOCATION_COLOGNE.label}
                </h3>
              </div>

              <address className="not-italic text-base leading-[1.5] tracking-[-0.3px] text-ink">
                {LOCATION_COLOGNE.addressLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
                <span className="mt-2 block text-sm text-ink/60">
                  {LOCATION_COLOGNE.ratingLine}
                </span>
              </address>

              {/* Öffnungszeiten card, same treatment as Düsseldorf. */}
              <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-5 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.15)] sm:p-6">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-plum" />
                <div className="mb-4 flex items-center gap-2.5 text-plum">
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-display text-lg uppercase tracking-[-0.5px]">Öffnungszeiten</p>
                </div>
                <dl className="divide-y divide-ink/10">
                  {LOCATION_COLOGNE.hours.map((row) => (
                    <div key={row.day} className="flex items-center justify-between py-2 text-[15px]">
                      <dt className="font-semibold text-ink">{row.day}</dt>
                      <dd className="tabular-nums text-ink/70">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="w-fit">
                <PillButton href={LOCATION_COLOGNE.mapUrl} newTab>Route anzeigen</PillButton>
              </div>
            </div>

            {/* RIGHT — map + brand image tile */}
            <div className="flex flex-col gap-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-ink/10 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.25)] lg:aspect-auto lg:h-[440px]">
                <iframe
                  title={`Karte: ${LOCATION_COLOGNE.label}`}
                  src={LOCATION_COLOGNE.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-plum lg:aspect-auto lg:h-[260px]">
                <Image
                  src="/img/logo-badge.png"
                  alt=""
                  width={512}
                  height={512}
                  aria-hidden
                  className="pointer-events-none absolute right-[-60px] top-1/2 size-[300px] -translate-y-1/2 rotate-[8deg] object-contain opacity-95"
                />
                <div className="relative flex h-full flex-col justify-center gap-2 p-6 sm:p-8">
                  <p className="font-menu text-xs font-bold uppercase tracking-[-0.3px] text-gold sm:text-sm">
                    Neu in Köln
                  </p>
                  <p className="font-display text-[clamp(1.35rem,3.4vw,1.75rem)] uppercase leading-[1.1] tracking-[-0.5px] text-cream">
                    Frisch gemixt<br />in der Innenstadt
                  </p>
                  <p className="max-w-[280px] text-sm leading-[1.4] tracking-[-0.2px] text-cream/80">
                    Hohe Straße 105-107. Direkt in der Kölner Fußgängerzone, zwei Minuten vom Dom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
