# EHIC, Emerald Hacking & Innovation Club

The official website for the **Emerald Hacking & Innovation Club** at Emerald High School, Dublin CA.

> Think. Build. Elevate.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

If `npm install` fails with a TLS error, your network is filtering the npm
registry. Install through a mirror instead:

```bash
npm install --registry=https://registry.npmmirror.com
```

## Pages

| Route       | What's there |
|-------------|--------------|
| `/`         | Parallax hero, count-up stats, branch cards, scroll-linked approach rail, featured events, closing call to action |
| `/about`    | Club story, branches, leadership, achievements timeline |
| `/events`   | Filtered events, featured banner, guest-speaker spotlights |
| `/projects` | Category-filtered project grid, pinned featured cards |
| `/learn`    | Workshops, in-browser JS code playground, roadmaps, resource library, concept cards |
| `/games`    | Four games: Code Breaker (typing), Binary Quiz, Debug the Code, CS Trivia |
| `/courses`  | Course platform: 20 courses, lessons, quizzes, progress, certificates |
| `/team`     | Leadership and full member roster |
| `/join`     | Value props, membership form link, FAQ accordion |

## Project structure

```
app/                 Next.js routes, metadata, robots, sitemap
components/
  ui/                Logo, Button, Badge, Reveal, SectionHeader, StatCounter, Timeline, Icon, PageHero
  layout/            Navbar, Footer, PageTransition
  cards/             Event, Project, TeamMember, Workshop, Concept cards
  home/              Hero, Approach
  events/ projects/ learn/ join/ games/ course/   page-specific components
lib/
  data.ts            All static content (edit here to update the site)
  courses.ts         Course and lesson content
  types.ts           Shared TypeScript types
  utils.ts           cn() helper
  useLocalStorage.ts SSR-safe persisted state
public/logo-mark.png Dragon mark, used in the navbar, footer, favicon, and hero
public/logo.png      Full dragon lockup with wordmark
```

## Design system

Defined in `tailwind.config.ts` and `app/globals.css`.

**Surfaces.** The page is never flat white. A sage-tinted canvas sits at the
base, `band-warm` and `band-cool` alternate behind sections, white `.surface`
cards float above, and `band-dark` anchors the approach section and footer.

- Canvas: `canvas`, `canvas-warm`, `canvas-cool`
- Cards: `.surface` (white, hairline, inner highlight)
- Deep band: `bark`, `bark-soft`, `bark-line`, `bark-ink`, `bark-muted`
- Legacy aliases `navy-950/900/800/700` remap onto the above, so older markup
  re-themes from the config without edits.

**Colour.** The accent is sampled directly off the dragon mark: `emerald`
(`#2b6a45`), `emerald-bright` (`#1a422d`), `emerald-circuit` (`#55a969`).
`clay`, `lagoon`, and `iris` exist only to colour-code event types.

**Type.** The sans stack leads with `-apple-system`, so Apple hardware renders
SF Pro and everything else falls back to Inter. Display sizes use tight
tracking (`tracking-display`), body text stays optically relaxed.

**Materials.** `.material-chrome` is a translucent, saturation-boosted surface
used by the navbar so content tints it while scrolling underneath.

**Motion.** Transitions run on `ease-apple`
(`cubic-bezier(0.32, 0.72, 0, 1)`). Scroll entrances are springs via
`<Reveal>`, not duration curves. `.card-lift` handles hover elevation.

## Notes

- No backend. All content is static in `lib/data.ts` and `lib/courses.ts`.
- The code playground runs user JavaScript in-browser via a sandboxed
  `Function` with an injected `console`.
- Course progress, profiles, and game scores persist in `localStorage`.
- Every animation respects `prefers-reduced-motion`.
- The courses subdomain check accepts the `ehic-`, `hic-`, and legacy `ehcc-`
  prefixes so existing deployments keep working.
