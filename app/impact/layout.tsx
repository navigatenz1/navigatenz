import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "Real numbers, real students, real progress. See how Navigate NZ is helping first-gen students.",
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
