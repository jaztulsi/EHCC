import { Badge } from "@/components/ui/Badge";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Build initials for the avatar placeholder. */
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TeamMemberCard({ member, large = false }: { member: TeamMember; large?: boolean }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col items-center rounded-xl border border-white/5 bg-navy-800/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow",
        large && "sm:p-7"
      )}
    >
      {/* Avatar placeholder with glowing ring */}
      <div
        className={cn(
          "relative mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-deep to-navy-700 font-mono font-bold text-white ring-2 ring-emerald/30 transition-all duration-300 group-hover:ring-emerald group-hover:shadow-glow",
          large ? "h-20 w-20 text-xl" : "h-16 w-16 text-lg"
        )}
      >
        {initials(member.name)}
      </div>
      <h3 className="text-base font-semibold text-white">{member.name}</h3>
      <p className="text-sm font-medium text-emerald-bright">{member.role}</p>
      <p className="mt-0.5 text-xs text-muted">{member.grade}</p>

      {large && member.bio && <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>}

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {member.interests.map((i) => (
          <Badge key={i} tone="navy" mono>
            {i}
          </Badge>
        ))}
      </div>
    </article>
  );
}
