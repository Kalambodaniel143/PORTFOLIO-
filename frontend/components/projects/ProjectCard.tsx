import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/types";

const categoryGradient: Record<Project["category"], string> = {
  DevOps: "from-sky-500/20 via-indigo-500/10 to-transparent",
  AI: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
  Robotics: "from-emerald-500/20 via-teal-500/10 to-transparent",
  "Full-Stack": "from-amber-500/20 via-orange-500/10 to-transparent",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50"
    >
      <div
        className={`relative aspect-[16/10] w-full bg-gradient-to-br ${categoryGradient[project.category]}`}
      >
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-4xl font-semibold tracking-tight text-foreground/25">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute left-4 top-4">
          <Badge variant="accent">{project.category}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">
            {project.title}
          </h3>
          <ArrowUpRightIcon className="mt-1 h-4 w-4 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline">+{project.technologies.length - 4}</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
