"use client";
// One nav for every page. Under it runs the ruler: it measures how far down the page you are,
// and the club's gem walks along it.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SoundToggle, ThemeToggle } from "./Toggles";

const LINKS = [
  ["About", "/#about"],
  ["What we do", "/#what"],
  ["Events", "/#events"],
  ["Projects", "/#projects"],
  ["Crew", "/#crew"],
  ["Courses", "/courses"],
  ["Games", "/games"],
] as const;

export function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [here, setHere] = useState("");
  const ruler = useRef<HTMLDivElement>(null);

  // which homepage section is on screen
  useEffect(() => {
    if (path !== "/") return setHere(path.startsWith("/courses") ? "/courses" : path.startsWith("/games") ? "/games" : "");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setHere(`/#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [path]);

  // the ruler: progress plus the walker's stride
  useEffect(() => {
    const el = ruler.current!;
    const walker = el.querySelector<HTMLElement>(".walker")!;
    let raf = 0;
    const step = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      const x = Math.round((p * (el.clientWidth - 14)) / 6) * 6; // 6px strides, so the legs swap on whole steps
      el.style.setProperty("--p", String(p));
      el.style.setProperty("--x", `${x}px`);
      walker.dataset.step = String((x / 6) % 2);
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className="site-nav">
      <div className="site-nav-row">
        <a href="/" className="brand" aria-label="EHIC home">
          <Image src="/logo-mark.png" alt="" width={28} height={28} priority />
          <span>EHIC</span>
        </a>
        <nav className="site-links" aria-label="Main">
          {LINKS.map(([t, h]) => (
            <a key={h} href={h} aria-current={here === h ? "true" : undefined}>
              {t}
            </a>
          ))}
        </nav>
        <div className="site-tools">
          <SoundToggle />
          <ThemeToggle />
          <a className="btn btn-primary btn-sm" href="/#join">
            Join
          </a>
          <button
            type="button"
            className="tool site-menu"
            aria-expanded={open}
            aria-controls="site-drop"
            onClick={() => setOpen((o) => !o)}
            data-sfx="pop"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X strokeWidth={1.5} aria-hidden /> : <Menu strokeWidth={1.5} aria-hidden />}
          </button>
        </div>
      </div>
      <div className="nav-ruler" ref={ruler} aria-hidden>
        <div className="nav-ruler-fill" />
        <div className="walker">
          <svg viewBox="0 0 26 30" width="14" height="16">
            <path d="M9 9L7 2M17 9l2-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M6 7h14l5 6-12 11L1 13z" fill="var(--emerald)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="10" cy="13" r="1.7" fill="currentColor" />
            <circle cx="16" cy="13" r="1.7" fill="currentColor" />
            <path className="leg-a" d="M10 22l-3 7M16 22l3 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path className="leg-b" d="M10 22l2 7M16 22l-2 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {open && (
        <nav id="site-drop" className="site-drop" aria-label="Main">
          {LINKS.map(([t, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} aria-current={here === h ? "true" : undefined}>
              {t}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
