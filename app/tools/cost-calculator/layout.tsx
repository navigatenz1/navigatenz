import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Cost Calculator",
  description:
    "Estimate the true cost of studying at a NZ university — tuition, accommodation, and living costs per year and per degree. Fees Free and Student Loan guidance included. Free, no account.",
  alternates: { canonical: "/tools/cost-calculator" },
  openGraph: {
    title: "University Cost Calculator — Navigate NZ",
    description:
      "Estimate the true annual and total cost of studying at any NZ university. Includes Fees Free eligibility and Student Loan projection.",
    url: "https://navigatenz.org/tools/cost-calculator",
  },
};

export default function CostCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
