"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin emerald progress bar pinned to the very top of the viewport that
 * fills as the visitor scrolls the page — a subtle "you are here" cue that
 * ties the whole scroll journey together.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-emerald-deep via-emerald to-emerald-bright shadow-glow-text"
      aria-hidden
    />
  );
}
