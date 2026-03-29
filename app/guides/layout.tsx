import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Education Guides",
  description:
    "Plain-language guides covering NZ schools, NCEA, Cambridge, IB, university entrance, scholarships, and StudyLink. Free, no account needed.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Free Education Guides — Navigate NZ",
    description: "Plain-language guides covering NZ schools, NCEA, university entrance, and scholarships.",
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
