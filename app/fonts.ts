// One type system for every page: IBM Plex. Drawn for engineers, so it reads as a tool, not a template.
// Plex Sans does headlines and everything you read; Plex Mono does figures, code, meta and labels.
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

// --font-display is kept as an alias so older class names still resolve to Plex Sans.
export const fontVars = `${sans.variable} ${mono.variable}`;

// Runs before paint: applies a saved theme and marks reduced motion, so nothing flashes.
export const bootScript =
  "(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('ehic-theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('rm')})()";
