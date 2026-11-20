"use client";
// The workshop's sound kit. Everything is synthesised with Web Audio, so there are no files to load.
// Sounds only ever answer something the visitor did (a click, a toggle, a print), never play on their own.
// On by default at a polite volume; the speaker button in the nav turns them off and the choice is remembered.

export type Sfx = "tap" | "flip" | "on" | "off" | "stamp" | "print" | "success" | "error" | "pop" | "none";

const KEY = "ehic-sound";
let ctx: AudioContext | null = null;
let out: GainNode | null = null;
let noise: AudioBuffer | null = null;
let enabled: boolean | null = null;

export function soundEnabled() {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(KEY) !== "off";
    } catch {
      enabled = true;
    }
  }
  return enabled;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  window.dispatchEvent(new CustomEvent("ehic-sound", { detail: on }));
}

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    out = ctx.createGain();
    out.gain.value = 0.55;
    const comp = ctx.createDynamicsCompressor(); // keeps stacked sounds from clipping
    comp.threshold.value = -16;
    comp.ratio.value = 4;
    out.connect(comp).connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

const vary = (x: number, amt = 0.04) => x * (1 + (Math.random() * 2 - 1) * amt); // repeated clicks never sound identical

function envelope(g: AudioParam, t: number, peak: number, attack: number, decay: number) {
  g.setValueAtTime(0.0001, t);
  g.exponentialRampToValueAtTime(peak, t + attack);
  g.exponentialRampToValueAtTime(0.0001, t + attack + decay);
}

function tone(type: OscillatorType, f0: number, f1: number, t: number, dur: number, peak: number, attack = 0.004) {
  const c = ctx!;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  envelope(g.gain, t, peak, attack, dur);
  o.connect(g).connect(out!);
  o.start(t);
  o.stop(t + attack + dur + 0.02);
}

function burst(t: number, dur: number, peak: number, kind: BiquadFilterType, f0: number, f1 = f0, q = 1) {
  const c = ctx!;
  const s = c.createBufferSource();
  s.buffer = noise;
  const f = c.createBiquadFilter();
  f.type = kind;
  f.Q.value = q;
  f.frequency.setValueAtTime(f0, t);
  f.frequency.exponentialRampToValueAtTime(f1, t + dur);
  const g = c.createGain();
  envelope(g.gain, t, peak, 0.002, dur);
  s.connect(f).connect(g).connect(out!);
  s.start(t, Math.random() * 0.5);
  s.stop(t + dur + 0.05);
}

const kit: Record<Exclude<Sfx, "none">, (t: number) => void> = {
  // a mechanical key: a bright tick with a small body under it
  tap: (t) => {
    burst(t, 0.028, 0.22, "bandpass", vary(3600), vary(2600), 1.4);
    tone("triangle", vary(1300), 700, t, 0.035, 0.05);
  },
  // a card or flap turning over
  flip: (t) => {
    burst(t, 0.11, 0.14, "bandpass", 1100, 4800, 0.9);
    tone("sine", 210, 120, t + 0.05, 0.06, 0.05);
  },
  // a switch going on / off
  on: (t) => {
    tone("triangle", 660, 660, t, 0.05, 0.07);
    tone("triangle", 990, 990, t + 0.055, 0.08, 0.07);
  },
  off: (t) => {
    tone("triangle", 990, 990, t, 0.05, 0.06);
    tone("triangle", 620, 620, t + 0.055, 0.08, 0.06);
  },
  // a rubber stamp hitting the bench
  stamp: (t) => {
    tone("sine", 150, 42, t, 0.24, 0.5);
    burst(t, 0.07, 0.22, "lowpass", 1200, 300, 0.7);
  },
  // the badge printer: a stepping motor under a paper feed
  print: (t) => {
    const c = ctx!;
    const s = c.createBufferSource();
    s.buffer = noise;
    s.loop = true;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1700;
    f.Q.value = 1.6;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.04);
    g.gain.setValueAtTime(0.09, t + 0.62);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.72);
    const lfo = c.createOscillator();
    const depth = c.createGain();
    lfo.type = "square";
    lfo.frequency.value = 26;
    depth.gain.value = 0.05;
    lfo.connect(depth).connect(g.gain);
    s.connect(f).connect(g).connect(out!);
    s.start(t);
    s.stop(t + 0.75);
    lfo.start(t);
    lfo.stop(t + 0.75);
    for (let k = 0; k < 6; k++) burst(t + 0.05 + k * 0.11, 0.015, 0.08, "highpass", 5000, 5000, 0.7);
  },
  // two notes up: done, it worked
  success: (t) => {
    tone("sine", 1046.5, 1046.5, t, 0.32, 0.1);
    tone("sine", 2093, 2093, t, 0.12, 0.02);
    tone("sine", 1568, 1568, t + 0.09, 0.42, 0.1);
    tone("sine", 3136, 3136, t + 0.09, 0.14, 0.015);
  },
  // two notes down, soft: not quite
  error: (t) => {
    tone("triangle", 330, 320, t, 0.1, 0.08);
    tone("triangle", 247, 240, t + 0.1, 0.16, 0.08);
  },
  // something opens
  pop: (t) => tone("sine", 380, 920, t, 0.07, 0.1),
};

export function play(name: Sfx) {
  if (name === "none" || !soundEnabled()) return;
  const c = audio();
  if (!c) return;
  kit[name](c.currentTime + 0.005);
}

/** One listener for the whole page: anything clickable taps, [data-sfx] picks its own sound, data-sfx="none" stays quiet. */
export function installSfx() {
  const pick = (el: Element | null): Sfx | null => {
    if (!el) return null;
    const tagged = el.closest<HTMLElement>("[data-sfx]");
    if (tagged) return tagged.dataset.sfx as Sfx;
    if (el.closest("button, a[href], summary, [role='button'], label, select")) return "tap";
    return null;
  };
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    const s = pick(e.target as Element);
    if (s) play(s);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.repeat || (e.key !== "Enter" && e.key !== " ")) return;
    const t = e.target as Element;
    if (!t.matches?.("button, a[href], summary, [role='button']")) return;
    const s = pick(t);
    if (s) play(s);
  };
  const onStorage = (e: StorageEvent) => e.key === KEY && (enabled = e.newValue !== "off");
  addEventListener("pointerdown", onDown, { passive: true });
  addEventListener("keydown", onKey);
  addEventListener("storage", onStorage);
  return () => {
    removeEventListener("pointerdown", onDown);
    removeEventListener("keydown", onKey);
    removeEventListener("storage", onStorage);
  };
}
