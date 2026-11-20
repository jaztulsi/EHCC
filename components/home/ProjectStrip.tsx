"use client";
// Projects laid out on the cutting mat. Drag tracks 1:1, past the ends it rubber-bands, and on release
// the flick is projected forward (Apple's deceleration formula) to pick a card. The snap is a critically
// damped spring that carries your release velocity. The mat's ruler edges slide with the cards.
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { prefersReducedMotion, startTicker } from "@/lib/motion";

type Project = { title: string; tag: string; body: string; href?: string };

const FPS = 60;

const project = (v: number, d = 0.998) => ((v / 1000) * d) / (1 - d);
const rubberband = (o: number, dim: number, c = 0.55) => (o * dim * c) / (dim + c * Math.abs(o));

export default function FilmReel({ projects }: { projects: readonly Project[] }) {
  const film = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const go = useRef<(dir: number) => void>(() => {});
  const count = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = film.current!;
    const tr = track.current!;
    let x = 0;
    let stop: (() => void) | undefined;
    let dragged = false;
    let drag: null | { id: number; x0: number; y0: number; start: number; live: boolean; hist: [number, number][] } = null;

    const frames = () => Array.from(tr.children) as HTMLElement[];
    const gutter = () => parseFloat(getComputedStyle(tr).paddingLeft);
    const min = () => {
      const last = frames().at(-1)!;
      return Math.min(0, el.clientWidth - (last.offsetLeft + last.offsetWidth + gutter()));
    };
    const snaps = () => frames().map((f) => Math.max(min(), Math.min(0, gutter() - f.offsetLeft)));
    const nearest = (v: number) => snaps().reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a));
    const band = (v: number) => {
      const lo = min();
      return v > 0 ? rubberband(v, el.clientWidth) : v < lo ? lo + rubberband(v - lo, el.clientWidth) : v;
    };
    const paint = (v: number) => {
      x = v;
      tr.style.transform = `translate3d(${v}px,0,0)`;
      el.style.setProperty("--sx", `${v}px`);
    };
    const halt = () => {
      stop?.();
      stop = undefined;
    };
    const settle = (to: number, v0 = 0) => {
      halt();
      if (count.current) count.current.textContent = String(snaps().indexOf(to) + 1).padStart(2, "0");
      if (prefersReducedMotion()) return paint(to);
      const u0 = x - to;
      const w = (2 * Math.PI) / 0.4; // response 0.4s, damping 1.0
      stop = startTicker((f) => {
        const t = (f + 1) / FPS;
        const u = (u0 + (v0 + w * u0) * t) * Math.exp(-w * t);
        if (Math.abs(u) < 0.5 || f > FPS * 2) {
          paint(to);
          halt();
        } else paint(to + u);
      }, FPS);
    };

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      halt(); // grab it mid-flight: it stops where it is
      dragged = false;
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, start: x, live: false, hist: [[e.clientX, e.timeStamp]] };
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0;
      const dy = e.clientY - drag.y0;
      if (!drag.live) {
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) return void (drag = null); // that's a scroll
        if (Math.abs(dx) < 10) return;
        drag.live = dragged = true;
        drag.x0 = e.clientX;
        drag.start = x;
        el.setPointerCapture(e.pointerId);
        el.classList.add("dragging");
      }
      drag.hist.push([e.clientX, e.timeStamp]);
      if (drag.hist.length > 5) drag.hist.shift();
      paint(band(drag.start + e.clientX - drag.x0));
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag;
      drag = null;
      el.classList.remove("dragging");
      if (!d.live) return;
      const a = d.hist[0];
      const b = d.hist[d.hist.length - 1];
      const v = b[1] > a[1] && e.timeStamp - b[1] < 100 ? ((b[0] - a[0]) / (b[1] - a[1])) * 1000 : 0;
      settle(nearest(x + project(v)), v);
    };
    const swallow = (e: MouseEvent) => {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    };
    const focus = (e: FocusEvent) => {
      el.scrollLeft = 0; // the browser scrolls overflow:hidden boxes to show focus; we move the track instead
      const f = (e.target as Element).closest(".proj") as HTMLElement | null;
      if (f) settle(Math.max(min(), Math.min(0, gutter() - f.offsetLeft)));
    };
    const key = (e: KeyboardEvent) => {
      if (e.target !== el) return;
      if (e.key === "ArrowRight") go.current(1);
      else if (e.key === "ArrowLeft") go.current(-1);
      else return;
      e.preventDefault();
    };
    const resize = () => paint(Math.max(min(), Math.min(0, x)));
    go.current = (dir) => {
      const s = snaps();
      const i = s.indexOf(nearest(x));
      settle(s[Math.max(0, Math.min(s.length - 1, i + dir))]);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", swallow, true);
    el.addEventListener("dragstart", (e) => e.preventDefault());
    el.addEventListener("focusin", focus);
    el.addEventListener("keydown", key);
    addEventListener("resize", resize);
    return () => {
      halt();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", swallow, true);
      el.removeEventListener("focusin", focus);
      el.removeEventListener("keydown", key);
      removeEventListener("resize", resize);
    };
  }, []);

  const label = (href: string) => (href.startsWith("#") ? "Pitch yours" : href.startsWith("http") ? "View the code" : "Open it");

  return (
    <>
      <div
        ref={film}
        className="rail"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects. Drag, or use the left and right arrow keys."
        tabIndex={0}
      >
        <ol ref={track} className="rail-track">
          {projects.map((p, i) => (
            <li
              key={p.title}
              className={p.href?.startsWith("#") ? "proj proj-open" : "proj"}
              aria-label={`${i + 1} of ${projects.length}`}
            >
              <div className="proj-top">
                <span className="proj-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="proj-tag">{p.tag}</span>
              </div>
              <h3 className="proj-title">{p.title}</h3>
              <p>{p.body}</p>
              {p.href && (
                <a
                  className="proj-go"
                  href={p.href}
                  {...(p.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {label(p.href)}
                  {p.href.startsWith("http") ? <ArrowUpRight aria-hidden /> : <ArrowRight aria-hidden />}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
      <div className="wrap rail-ctl">
        <p className="rail-count">
          <b ref={count}>01</b> / {String(projects.length).padStart(2, "0")}
        </p>
        <p className="rail-hint">Drag the cards or use the arrow keys</p>
        <div className="rail-btns">
          <button type="button" className="btn btn-glass btn-icon" onClick={() => go.current(-1)} aria-label="Previous project">
            <ChevronLeft aria-hidden />
          </button>
          <button type="button" className="btn btn-glass btn-icon" onClick={() => go.current(1)} aria-label="Next project">
            <ChevronRight aria-hidden />
          </button>
        </div>
      </div>
    </>
  );
}
