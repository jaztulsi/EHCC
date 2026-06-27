"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const INTERESTS = [
  "Hackathon Branch",
  "Data Science Branch",
  "USACO / Programming Branch",
  "Web Dev",
  "AI / ML",
  "Competitive Programming",
];
const LEVELS = ["Total beginner", "Some experience", "Pretty comfortable", "Advanced"];
const GRADES = ["Freshman", "Sophomore", "Junior", "Senior"];

export function JoinForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [level, setLevel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggle(tag: string) {
    setInterests((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Static demo: no backend. Show an animated confirmation.
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800/50 p-6 md:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="mb-4 inline-flex rounded-full bg-emerald/15 p-4 text-emerald shadow-glow"
            >
              <CheckCircle2 size={40} />
            </motion.span>
            <h3 className="text-2xl font-bold text-white">You&apos;re on the list! 🎉</h3>
            <p className="mt-2 max-w-sm text-muted">
              Thanks for your interest in EHCC. We&apos;ll reach out with the next meeting details. In the
              meantime, follow us on Instagram for updates.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setInterests([]);
                setLevel("");
              }}
              className="mt-6 rounded-md border border-white/10 px-4 py-2 text-sm text-silver transition-colors hover:border-emerald/40 hover:text-emerald-bright"
            >
              Submit another response
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="name">
                <input id="name" required placeholder="Ada Lovelace" className={inputCls} />
              </Field>
              <Field label="Email" htmlFor="email">
                <input id="email" type="email" required placeholder="you@school.edu" className={inputCls} />
              </Field>
            </div>

            <Field label="Grade" htmlFor="grade">
              <div className="flex flex-wrap gap-2">
                {GRADES.map((g) => (
                  <label key={g} className="cursor-pointer">
                    <input type="radio" name="grade" value={g} className="peer sr-only" />
                    <span className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-sm text-muted transition-all peer-checked:border-emerald peer-checked:bg-emerald/10 peer-checked:text-emerald-bright hover:border-white/20">
                      {g}
                    </span>
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Experience level" htmlFor="level">
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    type="button"
                    key={l}
                    onClick={() => setLevel(l)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-all",
                      level === l
                        ? "border-emerald bg-emerald/10 text-emerald-bright"
                        : "border-white/10 text-muted hover:border-white/20"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </Field>

            <Field label={`Areas of interest${interests.length ? ` (${interests.length})` : ""}`} htmlFor="interests">
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((tag) => {
                  const on = interests.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggle(tag)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm transition-all",
                        on
                          ? "border-emerald bg-emerald/15 text-emerald-bright shadow-glow"
                          : "border-white/10 text-muted hover:border-emerald/40"
                      )}
                    >
                      {on ? "✓ " : "+ "}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="What do you want to build?" htmlFor="build">
              <textarea
                id="build"
                rows={3}
                placeholder="An app, a game, a hackathon win… tell us what you're excited about."
                className={cn(inputCls, "resize-none")}
              />
            </Field>

            <button
              type="submit"
              className="btn-shimmer inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-emerald-bright hover:shadow-glow-md"
            >
              <Send size={17} /> Submit application
            </button>
            <p className="text-center font-mono text-xs text-muted">
              {"// demo form — no data leaves your browser"}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-2.5 text-sm text-silver outline-none transition-colors placeholder:text-muted/60 focus:border-emerald/50";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-silver">
        {label}
      </label>
      {children}
    </div>
  );
}
