"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";
import Button from "@/components/Button";
import { createClient } from "@/lib/supabase/client";

interface Stats {
  users: number;
  assessments: number;
  checkpoints: number;
}

export default function ImpactPage() {
  const [stats, setStats] = useState<Stats>({ users: 0, assessments: 0, checkpoints: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("assessments").select("id", { count: "exact", head: true }),
      supabase.from("module_progress").select("id", { count: "exact", head: true }).eq("completed", true),
    ]).then(([usersRes, assessRes, modRes]) => {
      setStats({
        users: usersRes.count || 0,
        assessments: assessRes.count || 0,
        checkpoints: modRes.count || 0,
      });
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
        <Container className="relative text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Our Impact</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">Real numbers. Real students. Real progress.</p>
        </Container>
      </section>

      {/* Live Stats */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-teal">{loaded ? stats.users || "—" : "—"}</p>
              <p className="text-navy/50 text-xs mt-1">Registered Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-teal">{loaded ? stats.assessments || "—" : "—"}</p>
              <p className="text-navy/50 text-xs mt-1">Assessments Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-teal">{loaded ? stats.checkpoints || "—" : "—"}</p>
              <p className="text-navy/50 text-xs mt-1">Module Checkpoints</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-teal">14</p>
              <p className="text-navy/50 text-xs mt-1">Guides Published</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-teal">12</p>
              <p className="text-navy/50 text-xs mt-1">Action Modules</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-teal">3</p>
              <p className="text-navy/50 text-xs mt-1">Languages</p>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Offer */}
      <section className="py-16 sm:py-20 bg-soft">
        <Container>
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-12">What We Offer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: "📚", title: "Free Guides", desc: "14 in-depth articles in plain language" },
                { icon: "✅", title: "Action Modules", desc: "12 practical checklists with progress tracking" },
                { icon: "🗺️", title: "Personalised Pathway", desc: "Assessment quiz with custom roadmap" },
                { icon: "🎓", title: "University Matcher", desc: "Find your best-fit NZ university" },
              ].map((item) => (
                <Card key={item.title} hover={false} accent className="p-6 text-center">
                  <p className="text-2xl mb-3">{item.icon}</p>
                  <h3 className="font-semibold text-navy text-sm mb-1">{item.title}</h3>
                  <p className="text-navy/50 text-xs">{item.desc}</p>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission + Free */}
      <section className="py-16 sm:py-20 bg-teal text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              To make the path to university in New Zealand clear, accessible, and achievable for every first-generation student and their family.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full text-sm font-medium">
              $0 forever · No ads · No sponsors · No data selling
            </div>
          </div>
        </Container>
      </section>

      {/* Coming Soon */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-8">Coming Soon</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "More Languages", desc: "Hindi, Chinese, and more" },
                  { title: "More Guides", desc: "Scholarship deep-dives, career guides" },
                  { title: "Community", desc: "Connect with other first-gen students" },
                ].map((item) => (
                  <Card key={item.title} hover={false} className="p-5 text-center">
                    <h3 className="font-semibold text-navy text-sm mb-1">{item.title}</h3>
                    <p className="text-navy/50 text-xs">{item.desc}</p>
                  </Card>
                ))}
              </div>
              <div className="mt-10">
                <Button href="/guides">Explore the Platform</Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
