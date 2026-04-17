import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Navigate NZ's commitment to WCAG 2.1 Level AA accessibility. How we build for every student and family, known limitations, and how to report issues.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility — Navigate NZ",
    description:
      "Our commitment to WCAG 2.1 AA. We build Navigate NZ to be usable by everyone.",
    url: "https://navigatenz.org/accessibility",
  },
};

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
