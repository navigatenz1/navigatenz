"use client";

import Container from "@/components/Container";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedStat from "@/components/AnimatedStat";
import QualificationChangeNotice from "@/components/QualificationChangeNotice";
import { HeroAccordion } from "@/components/ui/interactive-image-accordion";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";

const platformStats = [
  { value: "$0", label: "Always free for every family" },
  { value: "14", label: "Plain-language guides" },
  { value: "12", label: "Action modules" },
  { value: "5", label: "Interactive tools" },
];

const steps = [
  { number: "01", title: "Take the assessment", description: "Answer a few quick questions about where you are and where you want to go." },
  { number: "02", title: "Get your personalised pathway", description: "We'll create a custom roadmap based on your year level, school, and goals." },
  { number: "03", title: "Complete modules at your own pace", description: "Work through guides and track your progress — all free, all in plain language." },
];

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <QualificationChangeNotice variant="banner">
        NZ&apos;s school qualifications are changing. NCEA will be phased out between 2028-2030. Our guides cover the current system for students graduating before 2030.{" "}
        <Link href="/guides/nz-qualification-changes" className="underline font-semibold">Learn more</Link>
      </QualificationChangeNotice>

      {/* Hero (includes the distinctive 5-panel accordion) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-soft via-white to-teal-50/20" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20 lg:py-28">
          <HeroAccordion />
        </Container>
      </section>

      {/* Wavy divider */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30 C360 60 720 0 1080 30 S1440 50 1440 30 V60 H0 Z" fill="white" />
        </svg>
      </div>

      {/* Social proof — real platform numbers, no zeros */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 max-w-5xl mx-auto">
              {platformStats.map((stat) => (
                <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Role selector — who is this for? */}
      <section className="py-16 sm:py-24 bg-soft relative">
        <Container className="relative">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <Card hover={false} className="p-10 sm:p-14 text-center border-0 shadow-xl shadow-gray-200/60 bg-white">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">{t.quickStart.heading}</h2>
                <p className="text-navy/60 mb-10">{t.quickStart.subtitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href="/guides"
                    className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-gray-100 hover:border-teal hover:bg-teal-50/50 transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                      </svg>
                    </div>
                    <span className="font-semibold text-navy text-lg">I&apos;m a Student</span>
                    <span className="text-navy/50 text-sm -mt-2">Year 9–13</span>
                  </Link>
                  <Link
                    href="/guides"
                    className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-gray-100 hover:border-gold hover:bg-gold-50/50 transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gold-50 flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#E9C46A" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-navy text-lg">I&apos;m a Parent / Family</span>
                    <span className="text-navy/50 text-sm -mt-2">Supporting a student</span>
                  </Link>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* How it works — three steps, no repetition */}
      <section className="py-16 sm:py-24 bg-white relative">
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">{t.howItWorks.heading}</h2>
              <p className="mt-4 text-navy/60 max-w-xl mx-auto">{t.howItWorks.subtitle}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
              <div className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-teal/20" aria-hidden="true" />
              {steps.map((step) => (
                <div key={step.number} className="text-center relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal text-white font-bold text-sm mb-5 relative z-10">{step.number}</div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{step.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Community CTA — Phase 1 replacement for fake testimonials */}
      <section className="py-16 sm:py-24 bg-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -translate-y-1/3" aria-hidden="true" />
        <Container className="relative">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 mb-6">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">Has Navigate NZ helped you?</h2>
              <p className="mt-4 text-navy/60 text-lg leading-relaxed">
                We&apos;d love to hear your story. Your feedback helps us build better guides for families like yours.
              </p>
              <div className="mt-8">
                <Button
                  href="mailto:admin@navigatenz.org?subject=My%20Navigate%20NZ%20Story"
                  size="lg"
                >
                  Share your story
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">Ready to get started?</h2>
              <p className="mt-4 text-navy/60 text-lg">
                Answer a few quick questions and we&apos;ll map your pathway. No account needed.
              </p>
              <div className="mt-10">
                <Button href="/assessment" size="lg">Take the free assessment</Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
