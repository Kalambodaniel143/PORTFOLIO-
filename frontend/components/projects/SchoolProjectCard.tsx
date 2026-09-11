import type { SchoolProject } from "@/lib/types";

/** "CSFML" -> "CS", "Linear Algebra" -> "LA", "C" -> "C" (kept short acronyms as-is). */
function techInitials(name: string): string {
  if (name.length <= 3) return name.toUpperCase();
  if (name.includes(" ")) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]!.toUpperCase())
      .join("");
  }
  return name.slice(0, 2).toUpperCase();
}

export function SchoolProjectCard({ project }: { project: SchoolProject }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20">
      {project.code && (
        <p className="font-mono text-xs tracking-wide text-white/40">
          {project.code}
        </p>
      )}
      <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
        {project.pitch}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              title={tech}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[10px] font-medium text-white/70"
            >
              {techInitials(tech)}
            </span>
          ))}
        </div>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#818cf8] transition-colors hover:text-[#a5b4fc]"
          >
            Lire <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
