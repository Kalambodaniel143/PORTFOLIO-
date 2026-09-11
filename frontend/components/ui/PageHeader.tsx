import type { ReactNode } from "react";
import { Container } from "./Container";

export function PageHeader({
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border">
      <Container className="py-16 sm:py-20">
        {(number || eyebrow) && (
          <div className="mb-3 flex items-center gap-3">
            {number && (
              <span className="font-mono text-sm text-accent/70">{number}</span>
            )}
            {number && eyebrow && <span className="h-px w-5 bg-border" />}
            {eyebrow && (
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
                {eyebrow}
              </p>
            )}
          </div>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
