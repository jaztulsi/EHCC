// Tiny classname joiner — keeps us dependency-free (no clsx/tailwind-merge needed).
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
