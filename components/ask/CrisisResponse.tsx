"use client";

import { Phone, HeartHandshake } from "lucide-react";
import { CRISIS_RESOURCES } from "@/lib/crisis-keywords";

interface Props {
  onContinue: () => void;
}

export default function CrisisResponse({ onContinue }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-heading"
      className="fixed inset-0 z-[70] bg-navy text-white overflow-y-auto"
    >
      <div className="max-w-xl mx-auto px-6 py-16 sm:py-24">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
          <HeartHandshake size={32} strokeWidth={1.75} aria-hidden="true" className="text-gold-300" />
        </div>
        <h1 id="crisis-heading" className="text-3xl sm:text-4xl font-bold leading-tight">
          It sounds like you might be going through something really tough.
        </h1>
        <p className="mt-5 text-white/80 text-lg leading-relaxed">
          Please talk to someone who can actually help. These people are trained, free, and
          available right now.
        </p>

        <ul className="mt-8 space-y-3">
          {CRISIS_RESOURCES.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                className={`flex items-center gap-3 rounded-2xl px-5 py-4 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
                  r.urgent
                    ? "bg-gold text-navy hover:bg-gold-400"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <Phone size={18} strokeWidth={2} aria-hidden="true" />
                <span>{r.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-white/70 text-lg">
          You&apos;re not alone. Reaching out is the strongest thing you can do right now.
        </p>

        <button
          type="button"
          onClick={onContinue}
          className="mt-10 text-sm text-white/60 hover:text-white underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded px-1"
        >
          I want to continue to the Q&amp;A board
        </button>
      </div>
    </div>
  );
}
