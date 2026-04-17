"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";
import QualificationChangeNotice from "@/components/QualificationChangeNotice";
import { useI18n } from "@/lib/i18n";

const categories = [
  "All",
  "Understanding the System",
  "Choosing Your Path",
  "Applying to University",
  "For Parents & Families",
] as const;

// Every guide has a unique Unsplash image. Keep this invariant when adding guides.
const guidesData = [
  { slug: "nz-qualification-changes", title: "NZ Qualification Changes: What You Need to Know", description: "NCEA is being replaced from 2028-2030. Here's what's changing.", category: "Understanding the System", readTime: "7 min read", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", imageAlt: "Students working through coursework in a bright NZ classroom", badge: "NEW" },
  { slug: "understanding-nz-schools", title: "Understanding NZ Schools", description: "How year levels, school types, zoning, and enrolment work", category: "Understanding the System", readTime: "8 min read", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80", imageAlt: "Exterior of a New Zealand secondary school building with students walking past" },
  { slug: "understanding-ncea-credits", title: "Understanding NCEA Credits", description: "Credits, endorsements, and UE requirements — the plain-English version", category: "Understanding the System", readTime: "10 min read", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80", imageAlt: "Notebook with a credit tally and a calculator — planning NCEA credits" },
  { slug: "ncea-vs-cambridge-vs-ib", title: "NCEA vs Cambridge vs IB", description: "A plain-language comparison of NZ's three main qualification pathways", category: "Choosing Your Path", readTime: "10 min read", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80", imageAlt: "Stacked textbooks representing three different qualification pathways" },
  { slug: "subject-selection-strategy", title: "Subject Selection Strategy", description: "How to choose your subjects wisely — and avoid common mistakes", category: "Choosing Your Path", readTime: "8 min read", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", imageAlt: "Year 10 student working through a subject option booklet with a pen" },
  { slug: "preparing-for-exams", title: "Preparing for Exams", description: "What actually works when preparing for NCEA or Cambridge exams", category: "Choosing Your Path", readTime: "9 min read", image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80", imageAlt: "Study desk set up with past papers, highlighters, and a cup of tea" },
  { slug: "what-to-do-if-behind", title: "What to Do If You're Behind", description: "Missed credits or low grades? Don't panic — here are your options", category: "Understanding the System", readTime: "7 min read", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80", imageAlt: "Student walking forward along a tree-lined path — there's always a way through" },
  { slug: "how-to-get-into-university", title: "How to Get Into a NZ University", description: "University Entrance, applications, key dates, and scholarships", category: "Applying to University", readTime: "12 min read", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80", imageAlt: "Student reading university admissions information at a desk" },
  { slug: "scholarship-guide", title: "Scholarship Guide", description: "How to find and apply for scholarships in NZ", category: "Applying to University", readTime: "7 min read", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", imageAlt: "Scholarship application letter resting on a wooden desk" },
  { slug: "studylink-complete-guide", title: "StudyLink Complete Guide", description: "Student loans, allowances, and how to apply — the full walkthrough", category: "Applying to University", readTime: "9 min read", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80", imageAlt: "Student completing a StudyLink application form on a laptop" },
  { slug: "university-open-days", title: "Making the Most of University Open Days", description: "How to make open days count — what to ask and what to look for", category: "Applying to University", readTime: "5 min read", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", imageAlt: "Students touring a university campus on an open day" },
  { slug: "your-rights-and-support", title: "Your Rights and Support", description: "ESOL support, financial help, and what schools must provide", category: "Understanding the System", readTime: "6 min read", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80", imageAlt: "Diverse students working with a supportive teacher in an NZ classroom" },
  { slug: "first-gen-experience", title: "The First-Gen Experience", description: "What it's like being first in your family — and why you belong", category: "For Parents & Families", readTime: "6 min read", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80", imageAlt: "Diverse group of first-generation students standing together outdoors" },
  { slug: "guide-for-parents", title: "A Guide for Parents and Families", description: "Everything parents need to know to support their child", category: "For Parents & Families", readTime: "8 min read", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", imageAlt: "A parent and their teenage child reviewing study materials together" },
];

const categoryColors: Record<string, string> = {
  "Understanding the System": "bg-teal-50 text-teal-700",
  "Choosing Your Path": "bg-gold-50 text-gold-800",
  "Applying to University": "bg-coral-50 text-coral-700",
  "For Parents & Families": "bg-navy-50 text-navy-600",
};

const categoryStripe: Record<string, string> = {
  "Understanding the System": "from-teal to-teal-400",
  "Choosing Your Path": "from-gold to-gold-400",
  "Applying to University": "from-coral to-coral-400",
};

export default function GuidesPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = guidesData.filter((g) => {
    const inCategory = activeCategory === "All" || g.category === activeCategory;
    if (!inCategory) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
  });

  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
        <Container className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{t.guidesPage.title}</h1>
          <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-xl">{t.guidesPage.subtitle}</p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <QualificationChangeNotice variant="inline">
            <p>NZ&apos;s qualification system is changing. The information in these guides applies to students currently in Years 10-13 (graduating by 2029). We&apos;ll update as details are confirmed.</p>
          </QualificationChangeNotice>

          <div className="relative mb-6">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides…"
              aria-label="Filter guides"
              className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${activeCategory === cat ? "bg-teal text-white shadow-sm shadow-teal/20" : "bg-gray-100 text-navy/60 hover:bg-gray-200 hover:text-navy"}`}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-2xl bg-white border border-gray-100 p-10 text-center text-navy/50">
              No guides match &quot;{query}&quot;. Try a different search term or clear the filter.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((guide, i) => (
              <ScrollReveal key={guide.slug} className={i > 2 ? "animation-delay-200" : ""}>
                <Link href={`/guides/${guide.slug}`} className="group block h-full">
                  <Card className="h-full flex flex-col overflow-hidden p-0" accent={false}>
                    {/* Header image */}
                    <div className="overflow-hidden relative">
                      <Image
                        src={guide.image}
                        alt={guide.imageAlt}
                        width={400}
                        height={200}
                        className="w-full h-[160px] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {(guide as typeof guide & { badge?: string }).badge && (
                        <span className="absolute top-3 right-3 bg-coral text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {(guide as typeof guide & { badge?: string }).badge}
                        </span>
                      )}
                    </div>
                    {/* Colored strip */}
                    <div className={`h-1 bg-gradient-to-r ${categoryStripe[guide.category] || "from-teal to-teal-400"}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <span className={`inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-3 ${categoryColors[guide.category] || "bg-gray-100 text-gray-700"}`}>
                        {guide.category}
                      </span>
                      <h2 className="text-lg font-semibold text-navy mb-2 group-hover:text-teal transition-colors">{guide.title}</h2>
                      <p className="text-navy/60 text-sm leading-relaxed flex-1">{guide.description}</p>
                      <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-xs text-navy/40 flex items-center gap-1.5">
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {guide.readTime}
                        </span>
                        <span className="text-teal text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-navy/40">
              <p className="text-lg">No guides in this category yet.</p>
              <p className="text-sm mt-1">More guides are coming soon!</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
