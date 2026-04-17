import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pathway Finder — NCEA, Cambridge, or IB?",
  description:
    "Four quick questions to help you decide between NCEA, Cambridge, and IB. No account, no data stored — a straight recommendation with the reasoning.",
  alternates: { canonical: "/tools/pathway-finder" },
  openGraph: {
    title: "Pathway Finder — Navigate NZ",
    description: "Find the right qualification pathway for you in 4 questions.",
    url: "https://navigatenz.org/tools/pathway-finder",
  },
};

export default function PathwayFinderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
