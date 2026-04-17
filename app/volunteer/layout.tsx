import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Team",
  description:
    "Help us build the guide every first-gen NZ family deserves. Volunteer roles for content writers, translators, ambassadors, designers, and more. 1–8 hours a week.",
  alternates: { canonical: "/volunteer" },
  openGraph: {
    title: "Join the Navigate NZ Team",
    description:
      "Volunteer roles for students and recent grads who want to help first-gen families navigate NZ education.",
    url: "https://navigatenz.org/volunteer",
  },
};

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
