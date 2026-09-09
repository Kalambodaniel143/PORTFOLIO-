import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ExperiencePreview } from "@/components/sections/ExperiencePreview";
import { Hero } from "@/components/sections/Hero";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SelectedProjects />
      <ExperiencePreview />
      <Skills />
      <ContactCTA />
    </>
  );
}
