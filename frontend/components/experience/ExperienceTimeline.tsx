import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { formatRange } from "@/lib/format";
import type { Experience } from "@/lib/types";

const typeLabel: Record<Experience["type"], string> = {
  education: "Education",
  work: "Experience",
  competition: "Competition",
};

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative border-l border-border">
      {items.map((item, i) => (
        <li key={item.id} className="ml-6 pb-10 last:pb-0">
          <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-accent" />
          <Reveal delay={i * 60}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Badge variant="outline">{typeLabel[item.type]}</Badge>
              <span className="text-xs text-subtle">
                {formatRange(item.startDate, item.endDate)}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="text-sm text-muted">
              {item.organization}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {item.description}
            </p>
            {item.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2 text-sm text-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-accent"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
