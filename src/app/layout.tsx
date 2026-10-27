import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/noto-naskh-arabic";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "AI Skills Academy — Learn AI by Actually Using It", template: "%s | AI Skills Academy" },
  description: "Practical AI education for work, learning, creativity, and business — built for learners in Pakistan and beyond.",
  openGraph: { title: "AI Skills Academy", description: "Learn AI by actually using it.", type: "website", locale: "en_PK" },
  twitter: { card: "summary_large_image", title: "AI Skills Academy", description: "Learn AI by actually using it." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org", "@type": "Organization", name: "AI Skills Academy",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    description: "Practical AI education for learners in Pakistan and beyond.",
  };
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
