import type { MetadataRoute } from "next";

const BASE_URL = "https://navigatenz.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = [
    "nz-qualification-changes",
    "understanding-nz-schools",
    "understanding-ncea-credits",
    "ncea-vs-cambridge-vs-ib",
    "subject-selection-strategy",
    "preparing-for-exams",
    "what-to-do-if-behind",
    "how-to-get-into-university",
    "scholarship-guide",
    "studylink-complete-guide",
    "university-open-days",
    "your-rights-and-support",
    "first-gen-experience",
    "guide-for-parents",
  ];

  const modules = [
    "get-set-up-at-school",
    "choose-your-pathway",
    "check-your-ue-progress",
    "research-your-university-options",
    "complete-your-application",
    "apply-for-funding",
    "plan-your-subject-choices",
    "track-your-ncea-credits",
    "prepare-for-exam-season",
    "attend-a-university-open-day",
    "set-up-studylink",
    "write-your-personal-statement",
  ];

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/modules`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assessment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/impact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/university-matcher`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...guides.map((slug) => ({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...modules.map((slug) => ({
      url: `${BASE_URL}/modules/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
