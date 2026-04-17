"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { encodePayload } from "@/lib/share-encoding";

const TOTAL_STEPS = 7;

const yearOptions = [
  { value: "year-9", label: "Year 9", sub: "Just starting secondary school" },
  { value: "year-10", label: "Year 10", sub: "Exploring your options" },
  { value: "year-11", label: "Year 11", sub: "Starting qualifications" },
  { value: "year-12", label: "Year 12", sub: "Building toward uni" },
  { value: "year-13", label: "Year 13", sub: "Final year — let's get you there" },
  { value: "finished", label: "I've finished school", sub: "Looking at next steps" },
];

const qualOptions = [
  { value: "ncea", label: "NCEA", sub: "NZ's national qualification (being replaced 2028-2030 — current rules still apply to you)" },
  { value: "cambridge", label: "Cambridge (CIE)", sub: "British-based international qualification" },
  { value: "ib", label: "IB", sub: "International Baccalaureate Diploma" },
  { value: "not-sure", label: "I'm not sure", sub: "We'll help you figure it out" },
  { value: "not-started", label: "I haven't started yet", sub: "Still in Year 9 or 10" },
];

const subjectOptions = [
  "English", "Maths", "Sciences", "History", "Geography", "Economics",
  "Business", "Art/Design", "Music", "Languages", "Technology", "PE/Health", "Other",
];

const uniOptions = [
  "University of Auckland", "University of Otago", "Victoria University of Wellington",
  "University of Canterbury", "University of Waikato", "Massey University",
  "AUT", "Lincoln University",
];

interface AssessmentData {
  year_level: string;
  qualification_pathway: string;
  first_gen: boolean | null;
  current_grades: string;
  subjects_of_interest: string[];
  preferred_universities: string[];
  goals: string;
}

const initial: AssessmentData = {
  year_level: "",
  qualification_pathway: "",
  first_gen: null,
  current_grades: "",
  subjects_of_interest: [],
  preferred_universities: [],
  goals: "",
};

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [existing, setExisting] = useState<AssessmentData | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const { user, loading } = useAuth();
  const router = useRouter();

  // Check for existing assessment
  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(1)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data: rows }: { data: any[] | null }) => {
        if (rows && rows.length > 0) {
          setExisting({
            year_level: rows[0].year_level,
            qualification_pathway: rows[0].qualification_pathway,
            first_gen: rows[0].first_gen,
            current_grades: rows[0].current_grades || "",
            subjects_of_interest: rows[0].subjects_of_interest || [],
            preferred_universities: rows[0].preferred_universities || [],
            goals: rows[0].goals || "",
          });
        }
      });
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const progress = ((step + 1) / (TOTAL_STEPS + 1)) * 100;

  const next = () => { setDirection("next"); setStep((s) => s + 1); };
  const prev = () => { setDirection("prev"); setStep((s) => Math.max(0, s - 1)); };

  const selectSingle = (field: keyof AssessmentData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    setTimeout(() => { setDirection("next"); setStep((s) => s + 1); }, 200);
  };

  const toggleMulti = (field: "subjects_of_interest" | "preferred_universities", value: string) => {
    setData((d) => {
      const arr = d[field] as string[];
      return { ...d, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const supabase = createClient();
    await supabase.from("assessments").insert({
      user_id: user.id,
      year_level: data.year_level,
      qualification_pathway: data.qualification_pathway,
      first_gen: data.first_gen,
      current_grades: data.current_grades || null,
      subjects_of_interest: data.subjects_of_interest,
      preferred_universities: data.preferred_universities,
      goals: data.goals || null,
    });
    setSubmitting(false);
    setCompleted(true);
  };

  const retake = () => {
    setExisting(null);
    setData(initial);
    setStep(0);
    setCompleted(false);
  };

  // Show existing results
  if (existing && !completed && step === 0) {
    return (
      <section className="min-h-screen bg-soft relative py-20">
        <div className="bg-dot-pattern" />
        <Container className="relative max-w-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-navy mb-2">Your pathway results</h1>
            <p className="text-navy/60">Here&apos;s a summary of your assessment</p>
          </div>
          <ResultsCard data={existing} />
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/dashboard">Go to Dashboard</Button>
            <button onClick={retake} className="text-teal font-medium text-sm hover:text-teal-600 transition-colors">
              Retake Assessment
            </button>
          </div>
        </Container>
      </section>
    );
  }

  // Completion screen
  if (completed) {
    return (
      <section className="min-h-screen bg-soft relative py-20">
        <div className="bg-dot-pattern" />
        <Container className="relative max-w-2xl">
          <div className="text-center mb-10">
            {/* Animated checkmark */}
            <div className="w-20 h-20 rounded-full bg-teal flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-2 animate-fade-in-up animation-delay-200">
              Here&apos;s where you stand — and what to do next
            </h1>
            <p className="text-navy/60 text-lg animate-fade-in-up animation-delay-400">
              Here&apos;s a summary of what you told us
            </p>
          </div>
          <div className="animate-fade-in-up animation-delay-600">
            <ResultsCard data={data} />
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Button href="/dashboard" size="lg">Go to My Dashboard</Button>
            <Button href="/guides" variant="outline">Browse Guides</Button>
            <ShareResultsButton data={data} />
          </div>
        </Container>
      </section>
    );
  }

  const slideClass = direction === "next"
    ? "animate-fade-in-up"
    : "animate-fade-in";

  return (
    <section className="min-h-screen bg-soft relative py-10 sm:py-16">
      <div className="bg-dot-pattern" />
      <Container className="relative max-w-2xl">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-navy/40">
              Step {step + 1} of {TOTAL_STEPS}
            </span>
            {step > 0 && (
              <button onClick={prev} className="text-xs font-medium text-teal hover:text-teal-600 transition-colors flex items-center gap-1">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                Back
              </button>
            )}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal to-gold rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div key={step} className={slideClass}>
          {step === 0 && <StepWelcome onNext={next} />}
          {step === 1 && <StepYear value={data.year_level} onSelect={(v) => selectSingle("year_level", v)} />}
          {step === 2 && <StepQualification value={data.qualification_pathway} onSelect={(v) => selectSingle("qualification_pathway", v)} />}
          {step === 3 && <StepFirstGen value={data.first_gen} onSelect={(v) => { setData((d) => ({ ...d, first_gen: v })); setTimeout(next, 200); }} />}
          {step === 4 && <StepGrades data={data} setData={setData} onNext={next} />}
          {step === 5 && <StepUniversity selected={data.preferred_universities} onToggle={(v) => toggleMulti("preferred_universities", v)} onNext={next} />}
          {step === 6 && <StepGoals goals={data.goals} setGoals={(v) => setData((d) => ({ ...d, goals: v }))} onSubmit={handleSubmit} submitting={submitting} onSkip={handleSubmit} />}
        </div>
      </Container>
    </section>
  );
}

/* ── Step Components ── */

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center py-10">
      <div className="w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center mx-auto mb-8">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">See where you stand</h1>
      <p className="text-navy/60 text-lg leading-relaxed max-w-md mx-auto mb-10">
        Answer a few quick questions — completely free, completely private. We&apos;ll show you where you are and what to focus on next.
      </p>
      <Button onClick={onNext} size="lg">Let&apos;s Go</Button>
    </div>
  );
}

function OptionCard({ selected, onClick, label, sub }: { selected: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? "border-teal bg-white shadow-sm"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`font-semibold ${selected ? "text-teal" : "text-navy"}`}>{label}</p>
          <p className="text-sm text-navy/50 mt-0.5">{sub}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? "border-teal bg-teal" : "border-gray-200"}`}>
          {selected && (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          )}
        </div>
      </div>
    </button>
  );
}

function StepYear({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">What year are you in?</h2>
      <p className="text-navy/50 mb-8">Select the one that best describes you right now</p>
      <div className="space-y-3">
        {yearOptions.map((o) => (
          <OptionCard key={o.value} selected={value === o.value} onClick={() => onSelect(o.value)} label={o.label} sub={o.sub} />
        ))}
      </div>
    </div>
  );
}

function StepQualification({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">What qualification are you studying?</h2>
      <p className="text-navy/50 mb-8">If you haven&apos;t started yet, that&apos;s totally fine</p>
      <div className="space-y-3">
        {qualOptions.map((o) => (
          <OptionCard key={o.value} selected={value === o.value} onClick={() => onSelect(o.value)} label={o.label} sub={o.sub} />
        ))}
      </div>
    </div>
  );
}

function StepFirstGen({ value, onSelect }: { value: boolean | null; onSelect: (v: boolean) => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Are you the first in your family to consider university?</h2>
      <p className="text-navy/50 mb-8">Either way, we&apos;re here to help. This just helps us personalise your experience.</p>
      <div className="space-y-3">
        <OptionCard selected={value === true} onClick={() => onSelect(true)} label="Yes — I'd be the first" sub="Nobody in my immediate family has been to university" />
        <OptionCard selected={value === false} onClick={() => onSelect(false)} label="No — someone in my family has been" sub="A parent, sibling, or close family member went to uni" />
      </div>
    </div>
  );
}

function StepGrades({ data, setData, onNext }: { data: AssessmentData; setData: React.Dispatch<React.SetStateAction<AssessmentData>>; onNext: () => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Tell us about your studies</h2>
      <p className="text-navy/50 mb-8">This helps us give you relevant advice</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">How would you describe your current grades?</label>
          <input
            type="text"
            value={data.current_grades}
            onChange={(e) => setData((d) => ({ ...d, current_grades: e.target.value }))}
            placeholder="e.g., Mostly Merits and Excellences, or mostly Bs and Cs"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-3">What subjects interest you?</label>
          <div className="flex flex-wrap gap-2">
            {subjectOptions.map((subj) => {
              const selected = data.subjects_of_interest.includes(subj);
              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => {
                    setData((d) => ({
                      ...d,
                      subjects_of_interest: selected
                        ? d.subjects_of_interest.filter((s) => s !== subj)
                        : [...d.subjects_of_interest, subj],
                    }));
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                    selected
                      ? "border-teal bg-teal-50 text-teal"
                      : "border-gray-200 text-navy/60 hover:border-teal/50 hover:text-navy"
                  }`}
                >
                  {subj}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Button onClick={onNext} size="lg" className="w-full sm:w-auto">Continue</Button>
      </div>
    </div>
  );
}

function StepUniversity({ selected, onToggle, onNext }: { selected: string[]; onToggle: (v: string) => void; onNext: () => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Which NZ university are you most interested in?</h2>
      <p className="text-navy/50 mb-8">You can select more than one</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {uniOptions.map((uni) => {
          const isSelected = selected.includes(uni);
          return (
            <button
              key={uni}
              onClick={() => onToggle(uni)}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? "border-teal bg-white shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${isSelected ? "border-teal bg-teal" : "border-gray-200"}`}>
                  {isSelected && <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                </div>
                <span className={`text-sm font-medium ${isSelected ? "text-teal" : "text-navy"}`}>{uni}</span>
              </div>
            </button>
          );
        })}
        {/* Not sure yet */}
        <button
          onClick={() => onToggle("Not sure yet")}
          className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 sm:col-span-2 ${
            selected.includes("Not sure yet")
              ? "border-teal bg-white shadow-sm"
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${selected.includes("Not sure yet") ? "border-teal bg-teal" : "border-gray-200"}`}>
              {selected.includes("Not sure yet") && <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
            </div>
            <div>
              <span className={`text-sm font-medium ${selected.includes("Not sure yet") ? "text-teal" : "text-navy"}`}>Not sure yet</span>
              <p className="text-xs text-navy/40 mt-0.5">No worries — we&apos;ll help you figure it out</p>
            </div>
          </div>
        </button>
      </div>
      <div className="mt-10">
        <Button onClick={onNext} size="lg" className="w-full sm:w-auto">Continue</Button>
      </div>
    </div>
  );
}

function StepGoals({ goals, setGoals, onSubmit, submitting, onSkip }: { goals: string; setGoals: (v: string) => void; onSubmit: () => void; submitting: boolean; onSkip: () => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Anything else you&apos;d like us to know?</h2>
      <p className="text-navy/50 mb-8">This is optional — but it helps us give better recommendations</p>
      <textarea
        value={goals}
        onChange={(e) => setGoals(e.target.value)}
        rows={5}
        placeholder="e.g., I want to study medicine but I'm not sure if my grades are good enough, or I need help understanding scholarships"
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors resize-none"
      />
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-teal text-white px-8 py-4 text-lg hover:bg-teal-600 shadow-sm hover:shadow-lg hover:shadow-teal/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
          {submitting ? "Saving..." : "Complete Assessment"}
        </button>
        {!goals && (
          <button onClick={onSkip} className="text-sm text-navy/40 hover:text-navy/60 transition-colors">
            Skip this step
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Share button — encodes aggregate-only payload, no PII ── */

function ShareResultsButton({ data }: { data: AssessmentData }) {
  const [copied, setCopied] = useState(false);
  const onShare = async () => {
    // IMPORTANT: never include email, name, or any PII. Aggregates only.
    const payload = {
      y: data.year_level,
      q: data.qualification_pathway,
      f: data.first_gen,
      g: data.goals?.slice(0, 200) ?? "",
    };
    const url = `${window.location.origin}/share/assessment/${encodePayload(payload)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this share link:", url);
    }
  };
  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
    >
      {copied ? "Link copied!" : "Share my results"}
    </button>
  );
}

/* ── Results Card ── */

function ResultsCard({ data }: { data: AssessmentData }) {
  const yearLabel = yearOptions.find((y) => y.value === data.year_level)?.label || data.year_level;
  const qualLabel = qualOptions.find((q) => q.value === data.qualification_pathway)?.label || data.qualification_pathway;

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-soft rounded-xl">
          <p className="text-xs font-medium text-navy/40 uppercase tracking-wider mb-1">Year Level</p>
          <p className="font-semibold text-navy">{yearLabel}</p>
        </div>
        <div className="p-4 bg-soft rounded-xl">
          <p className="text-xs font-medium text-navy/40 uppercase tracking-wider mb-1">Pathway</p>
          <p className="font-semibold text-navy">{qualLabel}</p>
        </div>
        <div className="p-4 bg-soft rounded-xl">
          <p className="text-xs font-medium text-navy/40 uppercase tracking-wider mb-1">First Generation</p>
          <p className="font-semibold text-navy">{data.first_gen ? "Yes" : "No"}</p>
        </div>
        <div className="p-4 bg-soft rounded-xl">
          <p className="text-xs font-medium text-navy/40 uppercase tracking-wider mb-1">Universities</p>
          <p className="font-semibold text-navy text-sm">
            {data.preferred_universities.length > 0
              ? data.preferred_universities.join(", ")
              : "Not selected"}
          </p>
        </div>
      </div>
      {data.subjects_of_interest.length > 0 && (
        <div>
          <p className="text-xs font-medium text-navy/40 uppercase tracking-wider mb-2">Subjects</p>
          <div className="flex flex-wrap gap-2">
            {data.subjects_of_interest.map((s) => (
              <span key={s} className="px-3 py-1 bg-teal-50 text-teal text-xs font-medium rounded-full">{s}</span>
            ))}
          </div>
        </div>
      )}
      {data.goals && (
        <div>
          <p className="text-xs font-medium text-navy/40 uppercase tracking-wider mb-1">Goals</p>
          <p className="text-sm text-navy/70">{data.goals}</p>
        </div>
      )}
    </div>
  );
}
