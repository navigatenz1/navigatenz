"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";

type AnswerKey = "coursework" | "exams" | "mix" | "overseasYes" | "overseasNo" | "overseasMaybe" | "flexibility" | "structure" | "worldwide" | "localNZ";

const questions: {
  id: string;
  heading: string;
  sub?: string;
  options: { id: AnswerKey; label: string; description?: string }[];
}[] = [
  {
    id: "q1",
    heading: "Do you prefer coursework or exams?",
    sub: "There's no wrong answer — just pick what actually matches how you learn best.",
    options: [
      { id: "coursework", label: "Coursework", description: "Assignments, portfolios, internal assessments spread across the year." },
      { id: "exams", label: "Exams", description: "Big end-of-year exams where everything counts on the day." },
      { id: "mix", label: "A mix of both", description: "I like variety — some of each keeps it interesting." },
    ],
  },
  {
    id: "q2",
    heading: "Do you plan to study overseas after school?",
    options: [
      { id: "overseasYes", label: "Yes", description: "I'm looking at UK, US, Australia, or other international options." },
      { id: "overseasNo", label: "No", description: "I plan to study in NZ." },
      { id: "overseasMaybe", label: "Maybe", description: "Keeping my options open." },
    ],
  },
  {
    id: "q3",
    heading: "How do you feel about subject flexibility?",
    options: [
      { id: "flexibility", label: "I want lots of choice", description: "I want to mix subjects freely year to year." },
      { id: "structure", label: "I prefer a structured programme", description: "Tell me what to take — I want the framework." },
    ],
  },
  {
    id: "q4",
    heading: "What matters more to you?",
    options: [
      { id: "worldwide", label: "A qualification recognised worldwide", description: "Universities globally should see it clearly." },
      { id: "localNZ", label: "A qualification that works well in NZ", description: "Most NZ unis will accept it without friction." },
    ],
  },
];

type Pathway = "ncea" | "cambridge" | "ib";

const pathwayInfo: Record<Pathway, { name: string; blurb: string; why: string; href: string; color: string }> = {
  ncea: {
    name: "NCEA",
    blurb: "New Zealand's national qualification. Free, widely offered, flexible.",
    why: "NCEA mixes internal coursework with external exams, gives you subject flexibility, and is accepted at every NZ university. It's the default choice for most NZ students — and for good reason.",
    href: "/guides/understanding-ncea-credits",
    color: "from-teal to-teal-600",
  },
  cambridge: {
    name: "Cambridge (CIE)",
    blurb: "British-based international qualification. Exam-heavy, globally portable.",
    why: "Cambridge leans heavily on end-of-year exams and structured subject groupings. It's the best fit if you want a qualification that travels internationally and you thrive in exam conditions.",
    href: "/guides/ncea-vs-cambridge-vs-ib",
    color: "from-coral to-coral-500",
  },
  ib: {
    name: "IB (International Baccalaureate)",
    blurb: "International Diploma. Rigorous, broad, research-focused.",
    why: "IB requires you to study six subject areas plus Theory of Knowledge, an Extended Essay, and community service. It's demanding but extraordinary preparation for university — especially overseas.",
    href: "/guides/ncea-vs-cambridge-vs-ib",
    color: "from-gold to-gold-600",
  },
};

function score(answers: AnswerKey[]): Pathway {
  const s = { ncea: 0, cambridge: 0, ib: 0 };
  if (answers[0] === "coursework") s.ncea += 2;
  if (answers[0] === "exams") { s.cambridge += 2; s.ib += 1; }
  if (answers[0] === "mix") { s.ncea += 1; s.ib += 1; }

  if (answers[1] === "overseasYes") { s.ib += 2; s.cambridge += 2; }
  if (answers[1] === "overseasNo") s.ncea += 2;
  if (answers[1] === "overseasMaybe") { s.ib += 1; s.cambridge += 1; s.ncea += 1; }

  if (answers[2] === "flexibility") s.ncea += 2;
  if (answers[2] === "structure") { s.ib += 2; s.cambridge += 1; }

  if (answers[3] === "worldwide") { s.ib += 2; s.cambridge += 2; }
  if (answers[3] === "localNZ") s.ncea += 2;

  const entries = Object.entries(s) as [Pathway, number][];
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

export default function PathwayFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerKey[]>([]);

  const recommendation = useMemo<Pathway | null>(() => {
    if (answers.length < questions.length) return null;
    return score(answers);
  }, [answers]);

  const pickAnswer = (key: AnswerKey) => {
    const next = [...answers];
    next[step] = key;
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const q = questions[step];

  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy to-teal-900 py-14 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/80">Pathway Finder</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Pathway Finder</h1>
          <p className="mt-3 text-white/70 text-lg max-w-2xl leading-relaxed">
            NCEA, Cambridge, or IB — four quick questions, honest recommendation, no sign-up.
          </p>
        </Container>
      </section>

      <section className="py-14 bg-soft min-h-[60vh]">
        <Container>
          <div className="max-w-xl mx-auto">
            {!recommendation ? (
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider">
                    Question {step + 1} of {questions.length}
                  </p>
                  <div className="flex gap-1.5" aria-hidden="true">
                    {questions.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-6 rounded-full transition-colors ${i <= step ? "bg-teal" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-navy mb-2">{q.heading}</h2>
                {q.sub && <p className="text-sm text-navy/60 mb-6 leading-relaxed">{q.sub}</p>}

                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const active = answers[step] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => pickAnswer(opt.id)}
                        aria-pressed={active}
                        className={`w-full text-left rounded-2xl border-2 p-4 sm:p-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                          active
                            ? "border-teal bg-teal-50/60"
                            : "border-gray-100 bg-white hover:border-teal/40 hover:-translate-y-0.5 hover:shadow-sm"
                        }`}
                      >
                        <p className="font-semibold text-navy">{opt.label}</p>
                        {opt.description && <p className="text-sm text-navy/60 mt-1 leading-relaxed">{opt.description}</p>}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-sm text-navy/50 hover:text-navy disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded px-2 py-1"
                  >
                    <ArrowLeft size={14} aria-hidden="true" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 text-sm text-navy/50 hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded px-2 py-1"
                  >
                    <RefreshCw size={14} aria-hidden="true" /> Start over
                  </button>
                </div>
              </div>
            ) : (
              <ResultCard pathway={recommendation} answers={answers} onReset={reset} />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

function ResultCard({ pathway, answers, onReset }: { pathway: Pathway; answers: AnswerKey[]; onReset: () => void }) {
  const info = pathwayInfo[pathway];
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg shadow-navy/5 bg-white">
      <div className={`bg-gradient-to-br ${info.color} p-6 sm:p-8 text-white`}>
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider mb-3 text-white/80">
          <CheckCircle2 size={14} aria-hidden="true" />
          Based on your answers
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold">{info.name}</h2>
        <p className="mt-2 text-white/80 leading-relaxed">{info.blurb}</p>
      </div>
      <div className="p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-2">Why this fits</p>
          <p className="text-navy/80 leading-relaxed">{info.why}</p>
        </div>

        <div className="p-4 rounded-xl bg-soft text-xs text-navy/60 leading-relaxed">
          This is a recommendation, not a ruling. Your school&apos;s offerings, your teachers, and how you learn in practice all matter. Talk to your school careers advisor before deciding.
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button href={info.href} size="md">Read the full comparison</Button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <RefreshCw size={14} aria-hidden="true" /> Try different answers
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100 text-xs text-navy/50">
          Your answers: {answers.filter(Boolean).join(" · ")}.{" "}
          <Link href="/guides/ncea-vs-cambridge-vs-ib" className="text-teal font-medium hover:underline">
            Compare all three pathways side-by-side <ArrowRight size={12} className="inline" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
