"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowUp, CheckCircle2, MessageCircle } from "lucide-react";
import Container from "@/components/Container";
import AnswerForm from "@/components/ask/AnswerForm";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";
import {
  CATEGORY_CONFIG,
  CATEGORY_TO_GUIDES,
  getUpvotedQuestions,
  getVisitorId,
  recordUpvote,
  timeAgo,
  type Answer,
  type AnswerAuthorType,
  type Question,
} from "@/lib/qa";

const authorBadge: Record<AnswerAuthorType, string> = {
  team: "bg-teal text-white",
  volunteer: "bg-navy text-white",
  community: "bg-gold text-navy",
};

const GUIDE_TITLES: Record<string, string> = {
  "understanding-ncea-credits": "Understanding NCEA Credits",
  "nz-qualification-changes": "NZ Qualification Changes",
  "ncea-vs-cambridge-vs-ib": "NCEA vs Cambridge vs IB",
  "how-to-get-into-university": "How to Get Into a NZ University",
  "university-open-days": "Making the Most of Open Days",
  "first-gen-experience": "The First-Gen Experience",
  "scholarship-guide": "Scholarship Guide",
  "studylink-complete-guide": "StudyLink Complete Guide",
  "subject-selection-strategy": "Subject Selection Strategy",
  "understanding-nz-schools": "Understanding NZ Schools",
  "your-rights-and-support": "Your Rights and Support",
  "guide-for-parents": "A Guide for Parents and Families",
};

export default function QuestionDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const loadData = async () => {
    const supabase = createClient();
    const [qRes, aRes] = await Promise.all([
      supabase.from("questions").select("*").eq("id", id).in("status", ["approved", "answered", "pinned"]).single(),
      supabase.from("answers").select("*").eq("question_id", id).eq("status", "approved").order("is_accepted", { ascending: false }).order("created_at", { ascending: true }),
    ]);
    if (!qRes.data) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setQuestion(qRes.data);
    setAnswers(aRes.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    setHasUpvoted(getUpvotedQuestions().has(id));
    trackEvent("question_viewed", { question_id: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const upvote = async () => {
    if (!question || hasUpvoted) return;
    const supabase = createClient();
    setHasUpvoted(true);
    setQuestion({ ...question, upvotes: question.upvotes + 1 });
    const { error } = await supabase
      .from("question_upvotes")
      .insert({ question_id: question.id, visitor_id: getVisitorId() });
    if (error && !error.message?.toLowerCase().includes("duplicate")) {
      setQuestion({ ...question, upvotes: Math.max(0, question.upvotes - 1) });
    }
    recordUpvote(question.id);
    trackEvent("question_upvoted", { question_id: question.id });
  };

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-soft py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-24 bg-white rounded-2xl" />
            <div className="h-40 bg-white rounded-2xl" />
          </div>
        </Container>
      </section>
    );
  }

  if (notFound || !question) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-soft">
        <Container className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-navy mb-3">Question not found</h1>
          <p className="text-navy/60 mb-6">It may have been removed, or it&apos;s still pending review.</p>
          <button
            type="button"
            onClick={() => router.push("/ask")}
            className="rounded-xl bg-teal text-white px-5 py-2.5 text-sm font-semibold hover:bg-teal-600 transition-all"
          >
            Back to Q&amp;A
          </button>
        </Container>
      </section>
    );
  }

  const config = CATEGORY_CONFIG[question.category];
  const relatedGuides = CATEGORY_TO_GUIDES[question.category] ?? [];

  return (
    <section className="min-h-screen bg-soft py-10 sm:py-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 text-sm text-navy/60 hover:text-navy transition-colors mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded px-1"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to questions
          </Link>

          {/* Question */}
          <article className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={upvote}
                disabled={hasUpvoted}
                aria-label={hasUpvoted ? `You've upvoted this — ${question.upvotes} total` : `Upvote this — ${question.upvotes}`}
                className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                  hasUpvoted ? "border-teal bg-teal text-white cursor-default" : "border-gray-200 text-navy/60 hover:border-teal hover:text-teal"
                }`}
              >
                <ArrowUp size={18} strokeWidth={2.25} aria-hidden="true" />
                <span className="tabular-nums">{question.upvotes}</span>
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badgeClass}`}>
                    {config.label}
                  </span>
                  <span className="text-xs text-navy/40">{timeAgo(question.created_at)}</span>
                  {question.display_name !== "Anonymous Student" && (
                    <>
                      <span className="text-xs text-navy/20" aria-hidden="true">·</span>
                      <span className="text-xs text-navy/50 truncate">{question.display_name}</span>
                    </>
                  )}
                </div>
                <p className="text-lg sm:text-xl text-navy leading-relaxed whitespace-pre-wrap">{question.body}</p>
              </div>
            </div>
          </article>

          {/* Answers */}
          <h2 className="text-lg font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
            {answers.length === 0 ? "No answers yet" : `${answers.length} answer${answers.length !== 1 ? "s" : ""}`}
          </h2>

          {answers.length === 0 ? (
            <p className="rounded-2xl bg-white border border-gray-100 p-6 text-sm text-navy/60">
              Our team will respond soon. If you&apos;re a Navigate NZ volunteer, sign in to answer.
            </p>
          ) : (
            <ol className="space-y-4">
              {answers.map((a) => (
                <li key={a.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                  {a.is_accepted && (
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-teal mb-3">
                      <CheckCircle2 size={16} strokeWidth={2.25} aria-hidden="true" />
                      Accepted answer
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${authorBadge[a.author_type]}`}>
                      {a.author_type === "team" ? "Navigate NZ Team" : a.author_type === "volunteer" ? "Volunteer" : "Community"}
                    </span>
                    <span className="text-xs text-navy/40">{a.author_name}</span>
                    <span className="text-xs text-navy/20" aria-hidden="true">·</span>
                    <span className="text-xs text-navy/40">{timeAgo(a.created_at)}</span>
                  </div>
                  <p className="text-navy/80 leading-relaxed whitespace-pre-wrap">{a.body}</p>
                </li>
              ))}
            </ol>
          )}

          <h3 className="text-sm font-semibold text-navy/60 uppercase tracking-wider mt-10 mb-3">Answer this question</h3>
          <AnswerForm questionId={question.id} onSubmitted={() => { /* refresh isn't needed since it goes to pending */ }} />

          {/* Related guides */}
          {relatedGuides.length > 0 && (
            <section className="mt-12">
              <h3 className="text-sm font-semibold text-navy/60 uppercase tracking-wider mb-3">Related guides</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedGuides.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/guides/${slug}`}
                      className="block rounded-2xl bg-white border border-gray-100 shadow-sm p-4 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                    >
                      {GUIDE_TITLES[slug] || slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Container>
    </section>
  );
}
