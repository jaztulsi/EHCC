// The courses and games pages use the homepage's type: Bricolage Grotesque for headlines,
// DM Sans for reading, JetBrains Mono for labels, code and scores.
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const fontVars = `${display.variable} ${body.variable} ${mono.variable}`;
