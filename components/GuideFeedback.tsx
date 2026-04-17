"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  slug: string;
}

export default function GuideFeedback({ slug }: Props) {
  const [submitted, setSubmitted] = useState<"yes" | "no" | null>(null);

  const submit = (helpful: boolean) => {
    if (submitted) return;
    trackEvent("guide_feedback", { slug, helpful });
    setSubmitted(helpful ? "yes" : "no");
  };

  if (submitted) {
    return (
      <div className="mt-16 p-8 bg-soft rounded-2xl text-center" role="status" aria-live="polite">
        <p className="text-navy font-semibold mb-1">Thanks for the feedback.</p>
        <p className="text-navy/60 text-sm">
          {submitted === "yes"
            ? "Glad this helped. If you want to share your story, email admin@navigatenz.org."
            : "We'll keep improving. If there's something specific we missed, email admin@navigatenz.org."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 p-8 bg-soft rounded-2xl text-center">
      <p className="text-navy font-semibold mb-2">Was this helpful?</p>
      <p className="text-navy/60 text-sm mb-4">Let us know so we can improve our guides</p>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => submit(true)}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-white hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          Yes, thanks!
        </button>
        <button
          type="button"
          onClick={() => submit(false)}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-white hover:border-gray-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          Not really
        </button>
      </div>
    </div>
  );
}
