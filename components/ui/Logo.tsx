import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CLUB } from "@/lib/data";

interface LogoProps {
  /** Show the wordmark beside the dragon mark. */
  withText?: boolean;
  size?: number;
  /** `dark` inverts the wordmark for use on the deep band. */
  tone?: "light" | "dark";
  className?: string;
  href?: string;
}

/** The club dragon mark on its own. */
export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={size}
      height={size}
      priority
      className={cn("shrink-0 select-none", className)}
    />
  );
}

/** Dragon mark plus wordmark, used in the navbar and footer. */
export function Logo({
  withText = true,
  size = 38,
  tone = "light",
  href = "/",
  className,
}: LogoProps) {
  const dark = tone === "dark";

  const content = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <LogoMark
        size={size}
        className="transition-transform duration-500 ease-apple group-hover:scale-[1.07] motion-reduce:transform-none"
      />
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-[17px] font-bold tracking-title",
              dark ? "text-bark-ink" : "text-silver"
            )}
          >
            {CLUB.shortName}
          </span>
          <span
            className={cn(
              "mt-1 hidden text-[9.5px] font-semibold uppercase tracking-[0.15em] sm:block",
              dark ? "text-bark-muted" : "text-muted"
            )}
          >
            Hacking &amp; Innovation
          </span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label={`${CLUB.shortName} home`} className="rounded-lg">
        {content}
      </Link>
    );
  }
  return content;
}
