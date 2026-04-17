"use client";

import { useEffect, useRef, useState } from "react";
import { X, Phone, ShieldCheck, Info } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { detectCrisis } from "@/lib/crisis-keywords";
import {
  ALL_CATEGORIES,
  CATEGORY_CONFIG,
  isRateLimited,
  recordSubmission,
  sanitizePlainText,
  validateQuestionBody,
  validationMessage,
  type QuestionCategory,
} from "@/lib/qa";
import CrisisResponse from "./CrisisResponse";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

const MAX_BODY = 500;
const MAX_NAME = 30;

export default function QuestionForm({ open, onClose, onSubmitted }: Props) {
  const [body, setBody] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [category, setCategory] = useState<QuestionCategory>("ncea");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [crisisShown, setCrisisShown] = useState(false);
  const firstFieldRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => firstFieldRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      setError("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !crisisShown) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, crisisShown]);

  const reset = () => {
    setBody("");
    setDisplayName("");
    setCategory("ncea");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Crisis detection — runs BEFORE any network call, on both body and display name.
    if (detectCrisis(body) || detectCrisis(displayName)) {
      // Telemetry: we track that the screen was shown, NOT the content.
      trackEvent("qa_crisis_screen_shown", { source: "question_form" });
      setCrisisShown(true);
      return;
    }

    if (isRateLimited()) {
      setError("You've submitted 3 questions in the past day — please come back tomorrow.");
      return;
    }

    const issue = validateQuestionBody(body);
    if (issue) {
      setError(validationMessage(issue));
      return;
    }

    const cleanBody = sanitizePlainText(body);
    const cleanName = sanitizePlainText(displayName).slice(0, MAX_NAME) || "Anonymous Student";

    setSubmitting(true);
    const supabase = createClient();
    const { error: insertError } = await supabase.from("questions").insert({
      body: cleanBody,
      category,
      display_name: cleanName,
      status: "pending",
    });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong. Please try again in a moment.");
      return;
    }

    recordSubmission();
    trackEvent("question_submitted", { category });
    reset();
    onSubmitted();
    onClose();
  };

  if (!open) return null;

  const remaining = MAX_BODY - body.length;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qa-form-heading"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute inset-0 bg-navy/40 backdrop-blur-sm animate-fade-in"
        />
        <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl animate-fade-in-up max-h-[90vh] flex flex-col">
          <header className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 id="qa-form-heading" className="font-bold text-navy">Ask a question</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 rounded-lg text-navy/50 hover:bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4">
            {/* Guidelines */}
            <div className="rounded-xl bg-teal-50/60 p-4 text-sm text-teal-900 space-y-2">
              <div className="flex items-start gap-2">
                <ShieldCheck size={16} strokeWidth={2} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Your question is anonymous — we never collect your email or identity.</span>
              </div>
              <div className="flex items-start gap-2">
                <Info size={16} strokeWidth={2} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Questions are reviewed before they appear (usually within 24 hours).</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} strokeWidth={2} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  For urgent help, contact your school counsellor or{" "}
                  <a href="tel:1737" className="font-semibold underline">call/text 1737 (free, 24/7)</a>.
                </span>
              </div>
            </div>

            {/* Category */}
            <label className="block">
              <span className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
                Category <span className="text-coral" aria-hidden="true">*</span>
              </span>
              <select
                ref={firstFieldRef}
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestionCategory)}
                className="qa-input"
                required
              >
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_CONFIG[c].label}</option>
                ))}
              </select>
            </label>

            {/* Body */}
            <label className="block">
              <span className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
                Your question <span className="text-coral" aria-hidden="true">*</span>
              </span>
              <textarea
                required
                minLength={10}
                maxLength={MAX_BODY}
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Be specific — the more detail, the better the answer."
                className="qa-input resize-none"
              />
              <div className="mt-1 flex justify-end text-xs text-navy/40 tabular-nums">
                {remaining} chars left
              </div>
            </label>

            {/* Display name */}
            <label className="block">
              <span className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
                Display name (optional)
              </span>
              <input
                type="text"
                maxLength={MAX_NAME}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Anonymous Student"
                className="qa-input"
              />
              <p className="text-xs text-navy/40 mt-1">
                Don&apos;t use your real name. Something like &quot;Year 12 in Auckland&quot; is fine.
              </p>
            </label>

            {error && <p role="alert" className="text-sm text-coral">{error}</p>}
          </form>

          <footer className="flex gap-3 p-5 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 rounded-xl bg-teal text-white px-4 py-2.5 text-sm font-semibold hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              {submitting ? "Submitting…" : "Submit question"}
            </button>
          </footer>
        </div>
      </div>

      {crisisShown && <CrisisResponse onContinue={() => setCrisisShown(false)} />}

      <style jsx>{`
        :global(.qa-input) {
          width: 100%;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.75rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #1B2A4A;
          background: white;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.qa-input:focus) {
          outline: none;
          border-color: #2A9D8F;
          box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.15);
        }
      `}</style>
    </>
  );
}
