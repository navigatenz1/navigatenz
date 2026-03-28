import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
}

export interface GuideWithContent extends Guide {
  contentHtml: string;
  headings: { id: string; text: string; level: number }[];
}

export const categories = [
  "All",
  "Understanding the System",
  "Choosing Your Path",
  "Applying to University",
  "For Parents",
] as const;

const guidesDirectory = path.join(process.cwd(), "content/guides");

function getGuideFiles(): string[] {
  return fs
    .readdirSync(guidesDirectory)
    .filter((f) => f.endsWith(".md"));
}

export function getAllGuides(): Guide[] {
  const files = getGuideFiles();
  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(guidesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title,
      description: data.description,
      category: data.category,
      readTime: data.readTime,
    };
  });
}

// Static ordered list for navigation order
const guideOrder = [
  "understanding-nz-schools",
  "ncea-vs-cambridge-vs-ib",
  "how-to-get-into-university",
  "your-rights-and-support",
  "scholarship-guide",
];

export const guides: Guide[] = (() => {
  try {
    const all = getAllGuides();
    // Sort by predefined order
    return guideOrder
      .map((slug) => all.find((g) => g.slug === slug))
      .filter((g): g is Guide => g !== undefined);
  } catch {
    // Fallback for build environments where fs may not be available
    return guideOrder.map((slug) => ({
      slug,
      title: slug.replace(/-/g, " "),
      description: "",
      category: "",
      readTime: "",
    }));
  }
})();

function extractHeadings(
  markdownContent: string
): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const text = match[2].replace(/\*\*/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}

export async function getGuideContent(
  slug: string
): Promise<GuideWithContent | null> {
  const filePath = path.join(guidesDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const headings = extractHeadings(content);

  // Add IDs to headings in the HTML
  const processedContent = await remark().use(html).process(content);
  let contentHtml = processedContent.toString();

  // Add id attributes to h2 and h3 elements
  headings.forEach(({ id, text }) => {
    // Match h2/h3 with the text content (may contain bold tags)
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      `(<h[23]>)((?:<[^>]+>)*${escapedText}(?:<\\/[^>]+>)*)(</h[23]>)`,
      "i"
    );
    contentHtml = contentHtml.replace(
      regex,
      `$1<span id="${id}">$2</span>$3`
    );
  });

  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category,
    readTime: data.readTime,
    contentHtml,
    headings,
  };
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getNextGuide(currentSlug: string): Guide | undefined {
  const index = guides.findIndex((g) => g.slug === currentSlug);
  if (index === -1 || index === guides.length - 1) return undefined;
  return guides[index + 1];
}

export function getRelatedGuides(currentSlug: string, limit = 3): Guide[] {
  const current = getGuideBySlug(currentSlug);
  if (!current) return [];
  return guides
    .filter((g) => g.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category)
        return -1;
      if (b.category === current.category && a.category !== current.category)
        return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getGuidesByCategory(category: string): Guide[] {
  if (category === "All") return guides;
  return guides.filter((g) => g.category === category);
}
