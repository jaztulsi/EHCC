import type { Config } from "tailwindcss";

/**
 * EHCC design system — derived from the dragon badge logo.
 * Deep navy canvas + emerald green accents + silver text.
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
        // Backgrounds
        navy: {
          950: "#0a1628",
          900: "#0d1b2a",
          800: "#112240",
          700: "#1a2f4a",
        },
        // Emerald accent scale
        emerald: {
          DEFAULT: "#22c55e",
          glow: "#22c55e",
          bright: "#4ade80",
          circuit: "#16a34a",
          deep: "#1a7a3c",
        },
        silver: "#e2e8f0",
        muted: "#94a3b8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(34, 197, 94, 0.2)",
        "glow-md": "0 0 30px rgba(34, 197, 94, 0.35)",
        "glow-lg": "0 0 45px rgba(34, 197, 94, 0.45)",
        "glow-text": "0 0 12px rgba(74, 222, 128, 0.6)",
      },
      backgroundImage: {
        "circuit-grid":
          "linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.12), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "dash-draw": {
          to: { strokeDashoffset: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        shimmer: "shimmer 1.2s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
