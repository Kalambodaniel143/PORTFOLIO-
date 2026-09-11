import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Technical projects across DevOps, AI, robotics and full-stack development.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        number="01"
        eyebrow="Work"
        title="Projects"
        description="Case studies from my time at Epitech and beyond — each one is a real problem I worked through with a team or on my own."
      >
        <Link
          href="/school-projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          Looking for the 50+ Epitech coursework projects?
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </PageHeader>
      <Container className="py-16">
        <ProjectsGrid projects={projects} />
      </Container>
    </>
  );
}
