import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Guides",
  description:
    "Everything you need to know about navigating NZ's education system — in plain language. Free, no account required.",
  openGraph: {
    title: "Free Guides — Navigate NZ",
    description: "Plain-language guides for navigating NZ's education system.",
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
