import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArrowRightIcon } from "@/components/ui/icons";
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
        number="03"
        eyebrow="Path"
        title="Experience & Education"
        description="How I got here — school, an internship, a nine-month robotics competition, and a Master's in AI."
      >
        <Link
          href="/school-projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          See the 50+ projects completed during the Epitech Bachelor&apos;s
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </PageHeader>
      <Container className="py-16">
        <div className="max-w-3xl">
          <ExperienceTimeline items={items} />
        </div>
      </Container>
    </>
  );
}
