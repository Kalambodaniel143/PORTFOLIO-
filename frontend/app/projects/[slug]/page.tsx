import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubIcon,
} from "@/components/ui/icons";
import { getProject, getProjects } from "@/lib/api";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

const statusLabel: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  maintained: "Maintained",
};

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <section className="border-b border-border">
        <Container className="py-16 sm:py-20">
          <Link
            href="/projects"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.category}</Badge>
            <Badge variant="outline">
              {statusLabel[project.status] ?? project.status}
            </Badge>
            <span className="text-xs text-subtle">{project.year}</span>
          </div>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.github && (
              <ButtonLink href={project.links.github} variant="secondary" external>
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </ButtonLink>
            )}
            {project.links.live && (
              <ButtonLink href={project.links.live} variant="secondary" external>
                <ExternalLinkIcon className="h-4 w-4" />
                Live demo
              </ButtonLink>
            )}
            {project.links.docs && (
              <ButtonLink href={project.links.docs} variant="secondary" external>
                <ExternalLinkIcon className="h-4 w-4" />
                Documentation
              </ButtonLink>
            )}
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_260px]">
        <div className="order-2 lg:order-1">
          <CaseStudy project={project} />
        </div>

        <aside className="order-1 space-y-6 lg:order-2">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-subtle">Role</dt>
                <dd className="mt-0.5 text-foreground">{project.role}</dd>
              </div>
              <div>
                <dt className="text-subtle">Timeframe</dt>
                <dd className="mt-0.5 text-foreground">{project.year}</dd>
              </div>
              <div>
                <dt className="text-subtle">Technologies</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </Container>

      <section className="border-t border-border">
        <Container className="flex flex-col items-start gap-4 py-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-medium">See the other projects</p>
          <ButtonLink href="/projects">
            All projects
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        </Container>
      </section>
    </article>
  );
}
