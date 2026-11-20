"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in seconds. Keep it to 0.05 steps. */
  delay?: number;
  /** Kept for old call sites; every entrance is the same short fade and rise now. */
  from?: "up" | "down" | "left" | "right" | "none";
  zoom?: boolean;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** One entrance for the whole site: fade and rise 8px, once, on the shared ease-out. */
export function Reveal({ children, delay = 0, from = "up", className, as = "div" }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const rise = reduce || from === "none" ? 0 : 8;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: rise }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduce ? 0.15 : 0.42, ease: EASE, delay: reduce ? 0 : delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/** Reveals each child in turn, 50ms apart, at most six. */
export function RevealGroup({
  children,
  step = 0.05,
  className,
}: {
  children: React.ReactNode;
  step?: number;
  from?: RevealProps["from"];
  zoom?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Reveal key={i} delay={Math.min(i, 5) * step}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  );
}
