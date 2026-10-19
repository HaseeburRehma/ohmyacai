/**
 * Google Maps embed, shown directly (no click-to-load step). `loading="lazy"`
 * keeps the ~1 MB of Maps JS off the initial page load: the browser only
 * fetches the iframe once the map scrolls near the viewport.
 *
 * `address` and `routeUrl` stay on the props so callers don't change; the
 * embedded map carries its own "Größere Karte ansehen" and route links.
 */
export default function MapEmbed({
  src,
  title,
  className = '',
}: {
  src: string;
  title: string;
  address?: string[];
  routeUrl?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full min-w-0 overflow-hidden rounded-3xl border border-ink/10 bg-[#efe9df] shadow-[0_10px_28px_-14px_rgba(0,0,0,0.25)] ${className}`}
    >
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
