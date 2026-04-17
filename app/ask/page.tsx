"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, ShieldCheck } from "lucide-react";
import Container from "@/components/Container";
import QuestionCard from "@/components/ask/QuestionCard";
import QuestionForm from "@/components/ask/QuestionForm";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";
import {
  ALL_CATEGORIES,
  CATEGORY_CONFIG,
  getUpvotedQuestions,
  getVisitorId,
  recordUpvote,
  type Question,
  type QuestionCategory,
} from "@/lib/qa";

type SortKey = "recent" | "top" | "unanswered";
const PAGE_SIZE = 20;

export default function AskPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-soft" />}>
      <AskPageInner />
    </Suspense>
  );
}

function AskPageInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as QuestionCategory | null;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<QuestionCategory | "all">(
    initialCategory && ALL_CATEGORIES.includes(initialCategory) ? initialCategory : "all"
  );
  const [sort, setSort] = useState<SortKey>("recent");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());

  useEffect(() => {
    setUpvoted(getUpvotedQuestions());
  }, []);

  useEffect(() => {
    trackEvent("qa_page_viewed", { filter: category, sort });
  }, [category, sort]);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("questions")
        .select("*")
        .in("status", ["approved", "answered", "pinned"])
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(200);
      if (active) {
        setQuestions(data ?? []);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    let rows = questions;
    if (category !== "all") rows = rows.filter((q) => q.category === category);

    // Always keep pinned questions at the very top within the active filter.
    const pinned = rows.filter((q) => q.is_featured);
    const rest = rows.filter((q) => !q.is_featured);

    if (sort === "top") rest.sort((a, b) => b.upvotes - a.upvotes);
    else if (sort === "unanswered") {
      rest.sort((a, b) => {
        if (a.answer_count === 0 && b.answer_count > 0) return -1;
        if (b.answer_count === 0 && a.answer_count > 0) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    } else {
      rest.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return [...pinned, ...rest];
  }, [questions, category, sort]);

  const shown = filtered.slice(0, visible);

  const onUpvote = async (q: Question) => {
    if (upvoted.has(q.id)) return;
    const supabase = createClient();
    const visitorId = getVisitorId();

    // Optimistic update
    setUpvoted((prev) => {
      const next = new Set(prev);
      next.add(q.id);
      return next;
    });
    setQuestions((prev) => prev.map((x) => (x.id === q.id ? { ...x, upvotes: x.upvotes + 1 } : x)));

    const { error } = await supabase
      .from("question_upvotes")
      .insert({ question_id: q.id, visitor_id: visitorId });

    if (error) {
      // Unique constraint or other failure — revert optimistic update for count.
      // Keep the localStorage record so we don't retry repeatedly.
      if (!error.message?.toLowerCase().includes("duplicate")) {
        setQuestions((prev) => prev.map((x) => (x.id === q.id ? { ...x, upvotes: Math.max(0, x.upvotes - 1) } : x)));
      }
    }

    recordUpvote(q.id);
    trackEvent("question_upvoted", { question_id: q.id });
  };

  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy to-teal-900 py-14 sm:py-20 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/80">Q&amp;A</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Ask the community</h1>
              <p className="mt-3 text-white/70 text-lg max-w-2xl leading-relaxed">
                No question is too basic. Ask anonymously — we&apos;ve all been there.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-teal text-white px-5 py-3 font-semibold shadow-sm hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy transition-all"
            >
              <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
              Ask a question
            </button>
          </div>
        </Container>
      </section>

      <section className="py-10 bg-soft min-h-[50vh]">
        <Container>
          {/* Filters */}
          <div className="max-w-5xl mx-auto mb-6 space-y-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
              <CategoryPill active={category === "all"} label="All" onClick={() => setCategory("all")} />
              {ALL_CATEGORIES.map((c) => (
                <CategoryPill
                  key={c}
                  active={category === c}
                  label={CATEGORY_CONFIG[c].label}
                  onClick={() => setCategory(c)}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-navy/40 font-semibold uppercase tracking-wider">Sort</span>
              {(["recent", "top", "unanswered"] as SortKey[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSort(s)}
                  aria-pressed={sort === s}
                  className={`px-3 py-1 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                    sort === s ? "bg-teal text-white" : "bg-white text-navy/60 border border-gray-200 hover:border-teal hover:text-teal"
                  }`}
                >
                  {s === "recent" ? "Most recent" : s === "top" ? "Most upvoted" : "Unanswered"}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {loading ? (
              <>{[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-white border border-gray-100 animate-pulse" />
              ))}</>
            ) : shown.length === 0 ? (
              <div className="rounded-2xl bg-white border border-gray-100 p-10 text-center text-navy/50">
                No questions here yet. Be the first to ask.
              </div>
            ) : (
              shown.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  hasUpvoted={upvoted.has(q.id)}
                  onUpvote={onUpvote}
                />
              ))
            )}

            {filtered.length > visible && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-xl bg-white border border-gray-200 px-6 py-2.5 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                >
                  Load more questions
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>

      <QuestionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmitted={() => setToast("Question submitted! It'll appear after a quick review (usually within 24 hours).")}
      />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-sm rounded-2xl bg-navy text-white px-5 py-4 shadow-xl shadow-navy/30 animate-fade-in-up"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" className="flex-shrink-0 mt-0.5 text-teal-300" />
            <p className="text-sm">{toast}</p>
            <button
              type="button"
              onClick={() => setToast("")}
              aria-label="Dismiss"
              className="flex-shrink-0 text-white/50 hover:text-white text-xs"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function CategoryPill({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
        active ? "bg-teal text-white shadow-sm shadow-teal/20" : "bg-white text-navy/60 border border-gray-200 hover:border-teal hover:text-teal"
      }`}
    >
      {label}
    </button>
  );
}
