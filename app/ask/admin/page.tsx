"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X, Pin, Star, ShieldCheck } from "lucide-react";
import Container from "@/components/Container";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { CATEGORY_CONFIG, timeAgo, type Answer, type Question } from "@/lib/qa";

const ADMIN_EMAIL = "admin@navigatenz.org";
type Tab = "pending-q" | "pending-a" | "all";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("pending-q");
  const [pendingQs, setPendingQs] = useState<Question[]>([]);
  const [pendingAs, setPendingAs] = useState<Answer[]>([]);
  const [allQs, setAllQs] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      router.replace("/ask");
    }
  }, [user, loading, router]);

  const refresh = async () => {
    setLoadingData(true);
    const supabase = createClient();
    const [q1, q2, q3] = await Promise.all([
      supabase.from("questions").select("*").eq("status", "pending").order("created_at", { ascending: false }),
      supabase.from("answers").select("*").eq("status", "pending").order("created_at", { ascending: false }),
      supabase.from("questions").select("*").order("created_at", { ascending: false }).limit(200),
    ]);
    setPendingQs(q1.data ?? []);
    setPendingAs(q2.data ?? []);
    setAllQs(q3.data ?? []);
    setLoadingData(false);
  };

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) refresh();
  }, [user]);

  if (loading || !user) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-soft">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }
  if (user.email !== ADMIN_EMAIL) return null;

  const supabase = createClient();

  const updateQuestion = async (id: string, patch: Partial<Question>) => {
    await supabase.from("questions").update(patch).eq("id", id);
    refresh();
  };

  const updateAnswer = async (id: string, patch: Partial<Answer>) => {
    await supabase.from("answers").update(patch).eq("id", id);
    refresh();
  };

  const acceptAnswer = async (a: Answer) => {
    // Clear other accepted answers on this question, then set this one.
    await supabase.from("answers").update({ is_accepted: false }).eq("question_id", a.question_id);
    await supabase.from("answers").update({ is_accepted: true, status: "approved" }).eq("id", a.id);
    refresh();
  };

  const filteredAllQs = allQs.filter((q) =>
    search ? q.body.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <section className="min-h-screen bg-soft py-10 sm:py-14">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck size={20} className="text-teal" aria-hidden="true" />
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">Q&amp;A moderation</h1>
          </div>

          <div role="tablist" aria-label="Moderation sections" className="flex gap-2 mb-6 flex-wrap">
            <TabButton active={tab === "pending-q"} onClick={() => setTab("pending-q")}>
              Pending Questions ({pendingQs.length})
            </TabButton>
            <TabButton active={tab === "pending-a"} onClick={() => setTab("pending-a")}>
              Pending Answers ({pendingAs.length})
            </TabButton>
            <TabButton active={tab === "all"} onClick={() => setTab("all")}>
              All Questions
            </TabButton>
          </div>

          {loadingData && <p className="text-sm text-navy/50">Loading…</p>}

          {tab === "pending-q" && (
            <div className="space-y-3">
              {pendingQs.length === 0 ? (
                <p className="rounded-2xl bg-white border border-gray-100 p-8 text-center text-navy/50">
                  Nothing pending. Inbox zero.
                </p>
              ) : (
                pendingQs.map((q) => (
                  <article key={q.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORY_CONFIG[q.category].badgeClass}`}>
                        {CATEGORY_CONFIG[q.category].label}
                      </span>
                      <span className="text-navy/40">{timeAgo(q.created_at)}</span>
                      <span className="text-navy/40">· {q.display_name}</span>
                    </div>
                    <p className="text-navy leading-relaxed whitespace-pre-wrap mb-4">{q.body}</p>
                    <div className="flex flex-wrap gap-2">
                      <Action tone="approve" onClick={() => updateQuestion(q.id, { status: "approved" })}>
                        <Check size={14} strokeWidth={2.5} aria-hidden="true" /> Approve
                      </Action>
                      <Action tone="hide" onClick={() => updateQuestion(q.id, { status: "hidden" })}>
                        <X size={14} strokeWidth={2.5} aria-hidden="true" /> Hide
                      </Action>
                      <Action tone="pin" onClick={() => updateQuestion(q.id, { status: "pinned", is_featured: true })}>
                        <Pin size={14} strokeWidth={2.5} aria-hidden="true" /> Pin
                      </Action>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {tab === "pending-a" && (
            <div className="space-y-3">
              {pendingAs.length === 0 ? (
                <p className="rounded-2xl bg-white border border-gray-100 p-8 text-center text-navy/50">
                  No pending answers.
                </p>
              ) : (
                pendingAs.map((a) => (
                  <article key={a.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className="font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy text-white">
                        {a.author_type}
                      </span>
                      <span className="text-navy/60">{a.author_name}</span>
                      <span className="text-navy/40">· {timeAgo(a.created_at)}</span>
                    </div>
                    <p className="text-navy/80 leading-relaxed whitespace-pre-wrap mb-3">{a.body}</p>
                    <p className="text-xs text-navy/40 mb-3">
                      On question:{" "}
                      <Link href={`/ask/${a.question_id}`} className="text-teal hover:underline">view</Link>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Action tone="approve" onClick={() => updateAnswer(a.id, { status: "approved" })}>
                        <Check size={14} strokeWidth={2.5} aria-hidden="true" /> Approve
                      </Action>
                      <Action tone="hide" onClick={() => updateAnswer(a.id, { status: "hidden" })}>
                        <X size={14} strokeWidth={2.5} aria-hidden="true" /> Hide
                      </Action>
                      <Action tone="accept" onClick={() => acceptAnswer(a)}>
                        <Star size={14} strokeWidth={2.5} aria-hidden="true" /> Approve + Accept
                      </Action>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {tab === "all" && (
            <>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search question body…"
                aria-label="Search all questions"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
              <div className="space-y-2">
                {filteredAllQs.map((q) => (
                  <Link
                    key={q.id}
                    href={`/ask/${q.id}`}
                    className="block rounded-2xl bg-white border border-gray-100 shadow-sm p-4 hover:border-teal/40 transition-all"
                  >
                    <div className="flex items-center gap-2 text-xs mb-1.5 flex-wrap">
                      <span className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORY_CONFIG[q.category].badgeClass}`}>
                        {CATEGORY_CONFIG[q.category].label}
                      </span>
                      <span className="font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy text-white">
                        {q.status}
                      </span>
                      <span className="text-navy/40">{timeAgo(q.created_at)}</span>
                      <span className="text-navy/40">· {q.upvotes} ↑ · {q.answer_count} answers</span>
                    </div>
                    <p className="text-sm text-navy line-clamp-2">{q.body}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
        active ? "bg-teal text-white shadow-sm" : "bg-white text-navy/60 border border-gray-200 hover:border-teal hover:text-teal"
      }`}
    >
      {children}
    </button>
  );
}

function Action({ tone, onClick, children }: { tone: "approve" | "hide" | "pin" | "accept"; onClick: () => void; children: React.ReactNode }) {
  const classes = {
    approve: "bg-teal text-white hover:bg-teal-600",
    hide: "bg-coral text-white hover:bg-coral-600",
    pin: "bg-gold text-navy hover:bg-gold-400",
    accept: "bg-navy text-white hover:bg-navy-600",
  }[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${classes}`}
    >
      {children}
    </button>
  );
}
