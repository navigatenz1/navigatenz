"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";
import { modules, moduleCategories } from "@/lib/modules";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";

export default function ModulesPage() {
  const { user } = useAuth();
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("module_progress")
      .select("module_slug")
      .eq("user_id", user.id)
      .eq("completed", true)
      .then(({ data }) => {
        if (data) setCompletedSlugs(new Set(data.map((r) => r.module_slug)));
      });
  }, [user]);

  const completedCount = modules.filter((m) => completedSlugs.has(m.slug)).length;

  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
        <Container className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            100% Free · Self-Paced
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Free Action Modules</h1>
          <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-2xl">
            Practical steps to keep you on track. Check off each action as you complete it.
          </p>
          {user && (
            <div className="mt-6 flex items-center gap-3">
              <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-teal rounded-full transition-all" style={{ width: `${(completedCount / modules.length) * 100}%` }} />
              </div>
              <span className="text-white/50 text-sm">{completedCount}/{modules.length} completed</span>
            </div>
          )}
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          {moduleCategories.map((cat) => (
            <div key={cat} className="mb-14 last:mb-0">
              <h2 className="text-xl font-bold text-navy mb-6">{cat}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules
                  .filter((m) => m.category === cat)
                  .map((mod, i) => {
                    const done = completedSlugs.has(mod.slug);
                    return (
                      <ScrollReveal key={mod.slug} className={i > 0 ? "animation-delay-200" : ""}>
                        <Link href={`/modules/${mod.slug}`} className="group block h-full">
                          <Card className={`h-full flex flex-col overflow-hidden p-0 ${done ? "opacity-75" : ""}`}>
                            <div className={`h-1.5 ${done ? "bg-teal" : "bg-gradient-to-r from-teal to-teal-400"}`} />
                            <div className="p-6 flex flex-col flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">{mod.category}</span>
                                {done && (
                                  <span className="text-[10px] font-semibold text-teal bg-teal-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                    Completed ✓
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-teal transition-colors">{mod.title}</h3>
                              <p className="text-navy/60 text-sm leading-relaxed flex-1">{mod.description}</p>
                              <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-50">
                                <span className="text-xs text-navy/40 flex items-center gap-1.5">
                                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                  {mod.timeEstimate}
                                </span>
                                <span className="text-xs text-navy/40">{mod.checklist.length} items</span>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </ScrollReveal>
                    );
                  })}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
