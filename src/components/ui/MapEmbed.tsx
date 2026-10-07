'use client';

import { useState } from 'react';

/**
 * Two-click Google Maps embed. Nothing is requested from Google until the
 * visitor opts in, which is what the Datenschutzerklärung promises ("Karten-
 * dienste wie Google Maps … ausschließlich auf Grundlage Ihrer Einwilligung")
 * and keeps ~1 MB of Maps JS off the initial page load.
 */
export default function MapEmbed({
  src,
  title,
  address,
  routeUrl,
  className = '',
}: {
  src: string;
  title: string;
  address: string[];
  routeUrl: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl border border-ink/10 bg-[#efe9df] shadow-[0_10px_28px_-14px_rgba(0,0,0,0.25)] ${className}`}
    >
      {loaded ? (
        <iframe
          title={title}
          src={src}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          {/* Street-grid backdrop so the placeholder still reads as a map. */}
          <svg aria-hidden className="absolute inset-0 size-full opacity-40" preserveAspectRatio="none" viewBox="0 0 400 300">
            <g stroke="#d8cdbb" strokeWidth="6" fill="none">
              <path d="M-10 70 L410 40" /><path d="M-10 170 L410 150" /><path d="M-10 250 L410 270" />
              <path d="M80 -10 L60 310" /><path d="M210 -10 L230 310" /><path d="M330 -10 L320 310" />
            </g>
            <path d="M-10 220 C120 190 160 260 410 210" stroke="#a9d4e6" strokeWidth="14" fill="none" />
          </svg>
          <span className="relative grid size-12 place-items-center rounded-full bg-plum text-cream shadow-lg">
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden fill="none">
              <path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
          <address className="relative not-italic text-[15px] font-semibold leading-[1.4] text-ink">
            {address.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
          <div className="relative flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="min-h-11 rounded-full bg-plum px-5 text-sm font-bold text-cream transition hover:bg-mauve"
            >
              Karte laden
            </button>
            <a
              href={routeUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex min-h-11 items-center rounded-full border border-plum/30 px-5 text-sm font-bold text-plum transition hover:bg-plum/5"
            >
              In Google Maps öffnen
            </a>
          </div>
          <p className="relative max-w-[300px] text-[12px] leading-[1.4] text-ink/55">
            Beim Laden der Karte werden Daten an Google übertragen. Mehr in der{' '}
            <a href="/datenschutz" className="underline">Datenschutzerklärung</a>.
          </p>
        </div>
      )}
    </div>
  );
}
