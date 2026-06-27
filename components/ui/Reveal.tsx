"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Direction the content slides in from. */
  from?: "up" | "down" | "left" | "right";
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

const offset = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
};

/** Scroll-triggered fade/slide-in wrapper used across every section. */
export function Reveal({ children, delay = 0, from = "up", className, as = "div" }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  // Reduced motion: keep a gentle opacity fade but drop all positional travel.
  const initial = reduceMotion ? { opacity: 0 } : { opacity: 0, ...offset[from] };

  return (
    <MotionTag
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: reduceMotion ? 0.2 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
