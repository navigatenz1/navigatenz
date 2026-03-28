"use client";

import { useState, useMemo } from "react";
import Container from "@/components/Container";
import Card from "@/components/Card";
import { scholarships } from "@/lib/scholarships";

const unis = ["All", "Auckland", "Otago", "Victoria", "Canterbury", "Waikato", "Massey", "AUT", "Lincoln", "External"];
const types = ["All", "Academic", "Equity", "Leadership", "Subject", "Community"];

const typeBadge: Record<string, string> = {
  Academic: "bg-teal-50 text-teal-700",
  Equity: "bg-gold-50 text-gold-800",
  Leadership: "bg-navy-50 text-navy-600",
  Subject: "bg-coral-50 text-coral-700",
  Community: "bg-teal-50 text-teal-700",
};

export default function ScholarshipFinderPage() {
  const [search, setSearch] = useState("");
  const [uni, setUni] = useState("All");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => {
    return scholarships.filter((s) => {
      if (uni !== "All" && s.uni !== uni) return false;
      if (type !== "All" && s.type !== type) return false;
      if (search) {
        const q = search.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.org.toLowerCase().includes(q) || s.eligibility.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, uni, type]);

  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-12 sm:py-16 overflow-hidden">
        <Container className="relative">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Scholarship Finder</h1>
          <p className="mt-3 text-white/60 text-sm sm:text-base">Search 20+ NZ scholarships. Find funding you didn&apos;t know existed.</p>
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, university, or eligibility..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal mb-4"
            />

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {unis.map((u) => (
                  <button key={u} onClick={() => setUni(u)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${uni === u ? "bg-teal text-white" : "bg-gray-100 text-navy/60 hover:bg-gray-200"}`}>{u}</button>
                ))}
              </div>
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {types.map((t) => (
                  <button key={t} onClick={() => setType(t)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${type === t ? "bg-navy text-white" : "bg-gray-100 text-navy/60 hover:bg-gray-200"}`}>{t}</button>
                ))}
              </div>
            </div>

            <p className="text-xs text-navy/40 mb-4">Showing {filtered.length} of {scholarships.length} scholarships</p>

            {/* Results */}
            <div className="space-y-3">
              {filtered.map((s) => (
                <Card key={s.id} className="p-5" accent>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-navy text-sm">{s.name}</h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeBadge[s.type] || "bg-gray-100 text-gray-600"}`}>{s.type}</span>
                      </div>
                      <p className="text-xs text-navy/50">{s.org}</p>
                      <p className="text-xs text-navy/60 mt-1">{s.eligibility}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-bold text-teal text-sm whitespace-nowrap">{s.value}</span>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-teal text-white text-xs font-semibold rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap">
                        Apply &rarr;
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-navy/40">
                  <p className="text-lg mb-1">No scholarships match your filters</p>
                  <p className="text-sm">Try broadening your search</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
