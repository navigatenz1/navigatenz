import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Story",
  description:
    "Has Navigate NZ helped you or your family? Share your story so other first-gen students can see what's possible. We only publish with your permission.",
  alternates: { canonical: "/share-your-story" },
  openGraph: {
    title: "Share Your Story — Navigate NZ",
    description: "Tell us how Navigate NZ helped. We only publish with your permission.",
    url: "https://navigatenz.org/share-your-story",
  },
};

export default function ShareStoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
