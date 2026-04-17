"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Search, Briefcase, Sparkles, ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import data from "@/lib/data/careers.json";

type Entry = "career" | "subjects" | null;

const fieldColors: Record<string, string> = {
  health: "bg-teal-50 text-teal-700",
  engineering: "bg-gold-50 text-gold-800",
  science: "bg-teal-50 text-teal-700",
  business: "bg-navy-50 text-navy-600",
  law: "bg-coral-50 text-coral-700",
  arts: "bg-gold-50 text-gold-800",
  design: "bg-coral-50 text-coral-700",
  education: "bg-teal-50 text-teal-700",
  other: "bg-gray-100 text-navy/60",
};

function fieldLabel(f: string) {
  return f[0].toUpperCase() + f.slice(1);
}

export default function CareerPathwaysPage() {
  const [entry, setEntry] = useState<Entry>(null);
  const [query, setQuery] = useState("");
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const filteredCareers = useMemo(() => {
    if (!query) return data.careers;
    const q = query.toLowerCase();
    return data.careers.filter(
      (c) => c.title.toLowerCase().includes(q) || c.field.toLowerCase().includes(q)
    );
  }, [query]);

  const matchedCareers = useMemo(() => {
    if (selectedSubjects.length === 0) return [];
    return data.careers
      .map((c) => {
        const needed = [...c.required, ...c.recommended];
        const overlap = selectedSubjects.filter((s) =>
          needed.some((n) => n.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(n.toLowerCase()))
        ).length;
        const score = Math.round((overlap / Math.max(selectedSubjects.length, 1)) * 100);
        return { career: c, score };
      })
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [selectedSubjects]);

  const selected = selectedCareerId ? data.careers.find((c) => c.id === selectedCareerId) : null;

  function toggleSubject(s: string) {
    setSelectedSubjects((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s].slice(-7)));
  }

  function reset() {
    setEntry(null);
    setSelectedCareerId(null);
    setSelectedSubjects([]);
    setQuery("");
  }

  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy to-teal-900 py-14 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/80">Career Pathways</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Career Pathways</h1>
          <p className="mt-3 text-white/70 text-lg max-w-2xl leading-relaxed">
            Match school subjects to real NZ careers — either direction.
          </p>
        </Container>
      </section>

      <section className="py-12 bg-soft min-h-[60vh]">
        <Container>
          {entry === null && <EntryChoice onPick={setEntry} />}

          {entry === "career" && !selected && (
            <div className="max-w-4xl mx-auto">
              <TopBar title="I know what career I want" onReset={reset} />
              <div className="relative mb-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search careers (e.g. doctor, teacher, engineer)…"
                  aria-label="Search careers"
                  className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 py-3.5 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCareers.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCareerId(c.id)}
                    className="group text-left rounded-2xl bg-white border border-gray-100 shadow-sm p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl" aria-hidden="true">{c.icon}</span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${fieldColors[c.field] || fieldColors.other}`}>
                        {fieldLabel(c.field)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-navy group-hover:text-teal transition-colors">{c.title}</h3>
                    <p className="text-xs text-navy/50 mt-1">{c.yearsOfStudy} years · {c.universities.length} NZ uni{c.universities.length !== 1 && "s"}</p>
                  </button>
                ))}
                {filteredCareers.length === 0 && (
                  <p className="col-span-full text-center text-navy/50 py-10">
                    No careers match &quot;{query}&quot;. Try a different search term.
                  </p>
                )}
              </div>
            </div>
          )}

          {entry === "career" && selected && (
            <CareerDetail career={selected} onBack={() => setSelectedCareerId(null)} />
          )}

          {entry === "subjects" && (
            <div className="max-w-4xl mx-auto">
              <TopBar title="I know what subjects I like" onReset={reset} />
              <p className="text-sm text-navy/60 mb-4">Pick 3–7 subjects you enjoy or do well in. We&apos;ll show careers that match.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {data.subjects.map((s) => {
                  const active = selectedSubjects.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSubject(s)}
                      aria-pressed={active}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                        active
                          ? "border-teal bg-teal text-white"
                          : "border-gray-200 bg-white text-navy/70 hover:border-teal hover:text-teal"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              {selectedSubjects.length === 0 ? (
                <div className="rounded-2xl bg-white border border-gray-100 p-8 text-center text-navy/50">
                  Pick a subject above to see matching careers.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedCareers.map((m) => (
                    <button
                      key={m.career.id}
                      type="button"
                      onClick={() => { setEntry("career"); setSelectedCareerId(m.career.id); }}
                      className="group text-left rounded-2xl bg-white border border-gray-100 shadow-sm p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl" aria-hidden="true">{m.career.icon}</span>
                        <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">{m.score}% match</span>
                      </div>
                      <h3 className="font-semibold text-navy group-hover:text-teal transition-colors">{m.career.title}</h3>
                      <p className="text-xs text-navy/50 mt-1">{m.career.yearsOfStudy} years · {fieldLabel(m.career.field)}</p>
                    </button>
                  ))}
                  {matchedCareers.length === 0 && (
                    <div className="col-span-full rounded-2xl bg-white border border-gray-100 p-8 text-center text-navy/50">
                      No strong matches yet. Try adding or swapping subjects.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function EntryChoice({ onPick }: { onPick: (e: Entry) => void }) {
  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onPick("career")}
        className="group rounded-2xl bg-white border border-gray-100 shadow-sm p-8 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      >
        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
          <Briefcase size={22} strokeWidth={1.75} className="text-teal" aria-hidden="true" />
        </div>
        <h2 className="font-bold text-navy text-lg">I know what career I want</h2>
        <p className="mt-1.5 text-sm text-navy/60 leading-relaxed">
          Pick a career → see the exact NCEA subjects you need, which universities offer it, and how competitive it is.
        </p>
      </button>
      <button
        type="button"
        onClick={() => onPick("subjects")}
        className="group rounded-2xl bg-white border border-gray-100 shadow-sm p-8 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      >
        <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center mb-4">
          <Sparkles size={22} strokeWidth={1.75} className="text-gold-700" aria-hidden="true" />
        </div>
        <h2 className="font-bold text-navy text-lg">I know what subjects I like</h2>
        <p className="mt-1.5 text-sm text-navy/60 leading-relaxed">
          Pick the subjects you enjoy → see the careers your subject choices unlock, ranked by fit.
        </p>
      </button>
    </div>
  );
}

function TopBar({ title, onReset }: { title: string; onReset: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-navy">{title}</h2>
      <button
        type="button"
        onClick={onReset}
        className="text-sm text-navy/50 hover:text-navy inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded px-1"
      >
        <ArrowLeft size={14} aria-hidden="true" /> Start over
      </button>
    </div>
  );
}

function CareerDetail({ career, onBack }: { career: typeof data.careers[number]; onBack: () => void }) {
  return (
    <div className="max-w-3xl mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-navy/50 hover:text-navy inline-flex items-center gap-1 mb-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded px-1"
      >
        <ArrowLeft size={14} aria-hidden="true" /> All careers
      </button>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl" aria-hidden="true">{career.icon}</span>
          <div>
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${fieldColors[career.field] || fieldColors.other}`}>
              {fieldLabel(career.field)}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">{career.title}</h1>
            <p className="text-sm text-navy/50 mt-1">Typically {career.yearsOfStudy} years of study</p>
          </div>
        </div>

        <SubjectGroup title="Required subjects" subjects={career.required} tone="required" />
        <SubjectGroup title="Recommended subjects" subjects={career.recommended} tone="recommended" />

        <Detail label="University Entrance">
          {career.ueNote}
        </Detail>
        {"rankScore" in career && career.rankScore && (
          <Detail label="Typical rank score">{career.rankScore}</Detail>
        )}

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-3">NZ universities offering this</p>
          <ul className="flex flex-wrap gap-2">
            {career.universities.map((u) => (
              <li key={u}>
                <span className="inline-flex items-center gap-1.5 text-xs bg-soft text-navy/80 px-3 py-1.5 rounded-full">
                  {u}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={career.programmeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal text-white px-5 py-2.5 text-sm font-semibold hover:bg-teal-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          View a sample programme page <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/tools/credit-calculator" className="rounded-2xl bg-white border border-gray-100 p-4 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2">
          Check your credits →
        </Link>
        <Link href="/tools/cost-calculator" className="rounded-2xl bg-white border border-gray-100 p-4 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2">
          Estimate the cost →
        </Link>
      </div>
    </div>
  );
}

function SubjectGroup({ title, subjects, tone }: { title: string; subjects: string[]; tone: "required" | "recommended" }) {
  if (!subjects || subjects.length === 0) return null;
  const chip = tone === "required" ? "bg-coral-50 text-coral-700 border-coral/20" : "bg-gold-50 text-gold-800 border-gold/20";
  return (
    <div className="mb-5">
      <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-2">{title}</p>
      <ul className="flex flex-wrap gap-2">
        {subjects.map((s) => (
          <li key={s}>
            <span className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full border ${chip}`}>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-navy/80 leading-relaxed">{children}</p>
    </div>
  );
}
