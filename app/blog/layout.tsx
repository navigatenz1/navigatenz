import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Education News & Updates",
  description:
    "Timely updates on NZ education — NCEA changes, new scholarships, university policy shifts, and practical tips for first-gen families.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Navigate NZ",
    description: "Timely NZ education news and practical tips for first-gen families.",
    url: "https://navigatenz.org/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
