import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedStat from "@/components/AnimatedStat";
import Link from "next/link";

const features = [
  {
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
    imageAlt: "School building exterior",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Understand the System",
    description: "School jargon decoded — year levels, NCEA, zoning, and more explained like a friend would",
  },
  {
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80",
    imageAlt: "Planning checklist for finding your path",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
      </svg>
    ),
    title: "Find Your Path",
    description: "Answer a few questions and see exactly where you stand — no sign-up pressure, no sales pitch",
  },
  {
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80",
    imageAlt: "Student working on laptop tracking progress",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Track Your Progress",
    description: "Free step-by-step modules you can work through at your own pace",
  },
];

const testimonials = [
  { quote: "I had no idea how NCEA worked until I found Navigate NZ. Now I actually have a plan.", name: "Year 12 Student", location: "South Auckland", initials: "AS", color: "bg-teal" },
  { quote: "As a mum who didn't go to uni myself, this site explained everything I needed to know.", name: "Parent", location: "Hamilton", initials: "MK", color: "bg-gold" },
  { quote: "The pathway assessment showed me I was closer to university than I thought.", name: "Year 13 Student", location: "Wellington", initials: "JT", color: "bg-coral" },
];

const helpSections = [
  {
    title: "Understand the system",
    description: "Free guides written in plain language — no education jargon, no paywalls",
    cta: "Read Our Guides",
    ctaHref: "/guides",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    imageAlt: "Students learning in a classroom",
  },
  {
    title: "Find your personalised path",
    description: "A quick self-assessment to understand your situation — your data stays private, always",
    cta: "Take the Assessment",
    ctaHref: "/assessment",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    imageAlt: "Students planning together at a table",
  },
  {
    title: "Track your progress",
    description: "Short learning modules you complete at your own pace — no deadlines, no pressure",
    cta: "Browse Modules",
    ctaHref: "/modules",
    image: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&q=80",
    imageAlt: "Student celebrating academic progress",
  },
];

const stats = [
  { value: "$0", label: "Always free for every family" },
  { value: "5", label: "Plain-language guides and growing" },
  { value: "100%", label: "Independent — no ads, no sponsors" },
];

const steps = [
  { number: "01", title: "Take the assessment", description: "Answer a few quick questions about where you are and where you want to go." },
  { number: "02", title: "Get your personalised pathway", description: "We'll create a custom roadmap based on your year level, school, and goals." },
  { number: "03", title: "Complete modules at your own pace", description: "Work through guides and track your progress — all free, all in plain language." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/40 via-soft to-gold-50/30" />
        <div className="bg-dot-pattern" />

        <Container className="relative py-24 sm:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 animate-fade-in-up">
                100% Free · Community Built · Open to Everyone
              </div>
              <h1 className="text-[2.75rem] sm:text-[3.25rem] lg:text-[3.5rem] font-bold text-navy leading-[1.1] tracking-tight animate-fade-in-up">
                The free guide your{" "}
                <span className="text-teal">family deserves</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-navy/60 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                No fees. No catches. Just clear, honest guidance for students and families navigating New Zealand&apos;s education system.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
                <Button href="/guides" size="lg">Explore Free Guides</Button>
                <Button href="/assessment" variant="outline" size="lg">Find Out Where You Stand</Button>
              </div>
            </div>

            {/* Hero images */}
            <div className="relative hidden lg:block animate-fade-in animation-delay-400">
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-2xl shadow-navy/10">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                    alt="Diverse students studying together at university"
                    width={800}
                    height={533}
                    className="object-cover w-full h-[340px] transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </div>
                {/* Overlapping smaller image */}
                <div className="absolute -bottom-8 -left-8 overflow-hidden rounded-2xl shadow-xl shadow-navy/10 border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                    alt="Students collaborating on a project together"
                    width={240}
                    height={160}
                    className="object-cover w-[200px] h-[140px]"
                    priority
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 right-12 w-16 h-16 bg-teal/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </Container>

        {/* Floating bg dots */}
        <div className="absolute top-32 right-1/4 w-3 h-3 rounded-full bg-teal/15 animate-float" />
        <div className="absolute top-48 left-1/4 w-2 h-2 rounded-full bg-gold/25 animate-float-slow" />
        <div className="absolute bottom-24 left-1/3 w-2.5 h-2.5 rounded-full bg-coral/15 animate-float animation-delay-1000" />
      </section>

      {/* Wavy divider */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 30 C360 60 720 0 1080 30 S1440 50 1440 30 V60 H0 Z" fill="white" />
        </svg>
      </div>

      {/* Features */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="bg-dot-pattern" />
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">Built by students, for students</h2>
              <p className="mt-4 text-navy/60 max-w-xl mx-auto leading-relaxed">Navigate NZ breaks down the confusing parts of the education system into simple, actionable steps.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <ScrollReveal key={feature.title}>
                <Card accent className="p-0 overflow-hidden h-full">
                  <div className="overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      width={400}
                      height={200}
                      className="w-full h-[180px] object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 mb-4 -mt-10 relative z-10 border-4 border-white shadow-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-2">{feature.title}</h3>
                    <p className="text-navy/60 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32 bg-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -translate-y-1/3" />
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">From our community</h2>
              <p className="mt-4 text-navy/60">Navigate NZ is built by first-gen students who&apos;ve been where you are</p>
            </div>
          </ScrollReveal>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory">
            {testimonials.map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[320px] sm:w-[380px] snap-center">
                <div className="h-full rounded-2xl bg-soft border-l-4 border-l-teal border border-gray-100 p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#E9C46A" className="mb-4 flex-shrink-0">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="text-navy/80 leading-relaxed flex-1 text-[15px]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">{t.name}</p>
                      <p className="text-navy/40 text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How Navigate NZ Helps You */}
      <section className="py-24 sm:py-32 bg-white relative">
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">How we help — for free, forever</h2>
              <p className="mt-4 text-navy/60 max-w-xl mx-auto">From understanding the basics to tracking your journey — we&apos;ve got every step covered.</p>
            </div>
          </ScrollReveal>
          <div className="space-y-20 lg:space-y-28">
            {helpSections.map((section, i) => (
              <ScrollReveal key={section.title}>
                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-16`}>
                  <div className="flex-1">
                    <div className="overflow-hidden rounded-2xl shadow-lg shadow-gray-200/50">
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
                        width={600}
                        height={400}
                        className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4">{section.title}</h3>
                    <p className="text-navy/60 text-lg leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">{section.description}</p>
                    <Button href={section.ctaHref} variant={section.ctaHref === "#" ? "outline" : "primary"} size="md">
                      {section.cta} {section.ctaHref !== "#" && <span className="ml-1">&rarr;</span>}
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Start */}
      <section className="py-24 sm:py-32 bg-soft relative">
        <div className="bg-dot-pattern" />
        <Container className="relative">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <Card hover={false} className="p-10 sm:p-14 text-center border-0 shadow-xl shadow-gray-200/60 bg-white">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Not sure where to start?</h2>
                <p className="text-navy/60 mb-10">Choose your role and we&apos;ll point you in the right direction</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/guides" className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-gray-100 hover:border-teal hover:bg-teal-50/50 transition-all duration-200 hover:scale-[1.02]">
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>
                    </div>
                    <span className="font-semibold text-navy text-lg">I&apos;m a Student</span>
                    <span className="text-navy/50 text-sm -mt-2">Year 9–13</span>
                  </Link>
                  <Link href="/guides" className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-gray-100 hover:border-gold hover:bg-gold-50/50 transition-all duration-200 hover:scale-[1.02]">
                    <div className="w-16 h-16 rounded-2xl bg-gold-50 flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#E9C46A" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
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

      {/* Stats with animated counters */}
      <section className="py-20 sm:py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl translate-x-1/3" />
        <Container className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 bg-soft relative">
        <div className="bg-dot-pattern" />
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">How it works</h2>
              <p className="mt-4 text-navy/60 max-w-xl mx-auto">Three simple steps to your personalised university pathway</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
              <div className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-teal/20" />
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

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-white">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">Ready to get started?</h2>
              <p className="mt-4 text-navy/60 text-lg">It&apos;s free, it&apos;s simple, and it&apos;s built for students just like you.</p>
              <div className="mt-10"><Button href="/guides" size="lg">Explore the Guides</Button></div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
