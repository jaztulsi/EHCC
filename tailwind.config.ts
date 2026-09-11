import type { Config } from "tailwindcss";

/**
 * EHIC design system.
 *
 * Built on three ideas borrowed from Apple's HIG:
 *   1. Layered surfaces, not a flat page. The canvas is a tinted sage, cards
 *      are white and sit above it, and deep forest bands anchor the page.
 *   2. One accent, sampled from the dragon mark, plus two supporting tones
 *      used only to code event types.
 *   3. Depth from soft, layered shadow and a light inner highlight rather
 *      than from heavy borders.
 *
 * Legacy token names (navy/silver/muted) are kept as aliases so the whole
 * app re-themes from this one file.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Surfaces -----------------------------------------------------
        canvas: {
          DEFAULT: "#eff4ef", // page, sage-tinted
          warm: "#f5f3ed", // alternating band, warmer
          cool: "#eaf1f0", // alternating band, cooler
        },
        // Legacy aliases: cards resolve to white so they lift off the canvas.
        navy: {
          950: "#eff4ef",
          900: "#ffffff",
          800: "#ffffff",
          700: "#e4ece6",
        },
        // Deep band used for the footer and feature sections.
        bark: {
          DEFAULT: "#12291d",
          soft: "#1a3a29",
          line: "#2a4b38",
          ink: "#e9f1eb",
          muted: "#9ab5a5",
        },

        // ---- Ink ----------------------------------------------------------
        silver: "#121a15", // primary ink
        muted: "#586a5f", // secondary ink
        line: "#dae3dc", // hairline

        // ---- Accent, sampled off the dragon mark --------------------------
        emerald: {
          DEFAULT: "#2b6a45",
          bright: "#1a422d",
          circuit: "#55a969",
          deep: "#183d2a",
          glow: "#55a969",
          light: "#55a969",
          pale: "#96d896",
        },
        // Supporting tones. Used to colour-code event types, nothing else.
        clay: "#a35f36",
        lagoon: "#276b6b",
        iris: "#514a86",
      },

      fontFamily: {
        // On Apple hardware this renders real SF Pro; Inter elsewhere.
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      // Apple's display type is set tight; body stays optically relaxed.
      letterSpacing: {
        display: "-0.026em",
        title: "-0.018em",
      },

      borderRadius: {
        card: "16px",
        panel: "22px",
        hero: "30px",
      },

      boxShadow: {
        // Legacy names, now real elevation with a light inner highlight.
        glow: "0 1px 2px rgba(18,41,29,0.05), 0 1px 1px rgba(18,41,29,0.04)",
        "glow-md":
          "0 8px 24px -10px rgba(18,41,29,0.20), 0 2px 6px -2px rgba(18,41,29,0.08)",
        "glow-lg":
          "0 26px 60px -22px rgba(18,41,29,0.30), 0 6px 16px -8px rgba(18,41,29,0.10)",
        "glow-text": "none",
        rim: "inset 0 1px 0 rgba(255,255,255,0.75)",
        "rim-dark": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },

      transitionTimingFunction: {
        // Apple's standard interface curve, and a softer overshoot.
        apple: "cubic-bezier(0.32, 0.72, 0, 1)",
        "apple-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-18px,0) scale(1.04)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee: "marquee-x 38s linear infinite",
        drift: "drift 16s ease-in-out infinite",
        sheen: "sheen 0.9s cubic-bezier(0.32,0.72,0,1)",
      },
    },
  },
  plugins: [],
};

export default config;
