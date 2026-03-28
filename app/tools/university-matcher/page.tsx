"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Card from "@/components/Card";

const fields = [
  "Engineering", "Medicine/Health", "Law", "Commerce/Business", "Arts/Humanities",
  "Science", "Education/Teaching", "Design/Creative", "IT/Computer Science",
  "Social Work", "Agriculture/Environmental", "Not sure yet",
];

const priorities = [
  "Academic reputation", "Campus life", "City/location", "Cost of living",
  "Halls quality", "First-gen support", "Close to home", "Job opportunities",
];

const cities = [
  { value: "auckland", label: "Auckland", sub: "Big city" },
  { value: "wellington", label: "Wellington", sub: "Capital, compact" },
  { value: "christchurch", label: "Christchurch", sub: "Affordable, rebuilding" },
  { value: "dunedin", label: "Dunedin", sub: "Student city" },
  { value: "hamilton", label: "Hamilton", sub: "Smaller, close to Auckland" },
  { value: "palmerston", label: "Palmerston North", sub: "Small town, affordable" },
  { value: "any", label: "Doesn't matter", sub: "I'm open" },
];

const budgets = [
  { value: "major-concern", label: "Cost is a major concern" },
  { value: "studylink", label: "I'll manage with StudyLink" },
  { value: "not-factor", label: "Budget isn't a big factor" },
  { value: "scholarships", label: "I'm looking for scholarships" },
];

const learningStyles = [
  { value: "large-lectures", label: "Large lectures with independence" },
  { value: "small-classes", label: "Smaller classes with support" },
  { value: "hands-on", label: "Hands-on/practical learning" },
  { value: "distance", label: "Distance/online learning" },
  { value: "mix", label: "Mix of everything" },
];

interface UniData {
  name: string;
  city: string;
  cityKey: string;
  costPerWeek: string;
  strengths: string[];
  website: string;
}

const universities: UniData[] = [
  { name: "University of Auckland", city: "Auckland", cityKey: "auckland", costPerWeek: "$350-450", strengths: ["Engineering", "Medicine/Health", "Law", "Commerce/Business", "Science", "Arts/Humanities"], website: "auckland.ac.nz" },
  { name: "University of Otago", city: "Dunedin", cityKey: "dunedin", costPerWeek: "$200-280", strengths: ["Medicine/Health", "Science", "Arts/Humanities", "Law"], website: "otago.ac.nz" },
  { name: "Victoria University of Wellington", city: "Wellington", cityKey: "wellington", costPerWeek: "$300-380", strengths: ["Law", "Arts/Humanities", "Commerce/Business", "Design/Creative", "Science"], website: "wgtn.ac.nz" },
  { name: "University of Canterbury", city: "Christchurch", cityKey: "christchurch", costPerWeek: "$250-320", strengths: ["Engineering", "Science", "IT/Computer Science", "Arts/Humanities"], website: "canterbury.ac.nz" },
  { name: "University of Waikato", city: "Hamilton", cityKey: "hamilton", costPerWeek: "$220-290", strengths: ["Commerce/Business", "Education/Teaching", "Science", "Social Work"], website: "waikato.ac.nz" },
  { name: "Massey University", city: "Multiple campuses", cityKey: "palmerston", costPerWeek: "$200-300", strengths: ["Agriculture/Environmental", "Science", "Education/Teaching", "Design/Creative"], website: "massey.ac.nz" },
  { name: "Lincoln University", city: "Christchurch", cityKey: "christchurch", costPerWeek: "$220-280", strengths: ["Agriculture/Environmental", "Science", "Commerce/Business"], website: "lincoln.ac.nz" },
  { name: "AUT", city: "Auckland", cityKey: "auckland", costPerWeek: "$350-450", strengths: ["Medicine/Health", "Design/Creative", "IT/Computer Science", "Commerce/Business"], website: "aut.ac.nz" },
];

const cheapCities = ["dunedin", "hamilton", "palmerston", "christchurch"];

export default function UniversityMatcherPage() {
  const [step, setStep] = useState(0);
  const [field, setField] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [learning, setLearning] = useState("");

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const calculateMatches = () => {
    return universities
      .map((uni) => {
        let score = 50;
        const reasons: string[] = [];

        // Field match
        if (field && field !== "Not sure yet" && uni.strengths.includes(field)) {
          score += 25;
          reasons.push(`Strong ${field} programme`);
        } else if (field === "Not sure yet") {
          if (uni.strengths.length >= 5) { score += 10; reasons.push("Wide range of programmes"); }
        }

        // City match
        if (city && city !== "any" && uni.cityKey === city) {
          score += 15;
          reasons.push(`Located in ${uni.city}`);
        }

        // Budget
        if ((budget === "major-concern" || budget === "scholarships") && cheapCities.includes(uni.cityKey)) {
          score += 10;
          reasons.push("Affordable city");
        }

        // Learning style
        if (learning === "small-classes" && ["Lincoln University", "University of Waikato"].includes(uni.name)) {
          score += 10;
          reasons.push("Smaller class sizes");
        }
        if (learning === "distance" && uni.name === "Massey University") {
          score += 20;
          reasons.push("Best distance learning option");
        }
        if (learning === "hands-on" && ["AUT", "Massey University"].includes(uni.name)) {
          score += 10;
          reasons.push("Practical, hands-on approach");
        }

        // First-gen support priority
        if (selectedPriorities.includes("First-gen support")) {
          score += 5;
          reasons.push("First-gen student support available");
        }

        return { ...uni, score: Math.min(score, 98), reasons: reasons.slice(0, 3) };
      })
      .sort((a, b) => b.score - a.score);
  };

  const progress = ((step + 1) / 6) * 100;

  if (step === 5) {
    const results = calculateMatches();
    return (
      <section className="py-16 sm:py-20 bg-soft min-h-screen">
        <Container className="max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Your University Matches</h1>
            <p className="text-navy/60 text-sm">Based on your preferences, here are your best matches</p>
          </div>
          <div className="space-y-4">
            {results.map((uni, i) => (
              <Card key={uni.name} hover={false} className={`p-5 ${i < 3 ? "border-l-4 border-l-teal" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {i < 3 && <span className="text-[10px] font-bold bg-teal-50 text-teal px-2 py-0.5 rounded-full">Great match</span>}
                    </div>
                    <h3 className="font-bold text-navy">{uni.name}</h3>
                    <p className="text-sm text-navy/50">{uni.city} · ~{uni.costPerWeek}/week</p>
                    {uni.reasons.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {uni.reasons.map((r) => (
                          <span key={r} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{r}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-teal">{uni.score}%</p>
                    <p className="text-[10px] text-navy/40">match</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <a href={`https://${uni.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-teal hover:text-teal-600 transition-colors">
                    Visit website &rarr;
                  </a>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => { setStep(0); setField(""); setCity(""); setBudget(""); setLearning(""); setSelectedPriorities([]); }}>Start Over</Button>
            <Button href="/guides/how-to-get-into-university" variant="outline">Read: How to Apply</Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-soft relative py-10 sm:py-16">
      <div className="bg-dot-pattern" />
      <Container className="relative max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-navy/40">Step {step + 1} of 5</span>
            {step > 0 && (
              <button onClick={prev} className="text-xs font-medium text-teal hover:text-teal-600 flex items-center gap-1">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                Back
              </button>
            )}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal to-gold rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {step === 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">What do you want to study?</h2>
            <p className="text-navy/50 mb-6 text-sm">Pick the area that interests you most</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {fields.map((f) => (
                <button key={f} onClick={() => { setField(f); next(); }} className={`p-4 rounded-xl border-2 text-left text-sm font-medium transition-all ${field === f ? "border-teal bg-teal-50 text-teal" : "border-gray-100 bg-white text-navy hover:border-gray-200"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">What matters most to you?</h2>
            <p className="text-navy/50 mb-6 text-sm">Select up to 3 priorities</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {priorities.map((p) => {
                const sel = selectedPriorities.includes(p);
                return (
                  <button key={p} onClick={() => setSelectedPriorities((prev) => sel ? prev.filter((x) => x !== p) : prev.length < 3 ? [...prev, p] : prev)} className={`px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${sel ? "border-teal bg-teal text-white" : "border-gray-200 text-navy/60 hover:border-teal/50"}`}>
                    {p}
                  </button>
                );
              })}
            </div>
            <Button onClick={next} size="lg" className="w-full sm:w-auto">Continue</Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Where do you want to live?</h2>
            <p className="text-navy/50 mb-6 text-sm">Pick your preferred city</p>
            <div className="space-y-2">
              {cities.map((c) => (
                <button key={c.value} onClick={() => { setCity(c.value); next(); }} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${city === c.value ? "border-teal bg-teal-50" : "border-gray-100 bg-white hover:border-gray-200"}`}>
                  <span className={`font-medium text-sm ${city === c.value ? "text-teal" : "text-navy"}`}>{c.label}</span>
                  <span className="text-xs text-navy/40 ml-2">{c.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">What&apos;s your budget situation?</h2>
            <p className="text-navy/50 mb-6 text-sm">This helps us factor in cost of living</p>
            <div className="space-y-2">
              {budgets.map((b) => (
                <button key={b.value} onClick={() => { setBudget(b.value); next(); }} className={`w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all ${budget === b.value ? "border-teal bg-teal-50 text-teal" : "border-gray-100 bg-white text-navy hover:border-gray-200"}`}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">How do you learn best?</h2>
            <p className="text-navy/50 mb-6 text-sm">Different universities suit different styles</p>
            <div className="space-y-2">
              {learningStyles.map((l) => (
                <button key={l.value} onClick={() => { setLearning(l.value); next(); }} className={`w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all ${learning === l.value ? "border-teal bg-teal-50 text-teal" : "border-gray-100 bg-white text-navy hover:border-gray-200"}`}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
