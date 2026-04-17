"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { CATEGORY_CONFIG, type Question, type QuestionCategory } from "@/lib/qa";

export default function RelatedQuestions({ category, limit = 3 }: { category: QuestionCategory; limit?: number }) {
  const [questions, setQuestions] = useState<Question[] | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("questions")
        .select("*")
        .eq("category", category)
        .in("status", ["approved", "answered", "pinned"])
        .order("upvotes", { ascending: false })
        .limit(limit);
      if (active) setQuestions((data as Question[] | null) ?? []);
    })();
    return () => { active = false; };
  }, [category, limit]);

  if (questions === null) {
    return (
      <section className="mt-16 not-prose">
        <h2 className="text-xl font-bold text-navy mb-4">Questions from students like you</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (questions.length === 0) {
    return (
      <section className="mt-16 not-prose">
        <h2 className="text-xl font-bold text-navy mb-2">Questions from students like you</h2>
        <p className="text-sm text-navy/60 mb-4">No questions yet in this category — be the first to ask.</p>
        <Link
          href="/ask"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
        >
          Ask a question <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </section>
    );
  }

  return (
    <section className="mt-16 not-prose">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">Questions from students like you</h2>
        <Link
          href={`/ask?category=${category}`}
          className="text-sm font-semibold text-teal hover:underline inline-flex items-center gap-1"
        >
          See all <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <ul className="space-y-2">
        {questions.map((q) => (
          <li key={q.id}>
            <Link
              href={`/ask/${q.id}`}
              className="group block rounded-2xl bg-white border border-gray-100 shadow-sm p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORY_CONFIG[q.category].badgeClass}`}>
                  {CATEGORY_CONFIG[q.category].label}
                </span>
                <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-navy/50">
                  <MessageCircle size={12} strokeWidth={2} aria-hidden="true" />
                  {q.answer_count}
                </span>
              </div>
              <p className="mt-2 text-sm text-navy group-hover:text-teal transition-colors line-clamp-2">
                {q.body}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
