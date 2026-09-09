/** Tiny className joiner — no dependency needed for this small a project. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
