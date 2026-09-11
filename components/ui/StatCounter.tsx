"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Icon } from "./Icon";
import type { Stat } from "@/lib/types";

/**
 * A single figure in the stats band. Counts up once when scrolled into view,
 * on an ease-out ramp so it lands rather than stops.
 */
export function StatCounter({ stat, duration = 1100 }: { stat: Stat; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(stat.value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value, duration, reduceMotion]);

  return (
    <div ref={ref} className="surface card-lift group h-full p-6">
      <span className="inline-flex rounded-card bg-emerald/[0.08] p-2.5 text-emerald transition-transform duration-500 ease-apple group-hover:scale-110">
        <Icon name={stat.icon} className="h-5 w-5" />
      </span>
      <p className="mt-4 text-[2.25rem] font-semibold leading-none tracking-display text-silver tabular-nums">
        {value}
        {stat.suffix && <span className="text-emerald">{stat.suffix}</span>}
      </p>
      <p className="mt-2 text-sm text-muted">{stat.label}</p>
    </div>
  );
}
