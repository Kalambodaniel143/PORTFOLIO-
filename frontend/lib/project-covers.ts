/**
 * Static cover images for the main Projects showcase, keyed by slug.
 * Kept separate from the API/mock data (whose `coverImage` field is
 * usually null) so a cover can be dropped into `public/covers/` and
 * wired up here without touching the backend's media storage.
 */
const PROJECT_COVERS: Record<string, string> = {
  whanos: "/covers/whanos.jpg",
  aptely: "/covers/aptely.png",
  "epibot-trc": "/covers/epibot-trc.jpg",
  "my-torch": "/covers/my-torch.jpg",
  gomoku: "/covers/gomoku.jpg",
};

export function coverImageFor(project: {
  slug: string;
  coverImage: string | null;
}): string | null {
  return project.coverImage ?? PROJECT_COVERS[project.slug] ?? null;
}
