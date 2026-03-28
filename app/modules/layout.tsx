import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Action Modules",
  description:
    "Practical action checklists to keep you on track toward university. Free, self-paced, no deadlines.",
  openGraph: {
    title: "Free Learning Modules — Navigate NZ",
    description:
      "Short, structured lessons to help you understand the NZ education system and prepare for university.",
  },
};

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
