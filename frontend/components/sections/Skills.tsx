import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
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
  strong: "bg-accent",
  comfortable: "bg-accent/50",
  learning: "bg-border",
};

export async function Skills() {
  const skills = await getSkills();
  const byCategory = ORDER.map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <Section id="skills" className="border-t border-border">
      <SectionHeader
        eyebrow="Toolbox"
        title="Skills"
        description="Grouped by what I actually use them for. The dot shows how confident I am — solid means I reach for it without thinking."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {byCategory.map((group, i) => (
          <Reveal key={group.category} delay={i * 70}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-subtle">
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        skill.level ? levelDot[skill.level] : "bg-border"
                      }`}
                    />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
