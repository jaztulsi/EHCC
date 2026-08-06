import { Clock } from "lucide-react";

/** Reusable notice for sections/pages that aren't ready yet. */
export function ComingSoon({
  title = "Coming soon",
  note,
}: {
  title?: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800/50 p-10 text-center">
      <span className="mx-auto inline-flex rounded-full bg-emerald/10 p-4 text-emerald-bright shadow-glow">
        <Clock size={28} strokeWidth={1.8} />
      </span>
      <h3 className="mt-4 text-2xl font-bold text-white">{title}</h3>
      <p className="mt-2 font-mono text-sm text-emerald">{"// wait for more updates — this is on the way"}</p>
      {note && <p className="mx-auto mt-3 max-w-md text-muted">{note}</p>}
    </div>
  );
}
