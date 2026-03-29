import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarship Finder NZ",
  description: "Search 20+ NZ scholarships by university, type, and eligibility. Free database for students.",
  alternates: { canonical: "/tools/scholarship-finder" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
