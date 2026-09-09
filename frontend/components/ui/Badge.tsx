import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}) {
  const styles = {
    default: "bg-surface-muted text-muted",
    accent: "bg-accent-soft text-accent",
    outline: "border border-border text-muted",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        styles,
        className,
      )}
    >
      {children}
    </span>
  );
}
