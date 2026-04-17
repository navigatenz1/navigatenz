import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask the Community — Q&A Board",
  description:
    "Anonymous Q&A for NZ Year 10-13 students. No question is too basic — ask about NCEA, university, scholarships, StudyLink, or careers, and get answers from the Navigate NZ team.",
  alternates: { canonical: "/ask" },
  openGraph: {
    title: "Ask the Community — Navigate NZ",
    description: "Anonymous education Q&A for NZ students. Ask, upvote, and get real answers.",
    url: "https://navigatenz.org/ask",
  },
};

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
