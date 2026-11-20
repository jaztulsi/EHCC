"use client";
// The stop-motion engine. Change FPS and the whole site re-times:
// JS reads it here, CSS reads it as --fps (set on <html> in app/(site)/layout.tsx).
import { useEffect, useState } from "react";

export const FPS = 12; // "shooting on twos"
export const FPS_SECONDARY = 8; // background characters, confetti
export const FRAME = 1 / FPS; // seconds, for GSAP durations
export const FRAME_MS = 1000 / FPS;

/** GSAP ease that holds the start pose, then snaps. Pose-to-pose, no tweening. */
export const HOLD = "steps(1)";

/** Snap a time (s) onto the frame grid. */
export const quantize = (t: number, fps = FPS) => Math.floor(t * fps) / fps;

/** Deterministic jitter in [-1, 1] for frame f and seed s (same frame = same pose). */
export const jitter = (f: number, s = 0) => {
  const x = Math.sin(f * 12.9898 + s * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Calls fn once per frame tick (default 12fps) while running.
 * ponytail: one rAF per caller; share a single ticker if this ever shows up in a profile.
 */
export function startTicker(fn: (frame: number) => void, fps = FPS) {
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

/** Stepped confetti of paper cutouts from a point. Used by the gem, the join form, and friends. */
export function confetti(x: number, y: number, count = 28) {
  if (prefersReducedMotion()) return;
  const colors = ["#10B981", "#FFD23F", "#FF5A3C", "#BFF3DD", "#F4EEDC", "#0B6B4F"];
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
    const s = 8 + Math.random() * 10;
    el.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s * (0.6 + Math.random() * 0.8)}px;background:${colors[i % colors.length]};clip-path:${shapes[i % shapes.length]}`;
    const a = Math.random() * Math.PI * 2;
    const v = 140 + Math.random() * 260;
    const vx = Math.cos(a) * v;
    const vy = Math.sin(a) * v - 260;
    const spin = (Math.random() - 0.5) * 720;
    const n = 10;
    const kf: Keyframe[] = [];
    for (let k = 0; k <= n; k++) {
      const t = (k / n) * 1.25;
      kf.push({
        transform: `translate(${vx * t}px, ${vy * t + 520 * t * t}px) rotate(${spin * t}deg)`,
        opacity: k === n ? 0 : 1,
      });
    }
    el.animate(poses(kf), { duration: (n / FPS_SECONDARY) * 1000, fill: "forwards" }).onfinish = () => el.remove();
    frag.appendChild(el);
  }
  document.body.appendChild(frag);
}
