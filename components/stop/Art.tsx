// Hand-drawn paper doodles. Server-safe: no hooks, just SVG.
// Motion comes from CSS classes in styles/stopmotion.css (idle-a/b, blink4, rays, glint).
const S = { stroke: "#101A16", strokeWidth: 5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const T = { fontFamily: "var(--font-mono), monospace", fontWeight: 700, fontSize: 14, textAnchor: "middle" as const, fill: "#101A16" };

export function StoryArt({ art }: { art: "bulb" | "branches" | "clock" | "trophy" }) {
  if (art === "bulb")
    return (
      <svg viewBox="0 0 200 150" aria-hidden>
        <path className="rays" {...S} fill="none" d="M100 8v14M50 26l10 10M150 26l-10 10M30 70h14M156 70h14" />
        <g className="idle-a">
          <path {...S} fill="#FFD23F" d="M100 34c-22 0-38 16-38 37 0 14 7 23 15 31 5 5 7 10 7 16h32c0-6 2-11 7-16 8-8 15-17 15-31 0-21-16-37-38-37z" />
          <rect {...S} x="84" y="118" width="32" height="18" rx="4" fill="#A9B4AE" />
          <g className="blink4">
            <ellipse cx="89" cy="72" rx="4.5" ry="7" fill="#101A16" />
            <ellipse cx="111" cy="72" rx="4.5" ry="7" fill="#101A16" />
          </g>
          <path {...S} strokeWidth={4} fill="none" d="M90 88q10 9 20 0" />
        </g>
      </svg>
    );
  if (art === "branches")
    return (
      <svg viewBox="0 0 200 150" aria-hidden>
        <path {...S} strokeWidth={7} fill="none" d="M100 146V92M100 92L46 50M100 92V40M100 92l54-42" />
        <g className="idle-a">
          <rect {...S} strokeWidth={4} x="12" y="24" width="66" height="30" rx="6" fill="#10B981" />
          <text {...T} x="45" y="44">HACK</text>
        </g>
        <g className="idle-b">
          <rect {...S} strokeWidth={4} x="67" y="10" width="66" height="30" rx="6" fill="#FFD23F" />
          <text {...T} x="100" y="30">DATA</text>
        </g>
        <g className="idle-a">
          <rect {...S} strokeWidth={4} x="122" y="24" width="66" height="30" rx="6" fill="#FF5A3C" />
          <text {...T} x="155" y="44">AI</text>
        </g>
      </svg>
    );
  if (art === "clock")
    return (
      <svg viewBox="0 0 200 150" aria-hidden>
        <g className="idle-b">
          <circle {...S} cx="58" cy="32" r="15" fill="#FF5A3C" />
          <circle {...S} cx="142" cy="32" r="15" fill="#FF5A3C" />
          <path {...S} strokeWidth={6} d="M72 130l-10 14M128 130l10 14" />
          <circle {...S} strokeWidth={6} cx="100" cy="80" r="52" fill="#F4EEDC" />
          <path {...S} strokeWidth={3} d="M100 34v8M100 118v8M54 80h8M138 80h8" />
          <path {...S} strokeWidth={6} d="M100 80V48M100 80l-24-13" />
          <circle cx="100" cy="80" r="6" fill="#101A16" />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 200 150" aria-hidden>
      <path className="rays" {...S} fill="none" d="M100 6v12M46 30l10 8M154 30l-10 8M28 74h12M160 74h12" />
      <g className="idle-a" transform="translate(52 22)">
        <Cup />
      </g>
      <text {...T} fontFamily="var(--font-display), sans-serif" fontSize={30} fontWeight={800} x="100" y="70">
        2
      </text>
    </svg>
  );
}

function Cup() {
  return (
    <>
      <path {...S} strokeWidth={4} fill="#FFD23F" d="M22 10h52v22c0 18-12 30-26 30S22 50 22 32z" />
      <path {...S} strokeWidth={4} fill="none" d="M22 18H8c0 14 6 22 16 24M74 18h14c0 14-6 22-16 24" />
      <path {...S} strokeWidth={4} fill="#FFD23F" d="M42 62h12v16H42z" />
      <path {...S} strokeWidth={4} fill="#C89A5E" d="M26 78h44l4 14H22z" />
      <rect {...S} strokeWidth={4} x="18" y="92" width="60" height="12" rx="2" fill="#0B6B4F" />
    </>
  );
}

export function Trophy({ kind }: { kind: "cup" | "star" | "medal" }) {
  return (
    <svg viewBox="0 0 96 110" aria-hidden>
      {kind === "cup" && (
        <>
          <Cup />
          <path className="glint" stroke="#fff" strokeWidth={4} strokeLinecap="round" d="M34 18v16" />
        </>
      )}
      {kind === "star" && (
        <>
          <path {...S} strokeWidth={4} fill="#10B981" d="M48 6l11 22 24 3-17 17 4 24-22-12-22 12 4-24L13 31l24-3z" />
          <path {...S} strokeWidth={4} fill="#C89A5E" d="M40 74h16v12H40z" />
          <rect {...S} strokeWidth={4} x="18" y="86" width="60" height="18" rx="2" fill="#0B6B4F" />
          <circle className="glint" cx="42" cy="30" r="3.5" fill="#fff" />
        </>
      )}
      {kind === "medal" && (
        <>
          <path {...S} strokeWidth={4} fill="#FF5A3C" d="M24 4h18l14 38H38z" />
          <path {...S} strokeWidth={4} fill="#0B6B4F" d="M72 4H54L40 42h18z" />
          <circle {...S} strokeWidth={4} cx="48" cy="70" r="30" fill="#FFD23F" />
          <circle cx="48" cy="70" r="19" fill="none" stroke="#101A16" strokeWidth={3} strokeDasharray="4 4" />
          <circle className="glint" cx="38" cy="58" r="3.5" fill="#fff" />
        </>
      )}
    </svg>
  );
}

const ICONS = [
  // workshops: laptop
  <g key="w">
    <rect {...S} strokeWidth={4} x="10" y="10" width="44" height="30" rx="3" fill="#F4EEDC" />
    <path {...S} strokeWidth={4} fill="#A9B4AE" d="M4 46h56l-5 8H9z" />
    <path {...S} strokeWidth={3.5} fill="none" d="M26 20l-6 5 6 5M38 20l6 5-6 5" />
  </g>,
  // hackathons: bolt
  <path key="h" {...S} strokeWidth={4} fill="#FFD23F" d="M38 4L12 36h16l-4 24 28-34H36z" />,
  // project teams: stacked blocks
  <g key="p">
    <rect {...S} strokeWidth={4} x="6" y="34" width="24" height="24" rx="3" fill="#10B981" />
    <rect {...S} strokeWidth={4} x="34" y="34" width="24" height="24" rx="3" fill="#FF5A3C" />
    <rect {...S} strokeWidth={4} x="20" y="8" width="24" height="24" rx="3" fill="#FFD23F" />
  </g>,
  // guest speakers: mic
  <g key="s">
    <rect {...S} strokeWidth={4} x="22" y="4" width="20" height="34" rx="10" fill="#FF5A3C" />
    <path {...S} strokeWidth={4} fill="none" d="M12 28c0 11 9 20 20 20s20-9 20-20M32 48v10M20 60h24" />
  </g>,
  // competitions: flag
  <g key="c">
    <path {...S} strokeWidth={4} d="M14 60V4" />
    <path {...S} strokeWidth={4} fill="#10B981" d="M14 6h36l-8 11 8 11H14" />
  </g>,
  // community: heart
  <path key="m" {...S} strokeWidth={4} fill="#FF5A3C" d="M32 56S6 40 6 22c0-9 7-16 15-16 5 0 9 3 11 7 2-4 6-7 11-7 8 0 15 7 15 16 0 18-26 34-26 34z" />,
];

export function Doodle({ i }: { i: number }) {
  return (
    <svg className="icon-doodle boil-slow" viewBox="0 0 64 64" aria-hidden>
      {ICONS[i % ICONS.length]}
    </svg>
  );
}

/** The paper hand that places the hero letters. Two poses, swapped by HeroIntro. */
export function Hand() {
  return (
    <svg className="hand" viewBox="0 0 120 220" aria-hidden>
      <path {...S} strokeWidth={4} fill="#0B6B4F" d="M34-10h52l-2 92H36z" />
      <path {...S} strokeWidth={4} fill="#F4EEDC" d="M34 80h52v16H34z" />
      <g className="h-pinch">
        <path {...S} strokeWidth={4} fill="#E8B98A" d="M38 96h44c4 18 4 34-2 50l-8 34c-2 10-6 18-12 24-6-6-10-14-12-24l-8-34c-6-16-6-32-2-50z" />
        <path {...S} strokeWidth={3} fill="none" d="M60 150v52M48 120q12 8 24 0" />
      </g>
      <g className="h-open" style={{ display: "none" }}>
        <path {...S} strokeWidth={4} fill="#E8B98A" d="M38 96h44c4 14 4 26 0 38l14 30c2 6-4 9-8 5l-12-18 2 44c0 6-8 6-8 0l-2-36-4 40c0 6-8 6-8 0v-40l-6 34c-1 6-8 5-8-1l4-38-12 20c-3 5-9 2-7-3l12-32c-4-12-4-26 0-40z" />
      </g>
    </svg>
  );
}
