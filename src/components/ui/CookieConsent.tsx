'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  GA_MEASUREMENT_ID,
  META_PIXEL_ID,
  onConsentChange,
  onConsentOpen,
  readConsent,
  writeConsent,
  type Consent,
} from '@/lib/tracking';

/**
 * Cookie banner + consent-gated tracking. Nothing from Google or Meta loads
 * until the visitor clicks "Akzeptieren"; "Nur notwendige" is offered with
 * equal weight, as German regulators expect.
 */
export default function CookieConsent() {
  // undefined = not read yet (SSR / first paint), null = no choice made.
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // localStorage only exists in the browser, so the stored choice is read
    // after mount; the banner and scripts never render on the server.
    const stored = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(stored);
    setOpen(stored === null);
    const offChange = onConsentChange((c) => {
      // Withdrawing consent can't unload scripts already running — reload so
      // the page comes back without them.
      if (c === 'denied' && window.fbq) {
        window.location.reload();
        return;
      }
      setConsent(c);
    });
    const offOpen = onConsentOpen(() => setOpen(true));
    return () => {
      offChange();
      offOpen();
    };
  }, []);

  const choose = (c: Consent) => {
    writeConsent(c);
    setOpen(false);
  };

  return (
    <>
      {consent === 'granted' && <TrackingScripts />}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-[560px] rounded-3xl bg-white p-5 text-ink shadow-[0_20px_50px_-12px_rgba(77,41,78,0.45)] ring-1 ring-plum/10 sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <h2 id="cookie-title" className="font-display text-xl uppercase leading-tight tracking-[-0.5px] text-plum">
            Cookies &amp; Datenschutz
          </h2>
          <p className="mt-2 text-sm leading-[1.45] tracking-[-0.2px] text-[#5d5160]">
            Wir nutzen Google Analytics und den Meta-Pixel, um zu verstehen, wie
            unsere Seite genutzt wird, und um unsere Werbung zu messen. Das
            passiert nur mit deiner Einwilligung, die du jederzeit unter
            „Cookie-Einstellungen“ im Footer widerrufen kannst. Mehr in der{' '}
            <Link href="/datenschutz" className="font-semibold text-mauve underline underline-offset-2">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => choose('denied')}
              className="font-display flex-1 rounded-full border-2 border-mauve px-5 py-3 text-[15px] uppercase leading-none tracking-[-0.3px] text-mauve outline-none transition hover:bg-mauve hover:text-cream focus-visible:ring-4 focus-visible:ring-gold/60"
            >
              Nur notwendige
            </button>
            <button
              type="button"
              onClick={() => choose('granted')}
              className="font-display flex-1 rounded-full border-2 border-mauve bg-mauve px-5 py-3 text-[15px] uppercase leading-none tracking-[-0.3px] text-cream outline-none transition hover:border-plum hover:bg-plum focus-visible:ring-4 focus-visible:ring-gold/60"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      )}
    </>
  );
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function TrackingScripts() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}
