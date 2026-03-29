import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Matcher NZ",
  description: "Find your best-fit NZ university based on your interests, goals, and preferences. Free matching tool.",
  alternates: { canonical: "/tools/university-matcher" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
