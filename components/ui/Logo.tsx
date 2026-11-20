import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CLUB } from "@/lib/data";

interface LogoProps {
  withText?: boolean;
  size?: number;
  /** `dark` for the cutting-mat bands. */
  tone?: "light" | "dark";
  className?: string;
  href?: string;
}

/** The club dragon mark on its own. */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return <Image src="/logo-mark.png" alt="" width={size} height={size} priority className={cn("shrink-0 select-none", className)} />;
}

/** Dragon mark plus the wordmark. */
export function Logo({ withText = true, size = 28, tone = "light", href = "/", className }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {withText && (
        <span className={cn("text-[18px] font-semibold leading-none tracking-title", tone === "dark" ? "text-mat-text" : "text-ink")}>
          {CLUB.shortName}
        </span>
      )}
    </span>
  );
  if (!href) return content;
  return (
    <Link href={href} aria-label={`${CLUB.shortName} home`} className="rounded-md">
      {content}
    </Link>
  );
}
