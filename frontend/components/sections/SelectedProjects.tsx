import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getFeaturedProjects } from "@/lib/api";

export async function SelectedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <Section id="projects" className="border-t border-border">
      <SectionHeader
        eyebrow="Selected work"
        title="Projects"
        description="Three projects that show how I work — from a deploy pipeline, to a full-stack platform, to an autonomous robot."
        action={
          <ButtonLink href="/projects" variant="ghost">
            All projects
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
