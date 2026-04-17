import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  readTime: string;
}

export interface BlogPostWithContent extends BlogPost {
  contentHtml: string;
}

const blogDir = path.join(process.cwd(), "content/blog");

function readDir(): string[] {
  try {
    return fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

function parse(filename: string): BlogPost {
  const filePath = path.join(blogDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    slug: filename.replace(/\.md$/, ""),
    title: data.title,
    date: data.date,
    author: data.author,
    category: data.category,
    excerpt: data.excerpt,
    readTime: data.readTime,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return readDir()
    .map(parse)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getBlogPost(slug: string): Promise<BlogPostWithContent | null> {
  const files = readDir();
  const match = files.find((f) => f.replace(/\.md$/, "") === slug);
  if (!match) return null;
  const filePath = path.join(blogDir, match);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author,
    category: data.category,
    excerpt: data.excerpt,
    readTime: data.readTime,
    contentHtml: processed.toString(),
  };
}
