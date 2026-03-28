import type { MetadataRoute } from "next";

const BASE_URL = "https://navigatenz.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = [
    "understanding-nz-schools",
    "ncea-vs-cambridge-vs-ib",
    "how-to-get-into-university",
    "your-rights-and-support",
    "scholarship-guide",
  ];

  const modules = [
    "get-set-up-at-school",
    "choose-your-pathway",
    "check-your-ue-progress",
    "research-your-university-options",
    "complete-your-application",
    "apply-for-funding",
  ];

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/modules`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/assessment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
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
