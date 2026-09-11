import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CLUB, NAV_LINKS } from "@/lib/data";

const GET_INVOLVED = [
  { href: "/join", label: "Join the club" },
  { href: "/team", label: "Meet the team" },
  { href: "/learn", label: "Learn to code" },
];

export function Footer() {
  return (
    <footer className="band-dark mt-auto">
      <div className="container-x px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-5 text-sm leading-relaxed text-bark-muted">
              {CLUB.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-emerald-circuit">{CLUB.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-bark-muted">
                Explore
              </h3>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline text-bark-ink/80 transition-colors hover:text-emerald-circuit"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-bark-muted">
                Get involved
              </h3>
              <ul className="space-y-2.5 text-sm">
                {GET_INVOLVED.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline text-bark-ink/80 transition-colors hover:text-emerald-circuit"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-bark-muted">
                Connect
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href={CLUB.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-bark-ink/80 transition-colors hover:text-emerald-circuit"
                  >
                    <Instagram size={15} /> {CLUB.instagram}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CLUB.email}`}
                    className="inline-flex items-center gap-2 text-bark-ink/80 transition-colors hover:text-emerald-circuit"
                  >
                    <Mail size={15} /> Email us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-bark-line pt-7 text-xs text-bark-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {CLUB.name}. Built by students at {CLUB.school}.
          </p>
          <p>Think. Build. Elevate.</p>
        </div>
      </div>
    </footer>
  );
}
