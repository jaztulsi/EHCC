import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Flag, GitBranch, Laptop, MapPin, Mic, Plus, Timer } from "lucide-react";
import { ADVISOR, CLUB, CREW, FAQS, MARQUEE, PROJECTS, REEL, STATS, STORY, UP_NEXT, WHAT_WE_DO } from "@/content/site";
import { Cup, StoryArt } from "@/components/home/Art";
import HeroFilm from "@/components/home/HeroFilm";
import Countdown from "@/components/home/Countdown";
import ProjectStrip from "@/components/home/ProjectStrip";
import BadgePrinter from "@/components/home/BadgePrinter";
import Stage from "@/components/home/Stage";

const css = (o: Record<string, string | number>) => o as CSSProperties;

const ICONS = { laptop: Laptop, timer: Timer, branch: GitBranch, mic: Mic, flag: Flag, pin: MapPin } as const;

/** Stills of the opening camera move, cut by scripts/intro-frames.sh. 0 = no film yet, the hero is just the copy. */
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

/** Section head: the label sits on a ruler, then the title. */
function Head({ id, no, name, title, lede }: { id: string; no: string; name: string; title: string; lede?: ReactNode }) {
  return (
    <header className="head">
      <p className="rule" data-enter>
        <span className="rule-no">{no}</span>
        <span>{name}</span>
        <span className="rule-ticks" aria-hidden />
      </p>
      <h2 id={id} className="h2" data-enter style={css({ "--i": 1 })}>
        {title}
      </h2>
      {lede && (
        <p className="lede" data-enter style={css({ "--i": 2 })}>
          {lede}
        </p>
      )}
    </header>
  );
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export default function Home() {
  const pics = teamPhotos();
  const frames = filmFrames();
  const [lead, ...rest] = STATS;

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <main id="main">
        {/* HERO: the drone flies from the campus aerial into G-225 */}
        <HeroFilm
          frames={frames}
          beats={[
            { kicker: "Emerald High School · Dublin, CA", line: "Where Dublin's builders meet" },
            { kicker: "Building G · second floor", line: "Students here ship real things" },
          ]}
          // the screen's box in public/intro's last frame, measured from its emerald pixels
          tv={{ box: [0.2212, 0.2144, 0.4738, 0.49], title: "EHIC", sub: "Emerald Hacking and Innovation Club" }}
          land={
            <>
              <div>
                <p className="hero-kicker">Room G-225 · {CLUB.meetingTime}</p>
                <p className="land-h">Pull up a desk</p>
                <p className="land-sub">No experience, no fee. {CLUB.meetingDays}</p>
              </div>
              <div className="hero-ctas">
                <a className="btn btn-light btn-lg" href="#join">
                  Join the club <ArrowRight aria-hidden />
                </a>
                <a className="btn btn-glass btn-lg" href="#about">
                  Read the story
                </a>
              </div>
            </>
          }
        >
          <div className="hero-copy">
            <p className="hero-kicker" data-enter>
              {CLUB.school} · {CLUB.city}
            </p>
            <h1 id="hero-h" className="hero-h1" data-enter style={css({ "--i": 1 })}>
              Show up with an idea. Leave with something that runs
            </h1>
            <p className="hero-sub" data-enter style={css({ "--i": 2 })}>
              The {CLUB.name} builds with code, data and AI. {CLUB.meetingDays} in G-225, no experience needed
            </p>
            <div className="hero-ctas" data-enter style={css({ "--i": 3 })}>
              <a className="btn btn-light btn-lg" href="#join">
                Join the club <ArrowRight aria-hidden />
              </a>
              <a className="btn btn-glass btn-lg" href="#projects">
                See what we build
              </a>
            </div>
          </div>
          {frames > 0 && (
            <a className="scroll-cue" href="#about" data-sfx="none">
              <ArrowDown aria-hidden strokeWidth={1.5} />
              Scroll to fly into G-225
            </a>
          )}
        </HeroFilm>

        {/* ON THE BENCH */}
        <div className="bench">
          <div className="wrap bench-in">
            <p className="bench-label">On the bench</p>
            <ul>
              {MARQUEE.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="section" aria-labelledby="about-h">
          <div className="wrap">
            <Head id="about-h" no="01" name="About" title="From one room to our own hackathon" />
            <ol className="story">
              {STORY.map((s, i) => (
                <li key={s.scene} className="panel" data-enter style={css({ "--i": i })}>
                  <div className="panel-art">
                    <StoryArt art={s.art} />
                  </div>
                  <p className="panel-no">{s.scene}</p>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="what" className="section section-top-0" aria-labelledby="what-h">
          <div className="wrap">
            <Head id="what-h" no="02" name="What we do" title="Six ways to get involved" lede="Every one of them is open to beginners" />
            <ul className="drawers">
              {WHAT_WE_DO.map((w, i) => {
                const Icon = ICONS[w.icon];
                return (
                  <li key={w.title} className="drawer" data-enter style={css({ "--i": i % 3 })}>
                    <div className="drawer-top">
                      <Icon aria-hidden strokeWidth={1.5} />
                      <span className="drawer-label">{w.kicker}</span>
                    </div>
                    <h3 className="h3">{w.title}</h3>
                    <p>{w.body}</p>
                    <span className="drawer-pull" aria-hidden />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="section section-top-0" aria-labelledby="events-h">
          <div className="wrap">
            <Head id="events-h" no="03" name="Events" title="Meetings, hackathons and one very big day" />
            <div className="events">
              <div className="events-side" data-enter>
                <Countdown />
                <h3 className="h4 mt-12">Coming up</h3>
                <ul className="upnext">
                  {UP_NEXT.map((u) => (
                    <li key={u.title}>
                      <span>{u.title}</span>
                      <span className="meta">{u.when}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-enter style={css({ "--i": 1 })}>
                <h3 className="h4">Previously on EHIC</h3>
                <ol className="timeline">
                  {REEL.map((r) => (
                    <li key={r.title} className={"featured" in r ? "tl tl-feature" : "tl"}>
                      <div className="tl-meta">
                        <span className="tl-tag">{r.tag}</span>
                        <span>{r.when}</span>
                      </div>
                      <div className="tl-body">
                        {"logo" in r && (
                          <div className="tl-logo">
                            <Image src={r.logo} alt="DublinHacx logo" width={638} height={424} />
                          </div>
                        )}
                        <div>
                          <h4 className="h3">{r.title}</h4>
                          <p>{r.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS, on the cutting mat */}
        <section id="projects" className="section mat" aria-labelledby="projects-h">
          <div className="wrap">
            <Head id="projects-h" no="04" name="Projects" title="Things we built" />
          </div>
          <ProjectStrip projects={PROJECTS} />
        </section>

        {/* WINS */}
        <section className="section" aria-labelledby="wins-h">
          <div className="wrap">
            <Head id="wins-h" no="05" name="Wins" title="Small club, loud shelf" />
            <div className="wins">
              <div className="win-lead" data-enter>
                <Cup />
                <div>
                  <p className="win-fig">
                    <span data-count={lead.value} data-prefix={"prefix" in lead ? lead.prefix : ""}>
                      {"prefix" in lead ? lead.prefix : ""}
                      {lead.value}
                    </span>
                  </p>
                  <p className="win-cap">{lead.label}</p>
                </div>
              </div>
              <dl className="win-list" data-enter style={css({ "--i": 1 })}>
                {rest.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd data-count={s.value}>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* CREW */}
        <section id="crew" className="section section-top-0" aria-labelledby="crew-h">
          <div className="wrap">
            <Head id="crew-h" no="06" name="Crew" title="The people who run it" />
            <ul className="crew">
              {CREW.map((c, i) => (
                <li key={c.id} data-enter style={css({ "--i": i % 4 })}>
                  <article className="idcard">
                    <span className="lanyard" aria-hidden />
                    <div className="id-band">
                      <span>EHIC crew</span>
                      <span>{c.sticker}</span>
                    </div>
                    <div className="id-photo">
                      {pics[c.id] ? (
                        <Image src={pics[c.id]} alt={`Portrait of ${c.name}`} fill sizes="96px" />
                      ) : (
                        <span className="id-initials" aria-hidden>
                          {initials(c.name)}
                        </span>
                      )}
                    </div>
                    <h3 className="id-name">{c.name}</h3>
                    <p className="id-role">{c.role}</p>
                    <p className="id-bio">{c.bio}</p>
                    {!pics[c.id] && <p className="id-soon">Photo soon</p>}
                  </article>
                </li>
              ))}
            </ul>
            {ADVISOR && (
              <p className="advisor" data-enter>
                Faculty advisor <b>{ADVISOR}</b>
              </p>
            )}
          </div>
        </section>

        {/* PARTNERS */}
        <section className="section section-top-0" aria-labelledby="partners-h">
          <div className="wrap">
            <Head id="partners-h" no="07" name="Friends" title="Friends of the club" />
            <ul className="partners" data-enter>
              <li className="partner">
                <span className="partner-school">{CLUB.school}</span>
              </li>
              <li className="partner partner-dark" role="img" aria-label="The AI Collective">
                {/* drawn wordmark; swap for their official file if they send one */}
                <svg viewBox="0 0 40 40" aria-hidden>
                  <path d="M31 9.5A15 15 0 1 0 31 30.5" />
                  <path d="M26.5 15A8.5 8.5 0 1 0 26.5 25" />
                </svg>
                <span>
                  The AI
                  <br />
                  Collective
                </span>
              </li>
              <li>
                <a className="partner partner-open" href={`mailto:${CLUB.email}?subject=Partnering%20with%20EHIC`}>
                  Partner with EHIC
                  <ArrowUpRight aria-hidden strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section section-top-0" aria-labelledby="faq-h">
          <div className="wrap faq-grid">
            <Head
              id="faq-h"
              no="08"
              name="FAQ"
              title="Before you walk in"
              lede={
                <>
                  Something else? Message{" "}
                  <a href={CLUB.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {CLUB.instagram}
                  </a>
                </>
              }
            />
            <div className="faq" data-enter>
              {FAQS.map((f) => (
                <details key={f.q} data-sfx="flip">
                  <summary>
                    {f.q}
                    <Plus aria-hidden strokeWidth={1.5} />
                  </summary>
                  <div className="faq-a">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN, back on the mat */}
        <section id="join" className="section mat" aria-labelledby="join-h">
          <div className="wrap join-grid">
            <div>
              <Head
                id="join-h"
                no="09"
                name="Join"
                title="Get your crew badge"
                lede="No experience, no fee. Print a badge here, finish the official form, then come by G-225"
              />
              <dl className="join-facts" data-enter style={css({ "--i": 3 })}>
                <div>
                  <dt>When</dt>
                  <dd>
                    {CLUB.meetingDays}, {CLUB.meetingTime}
                  </dd>
                </div>
                <div>
                  <dt>Where</dt>
                  <dd>
                    {CLUB.meetingRoom}, {CLUB.school}
                  </dd>
                </div>
                <div>
                  <dt>Say hi</dt>
                  <dd>
                    <a href={CLUB.instagramUrl} target="_blank" rel="noopener noreferrer">
                      {CLUB.instagram}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div data-enter style={css({ "--i": 1 })}>
              <BadgePrinter />
            </div>
          </div>
        </section>
      </main>
      <Stage />
    </>
  );
}
