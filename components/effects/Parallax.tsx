"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps children in a layer that drifts vertically as it passes through the
 * viewport, creating depth between foreground and background elements.
 * `speed` is the fraction of the element's travel to offset by — positive
 * moves slower (recedes), negative moves faster (leads). Disabled entirely
 * for reduced-motion visitors.
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = 160 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
