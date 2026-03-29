import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Learning Modules",
  description:
    "Step-by-step action checklists for NZ students. Track your progress from school to university. Free, self-paced.",
  alternates: { canonical: "/modules" },
  openGraph: {
    title: "Free Learning Modules — Navigate NZ",
    description: "Step-by-step action checklists for NZ students on the path to university.",
  },
};

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
