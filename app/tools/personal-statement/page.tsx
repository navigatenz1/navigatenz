"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";

const steps = [
  { title: "What do you want to study and why?", placeholder: "I want to study [subject] because...", prompt: "Think about a specific moment that sparked your interest. What happened?", target: "100-200 words" },
  { title: "What have you done that relates to this field?", placeholder: "This could be school subjects, projects, volunteering, work experience...", prompt: "Be specific — 'I volunteered at Starship Hospital' is better than 'I like helping people'", target: "100-200 words" },
  { title: "What challenges have you overcome?", placeholder: "Think about obstacles you've faced — academic, personal, family...", prompt: "Show, don't tell — describe what you DID, not just what you think", target: "100-150 words" },
  { title: "What are your goals?", placeholder: "Where do you see yourself after graduating? How will this programme help?", prompt: "Be honest — admissions officers read thousands and can spot generic ones", target: "50-100 words" },
];

const tips = [
  "Be specific — names, places, and details make your statement real",
  "Show, don't tell — describe actions and outcomes, not just feelings",
  "Be honest — your genuine story is more powerful than trying to impress",
  "Have someone else read it before you submit",
  "Most NZ universities want 300-500 words total",
];

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function PersonalStatementPage() {
  const [step, setStep] = useState(0);
  const [sections, setSections] = useState(["", "", "", ""]);
  const [copied, setCopied] = useState(false);

  const update = (i: number, val: string) => {
    setSections((prev) => { const n = [...prev]; n[i] = val; return n; });
  };

  const totalWords = sections.reduce((sum, s) => sum + wordCount(s), 0);
  const fullStatement = sections.filter(Boolean).join("\n\n");
  const isReview = step === 4;

  const copy = async () => {
    await navigator.clipboard.writeText(fullStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-12 sm:py-16 overflow-hidden">
        <Container className="relative">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Personal Statement Helper</h1>
          <p className="mt-3 text-white/60 text-sm sm:text-base">Write a university personal statement step by step. Guided prompts, no templates.</p>
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-navy/40">Step {step + 1} of 5</span>
                <span className="text-xs text-navy/40">{totalWords} words total</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal to-gold rounded-full transition-all duration-500" style={{ width: `${((step + 1) / 5) * 100}%` }} />
              </div>
            </div>

            {!isReview ? (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy mb-2">{steps[step].title}</h2>
                <p className="text-navy/50 text-sm mb-6">{steps[step].prompt}</p>

                <textarea
                  value={sections[step]}
                  onChange={(e) => update(step, e.target.value)}
                  rows={8}
                  placeholder={steps[step].placeholder}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none leading-relaxed"
                />

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-navy/40">{wordCount(sections[step])} words · Target: {steps[step].target}</span>
                </div>

                {/* Tips */}
                <div className="mt-6 p-4 bg-gold-50 rounded-xl">
                  <p className="text-xs font-semibold text-gold-800 mb-2">💡 Tip</p>
                  <p className="text-xs text-gold-700">{tips[step]}</p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  {step > 0 && (
                    <button onClick={() => setStep(step - 1)} className="text-sm text-teal font-medium hover:text-teal-600 transition-colors flex items-center gap-1">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                      Back
                    </button>
                  )}
                  <div className="ml-auto">
                    <Button onClick={() => setStep(step + 1)} size="md">
                      {step === 3 ? "Review Statement" : "Next →"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Review */
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy mb-2">Review Your Statement</h2>
                <p className="text-navy/50 text-sm mb-6">
                  {totalWords} words total
                  {totalWords < 300 && <span className="text-gold-700 ml-2">· A bit short — most unis want 300-500 words</span>}
                  {totalWords > 500 && <span className="text-coral ml-2">· Over 500 words — consider trimming</span>}
                  {totalWords >= 300 && totalWords <= 500 && <span className="text-teal ml-2">· Great length!</span>}
                </p>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <p className="text-navy/80 whitespace-pre-wrap leading-relaxed text-sm">{fullStatement || "Your statement will appear here..."}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={copy} variant={copied ? "secondary" : "primary"}>
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </Button>
                  <button onClick={() => setStep(0)} className="text-sm text-teal font-medium hover:text-teal-600 px-4 py-2">
                    Edit from start
                  </button>
                </div>

                <div className="mt-6 p-4 bg-teal-50 rounded-xl">
                  <p className="text-xs font-semibold text-teal mb-1">Before submitting</p>
                  <p className="text-xs text-teal-700">Have a teacher or careers advisor read your statement. A second pair of eyes catches things you miss.</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
