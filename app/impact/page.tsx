"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedStat from "@/components/AnimatedStat";
import Button from "@/components/Button";

interface Stats {
  students: number;
  assessments: number;
  checkpoints: number;
  guides: number;
  modules: number;
  tools: number;
  scholarships: number;
  languages: number;
}

const defaultStats: Stats = { students: 0, assessments: 0, checkpoints: 0, guides: 14, modules: 12, tools: 5, scholarships: 20, languages: 3 };

export default function ImpactPage() {
  const [stats, setStats] = useState<Stats>(defaultStats);

  useEffect(() => {
    fetch("/api/impact-stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-soft via-white to-teal-50/30 py-20 sm:py-28 overflow-hidden">
        <div className="bg-dot-pattern" />
        <Container className="relative text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy mb-4">Our Impact</h1>
          <p className="text-navy/60 text-lg sm:text-xl max-w-2xl mx-auto">Real numbers from a platform built to make a difference.</p>
        </Container>
      </section>

      {/* Live Stats */}
      <section className="py-16 sm:py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <AnimatedStat value={String(stats.students)} label="Students Registered" />
            <AnimatedStat value={String(stats.assessments)} label="Assessments Completed" />
            <AnimatedStat value={String(stats.checkpoints)} label="Module Checkpoints" />
            <AnimatedStat value={String(stats.tools)} label="Interactive Tools" />
          </div>
        </Container>
      </section>

      {/* What We Offer Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-12">What We Offer</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[
                { n: "14", label: "Free Guides", icon: "📚" },
                { n: "12", label: "Action Modules", icon: "✅" },
                { n: "5", label: "Interactive Tools", icon: "🛠️" },
                { n: "8", label: "Universities Covered", icon: "🎓" },
                { n: "20+", label: "Scholarships Listed", icon: "💰" },
                { n: "3", label: "Languages", icon: "🌏" },
              ].map((item) => (
                <Card key={item.label} hover={false} className="p-4 text-center">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="text-2xl font-bold text-teal">{item.n}</p>
                  <p className="text-[10px] text-navy/50 mt-1">{item.label}</p>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-soft">
        <Container>
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-12">Our Timeline</h2>
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal/20" />
              {[
                { date: "March 2026", title: "Platform launched", desc: "Navigate NZ goes live with guides, modules, and tools" },
                { date: "March 2026", title: "14 guides published", desc: "Covering NCEA, university entry, scholarships, and more" },
                { date: "March 2026", title: "12 action modules created", desc: "Practical checklists for every stage of the journey" },
                { date: "March 2026", title: "5 interactive tools launched", desc: "Credit calculator, scholarship finder, uni matcher, and more" },
                { date: "March 2026", title: "Hindi & Chinese translations", desc: "Making the platform accessible to more families" },
                { date: "Coming soon", title: "School partnerships", desc: "Working with NZ schools to reach more students", dashed: true },
              ].map((m, i) => (
                <div key={i} className="flex gap-6 mb-8 last:mb-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold flex-shrink-0 relative z-10 ${m.dashed ? "bg-teal/10 text-teal border-2 border-dashed border-teal/30" : "bg-teal text-white"}`}>
                    {m.date.slice(-2)}
                  </div>
                  <div className="pt-1">
                    <p className="text-xs text-navy/40 mb-0.5">{m.date}</p>
                    <p className="font-semibold text-navy">{m.title}</p>
                    <p className="text-sm text-navy/60">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission + Nonprofit */}
      <section className="py-16 sm:py-20 bg-teal text-white text-center">
        <Container>
          <p className="text-xl sm:text-2xl font-bold mb-3">100% free. 100% independent. 100% nonprofit.</p>
          <p className="text-white/70 max-w-xl mx-auto">Built by a first-generation immigrant student in Auckland. No ads, no sponsors, no data selling — ever.</p>
          <div className="mt-8">
            <Button href="/guides" variant="secondary">Explore the Platform</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
