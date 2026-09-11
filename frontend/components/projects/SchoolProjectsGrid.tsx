"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { SchoolProject } from "@/lib/types";
import { SchoolProjectCard } from "./SchoolProjectCard";

export function SchoolProjectsGrid({ projects }: { projects: SchoolProject[] }) {
  const [active, setActive] = useState<string>("All");

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(active));

  return (
    <div>
      {technologies.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setActive(tech)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                active === tech
                  ? "border-[#818cf8] bg-[#818cf8]/15 text-[#c7d2fe]"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80",
              )}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <SchoolProjectCard key={`${project.code}-${project.title}`} project={project} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-white/50">
          No projects with this technology yet.
        </p>
      )}
    </div>
  );
}
