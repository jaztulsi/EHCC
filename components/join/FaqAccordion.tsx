"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-navy-800/50">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className={cn("font-medium transition-colors", isOpen ? "text-emerald-bright" : "text-silver")}>
                {faq.q}
              </span>
              <ChevronDown
                size={18}
                className={cn("shrink-0 text-emerald transition-transform", isOpen && "rotate-180")}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-4 text-sm leading-relaxed text-muted">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
