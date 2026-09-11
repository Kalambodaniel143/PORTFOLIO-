import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getExperiences } from "@/lib/api";

export async function ExperiencePreview() {
  const items = (await getExperiences()).slice(0, 4);

  return (
    <Section id="experience" className="border-t border-border">
      <SectionHeader
        number="03"
        eyebrow="Path"
        title="Experience & Education"
        description="From a scientific high-school diploma to Epitech, a robotics competition and a graduate programme in AI."
        action={
          <ButtonLink href="/experience" variant="ghost">
            Full timeline
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        }
      />
      <ExperienceTimeline items={items} />
    </Section>
  );
}
