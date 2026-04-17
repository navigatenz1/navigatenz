import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: `${post.title} — Navigate NZ`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-soft via-white to-teal-50/30 py-12 sm:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-navy/50 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-teal transition-colors">Blog</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-navy/70 truncate">{post.title}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs text-navy/50 mb-4 flex-wrap">
              <span className="bg-teal-50 text-teal-700 font-semibold px-2.5 py-0.5 rounded-full">{post.category}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>By {post.author}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">{post.title}</h1>
          </div>
        </Container>
      </header>

      <section className="py-10 sm:py-14">
        <Container>
          <div
            className="guide-content max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="max-w-3xl mx-auto mt-12 pt-10 border-t border-gray-100 text-center">
            <p className="text-navy/60 text-sm mb-4">Found this useful?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/share-your-story" variant="primary" size="md">Share your story</Button>
              <Button href="/guides" variant="outline" size="md">Read the full guides</Button>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
