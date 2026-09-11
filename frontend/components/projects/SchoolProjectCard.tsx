import { Badge } from "@/components/ui/Badge";
import { GitHubIcon } from "@/components/ui/icons";
import type { SchoolProject } from "@/lib/types";

export function SchoolProjectCard({ project }: { project: SchoolProject }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          {project.code && (
            <p className="font-mono text-xs text-subtle">{project.code}</p>
          )}
          <h3 className="mt-0.5 text-base font-semibold tracking-tight">
            {project.title}
          </h3>
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="shrink-0 text-subtle transition-colors hover:text-foreground"
          >
            <GitHubIcon className="h-[18px] w-[18px]" />
          </a>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.pitch}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}
