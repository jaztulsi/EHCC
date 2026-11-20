import type { Config } from "tailwindcss";

/**
 * EHIC design system for the courses and games pages, Tailwind side. The values live in
 * styles/tokens.css (the homepage's paper, ink and emerald) as CSS variables.
 *
 * Legacy names (navy, silver, muted, bark, emerald-*) are kept as aliases of the new roles
 * so the courses and games pages pick up the system without a rename.
 */
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // roles
        bg: v("bg"),
        surface: v("surface"),
        raised: v("raised"),
        ink: { DEFAULT: v("text"), 2: v("text-2"), 3: v("text-3") },
        accent: { DEFAULT: v("accent"), hover: v("accent-hover"), on: v("on-accent") },
        positive: v("positive"),
        negative: v("negative"),
        mat: { DEFAULT: v("mat"), 2: v("mat-2"), text: v("mat-text"), muted: v("mat-text-2"), accent: v("mat-accent") },
        // homepage inks
        paper: "#f4eedc",
        card: "#fffdf5",
        sun: "#ffd23f",
        coral: "#ff5a3c",
        mint: "#bff3dd",
        blush: "#ffd2c6",
        kraft: "#c89a5e",

        // legacy aliases
        canvas: { DEFAULT: v("bg"), warm: v("bg"), cool: v("bg") },
        navy: { 950: v("bg"), 900: v("surface"), 800: v("surface"), 700: v("raised") },
        bark: { DEFAULT: v("mat"), soft: v("mat-2"), line: "rgb(var(--c-mat-text) / 0.12)", ink: v("mat-text"), muted: v("mat-text-2") },
        silver: v("text"),
        muted: v("text-2"),
        faint: v("text-3"),
        line: "rgb(var(--c-text) / 0.1)",
        emerald: {
          DEFAULT: v("accent"),
          bright: v("accent-hover"),
          circuit: v("accent"),
          deep: v("accent-hover"),
          glow: v("accent"),
          light: v("accent"),
          pale: v("accent"),
        },
        clay: v("text-2"),
        lagoon: v("text-2"),
        iris: v("text-2"),
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: { display: "-0.035em", title: "-0.02em" },
      borderRadius: { card: "12px", panel: "16px", hero: "16px" },
      boxShadow: {
        glow: "var(--shadow-sm)",
        "glow-md": "var(--shadow-md)",
        "glow-lg": "var(--shadow-object)",
        hard: "var(--shadow-sm)",
        "hard-md": "var(--shadow-md)",
        "hard-lg": "var(--shadow-object)",
        "glow-text": "none",
        rim: "none",
        "rim-dark": "none",
      },
      transitionTimingFunction: { apple: "cubic-bezier(0.22, 1, 0.36, 1)", "apple-out": "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "none" } },
      },
      animation: { "fade-up": "fade-up 0.42s cubic-bezier(0.22,1,0.36,1) both" },
    },
  },
  plugins: [],
};

export default config;
