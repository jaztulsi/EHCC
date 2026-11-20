"use client";

import { RotateCcw, Share, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Shared frame for every game: the homepage clapper stripe, an ink title bar with Share and Restart, then the play area. */
export function GameShell({
  title,
  subtitle,
  onRestart,
  shareText,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  onRestart?: () => void;
  shareText?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  async function share() {
    if (!shareText) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: "EHIC games", text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* cancelled */
    }
  }

  return (
    <section className={cn("surface overflow-hidden shadow-hard-lg", className)}>
      <div className="clap" aria-hidden />
      <header className="flex items-center justify-between gap-4 bg-ink px-5 py-4 text-paper sm:px-6">
        <div className="min-w-0">
          <h2 className="text-2xl leading-tight sm:text-[28px]">{title}</h2>
          {subtitle && <p className="mt-1 font-mono text-xs leading-5 text-mint">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {shareText && (
            <button type="button" onClick={share} className="btn btn-sm !bg-paper" aria-label={copied ? "Copied" : "Share result"}>
              {copied ? <Check strokeWidth={2} /> : <Share strokeWidth={2} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
            </button>
          )}
          {onRestart && (
            <button type="button" onClick={onRestart} className="btn btn-sm btn-sun" data-sfx="pop" aria-label="Restart">
              <RotateCcw strokeWidth={2} />
              <span className="hidden sm:inline">Restart</span>
            </button>
          )}
        </div>
      </header>
      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}

/** The row of live figures above the play area: label in muted text, figure in mono. */
export function GameStatus({ items, className }: { items: { label: string; value: React.ReactNode; tone?: "negative" }[]; className?: string }) {
  return (
    <dl className={cn("flex flex-wrap items-baseline gap-x-6 gap-y-1 text-[13px] leading-5", className)}>
      {items.map((it) => (
        <div key={it.label} className="flex items-baseline gap-2">
          <dt className="text-ink-3">{it.label}</dt>
          <dd className={cn("font-mono tabular-nums", it.tone === "negative" ? "text-negative" : "text-ink")}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The result on the homepage emerald set, like its trophy shelf: big figures, small labels, lines between.
 * The first figure leads. `note` is one plain line under the figures.
 */
export function Scoreboard({
  label,
  items,
  note,
}: {
  label: string;
  items: { label: string; value: React.ReactNode }[];
  note?: React.ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" className="relative overflow-hidden band-dark rounded-card border-[2.5px] border-ink text-mat-text shadow-hard-md">
      {/* the mat's measuring edge */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-2.5"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgb(var(--c-mat-text) / 0.3) 0 1px, transparent 1px 48px) 0 0 / 100% 10px no-repeat, repeating-linear-gradient(90deg, rgb(var(--c-mat-text) / 0.16) 0 1px, transparent 1px 8px) 0 0 / 100% 5px no-repeat",
        }}
      />
      <p className="px-5 pt-7 text-[13px] leading-5 text-mat-muted sm:px-6">{label}</p>
      {/* phones: the lead figure on its own row, the rest in pairs; wider: one row */}
      <dl className="mt-3 grid grid-cols-2 border-y border-mat-text/15 sm:flex">
        {items.map((it, i) => {
          const rest = items.length - 1;
          const lonely = i > 0 && rest % 2 === 1 && i === items.length - 1;
          return (
            <div
              key={it.label}
              className={cn(
                "min-w-0 px-5 py-4 sm:px-6",
                i === 0 ? "col-span-2 sm:flex-[1.5]" : "border-t border-mat-text/15 sm:flex-1 sm:border-l sm:border-t-0",
                lonely && "col-span-2",
                i > 0 && i % 2 === 0 && !lonely && "border-l"
              )}
            >
              <dt className="truncate text-[13px] leading-5 text-mat-muted">{it.label}</dt>
              <dd className={cn("mt-2 font-display font-extrabold leading-none tracking-display tabular-nums", i === 0 ? "text-[48px] sm:text-[56px]" : "text-[28px] sm:text-[32px]")}>
                {it.value}
              </dd>
            </div>
          );
        })}
      </dl>
      {note && <p className="px-5 py-4 text-sm leading-6 text-mat-text sm:px-6">{note}</p>}
    </div>
  );
}

/** Copy from the data files marks code with backticks; set those parts in mono. */
export function InlineCode({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className={cn(
              "rounded-[4px] px-1 py-px font-mono text-[0.92em]",
              dark ? "bg-white/10" : "bg-raised text-ink"
            )}
          >
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** A short sideways shake for a wrong answer; nothing when the visitor asked for less motion. */
export function useShake() {
  const reduce = useReducedMotion();
  return (wrong: boolean) =>
    wrong && !reduce
      ? { animate: { x: [0, -6, 6, -4, 3, 0] }, transition: { duration: 0.3, ease: "easeOut" as const } }
      : { animate: { x: 0 }, transition: { duration: 0 } };
}

/** Pressed keys for choosing an option: A–D or 1–4, ignored while typing in a field or with a modifier held. */
export function useOptionKeys(count: number, onPick: (i: number) => void, enabled: boolean) {
  const pick = useRef(onPick);
  pick.current = onPick;
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable='true']")) return;
      const k = e.key.toLowerCase();
      let i = "abcd".indexOf(k);
      if (i < 0) i = "1234".indexOf(k);
      if (i >= 0 && i < count) {
        e.preventDefault();
        pick.current(i);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, enabled]);
}

/** Enter moves on (next question, results, play again) unless a button has focus, which handles Enter itself. */
export function useEnterKey(onEnter: () => void, enabled: boolean) {
  const fn = useRef(onEnter);
  fn.current = onEnter;
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("button, a[href], input, textarea, select, summary")) return;
      e.preventDefault();
      fn.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);
}

export const LETTERS = ["A", "B", "C", "D"];
