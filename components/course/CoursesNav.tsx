"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, Home, LayoutDashboard } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
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

  const initials = profile
    ? profile.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w.charAt(0).toUpperCase())
        .join("")
    : "";

  return (
    <header className={cn("z-40 border-b border-line bg-bg", standalone ? "sticky top-0" : "relative")}>
      <nav
        aria-label="Courses"
        className="mx-auto flex h-14 w-full max-w-[calc(var(--max)+var(--gutter)*2)] items-center gap-6 px-[var(--gutter)]"
      >
        <Link href="/courses" className="flex shrink-0 items-center gap-2 rounded-md text-[15px] font-medium text-ink">
          {standalone && <LogoMark size={24} />}
          EHIC Courses
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {TABS.map((t) => {
            const active = isActive(t.href, t.exact);
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-8 items-center gap-2 rounded-[10px] px-3 text-sm font-medium transition-colors",
                  active ? "bg-raised text-ink" : "text-ink-2 hover:bg-raised/60 hover:text-ink"
                )}
              >
                <t.icon size={16} strokeWidth={1.5} className={active ? "text-ink-2" : "text-ink-3"} aria-hidden />
                {t.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center">
          {!loaded ? (
            <span className="h-8 w-8" aria-hidden />
          ) : profile ? (
            <Link
              href="/courses/dashboard"
              className="inline-flex h-8 items-center gap-2 rounded-[10px] pl-1 pr-3 text-sm font-medium text-ink-2 transition-colors hover:bg-raised hover:text-ink"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full bg-raised font-mono text-[11px] font-medium text-ink-2 ring-1 ring-ink/10"
                aria-hidden
              >
                {initials}
              </span>
              <span className="hidden sm:inline">{profile.name.split(" ")[0]}</span>
              <span className="sr-only sm:hidden">Your dashboard</span>
            </Link>
          ) : (
            <Link href="/courses#signup" className="btn btn-primary btn-sm">
              Create profile
            </Link>
          )}
        </div>
      </nav>

      {/* Small screens: the tabs get their own row */}
      <div className="grid grid-cols-4 gap-1 border-t border-line px-[var(--gutter)] py-2 sm:hidden">
        {TABS.map((t) => {
          const active = isActive(t.href, t.exact);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex h-8 items-center justify-center rounded-[10px] text-[13px] font-medium transition-colors",
                active ? "bg-raised text-ink" : "text-ink-2 hover:text-ink"
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
