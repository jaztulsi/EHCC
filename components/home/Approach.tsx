"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ACTS = [
  {
    index: "01",
    word: "Think",
    line: "Every project starts as a question at the back of a classroom. We give that question somewhere to go.",
  },
  {
    index: "02",
    word: "Build",
    line: "Designs become repositories, repositories become working demos. Members ship something they can run and show.",
  },
  {
    index: "03",
    word: "Elevate",
    line: "Hackathons entered, campus tools shipped, portfolios that hold up. Curious students become people who build.",
  },
];

/**
 * The club's three steps, on the deep band.
 *
 * A rail down the left fills as the section scrolls through the viewport, and
 * each step fades up in turn. The rail is decorative, so the content reads
 * fine with motion disabled.
 */
export function Approach() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="band-dark section relative overflow-hidden">
      <div className="container-x relative">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-bark-line bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-circuit">
            How we work
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-display sm:text-[2.5rem] sm:leading-[1.1]">
            Think. Build. Elevate.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-bark-muted">
            Three steps that shape every semester, from the first meeting to the final demo.
          </p>
        </div>

        <div className="relative mt-16 pl-8 md:pl-12">
          {/* Progress rail */}
          <div className="absolute bottom-2 left-0 top-2 w-px bg-bark-line" aria-hidden="true">
            <motion.div
              style={reduceMotion ? { scaleY: 1 } : { scaleY: fill }}
              className="h-full w-px origin-top bg-emerald-circuit"
            />
          </div>

          <ol className="space-y-14 md:space-y-16">
            {ACTS.map((act, i) => (
              <motion.li
                key={act.index}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
                transition={
                  reduceMotion
                    ? { duration: 0.2 }
                    : { type: "spring", stiffness: 140, damping: 21, delay: i * 0.05 }
                }
                className="relative"
              >
                {/* Node on the rail */}
                <span
                  className="absolute -left-8 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-emerald-circuit ring-4 ring-bark md:-left-12"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-sm font-bold tracking-[0.18em] text-emerald-circuit">
                    {act.index}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-title md:text-3xl">{act.word}</h3>
                </div>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-bark-muted md:text-base">
                  {act.line}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
