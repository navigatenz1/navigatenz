import Link from "next/link";
import { Check, ArrowRight, Circle } from "lucide-react";
import type { Milestone } from "@/lib/pathway";

const statusStyles: Record<Milestone["status"], {
  card: string;
  badge: string;
  dot: string;
  text: string;
  label: string;
}> = {
  current: {
    card: "border-teal/40 bg-teal-50/40",
    badge: "bg-teal text-white",
    dot: "bg-teal",
    text: "text-navy",
    label: "In progress",
  },
  urgent: {
    card: "border-coral/40 bg-coral-50/40",
    badge: "bg-coral text-white",
    dot: "bg-coral",
    text: "text-navy",
    label: "Action needed",
  },
  upcoming: {
    card: "border-gold/40 bg-gold-50/30",
    badge: "bg-gold-50 text-gold-800",
    dot: "bg-gold",
    text: "text-navy",
    label: "Up next",
  },
  future: {
    card: "border-gray-100 bg-white",
    badge: "bg-gray-100 text-navy/40",
    dot: "bg-gray-300",
    text: "text-navy/50",
    label: "Future",
  },
};

export default function PathwayTimeline({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <div>
      {/* Desktop + tablet: horizontal scroll timeline */}
      <div className="relative hidden sm:block">
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200" aria-hidden="true" />
        <ol className="relative flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {milestones.map((m) => {
            const s = statusStyles[m.status];
            const isDone = m.status === "future" ? false : m.status !== "upcoming";
            return (
              <li key={m.step} className="flex-shrink-0 w-60">
                <div className="flex flex-col items-center">
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${s.badge}`}
                    aria-hidden="true"
                  >
                    {m.status === "current" || m.status === "urgent" ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    ) : isDone ? (
                      <Check size={16} strokeWidth={3} />
                    ) : (
                      <Circle size={12} strokeWidth={2} />
                    )}
                  </div>
                </div>
                <div
                  className={`mt-4 rounded-2xl border ${s.card} p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <p className={`text-[10px] font-semibold uppercase tracking-wider ${m.status === "current" ? "text-teal" : m.status === "urgent" ? "text-coral" : m.status === "upcoming" ? "text-gold-700" : "text-navy/30"}`}>
                    {s.label}
                  </p>
                  <p className={`mt-1 font-semibold text-sm leading-snug ${s.text}`}>{m.title}</p>
                  {m.guideSlug && m.status !== "future" && (
                    <Link
                      href={`/guides/${m.guideSlug}`}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-teal hover:text-teal-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded"
                    >
                      Read guide
                      <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile: vertical compact list */}
      <ol className="sm:hidden space-y-3">
        {milestones.map((m) => {
          const s = statusStyles[m.status];
          const isDone = m.status !== "future" && m.status !== "upcoming";
          return (
            <li key={m.step} className={`flex items-start gap-3 rounded-2xl border ${s.card} p-3.5 shadow-sm`}>
              <div className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${s.badge}`} aria-hidden="true">
                {isDone ? <Check size={12} strokeWidth={3} /> : <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-[9px] font-semibold uppercase tracking-wider ${m.status === "current" ? "text-teal" : m.status === "urgent" ? "text-coral" : m.status === "upcoming" ? "text-gold-700" : "text-navy/30"}`}>
                  {s.label}
                </p>
                <p className={`mt-0.5 font-semibold text-sm ${s.text}`}>{m.title}</p>
              </div>
              {m.guideSlug && m.status !== "future" && (
                <Link
                  href={`/guides/${m.guideSlug}`}
                  className="flex-shrink-0 text-teal p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  aria-label={`Read guide for ${m.title}`}
                >
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
