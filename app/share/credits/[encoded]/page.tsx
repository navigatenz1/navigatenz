"use client";

import { useMemo } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { decodePayload } from "@/lib/share-encoding";

interface SharedCredits {
  l: number;        // ncea level achieved (1/2/3)
  ue: boolean;      // UE met
  away: number;     // credits away from next milestone
  rank?: number;    // rank score, optional
}

export default function SharedCreditsPage({ params }: { params: { encoded: string } }) {
  const decoded = useMemo(() => decodePayload<SharedCredits>(params.encoded), [params.encoded]);

  if (!decoded) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-soft">
        <Container className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-navy mb-3">That link is invalid</h1>
          <p className="text-navy/60 mb-6">Try the calculator yourself to see your progress.</p>
          <Button href="/tools/credit-calculator" size="lg">Open the calculator</Button>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-soft py-16">
      <Container>
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-navy/10">
            <div className="bg-gradient-to-br from-navy via-navy to-teal-900 p-6 sm:p-8 text-white">
              <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2">NCEA credits snapshot</p>
              <h1 className="text-3xl sm:text-4xl font-bold">NCEA Level {decoded.l}</h1>
              <p className="mt-2 text-white/70">
                {decoded.ue ? "✓ University Entrance met" : `${decoded.away} credits away from UE`}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 space-y-4">
              {typeof decoded.rank === "number" && (
                <div>
                  <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-wider mb-1">Rank score</p>
                  <p className="text-3xl font-bold text-teal tabular-nums">{decoded.rank}</p>
                  <p className="text-xs text-navy/50 mt-1">Most NZ universities accept UE + programme-specific rank score.</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 text-center">
                <p className="text-sm text-navy/60 mb-3">Want to check your own credits?</p>
                <Button href="/tools/credit-calculator" size="md">Open the calculator</Button>
                <p className="mt-3 text-xs text-navy/30">Free · No account · navigatenz.org</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-navy/40">
            Shared credit totals only — no name, no school, no personal info.
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
