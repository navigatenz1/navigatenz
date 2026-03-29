import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Path",
  description:
    "Take a free 3-minute assessment and get a personalised pathway to university based on your situation. Completely private.",
  alternates: { canonical: "/assessment" },
  openGraph: {
    title: "Find Your Path — Navigate NZ",
    description: "Free personalised assessment for NZ students heading to university.",
  },
};

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
