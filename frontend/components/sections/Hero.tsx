import Image from "next/image";
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

const BADGE_TEXT = "OPEN TO NEW ROLES • DEVOPS · AI · ROBOTICS • ";

/** A slow-spinning circular label with a static center mark — a small badge of personality next to the portrait. */
function RotatingBadge() {
  return (
    <div className="relative h-24 w-24 sm:h-28 sm:w-28">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] text-foreground/60"
      >
        <path
          id="hero-badge-circle"
          fill="none"
          d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
        />
        <text fontSize="7.4" letterSpacing="0.5" fill="currentColor">
          <textPath href="#hero-badge-circle" startOffset="0%">
            {BADGE_TEXT}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-fg">
        <ArrowUpRightIcon className="h-4 w-4" />
      </span>
    </div>
  );
}

export function Hero() {
  const [firstName, lastName] = site.shortName.split(" ");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-accent-soft),transparent_70%)] opacity-70"
      />
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to internships & graduate roles — {site.location}
          </div>

          <h1 className="animate-rise leading-[0.9] tracking-tight">
            <span
              className="block text-6xl font-black uppercase text-transparent [-webkit-text-stroke:2px_var(--color-foreground)] sm:text-7xl"
            >
              {firstName}
            </span>
            <span className="block text-6xl font-black uppercase text-foreground sm:text-7xl">
              {lastName}
            </span>
          </h1>

          <p className="animate-rise max-w-lg text-lg leading-relaxed text-muted">
            <span className="font-medium text-foreground">{site.role}</span>{" "}
            building reliable, autonomous systems through{" "}
            <span className="text-accent">DevOps, AI &amp; Robotics</span>.
            Now starting a Master&apos;s in Artificial Intelligence in Paris.
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
          </div>
        </div>

        <div className="animate-rise mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="group relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--color-accent-soft),transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface-muted">
              <Image
                src="/daniel-kalambo.jpg"
                alt={site.name}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover grayscale contrast-[1.05] transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>

            <div className="absolute -top-6 -right-6 hidden sm:block">
              <RotatingBadge />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <nav
          aria-label="Jump to a section"
          className="animate-rise grid w-full grid-cols-1 gap-x-10 border-t border-border sm:grid-cols-2 lg:col-span-2"
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
