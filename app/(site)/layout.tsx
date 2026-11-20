import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CLUB } from "@/content/site";
import { bootScript, fontVars } from "@/app/fonts";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Sfx } from "@/components/site/Toggles";
import "@/styles/base.css";
import "@/styles/tokens.css";
import "@/styles/site.css";
import "@/styles/home.css";

export const metadata: Metadata = {
  metadataBase: new URL(CLUB.url),
  title: `${CLUB.shortName} · ${CLUB.name}`,
  description: CLUB.description,
  icons: { icon: "/logo-mark.png" },
  openGraph: {
    title: `${CLUB.shortName} · ${CLUB.tagline}`,
    description: CLUB.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#12110f" },
  ],
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
        <Sfx />
      </body>
    </html>
  );
}
