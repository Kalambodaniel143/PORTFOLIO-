import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function ContactCTA() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,var(--color-accent-soft),transparent_70%)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Have a project, a role, or a robot that needs sorting out?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              I&apos;m open to internships, graduate roles and collaborations in
              DevOps, AI and robotics.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" size="lg">
                Get in touch
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={`mailto:${site.email}`}
                variant="secondary"
                size="lg"
                external
              >
                {site.email}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
