import type { ReactNode } from "react";
import type { CaseStudySection, Project } from "@/lib/types";

function Block({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
        {title}
      </h2>
      <div className="mt-4 max-w-2xl space-y-4 text-[0.975rem] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </>
  );
}

function SubList({ items }: { items: CaseStudySection[] }) {
  return (
    <dl className="space-y-5">
      {items.map((item) => (
        <div key={item.heading}>
          <dt className="font-medium text-foreground">{item.heading}</dt>
          <dd className="mt-1">{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy;

  return (
    <div className="divide-border">
      {cs.overview && (
        <Block title="Overview">
          <Paragraphs text={cs.overview} />
        </Block>
      )}
      {cs.problem && (
        <Block title="Problem">
          <Paragraphs text={cs.problem} />
        </Block>
      )}
      {cs.contribution && (
        <Block title="My contribution">
          <Paragraphs text={cs.contribution} />
        </Block>
      )}
      {cs.stack && (
        <Block title="Technical stack">
          <Paragraphs text={cs.stack} />
        </Block>
      )}
      {cs.architecture && (
        <Block title="Architecture">
          <Paragraphs text={cs.architecture} />
        </Block>
      )}
      {cs.decisions && cs.decisions.length > 0 && (
        <Block title="Technical decisions">
          <SubList items={cs.decisions} />
        </Block>
      )}
      {cs.challenges && cs.challenges.length > 0 && (
        <Block title="Challenges & solutions">
          <SubList items={cs.challenges} />
        </Block>
      )}
      {cs.results && (
        <Block title="Results">
          <Paragraphs text={cs.results} />
        </Block>
      )}
      {cs.learned && (
        <Block title="What I learned">
          <Paragraphs text={cs.learned} />
        </Block>
      )}
    </div>
  );
}
