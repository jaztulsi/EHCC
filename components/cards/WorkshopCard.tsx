import { Check, Layers } from "lucide-react";
import { Badge, toneFor } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import type { Workshop } from "@/lib/types";

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-white/5 bg-navy-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow">
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-flex rounded-lg bg-emerald/10 p-2.5 text-emerald-bright transition-colors group-hover:bg-emerald/20">
          <Icon name={workshop.icon} className="h-5 w-5" />
        </span>
        <Badge tone={toneFor(workshop.difficulty)}>{workshop.difficulty}</Badge>
      </div>

      <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-emerald-bright">
        {workshop.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{workshop.description}</p>

      <ul className="mt-4 space-y-1.5">
        {workshop.topics.map((t) => (
          <li key={t} className="flex items-center gap-2 text-sm text-silver">
            <Check size={14} className="shrink-0 text-emerald" /> {t}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-1.5 border-t border-white/5 pt-4 text-xs text-muted">
        <Layers size={13} className="text-emerald/70" />
        {workshop.sessions} session{workshop.sessions > 1 ? "s" : ""}
      </div>
    </article>
  );
}
