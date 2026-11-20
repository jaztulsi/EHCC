// Films the homepage opening with MiniMax H3: four shots, each starting on the last frame of the one before,
// so together they play as one continuous camera move. Then cuts them into the stills the hero scrubs on scroll.
//
//   1. Put your key in .env.local (gitignored):   MINIMAX_API_KEY=...
//   2. node scripts/film.mjs
//
// Shots already in film/ are kept. To re-shoot one, delete film/shot-N.mp4 and every shot after it, then run again.
// Cost at 2K: about $0.13 per second of video, so 4 shots x 8s is about $4.20 a full pass.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const KEY =
  process.env.MINIMAX_API_KEY ??
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8").match(/^MINIMAX_API_KEY=(.+)$/m)?.[1].trim() : undefined);
if (!KEY) throw new Error("Add MINIMAX_API_KEY=... to .env.local");

const API = "https://api.minimax.io/v2";
const SECONDS = 8;

const STYLE =
  "Photorealistic, cinematic, premium brand-film quality. Shot on ARRI Alexa 35 with anamorphic lenses, natural motivated lighting, " +
  "a deep emerald and warm amber color grade, subtle filmic grain, shallow depth of field, crisp fine detail. One continuous take with no cuts: " +
  "smooth, steady, constant-speed camera motion like a motion-control rig. No people, no faces, no hands, no readable text, no logos, " +
  "no watermarks, no warping or morphing, no camera shake.";

const SHOTS = [
  // 1. Arrival: the title sits over this
  "Blue hour over a modern California public high school campus set against rolling golden hills. Clean contemporary two-story " +
    "buildings of glass and pale stone, palm trees and young oaks, empty courtyards, walkway lamps flickering on, the sky graded from " +
    "deep emerald-teal overhead to a thin band of gold on the horizon. [Pedestal down] [Push in] A high aerial camera descends slowly and " +
    "glides toward one building, where a single second-floor classroom window glows warm against the cooling dusk. The shot ends with " +
    "that lit window centered and filling the middle of the frame.",
  // 2. The room: "One room stays lit."
  "Continuing the same shot. [Push in] The camera moves smoothly through the glowing window into an after-hours high school classroom " +
    "that has become a workshop: desks pushed together into build stations, open laptops and external monitors glowing with code, a " +
    "whiteboard dense with system diagrams and arrows, a soldered circuit board under a desk lamp, coiled cables, a 3D-printed " +
    "prototype, sticky notes. Warm practical lamps mix with the cool emerald glow of the screens. [Truck left] The camera drifts slowly " +
    "past the build stations with gentle parallax and ends facing the front desk, where one laptop glows brighter than the rest.",
  // 3. The build: "Students here ship real things."
  "Continuing the same shot. [Push in] [Tilt down] The camera glides toward the front desk and tilts down over an open laptop whose " +
    "screen shows soft, unreadable lines of code in emerald on near-black, its light spilling across the keyboard, a notebook of " +
    "hand-drawn sketches, and a small circuit board beside it. The classroom behind falls into soft bokeh of lamps and monitors. The " +
    "shot ends close on the laptop screen, its emerald glow filling most of the frame.",
  // 4. The landing: "Pull up a desk." sits in the empty right third
  "Continuing the same shot. [Push in] The camera pushes into the glowing laptop screen until the emerald code dissolves into a deep, " +
    "abstract field of soft emerald light and slowly drifting points of light, like a city at night seen from far above. The motion " +
    "eases into a gentle, almost still float. The final composition is calm and dark: the light gathers in the left two-thirds, and the " +
    "right third of the frame is clean, dark, empty space.",
];

const call = async (path, body) => {
  const r = await fetch(API + path, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(`${r.status} ${JSON.stringify(j.error ?? j)}`);
  return j;
};

fs.mkdirSync("film", { recursive: true });
for (let i = 0; i < SHOTS.length; i++) {
  const out = `film/shot-${i + 1}.mp4`;
  if (fs.existsSync(out)) {
    console.log(`shot ${i + 1}: already filmed`);
    continue;
  }
  const content = [{ type: "text", text: `${SHOTS[i]} ${STYLE}` }];
  if (i > 0) {
    // start exactly where the last shot ended
    const still = `film/shot-${i}-last.jpg`;
    execFileSync("ffmpeg", ["-v", "error", "-y", "-sseof", "-0.3", "-i", `film/shot-${i}.mp4`, "-update", "1", "-q:v", "2", still]);
    const url = `data:image/jpeg;base64,${fs.readFileSync(still).toString("base64")}`;
    content.push({ type: "image_url", image_url: { url }, role: "first_frame" });
  }
  const { task_id } = await call("/video_generation", {
    model: "MiniMax-H3",
    content,
    resolution: "2K",
    duration: SECONDS,
    ratio: i ? undefined : "16:9", // image-to-video takes its shape from the first frame
    generate_audio: false,
  });
  console.log(`shot ${i + 1}: rendering (task ${task_id})`);
  let t;
  do {
    await new Promise((r) => setTimeout(r, 10_000));
    t = (await call(`/query/video_generation/${task_id}`)).task;
  } while (t.status === "queued" || t.status === "running");
  if (t.status !== "succeeded") throw new Error(`shot ${i + 1} ${t.status}: ${JSON.stringify(t.error)}`);
  fs.writeFileSync(out, Buffer.from(await (await fetch(t.content.url)).arrayBuffer()));
  console.log(`shot ${i + 1}: saved ${out}`);
}

execFileSync("sh", ["scripts/intro-frames.sh", ...SHOTS.map((_, i) => `film/shot-${i + 1}.mp4`)], { stdio: "inherit" });
