import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { CLUB } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = CLUB.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${CLUB.shortName}: ${CLUB.name}`,
    template: `%s · ${CLUB.shortName}`,
  },
  description: `${CLUB.description} Think. Build. Elevate. Hackathons, workshops, projects, and a community of student builders at ${CLUB.school}.`,
  keywords: ["EHIC", "Emerald High School", "hacking club", "coding club", "hackathon", "Dublin CA", "student developers"],
  authors: [{ name: CLUB.name }],
  openGraph: {
    title: `${CLUB.shortName}: ${CLUB.name}`,
    description: CLUB.description,
    url: siteUrl,
    siteName: CLUB.shortName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLUB.shortName}: ${CLUB.name}`,
    description: CLUB.description,
  },
  icons: {
    icon: "/logo-mark.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // On the ehic-courses.* domain, render a standalone courses app (no main-site chrome).
  const host = headers().get("host") ?? "";
  const coursesOnly = /^(ehic|hic|ehcc)-courses/.test(host);

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        {!coursesOnly && <Navbar />}
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        {!coursesOnly && <Footer />}
      </body>
    </html>
  );
}
