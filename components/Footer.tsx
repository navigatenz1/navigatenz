"use client";

import Link from "next/link";
import Container from "./Container";
import { useI18n } from "@/lib/i18n";

const footerLinks = {
  Platform: [
    { href: "/guides", label: "Guides" },
    { href: "/modules", label: "Modules" },
    { href: "/tools", label: "Tools" },
    { href: "/ask", label: "Q&A" },
    { href: "/blog", label: "Blog" },
    { href: "/assessment", label: "Assessment" },
    { href: "/impact", label: "Impact" },
  ],
  Tools: [
    { href: "/tools/cost-calculator", label: "Cost Calculator" },
    { href: "/tools/career-pathways", label: "Career Pathways" },
    { href: "/tools/credit-calculator", label: "Credit Calculator" },
    { href: "/tools/university-matcher", label: "University Matcher" },
    { href: "/tools/scholarship-finder", label: "Scholarship Finder" },
    { href: "/tools/living-costs", label: "Hall vs Flatting" },
    { href: "/tools/pathway-finder", label: "Pathway Finder" },
  ],
  "Get Involved": [
    { href: "/volunteer", label: "Volunteer" },
    { href: "mailto:admin@navigatenz.org?subject=My%20Navigate%20NZ%20Story", label: "Share Your Story" },
    { href: "https://instagram.com/navigatenz_", label: "Instagram", external: true },
    { href: "mailto:admin@navigatenz.org", label: "Email Us" },
  ],
  About: [
    { href: "/about", label: "Our Story" },
    { href: "/impact", label: "Our Impact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/accessibility", label: "Accessibility" },
  ],
} as const;

type FooterLink = { href: string; label: string; external?: boolean };

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-navy text-white">
      <Container className="pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M6 34V6h7l14 18V6h7v28h-7L13 16v18H6z" fill="#2A9D8F" />
                <circle cx="8" cy="36" r="3" fill="#E85D4A" />
                <path d="M34 2l1.5 3.5L39 7l-3.5 1.5L34 12l-1.5-3.5L29 7l3.5-1.5z" fill="#E9C46A" />
              </svg>
              <span className="font-semibold text-xl tracking-tight">
                <span className="text-white">Navigate</span>
                <span className="text-teal-300">NZ</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Free guides and tools for first-generation students and families navigating the path to university in New Zealand.
            </p>

            {/* Newsletter signup */}
            <div className="pt-2">
              <p className="text-white/70 text-sm font-medium mb-2.5">Stay updated</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 min-w-0 rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {(links as readonly FooterLink[]).map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Nonprofit statement */}
        <div className="mt-14 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs text-center leading-relaxed max-w-2xl mx-auto">
            {t.footer.nonprofit}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
            <p className="text-white/40">
              &copy; {new Date().getFullYear()} Navigate NZ. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-white/30 flex items-center gap-1.5">
              {t.footer.tagline} 🇳🇿
              {/* Small fern icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c0 0-7-4-7-11 0-3 2-6 5-7 1-.3 2 0 2 0s1-.3 2 0c3 1 5 4 5 7 0 7-7 11-7 11z" />
              </svg>
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/navigatenz_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-teal-300 transition-colors"
              aria-label="Instagram"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="mailto:admin@navigatenz.org"
              className="text-white/40 hover:text-teal-300 transition-colors"
              aria-label="Email"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
