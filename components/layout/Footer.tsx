import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CircuitBackground } from "@/components/effects/CircuitBackground";
import { CLUB, NAV_LINKS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/5 bg-navy-900">
      <CircuitBackground animate={false} density="sparse" className="opacity-40" />
      <div className="container-x relative px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {CLUB.description} {CLUB.school}, {CLUB.city}.
            </p>
            <p className="mt-3 font-mono text-sm text-emerald">{CLUB.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-silver">Explore</h3>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-muted transition-colors hover:text-emerald-bright">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-silver">Get Involved</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/join" className="text-muted transition-colors hover:text-emerald-bright">
                    Join the Club
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-muted transition-colors hover:text-emerald-bright">
                    Meet the Team
                  </Link>
                </li>
                <li>
                  <Link href="/learn" className="text-muted transition-colors hover:text-emerald-bright">
                    Learn to Code
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-silver">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={CLUB.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-emerald-bright"
                  >
                    <Instagram size={15} /> {CLUB.instagram}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CLUB.email}`}
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-emerald-bright"
                  >
                    <Mail size={15} /> Email us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {CLUB.name}. Built by students at {CLUB.school}.
          </p>
          <p className="font-mono">
            <span className="text-emerald/60">{"//"}</span> Think. Build. Elevate.
          </p>
        </div>
      </div>
    </footer>
  );
}
