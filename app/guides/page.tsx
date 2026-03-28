"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";

const categories = [
  "All",
  "Understanding the System",
  "Choosing Your Path",
  "Applying to University",
] as const;

const guidesData = [
  { slug: "understanding-nz-schools", title: "Understanding NZ Schools", description: "How year levels, school types, zoning, and enrolment work", category: "Understanding the System", readTime: "8 min read", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80", imageAlt: "New Zealand school building" },
  { slug: "ncea-vs-cambridge-vs-ib", title: "NCEA vs Cambridge vs IB", description: "A plain-language comparison of NZ's three main qualification pathways", category: "Choosing Your Path", readTime: "10 min read", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80", imageAlt: "Student studying with open books" },
  { slug: "how-to-get-into-university", title: "How to Get Into a NZ University", description: "University Entrance, applications, key dates, and scholarships explained", category: "Applying to University", readTime: "12 min read", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80", imageAlt: "University graduation ceremony" },
  { slug: "your-rights-and-support", title: "Your Rights and Support", description: "ESOL support, financial help, and what schools must provide", category: "Understanding the System", readTime: "6 min read", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80", imageAlt: "Diverse students in a supportive classroom" },
  { slug: "scholarship-guide", title: "Scholarship Guide", description: "How to find and apply for scholarships in NZ", category: "Applying to University", readTime: "7 min read", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80", imageAlt: "Financial documents and scholarship papers" },
];

const categoryColors: Record<string, string> = {
  "Understanding the System": "bg-teal-50 text-teal-700",
  "Choosing Your Path": "bg-gold-50 text-gold-800",
  "Applying to University": "bg-coral-50 text-coral-700",
};

const categoryStripe: Record<string, string> = {
  "Understanding the System": "from-teal to-teal-400",
  "Choosing Your Path": "from-gold to-gold-400",
  "Applying to University": "from-coral to-coral-400",
};

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? guidesData : guidesData.filter((g) => g.category === activeCategory);

  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
        <Container className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Free Guides</h1>
          <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-xl">In-depth articles explaining how NZ&apos;s education system works. Read them anytime — no account needed.</p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? "bg-teal text-white shadow-sm shadow-teal/20" : "bg-gray-100 text-navy/60 hover:bg-gray-200 hover:text-navy"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((guide, i) => (
              <ScrollReveal key={guide.slug} className={i > 2 ? "animation-delay-200" : ""}>
                <Link href={`/guides/${guide.slug}`} className="group block h-full">
                  <Card className="h-full flex flex-col overflow-hidden p-0" accent={false}>
                    {/* Header image */}
                    <div className="overflow-hidden">
                      <Image
                        src={guide.image}
                        alt={guide.imageAlt}
                        width={400}
                        height={200}
                        className="w-full h-[160px] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
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
