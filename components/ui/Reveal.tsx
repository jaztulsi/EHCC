"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Direction the content travels in from. */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Scale up very slightly as it settles. Good for cards and media. */
  zoom?: boolean;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

const offset = {
  up: { y: 26, x: 0 },
  down: { y: -26, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance used across every section.
 *
 * The transition is a spring rather than a duration curve: it settles the way
 * Apple's interface animations do, with a little momentum and no bounce.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  zoom = false,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -8% 0px" });
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  // Reduced motion: fade only, no travel, no scale.
  const initial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...offset[from], ...(zoom ? { scale: 0.97 } : null) };

  const animate = inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {};

  return (
    <MotionTag
      ref={ref}
      initial={initial}
      animate={animate}
      transition={
        reduceMotion
          ? { duration: 0.2, delay: 0 }
          : { type: "spring", stiffness: 140, damping: 20, mass: 0.9, delay }
      }
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Reveals each child in sequence. Saves threading `delay` by hand at call
 * sites that map over a list.
 */
export function RevealGroup({
  children,
  step = 0.07,
  from = "up",
  zoom = false,
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
            <Reveal key={i} delay={i * step} from={from} zoom={zoom}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  );
}
