import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

const helpfulLinks = [
  { href: "/guides", title: "Guides", description: "Plain-language guides for every stage" },
  { href: "/tools", title: "Tools", description: "Calculators, finders, and planners" },
  { href: "/assessment", title: "Assessment", description: "Find your personalised pathway" },
  { href: "/about", title: "About", description: "Why Navigate NZ exists" },
];

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-soft relative py-20">
      <div className="bg-dot-pattern" />
      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Logo size="large" />
          </div>
          <p className="text-6xl font-bold text-teal mb-4">404</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
            This page doesn&apos;t exist
          </h1>
          <p className="text-navy/60 mb-10 text-lg leading-relaxed">
            But we can help you find what you&apos;re looking for.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl bg-white border border-gray-100 shadow-sm p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-teal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy">{link.title}</span>
                  <span className="text-teal opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">&rarr;</span>
                </div>
                <p className="text-sm text-navy/60 mt-1">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
