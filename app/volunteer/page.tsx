import Link from "next/link";
import Container from "@/components/Container";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";

const roles = [
  { title: "Operations Coordinator", description: "Keep the team moving — meetings, timelines, volunteer onboarding." },
  { title: "School Outreach", description: "Build relationships with NZ schools and careers advisors." },
  { title: "Community Partnerships", description: "Connect Navigate NZ with youth orgs, libraries, and community groups." },
  { title: "Content Writer", description: "Write and edit guides in plain, accurate, Year-9-readable English." },
  { title: "Social Media Lead", description: "Run Instagram and plan short-form content for students and parents." },
  { title: "Graphic Designer", description: "Illustrations, infographics, and social cards that feel warm, not corporate." },
  { title: "Video Producer", description: "Short explainers on NCEA, UE, scholarships — under 90 seconds each." },
  { title: "Translator", description: "Translate guides into te reo Māori, Samoan, Tongan, Hindi, or Mandarin." },
  { title: "Student Ambassador", description: "Share Navigate NZ with your school and feed back what families actually need." },
  { title: "Research Analyst", description: "Dig into NZ qualification changes, policy shifts, and emerging pathways." },
];

const perks = [
  {
    title: "Real experience for uni applications",
    description: "Concrete project work you can point to in personal statements, scholarship forms, and interviews.",
  },
  {
    title: "A portfolio of measurable impact",
    description: "Your contributions ship. You'll leave with published work, traffic numbers, and outcomes you helped create.",
  },
  {
    title: "A reference letter",
    description: "After three months of consistent contribution, we write you a detailed reference — not a generic template.",
  },
  {
    title: "A community",
    description: "You're joining a team of students who've been where the families we help are. No corporate hierarchy.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-soft via-white to-teal-50/30 py-20 sm:py-28 overflow-hidden">
        <div className="bg-dot-pattern" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl translate-x-1/3" aria-hidden="true" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-sm text-navy/50 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-navy/70">Join the Team</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal text-xs font-semibold tracking-wide uppercase">
              We&apos;re hiring volunteers
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight">
              Help us build the guide every first-gen family deserves.
            </h1>
            <p className="mt-6 text-navy/60 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Navigate NZ is a student-led nonprofit project. We&apos;re looking for volunteers who remember what it felt like to figure this out alone — and want to make sure no one else has to.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="https://forms.gle/SpqAGcf2p4tCbGa19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 bg-teal text-white hover:bg-teal-600 active:scale-[0.98] px-7 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                Apply Now
                <span className="ml-2" aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="#roles"
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 border border-gray-200 text-navy hover:border-teal hover:text-teal px-7 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                See open roles
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">Why this matters</h2>
              <p className="text-navy/70 text-lg leading-relaxed">
                Every year, thousands of first-generation New Zealand students fall through gaps that would be trivial for someone whose parents know the system. Navigate NZ exists to close those gaps — with free guides, tools, and pathways written by people who&apos;ve been there. We&apos;re building a public resource, not a startup.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Roles */}
      <section id="roles" className="py-16 sm:py-20 bg-soft scroll-mt-20">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Open roles</h2>
              <p className="text-navy/60 leading-relaxed">
                Most roles are 1–8 hours a week, fully remote, flexible around school or uni. Pick what fits your strengths.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {roles.map((role) => (
              <Card key={role.title} className="p-6">
                <h3 className="font-semibold text-navy text-lg mb-1.5">{role.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{role.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Perks */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">What you get back</h2>
              <p className="text-navy/60 leading-relaxed">
                We can&apos;t pay volunteers — we&apos;re a nonprofit with no revenue. Here&apos;s what we can offer instead.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {perks.map((perk, i) => (
              <div key={perk.title} className="rounded-2xl bg-soft p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-lg mb-1.5">{perk.title}</h3>
                    <p className="text-navy/60 text-sm leading-relaxed">{perk.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-teal text-white text-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to get involved?</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Fill in the application form and tell us a bit about yourself. We read every one.
            </p>
            <a
              href="https://forms.gle/SpqAGcf2p4tCbGa19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 bg-white text-navy hover:bg-soft active:scale-[0.98] px-7 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal"
            >
              Apply Now
              <span className="ml-2" aria-hidden="true">&rarr;</span>
            </a>
            <p className="mt-6 text-white/60 text-sm">
              Join students already making a difference.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
