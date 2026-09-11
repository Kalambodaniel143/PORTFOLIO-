export type SkillCategory =
  | "Programming"
  | "Web Development"
  | "DevOps & Infrastructure"
  | "AI & Robotics"
  | "Tools";

export type ProjectCategory = "DevOps" | "AI" | "Robotics" | "Full-Stack";

export interface Technology {
  name: string;
  category: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  category: ProjectCategory;
  featured: boolean;
  status: "completed" | "in-progress" | "maintained";
  year: string;
  role: string;
  technologies: string[];
  coverImage: string | null;
  links: {
    github?: string;
    live?: string;
    docs?: string;
  };
  /** Long-form technical case study. Any missing block is simply omitted. */
  caseStudy: {
    overview?: string;
    problem?: string;
    contribution?: string;
    stack?: string;
    architecture?: string;
    decisions?: CaseStudySection[];
    challenges?: CaseStudySection[];
    results?: string;
    learned?: string;
  };
}

export interface Experience {
  id: string;
  type: "education" | "work" | "competition";
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level?: "learning" | "comfortable" | "strong";
}

export interface SchoolProject {
  title: string;
  code: string;
  module: string;
  pitch: string;
  details: string | null;
  technologies: string[];
  githubUrl: string | null;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
