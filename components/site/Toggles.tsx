"use client";
import { useEffect, useState } from "react";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { installSfx, play, setSoundEnabled, soundEnabled } from "@/lib/sound";

/** Mounted once per layout: wires the page's clicks to the sound kit. */
export function Sfx() {
  useEffect(() => installSfx(), []);
  return null;
}

export function SoundToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    setOn(soundEnabled());
    const sync = (e: Event) => setOn((e as CustomEvent<boolean>).detail);
    addEventListener("ehic-sound", sync);
    return () => removeEventListener("ehic-sound", sync);
  }, []);
  return (
    <button
      type="button"
      className="tool"
      data-sfx="none"
      aria-pressed={on}
      title={on ? "Sound on" : "Sound off"}
      onClick={() => {
        setSoundEnabled(!on);
        if (!on) play("on");
      }}
    >
      <span className="sr-only">Interface sounds</span>
      {on ? <Volume2 strokeWidth={1.5} aria-hidden /> : <VolumeX strokeWidth={1.5} aria-hidden />}
    </button>
  );
}

const current = () =>
  (document.documentElement.dataset.theme as "light" | "dark" | undefined) ??
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  useEffect(() => setTheme(current()), []);
  return (
    <button
      type="button"
      className="tool"
      data-sfx="flip"
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      onClick={() => {
        const next = current() === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("ehic-theme", next);
        } catch {}
        setTheme(next);
      }}
    >
      <span className="sr-only">Switch theme</span>
      {theme === "dark" ? <Sun strokeWidth={1.5} aria-hidden /> : <Moon strokeWidth={1.5} aria-hidden />}
    </button>
  );
}
