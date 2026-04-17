"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import Container from "./Container";
import SearchModal from "./SearchModal";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();
  const { t } = useI18n();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/guides", label: t.nav.guides },
    { href: "/modules", label: t.nav.modules },
    { href: "/tools", label: t.nav.tools },
    { href: "/about", label: t.nav.about },
    { href: "/volunteer", label: t.nav.joinUs },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white shadow-sm border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-18">
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors rounded-md px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                    active ? "text-teal" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-1 right-1 h-0.5 bg-teal rounded-full" aria-hidden="true" />
                  )}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 rounded-lg text-navy/50 hover:text-navy hover:bg-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              <Search size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>

            <LanguageSwitcher />

            {loading ? (
              <div className="w-20 h-9 bg-gray-100 rounded-xl animate-pulse" />
            ) : user ? (
              /* Logged in: Dashboard button + avatar dropdown */
              <div className="flex items-center gap-3">
              <Button href="/dashboard" size="sm">{t.nav.dashboard}</Button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-navy max-w-[100px] truncate">
                    {displayName}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-navy/40 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg shadow-gray-200/60 border border-gray-100 py-1 z-50">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-navy/70 hover:bg-gray-50 hover:text-navy transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-navy/70 hover:bg-gray-50 hover:text-navy transition-colors"
                    >
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={async () => {
                        setDropdownOpen(false);
                        await signOut();
                      }}
                      className="block w-full text-left px-4 py-2.5 text-sm text-coral hover:bg-coral-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              </div>
            ) : (
              /* Logged out */
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-navy/70 hover:text-navy transition-colors"
                >
                  {t.nav.signIn}
                </Link>
                <Button href="/guides" size="sm">
                  {t.nav.freeGuides}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile search + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 text-navy/60 hover:text-navy rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <Search size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-navy"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4 space-y-3 bg-white rounded-b-2xl">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-base font-medium px-3 py-2.5 rounded-xl transition-colors ${
                    active
                      ? "text-teal bg-teal-50"
                      : "text-navy/70 hover:text-navy hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="px-3 pt-2 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-1 py-2">
                    <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                    <span className="text-sm font-medium text-navy">
                      {displayName}
                    </span>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium px-3 py-2.5 rounded-xl text-navy/70 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      setMobileOpen(false);
                      await signOut();
                    }}
                    className="block w-full text-left text-base font-medium px-3 py-2.5 rounded-xl text-coral hover:bg-coral-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium px-3 py-2.5 rounded-xl text-navy/70 hover:bg-gray-50 text-center"
                  >
                    Sign In
                  </Link>
                  <Button
                    href="/auth/signup"
                    size="sm"
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
