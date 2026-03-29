import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See how Navigate NZ is helping students and families. Real numbers, real impact, completely free.",
  alternates: { canonical: "/impact" },
  openGraph: {
    title: "Our Impact — Navigate NZ",
    description: "Real numbers, real students, real progress. See Navigate NZ's impact.",
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
