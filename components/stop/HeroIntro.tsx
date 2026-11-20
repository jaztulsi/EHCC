"use client";
// Opening shot: the lamp buzzes on, a paper hand places E-H-I-C one letter at a time, the sticker slaps down.
// Every pose is a gsap.set at a whole frame, so nothing tweens. Any input skips straight to the end.
import { useEffect } from "react";
import gsap from "gsap";
import { FRAME, prefersReducedMotion } from "@/lib/motion";

export default function HeroIntro() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;
    const enter = (sel: string) => hero.querySelectorAll(sel).forEach((el) => el.classList.add("in"));
    if (prefersReducedMotion()) {
      enter("[data-enter]");
      return;
    }

    let tl: gsap.core.Timeline | undefined;
    const skip = () => tl?.progress(1);
    const kinds = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

    document.fonts.ready.then(() => {
      const letters = Array.from(hero.querySelectorAll<HTMLElement>(".L"));
      const hand = hero.querySelector<HTMLElement>(".hand")!;
      const shade = hero.querySelector<HTMLElement>(".lamp-shade")!;
      const pinch = hand.querySelector(".h-pinch")!;
      const open = hand.querySelector(".h-open")!;
      const box = hero.getBoundingClientRect();
      const hw = hand.getBoundingClientRect().width;
      const hh = (hw * 220) / 120;

      gsap.ticker.lagSmoothing(0); // poses are discrete: after a stall, jump to the right frame instead of slowing down
      tl = gsap.timeline({ onComplete: () => enter("[data-enter]") });
      const at = (f: number, t: gsap.TweenTarget, v: gsap.TweenVars) => tl!.set(t, v, f * FRAME);

      // Lamp: hold dark, buzz twice, on.
      [[0, 0.92], [3, 0.55], [4, 0.92], [6, 0.25], [7, 0.8], [8, 0]].forEach(([f, o]) => at(f, shade, { opacity: o }));
      tl.call(() => enter(".hero-sub"), [], 8 * FRAME);

      letters.forEach((L, i) => {
        const r = L.getBoundingClientRect();
        const hx = r.left - box.left + r.width / 2 - hw / 2;
        const hy = r.top - box.top - hh * 0.9;
        const b = 10 + i * 5;
        at(b, pinch, { display: "inline" });
        at(b, open, { display: "none" });
        at(b, hand, { visibility: "visible", x: hx + 34, y: hy - 170, rotation: 9 });
        at(b, L, { visibility: "visible", x: 34, y: -170, rotation: -9 });
        at(b + 1, hand, { x: hx + 10, y: hy - 52, rotation: 3 });
        at(b + 1, L, { x: 10, y: -52, rotation: -3 });
        at(b + 2, hand, { x: hx, y: hy + 8, rotation: 0 });
        at(b + 2, L, { x: 0, y: 8, rotation: 0, scaleX: 1.1, scaleY: 0.88 }); // squash on contact
        at(b + 3, pinch, { display: "none" });
        at(b + 3, open, { display: "inline" });
        at(b + 3, hand, { y: hy - 14 });
        at(b + 3, L, { y: -5, scaleX: 0.95, scaleY: 1.07 }); // stretch
        at(b + 4, L, { y: 0, scaleX: 1, scaleY: 1 }); // settle
        at(b + 4, hand, { y: hy - 60, rotation: -5 });
      });
      const end = 10 + letters.length * 5;
      at(end, hand, { y: -hh - 40 });
      at(end + 1, hand, { visibility: "hidden" });
      tl.call(() => enter(".sticker"), [], end * FRAME);

      kinds.forEach((k) => addEventListener(k, skip, { once: true, passive: true }));
      if (scrollY > 80) skip(); // arrived via #anchor: no gate
    });

    return () => {
      tl?.kill();
      kinds.forEach((k) => removeEventListener(k, skip));
    };
  }, []);
  return null;
}
