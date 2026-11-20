# EHIC website

Site for the Emerald Hacking & Innovation Club (EHIC), Emerald High School, Dublin, CA. The look is a workbench in room G-225: warm paper, a green cutting mat, pencil sketches and keycaps, kept quiet enough to read as a professional site. Every page (home, courses, games) shares one design system, a light and a dark theme, and a small synthesized sound kit.

Stack: Next.js 14 (App Router), Tailwind, IBM Plex Sans and Mono, lucide icons, framer-motion on the courses and games pages.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, run this before deploying
npm start        # serve the build
```

Deploy with `vercel --prod`. The Vercel project is "ehcc-emerald" and the site is live at https://ehcc-emerald.vercel.app (set as `CLUB.url` in content/site.ts; link previews use app/opengraph-image.png).

## Routes

Two root layouts share the same nav, footer, tokens and sounds:

- `app/(site)/` is the homepage at `/`. Page styles: `styles/home.css`.
- `app/(classic)/` is `/courses` and `/games`. Page styles: `app/(classic)/globals.css`.

Old URLs redirect in `next.config.mjs` (`/about` goes to `/#about`, `/team` to `/#crew`, `/learn` to `/courses`, and so on). `app/sitemap.ts` lists `/`, `/courses`, `/games`.

## Design system

| File | What it holds |
| --- | --- |
| `styles/tokens.css` | Colour tokens for the light (workbench) and dark (after hours) themes, the cutting-mat green, radii, the one easing curve, the ruler signature, and the Konami terminal palette |
| `styles/base.css` | Tailwind layers and page basics |
| `styles/site.css` | Buttons (`.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-light`, `.btn-glass`), the nav and its ruler, the footer, toasts |
| `tailwind.config.ts` | Maps the tokens to Tailwind (`bg-surface`, `text-ink-2`, `bg-accent`, `bg-mat` ...). Old names like `navy-800` and `silver` are aliases |
| `app/fonts.ts` | IBM Plex Sans and Mono, and the script that applies a saved theme before paint |

Rules the design follows: one accent (the school emerald) used sparingly, weights 400 to 500, sentence case, no gradients or glows, icons from lucide at 16 to 18px with a 1.5 stroke, numbers in tabular figures, motion on one ease-out curve. The signature is the ruler: section labels sit on one, and the nav measures how far down the page you are while the club's gem walks along it.

Theme: the sun/moon button in the nav switches light and dark and remembers the choice; without one the site follows the system.

## Sounds

`lib/sound.ts` synthesizes every sound with Web Audio, so there are no audio files. Anything clickable makes a soft key tap; `data-sfx="flip|pop|on|off|stamp|print|success|error"` on an element picks a different sound and `data-sfx="none"` keeps it quiet. Code can call `play("success")` directly (the games and quizzes do). Sounds only answer something the visitor did, and the speaker button in the nav turns them off (remembered per browser).

## Editing content

Every word on the homepage lives in `content/site.ts`. Edit it and the site updates.

| Export | Controls |
| --- | --- |
| `CLUB` | Name, school, tagline, meeting days/time/room, Instagram, email, Discord link (blank hides the button), GitHub, membership form URL |
| `MEETING` | Countdown target: `days` (JS numbering, 0 = Sunday, so `[3, 4]` is Wed/Thu), `hour`, `minute`, `lengthMin`. Uses the visitor's local browser time |
| `MARQUEE` | The "On the bench" topics under the hero |
| `STORY` | The four "About" sketches |
| `WHAT_WE_DO` | The six drawers of the parts cabinet (`icon`: laptop, timer, branch, mic, flag, pin) |
| `REEL` | "Previously on EHIC" events list, newest first (`featured` gets the logo) |
| `UP_NEXT` | "Coming up" list next to the countdown |
| `PROJECTS` | Cards on the cutting mat (`href` makes a card a link; a `#` link becomes the dashed "pitch yours" card) |
| `STATS` | The first is the big figure next to the trophy, the rest sit beside it; they count up when scrolled into view |
| `CREW` | Officers: `id`, name, role, `sticker` (their team, on the badge), bio |
| `ADVISOR` | Faculty advisor name; adds a credit under the crew when set |
| `FAQS` | FAQ accordion |
| `INTERESTS` | Interest options in the badge form |

### Team photos

Drop `public/team/<id>.jpg` (or `.jpeg`, `.png`, `.webp`) where `<id>` matches an `id` in `CREW`, for example `public/team/shivani.jpg`. It shows up automatically. Without a photo the badge shows initials and "Photo soon".

## Motion

- Everything moves on one curve, `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), with short durations: 150ms for hovers and presses, 220ms for menus, 420ms for entrances.
- Entrances: any element with `data-enter` fades and rises 8px once, the first time it reaches the screen (`components/home/Stage.tsx`). Use `--i` for a 60ms stagger.
- The cartoon moments keep a stop-motion feel on purpose: the badge printer feeds and stamps on whole frames, confetti falls at 12 fps, the gem walks in 6px strides, and hovering an About sketch makes it boil.
- Nothing loops for decoration. The only things that keep moving are live: the countdown's split flaps and the "in session" dot.
- `prefers-reduced-motion` is honored: the film shows as a still, entrances and counters are instant, and the printer skips straight to the badge.

## Opening film (MiniMax)

The hero is a scroll-scrubbed drone film (`components/home/HeroFilm.tsx`): cut into stills and scrubbed by scroll while the hero pins. It starts on a real aerial photo of campus, flies through a second-floor window of the G building, comes out in G-225 and lands on the TV showing the EHIC title, where the pitch arrives. The title sits over the opening, and two captions tell the story on the way in. With no stills in `public/intro` the hero is just the headline, so the site works before the footage exists. Phones, short screens and reduced motion get the first frame as a still.

Make it with MiniMax H3 (needs ffmpeg, `brew install ffmpeg`, a MiniMax API key, and the aerial photo cropped 16:9 at `film/campus.jpg`):

```bash
echo "MINIMAX_API_KEY=your-key" >> .env.local
TAKES=2 node scripts/film.mjs
```

That renders two takes of each 2K shot side by side (about $0.13 a second) into `film/` (gitignored). Rename the keeper of each to `film/shot-N.mp4`, then run `node scripts/film.mjs` again: it trims the shots, joins them and writes `film/film.mp4`. Shots already in `film/` are kept: delete one to re-shoot it, or add `SHOT=N` to render just that one. The prompts, and where the edit stops using each shot (`end`), live at the top of `scripts/film.mjs`. A `chain` shot starts on the frame where the edit leaves the shot before it and cuts straight on, so a good opening can be kept and only the part that went wrong re-shot; the others join with a fade through white.

The film lands on the TV in G-225. Once its last frame is up, a coded screen (`.film-tv` in `styles/home.css`) takes over the TV, so the EHIC title animates and stays spelled right. Its box in that frame is the `tv` prop in `app/(site)/page.tsx`: re-measure it whenever the last shot changes.

Put the cut on the homepage:

```bash
FRAMES=120 sh scripts/intro-frames.sh film/film.mp4
```

Delete `public/intro` to turn the film off.

## Easter eggs

Both live in `components/home/Stage.tsx`.

- Konami code (up up down down left right left right b a): toggles terminal mode (`html.hacker`, palette in `styles/tokens.css`).
- Type "ship it" anywhere on the homepage: the club gem carries a parcel across the screen.

## components

| File | What it does |
| --- | --- |
| `site/SiteNav.tsx` | The nav on every page, its scroll ruler and walking gem, the mobile menu |
| `site/SiteFooter.tsx` | The footer on every page |
| `site/Toggles.tsx` | Theme and sound buttons, and the `Sfx` listener that wires clicks to the sound kit |
| `home/HeroFilm.tsx` | The scroll-scrubbed opening film, and the hero around it |
| `home/Countdown.tsx` | Next-meeting countdown on a split-flap board, from `MEETING` |
| `home/ProjectStrip.tsx` | Draggable project cards on the cutting mat, with rubber-banding and a spring snap |
| `home/BadgePrinter.tsx` | Crew badge printer, then hands off to the Google membership form; nothing typed leaves the browser |
| `home/Art.tsx` | The notebook sketches and the trophy (server-safe SVG) |
| `home/Stage.tsx` | Entrances, counters, easter eggs, toasts |
| `ui/*` | Button, Badge, PageHero, SectionHeader, Reveal, Logo, Icon for the courses and games pages |
