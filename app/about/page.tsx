import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description: "Why Navigate NZ exists and how you can help.",
};

const milestones = [
  { year: "March 2026", title: "Platform launched", description: "Navigate NZ goes live at navigatenz.org." },
  { year: "March 2026", title: "14 guides published", description: "Plain-language guides covering NCEA, University Entrance, scholarships, StudyLink, and more." },
  { year: "March 2026", title: "5 interactive tools launched", description: "Credit calculator, university matcher, scholarship finder, key-dates timeline, personal-statement helper." },
  { year: "April 2026", title: "Volunteer programme launched", description: "Student volunteers join across content, outreach, design, and translation." },
  { year: "Coming soon", title: "School partnerships", description: "Working with NZ schools and careers advisors to reach more first-generation families.", dashed: true },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4" />
        <Container className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Why Navigate NZ Exists
          </h1>
          <p className="mt-6 text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl">
            Because every student deserves to understand how the system works — especially when no one in your family has been through it before.
          </p>
        </Container>
      </section>

      {/* Story with pull quote */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Founder avatar */}
                <div className="flex-shrink-0 w-full md:w-52">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-teal to-teal-600 flex items-center justify-center border-4 border-white shadow-xl shadow-teal/20">
                    <span className="text-white text-5xl font-bold">UK</span>
                  </div>
                </div>

                {/* Story */}
                <div className="space-y-5 text-navy/70 leading-[1.8] text-[1.05rem]">
                  <h2 className="text-2xl font-bold text-navy">Our Story</h2>
                  <p>
                    Navigate NZ was founded by Uzair Khan, a student who moved to New Zealand as a child from a South Asian background.
                  </p>
                  <p>
                    Having switched between multiple schools, Uzair saw firsthand how dramatically different the resources and guidance available to students could be. Families without connections were left to figure out the system alone — navigating NCEA credits, university entrance requirements, and scholarship deadlines with no one to ask.
                  </p>

                  {/* Pull quote */}
                  <blockquote className="border-l-4 border-teal pl-6 py-4 my-8 bg-teal-50/50 rounded-r-2xl">
                    <p className="text-teal-800 text-xl font-medium italic leading-relaxed">
                      &ldquo;It felt like solving a puzzle without the picture on the box.&rdquo;
                    </p>
                  </blockquote>

                  <p>
                    The information was out there, scattered across government websites, school handbooks, and word-of-mouth from classmates whose parents already knew the system. But for families going through it for the first time — especially those from migrant backgrounds — putting it all together felt impossible.
                  </p>
                  <p>
                    Navigate NZ is the resource Uzair wished his family had. Free, in plain language, and built specifically for students and families who are navigating this for the first time.
                  </p>
                  <p>
                    What started as a personal frustration became a mission: to make sure no student in New Zealand is disadvantaged simply because their family doesn&apos;t know how the system works.
                  </p>
                  <p>
                    Today, Navigate NZ offers free guides, personalised pathway assessments, interactive tools, and action modules — all built to help first-generation students and their families find their way to university.
                  </p>
                </div>
              </div>

              {/* Meet the Founder card */}
              <div className="mt-12 p-6 sm:p-8 bg-soft rounded-2xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-teal flex items-center justify-center text-white text-xl font-bold flex-shrink-0">UK</div>
                  <div>
                    <h3 className="font-bold text-navy text-lg">Uzair Khan</h3>
                    <p className="text-teal text-sm font-medium">Founder, Navigate NZ</p>
                    <p className="text-navy/60 text-sm leading-relaxed mt-2">
                      Uzair is a student in Auckland who moved to New Zealand as a child. After switching between schools and experiencing the education system&apos;s gaps firsthand, he built Navigate NZ to help families like his own. He also runs a YouTube tutoring channel and develops gamified education platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24 bg-teal relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed opacity-90">
              To make the path to university in New Zealand clear, accessible, and achievable for every first-generation student and their family — regardless of where they come from or what language they speak at home.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Promise */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4 text-center">Our Promise</h2>
              <p className="text-navy/60 text-center mb-12 max-w-lg mx-auto">Three commitments we&apos;ll never break</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card accent hover={false} className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-4">
                    <span className="text-xl">🆓</span>
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-2">Always free</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">Navigate NZ will never charge students or families. Education guidance shouldn&apos;t have a price tag.</p>
                </Card>
                <Card accent hover={false} className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-gold-50 flex items-center justify-center mb-4">
                    <span className="text-xl">🛡️</span>
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-2">Always independent</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">We don&apos;t accept money from universities, tutoring companies, or admissions consultants. Our advice is unbiased.</p>
                </Card>
                <Card accent hover={false} className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-coral-50 flex items-center justify-center mb-4">
                    <span className="text-xl">💬</span>
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-2">Always honest</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">We tell you what you need to hear, not what sounds good. No false promises, no hype.</p>
                </Card>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Community image */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              {/* TODO(images): verify this photo renders; swap if broken. Must not match any guide image. */}
              <div className="overflow-hidden rounded-2xl shadow-lg shadow-gray-200/50">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"
                  alt="Diverse group of New Zealand students from Māori, Pasifika, Asian, and European backgrounds sharing a moment together"
                  width={1200}
                  height={500}
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                />
              </div>
              <p className="text-center text-navy/40 text-sm mt-4">
                Navigate NZ is built for students and families from every background
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-soft relative">
        <div className="bg-dot-pattern" />
        <Container className="relative">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3 text-center">
                Our Journey
              </h2>
              <p className="text-navy/60 text-center mb-12">
                Track our progress on the{" "}
                <Link href="/impact" className="text-teal hover:underline font-medium">impact page</Link>.
              </p>
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-teal/20" aria-hidden="true" />
                <div className="space-y-8">
                  {milestones.map((m) => (
                    <div key={`${m.year}-${m.title}`} className="relative flex gap-5 sm:gap-6">
                      <div className={`relative z-10 flex-shrink-0 mt-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center ${
                        m.dashed
                          ? "bg-white text-teal border-2 border-dashed border-teal/40"
                          : "bg-teal text-white shadow-sm shadow-teal/20"
                      }`}>
                        <span className="w-2 h-2 rounded-full bg-current" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-teal uppercase tracking-wider mb-1">{m.year}</p>
                        <h3 className="font-semibold text-navy text-lg">{m.title}</h3>
                        <p className="text-navy/60 text-sm mt-1 leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* How You Can Help */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4 text-center">
                How You Can Help
              </h2>
              <p className="text-navy/60 text-center mb-12 max-w-lg mx-auto">
                Navigate NZ is a community effort. Here are a few ways you can make a difference.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card accent className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-50 mb-5">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#E9C46A" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-2 text-lg">Translate</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">
                    Volunteer to translate our guides into your language so more families can access them.
                  </p>
                </Card>
                <Card accent className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 mb-5">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-2 text-lg">Share</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">
                    Tell schools, community groups, and families about Navigate NZ. Word of mouth matters.
                  </p>
                </Card>
                <Card accent className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-coral-50 mb-5">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#E85D4A" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-2 text-lg">Volunteer</h3>
                  <p className="text-navy/60 text-sm leading-relaxed mb-4">
                    Writers, designers, translators, ambassadors — see our open roles.
                  </p>
                  <Link href="/volunteer" className="text-teal text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                    See open roles <span aria-hidden="true">&rarr;</span>
                  </Link>
                </Card>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 sm:py-28 bg-soft relative">
        <div className="bg-dot-pattern" />
        <Container className="relative">
          <ScrollReveal>
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2 text-center">
                Get in Touch
              </h2>
              <p className="text-navy/60 text-center mb-10">
                Have a question, want to help, or just want to say kia ora? We&apos;d love to hear from you.
              </p>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">Name</label>
                  <input type="text" id="name" name="name" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email</label>
                  <input type="email" id="email" name="email" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">Message</label>
                  <textarea id="message" name="message" rows={5} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors resize-none" placeholder="How can we help?" />
                </div>
                <button type="submit" className="w-full rounded-xl bg-teal text-white font-semibold py-3.5 text-sm hover:bg-teal-600 shadow-sm hover:shadow-lg hover:shadow-teal/20 transition-all hover:scale-[1.01] active:scale-[0.99]">
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
