import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CLUB } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = "https://ehcc.club";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${CLUB.shortName} — ${CLUB.name}`,
    template: `%s · ${CLUB.shortName}`,
  },
  description: `${CLUB.description} Think. Build. Elevate. Hackathons, workshops, projects, and a community of student builders at ${CLUB.school}.`,
  keywords: ["EHCC", "Emerald High School", "hacking club", "coding club", "hackathon", "Dublin CA", "student developers"],
  authors: [{ name: CLUB.name }],
  openGraph: {
    title: `${CLUB.shortName} — ${CLUB.name}`,
    description: CLUB.description,
    url: siteUrl,
    siteName: CLUB.shortName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLUB.shortName} — ${CLUB.name}`,
    description: CLUB.description,
  },
  icons: {
    icon: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <IntroLoader />
        <ScrollProgress />
        <Navbar />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
