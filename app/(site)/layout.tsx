import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import { CLUB } from "@/content/site";
import "@/styles/stopmotion.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Must match FPS in lib/motion (that file is client-only, so the number is repeated here).
const FPS = 12;

export const metadata: Metadata = {
  metadataBase: new URL("https://ehcc.vercel.app"),
  title: `${CLUB.shortName} · ${CLUB.name}`,
  description: CLUB.description,
  icons: { icon: "/logo-mark.png" },
  openGraph: {
    title: `${CLUB.shortName} · ${CLUB.tagline}`,
    description: CLUB.description,
    images: ["/logo.png"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#062A20", width: "device-width", initialScale: 1 };

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      style={{ "--fps": FPS } as CSSProperties}
      suppressHydrationWarning
    >
      <head>
        {/* Tag the page before paint so entrances start hidden only when JS can reveal them. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
