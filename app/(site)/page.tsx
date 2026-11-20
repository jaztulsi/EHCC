import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ADVISOR, CLUB, CREW, FAQS, MARQUEE, PROJECTS, REEL, STATS, STORY, UP_NEXT, WHAT_WE_DO } from "@/content/site";
import { Doodle, Hand, StoryArt, Trophy } from "@/components/stop/Art";
import { Cursor, FilmStrip, ProgressWalker, StillToggle } from "@/components/stop/Chrome";
import HeroFilm from "@/components/stop/HeroFilm";
import HeroIntro from "@/components/stop/HeroIntro";
import Director from "@/components/stop/Director";
import Countdown from "@/components/stop/Countdown";
import FilmReel from "@/components/stop/FilmReel";
import BadgeForm from "@/components/stop/BadgeForm";

const css = (o: Record<string, string | number>) => o as CSSProperties;
const TILT = [-1.5, 1.2, -0.8, 1.6, -1.1, 0.7, -1.3];

const NAV = [
  ["About", "#about"],
  ["What we do", "#what"],
  ["Events", "#events"],
  ["Projects", "#projects"],
  ["Crew", "#crew"],
  ["Courses", "/courses"],
  ["Games", "/games"],
] as const;

const LETTERS = [
  ["E", "m-felt", -4],
  ["H", "m-card", 3],
  ["I", "m-pcb", -2],
  ["C", "m-clay", 5],
] as const;

/** Stills of the opening camera move, cut by scripts/intro-frames.sh. 0 = no film yet, the hero is just the title. */
function filmFrames() {
  try {
    return fs.readdirSync(path.join(process.cwd(), "public/intro")).filter((f) => /^f-\d{3}\.jpg$/.test(f)).length;
  } catch {
    return 0;
  }
}

/** id → /team/<file>. Drop shivani.jpg into public/team and it shows up. */
function teamPhotos() {
  const out: Record<string, string> = {};
  try {
    for (const f of fs.readdirSync(path.join(process.cwd(), "public/team"))) {
      const m = f.match(/^(.+)\.(jpe?g|png|webp)$/i);
      if (m) out[m[1].toLowerCase()] = `/team/${f}`;
    }
  } catch {}
  return out;
}

function SceneHead({ id, scene, roll, kicker, title, lede }: { id: string; scene: string; roll: string; kicker: string; title: string; lede?: string }) {
  return (
    <header className="scene-head">
      <div className="clapper" data-enter aria-hidden>
        <div className="clap-stick" />
        <div className="clap-top" />
        <div className="clap-board mono">
          <span>Scene<b>{scene}</b></span>
          <span>Take<b>1</b></span>
          <span>Roll<b>{roll}</b></span>
        </div>
      </div>
      <div>
        <p className="mono" data-enter>{kicker}</p>
        <h2 id={id} className="h2 mt-3" data-enter style={css({ "--i": 1 })}>
          {title}
        </h2>
        {lede && (
          <p className="lede mt-5" data-enter style={css({ "--i": 2 })}>
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export default function Home() {
  const pics = teamPhotos();
  const frames = filmFrames();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="fx" aria-hidden>
        <div className="fx-grain" />
        <div className="fx-vignette" />
        <div className="fx-flicker" />
        <div className="fx-dust">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <FilmStrip />
      <Cursor />

      <header className="nav">
        <a href="#top" className="nav-brand">
          <Image src="/logo-mark.png" alt="" width={34} height={34} priority />
          EHIC
        </a>
        <nav className="nav-links" aria-label="Main">
          {NAV.map(([t, h]) => (
            <a key={h} href={h}>
              {t}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <StillToggle />
          <details className="nav-menu">
            <summary>Menu</summary>
            <nav className="nav-drop" aria-label="Main">
              {NAV.map(([t, h]) => (
                <a key={h} href={h}>
                  {t}
                </a>
              ))}
            </nav>
          </details>
          <a className="btn btn-coral" href="#join">
            Join
          </a>
        </div>
        <ProgressWalker />
      </header>

      <main id="main">
        {/* HERO */}
        <HeroFilm
          frames={frames}
          land={
            <>
              <p className="mono" style={{ color: "var(--sun)" }}>
                Scene 00 · You walk in
              </p>
              <p className="h2 mt-4">
                Pull up a <em>desk.</em>
              </p>
              <p className="lede mt-5">
                No experience. No fee. Every other Thursday at {CLUB.meetingTime}, in {CLUB.meetingRoom}.
              </p>
              <div className="hero-ctas mt-8">
                <a className="btn btn-coral" href="#join">
                  Join the crew <Arrow />
                </a>
                <a className="btn btn-paper" href="#about">
                  See the story
                </a>
              </div>
            </>
          }
        >
          <div className="hero-grid">
            <div>
              <p className="hero-sub mono" data-enter>
                {CLUB.school} · {CLUB.city} · Est. {CLUB.founded}
              </p>
              <h1 id="hero-h" className="ehic">
                <span className="sr-only">EHIC: {CLUB.name}</span>
                {LETTERS.map(([l, m, t], i) => (
                  <span key={l} className="L" data-l={l} aria-hidden style={css({ "--tilt": `${t}deg`, "--i": i })}>
                    <span className={`glyph ${m}`}>{l}</span>
                  </span>
                ))}
              </h1>
              <p className="sticker mono" data-enter style={css({ "--tilt": "-4deg" })}>
                {CLUB.tagline}
              </p>
              <p className="hero-tag mt-6" data-enter style={css({ "--i": 1 })}>
                {CLUB.name}
              </p>
              <p className="lede" data-enter style={css({ "--i": 2 })}>
                {CLUB.description}
              </p>
              <div className="hero-ctas mt-9" data-enter style={css({ "--i": 3 })}>
                <a className="btn btn-coral" href="#join">
                  Join the Club <Arrow />
                </a>
                <a className="btn btn-paper" href="#projects">
                  See What We Build
                </a>
              </div>
            </div>
          </div>
          <a className="scroll-cue mono" href="#about">
            <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v15M6 13l6 6 6-6" />
            </svg>
            {frames ? "Scroll to roll camera" : "Scroll"}
          </a>
          <div className="lamp-shade" aria-hidden />
          <Hand />
          <HeroIntro />
        </HeroFilm>

        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="section desk torn" aria-labelledby="about-h">
          <div className="wrap">
            <SceneHead id="about-h" scene="01" roll="About" kicker="The story so far" title="Four panels. One club." />
            <ol className="board">
              {STORY.map((s, i) => (
                <li key={s.scene} className="panel" data-enter style={css({ "--i": i, "--tilt": `${TILT[i]}deg` })}>
                  <div className="panel-art">
                    <StoryArt art={s.art} />
                  </div>
                  <span className="panel-cap mono">Panel {s.scene}</span>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="what" className="section set set-700 torn" aria-labelledby="what-h">
          <div className="wrap">
            <SceneHead id="what-h" scene="02" roll="Crafts" kicker="What we do" title="Six ways in." lede="Hover or tap a card to flip it." />
            <ul className="cards">
              {WHAT_WE_DO.map((w, i) => (
                <li key={w.title} data-enter style={css({ "--i": i % 3 })}>
                  <div className="flip" role="button" tabIndex={0} aria-pressed="false" style={css({ "--tilt": `${TILT[i]}deg` })}>
                    <div className="flip-in">
                      <div className={`face p-${w.paper}`}>
                        <span className="tape" aria-hidden />
                        <Doodle i={i} />
                        <p className="mono mt-4">{w.kicker}</p>
                        <h3 className="h3">{w.title}</h3>
                        <p className="flip-hint mono">Flip it ↻</p>
                      </div>
                      <div className="face face-back">
                        <p className="mono mb-3">{w.title}</p>
                        <p>{w.body}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="section desk torn" aria-labelledby="events-h">
          <div className="wrap">
            <SceneHead id="events-h" scene="03" roll="Events" kicker="Previously on EHIC" title="Meetings, hackathons, and one very big day." />
            <div className="events-grid">
              <div data-enter>
                <Countdown />
                <h3 className="h3 mt-12">Coming up</h3>
                <ul className="upnext">
                  {UP_NEXT.map((u) => (
                    <li key={u.title}>
                      <span>{u.title}</span>
                      <span className="mono">{u.when}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reel" data-enter style={css({ "--i": 1 })}>
                <ol>
                  {REEL.map((r) =>
                    "featured" in r ? (
                      <li key={r.title} className="shot shot-feature">
                        <div className="logo">
                          <Image src={r.logo} alt="DublinHacx logo" width={638} height={424} />
                        </div>
                        <div>
                          <div className="shot-meta">
                            <span className="chip mono">{r.tag}</span>
                            <span className="mono">{r.when}</span>
                          </div>
                          <h3 className="h3">{r.title}</h3>
                          <p className="mt-2">{r.body}</p>
                        </div>
                      </li>
                    ) : (
                      <li key={r.title} className="shot">
                        <div className="shot-meta">
                          <span className="chip mono">{r.tag}</span>
                          <span className="mono">{r.when}</span>
                        </div>
                        <h3 className="h3">{r.title}</h3>
                        <p className="mt-2">{r.body}</p>
                      </li>
                    )
                  )}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section darkroom torn" aria-labelledby="projects-h">
          <div className="wrap">
            <SceneHead id="projects-h" scene="04" roll="Projects" kicker="Now showing" title="Things we built." lede="Grab the film and throw it." />
          </div>
          <FilmReel projects={PROJECTS} />
        </section>

        {/* WINS */}
        <section className="section set torn" aria-labelledby="wins-h">
          <div className="wrap">
            <SceneHead id="wins-h" scene="05" roll="Wins" kicker="Trophy shelf" title="Small club. Loud shelf." />
            <ul className="shelf">
              {STATS.map((s, i) => {
                const pre = "prefix" in s ? s.prefix : "";
                return (
                  <li key={s.label} className="trophy" data-enter style={css({ "--i": i % 3 })}>
                    <Trophy kind={s.trophy} />
                    <b data-count={s.value} data-prefix={pre}>
                      {pre}
                      {s.value}
                    </b>
                    <span>{s.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CREW */}
        <section id="crew" className="section desk torn" aria-labelledby="crew-h">
          <div className="wrap">
            <SceneHead id="crew-h" scene="06" roll="Crew" kicker="Cast & crew" title="The people behind the camera." />
            <ul className="crew">
              {CREW.map((c, i) => (
                <li key={c.id} data-enter style={css({ "--i": i % 3 })}>
                  <article className="cutout" style={css({ "--tilt": `${TILT[i]}deg` })}>
                    <span className="tape" aria-hidden />
                    <div className="porthole">
                      {pics[c.id] ? (
                        <Image src={pics[c.id]} alt={`Portrait of ${c.name}`} fill sizes="168px" />
                      ) : (
                        <>
                          <span className="initials" aria-hidden>
                            {c.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")}
                          </span>
                          <span className="soon mono">Photo soon</span>
                        </>
                      )}
                    </div>
                    <h3 className="h3">{c.name}</h3>
                    <p className="role mono">
                      {c.role} · {c.sticker}
                    </p>
                    <p>{c.bio}</p>
                  </article>
                </li>
              ))}
            </ul>
            {ADVISOR && (
              <p className="mt-20 text-center" data-enter>
                <span className="mono block">Directed by</span>
                <span className="h2 block">{ADVISOR}</span>
              </p>
            )}
          </div>
        </section>

        {/* PARTNERS */}
        <section className="section set set-700 torn" aria-labelledby="partners-h">
          <div className="wrap">
            <SceneHead id="partners-h" scene="07" roll="Friends" kicker="Hung on the line" title="Friends of the club." />
            <div className="line" data-enter>
              <svg className="rope" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden>
                <path d="M0 8 Q500 64 1000 8" fill="none" stroke="#C89A5E" strokeWidth="5" strokeDasharray="16 5" />
              </svg>
              <ul className="pegs">
                <li className="peg" style={css({ "--i": 0 })}>
                  <span className="clothespin" aria-hidden />
                  <div className="peg-card">{CLUB.school}</div>
                </li>
                <li className="peg" style={css({ "--i": 1 })}>
                  <span className="clothespin" aria-hidden />
                  {/* ponytail: drawn wordmark; drop the official file in /public and swap in an <Image> if they send one */}
                  <div className="peg-card dark aic" role="img" aria-label="The AI Collective">
                    <svg viewBox="0 0 40 40" aria-hidden>
                      <path d="M31 9.5A15 15 0 1 0 31 30.5" />
                      <path d="M26.5 15A8.5 8.5 0 1 0 26.5 25" />
                    </svg>
                    <span>
                      The AI
                      <br />
                      Collective
                    </span>
                  </div>
                </li>
                {[2, 3].map((i) => (
                  <li key={i} className="peg" style={css({ "--i": i })}>
                    <span className="clothespin" aria-hidden />
                    <a className="peg-card empty" href={`mailto:${CLUB.email}?subject=Partnering%20with%20EHIC`}>
                      Your logo here →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section desk torn" aria-labelledby="faq-h">
          <div className="wrap">
            <SceneHead id="faq-h" scene="08" roll="FAQ" kicker="Questions" title="Before you walk in." />
            <div className="faq" data-enter>
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>
                    {f.q}
                    <i aria-hidden>+</i>
                  </summary>
                  <div className="flap">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN */}
        <section id="join" className="section set torn" aria-labelledby="join-h">
          <div className="wrap join-grid">
            <div>
              <SceneHead
                id="join-h"
                scene="09"
                roll="Join"
                kicker="Casting call"
                title="Get your crew badge."
                lede={`No experience, no fee. Print a badge, finish the official form, then come by ${CLUB.meetingRoom}.`}
              />
              <dl className="grid gap-5" data-enter>
                <div>
                  <dt className="mono" style={{ color: "var(--mint-200)" }}>When</dt>
                  <dd className="h3">
                    {CLUB.meetingDays}, {CLUB.meetingTime}
                  </dd>
                </div>
                <div>
                  <dt className="mono" style={{ color: "var(--mint-200)" }}>Where</dt>
                  <dd className="h3">
                    {CLUB.meetingRoom}, {CLUB.school}
                  </dd>
                </div>
                <div>
                  <dt className="mono" style={{ color: "var(--mint-200)" }}>Say hi</dt>
                  <dd className="h3">
                    <a className="underline" href={CLUB.instagramUrl} target="_blank" rel="noopener noreferrer">
                      {CLUB.instagram}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div data-enter style={css({ "--i": 1 })}>
              <BadgeForm />
            </div>
          </div>
        </section>
      </main>

      {/* END CREDITS */}
      <footer className="credits section">
        <div className="wrap">
          <p className="mono">End credits</p>
          <div className="roll-window mt-8">
            <div className="roll">
              <dl>
                <div>
                  <dt className="mono">A production of</dt>
                  <dd>{CLUB.name}</dd>
                </div>
                {CREW.map((c) => (
                  <div key={c.id}>
                    <dt className="mono">{c.role}</dt>
                    <dd>{c.name}</dd>
                  </div>
                ))}
                <div>
                  <dt className="mono">Filmed on location</dt>
                  <dd>
                    {CLUB.meetingRoom}
                    <small>
                      {CLUB.school}, {CLUB.city}
                    </small>
                  </dd>
                </div>
                <div>
                  <dt className="mono">Frame rate</dt>
                  <dd>
                    12 fps<small>On purpose.</small>
                  </dd>
                </div>
                <div>
                  <dt className="mono">Special thanks</dt>
                  <dd>
                    Every member who showed up<small>and the snack fund</small>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <nav className="end-links" aria-label="Footer">
            <a href={CLUB.instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={`mailto:${CLUB.email}`}>Email</a>
            <a href={CLUB.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="/courses">Courses</a>
            <a href="/games">Games</a>
            <a href={CLUB.joinFormUrl} target="_blank" rel="noopener noreferrer">
              Membership form
            </a>
          </nav>
          <p className="mono mt-10 opacity-70">
            © {new Date().getFullYear()} {CLUB.shortName} · {CLUB.school}
          </p>
        </div>
      </footer>
      <Director />
    </>
  );
}
