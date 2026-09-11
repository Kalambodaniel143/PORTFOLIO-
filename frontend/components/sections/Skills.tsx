import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getSkills } from "@/lib/api";
import type { Skill, SkillCategory } from "@/lib/types";

const ORDER: SkillCategory[] = [
  "Programming",
  "Web Development",
  "DevOps & Infrastructure",
  "AI & Robotics",
  "Tools",
];

const levelDot: Record<NonNullable<Skill["level"]>, string> = {
  strong: "bg-accent-fg",
  comfortable: "bg-accent-fg/55",
  learning: "bg-accent-fg/25",
};

export async function Skills() {
  const skills = await getSkills();
  const byCategory = ORDER.map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="skills" className="bg-accent py-20 text-accent-fg sm:py-28">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        <Reveal className="lg:w-2/5 lg:shrink-0">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-sm text-accent-fg/55">04</span>
            <span className="h-px w-5 bg-accent-fg/30" />
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent-fg/70">
              Toolbox
            </p>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What I reach for
          </h2>
          <p className="mt-3 max-w-sm text-lg leading-relaxed text-accent-fg/75">
            Grouped by what I actually use things for, not how they look on a
            résumé. Solid dot means I reach for it without thinking.
          </p>
        </Reveal>

        <div className="flex-1 divide-y divide-accent-fg/15 border-t border-accent-fg/15 lg:border-t-0">
          {byCategory.map((group, i) => (
            <Reveal key={group.category} delay={i * 70}>
              <div className="flex flex-col gap-3 py-5 sm:flex-row sm:gap-6">
                <div className="flex items-baseline gap-3 sm:w-56 sm:shrink-0">
                  <span className="font-mono text-xs text-accent-fg/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em]">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 text-sm text-accent-fg/85"
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          skill.level ? levelDot[skill.level] : "bg-accent-fg/25"
                        }`}
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
