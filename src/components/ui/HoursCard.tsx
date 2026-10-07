/** Öffnungszeiten card — white surface, plum accent bar, one row per day.
 *  Same treatment as the home page's store section. */
export default function HoursCard({
  hours,
  title = 'Öffnungszeiten',
}: {
  hours: { day: string; time: string }[];
  title?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-5 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.15)] sm:p-6">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-plum" />
      <div className="mb-4 flex items-center gap-2.5 text-plum">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-display text-lg uppercase tracking-[-0.5px]">{title}</p>
      </div>
      <dl className="divide-y divide-ink/10">
        {hours.map((row) => (
          <div key={row.day} className="flex items-center justify-between gap-4 py-2 text-[15px]">
            <dt className="font-semibold text-ink">{row.day}</dt>
            <dd className="tabular-nums text-ink/70">{row.time}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
