"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Check, X } from "lucide-react";
import Container from "@/components/Container";
import Card from "@/components/Card";
import data from "@/lib/data/living-costs.json";

function nzd(n: number) {
  return n.toLocaleString("en-NZ", { style: "currency", currency: "NZD", maximumFractionDigits: 0 });
}

export default function LivingCostsPage() {
  const [cityId, setCityId] = useState(data.cities[0].id);
  const city = data.cities.find((c) => c.id === cityId)!;

  const hallYearly = city.hallPerWeek * 38;
  const flatWeekly = city.flattingRentPerWeek + city.utilitiesPerWeek + city.foodPerWeek + city.transportPerWeek;
  const flatYearly = flatWeekly * 52;
  const cheaper = hallYearly < flatYearly ? "hall" : "flat";
  const savings = Math.abs(hallYearly - flatYearly);

  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy to-teal-900 py-14 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/80">Hall vs Flatting</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Hall vs Flatting</h1>
          <p className="mt-3 text-white/70 text-lg max-w-2xl leading-relaxed">
            A real cost comparison for every NZ university city. Numbers are 2026 estimates — verify before you commit.
          </p>
        </Container>
      </section>

      <section className="py-12 bg-soft">
        <Container>
          <div className="max-w-5xl mx-auto">
            <fieldset className="mb-8">
              <legend className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-2">Pick a city</legend>
              <div role="tablist" aria-label="University cities" className="flex flex-wrap gap-2">
                {data.cities.map((c) => {
                  const active = c.id === cityId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setCityId(c.id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                        active
                          ? "border-teal bg-teal text-white"
                          : "border-gray-200 bg-white text-navy/70 hover:border-teal hover:text-teal"
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6" role="tabpanel" aria-label={`${city.name} comparison`}>
              {/* Hall card */}
              <Card hover={false} className="p-6 border-t-[3px] border-t-teal">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-navy text-lg">Hall of residence</h2>
                  {cheaper === "hall" && (
                    <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      Cheaper here
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-teal tabular-nums">{nzd(city.hallPerWeek)}<span className="text-sm font-normal text-navy/40"> /week</span></p>
                <p className="text-sm text-navy/60 mt-1">≈ {nzd(hallYearly)} per year (38 weeks)</p>

                <div className="mt-5 pt-5 border-t border-gray-100">
                  <PosNeg tone="pros" items={city.hallPros} />
                  <PosNeg tone="cons" items={city.hallCons} />
                </div>
              </Card>

              {/* Flat card */}
              <Card hover={false} className="p-6 border-t-[3px] border-t-gold">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-navy text-lg">Flatting</h2>
                  {cheaper === "flat" && (
                    <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      Cheaper here
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-gold-700 tabular-nums">{nzd(flatWeekly)}<span className="text-sm font-normal text-navy/40"> /week</span></p>
                <p className="text-sm text-navy/60 mt-1">≈ {nzd(flatYearly)} per year (52 weeks)</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-navy/60">
                  <div className="rounded-lg bg-soft px-3 py-2">
                    <dt className="text-navy/40">Rent</dt>
                    <dd className="font-semibold text-navy">{nzd(city.flattingRentPerWeek)}</dd>
                  </div>
                  <div className="rounded-lg bg-soft px-3 py-2">
                    <dt className="text-navy/40">Power + internet</dt>
                    <dd className="font-semibold text-navy">{nzd(city.utilitiesPerWeek)}</dd>
                  </div>
                  <div className="rounded-lg bg-soft px-3 py-2">
                    <dt className="text-navy/40">Food</dt>
                    <dd className="font-semibold text-navy">{nzd(city.foodPerWeek)}</dd>
                  </div>
                  <div className="rounded-lg bg-soft px-3 py-2">
                    <dt className="text-navy/40">Transport</dt>
                    <dd className="font-semibold text-navy">{nzd(city.transportPerWeek)}</dd>
                  </div>
                </dl>

                <div className="mt-5 pt-5 border-t border-gray-100">
                  <PosNeg tone="pros" items={city.flattingPros} />
                  <PosNeg tone="cons" items={city.flattingCons} />
                </div>
              </Card>
            </div>

            <Card hover={false} className="p-6 bg-gradient-to-br from-teal-50 to-gold-50 border-0 mb-6">
              <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-1">Our take</p>
              <p className="text-navy font-semibold leading-relaxed">{city.verdict}</p>
              <p className="mt-3 text-sm text-navy/60">
                Difference over a year: <span className="font-semibold text-navy tabular-nums">{nzd(savings)}</span>{" "}
                {cheaper === "hall" ? "cheaper in hall" : "cheaper flatting"}.
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={city.accommodationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                Official {city.name} accommodation <ExternalLink size={14} aria-hidden="true" />
              </a>
              <Link
                href="/tools/cost-calculator"
                className="flex-1 inline-flex items-center justify-center rounded-xl bg-teal text-white px-4 py-2.5 text-sm font-semibold hover:bg-teal-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                Full cost calculator →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function PosNeg({ tone, items }: { tone: "pros" | "cons"; items: string[] }) {
  const Icon = tone === "pros" ? Check : X;
  const color = tone === "pros" ? "text-teal" : "text-coral";
  const label = tone === "pros" ? "Pros" : "Cons";
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-2">{label}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-navy/80">
            <Icon size={14} strokeWidth={2.5} className={`flex-shrink-0 mt-0.5 ${color}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
