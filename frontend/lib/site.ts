/**
 * Central place for identity / contact info used across the site.
 * Update here rather than hard-coding values in components.
 */
export const site = {
  name: "Kalambo Daniel Dany",
  shortName: "Daniel Kalambo",
  role: "Software Engineering Student",
  positioning:
    "Software Engineering student building reliable, autonomous systems through DevOps, AI and Robotics.",
  location: "Cotonou, Bénin — moving to Paris, France",
  email: "kalambodaniel143@gmail.com",
  schoolEmail: "daniel.kalambo@epitech.eu",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://portfolio-qzun.vercel.app",
  cvPath: "/kalambo-daniel-cv.pdf",
  socials: {
    github: "https://github.com/Kalambodaniel143",
    linkedin: "https://www.linkedin.com/in/kalambo-daniel-5b3163331/",
  },
} as const;

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/school-projects", label: "Epitech Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;
