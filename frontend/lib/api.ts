import {
  experiences as mockExperiences,
  projects as mockProjects,
  schoolProjects as mockSchoolProjects,
  skills as mockSkills,
} from "./mock-data";
import type {
  ContactPayload,
  Experience,
  Project,
  SchoolProject,
  Skill,
} from "./types";

/**
 * Data access layer.
 *
 * While the Django backend is not wired up (no API_URL set) every read returns
 * the local mock data, so the whole frontend is fully browsable offline.
 * Once API_URL points at the DRF service, reads hit the real endpoints and
 * fall back to mock data only if the request fails.
 */

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

// Revalidate cached responses every 5 minutes (ISR).
const REVALIDATE = 300;

async function get<T>(path: string, fallback: T): Promise<T> {
  if (!API_URL) return fallback;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`${path} -> ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[api] falling back to mock data for ${path}:`, err);
    return fallback;
  }
}

export async function getProjects(): Promise<Project[]> {
  return get<Project[]>("/api/projects/", mockProjects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all.slice(0, 3);
}

export async function getProject(slug: string): Promise<Project | null> {
  const fallback = mockProjects.find((p) => p.slug === slug) ?? null;
  if (!API_URL) return fallback;
  return get<Project | null>(`/api/projects/${slug}/`, fallback);
}

export async function getExperiences(): Promise<Experience[]> {
  return get<Experience[]>("/api/experiences/", mockExperiences);
}

export async function getSkills(): Promise<Skill[]> {
  return get<Skill[]>("/api/skills/", mockSkills);
}

export async function getSchoolProjects(): Promise<SchoolProject[]> {
  return get<SchoolProject[]>("/api/school-projects/", mockSchoolProjects);
}

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<{ ok: boolean; error?: string; notConnected?: boolean }> {
  if (!API_URL) {
    // Backend not wired up yet — do not pretend the message was delivered.
    console.info("[api] contact form submitted but no backend configured:", payload);
    return { ok: false, notConnected: true };
  }
  try {
    const res = await fetch(`${API_URL}/api/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { detail?: string }
        | null;
      return { ok: false, error: data?.detail ?? `Request failed (${res.status})` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
