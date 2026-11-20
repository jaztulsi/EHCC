import Image from "next/image";
import { CLUB } from "@/content/site";

const EXPLORE = [
  ["About", "/#about"],
  ["Events", "/#events"],
  ["Projects", "/#projects"],
  ["Crew", "/#crew"],
  ["FAQ", "/#faq"],
] as const;

const BUILD = [
  ["Courses", "/courses"],
  ["Curriculum", "/courses/curriculum"],
  ["Games", "/games"],
  ["Join the club", "/#join"],
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-foot">
      <div className="site-foot-in">
        <div className="foot-brand">
          <a href="/" className="brand brand-lg" aria-label="EHIC home">
            <Image src="/logo-mark.png" alt="" width={40} height={40} />
            <span>EHIC</span>
          </a>
          <p className="foot-tag">{CLUB.tagline}</p>
          <p className="foot-meet">
            {CLUB.meetingDays}, {CLUB.meetingTime}
            <br />
            {CLUB.meetingRoom}, {CLUB.school}
          </p>
        </div>
        <nav className="foot-col" aria-label="Explore">
          <h2>Explore</h2>
          {EXPLORE.map(([t, h]) => (
            <a key={h} href={h}>
              {t}
            </a>
          ))}
        </nav>
        <nav className="foot-col" aria-label="Build">
          <h2>Build</h2>
          {BUILD.map(([t, h]) => (
            <a key={h} href={h}>
              {t}
            </a>
          ))}
        </nav>
        <nav className="foot-col" aria-label="Contact">
          <h2>Say hi</h2>
          <a href={CLUB.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram {CLUB.instagram}
          </a>
          <a href={`mailto:${CLUB.email}`}>Email</a>
          <a href={CLUB.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {CLUB.discordUrl && (
            <a href={CLUB.discordUrl} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          )}
        </nav>
      </div>
      <div className="site-foot-base">
        <p>
          © {year} {CLUB.name} · {CLUB.city}
        </p>
        <p>Made in G-225</p>
      </div>
    </footer>
  );
}
