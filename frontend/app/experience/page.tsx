import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getExperiences } from "@/lib/api";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Academic path, work experience and technical competitions of Kalambo Daniel Dany.",
};

export default async function ExperiencePage() {
  const items = await getExperiences();

  return (
    <>
      <PageHeader
        eyebrow="Path"
        title="Experience & Education"
        description="How I got here — school, an internship, a nine-month robotics competition, and a Master's in AI."
      />
      <Container className="py-16">
        <div className="max-w-3xl">
          <ExperienceTimeline items={items} />
        </div>
      </Container>
    </>
  );
}
