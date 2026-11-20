import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { fontVars } from "@/app/fonts";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Sfx } from "@/components/site/Toggles";
import { PageTransition } from "@/components/layout/PageTransition";
import { CLUB } from "@/lib/data";
import "@/styles/base.css";
import "@/styles/tokens.css";
import "@/styles/site.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(CLUB.url),
  title: {
    default: `${CLUB.shortName}: ${CLUB.name}`,
    template: `%s · ${CLUB.shortName}`,
  },
  description: `${CLUB.description} Courses, practice games and a community of student builders at ${CLUB.school}.`,
  keywords: ["EHIC", "Emerald High School", "hacking club", "coding club", "hackathon", "Dublin CA", "student developers"],
  authors: [{ name: CLUB.name }],
  openGraph: {
    title: `${CLUB.shortName}: ${CLUB.name}`,
    description: CLUB.description,
    url: CLUB.url,
    siteName: CLUB.shortName,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${CLUB.shortName}: ${CLUB.name}`, description: CLUB.description },
  icons: { icon: "/logo-mark.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4eedc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // On the ehic-courses.* domain, render a standalone courses app (no main-site chrome).
  const host = headers().get("host") ?? "";
  const coursesOnly = /^(ehic|hic|ehcc)-courses/.test(host);

  return (
    <html lang="en" className={fontVars}>
      <body className="app flex min-h-screen flex-col">
        {!coursesOnly && <SiteNav />}
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        {!coursesOnly && <SiteFooter />}
        <Sfx />
      </body>
    </html>
  );
}
