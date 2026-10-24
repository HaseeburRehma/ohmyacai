/**
 * Cookie consent + marketing events.
 *
 * Google Analytics and the Meta Pixel only load after the visitor accepts in
 * the cookie banner (Datenschutz §7/§8, § 25 TDDDG). The choice lives in
 * localStorage; "Cookie-Einstellungen" in the footer reopens the banner.
 */

/** Meta "OhmyAcai" dataset in Business Manager 28804329762503632, connected
 *  to the OhmyAcai ad account. */
export const META_PIXEL_ID = '1140973798605879';
export const GA_MEASUREMENT_ID = 'G-0QMWTHSLFV';

export type Consent = 'granted' | 'denied';

const KEY = 'oma-consent-v1';
const CHANGE = 'oma-consent-change';
const OPEN = 'oma-consent-open';

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Private mode / blocked storage: the choice holds for this page view only.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE, { detail: value }));
}

export function onConsentChange(fn: (c: Consent) => void) {
  const handler = (e: Event) => fn((e as CustomEvent<Consent>).detail);
  window.addEventListener(CHANGE, handler);
  return () => window.removeEventListener(CHANGE, handler);
}

/** Reopens the banner (footer link "Cookie-Einstellungen"). */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN));
}

export function onConsentOpen(fn: () => void) {
  window.addEventListener(OPEN, fn);
  return () => window.removeEventListener(OPEN, fn);
}

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

/**
 * A form was sent successfully. Fires Meta "Lead" and GA4 "generate_lead";
 * both are no-ops when the visitor declined (the scripts never loaded).
 */
export function trackLead(form: 'franchise' | 'contact' | 'wholesale') {
  const w = window as unknown as { fbq?: Fbq; gtag?: Gtag };
  w.fbq?.('track', 'Lead', { content_name: form });
  w.gtag?.('event', 'generate_lead', { form });
}
