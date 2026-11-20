# EHIC website

Site for the Emerald Hacking & Innovation Club (EHIC), Emerald High School, Dublin, CA. The homepage is built in a stop-motion "Tabletop Studio" style: paper cutouts, clay, film grain, and everything moving at 12 frames per second.

Stack: Next.js 14 (App Router), Tailwind, a React Three Fiber clay scene in the hero, and a GSAP opening sequence.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, run this before deploying
npm start        # serve the build
```

Deploy with `vercel --prod`. The Vercel project is "ehcc" and the site is live at https://ehcc.vercel.app.

## Routes

Two root layouts, each with its own CSS:

- `app/(site)/` is the homepage at `/` (`layout.tsx`, `page.tsx`). Styles: `styles/stopmotion.css`.
- `app/(classic)/` is `/courses` and `/games`. Styles: `app/(classic)/globals.css`.

Old URLs redirect in `next.config.mjs` (`/about` goes to `/#about`, `/team` to `/#crew`, `/learn` to `/courses`, and so on). `app/sitemap.ts` lists `/`, `/courses`, `/games`.

## Editing content

Every word on the homepage lives in `content/site.ts`. Edit it and the site updates.

| Export | Controls |
| --- | --- |
| `CLUB` | Name, school, tagline, meeting days/time/room, Instagram, email, Discord link (blank hides the button), GitHub, membership form URL |
| `MEETING` | Countdown target: `days` (JS numbering, 0 = Sunday, so `[3, 4]` is Wed/Thu), `hour`, `minute`, `lengthMin`. Uses the visitor's local browser time |
| `MARQUEE` | Scrolling topic strip under the hero |
| `STORY` | The four "About" comic panels |
| `WHAT_WE_DO` | The six flip cards |
| `REEL` | "Previously on EHIC" events list, newest first (`featured` gets the logo) |
| `UP_NEXT` | "Coming up" list next to the countdown |
| `PROJECTS` | Cards on the film strip (`href` makes a card a link) |
| `STATS` | Trophy shelf numbers; they count up when scrolled into view |
| `CREW` | Officers: `id`, name, role, sticker, bio |
| `ADVISOR` | Faculty advisor name; adds a "Directed by" credit when set |
| `FAQS` | FAQ accordion |
| `INTERESTS` | Interest options in the badge form |
| `FUN_FACTS` | Facts shown when someone clicks the lightbulb |

### Team photos

Drop `public/team/<id>.jpg` (or `.jpeg`, `.png`, `.webp`) where `<id>` matches an `id` in `CREW`, for example `public/team/shivani.jpg`. It shows up automatically. Without a photo the card shows initials and "Photo soon".

## Motion and frame rate

The look comes from stepped motion: no easing, every pose holds until the next frame snaps in.

- `FPS` (12) and `FPS_SECONDARY` (8, for background cast, counters, confetti) are in `lib/motion/index.ts`.
- CSS reads the frame clock from `--fps` on `<html>`, set in `app/(site)/layout.tsx`. `--f` (in `styles/stopmotion.css`) is one frame. **Keep the `FPS` constant in the layout in sync with `lib/motion`**; the motion file is client-only, so the number is repeated.
- Animations use `steps()` / `step-end`, never smooth easing. In GSAP use `HOLD` (`steps(1)`) and set poses on whole frames.
- Entrances: any element with `data-enter` starts hidden and gets the class `.in` from `Director` when it scrolls into view (the hero's are revealed by `HeroIntro`). Use `--i` for stagger.
- Off-screen sections get `.off`, which pauses their CSS animations.
- The nav's pause button toggles `html.still`, which freezes all motion (accessibility).
- `prefers-reduced-motion` is honored: the layout adds `rm` to `<html>`, the intro is skipped, and counters, confetti, and the cursor are off.

## Opening film (MiniMax)

The hero is a scroll-scrubbed drone film (`components/stop/HeroFilm.tsx`): cut into stills and scrubbed by scroll while the hero pins. It starts on a real aerial photo of campus, flies through a second-floor window of the G building, comes out in G-225 and lands on the TV showing the EHIC title, where the pitch arrives. The title sits over the opening, and two captions tell the story on the way in. With no stills in `public/intro` the hero is just the title, so the site works before the footage exists. Phones, short screens and reduced motion get the first frame as a still.

Make it with MiniMax H3 (needs ffmpeg, `brew install ffmpeg`, a MiniMax API key, and the aerial photo cropped 16:9 at `film/campus.jpg`):

```bash
echo "MINIMAX_API_KEY=your-key" >> .env.local
TAKES=2 node scripts/film.mjs
```

That renders two takes of each 2K shot side by side (about $0.13 a second) into `film/` (gitignored). Rename the keeper of each to `film/shot-N.mp4`, then run `node scripts/film.mjs` again: it trims the shots, joins them and writes `film/film.mp4`. Shots already in `film/` are kept: delete one to re-shoot it, or add `SHOT=N` to render just that one. The prompts, and where the edit stops using each shot (`end`), live at the top of `scripts/film.mjs`. A `chain` shot starts on the frame where the edit leaves the shot before it and cuts straight on, so a good opening can be kept and only the part that went wrong re-shot; the others join with a fade through white.

The film lands on the TV in G-225. Once its last frame is up, a coded screen (`.film-tv` in `styles/stopmotion.css`) takes over the TV, so the EHIC title animates and stays spelled right. Its box in that frame is the `tv` prop in `app/(site)/page.tsx`: re-measure it whenever the last shot changes.

Put the cut on the homepage:

```bash
FRAMES=120 sh scripts/intro-frames.sh film/film.mp4
```

Delete `public/intro` to turn the film off.

## Easter eggs

All handled in `components/stop/Director.tsx`.

- Konami code (up up down down left right left right b a): toggles Hacker Mode (`html.hacker`).
- Type "ship it" anywhere: a rocket flies across.

## components/stop

| File | What it does |
| --- | --- |
| `Art.tsx` | Hand-drawn SVG doodles, story art, trophies, the paper hand (server-safe) |
| `BadgeForm.tsx` | Crew badge maker, then hands off to the Google membership form; nothing typed leaves the browser |
| `Chrome.tsx` | Paper cursor, scroll film strip, nav progress walker, pause-motion toggle |
| `Countdown.tsx` | Next-meeting countdown from `MEETING` |
| `Director.tsx` | Entrances, off-screen pausing, counters, card flips, easter eggs, toasts |
| `FilmReel.tsx` | Draggable project film strip with rubber-banding and a spring snap sampled at 12 fps |
| `HeroIntro.tsx` | GSAP opening shot: lamp on, letters placed, sticker slap |
| `HeroFilm.tsx` | The scroll-scrubbed opening film, and the hero around it |
