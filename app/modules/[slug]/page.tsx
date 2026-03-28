"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { getModuleBySlug, getNextModule } from "@/lib/modules";

export default function ModulePage() {
  const params = useParams();
  const slug = params.slug as string;
  const mod = getModuleBySlug(slug);
  const nextMod = getNextModule(slug);
  const { user } = useAuth();

  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !mod) return;
    const supabase = createClient();
    supabase
      .from("module_progress")
      .select("*")
      .eq("user_id", user.id)
      .like("module_slug", `${slug}%`)
      .then(({ data }: { data: { module_slug: string; completed: boolean }[] | null }) => {
        if (!data) return;
        const done = new Set<string>();
        data.forEach((row: { module_slug: string; completed: boolean }) => {
          if (row.module_slug === slug && row.completed) setModuleCompleted(true);
          if (row.module_slug.startsWith(`${slug}:`) && row.completed) done.add(row.module_slug.split(":")[1]);
        });
        setChecked(done);
      });
  }, [user, slug, mod]);

  const toggleItem = useCallback(
    async (itemId: string) => {
      if (!user || !mod) return;
      const supabase = createClient();
      const itemSlug = `${slug}:${itemId}`;
      const nowChecked = !checked.has(itemId);

      setChecked((prev) => {
        const next = new Set(prev);
        if (nowChecked) next.add(itemId);
        else next.delete(itemId);
        return next;
      });

      await supabase.from("module_progress").upsert(
        { user_id: user.id, module_slug: itemSlug, completed: nowChecked, completed_at: nowChecked ? new Date().toISOString() : null },
        { onConflict: "user_id,module_slug" }
      );

      if (nowChecked) {
        const allDone = mod.checklist.every((c) => c.id === itemId || checked.has(c.id));
        if (allDone && !moduleCompleted) {
          setShowCelebration(true);
          setModuleCompleted(true);
          await supabase.from("module_progress").upsert(
            { user_id: user.id, module_slug: slug, completed: true, completed_at: new Date().toISOString() },
            { onConflict: "user_id,module_slug" }
          );
        }
      }
    },
    [user, slug, checked, mod, moduleCompleted]
  );

  const markComplete = async () => {
    if (!user || !mod) return;
    setSaving(true);
    const supabase = createClient();
    const upserts = mod.checklist.map((c) => ({
      user_id: user.id, module_slug: `${slug}:${c.id}`, completed: true, completed_at: new Date().toISOString(),
    }));
    upserts.push({ user_id: user.id, module_slug: slug, completed: true, completed_at: new Date().toISOString() });
    await supabase.from("module_progress").upsert(upserts, { onConflict: "user_id,module_slug" });
    setChecked(new Set(mod.checklist.map((c) => c.id)));
    setModuleCompleted(true);
    setShowCelebration(true);
    setSaving(false);
  };

  if (!mod) {
    return (
      <section className="py-20"><Container><div className="text-center"><h1 className="text-2xl font-bold text-navy mb-4">Module not found</h1><Button href="/modules">Back to Modules</Button></div></Container></section>
    );
  }

  const progress = mod.checklist.length > 0 ? Math.round((checked.size / mod.checklist.length) * 100) : 0;

  return (
    <>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-10 sm:py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
        <Container className="relative">
          <nav className="mb-4 text-sm text-white/40 flex items-center gap-2">
            <Link href="/modules" className="hover:text-white/70 transition-colors">Modules</Link>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            <span className="text-white/60 truncate">{mod.title}</span>
          </nav>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-white/10 text-white/80">{mod.category}</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{mod.title}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {mod.timeEstimate}
            </span>
            <span>{checked.size}/{mod.checklist.length} actions</span>
          </div>
          <div className="mt-4 h-2 w-full max-w-xs bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal to-gold rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </Container>
      </section>

      <div className="bg-teal-50 border-b border-teal-100">
        <Container className="py-2.5">
          <p className="text-center text-teal-700 text-xs font-medium">Action checklist · Check off each step as you complete it</p>
        </Container>
      </div>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Intro */}
            <p className="text-navy/70 text-lg leading-relaxed mb-8">{mod.intro}</p>

            {/* Celebration banner */}
            {showCelebration && (
              <div className="mb-8 p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center animate-fade-in-up">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-bold text-teal text-lg">All actions complete!</p>
                <p className="text-teal-700 text-sm mt-1">Great work — you&apos;re making real progress.</p>
              </div>
            )}

            {/* Checklist */}
            <div className="p-6 sm:p-8 bg-soft rounded-2xl">
              <h2 className="font-bold text-navy mb-1 text-lg">Your actions</h2>
              <p className="text-navy/50 text-sm mb-6">{checked.size}/{mod.checklist.length} completed</p>
              <div className="space-y-3">
                {mod.checklist.map((item) => {
                  const isDone = checked.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => user ? toggleItem(item.id) : undefined}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${isDone ? "border-teal bg-teal-50/50" : "border-gray-100 bg-white hover:border-gray-200"}`}
                    >
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isDone ? "border-teal bg-teal scale-110" : "border-gray-200"}`}>
                        {isDone && (
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" className="animate-fade-in"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isDone ? "text-teal line-through" : "text-navy"}`}>{item.text}</span>
                    </button>
                  );
                })}
              </div>

              {!user && (
                <p className="text-xs text-navy/40 mt-4 text-center">
                  <Link href="/auth/signin" className="text-teal hover:text-teal-600">Sign in</Link> to save your progress
                </p>
              )}

              {user && !moduleCompleted && (
                <div className="mt-6 text-center">
                  <button onClick={markComplete} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-xl text-sm hover:bg-teal-600 transition-all disabled:opacity-60">
                    {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    Mark All Complete
                  </button>
                </div>
              )}
            </div>

            {/* Related guide */}
            {mod.guideSlug && (
              <div className="mt-8 p-5 bg-white rounded-xl border border-gray-100">
                <p className="text-xs text-navy/40 mb-2">Want to understand the background?</p>
                <Link href={`/guides/${mod.guideSlug}`} className="text-teal font-medium text-sm hover:text-teal-600 transition-colors flex items-center gap-1">
                  Read the full guide <span>&rarr;</span>
                </Link>
              </div>
            )}

            {/* Next module */}
            {nextMod && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm text-navy/40 mb-3">Next module</p>
                <Link href={`/modules/${nextMod.slug}`} className="group flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all">
                  <div>
                    <h3 className="font-semibold text-navy group-hover:text-teal transition-colors text-sm">{nextMod.title}</h3>
                    <p className="text-xs text-navy/50 mt-1">{nextMod.description}</p>
                  </div>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-navy/20 group-hover:text-teal transition-all flex-shrink-0 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            )}

            <div className="mt-8 text-center">
              <Button href="/modules" variant="outline" size="sm">Back to all modules</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
