import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-lg leading-relaxed text-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
