"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, LayoutDashboard, BookOpen, Home, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfile } from "./useProfile";

const TABS = [
  { href: "/courses", label: "Home", icon: Home, exact: true },
  { href: "/courses/curriculum", label: "Curriculum", icon: BookOpen },
  { href: "/courses/practice", label: "Practice", icon: Gamepad2 },
  { href: "/courses/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function CoursesNav({ standalone = true }: { standalone?: boolean }) {
  const pathname = usePathname();
  const { profile, loaded } = useProfile();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "z-40 border-b border-white/10 bg-navy-950/80 backdrop-blur-md",
        standalone ? "sticky top-0" : "relative"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Link href="/courses" className="mr-2 flex items-center gap-2">
          <span className="inline-flex rounded-lg bg-emerald/15 p-1.5 text-emerald-bright">
            <GraduationCap size={18} />
          </span>
          <span className="font-bold text-white">
            EHCC <span className="text-emerald-bright">Academy</span>
          </span>
        </Link>

        <div className="ml-2 hidden items-center gap-1 sm:flex">
          {TABS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                isActive(t.href, t.exact)
                  ? "bg-emerald/10 text-emerald-bright"
                  : "text-muted hover:text-white"
              )}
            >
              <t.icon size={15} /> {t.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto">
          {loaded && profile ? (
            <Link
              href="/courses/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1.5 text-sm font-medium text-emerald-bright transition-colors hover:border-emerald/50"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-xs font-bold text-navy-950">
                {profile.name.trim().charAt(0).toUpperCase()}
              </span>
              <span className="hidden sm:inline">{profile.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link
              href="/courses"
              className="btn-shimmer inline-flex items-center gap-1.5 rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-emerald-bright"
            >
              Sign up free
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile tabs */}
      <div className="flex items-center gap-1 border-t border-white/5 px-4 py-2 sm:hidden">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors",
              isActive(t.href, t.exact) ? "bg-emerald/10 text-emerald-bright" : "text-muted"
            )}
          >
            <t.icon size={14} /> {t.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
