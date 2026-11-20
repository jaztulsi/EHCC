"use client";
// Small always-on pieces: paper-hand cursor, scroll-driven film strip, the nav's walking emerald,
// and the pause-motion switch (WCAG 2.2.2).
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const el = ref.current!;
    const html = document.documentElement;
    html.classList.add("has-cursor");
    const pose = (p: string) => el.dataset.pose !== p && (el.dataset.pose = p);
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.style.transform = `translate(${e.clientX - 13}px, ${e.clientY - 2}px)`; // 1:1, no lag
      pose((e.target as Element).closest?.("input, select, textarea") ? "hide" : e.buttons ? "pinch" : "open");
    };
    const down = () => el.dataset.pose !== "hide" && pose("pinch"); // respond on press, not release
    const up = () => el.dataset.pose === "pinch" && pose("open");
    const leave = () => pose("hide");
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      html.classList.remove("has-cursor");
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className="cursor" data-pose="hide" aria-hidden>
      <svg viewBox="0 0 40 40" width="40" height="40" className="boil">
        <g className="open">
          <path d="M13 2c2 0 4 2 4 4v12c1-1 4-1 5 1 1-1 4-1 5 1 2-1 5 0 5 2v8c0 6-4 10-10 10h-4c-4 0-6-2-8-5l-6-9c-1-2 1-5 4-3l3 3V6c0-2 2-4 4-4z" fill="#F4EEDC" stroke="#101A16" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M17 18v6M22 19v5M27 21v5" stroke="#101A16" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <g className="pinch" transform="rotate(-14 20 30) translate(0 2)">
          <path d="M13 6c2 0 4 2 4 4v8c1-1 4-1 5 1 1-1 4-1 5 1 2-1 5 0 5 2v8c0 6-4 10-10 10h-4c-4 0-6-2-8-5l-6-9c-1-2 1-5 4-3l3 3v-6c0-2 2-4 4-4z" fill="#BFF3DD" stroke="#101A16" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M17 18v6M22 19v5M27 21v5" stroke="#101A16" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/** Calls fn on scroll/resize, at most once per animation frame. */
function useScroll(fn: () => void) {
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fn);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, [fn]);
}

const stripStep = () =>
  document.querySelector<HTMLElement>(".strip")?.style.setProperty("--y", `${-Math.floor(scrollY / 18) * 9}px`);

export function FilmStrip() {
  useScroll(stripStep);
  return <div className="strip" aria-hidden />;
}

const walkStep = () => {
  const walk = document.querySelector<HTMLElement>(".walk");
  const walker = walk?.querySelector<HTMLElement>(".walker");
  if (!walk || !walker) return;
  const max = document.documentElement.scrollHeight - innerHeight;
  const w = walk.clientWidth;
  const x = Math.round(((max > 0 ? Math.min(1, scrollY / max) : 0) * w) / 6) * 6; // 6px strides
  walk.style.setProperty("--p", String(x / w));
  walk.style.setProperty("--x", `${x}px`);
  walker.dataset.step = String((x / 6) % 2);
};

export function ProgressWalker() {
  useScroll(walkStep);
  return (
    <div className="walk" aria-hidden>
      <div className="walk-line" />
      <div className="walker">
        <svg viewBox="0 0 26 30" width="26" height="30">
          <path d="M9 9L7 1M17 9l2-8" stroke="#101A16" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 7h14l5 6-12 11L1 13z" fill="#10B981" stroke="#101A16" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="10" cy="13" r="1.6" fill="#101A16" />
          <circle cx="16" cy="13" r="1.6" fill="#101A16" />
          <path className="leg-a" d="M10 22l-3 7M16 22l3 7" stroke="#101A16" strokeWidth="2" strokeLinecap="round" />
          <path className="leg-b" d="M10 22l2 7M16 22l-2 7" stroke="#101A16" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export function StillToggle() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("still", still);
  }, [still]);
  return (
    <button type="button" className="icon-btn" aria-pressed={still} onClick={() => setStill((s) => !s)}>
      <span className="sr-only">Pause animation</span>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        {still ? (
          <path d="M7 4l13 8-13 8z" fill="currentColor" />
        ) : (
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" />
        )}
      </svg>
    </button>
  );
}
