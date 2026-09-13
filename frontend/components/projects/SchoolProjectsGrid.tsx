"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { SchoolProject } from "@/lib/types";
import { SchoolProjectCard } from "./SchoolProjectCard";

function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-white/35">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              active === option
                ? "border-[#818cf8] bg-[#818cf8]/15 text-[#c7d2fe]"
                : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SchoolProjectsGrid({ projects }: { projects: SchoolProject[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTech, setActiveTech] = useState<string>("All");

  // "Category" groups projects the way Epitech itself does: by module
  // (e.g. every G-DOP-* project is module "DevOps"). Kept as a separate
  // filter from technology so picking "DevOps" surfaces Chocolatine,
  // Popeye, My_Marvin, Octopus, Bernstein and Whanos together, regardless
  // of which specific tool each one used.
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.module && set.add(p.module));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const visible = projects.filter(
    (p) =>
      (activeCategory === "All" || p.module === activeCategory) &&
      (activeTech === "All" || p.technologies.includes(activeTech)),
  );

  return (
    <div>
      {(categories.length > 2 || technologies.length > 2) && (
        <div className="mb-8 space-y-4">
          {categories.length > 2 && (
            <FilterRow
              label="Category"
              options={categories}
              active={activeCategory}
              onSelect={setActiveCategory}
            />
          )}
          {technologies.length > 2 && (
            <FilterRow
              label="Technology"
              options={technologies}
              active={activeTech}
              onSelect={setActiveTech}
            />
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <SchoolProjectCard key={`${project.code}-${project.title}`} project={project} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-white/50">
          No projects match these filters yet.
        </p>
      )}
    </div>
  );
}
