"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle circuit-board texture for section backgrounds.
 * A faint grid plus a few self-drawing emerald traces with pulsing nodes.
 */
export function CircuitBackground({
  className,
  animate = true,
  density = "normal",
}: {
  className?: string;
  animate?: boolean;
  density?: "normal" | "sparse";
}) {
  // A handful of trace paths drawn across the viewbox.
  const traces = [
    "M0 80 H120 V160 H260",
    "M400 0 V90 H300 V200",
    "M520 300 H360 V220",
    "M40 400 V300 H180 V360",
    "M600 120 H460 V40",
  ];
  const nodes = [
    [120, 80],
    [260, 160],
    [300, 90],
    [360, 220],
    [180, 300],
    [460, 120],
  ];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* Faint grid */}
      <div
        className={cn(
          "absolute inset-0 bg-circuit-grid",
          density === "sparse" ? "[background-size:64px_64px]" : "[background-size:40px_40px]"
        )}
      />
      {/* Radial fade so edges blend into the navy */}
      <div className="absolute inset-0 bg-radial-glow opacity-60" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {traces.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="#16a34a"
            strokeWidth={1.2}
            strokeLinecap="round"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            whileInView={animate ? { pathLength: 1, opacity: 0.7 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
        {nodes.map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={3}
            fill="#22c55e"
            initial={animate ? { opacity: 0 } : false}
            whileInView={animate ? { opacity: [0.3, 1, 0.3] } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 0.6 + i * 0.2, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );
}
