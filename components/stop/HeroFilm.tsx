"use client";
// The opening shot. One drone move (film/film.mp4 from scripts/film.mjs, cut into public/intro by scripts/intro-frames.sh)
// is scrubbed by scroll: the hero pins, the title sits over the aerial shot of campus, then the drone flies into G-225 and
// lands on the TV, where the pitch arrives. The frame shown eases toward the scroll position, so scrolling back up plays it in reverse.
// Between the title and the landing, `beats` (one caption per shot) tell the story as the camera passes each scene.
// No frames yet: the hero is just the title. Phones, short screens and reduced motion get the first frame as a still.
import { useEffect, useRef, type ReactNode } from "react";

const FILM = "(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 560px)";
const MOVE = 0.8; // share of the pinned scroll the camera move uses; the rest holds on the landing
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const src = (k: number) => `/intro/f-${String(k + 1).padStart(3, "0")}.jpg`;

type Beat = { kicker: string; line: string };
// The TV the film lands on: where its screen is in the last frame ([x, y, w, h] as fractions of the frame) and what it says.
// Once that frame is up, a coded screen takes over from the one in the footage, so the title can animate and stay spelled right.
type Tv = { box: [number, number, number, number]; title: string; sub: string };

const letters = (s: string) =>
  [...s].map((c, i) => (
    <span key={i} style={{ "--i": i } as React.CSSProperties}>
      {c === " " ? " " : c}
    </span>
  ));

export default function HeroFilm({
  frames,
  beats,
  land,
  tv,
  children,
}: {
  frames: number;
  beats: Beat[];
  land: ReactNode;
  tv?: Tv;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!frames) return;
    const el = root.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d", { alpha: false })!;
    const open = el.querySelector<HTMLElement>(".hero-open")!;
    const landEl = el.querySelector<HTMLElement>(".hero-land")!;
    const shade = el.querySelector<HTMLElement>(".film-shade")!;
    const dim = el.querySelector<HTMLElement>(".film-dim")!;
    const screen = el.querySelector<HTMLElement>(".film-tv");
    const beatEls = Array.from(el.querySelectorAll<HTMLElement>(".film-beat"));
    const mq = matchMedia(FILM);
    let teardown = () => {};

    const setup = () => {
      teardown();
      if (!mq.matches) return el.removeAttribute("data-film");
      el.setAttribute("data-film", "");

      // frames load in order, four at a time; until one arrives the nearest earlier one is drawn
      const imgs: (HTMLImageElement | undefined)[] = new Array(frames);
      let next = 0;
      let alive = true;
      let shown = -1;
      const pump = () => {
        if (!alive || next >= frames) return;
        const k = next++;
        const im = new Image();
        im.src = src(k);
        im.decode().then(
          () => {
            imgs[k] = im;
            if (k <= shown + 2) shown = -1; // a closer frame for this position may exist now
            pump();
          },
          () => pump(),
        );
      };
      for (let k = 0; k < 4; k++) pump();

      let cw = 0;
      let ch = 0;
      const size = () => {
        const dpr = Math.min(devicePixelRatio || 1, 1.5); // a 5K screen shouldn't fill 14M pixels a frame
        cw = cv.width = Math.round(cv.clientWidth * dpr);
        ch = cv.height = Math.round(cv.clientHeight * dpr);
        shown = -1;
      };
      const draw = (k: number) => {
        let im: HTMLImageElement | undefined;
        for (let j = k; j >= 0 && !im; j--) im = imgs[j];
        if (!im) return;
        const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight); // cover
        const w = im.naturalWidth * s;
        const h = im.naturalHeight * s;
        ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
        shown = k;
      };

      let cur = 0; // eased position, 0..1 through the pinned scroll
      let raf = 0;
      const tick = () => {
        raf = 0;
        const span = el.offsetHeight - innerHeight;
        const target = clamp(-el.getBoundingClientRect().top / span);
        cur += (target - cur) * 0.14;
        if (Math.abs(target - cur) < 0.0004) cur = target;
        const k = Math.round(ease(clamp(cur / MOVE)) * (frames - 1));
        if (k !== shown) draw(k);
        screen?.toggleAttribute("data-on", shown === frames - 1 && !!imgs[frames - 1]); // the TV wakes once the drone has landed
        // the title leaves as the camera starts moving; the pitch arrives once it has landed
        const out = clamp(cur / 0.16);
        const inn = clamp((cur - MOVE + 0.06) / 0.14);
        open.style.opacity = String(1 - out);
        open.style.transform = `translate3d(${(-60 * out).toFixed(1)}px,0,0)`;
        open.inert = out > 0.5;
        shade.style.opacity = String(1 - out);
        dim.style.opacity = String(inn); // strength lives in the .film-dim gradient
        landEl.style.opacity = String(inn);
        landEl.style.transform = `translate3d(0,${(26 * (1 - inn)).toFixed(1)}px,0)`;
        landEl.inert = inn < 0.5;
        // each caption is centred on its stretch of the move: full within ±0.07 of it, gone by ±0.14
        const p = clamp(cur / MOVE);
        beatEls.forEach((b, j) => {
          const o = clamp((0.14 - Math.abs(p - (j + 1) / (beatEls.length + 1))) / 0.07);
          b.style.opacity = String(o);
          b.style.transform = `translate3d(0,${(18 * (1 - o)).toFixed(1)}px,0)`;
        });
        if (cur !== target || shown === -1) raf = requestAnimationFrame(tick);
      };
      const kick = () => (raf ||= requestAnimationFrame(tick));
      const ro = new ResizeObserver(() => (size(), kick()));
      ro.observe(cv);
      size();
      const poll = setInterval(() => shown === -1 && kick(), 120); // frames keep landing after the scroll settles
      addEventListener("scroll", kick, { passive: true });

      teardown = () => {
        alive = false;
        clearInterval(poll);
        cancelAnimationFrame(raf);
        ro.disconnect();
        removeEventListener("scroll", kick);
        for (const n of [open, landEl, shade, dim, ...beatEls]) n.removeAttribute("style");
        open.inert = landEl.inert = false;
        screen?.removeAttribute("data-on");
        teardown = () => {};
      };
    };
    setup();
    mq.addEventListener("change", setup);
    return () => {
      teardown();
      mq.removeEventListener("change", setup);
    };
  }, [frames]);

  return (
    <section
      ref={root}
      id="top"
      className="hero set"
      aria-labelledby="hero-h"
      style={{ "--film-h": `${Math.max(285, Math.round(100 + frames * 2.6))}svh` } as React.CSSProperties} // longer film, longer scroll
    >
      <div className="hero-stick">
        {frames > 0 && (
          <>
            {/* the first frame is a plain image, there before any script runs; the canvas paints over it */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(0)} alt="" decoding="async" fetchPriority="high" className="film-poster" />
            <canvas ref={canvas} aria-hidden className="film-canvas" />
            {tv && (
              <div
                aria-hidden
                className="film-tv"
                style={{ "--x": tv.box[0], "--y": tv.box[1], "--w": tv.box[2], "--h": tv.box[3] } as React.CSSProperties}
              >
                <p className="tv-title">
                  {letters(tv.title)}
                  <i className="tv-caret" />
                </p>
                <p className="tv-sub">{letters(tv.sub)}</p>
              </div>
            )}
            <div aria-hidden className="film-shade" />
            <div aria-hidden className="film-dim" />
          </>
        )}
        <div className="hero-open">{children}</div>
        {frames > 0 &&
          beats.map((b) => (
            <p key={b.line} className="film-beat">
              <span className="mono">{b.kicker}</span>
              {b.line}
            </p>
          ))}
        {frames > 0 && <div className="hero-land">{land}</div>}
      </div>
    </section>
  );
}
