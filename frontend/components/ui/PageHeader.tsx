import type { ReactNode } from "react";
import { Container } from "./Container";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border">
      <Container className="py-16 sm:py-20">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-accent">
            {eyebrow}
          </p>
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
