"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, FolderGit2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/effects/ParticleField";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { CLUB } from "@/lib/data";

const LINES = ["// Think.", "// Build.", "// Elevate."];

/** Hero with a live particle circuit, a typing headline, and dual CTAs. */
export function AnimatedHero() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Foreground copy lifts and fades as you scroll away; the dragon recedes
  // upward more slowly, creating depth between the layers.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [typed, setTyped] = useState<string[]>(["", "", ""]);
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);

  // Type each line out character-by-character, then move to the next.
  useEffect(() => {
    // Reduced motion: skip the typing animation, show the headline at rest.
    if (reduceMotion) {
      setTyped(LINES);
      setDone(true);
      return;
    }
    if (lineIdx >= LINES.length) {
      setDone(true);
      return;
    }
    const target = LINES[lineIdx];
    const current = typed[lineIdx];
    if (current.length < target.length) {
      const t = setTimeout(() => {
        setTyped((prev) => {
          const next = [...prev];
          next[lineIdx] = target.slice(0, current.length + 1);
          return next;
        });
      }, 70);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIdx((i) => i + 1), 220);
    return () => clearTimeout(t);
  }, [typed, lineIdx, reduceMotion]);

  return (
    <section ref={heroRef} className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <CircuitBackground />
      <ParticleField className="absolute inset-0 h-full w-full" />

      {/* Dragon logo watermark — recedes slowly on scroll for depth */}
      <motion.div
        style={reduceMotion ? undefined : { y: logoY }}
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 opacity-[0.07] md:block lg:right-12 lg:opacity-10"
      >
        <Image src="/logo.png" alt="" width={520} height={546} className="animate-float" priority />
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-1 font-mono text-xs text-emerald">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-emerald" />
            {CLUB.school} · {CLUB.city}
          </span>

          <h1 className="mt-6 font-mono text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
            {LINES.map((line, i) => (
              <span key={line} className="block">
                <span className={i === 2 ? "text-gradient" : "text-silver"}>{typed[i]}</span>
                {/* caret on the line currently being typed (or last when done) */}
                {((!done && i === lineIdx) || (done && i === 2)) && (
                  <span className="animate-blink text-emerald-bright">▍</span>
                )}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={done ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {CLUB.description} We build real projects, compete in hackathons, and turn the curious
            into creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={done ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/join" size="lg">
              Join the Club <ArrowRight size={18} />
            </Button>
            <Button href="/projects" size="lg" variant="outline">
              <FolderGit2 size={18} /> Explore Projects
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — appears once the headline finishes, fades as you scroll */}
      {done && (
        <motion.div
          style={reduceMotion ? undefined : { opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2 text-emerald/70"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.3em]">scroll</span>
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={18} />
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  );
}
