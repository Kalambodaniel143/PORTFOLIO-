import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email, LinkedIn, GitHub or the contact form.`,
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: null,
  },
  {
    label: "LinkedIn",
    value: "kalambo-daniel",
    href: site.socials.linkedin,
    icon: <LinkedInIcon className="h-[18px] w-[18px]" />,
  },
  {
    label: "GitHub",
    value: "Kalambodaniel143",
    href: site.socials.github,
    icon: <GitHubIcon className="h-[18px] w-[18px]" />,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        number="04"
        eyebrow="Contact"
        title="Let's talk"
        description="Internships, graduate roles, or a project in DevOps, AI or robotics — send a message and I'll reply."
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <div className="order-2 lg:order-1">
          <ContactForm />
        </div>

        <aside className="order-1 space-y-3 lg:order-2">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted">
                {c.icon ?? "@"}
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-subtle">{c.label}</span>
                <span className="block truncate text-sm">{c.value}</span>
              </span>
            </a>
          ))}
        </aside>
      </Container>
    </>
  );
}
