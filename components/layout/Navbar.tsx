"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, CLUB } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-emerald/20 shadow-[0_4px_30px_-12px_rgba(34,197,94,0.5)]"
          : "border-b border-transparent bg-navy-950/30 backdrop-blur-sm"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Center links (desktop) */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-emerald-bright" : "text-muted hover:text-silver"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-px h-px bg-emerald shadow-glow-text"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button href={CLUB.joinFormUrl} external size="sm" className="hidden sm:inline-flex">
            Join Us
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-silver hover:bg-white/5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/5 glass md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm font-medium",
                      pathname === link.href
                        ? "bg-emerald/10 text-emerald-bright"
                        : "text-muted hover:bg-white/5 hover:text-silver"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button href={CLUB.joinFormUrl} external className="w-full">
                  Join Us
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
