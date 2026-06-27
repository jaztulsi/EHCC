# EHCC — EHS Hacking & Coding Club

The official website for the **EHS Hacking & Coding Club** at Emerald High School, Dublin CA.

> `// Think. // Build. // Elevate.`

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Dark navy + emerald, circuit-board aesthetic, fully interactive — including four playable browser games.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Pages

| Route       | What's there |
|-------------|--------------|
| `/`         | Animated particle hero, typing headline, count-up stats, flip-card "What We Do", featured projects & events, mission |
| `/about`    | Club story, six branches, leadership, achievements timeline |
| `/events`   | Tab-filtered events, featured banner, guest-speaker spotlights |
| `/projects` | Category-filtered project grid, pinned featured cards |
| `/learn`    | Workshops, **in-browser JS code playground**, interactive roadmaps, resource library, concept flip-cards |
| `/games`    | Four games: Code Breaker (typing), Binary Quiz, Debug the Code, CS Trivia |
| `/team`     | Leadership + full member roster |
| `/join`     | Value props, interactive interest form with success state, FAQ accordion |

## Project structure

```
app/                 Next.js routes + metadata, robots, sitemap
components/
  ui/                Logo, Button, Badge, Reveal, SectionHeader, StatCounter, Timeline, Icon, PageHero
  layout/            Navbar, Footer, PageTransition
  effects/           CircuitBackground, ParticleField (custom canvas)
  cards/             Event, Project, TeamMember, Workshop, Flip, Concept cards
  home/ events/ projects/ learn/ join/ games/   page-specific components
lib/
  data.ts            All static content (edit here to update the site)
  types.ts           Shared TypeScript types
  utils.ts           cn() helper
  useLocalStorage.ts SSR-safe persisted state (typing leaderboard)
public/logo.svg      Dragon-badge logo
```

## Design system

Defined in `tailwind.config.ts`:

- **Backgrounds**: `navy-950/900/800/700`
- **Accent**: `emerald` (`#22c55e`), `emerald-bright` (`#4ade80`), `emerald-circuit`
- **Text**: `silver`, `muted`
- **Fonts**: Inter (body) + JetBrains Mono (code/accents)
- **Effects**: `shadow-glow*`, `bg-circuit-grid`, shimmer/float/blink animations

## Notes

- No backend — all content is static in `lib/data.ts`; the join form is a client-side demo.
- The code playground runs user JavaScript in-browser via a sandboxed `Function` with an injected `console`.
- Game scores (typing leaderboard) persist in `localStorage`.
- Respects `prefers-reduced-motion` in the particle field.
