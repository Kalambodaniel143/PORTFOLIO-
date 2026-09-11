import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/ui/icons";
import { site } from "@/lib/site";

const jumpLinks = [
  { number: "01", label: "About", href: "#about" },
  { number: "02", label: "Projects", href: "#projects" },
  { number: "03", label: "Experience", href: "#experience" },
  { number: "04", label: "Skills", href: "#skills" },
  { number: "05", label: "Contact", href: "#contact" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-accent-soft),transparent_70%)] opacity-70"
      />
      <Container className="flex flex-col items-start gap-8 py-24 sm:py-32">
        <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to internships & graduate roles — {site.location}
        </div>

        <h1 className="animate-rise max-w-4xl text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
          {site.name.split(" ").slice(0, 2).join(" ")} —{" "}
          <span className="text-muted">
            building reliable, autonomous systems through{" "}
          </span>
          <span className="text-accent">DevOps, AI &amp; Robotics</span>.
        </h1>

        <p className="animate-rise max-w-2xl text-lg leading-relaxed text-muted">
          {site.role} at Epitech, now starting a Master&apos;s in Artificial
          Intelligence in Paris. I work on infrastructure automation, autonomous
          robots and software that has to hold up under real load.
        </p>

        <div className="animate-rise flex flex-wrap items-center gap-3">
          <ButtonLink href="/projects" size="lg">
            View Projects
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
          <ButtonLink
            href={site.cvPath}
            variant="secondary"
            size="lg"
            external
          >
            <DownloadIcon className="h-4 w-4" />
            Download CV
          </ButtonLink>
          <div className="flex gap-2">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground hover:bg-surface-muted"
            >
              <GitHubIcon />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground hover:bg-surface-muted"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <nav
          aria-label="Jump to a section"
          className="animate-rise grid w-full max-w-2xl grid-cols-1 gap-x-10 border-t border-border sm:grid-cols-2"
        >
          {jumpLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 border-b border-border py-4 text-sm transition-colors hover:text-accent"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-subtle">
                  {item.number}
                </span>
                <span className="font-medium">{item.label}</span>
              </span>
              <ArrowUpRightIcon className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          ))}
        </nav>
      </Container>
    </section>
  );
}
