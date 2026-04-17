import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  timeEstimate?: string;
  urgency?: "suggestion" | "urgent";
  meta?: string;
}

export default function WeeklyFocusCard({
  title,
  description,
  href,
  icon: Icon,
  timeEstimate,
  urgency = "suggestion",
  meta,
}: Props) {
  const accent = urgency === "urgent" ? "border-l-coral" : "border-l-gold";
  const iconBg = urgency === "urgent" ? "bg-coral-50 text-coral-700" : "bg-gold-50 text-gold-700";

  return (
    <Link
      href={href}
      className={`group block rounded-2xl bg-white border border-gray-100 border-l-4 ${accent} shadow-sm p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider">
            This week&apos;s focus
          </p>
          <h3 className="mt-1 font-semibold text-navy group-hover:text-teal transition-colors leading-snug">
            {title}
          </h3>
          <p className="mt-1 text-sm text-navy/60 leading-relaxed line-clamp-2">{description}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-navy/40 flex-wrap">
              {timeEstimate && <span>{timeEstimate}</span>}
              {meta && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{meta}</span>
                </>
              )}
            </div>
            <span className="text-teal text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap">
              Start
              <ArrowRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
