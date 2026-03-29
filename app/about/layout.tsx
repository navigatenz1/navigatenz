import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Navigate NZ — Our Mission",
  description:
    "Founded by Uzair Khan, Navigate NZ is a free nonprofit platform helping first-gen students navigate NZ education.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Navigate NZ — Our Mission",
    description: "A free nonprofit platform helping first-gen students navigate NZ education.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
