import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Key Education Dates NZ 2026",
  description: "Important dates for NZ students: scholarship deadlines, university applications, NCEA exams, StudyLink.",
  alternates: { canonical: "/tools/key-dates" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
