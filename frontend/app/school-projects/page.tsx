import type { Metadata } from "next";
import { SchoolProjectsGrid } from "@/components/projects/SchoolProjectsGrid";
import { Container } from "@/components/ui/Container";
import { getSchoolProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Epitech Projects",
  description:
    "A selection of the 50+ technical projects completed during the Bachelor's at Epitech Bénin.",
};

export default async function SchoolProjectsPage() {
  const projects = await getSchoolProjects();
  const count = String(projects.length).padStart(2, "0");

  return (
    <Container className="py-16 sm:py-20">
      <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-10">
        <div className="flex items-center gap-4">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-[#818cf8]">
            Coursework
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="shrink-0 font-mono text-xs text-white/40">
            {count} / 50+
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Epitech Projects
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/50">
          Over 50 technical projects completed across the Bachelor&apos;s at
          Epitech Bénin — this page documents them as they get written up.
        </p>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-[#818cf8]/50 via-white/10 to-transparent" />

        <div className="mt-10">
          <SchoolProjectsGrid projects={projects} />
        </div>
      </div>
    </Container>
  );
}
