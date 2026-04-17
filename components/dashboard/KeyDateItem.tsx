import { CalendarPlus } from "lucide-react";

interface Props {
  label: string;
  date: Date;
  daysAway: number;
  /** Maximum "days out" window to visualise on the bar. Dates further out render empty. */
  horizonDays?: number;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-NZ", { day: "numeric", month: "short", year: "numeric" });
}

function formatICSDate(d: Date) {
  // YYYYMMDD (all-day event)
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

function calendarUrl(label: string, d: Date) {
  const start = formatICSDate(d);
  const end = formatICSDate(new Date(d.getTime() + 24 * 60 * 60 * 1000));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: label,
    dates: `${start}/${end}`,
    details: "Added from Navigate NZ",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const urgencyStyles = {
  close: { dot: "bg-coral", badge: "bg-coral-50 text-coral-700", bar: "bg-coral" },
  soon: { dot: "bg-gold", badge: "bg-gold-50 text-gold-800", bar: "bg-gold" },
  future: { dot: "bg-teal", badge: "bg-teal-50 text-teal-700", bar: "bg-teal" },
} as const;

export default function KeyDateItem({ label, date, daysAway, horizonDays = 180 }: Props) {
  const urgency: keyof typeof urgencyStyles = daysAway < 30 ? "close" : daysAway < 100 ? "soon" : "future";
  const style = urgencyStyles[urgency];

  // Closeness: 100% = today, 0% = at or past horizon.
  const closeness = Math.max(0, Math.min(100, ((horizonDays - daysAway) / horizonDays) * 100));

  const awayLabel = daysAway <= 0 ? "Today" : daysAway === 1 ? "Tomorrow" : `in ${daysAway} days`;

  return (
    <div className="group relative flex items-center gap-4 rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <span className={`flex-shrink-0 w-3 h-3 rounded-full ${style.dot}`} aria-hidden="true" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-navy text-sm truncate">{label}</p>
          <span className={`flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}>
            {awayLabel}
          </span>
        </div>
        <p className="text-xs text-navy/40 mt-0.5">{formatDate(date)}</p>
        <div
          className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(closeness)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label} — ${awayLabel}`}
        >
          <div className={`h-full ${style.bar} rounded-full transition-all`} style={{ width: `${closeness}%` }} />
        </div>
      </div>

      <a
        href={calendarUrl(label, date)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Add ${label} to Google Calendar`}
        className="flex-shrink-0 p-2 rounded-lg text-navy/30 hover:text-teal hover:bg-teal-50 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      >
        <CalendarPlus size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
