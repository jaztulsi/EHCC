"use client";
// The floor manager: places things as they come into shot, pauses what's off-camera,
// runs the counters, flips the cards, and minds the easter eggs.
import { useEffect, useRef, useState } from "react";
import { FPS, FPS_SECONDARY, FRAME_MS, confetti, poses, prefersReducedMotion, startTicker } from "@/lib/motion";

const KONAMI = "ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a";

const ROCKET = `<svg viewBox="0 0 140 80" aria-hidden="true"><path class="rays" d="M30 40L2 28l10 12L2 52z" fill="#FFD23F" stroke="#101A16" stroke-width="3" stroke-linejoin="round"/><path d="M30 26h60c18 0 34 8 44 14-10 6-26 14-44 14H30z" fill="#F4EEDC" stroke="#101A16" stroke-width="4" stroke-linejoin="round"/><path d="M40 26L28 6h22l14 20M40 54L28 74h22l14-20" fill="#FF5A3C" stroke="#101A16" stroke-width="4" stroke-linejoin="round"/><circle cx="96" cy="40" r="8" fill="#BFF3DD" stroke="#101A16" stroke-width="4"/><path d="M62 30v20" stroke="#10B981" stroke-width="6"/></svg>`;

export default function Director() {
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("ready");
    const rm = prefersReducedMotion();
    const stops: (() => void)[] = [];
    let n = 0;
    const say = (text: string) => {
      clearTimeout(timer.current);
      setToast({ id: ++n, text });
      timer.current = setTimeout(() => setToast(null), 3600);
    };

    // Entrances: placed by hand once, the first time they come into shot.
    const enter = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), enter.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-enter]").forEach((el) => !el.closest(".hero") && enter.observe(el));

    // Off-camera sections stop animating.
    const off = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("off", !e.isIntersecting)), {
      rootMargin: "120px 0px",
    });
    document.querySelectorAll("main > section, main > .marquee, footer").forEach((el) => off.observe(el));

    // Counters tick up on eights.
    const count = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          count.unobserve(e.target);
          const el = e.target as HTMLElement;
          const to = Number(el.dataset.count);
          const pre = el.dataset.prefix ?? "";
          let k = 0;
          const stop = startTicker(() => {
            el.textContent = pre + Math.round((to * ++k) / 8);
            if (k >= 8) stop();
          }, FPS_SECONDARY);
          stops.push(stop);
        }),
      { threshold: 0.6 }
    );
    if (!rm)
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = (el.dataset.prefix ?? "") + "0";
        count.observe(el);
      });

    const flip = (el: Element) => el.setAttribute("aria-pressed", String(el.classList.toggle("open")));

    const onClick = (e: MouseEvent) => {
      const t = e.target as Element;
      const card = t.closest(".flip");
      if (card && !t.closest("a, button")) flip(card);
      if (t.closest(".nav-drop a")) t.closest("details")?.removeAttribute("open");
    };

    const launch = () => {
      say("Shipped. Nice.");
      if (rm) return;
      const r = document.createElement("div");
      r.className = "rocket";
      r.innerHTML = ROCKET;
      document.body.appendChild(r);
      const w = innerWidth, h = innerHeight, frames = 18;
      const kf: Keyframe[] = [];
      for (let k = 0; k <= frames; k++) {
        const t = k / frames;
        kf.push({ transform: `translate(${-160 + t * (w + 320)}px, ${h - t * (h + 240) + Math.sin(t * 9) * 14}px) rotate(-28deg)` });
      }
      r.animate(poses(kf), { duration: frames * FRAME_MS, fill: "forwards" }).onfinish = () => r.remove();
      confetti(60, h - 60, 36);
    };

    let keys: string[] = [];
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.classList?.contains("flip") && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        flip(t);
        return;
      }
      if (t.closest?.("input, textarea, select, [contenteditable]")) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys = [...keys, k].slice(-10);
      if (keys.join(" ") === KONAMI) {
        keys = [];
        say(html.classList.toggle("hacker") ? "Hacker Mode: on. Konami again to exit." : "Hacker Mode: off.");
      }
      if (k.length === 1) {
        typed = (typed + k).slice(-7);
        if (typed === "ship it") {
          typed = "";
          launch();
        }
      }
    };

    addEventListener("click", onClick);
    addEventListener("keydown", onKey);
    return () => {
      enter.disconnect();
      off.disconnect();
      count.disconnect();
      stops.forEach((s) => s());
      removeEventListener("click", onClick);
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
