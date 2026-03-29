import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free NCEA Credit Calculator",
  description: "Check if you meet NCEA Level 1, 2, 3 and University Entrance requirements. Enter your credits and see instantly.",
  alternates: { canonical: "/tools/credit-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
