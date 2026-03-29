import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Statement Helper",
  description: "Free guided tool to write your university personal statement step by step. Prompts, tips, and word count.",
  alternates: { canonical: "/tools/personal-statement" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
