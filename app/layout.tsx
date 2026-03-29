import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import { I18nProvider } from "@/lib/i18n";
import ScrollToTop from "@/components/ScrollToTop";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Navigate NZ — Free Education Guidance for NZ Students & Families",
    template: "%s | Navigate NZ",
  },
  description:
    "Free guides, tools, and personalised pathways helping first-generation students and families navigate New Zealand's education system. NCEA, university, scholarships.",
  keywords: [
    "New Zealand university",
    "first generation students",
    "NCEA",
    "university entrance",
    "NZ education",
    "scholarships NZ",
    "free education guide",
    "NCEA credits",
    "NZ school system",
  ],
  metadataBase: new URL("https://navigatenz.org"),
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg" }],
  },
  other: { "theme-color": "#1B2A4A" },
  openGraph: {
    title: "Navigate NZ — Free Education Guidance for NZ Students & Families",
    description:
      "Free guides, tools, and personalised pathways helping first-generation students and families navigate New Zealand's education system.",
    type: "website",
    locale: "en_NZ",
    siteName: "Navigate NZ",
    url: "https://navigatenz.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navigate NZ — Free Education Guidance",
    description: "Free guides, tools, and personalised pathways for first-gen students in NZ.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Navigate NZ",
  url: "https://navigatenz.org",
  logo: "https://navigatenz.org/icon.svg",
  description: "Free education guidance platform for first-generation students and families in New Zealand",
  founder: { "@type": "Person", name: "Uzair Khan" },
  foundingDate: "2026",
  areaServed: "New Zealand",
  sameAs: ["https://instagram.com/navigatenz_"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakarta.variable} font-sans antialiased overflow-x-hidden`}>
        <I18nProvider>
        <AuthProvider>
          <ScrollToTop />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
