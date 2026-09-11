import type { Metadata } from "next";
import { SchoolProjectsGrid } from "@/components/projects/SchoolProjectsGrid";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSchoolProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Epitech Projects",
  description:
    "A selection of the 50+ technical projects completed during the Bachelor's at Epitech Bénin.",
};

export default async function SchoolProjectsPage() {
  const projects = await getSchoolProjects();

  return (
    <>
      <PageHeader
        eyebrow="Coursework"
        title="Epitech Projects"
        description="Epitech's curriculum is entirely project-based: over 50 technical projects were completed across the Bachelor's, each with its own subject and constraints. This page documents them as they get written up — it will keep growing."
      />
      <Container className="py-16">
        <SchoolProjectsGrid projects={projects} />
      </Container>
    </>
  );
}
