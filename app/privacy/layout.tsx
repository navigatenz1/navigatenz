import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Navigate NZ collects, stores, and protects your data — in plain language, compliant with the NZ Privacy Act 2020. We never sell, share, or trade your data.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Navigate NZ",
    description:
      "How Navigate NZ protects your data. Plain language, Privacy Act 2020 compliant.",
    url: "https://navigatenz.org/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
