"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { CLUB } from "@/lib/data";

const FACTS = [
  { label: "Meets", key: "meetingDays" as const },
  { label: "When", key: "meetingTime" as const },
  { label: "Where", key: "meetingRoom" as const },
];

/**
 * Home hero.
 *
 * Layered like an Apple product page: an aurora wash at the back, the dragon
 * mark drifting on a slow parallax track, then the copy on top. Everything
 * enters on one staggered spring so the page settles as a single motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Foreground drifts up a little faster than the mark behind it.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const copyFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const rise = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="hero-wash relative border-b border-line">
      {/* Dragon mark, parallaxed behind the copy */}
      <motion.div
        style={reduceMotion ? undefined : { y: markY, rotate: markRotate }}
        className="pointer-events-none absolute -right-28 top-4 hidden select-none lg:block"
        aria-hidden="true"
      >
        <LogoMark size={560} className="opacity-[0.13] animate-drift" />
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { y: copyY, opacity: copyFade }}
        className="container-x relative px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28 lg:px-8"
      >
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={rise}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="eyebrow"
          >
            {CLUB.school}
            <span className="h-1 w-1 rounded-full bg-emerald/50" />
            {CLUB.city}
          </motion.p>

          <motion.h1
            variants={rise}
            transition={{ type: "spring", stiffness: 140, damping: 21 }}
            className="mt-6 text-[2.75rem] font-semibold leading-[1.04] tracking-display text-silver sm:text-6xl md:text-7xl"
          >
            Think.
            <br />
            Build.
            <br />
            <span className="text-emerald">Elevate.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            {CLUB.description}
          </motion.p>

          <motion.div
            variants={rise}
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href="/join" size="lg">
              Join the club <ArrowRight size={17} />
            </Button>
            <Button href="/projects" size="lg" variant="outline">
              Explore projects
            </Button>
          </motion.div>

          {/* Meeting facts, set as a spec strip */}
          <motion.dl
            variants={rise}
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-3"
          >
            {FACTS.map((f) => (
              <div key={f.label} className="border-l-2 border-emerald/25 pl-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
                  {f.label}
                </dt>
                <dd className="mt-1.5 text-[15px] font-semibold text-silver">{CLUB[f.key]}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>
    </section>
  );
}
