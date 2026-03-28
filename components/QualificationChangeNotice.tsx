"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  variant?: "banner" | "inline" | "prominent";
  children: React.ReactNode;
  guideLink?: boolean;
}

export default function QualificationChangeNotice({
  variant = "inline",
  children,
  guideLink = true,
}: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  if (variant === "banner") {
    return (
      <div className="bg-amber-50 border-b border-amber-200 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 text-sm">
          <span className="flex-shrink-0">📢</span>
          <p className="text-amber-900 flex-1">{children}</p>
          <button onClick={() => setDismissed(true)} className="text-amber-400 hover:text-amber-600 flex-shrink-0 p-1" aria-label="Dismiss">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "prominent") {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5 sm:p-6 mb-8 relative">
        <button onClick={() => setDismissed(true)} className="absolute top-3 right-3 text-amber-300 hover:text-amber-500 p-1" aria-label="Dismiss">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex gap-3">
          <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
          <div className="text-sm text-amber-900 leading-relaxed space-y-3">
            {children}
            {guideLink && (
              <p className="pt-1">
                <Link href="/guides/nz-qualification-changes" className="text-amber-700 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors">
                  Read our full guide on qualification changes &rarr;
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // inline
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-6 relative">
      <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 text-amber-300 hover:text-amber-500 p-1" aria-label="Dismiss">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div className="flex gap-3">
        <span className="flex-shrink-0">ℹ️</span>
        <div className="text-sm text-amber-900 leading-relaxed">
          <p className="font-semibold mb-1">Important: NZ qualifications are changing</p>
          {children}
          {guideLink && (
            <Link href="/guides/nz-qualification-changes" className="text-amber-700 font-medium underline underline-offset-2 hover:text-amber-900 transition-colors text-xs mt-2 inline-block">
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
