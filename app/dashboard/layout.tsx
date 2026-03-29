import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Dashboard",
  description: "Your personalised pathway dashboard on Navigate NZ.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
