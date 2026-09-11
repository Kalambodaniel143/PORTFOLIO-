"use client";

import { useId, useRef } from "react";
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

function TechAvatar({ name }: { name: string }) {
  return (
    <span
      title={name}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[10px] font-medium text-white/70"
    >
      {techInitials(name)}
    </span>
  );
}

export function SchoolProjectCard({ project }: { project: SchoolProject }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
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
              <TechAvatar key={tech} name={tech} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#818cf8] transition-colors hover:text-[#a5b4fc]"
          >
            Lire <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto max-w-lg rounded-2xl border border-white/10 bg-[#0a0a0a] p-0 text-white [&::backdrop]:bg-black/70"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              {project.code && (
                <p className="font-mono text-xs tracking-wide text-white/40">
                  {project.code}
                  {project.module ? ` · ${project.module}` : ""}
                </p>
              )}
              <h3 id={titleId} className="mt-1 text-2xl font-semibold tracking-tight">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="shrink-0 rounded-full border border-white/15 p-1.5 text-white/60 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {project.pitch}
          </p>
          {project.details && (
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              {project.details}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#818cf8] transition-colors hover:text-[#a5b4fc]"
            >
              View on GitHub <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </dialog>
    </>
  );
}
