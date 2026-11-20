"use client";
// Motion helpers. The interface moves smoothly on one ease-out curve (styles/tokens.css: --ease).
// The cartoon moments keep a stop-motion feel: the badge printer feeds and the confetti fall on
// whole frames at FPS_STEP, a nod to the club's first site, which ran entirely at 12 fps.

export const FPS_STEP = 12;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Calls fn once per frame tick while running; fn gets the frame number since start. */
export function startTicker(fn: (frame: number) => void, fps = 60) {
  let raf = 0;
  let last = -1;
  let live = true; // fn may stop the ticker from inside itself; don't reschedule after that
  const t0 = performance.now();
  const loop = (now: number) => {
    const f = Math.floor(((now - t0) / 1000) * fps);
    if (f !== last) {
      last = f;
      fn(f);
    }
    if (live) raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    live = false;
    cancelAnimationFrame(raf);
  };
}

/** Pose-to-pose keyframes for WAAPI: every pose holds until the next one snaps in. */
export const poses = (frames: Keyframe[]) => frames.map((k) => ({ ...k, easing: "steps(1, end)" }));

/** Paper-cut confetti from a point, falling on whole frames. Used when a badge prints and for "ship it". */
export function confetti(x: number, y: number, count = 28) {
  if (prefersReducedMotion()) return;
  const colors = ["#0c6a4c", "#f2c94c", "#e5603d", "#cdeedc", "#fbf8f1", "#c89a5e"];
  const shapes = [
    "polygon(0 0,100% 8%,92% 100%,6% 88%)",
    "polygon(50% 0,100% 100%,0 92%)",
    "polygon(10% 20%,90% 0,100% 70%,40% 100%,0 80%)",
    "circle(48%)",
  ];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const el = document.createElement("i");
    el.className = "confetti-bit";
    const s = 7 + Math.random() * 9;
    el.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s * (0.6 + Math.random() * 0.8)}px;background:${colors[i % colors.length]};clip-path:${shapes[i % shapes.length]}`;
    const a = Math.random() * Math.PI * 2;
    const v = 140 + Math.random() * 240;
    const vx = Math.cos(a) * v;
    const vy = Math.sin(a) * v - 240;
    const spin = (Math.random() - 0.5) * 720;
    const n = 12;
    const kf: Keyframe[] = [];
    for (let k = 0; k <= n; k++) {
      const t = (k / n) * 1.2;
      kf.push({
        transform: `translate(${vx * t}px, ${vy * t + 520 * t * t}px) rotate(${spin * t}deg)`,
        opacity: k === n ? 0 : 1,
      });
    }
    el.animate(poses(kf), { duration: (n / FPS_STEP) * 1000, fill: "forwards" }).onfinish = () => el.remove();
    frag.appendChild(el);
  }
  document.body.appendChild(frag);
}
