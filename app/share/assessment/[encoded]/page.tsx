"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { decodePayload } from "@/lib/share-encoding";
import { getYearLabel, getQualLabel } from "@/lib/pathway";

interface SharedAssessment {
  y: string; // year_level
  q: string; // qualification_pathway
  f: boolean; // first_gen
  g: string; // goals (plain text, max 200 chars)
}

export default function SharedAssessmentPage({ params }: { params: { encoded: string } }) {
  const decoded = useMemo(() => decodePayload<SharedAssessment>(params.encoded), [params.encoded]);

  if (!decoded) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-soft">
        <Container className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-navy mb-3">That link is invalid</h1>
          <p className="text-navy/60 mb-6">It may have been truncated or tampered with. You can create your own pathway below.</p>
          <Button href="/assessment" size="lg">Take the assessment</Button>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-soft py-16">
      <Container>
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-navy/10">
            {/* Brand header */}
            <div className="bg-gradient-to-br from-navy via-navy to-teal-900 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
                My Navigate NZ profile
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">{getYearLabel(decoded.y)} · {getQualLabel(decoded.q)}</h1>
              {decoded.f && (
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold/20 text-gold-300 text-xs font-semibold px-3 py-1">
                  <Sparkles size={10} aria-hidden="true" />
                  First in family to university
                </span>
              )}
            </div>

            {/* Body */}
            <div className="bg-white p-6 sm:p-8 space-y-5">
              {decoded.g && (
                <div>
                  <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-1.5">My goal</p>
                  <p className="text-navy leading-relaxed">{decoded.g}</p>
                </div>
              )}

              <div>
                <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-2">Next steps</p>
                <ul className="space-y-2 text-sm text-navy/80">
                  <li className="flex gap-2"><span className="text-teal">→</span> Browse guides tailored to {getYearLabel(decoded.y)} students</li>
                  <li className="flex gap-2"><span className="text-teal">→</span> Check {getQualLabel(decoded.q)} credit progress with our calculator</li>
                  <li className="flex gap-2"><span className="text-teal">→</span> Explore NZ universities that fit your goals</li>
                </ul>
              </div>

              <div className="pt-5 border-t border-gray-100 text-center">
                <p className="text-sm text-navy/60 mb-3">Want your own personalised pathway?</p>
                <Button href="/assessment" size="md">Get your own pathway</Button>
                <p className="mt-3 text-xs text-navy/30">Free forever · No ads · navigatenz.org</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-navy/40">
            This card shows only aggregated assessment choices — no name, no email, no personal contact info.
          </p>
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-teal font-medium hover:underline">
              ← Navigate NZ home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
