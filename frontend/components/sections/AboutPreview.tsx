import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";

const focus = [
  {
    title: "DevOps & Infrastructure",
    body: "Automated delivery pipelines, containers, Kubernetes, infrastructure as code.",
  },
  {
    title: "AI & Autonomous Systems",
    body: "Neural networks from first principles, adversarial search, perception loops.",
  },
  {
    title: "Robotics",
    body: "ROS-based robots that sense, decide and act without a human in the loop.",
  },
];

export function AboutPreview() {
  return (
    <Section className="border-t border-border">
      <SectionHeader
        eyebrow="About"
        title="I like systems that keep working when no one is watching."
        description="Three years of project-based engineering at Epitech taught me to ship under deadline with a team. My focus has settled on the places where software meets the physical world and the infrastructure it runs on."
        action={
          <ButtonLink href="/about" variant="ghost">
            More about me
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {focus.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
