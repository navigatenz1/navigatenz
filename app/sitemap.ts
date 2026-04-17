import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";

const BASE_URL = "https://navigatenz.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = [
    "nz-qualification-changes", "understanding-nz-schools", "understanding-ncea-credits",
    "ncea-vs-cambridge-vs-ib", "subject-selection-strategy", "preparing-for-exams",
    "what-to-do-if-behind", "how-to-get-into-university", "scholarship-guide",
    "studylink-complete-guide", "university-open-days", "your-rights-and-support",
    "first-gen-experience", "guide-for-parents",
  ];

  const modules = [
    "get-set-up-at-school", "choose-your-pathway", "check-your-ue-progress",
    "research-your-university-options", "complete-your-application", "apply-for-funding",
    "plan-your-subject-choices", "track-your-ncea-credits", "prepare-for-exam-season",
    "attend-a-university-open-day", "set-up-studylink", "write-your-personal-statement",
  ];

  const tools = [
    "cost-calculator", "career-pathways", "credit-calculator", "university-matcher",
    "living-costs", "pathway-finder", "scholarship-finder", "key-dates", "personal-statement",
  ];

  let blogSlugs: string[] = [];
  try {
    blogSlugs = getAllBlogPosts().map((p) => p.slug);
  } catch {
    blogSlugs = [];
  }

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/modules`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/assessment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/impact`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/volunteer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/accessibility`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/share-your-story`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/ask`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...guides.map((slug) => ({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...tools.map((slug) => ({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...modules.map((slug) => ({
      url: `${BASE_URL}/modules/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
