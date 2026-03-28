import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ReadingProgress from "@/components/ReadingProgress";
import QualificationChangeNotice from "@/components/QualificationChangeNotice";
import GuideBanner from "@/components/GuideBanner";
import {
  guides,
  getGuideBySlug,
  getGuideContent,
  getNextGuide,
  getRelatedGuides,
} from "@/lib/guides";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

const categoryColors: Record<string, string> = {
  "Understanding the System": "bg-teal-50 text-teal-700",
  "Choosing Your Path": "bg-gold-50 text-gold-800",
  "Applying to University": "bg-coral-50 text-coral-700",
  "For Parents & Families": "bg-navy-50 text-navy-600",
};

const guideToModule: Record<string, { slug: string; title: string }> = {
  "understanding-nz-schools": { slug: "get-set-up-at-school", title: "Get Set Up at Your School" },
  "ncea-vs-cambridge-vs-ib": { slug: "choose-your-pathway", title: "Choose Your Pathway" },
  "how-to-get-into-university": { slug: "check-your-ue-progress", title: "Check Your UE Progress" },
  "your-rights-and-support": { slug: "get-set-up-at-school", title: "Get Set Up at Your School" },
  "scholarship-guide": { slug: "apply-for-funding", title: "Apply for Funding" },
  "subject-selection-strategy": { slug: "plan-your-subject-choices", title: "Plan Your Subject Choices" },
  "understanding-ncea-credits": { slug: "track-your-ncea-credits", title: "Track Your NCEA Credits" },
  "preparing-for-exams": { slug: "prepare-for-exam-season", title: "Prepare for Exam Season" },
  "university-open-days": { slug: "attend-a-university-open-day", title: "Attend a University Open Day" },
  "studylink-complete-guide": { slug: "set-up-studylink", title: "Set Up StudyLink" },
};

const guideImages: Record<string, { src: string; alt: string }> = {
  "understanding-nz-schools": { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80", alt: "New Zealand school building" },
  "ncea-vs-cambridge-vs-ib": { src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80", alt: "Student studying with open books" },
  "how-to-get-into-university": { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80", alt: "University graduation ceremony" },
  "your-rights-and-support": { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80", alt: "Diverse students in a supportive classroom" },
  "scholarship-guide": { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80", alt: "Financial documents and scholarship papers" },
  "nz-qualification-changes": { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80", alt: "Students in a classroom" },
  "subject-selection-strategy": { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80", alt: "Student planning subjects" },
  "understanding-ncea-credits": { src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80", alt: "Student studying with books" },
  "what-to-do-if-behind": { src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80", alt: "Student working through challenges" },
  "preparing-for-exams": { src: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&q=80", alt: "Student preparing for exams" },
  "first-gen-experience": { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80", alt: "Diverse group of students" },
  "guide-for-parents": { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80", alt: "Family and students" },
  "studylink-complete-guide": { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80", alt: "Financial documents" },
  "university-open-days": { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80", alt: "University campus visit" },
};

export default async function GuidePage({ params }: Props) {
  const guideContent = await getGuideContent(params.slug);
  if (!guideContent) notFound();

  const guide = guideContent;
  const nextGuide = getNextGuide(params.slug);
  const relatedGuides = getRelatedGuides(params.slug, 3);
  const sameCategory = guides.filter((g) => g.category === guide.category);
  const heroImage = guideImages[params.slug];

  return (
    <>
      <ReadingProgress />

      {/* Hero banner with image */}
      <section className="relative h-[250px] sm:h-[300px] overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/70 to-navy/50" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />

        <Container className="relative h-full flex flex-col justify-end pb-8 sm:pb-10">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-white/40 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            <Link href="/guides" className="hover:text-white/70 transition-colors">Guides</Link>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            <span className="text-white/60 truncate">{guide.title}</span>
          </nav>

          <span className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-white/15 text-white/90 backdrop-blur-sm">
            {guide.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl">
            {guide.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-white/50">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.readTime}
          </div>
        </Container>
      </section>

      <GuideBanner />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0 order-2 lg:order-1">
              <div className="sidebar-sticky space-y-8">
                {guide.headings.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-3">In this guide</h3>
                    <nav className="space-y-0.5">
                      {guide.headings.map((h) => (
                        <a key={h.id} href={`#${h.id}`} className={`block text-sm py-1.5 transition-colors hover:text-teal ${h.level === 2 ? "text-navy/60 font-medium" : "text-navy/40 pl-3"}`}>
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-3">{guide.category}</h3>
                  <nav className="space-y-0.5">
                    {sameCategory.map((g) => (
                      <Link key={g.slug} href={`/guides/${g.slug}`} className={`block text-sm px-3 py-2 rounded-xl transition-all ${g.slug === guide.slug ? "bg-teal-50 text-teal font-semibold" : "text-navy/50 hover:text-navy hover:bg-gray-50"}`}>
                        {g.title}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-3">Other guides</h3>
                  <nav className="space-y-0.5">
                    {guides.filter((g) => g.category !== guide.category).map((g) => (
                      <Link key={g.slug} href={`/guides/${g.slug}`} className="block text-sm px-3 py-2 rounded-xl text-navy/40 hover:text-navy hover:bg-gray-50 transition-all">
                        {g.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-3xl order-1 lg:order-2">
              {/* Qualification change warnings for specific guides */}
              {params.slug === "ncea-vs-cambridge-vs-ib" && (
                <QualificationChangeNotice variant="prominent">
                  <p className="font-semibold">Major qualification changes ahead</p>
                  <p>The NZ Government confirmed in March 2026 that NCEA will be replaced:</p>
                  <ul className="list-disc pl-4 space-y-1 mt-2">
                    <li><strong>2028:</strong> NCEA Level 1 removed. Year 11 gets a new Foundational Award.</li>
                    <li><strong>2029:</strong> NZ Certificate of Education (NZCE) replaces NCEA Level 2.</li>
                    <li><strong>2030:</strong> NZ Advanced Certificate of Education (NZACE) replaces NCEA Level 3.</li>
                    <li>A-E grades replace Achieved/Merit/Excellence.</li>
                  </ul>
                  <p className="mt-2"><strong>If you&apos;re in Year 9-13 right now, current NCEA rules still apply to you.</strong> The guide below covers the current system.</p>
                </QualificationChangeNotice>
              )}
              {params.slug === "understanding-ncea-credits" && (
                <QualificationChangeNotice variant="inline">
                  <p>This guide covers NCEA credits as they work today. The credit-based system will be phased out 2028-2030. If you&apos;re currently in Year 10-13, this information applies to your studies.</p>
                </QualificationChangeNotice>
              )}
              {params.slug === "what-to-do-if-behind" && (
                <QualificationChangeNotice variant="inline" guideLink={false}>
                  <p>This guide is based on current NCEA requirements. If you&apos;re graduating before 2030, this information applies to you.</p>
                </QualificationChangeNotice>
              )}

              <article className="guide-content" dangerouslySetInnerHTML={{ __html: guide.contentHtml }} />

              <div className="mt-16 p-8 bg-soft rounded-2xl text-center">
                <p className="text-navy font-semibold mb-2">Was this helpful?</p>
                <p className="text-navy/60 text-sm mb-4">Let us know so we can improve our guides</p>
                <div className="flex items-center justify-center gap-3">
                  <button className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-white hover:border-teal hover:text-teal transition-all">Yes, thanks!</button>
                  <button className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-navy hover:bg-white hover:border-gray-300 transition-all">Not really</button>
                </div>
              </div>

              {/* Module CTA */}
              {guideToModule[params.slug] && (
                <div className="mt-8 p-5 bg-teal-50 rounded-xl border border-teal-100">
                  <p className="text-sm font-semibold text-navy mb-1">Ready to take action?</p>
                  <Link href={`/modules/${guideToModule[params.slug].slug}`} className="text-teal font-medium text-sm hover:text-teal-600 transition-colors flex items-center gap-1">
                    Start the module: {guideToModule[params.slug].title} <span>&rarr;</span>
                  </Link>
                </div>
              )}

              {nextGuide && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <p className="text-sm text-navy/40 mb-3">Next guide</p>
                  <Link href={`/guides/${nextGuide.slug}`} className="group flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-teal/30 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
                    <div>
                      <h3 className="font-semibold text-navy group-hover:text-teal transition-colors">{nextGuide.title}</h3>
                      <p className="text-sm text-navy/60 mt-1">{nextGuide.description}</p>
                    </div>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-navy/30 group-hover:text-teal group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              )}

              {relatedGuides.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-xl font-bold text-navy mb-6">Related guides</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {relatedGuides.map((rg) => (
                      <Link key={rg.slug} href={`/guides/${rg.slug}`} className="group">
                        <Card className="h-full p-5 overflow-hidden">
                          <div className="h-1 -mx-5 -mt-5 mb-4 bg-gradient-to-r from-teal to-teal-400" />
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 ${categoryColors[rg.category] || "bg-gray-100 text-gray-700"}`}>{rg.category}</span>
                          <h3 className="font-semibold text-navy text-sm group-hover:text-teal transition-colors">{rg.title}</h3>
                          <p className="text-navy/50 text-xs mt-1">{rg.readTime}</p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 text-center">
                <Button href="/guides" variant="outline" size="sm">Back to all guides</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
