"use client";

import Link from "next/link";
import { ArrowUp, MessageCircle, Pin } from "lucide-react";
import { CATEGORY_CONFIG, timeAgo, type Question } from "@/lib/qa";

interface Props {
  question: Question;
  hasUpvoted: boolean;
  onUpvote: (q: Question) => void;
}

export default function QuestionCard({ question: q, hasUpvoted, onUpvote }: Props) {
  const config = CATEGORY_CONFIG[q.category];

  return (
    <article className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4 p-5 sm:p-6">
        {/* Upvote column */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onUpvote(q); }}
          disabled={hasUpvoted}
          aria-label={hasUpvoted ? `You've upvoted this — ${q.upvotes} total` : `Upvote this question — currently ${q.upvotes}`}
          className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
            hasUpvoted
              ? "border-teal bg-teal text-white cursor-default"
              : "border-gray-200 text-navy/60 hover:border-teal hover:text-teal"
          }`}
        >
          <ArrowUp size={16} strokeWidth={2.25} aria-hidden="true" />
          <span className="tabular-nums">{q.upvotes}</span>
        </button>

        {/* Body column */}
        <Link href={`/ask/${q.id}`} className="flex-1 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-lg">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badgeClass}`}>
              {config.label}
            </span>
            {q.is_featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold text-white">
                <Pin size={10} strokeWidth={2.5} aria-hidden="true" />
                Pinned
              </span>
            )}
          </div>
          <p className="text-navy group-hover:text-teal transition-colors leading-snug line-clamp-2">
            {q.body}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-navy/50">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle size={12} strokeWidth={2} aria-hidden="true" />
              <span className={q.answer_count === 0 ? "text-coral font-semibold" : ""}>
                {q.answer_count === 0
                  ? "No answers yet"
                  : `${q.answer_count} answer${q.answer_count !== 1 ? "s" : ""}`}
              </span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{timeAgo(q.created_at)}</span>
            {q.display_name && q.display_name !== "Anonymous Student" && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{q.display_name}</span>
              </>
            )}
          </div>
        </Link>
      </div>
    </article>
  );
}
