"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { trackEvent } from "@/lib/analytics";
import { sanitizePlainText } from "@/lib/qa";

interface Props {
  questionId: string;
  onSubmitted: () => void;
}

const MAX = 2000;

export default function AnswerForm({ questionId, onSubmitted }: Props) {
  const { user } = useAuth();
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="rounded-2xl bg-soft p-5 text-center">
        <p className="text-sm text-navy/70">
          Only logged-in volunteers and team members can answer questions.{" "}
          <a href="/auth/signin" className="text-teal font-semibold hover:underline">Sign in to answer</a>
          .
        </p>
      </div>
    );
  }

  const authorName = user.user_metadata?.full_name ?? "Community Member";
  const authorType = user.email === "admin@navigatenz.org" ? "team" : "volunteer";
  const displayAuthorName = authorType === "team" ? "Navigate NZ Team" : authorName;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const clean = sanitizePlainText(body);
    if (clean.length < 10) {
      setError("Please write at least 10 characters.");
      return;
    }
    if (clean.length > MAX) {
      setError(`Please keep answers under ${MAX} characters.`);
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: insertError } = await supabase.from("answers").insert({
      question_id: questionId,
      body: clean,
      author_type: authorType,
      author_name: displayAuthorName,
      status: "pending",
    });
    setSubmitting(false);

    if (insertError) {
      setError("Couldn't submit your answer — please try again shortly.");
      return;
    }

    trackEvent("answer_submitted", { question_id: questionId });
    setBody("");
    onSubmitted();
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white border border-gray-100 p-5 space-y-3">
      <label className="block">
        <span className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
          Answer as <span className="text-teal">{displayAuthorName}</span>
        </span>
        <textarea
          required
          minLength={10}
          maxLength={MAX}
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Be warm, specific, and link to relevant guides where they help."
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all resize-none"
        />
        <div className="mt-1 flex justify-end text-xs text-navy/40 tabular-nums">
          {MAX - body.length} chars left
        </div>
      </label>

      {error && <p role="alert" className="text-sm text-coral">{error}</p>}

      <p className="text-xs text-navy/40">
        Your answer goes to a review queue and appears after admin approval.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-teal text-white px-5 py-2.5 text-sm font-semibold hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      >
        {submitting ? "Submitting…" : "Submit answer"}
      </button>
    </form>
  );
}
