import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hall vs Flatting Comparison",
  description:
    "Compare halls of residence vs flatting in every NZ university city. Weekly and yearly costs, pros and cons, and a verdict for each city. 2026 estimates.",
  alternates: { canonical: "/tools/living-costs" },
  openGraph: {
    title: "Hall vs Flatting — Navigate NZ",
    description: "City-by-city comparison of student accommodation costs across NZ.",
    url: "https://navigatenz.org/tools/living-costs",
  },
};

export default function LivingCostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
