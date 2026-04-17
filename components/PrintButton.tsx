"use client";

import { Printer } from "lucide-react";

export default function PrintButton({ label = "Print this guide" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-navy/70 hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 no-print"
      aria-label={label}
    >
      <Printer size={14} strokeWidth={1.75} aria-hidden="true" />
      {label}
    </button>
  );
}
