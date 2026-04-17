"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Share2, ExternalLink, CheckCircle2, AlertTriangle } from "lucide-react";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Button from "@/components/Button";
import data from "@/lib/data/university-costs.json";

type LivingSituation = "home" | "hall" | "flatting";

function formatNZD(n: number) {
  return n.toLocaleString("en-NZ", { style: "currency", currency: "NZD", maximumFractionDigits: 0 });
}

function encodeParams(params: Record<string, string | number>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => sp.set(k, String(v)));
  return sp.toString();
}

export default function CostCalculatorPage() {
  const [uni, setUni] = useState(data.universities[0].id);
  const [field, setField] = useState(data.fields[0].id);
  const [living, setLiving] = useState<LivingSituation>("hall");
  const [years, setYears] = useState(3);
  const [copied, setCopied] = useState(false);

  // Read initial state from URL (for share links)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const u = sp.get("uni");
    const f = sp.get("field");
    const l = sp.get("living");
    const y = sp.get("years");
    if (u && data.universities.some((x) => x.id === u)) setUni(u);
    if (f && data.fields.some((x) => x.id === f)) setField(f);
    if (l === "home" || l === "hall" || l === "flatting") setLiving(l);
    if (y) {
      const n = parseInt(y, 10);
      if ([3, 4, 5, 6].includes(n)) setYears(n);
    }
  }, []);

  const selectedUni = data.universities.find((u) => u.id === uni)!;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tuition = (data.tuition as any)[uni]?.[field] ?? 0;
  const livingCost = data.livingCostsPerWeek[selectedUni.city as keyof typeof data.livingCostsPerWeek];

  const annualCost = useMemo(() => {
    const accommodation =
      living === "home" ? 0 :
      living === "hall" ? livingCost.hall * 38 : // 38 weeks of term
      livingCost.flatting * 52;
    const food = livingCost.foodTransport * (living === "hall" ? 38 : 52);
    return { tuition, accommodation, food, total: tuition + accommodation + food };
  }, [tuition, living, livingCost]);

  const totalProgrammeCost = annualCost.total * years;
  const programmeOffered = tuition > 0;

  // Loan estimate: assume all tuition + half of accommodation/food financed
  const loanEstimate = useMemo(() => {
    if (!programmeOffered) return 0;
    const weeklyBorrow = living === "home" ? 0 : Math.min(data.studentLoan.weeklyLivingLimit, 316);
    const weeklyLoan = weeklyBorrow * (living === "hall" ? 38 : 52);
    return (annualCost.tuition + weeklyLoan + data.studentLoan.courseRelatedLimit) * years;
  }, [annualCost.tuition, living, years, programmeOffered]);

  const share = async () => {
    const url = `${window.location.origin}/tools/cost-calculator?${encodeParams({ uni, field, living, years })}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: prompt user
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy to-teal-900 py-16 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/80">Cost Calculator</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            2026 estimates · No account required
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">University Cost Calculator</h1>
          <p className="mt-3 text-white/70 text-lg max-w-2xl leading-relaxed">
            What will university actually cost your family? Pick a uni, a programme, and where you&apos;ll live.
          </p>
        </Container>
      </section>

      <section className="py-12 bg-soft">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Inputs */}
            <Card hover={false} className="lg:col-span-2 p-6 space-y-5 h-fit">
              <h2 className="text-sm font-semibold text-navy/40 uppercase tracking-wider">Your plan</h2>
              <Field label="University">
                <select
                  value={uni}
                  onChange={(e) => setUni(e.target.value)}
                  className="input"
                >
                  {data.universities.map((u) => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
                <p className="text-xs text-navy/40 mt-1.5">City: {selectedUni.city}</p>
              </Field>
              <Field label="Programme / field of study">
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="input"
                >
                  {data.fields.map((f) => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Where will you live?">
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: "home", label: "At home" },
                    { id: "hall", label: "Uni hall" },
                    { id: "flatting", label: "Flatting" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLiving(opt.id)}
                      aria-pressed={living === opt.id}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                        living === opt.id
                          ? "border-teal bg-teal-50 text-teal-700"
                          : "border-gray-200 text-navy/60 hover:border-gray-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Years of study">
                <select
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value, 10))}
                  className="input"
                >
                  {[3, 4, 5, 6].map((y) => (
                    <option key={y} value={y}>{y} years</option>
                  ))}
                </select>
              </Field>

              <button
                type="button"
                onClick={share}
                className="w-full flex items-center justify-center gap-2 mt-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-navy hover:bg-soft hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                <Share2 size={16} aria-hidden="true" />
                {copied ? "Link copied!" : "Share these results"}
              </button>
            </Card>

            {/* Results */}
            <div className="lg:col-span-3 space-y-4">
              {!programmeOffered && (
                <div className="rounded-2xl border-l-4 border-l-coral bg-coral-50/60 p-5 flex gap-3">
                  <AlertTriangle size={20} className="text-coral flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-sm text-navy/80">
                    <p className="font-semibold text-coral">{selectedUni.name} may not offer this programme.</p>
                    <p className="mt-1">Pick a different university or field. Fee data shows $0 for fields the university doesn&apos;t offer.</p>
                  </div>
                </div>
              )}

              {programmeOffered && (
                <>
                  <Card hover={false} className="p-6">
                    <h2 className="text-sm font-semibold text-navy/40 uppercase tracking-wider mb-4">Annual breakdown</h2>
                    <ul className="space-y-3">
                      <Row label="Tuition" value={annualCost.tuition} />
                      <Row label={living === "home" ? "Accommodation (living at home)" : living === "hall" ? "Hall fees (approx 38 weeks)" : "Rent (approx 52 weeks)"} value={annualCost.accommodation} />
                      <Row label="Food, transport, books" value={annualCost.food} />
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-baseline justify-between">
                      <span className="text-navy font-semibold">Total per year</span>
                      <span className="text-2xl font-bold text-teal tabular-nums">{formatNZD(annualCost.total)}</span>
                    </div>
                  </Card>

                  <Card hover={false} className="p-6 bg-gradient-to-br from-navy to-teal-900 text-white border-0">
                    <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">
                      Total programme cost ({years} years)
                    </p>
                    <p className="text-4xl sm:text-5xl font-bold tabular-nums">{formatNZD(totalProgrammeCost)}</p>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">
                      Estimate only — fees change each year, and many families cover this with a mix of Fees Free, Student Loan, Student Allowance, scholarships, part-time work, and family support.
                    </p>
                  </Card>

                  <Card hover={false} className="p-6">
                    <h2 className="text-sm font-semibold text-navy/40 uppercase tracking-wider mb-4">Funding options</h2>
                    <div className="space-y-4">
                      <InfoBlock
                        heading="Fees Free"
                        tone="positive"
                        icon={<CheckCircle2 size={18} aria-hidden="true" />}
                        body={
                          <>
                            {data.feesFree.description}{" "}
                            <a href={data.feesFree.url} target="_blank" rel="noopener noreferrer" className="text-teal font-medium hover:underline inline-flex items-center gap-1">
                              feesfree.govt.nz <ExternalLink size={12} aria-hidden="true" />
                            </a>
                          </>
                        }
                      />
                      <InfoBlock
                        heading={`Student Loan (estimate: ${formatNZD(loanEstimate)})`}
                        tone="neutral"
                        body={<>{data.studentLoan.note} Only some of the total above would be financed — most families use a mix of loan + allowance + savings + part-time work.</>}
                      />
                      <InfoBlock
                        heading="Student Allowance"
                        tone="neutral"
                        body={<>{data.studentAllowance.note} <a href={data.studentAllowance.studyLinkUrl} target="_blank" rel="noopener noreferrer" className="text-teal font-medium hover:underline inline-flex items-center gap-1">studylink.govt.nz <ExternalLink size={12} aria-hidden="true" /></a></>}
                      />
                    </div>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={selectedUni.feesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                    >
                      {selectedUni.name} fees <ExternalLink size={14} aria-hidden="true" />
                    </a>
                    <Button href="/tools/living-costs" variant="outline" size="md" className="flex-1">
                      Compare hall vs flatting
                    </Button>
                  </div>

                  <p className="text-xs text-navy/40 text-center pt-2">
                    All figures are 2026 estimates. Always verify exact costs on the university&apos;s official fees page before making plans.
                  </p>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.75rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #1B2A4A;
          background: white;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          outline: none;
          border-color: #2A9D8F;
          box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.15);
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-sm text-navy/70">{label}</span>
      <span className="text-sm font-semibold text-navy tabular-nums">{formatNZD(value)}</span>
    </li>
  );
}

function InfoBlock({
  heading,
  body,
  icon,
  tone,
}: {
  heading: string;
  body: React.ReactNode;
  icon?: React.ReactNode;
  tone: "positive" | "neutral";
}) {
  return (
    <div className={`rounded-xl p-4 ${tone === "positive" ? "bg-teal-50/60" : "bg-soft"}`}>
      <p className={`font-semibold text-sm mb-1 flex items-center gap-2 ${tone === "positive" ? "text-teal-700" : "text-navy"}`}>
        {icon}
        {heading}
      </p>
      <p className="text-sm text-navy/70 leading-relaxed">{body}</p>
    </div>
  );
}
