// Notebook sketches: one ink, a marker and a little colour, drawn on graph paper.
// They're the cartoon half of the site, so they live in the story panels and the trophy, nowhere else.
// Server-safe: plain SVG. Hovering a panel makes the drawing boil for a moment (styles/home.css).

const S = { stroke: "var(--ink)", strokeWidth: 3.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const T = { fontFamily: "var(--font-mono), monospace", fontWeight: 600, fontSize: 13, textAnchor: "middle" as const, fill: "var(--ink)" };

export function StoryArt({ art }: { art: "bulb" | "branches" | "clock" | "trophy" }) {
  if (art === "bulb")
    return (
      <svg viewBox="0 0 200 150" aria-hidden>
        <path className="rays" {...S} fill="none" d="M100 10v12M52 28l9 9M148 28l-9 9M34 72h12M154 72h12" />
        <path {...S} fill="var(--marker)" d="M100 36c-21 0-36 15-36 35 0 13 6 22 14 30 5 5 7 10 7 15h30c0-5 2-10 7-15 8-8 14-17 14-30 0-20-15-35-36-35z" />
        <path {...S} fill="var(--sketch)" d="M85 116h30v8a6 6 0 0 1-6 6H91a6 6 0 0 1-6-6z" />
        <path {...S} strokeWidth={2.5} fill="none" d="M86 122h28" />
        <circle cx="90" cy="72" r="4" fill="var(--ink)" />
        <circle cx="110" cy="72" r="4" fill="var(--ink)" />
        <path {...S} strokeWidth={3} fill="none" d="M91 86q9 8 18 0" />
      </svg>
    );
  if (art === "branches")
    return (
      <svg viewBox="0 0 200 150" aria-hidden>
        <path {...S} strokeWidth={5} fill="none" d="M100 144V94M100 94L48 54M100 94V44M100 94l52-40" />
        <circle cx="100" cy="94" r="6" fill="var(--ink)" />
        <rect {...S} strokeWidth={3} x="14" y="30" width="66" height="28" rx="6" fill="var(--mint)" />
        <text {...T} x="47" y="49">hack</text>
        <rect {...S} strokeWidth={3} x="67" y="14" width="66" height="28" rx="6" fill="var(--marker)" />
        <text {...T} x="100" y="33">data</text>
        <rect {...S} strokeWidth={3} x="120" y="30" width="66" height="28" rx="6" fill="var(--sketch)" />
        <text {...T} x="153" y="49">ai</text>
      </svg>
    );
  if (art === "clock")
    return (
      <svg viewBox="0 0 200 150" aria-hidden>
        <circle {...S} cx="60" cy="34" r="14" fill="var(--coral)" />
        <circle {...S} cx="140" cy="34" r="14" fill="var(--coral)" />
        <path {...S} strokeWidth={5} d="M74 128l-10 14M126 128l10 14" />
        <circle {...S} strokeWidth={4.5} cx="100" cy="80" r="50" fill="var(--sketch)" />
        <path {...S} strokeWidth={2.5} d="M100 36v8M100 116v8M56 80h8M136 80h8" />
        <path {...S} strokeWidth={4.5} d="M100 80V52M100 80l-22-12" />
        <circle cx="100" cy="80" r="5" fill="var(--ink)" />
      </svg>
    );
  return (
    <svg viewBox="0 0 200 150" aria-hidden>
      <path className="rays" {...S} fill="none" d="M100 8v12M48 30l9 8M152 30l-9 8M30 74h12M158 74h12" />
      <g transform="translate(52 22)">
        <CupShape />
      </g>
      <text {...T} fontFamily="var(--font-display), sans-serif" fontSize={26} fontWeight={600} x="100" y="68">
        2
      </text>
    </svg>
  );
}

function CupShape() {
  return (
    <>
      <path {...S} strokeWidth={3} fill="var(--marker)" d="M22 10h52v22c0 18-12 30-26 30S22 50 22 32z" />
      <path {...S} strokeWidth={3} fill="none" d="M22 18H8c0 14 6 22 16 24M74 18h14c0 14-6 22-16 24" />
      <path {...S} strokeWidth={3} fill="var(--marker)" d="M42 62h12v16H42z" />
      <path {...S} strokeWidth={3} fill="var(--kraft)" d="M26 78h44l4 14H22z" />
      <rect {...S} strokeWidth={3} x="18" y="92" width="60" height="12" rx="2" fill="var(--emerald)" />
    </>
  );
}

/** The one trophy on the shelf, next to the number it was for. */
export function Cup() {
  return (
    <svg className="cup" viewBox="0 0 96 110" aria-hidden>
      <CupShape />
      <path stroke="#fff" strokeWidth={3.5} strokeLinecap="round" d="M34 18v14" />
    </svg>
  );
}
