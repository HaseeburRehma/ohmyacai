'use client';

import Image from 'next/image';
import Link from 'next/link';
import { InView } from '@/components/motion-primitives/in-view';
import PillButton from '@/components/ui/PillButton';
import MapEmbed from '@/components/ui/MapEmbed';
import HoursCard from '@/components/ui/HoursCard';
import { CONTACT, ORDER_URL, STORES, type StoreLocation } from '@/data/site';

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

/**
 * One store, in full: address + hours + actions on the left, photo and the
 * two-click map on the right, then "So kommst du hin" cards and a pointer
 * to the other location. Used by /duesseldorf and /koeln.
 */
export default function StoreDetail({ store }: { store: StoreLocation }) {
  const other = STORES.find((s) => s.slug !== store.slug);

  return (
    <section className="w-full bg-white px-6 pb-20 pt-4 sm:px-10 lg:px-[60px] lg:pb-[120px]">
      <div className="mx-auto grid w-full max-w-[1220px] gap-8 lg:grid-cols-2 lg:gap-14">
        {/* LEFT — facts */}
        <InView
          variants={rise}
          transition={{ duration: 0.9, ease: EASE }}
          viewOptions={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-[clamp(1.6rem,4.4vw,2.75rem)] uppercase leading-[1.1] tracking-[-0.5px] text-ink">
              Adresse & Kontakt
            </h2>
            <address className="not-italic text-[17px] leading-[1.5] tracking-[-0.3px] text-ink">
              <span className="block font-bold">{store.label}</span>
              {store.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
            <p className="text-[15px] leading-[1.5] text-ink/75">
              Telefon{' '}
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="font-semibold text-plum underline-offset-4 hover:underline">
                {CONTACT.phone}
              </a>
              {' · '}
              <a href={`mailto:${CONTACT.email}`} className="font-semibold text-plum underline-offset-4 hover:underline">
                {CONTACT.email}
              </a>
            </p>
          </div>

          <HoursCard hours={store.hours} />

          <div className="flex flex-wrap gap-3">
            <PillButton href={store.mapUrl} newTab>Route anzeigen</PillButton>
            <PillButton href={ORDER_URL} variant="plum">Jetzt bestellen</PillButton>
          </div>
        </InView>

        {/* RIGHT — photo + map */}
        <InView
          variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          viewOptions={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-5"
        >
          {store.photo ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
              <Image
                src={store.photo.src}
                alt={store.photo.alt}
                fill
                sizes="(max-width:1024px) 92vw, 560px"
                className="object-cover [object-position:center_42%]"
              />
            </div>
          ) : (
            <div className="relative flex aspect-[16/9] w-full items-center overflow-hidden rounded-3xl bg-plum p-6 sm:p-8">
              <Image
                src="/img/logo-badge.png"
                alt=""
                aria-hidden
                width={512}
                height={512}
                className="pointer-events-none absolute right-[-50px] top-1/2 size-[240px] -translate-y-1/2 rotate-[8deg] object-contain sm:size-[280px]"
              />
              <p className="font-display relative max-w-[60%] text-[clamp(1.35rem,3.4vw,1.9rem)] uppercase leading-[1.1] tracking-[-0.5px] text-cream">
                Frisch gemixt in {store.city}
              </p>
            </div>
          )}
          <MapEmbed
            title={`Karte: ${store.label}, ${store.addressLines.slice(0, 2).join(', ')}`}
            src={store.mapEmbed}
            address={store.addressLines.slice(0, 2)}
            routeUrl={store.mapUrl}
            className="aspect-[16/10] lg:aspect-auto lg:h-[300px]"
          />
        </InView>
      </div>

      {/* Arrival ---------------------------------------------------------- */}
      <div className="mx-auto mt-16 w-full max-w-[1220px] lg:mt-24">
        <InView variants={rise} transition={{ duration: 0.9, ease: EASE }} viewOptions={{ once: true, amount: 0.3 }}>
          <h2 className="font-display text-[clamp(1.6rem,4.4vw,2.75rem)] uppercase leading-[1.1] tracking-[-0.5px] text-ink">
            So kommst du <span className="text-mauve">hin</span>
          </h2>
        </InView>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {store.arrival.map((a, i) => (
            <InView
              as="li"
              key={a.title}
              variants={rise}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              viewOptions={{ once: true, amount: 0.3 }}
              className="rounded-3xl bg-[#f7f3f7] p-6"
            >
              <p className="font-menu text-sm uppercase tracking-[0.08em] text-mauve">0{i + 1}</p>
              <p className="font-display mt-2 text-xl uppercase leading-[1.15] tracking-[-0.5px] text-plum">{a.title}</p>
              <p className="mt-2 text-[15px] leading-[1.5] tracking-[-0.2px] text-ink/80">{a.body}</p>
            </InView>
          ))}
        </ul>

        {other && (
          <InView variants={rise} transition={{ duration: 0.8, ease: EASE }} viewOptions={{ once: true, amount: 0.4 }}>
            <p className="mt-10 text-[15px] text-ink/75">
              Auch in {other.city}:{' '}
              <Link href={`/${other.slug}`} className="font-bold text-plum underline-offset-4 hover:underline">
                {other.label}, {other.addressLines[0]}
              </Link>
            </p>
          </InView>
        )}
      </div>
    </section>
  );
}
