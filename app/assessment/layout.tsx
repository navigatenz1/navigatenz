import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Out Where You Stand",
  description:
    "Take our free assessment and get a personalised roadmap to university in New Zealand. Completely free, completely private.",
  openGraph: {
    title: "Find Out Where You Stand — Navigate NZ",
    description: "Free personalised assessment for NZ students.",
  },
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
