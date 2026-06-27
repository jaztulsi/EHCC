"use client";

import { RotateCcw, Share2, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Shared chrome for games: terminal header, restart + share buttons. */
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

  async function share() {
    if (!shareText) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: "EHCC Games", text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-emerald/20 bg-navy-900", className)}>
      {/* Terminal title bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-navy-800/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-400/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald/70" />
          </span>
          <span className="ml-2 font-mono text-xs text-muted">
            ehcc@games:~$ <span className="text-emerald-bright">{title}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {shareText && (
            <button
              onClick={share}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-emerald-bright"
            >
              {copied ? <Check size={13} /> : <Share2 size={13} />}
              {copied ? "copied" : "share"}
            </button>
          )}
          {onRestart && (
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-emerald-bright"
            >
              <RotateCcw size={13} /> restart
            </button>
          )}
        </div>
      </div>
      {subtitle && (
        <p className="border-b border-white/5 px-4 py-2 font-mono text-xs text-muted">{"// "}{subtitle}</p>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
