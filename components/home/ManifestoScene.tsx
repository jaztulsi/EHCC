"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";
import { CircuitBackground } from "@/components/effects/CircuitBackground";

interface ActData {
  index: string;
  word: string;
  line: string;
  accent?: boolean;
}

/** The three beats of the club's tagline, told as a scroll story. */
const ACTS: ActData[] = [
  {
    index: "01",
    word: "Think.",
    line: "Every project starts as a question at the back of a classroom. Curiosity is the first commit.",
  },
  {
    index: "02",
    word: "Build.",
    line: "Late nights, broken builds, working demos at 3am. We turn the idea into something you can actually run.",
  },
  {
    index: "03",
    word: "Elevate.",
    line: "Hackathons won. Campus tools shipped. Curious students become the people who build what's next.",
    accent: true,
  },
];

/** A single act: crossfades and rises through its slice of the scroll range. */
function Act({
  progress,
  range,
  act,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  act: ActData;
}) {
  const [start, end] = range;
  const span = end - start;
  const fadeIn = span * 0.18;
  const opacity = useTransform(
    progress,
    [start, start + fadeIn, end - fadeIn, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, start + fadeIn, end - fadeIn, end],
    [70, 0, 0, -70]
  );
  const ghostScale = useTransform(progress, [start, end], [0.85, 1.15]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.span
        style={{ scale: ghostScale }}
        className="pointer-events-none absolute select-none font-mono text-[42vw] font-black leading-none text-emerald/[0.035] md:text-[30vw]"
        aria-hidden
      >
        {act.index}
      </motion.span>
      <motion.p style={{ y }} className="font-mono text-sm text-emerald">
        <span className="text-emerald/50">// act {act.index}</span>
      </motion.p>
      <motion.h2
        style={{ y }}
        className="mt-4 text-6xl font-black tracking-tight text-white sm:text-7xl md:text-8xl"
      >
        <span className={act.accent ? "text-gradient" : ""}>{act.word}</span>
      </motion.h2>
      <motion.p
        style={{ y }}
        className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
      >
        {act.line}
      </motion.p>
    </motion.div>
  );
}

/** A node on the left rail that lights as its act becomes active. */
function RailNode({
  progress,
  at,
  label,
}: {
  progress: MotionValue<number>;
  at: number;
  label: string;
}) {
  const active = useTransform(progress, [at - 0.12, at], [0, 1]);
  const scale = useTransform(active, [0, 1], [1, 1.4]);
  const labelOpacity = useTransform(active, [0, 1], [0.35, 1]);

  return (
    <div className="absolute -left-[5px] flex items-center gap-3" style={{ top: `${at * 100}%` }}>
      <motion.span
        style={{ scale }}
        className="block h-2.5 w-2.5 rounded-full border border-emerald bg-navy-950"
      >
        <motion.span style={{ opacity: active }} className="block h-full w-full rounded-full bg-emerald shadow-glow" />
      </motion.span>
      <motion.span style={{ opacity: labelOpacity }} className="font-mono text-xs uppercase tracking-widest text-emerald">
        {label}
      </motion.span>
    </div>
  );
}

/**
 * Scrollytelling centerpiece. A tall section whose inner panel is pinned to
 * the viewport; as the visitor scrolls, the three acts of "Think · Build ·
 * Elevate" crossfade in sequence while a rail on the left fills and lights up.
 * Reduced-motion visitors get a calm stacked version with no pinning.
 */
export function ManifestoScene() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const railFill = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);

  if (reduceMotion) {
    return (
      <section className="relative section">
        <CircuitBackground animate={false} density="sparse" />
        <div className="container-x relative space-y-16">
          {ACTS.map((act) => (
            <div key={act.index} className="text-center">
              <p className="font-mono text-sm text-emerald/60">// act {act.index}</p>
              <h2 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-6xl">
                <span className={act.accent ? "text-gradient" : ""}>{act.word}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{act.line}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <CircuitBackground density="sparse" />
        <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50" />

        {/* Progress rail (desktop) */}
        <div className="absolute left-6 top-1/2 hidden h-72 -translate-y-1/2 lg:left-12 lg:block">
          <div className="relative h-full w-px bg-white/10">
            <motion.div
              style={{ scaleY: railFill }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-emerald-bright via-emerald to-emerald-deep shadow-glow"
            />
            <RailNode progress={scrollYProgress} at={0.04} label="Think" />
            <RailNode progress={scrollYProgress} at={0.5} label="Build" />
            <RailNode progress={scrollYProgress} at={0.96} label="Elevate" />
          </div>
        </div>

        {/* The acts */}
        <Act progress={scrollYProgress} range={[0, 0.34]} act={ACTS[0]} />
        <Act progress={scrollYProgress} range={[0.33, 0.67]} act={ACTS[1]} />
        <Act progress={scrollYProgress} range={[0.66, 1]} act={ACTS[2]} />
      </div>
    </section>
  );
}
