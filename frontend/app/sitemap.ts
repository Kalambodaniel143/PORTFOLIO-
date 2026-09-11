import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/api";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const now = new Date();

  const staticRoutes = [
    "",
    "/projects",
    "/school-projects",
    "/about",
    "/experience",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
