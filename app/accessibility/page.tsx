import Container from "@/components/Container";
import Link from "next/link";

export default function AccessibilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-soft via-white to-teal-50/30 py-16 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-navy/50 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-navy/70">Accessibility</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">Accessibility</h1>
          <p className="mt-4 text-navy/60 text-lg max-w-2xl leading-relaxed">
            Navigate NZ is built for every student and family. Here&apos;s how we think about access, and what we still need to fix.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy mb-3">Our commitment</h2>
              <p className="text-navy/70 leading-relaxed">
                We aim to meet WCAG 2.1 Level AA — the international standard for accessible websites. If something on this site gets in the way of you using it, that&apos;s a bug we want to fix.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy mb-3">What we&apos;ve done</h2>
              <ul className="list-disc pl-6 space-y-2 text-navy/70 leading-relaxed">
                <li>Semantic HTML — proper headings, landmarks, and page structure for screen readers</li>
                <li>Keyboard navigation on every interactive element — no mouse required</li>
                <li>Descriptive alt text on images that carry information</li>
                <li>Colour contrast tested against WCAG AA minimums (4.5:1 for body text)</li>
                <li>Focus rings on buttons, links, and form controls</li>
                <li>Plain language — our reading-level target is Year 9 English</li>
                <li>Responsive layouts that work at 320px width up to desktop</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy mb-3">Known limitations</h2>
              <p className="text-navy/70 leading-relaxed mb-3">
                We&apos;re honest about what&apos;s not perfect yet:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-navy/70 leading-relaxed">
                <li>Our language switcher is partially broken — some strings still display in English when another language is selected</li>
                <li>Some stock photography (Unsplash) may have generic alt text that we&apos;re rewriting</li>
                <li>Assessment flow hasn&apos;t been fully tested with a screen reader yet</li>
              </ul>
              <p className="text-navy/70 leading-relaxed mt-3">
                We&apos;re working through these. If you hit a specific one, please tell us — it helps us prioritise.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy mb-3">How to report an issue</h2>
              <p className="text-navy/70 leading-relaxed">
                Email{" "}
                <a href="mailto:admin@navigatenz.org?subject=Accessibility%20issue" className="text-teal hover:underline font-medium">
                  admin@navigatenz.org
                </a>
                {" "}with a description of the problem and the page URL if you can. We aim to respond within 5 working days.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy mb-3">Keep telling us</h2>
              <p className="text-navy/70 leading-relaxed">
                Accessibility isn&apos;t a checklist we tick once — it&apos;s an ongoing commitment. Feedback from real users is how we find the things automated tools miss. Thank you for helping us make Navigate NZ better.
              </p>
            </div>

            <p className="pt-6 border-t border-gray-100 text-navy/40 text-sm">
              Last updated: April 2026
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
