"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Boot lines printed by the terminal intro, in order. */
const BOOT_LINES = [
  "$ ehcc --boot",
  "> Initializing EHCC...",
  "> Loading circuit grid ............ ok",
  "> Mounting projects & events ...... ok",
  "> Think. Build. Elevate.",
];

/**
 * Terminal-style intro overlay. Shows once per browser session (sessionStorage),
 * types out a short boot sequence, then fades into the site. Skipped entirely
 * for visitors who prefer reduced motion or have already seen it this session.
 */
export function IntroLoader() {
  const reduceMotion = useReducedMotion();
  // Start hidden; we decide on the client whether to play it (avoids SSR flash).
  const [show, setShow] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("ehcc-intro-seen");
    if (seen || reduceMotion) return;
    setShow(true);
    sessionStorage.setItem("ehcc-intro-seen", "1");
  }, [reduceMotion]);

  // Reveal boot lines one at a time, then dismiss.
  useEffect(() => {
    if (!show) return;
    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((n) => n + 1), 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShow(false), 650);
    return () => clearTimeout(t);
  }, [show, visibleLines]);

  // Lock scroll while the overlay is up.
  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950 bg-circuit-grid bg-[length:32px_32px]"
          aria-hidden
        >
          <div className="w-[min(90vw,460px)] overflow-hidden rounded-xl border border-emerald/20 bg-navy-900/80 shadow-glow-md backdrop-blur-sm">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald" />
              <span className="ml-2 font-mono text-xs text-muted">ehcc — boot</span>
            </div>
            {/* Boot output */}
            <div className="space-y-1.5 px-5 py-5 font-mono text-sm leading-relaxed">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    i === BOOT_LINES.length - 1
                      ? "text-gradient font-semibold"
                      : line.includes("ok")
                        ? "text-muted"
                        : "text-emerald-bright"
                  }
                >
                  {line}
                  {i === visibleLines - 1 && (
                    <span className="animate-blink text-emerald-bright">▍</span>
                  )}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
