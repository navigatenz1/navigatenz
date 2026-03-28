import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import ScrollToTop from "@/components/ScrollToTop";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Navigate NZ — Free Education Guidance for First-Gen Students & Families",
    template: "%s | Navigate NZ",
  },
  description:
    "Free guides, personalised pathways, and step-by-step support for first-generation students and families navigating New Zealand's education system.",
  keywords: [
    "New Zealand university",
    "first generation students",
    "NCEA",
    "university entrance",
    "NZ education",
    "scholarships NZ",
    "free education guide",
  ],
  metadataBase: new URL("https://navigatenz.org"),
  openGraph: {
    title: "Navigate NZ — Free Education Guidance for First-Gen Students & Families",
    description:
      "Free guides, personalised pathways, and step-by-step support for first-generation students and families navigating New Zealand's education system.",
    type: "website",
    locale: "en_NZ",
    siteName: "Navigate NZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navigate NZ — Free Education Guidance",
    description: "Free guides for first-gen students navigating NZ's education system.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <AuthProvider>
          <ScrollToTop />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
