import Link from "next/link";
import Container from "@/components/Container";
import Card from "@/components/Card";
import { getAllBlogPosts } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  "News": "bg-teal-50 text-teal-700",
  "Policy Update": "bg-coral-50 text-coral-700",
  "Tips": "bg-gold-50 text-gold-800",
  "Announcement": "bg-navy-50 text-navy-600",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <section className="bg-gradient-to-br from-soft via-white to-teal-50/30 py-16 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-navy/50 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-navy/70">Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">Blog</h1>
          <p className="mt-4 text-navy/60 text-lg max-w-2xl leading-relaxed">
            Timely updates on NZ education — policy changes, new scholarships, and practical tips for first-gen families.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-navy/50 py-10">Posts coming soon.</p>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-2xl"
                >
                  <Card className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-3 text-xs text-navy/50 flex-wrap">
                      <span className={`font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-navy/60"}`}>
                        {post.category}
                      </span>
                      <time>{formatDate(post.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-navy group-hover:text-teal transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-navy/60 leading-relaxed">{post.excerpt}</p>
                    <p className="mt-3 text-navy/40 text-xs">By {post.author}</p>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
