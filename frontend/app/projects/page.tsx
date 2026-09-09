import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
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
        eyebrow="Work"
        title="Projects"
        description="Case studies from my time at Epitech and beyond — each one is a real problem I worked through with a team or on my own."
      />
      <Container className="py-16">
        <ProjectsGrid projects={projects} />
      </Container>
    </>
  );
}
