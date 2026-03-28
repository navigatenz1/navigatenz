import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Matcher",
  description: "Find your best-fit NZ university with our free matching tool. Answer 5 questions and get personalised recommendations.",
};

export default function UniMatcherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
