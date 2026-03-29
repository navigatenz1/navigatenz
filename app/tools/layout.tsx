import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tools",
  description: "Interactive tools for NZ students: NCEA credit calculator, scholarship finder, university matcher, and more. All free.",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
