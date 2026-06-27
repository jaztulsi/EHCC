"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Icon } from "./Icon";
import type { Stat } from "@/lib/types";

/** Animated count-up stat. Fires once when scrolled into view. */
export function StatCounter({ stat, duration = 1400 }: { stat: Stat; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion: jump straight to the final value, no count-up.
    if (reduceMotion) {
      setValue(stat.value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo for a satisfying ramp
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * stat.value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value, duration, reduceMotion]);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center rounded-xl border border-white/5 bg-navy-800/40 px-4 py-6 text-center transition-all duration-300 hover:border-emerald/30 hover:shadow-glow"
    >
      <span className="mb-3 inline-flex rounded-lg bg-emerald/10 p-2.5 text-emerald-bright transition-colors group-hover:bg-emerald/20">
        <Icon name={stat.icon} className="h-5 w-5" />
      </span>
      <span className="font-mono text-3xl font-bold text-white sm:text-4xl">
        {value}
        {stat.suffix && <span className="text-emerald">{stat.suffix}</span>}
      </span>
      <span className="mt-1 text-sm text-muted">{stat.label}</span>
    </div>
  );
}
