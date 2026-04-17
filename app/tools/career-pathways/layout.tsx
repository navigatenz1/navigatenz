import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Pathways — Subject to Career Mapper",
  description:
    "Know what you want to do? See the exact NCEA subjects you need. Not sure? Pick the subjects you like and see what careers open up. 30+ NZ careers.",
  alternates: { canonical: "/tools/career-pathways" },
  openGraph: {
    title: "Career Pathways — Navigate NZ",
    description: "Subject-to-career mapping for NZ students. 30+ careers, two ways to explore.",
    url: "https://navigatenz.org/tools/career-pathways",
  },
};

export default function CareerPathwaysLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
