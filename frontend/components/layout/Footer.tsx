import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="text-sm font-semibold tracking-tight">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {site.positioning}
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </Container>

      <Container className="border-t border-border py-6">
        <p className="text-xs text-subtle">
          © {year} {site.name}. Built with Next.js, Django and Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
