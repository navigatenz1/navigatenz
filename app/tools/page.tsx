import Container from "@/components/Container";
import Card from "@/components/Card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tools",
  description:
    "Interactive tools to help NZ students plan, prepare, and apply for university. Credit calculator, university matcher, scholarship finder, key dates, and personal statement helper — all free, no account required.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Tools — Navigate NZ",
    description: "Free interactive tools for NZ students: credit calculator, university matcher, scholarship finder, and more.",
    url: "https://navigatenz.org/tools",
  },
};

const tools = [
  {
    href: "/tools/cost-calculator",
    icon: "💰",
    title: "University Cost Calculator",
    desc: "Estimate the true cost — tuition, accommodation, living",
    duration: "~2 minutes",
    preview: { label: "Total 3-year cost", value: "≈ $52,000", chip: "2026 est." },
  },
  {
    href: "/tools/career-pathways",
    icon: "🧭",
    title: "Career Pathways",
    desc: "Match school subjects to real NZ careers (either direction)",
    duration: "~3 minutes",
    preview: { label: "Top career match", value: "Software Engineer", chip: "90% fit" },
  },
  {
    href: "/tools/university-matcher",
    icon: "🎓",
    title: "University Matcher",
    desc: "Find your best-fit NZ university in 5 questions",
    duration: "~3 minutes",
    preview: { label: "Your top match", value: "University of Auckland", chip: "94% fit" },
  },
  {
    href: "/tools/credit-calculator",
    icon: "🧮",
    title: "NCEA Credit Calculator",
    desc: "Check if you're on track for NCEA and University Entrance",
    duration: "~2 minutes",
    preview: { label: "UE progress", value: "42 of 80 credits", chip: "On track" },
  },
  {
    href: "/tools/living-costs",
    icon: "🏠",
    title: "Hall vs Flatting",
    desc: "Compare accommodation costs in every NZ uni city",
    duration: "Browse anytime",
    preview: { label: "Cheapest student city", value: "Dunedin", chip: "≈ $360/wk" },
  },
  {
    href: "/tools/pathway-finder",
    icon: "🗺️",
    title: "Pathway Finder",
    desc: "Which qualification pathway is right for you?",
    duration: "~2 minutes",
    preview: { label: "4 quick questions", value: "NCEA · Cambridge · IB", chip: "Decision tree" },
  },
  {
    href: "/tools/scholarship-finder",
    icon: "🔍",
    title: "Scholarship Finder",
    desc: "Search 20+ NZ scholarships with smart filters",
    duration: "~2 minutes",
    preview: { label: "Matching scholarships", value: "7 scholarships", chip: "Up to $10k" },
  },
  {
    href: "/tools/key-dates",
    icon: "📅",
    title: "Key Dates Timeline",
    desc: "Never miss a deadline — all 2026 education dates",
    duration: "Read anytime",
    preview: { label: "Next deadline", value: "StudyLink opens", chip: "12 days" },
  },
  {
    href: "/tools/personal-statement",
    icon: "✍️",
    title: "Personal Statement Helper",
    desc: "Write a university personal statement step by step",
    duration: "~15 minutes",
    preview: { label: "Draft progress", value: "Step 3 of 5", chip: "Auto-saves" },
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-16 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }}
          aria-hidden="true"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-sm text-white/40 mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/70">Tools</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            100% Free · No Account Required
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Free Tools</h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl">
            Interactive tools to help you plan, prepare, and apply — all free, all yours.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-2xl"
              >
                <Card accent className="h-full p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl" aria-hidden="true">{tool.icon}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal bg-teal-50 px-2 py-1 rounded-full">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      No account needed
                    </span>
                  </div>

                  <h2 className="font-bold text-navy text-lg mb-2 group-hover:text-teal transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-navy/60 text-sm leading-relaxed mb-4">{tool.desc}</p>

                  {/* Mini-preview */}
                  <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
                    <div className="rounded-xl bg-soft px-4 py-3">
                      <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-1">
                        {tool.preview.label}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-navy truncate">{tool.preview.value}</p>
                        <span className="flex-shrink-0 text-[10px] font-semibold text-teal bg-white px-2 py-0.5 rounded-full">
                          {tool.preview.chip}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-navy/50">{tool.duration}</span>
                      <span className="text-teal font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Try it <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
