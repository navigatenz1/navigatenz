import Link from "next/link";
import { Sparkles, Pencil, GraduationCap, Route as RouteIcon, Users, School } from "lucide-react";
import UniBadge from "@/components/UniBadge";

interface Props {
  firstName: string;
  yearLabel: string;
  qualLabel: string;
  firstGen: boolean;
  preferredUniversities: string[];
  qualificationPathway: string;
  greeting: string;
}

export default function ProfileCard({
  firstName,
  yearLabel,
  qualLabel,
  firstGen,
  preferredUniversities,
  qualificationPathway,
  greeting,
}: Props) {
  return (
    <section
      aria-labelledby="profile-heading"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-navy to-teal-900 text-white shadow-sm"
    >
      {/* Soft backdrop pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}
        aria-hidden="true"
      />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-white/60 text-sm" id="profile-heading">
              {greeting}, {firstName}
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold leading-tight">
              Your pathway — at a glance
            </h1>
          </div>
          <Link
            href="/assessment"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <Pencil size={12} aria-hidden="true" />
            Retake assessment
          </Link>
        </div>

        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div>
            <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40 font-semibold">
              <School size={12} aria-hidden="true" /> Year level
            </dt>
            <dd className="mt-1.5 font-semibold text-white text-sm sm:text-base">{yearLabel}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40 font-semibold">
              <RouteIcon size={12} aria-hidden="true" /> Pathway
            </dt>
            <dd className="mt-1.5 font-semibold text-white text-sm sm:text-base">{qualLabel}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40 font-semibold">
              <Users size={12} aria-hidden="true" /> First-gen
            </dt>
            <dd className="mt-1.5 flex items-center gap-1.5">
              {firstGen ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/20 text-gold-300 text-xs font-semibold px-2 py-0.5">
                  <Sparkles size={10} aria-hidden="true" />
                  Yes
                </span>
              ) : (
                <span className="text-white/80 text-sm sm:text-base font-semibold">No</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40 font-semibold">
              <GraduationCap size={12} aria-hidden="true" /> Target
            </dt>
            <dd className="mt-1.5">
              {preferredUniversities.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {preferredUniversities.slice(0, 2).map((u) => (
                    <UniBadge key={u} uni={u} showName />
                  ))}
                  {preferredUniversities.length > 2 && (
                    <span className="text-xs text-white/50">+{preferredUniversities.length - 2}</span>
                  )}
                </div>
              ) : (
                <span className="text-sm text-white/50">Not set</span>
              )}
            </dd>
          </div>
        </dl>

        {qualificationPathway === "ncea" && (
          <p className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60 leading-relaxed">
            NCEA is being phased out 2028–2030. Your pathway uses current rules — they apply if you graduate by 2029.
          </p>
        )}
      </div>
    </section>
  );
}
