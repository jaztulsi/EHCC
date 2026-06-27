import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Show the "EHCC" wordmark next to the badge. */
  withText?: boolean;
  /** Apply a gentle floating bob (use for decorative placements). */
  float?: boolean;
  size?: number;
  className?: string;
  href?: string;
}

/** The dragon-badge logo, used in the navbar, footer, and as decoration. */
export function Logo({ withText = true, float = false, size = 36, href = "/", className }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt="EHCC dragon badge logo"
        width={size}
        height={size}
        priority
        className={cn("drop-shadow-[0_0_8px_rgba(34,197,94,0.35)]", float && "animate-float")}
      />
      {withText && (
        <span className="font-mono text-lg font-bold tracking-tight text-silver">
          EH<span className="text-emerald">CC</span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="EHCC home" className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }
  return content;
}
