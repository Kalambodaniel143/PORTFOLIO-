import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineering student focused on DevOps, AI and robotics — background, working style and goals.",
};

const interests = [
  {
    title: "DevOps & infrastructure automation",
    body: "I like removing the repetitive parts of shipping software: build pipelines, containers, orchestration, infrastructure as code. Whanos was my deep dive into that world.",
  },
  {
    title: "AI & autonomous systems",
    body: "I started by writing a neural network without any framework, then a real-time game AI. The goal now, in my Master's, is to go further into learning-based decision making.",
  },
  {
    title: "Robotics",
    body: "Nine months on the Tekbot Robotics Challenge taught me how perception, decision and control fit together on real hardware — and how noisy the real world is.",
  },
  {
    title: "Reliable, evolvable systems",
    body: "Across all of it, I care about the same thing: systems that stay correct as they grow and keep running without someone babysitting them.",
  },
];

const howIWork = [
  "Start from the problem and the constraints, not the tools.",
  "Write it so the next person — often future me — can read it.",
  "Automate anything I have to do more than twice.",
  "Ship something small that works, then iterate.",
  "Ask early when a decision is someone else's to make.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Kalambo Daniel Dany"
        description={site.positioning}
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          <section className="space-y-4 text-[0.975rem] leading-relaxed text-muted">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Background
            </h2>
            <p>
              I&apos;m a software engineering student. I did a scientific
              high-school track — my final-year project was a strategic game AI —
              then spent three years at Epitech Bénin (2023–2026), where the
              curriculum is entirely project-based: you learn by building and
              shipping with a team under real deadlines.
            </p>
            <p>
              Along the way I interned as a software engineering intern at
              Africereal, competed in the Tekbot Robotics Challenge 2025, and
              built projects ranging from a from-scratch neural network to an
              automated Kubernetes delivery platform. I&apos;m now starting a
              Master&apos;s in Artificial Intelligence in Paris.
            </p>
            <p className="text-subtle">
              [Placeholder — replace with a more personal paragraph: what got you
              into this, what you do outside of code (reading, travel, sport),
              and where you want to be in a few years.]
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">
              What I&apos;m drawn to
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {interests.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <h3 className="text-sm font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">
              How I work
            </h2>
            <ul className="space-y-2.5">
              {howIWork.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[0.975rem] text-muted before:mt-2.5 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Goals</h2>
            <p className="max-w-2xl text-[0.975rem] leading-relaxed text-muted">
              Short term: an internship or graduate role where I can work on
              infrastructure, applied AI or robotics with engineers I can learn
              from. Longer term: designing intelligent systems that are
              dependable enough to trust with real decisions.
            </p>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-5 text-sm">
            <dl className="space-y-3">
              <div>
                <dt className="text-subtle">Location</dt>
                <dd className="mt-0.5">{site.location}</dd>
              </div>
              <div>
                <dt className="text-subtle">Languages</dt>
                <dd className="mt-0.5">French (native), English (B2), Swahili</dd>
              </div>
              <div>
                <dt className="text-subtle">Currently</dt>
                <dd className="mt-0.5">Starting an MSc in AI, Paris</dd>
              </div>
            </dl>
          </div>
          <ButtonLink href="/contact" className="w-full">
            Get in touch
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink
            href={site.cvPath}
            variant="secondary"
            external
            className="w-full"
          >
            Download CV
          </ButtonLink>
        </aside>
      </Container>
    </>
  );
}
