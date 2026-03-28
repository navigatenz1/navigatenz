import Container from "@/components/Container";
import Card from "@/components/Card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tools",
  description: "Interactive tools to help NZ students plan, prepare, and apply for university.",
};

const tools = [
  { href: "/tools/university-matcher", icon: "🧭", title: "University Matcher", desc: "Find your best-fit NZ university in 5 questions" },
  { href: "/tools/credit-calculator", icon: "🧮", title: "NCEA Credit Calculator", desc: "Check if you're on track for NCEA and University Entrance" },
  { href: "/tools/scholarship-finder", icon: "🔍", title: "Scholarship Finder", desc: "Search 20+ NZ scholarships with smart filters" },
  { href: "/tools/key-dates", icon: "📅", title: "Key Dates Timeline", desc: "Never miss a deadline — all 2026 education dates" },
  { href: "/tools/personal-statement", icon: "✍️", title: "Personal Statement Helper", desc: "Write a university personal statement step by step" },
];

export default function ToolsPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
        <Container className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">100% Free · No Account Required</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Free Tools</h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl">Interactive tools to help you plan, prepare, and apply — all free, all yours.</p>
        </Container>
      </section>
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tools.map((t) => (
              <Link key={t.href} href={t.href} className="group">
                <Card accent className="h-full p-6">
                  <span className="text-3xl mb-4 block">{t.icon}</span>
                  <h2 className="font-bold text-navy text-lg mb-2 group-hover:text-teal transition-colors">{t.title}</h2>
                  <p className="text-navy/60 text-sm leading-relaxed">{t.desc}</p>
                  <span className="text-teal text-sm font-medium mt-4 inline-flex items-center gap-1">Try it <span>&rarr;</span></span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
