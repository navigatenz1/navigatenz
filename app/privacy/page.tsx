import Container from "@/components/Container";
import Link from "next/link";

const sections = [
  {
    heading: "What we collect",
    body: (
      <>
        <p>If you create an account, we store your name, email, and the answers you give in our pathway assessment (year level, school context, goals).</p>
        <p>If you visit without signing up, we record basic page-view analytics — which pages are popular, roughly which region you&apos;re in, and nothing more.</p>
      </>
    ),
  },
  {
    heading: "Why we collect it",
    body: (
      <p>To give you a personalised education pathway and to understand which guides are helping families most. That&apos;s it.</p>
    ),
  },
  {
    heading: "Where it's stored",
    body: (
      <p>On Supabase, a cloud-hosted database service. Your data stays on their secure servers and is only accessed through our platform.</p>
    ),
  },
  {
    heading: "Who can see it",
    body: (
      <p>Only you, and a small group of Navigate NZ admins who need access to run the platform. No advertisers. No data brokers. No external partners.</p>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>Until you delete your account. When you delete it, we delete everything we hold about you — permanently, within 30 days.</p>
    ),
  },
  {
    heading: "Your rights under the NZ Privacy Act 2020",
    body: (
      <>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 text-navy/70">
          <li>Ask what data we hold about you</li>
          <li>Correct anything that&apos;s wrong</li>
          <li>Delete your data whenever you want</li>
        </ul>
        <p className="mt-3">
          To exercise any of these, email{" "}
          <a href="mailto:admin@navigatenz.org" className="text-teal hover:underline font-medium">
            admin@navigatenz.org
          </a>{" "}
          and we&apos;ll respond within 20 working days.
        </p>
      </>
    ),
  },
  {
    heading: "Third parties",
    body: (
      <p>We don&apos;t sell your data. We don&apos;t share it. We don&apos;t trade it. No advertising networks, no tracking pixels, no third-party analytics beyond basic anonymous page views.</p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>If we update how we handle your data, we&apos;ll post the change here and email anyone with an account. We won&apos;t make material changes without telling you first.</p>
    ),
  },
  {
    heading: "Questions or complaints",
    body: (
      <>
        <p>
          Email{" "}
          <a href="mailto:admin@navigatenz.org" className="text-teal hover:underline font-medium">
            admin@navigatenz.org
          </a>
          . If you&apos;re not satisfied with our response, you can contact the Office of the Privacy Commissioner at{" "}
          <a
            href="https://privacy.org.nz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline font-medium"
          >
            privacy.org.nz
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-soft via-white to-teal-50/30 py-16 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-navy/50 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-navy/70">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">Privacy Policy</h1>
          <p className="mt-4 text-navy/60 text-lg max-w-2xl leading-relaxed">
            We wrote this in plain language because your privacy shouldn&apos;t be buried in legalese.
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-xl sm:text-2xl font-bold text-navy mb-3">{section.heading}</h2>
                  <div className="text-navy/70 leading-relaxed space-y-3">
                    {section.body}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-16 pt-6 border-t border-gray-100 text-navy/40 text-sm">
              Last updated: April 2026
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
