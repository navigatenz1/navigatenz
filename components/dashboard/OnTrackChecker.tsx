"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, XCircle, X, ChevronUp } from "lucide-react";
import type { Milestone } from "@/lib/pathway";

interface Check {
  status: "on-track" | "warning" | "behind";
  label: string;
  guideSlug?: string;
}

function deriveChecks(milestones: Milestone[], modulesDone: number, hasUrgentDate: boolean): Check[] {
  const checks: Check[] = [];
  const urgent = milestones.filter((m) => m.status === "urgent");
  const current = milestones.filter((m) => m.status === "current");

  // First: done things are on-track
  if (modulesDone >= 1) {
    checks.push({ status: "on-track", label: `You've completed ${modulesDone} action module${modulesDone !== 1 ? "s" : ""}` });
  } else {
    checks.push({ status: "warning", label: "You haven't completed any action modules yet — start with one this week" });
  }

  // Urgent items are behind
  if (urgent.length > 0) {
    checks.push({ status: "behind", label: urgent[0].title, guideSlug: urgent[0].guideSlug });
  } else if (hasUrgentDate) {
    checks.push({ status: "warning", label: "A key deadline is less than 30 days away — check your key dates" });
  } else {
    checks.push({ status: "on-track", label: "No urgent deadlines in the next 30 days" });
  }

  // Current items need attention but are on-track
  if (current.length > 0) {
    checks.push({ status: "warning", label: current[0].title, guideSlug: current[0].guideSlug });
  } else {
    checks.push({ status: "on-track", label: "You're on top of your current milestones" });
  }

  return checks.slice(0, 3);
}

const toneMap = {
  "on-track": { icon: CheckCircle2, color: "text-teal", bg: "bg-teal-50", label: "On track" },
  warning: { icon: AlertTriangle, color: "text-gold-700", bg: "bg-gold-50", label: "Action needed" },
  behind: { icon: XCircle, color: "text-coral", bg: "bg-coral-50", label: "Behind" },
};

export default function OnTrackChecker({
  milestones,
  modulesDone,
  hasUrgentDate,
}: {
  milestones: Milestone[];
  modulesDone: number;
  hasUrgentDate: boolean;
}) {
  const [open, setOpen] = useState(false);
  const checks = deriveChecks(milestones, modulesDone, hasUrgentDate);
  const summary = checks.every((c) => c.status === "on-track")
    ? "on-track"
    : checks.some((c) => c.status === "behind")
    ? "behind"
    : "warning";
  const tone = toneMap[summary];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Check if you're on track"
        className={`fixed bottom-24 lg:bottom-6 right-4 sm:right-6 z-30 inline-flex items-center gap-2 rounded-full shadow-lg px-4 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${tone.bg} ${tone.color} focus-visible:ring-teal`}
      >
        <tone.icon size={16} strokeWidth={2} aria-hidden="true" />
        Am I on track?
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="on-track-heading"
          className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4 sm:p-6"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm animate-fade-in"
          />
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl animate-fade-in-up">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 id="on-track-heading" className="font-bold text-navy">Your status</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1.5 rounded-lg text-navy/50 hover:bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <ul className="p-3">
              {checks.map((c, i) => {
                const ct = toneMap[c.status];
                return (
                  <li key={i} className={`rounded-xl p-3 flex items-start gap-3 mb-2 last:mb-0 ${ct.bg}`}>
                    <ct.icon size={18} strokeWidth={2} className={`flex-shrink-0 mt-0.5 ${ct.color}`} aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy leading-snug">{c.label}</p>
                      {c.guideSlug && (
                        <Link
                          href={`/guides/${c.guideSlug}`}
                          className="mt-1 text-xs text-teal font-medium hover:underline inline-flex items-center gap-1"
                          onClick={() => setOpen(false)}
                        >
                          Read the guide
                          <ChevronUp size={10} className="rotate-90" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="p-4 border-t border-gray-100 text-center">
              <Link
                href="/tools/credit-calculator"
                onClick={() => setOpen(false)}
                className="text-sm text-teal font-medium hover:underline"
              >
                Check your credits in detail →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
