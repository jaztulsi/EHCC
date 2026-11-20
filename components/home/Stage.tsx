"use client";
// Runs the homepage: brings sections in as they reach the screen, counts the figures up,
// and minds the easter eggs (the Konami code, and typing "ship it").
import { useEffect, useRef, useState } from "react";
import { FPS_STEP, confetti, poses, prefersReducedMotion } from "@/lib/motion";
import { play } from "@/lib/sound";

const KONAMI = "ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a";

// the club gem, carrying a parcel across the screen
const COURIER = `<svg viewBox="0 0 120 90" aria-hidden="true"><g fill="none" stroke="#1d1b17" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><rect x="58" y="8" width="54" height="44" rx="4" fill="#c89a5e"/><path d="M58 22h54M85 8v14"/><path d="M30 26l-4-14M44 26l4-14"/><path d="M22 24h30l11 14-26 26L9 38z" fill="#0c6a4c"/><path d="M52 34l8-6"/><path d="M28 62l-6 16M44 62l6 16"/></g><circle cx="31" cy="38" r="3" fill="#1d1b17"/><circle cx="43" cy="38" r="3" fill="#1d1b17"/></svg>`;

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Stage() {
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const html = document.documentElement;
    const rm = prefersReducedMotion();
    const rafs: number[] = [];
    let n = 0;
    const say = (text: string) => {
      clearTimeout(timer.current);
      setToast({ id: ++n, text });
      timer.current = setTimeout(() => setToast(null), 3200);
    };

    // Entrances: once, the first time each block reaches the screen.
    const enter = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), enter.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-enter]").forEach((el) => enter.observe(el));

    // Figures count up when they come into view.
    const count = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          count.unobserve(e.target);
          const el = e.target as HTMLElement;
          const to = Number(el.dataset.count);
          const pre = el.dataset.prefix ?? "";
          const t0 = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - t0) / 900);
            el.textContent = pre + Math.round(to * ease(t));
            if (t < 1) rafs.push(requestAnimationFrame(step));
          };
          rafs.push(requestAnimationFrame(step));
        }),
      { threshold: 0.6 }
    );
    if (!rm)
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = (el.dataset.prefix ?? "") + "0";
        count.observe(el);
      });

    const ship = () => {
      say("Shipped. Nice work");
      play("success");
      if (rm) return;
      const r = document.createElement("div");
      r.className = "courier";
      r.innerHTML = COURIER;
      document.body.appendChild(r);
      const w = innerWidth;
      const frames = 24;
      const kf: Keyframe[] = [];
      for (let k = 0; k <= frames; k++) {
        const t = k / frames;
        kf.push({ transform: `translate(${-140 + t * (w + 280)}px, ${k % 2 ? -6 : 0}px)` }); // a hop on every other frame
      }
      r.animate(poses(kf), { duration: (frames / FPS_STEP) * 1000, fill: "forwards" }).onfinish = () => r.remove();
      confetti(w / 2, innerHeight - 80, 36);
    };

    let keys: string[] = [];
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("input, textarea, select, [contenteditable]")) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys = [...keys, k].slice(-10);
      if (keys.join(" ") === KONAMI) {
        keys = [];
        const on = html.classList.toggle("hacker");
        play(on ? "on" : "off");
        say(on ? "Terminal mode on. Konami again to leave" : "Terminal mode off");
      }
      if (k.length === 1) {
        typed = (typed + k).slice(-7);
        if (typed === "ship it") {
          typed = "";
          ship();
        }
      }
    };

    addEventListener("keydown", onKey);
    return () => {
      enter.disconnect();
      count.disconnect();
      rafs.forEach(cancelAnimationFrame);
      removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div role="status" aria-live="polite">
      {toast && (
        <p className="toast" key={toast.id}>
          {toast.text}
        </p>
      )}
    </div>
  );
}
