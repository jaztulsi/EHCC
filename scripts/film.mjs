// Films the homepage opening with MiniMax H3 and edits it into film/film.mp4, the cut the hero scrubs.
// Shot 1 starts on the real aerial photo of campus and flies the drone toward the G building; shot 2 picks up from its
// frame and goes through a second-floor window into white; shot 3 comes out of that white into G-225 and finds the
// EHIC title on the TV, joined to shot 2 with a fade through white.
//
//   1. MINIMAX_API_KEY=... in .env.local (gitignored), and the aerial photo, cropped 16:9, at film/campus.jpg
//   2. node scripts/film.mjs                     -> film/shot-N.mp4 for each shot, then film/film.mp4
//      TAKES=2 node scripts/film.mjs             -> two takes of each missing shot (SHOT=N: just that one); rename the
//                                                   keeper to film/shot-N.mp4 and run again to edit
//   3. FRAMES=120 sh scripts/intro-frames.sh film/film.mp4   -> puts it on the homepage
//
// Shots already in film/ are kept: delete one to re-shoot it. About $0.13 per second at 2K, $1.30 a shot.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const KEY =
  process.env.MINIMAX_API_KEY ||
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8").match(/^MINIMAX_API_KEY=(.+)$/m)?.[1].trim() : undefined);
if (!KEY) throw new Error("Add MINIMAX_API_KEY=... to .env.local");

const API = "https://api.minimax.io/v2";
const TAKES = Number(process.env.TAKES || 1);
const FADE = 0.6; // seconds of fade through white between shots

const STYLE =
  "Photorealistic, cinematic, premium brand-film quality. Natural soft daylight, clean modern look with emerald green accents, " +
  "crisp fine detail, subtle filmic grain. One continuous take with no cuts: smooth, steady, gimbal-stabilized motion at constant speed. " +
  "No people, no faces, no hands, no logos, no watermarks, no warping or morphing, no camera shake.";

// `end`: where the edit stops using this shot, in seconds (default: all of it). Set per take, after looking at it.
// `chain`: the shot starts on the frame where the edit leaves the one before, and cuts straight on from it (no fade),
// so a good opening can be kept and only the part that went wrong re-shot.
const SHOTS = [
  {
    seconds: 10,
    end: 4.5, // the approach; this take then went for the third-floor window, so shot 2 takes over from here
    first: "film/campus.jpg",
    text:
      "Cinematic drone shot continuing from this aerial photo of Emerald High School in Dublin, California. Keep the photo's flat " +
      "overcast daylight exactly: grey sky, no sun, no hard shadows, no golden or sunset light. Keep every building exactly as " +
      "photographed. One continuous, evenly paced drone move with no cuts. [Push in] [Pedestal down] The drone descends toward the " +
      "nearer white three-story building with the tall glass atrium and green panels, staying well above the grey ground-floor " +
      "canopy. It levels off at second-floor height, directly above the canopy, and pushes straight toward the small square " +
      "second-floor window just left of the glass atrium until that window fills the frame. It slows, then passes through the glass " +
      "into a soft, cool, neutral white daylight glow. The final second is near-uniform soft white: no objects, no sun, no lens " +
      "flare, no landscape, no door, no reflections. No text anywhere.",
  },
  {
    seconds: 8,
    end: 7.6, // the frosted glass fills the frame; after this it sits on a minty tint instead of white
    chain: true,
    text:
      "Continuation of this drone shot of a white three-story school building with a tall glass atrium and green panels, in the " +
      "same flat overcast daylight: grey sky, no sun, no hard shadows. Keep the building exactly as it is. Left of the atrium are " +
      "two small windows, one above the other. [Pedestal down] [Push in] The drone descends past the upper window and levels off " +
      "at the LOWER one, just above the grey canopy roof and level with the lower tier of atrium glass, then pushes head-on into " +
      "it, smoothly and steadily. The canopy roof stays visible along the bottom of the frame until the window fills it. Never " +
      "approach the upper window. The glass is frosted milky white, nothing visible through it. The drone passes through the glass " +
      "into a soft, cool, neutral white glow. The final second is near-uniform soft white: no objects, no landscape, no " +
      "reflections, no lens flare. No text anywhere.",
  },
  {
    seconds: 10,
    end: 7.5, // the TV is head-on and still leaves the bottom band clear for the pitch here; later it fills the frame
    text:
      "The shot opens on soft, bright light, as if the camera has just flown through a window, and the light clears to reveal a real, " +
      "lived-in high school classroom on the second floor, room G-225, used by a hacking and robotics club. Natural and believable, " +
      "slightly messy, like a real school classroom on a weekday afternoon, not a futuristic set: ordinary school desks and chairs, " +
      "plain walls, ceiling light panels, daylight from the windows. On the desks the camera passes over: a sleek silver laptop in the " +
      "foreground and other open laptops with dark code editors on screen, Arduino boards on breadboards with jumper wires and small " +
      "red and green LEDs blinking, a small servo robot arm slowly moving, a soldering iron on its stand, a 3D printer printing a part, " +
      "a VR headset and a pair of smart glasses resting on a desk, laptop lids covered in hackathon stickers, lanyards, sticky notes, " +
      "a can of soda. The wall around the TV is covered in tech: pinned printouts of code and circuit schematics, a pegboard of " +
      "cables and tools, a whiteboard of system diagrams, all of their writing too small to read. " +
      "[Push in] The camera glides smoothly and low across the room, over the desks, toward a large flat-screen TV mounted on the front wall. The TV shows a deep " +
      'emerald green screen with the large, bold, white title "EHIC" in the center and, directly beneath it, a smaller line of white ' +
      'text reading "Emerald Hacking and Innovation Club". The camera slows and settles head-on and centered on the TV, the screen ' +
      "filling most of the frame, the text sharp and spelled exactly right. No people. No other readable text anywhere.",
  },
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

const film = async ({ seconds, first, text }, out) => {
  const content = [{ type: "text", text: `${text} ${STYLE}` }];
  if (first) {
    console.log(`${out}: starts on ${first}`);
    const url = `data:image/jpeg;base64,${fs.readFileSync(first).toString("base64")}`;
    content.push({ type: "image_url", image_url: { url }, role: "first_frame" });
  }
  const { task_id } = await call("/video_generation", {
    model: "MiniMax-H3",
    content,
    resolution: "2K",
    duration: seconds,
    ratio: first ? undefined : "16:9", // image-to-video takes its shape from the first frame
    generate_audio: false,
  });
  console.log(`${out}: rendering (task ${task_id})`);
  let t;
  do {
    await new Promise((r) => setTimeout(r, 10_000));
    // a dropped poll shouldn't throw away a paid render: keep asking
    t = (await call(`/query/video_generation/${task_id}`).catch(() => ({ task: { status: "running" } }))).task;
  } while (t.status === "queued" || t.status === "running");
  if (t.status !== "succeeded") throw new Error(`${out} ${t.status}: ${JSON.stringify(t.error)}`);
  fs.writeFileSync(out, Buffer.from(await (await fetch(t.content.url)).arrayBuffer()));
  console.log(`${out}: saved`);
};

fs.mkdirSync("film", { recursive: true });
const shot = (i) => `film/shot-${i + 1}.mp4`;
const only = process.env.SHOT && Number(process.env.SHOT) - 1; // SHOT=3: render just that one
const jobs = SHOTS.flatMap((s, i) => {
  if (fs.existsSync(shot(i)) || (only !== undefined && i !== only)) return [];
  if (s.chain) {
    // ponytail: a chained shot needs the shot before it on disk; render that one first
    if (!fs.existsSync(shot(i - 1))) return console.log(`${shot(i)}: waits for ${shot(i - 1)}, run again once it's kept`), [];
    s.first = `film/shot-${i + 1}-first.jpg`;
    const at = SHOTS[i - 1].end ?? 1e9; // no end: the very last frame
    execFileSync("ffmpeg", ["-v", "error", "-y", ...(SHOTS[i - 1].end ? ["-ss", String(at)] : ["-sseof", "-0.05"]),
      "-i", shot(i - 1), "-frames:v", "1", "-q:v", "2", s.first]);
  }
  return Array.from({ length: TAKES }, (_, k) => film(s, TAKES > 1 ? `film/shot-${i + 1}-take-${k + 1}.mp4` : shot(i)));
});
const results = await Promise.allSettled(jobs); // one failing render doesn't cancel the others
const failed = results.filter((r) => r.status === "rejected");
if (failed.length) {
  failed.forEach((r) => console.error(r.reason.message));
  process.exit(1);
}
if (TAKES > 1 && jobs.length) {
  console.log("takes are in film/: rename the keeper of each to film/shot-N.mp4, then run again to edit");
  process.exit(0);
}

// the edit: every shot trimmed, scaled to 1080p, and joined to the next with a fade through white (or cut, if chained)
const len = SHOTS.map(
  (s, i) => s.end ?? Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", shot(i)])),
);
const graph = SHOTS.map(
  (_, i) =>
    `[${i}:v]trim=0:${len[i]},setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,` +
    `setsar=1,fps=24,format=yuv420p,settb=AVTB[s${i}]`,
);
let prev = "s0";
let at = len[0];
for (let i = 1; i < SHOTS.length; i++) {
  if (SHOTS[i].chain) {
    graph.push(`[${prev}][s${i}]concat=n=2:v=1:a=0[x${i}]`);
    at += len[i];
  } else {
    graph.push(`[${prev}][s${i}]xfade=transition=fadewhite:duration=${FADE}:offset=${(at - FADE).toFixed(3)}[x${i}]`);
    at += len[i] - FADE;
  }
  prev = `x${i}`;
}
execFileSync("ffmpeg", [
  "-v", "error", "-y",
  ...SHOTS.flatMap((_, i) => ["-i", shot(i)]),
  "-filter_complex", graph.join(";"),
  "-map", `[${prev}]`, "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "film/film.mp4",
]);
console.log(`edit: film/film.mp4 (${at.toFixed(1)}s)`);
