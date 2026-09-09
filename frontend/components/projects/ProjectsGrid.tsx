"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { Project, ProjectCategory } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

const FILTERS: Array<ProjectCategory | "All"> = [
  "All",
  "DevOps",
  "AI",
  "Robotics",
  "Full-Stack",
];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");

  const available = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return FILTERS.filter((f) => f === "All" || set.has(f));
  }, [projects]);

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div>
      {available.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {available.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                active === filter
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
