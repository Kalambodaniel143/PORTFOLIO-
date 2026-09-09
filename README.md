# Portfolio — Kalambo Daniel Dany

Personal portfolio: software engineering profile, technical case studies and
background. Monorepo with a decoupled frontend and backend.

```
frontend/  Next.js (App Router) · TypeScript · Tailwind CSS   →  Vercel
backend/   Django · Django REST Framework                      →  Render
                                                               ↘  PostgreSQL (Neon)
```

The Next.js app reads content from the Django REST API. When `API_URL` is not
set it falls back to local mock data (`frontend/lib/mock-data.ts`), so the
frontend is fully browsable with the backend switched off.

---

## Requirements

- Node.js 20+
- Python 3.12+
- (optional) A PostgreSQL database — local dev works on SQLite out of the box

---

## Frontend (`frontend/`)

```bash
cd frontend
npm install
cp .env.local.example .env.local     # optional; edit API_URL to hit the backend
npm run dev                           # http://localhost:3000
```

| Script          | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Dev server                       |
| `npm run build` | Production build (SSG + ISR)     |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint                           |

Environment variables (`frontend/.env.local`):

| Variable              | Meaning                                                        |
| --------------------- | ------------------------------------------------------------- |
| `API_URL`             | Django API base URL. Empty → the app runs on mock data.       |
| `NEXT_PUBLIC_SITE_URL`| Canonical site URL for metadata / sitemap / OpenGraph.        |

### Structure

```
app/               Routes: / /projects /projects/[slug] /about /experience /contact
components/
  layout/          Header, Footer, theme provider + toggle
  sections/        Homepage sections (Hero, SelectedProjects, Skills, …)
  projects/        ProjectCard, ProjectsGrid (filtering), CaseStudy
  experience/      ExperienceTimeline
  ui/              Primitives: Button, Container, Section, Badge, Reveal, icons
lib/
  api.ts           Data layer — fetches the API, falls back to mock data
  mock-data.ts     Placeholder content (mirrors the seeded backend data)
  types.ts         Shared TypeScript types
  site.ts          Identity / contact / nav config — edit here
```

Dark mode is class-based via `next-themes` (light / dark / system).

---

## Backend (`backend/`)

```bash
cd backend
uv venv .venv && source .venv/bin/activate      # or: python -m venv .venv
pip install -r requirements.txt
cp .env.example .env                             # optional for local SQLite
python manage.py migrate
python manage.py seed_demo                       # load placeholder content
python manage.py createsuperuser                 # for the admin
python manage.py runserver                       # http://127.0.0.1:8000
```

- Admin: `http://127.0.0.1:8000/admin/` — all content is editable here.
- Browsable API: `http://127.0.0.1:8000/api/`
- Settings: `config/settings/{base,dev,prod}.py`. `manage.py` defaults to `dev`;
  `wsgi.py` defaults to `prod`.

### API

| Method | Endpoint                  | Notes                                    |
| ------ | ------------------------- | --------------------------------------- |
| GET    | `/api/projects/`          | `?category=` `?featured=` `?status=`    |
| GET    | `/api/projects/<slug>/`   | Full case study                         |
| GET    | `/api/experiences/`       | `?type=`                               |
| GET    | `/api/skills/`            | `?category=` `?level=`                 |
| POST   | `/api/contact/`           | `{name,email,message}` — throttled 5/h |
| GET    | `/healthz/`               | Health check                            |

### Apps

```
config/            Project config + settings package
apps/
  common/          Abstract TimeStampedModel
  projects/        Project, Technology, ProjectTechnology, CaseStudyPoint
  experience/      Experience, ExperienceHighlight
  skills/          Skill
  contact/         ContactMessage
```

Environment variables (`backend/.env` locally, Render dashboard in prod):

| Variable               | Meaning                                                     |
| ---------------------- | --------------------------------------------------------- |
| `SECRET_KEY`           | Django secret key                                          |
| `DEBUG`                | `True` / `False`                                           |
| `ALLOWED_HOSTS`        | Comma-separated hostnames                                  |
| `DATABASE_URL`         | Postgres URL. Unset → local SQLite                         |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins allowed to call the API   |
| `CSRF_TRUSTED_ORIGINS` | Comma-separated (prod)                                     |

---

## Deployment

### Backend → Render + Neon

1. Create a PostgreSQL database on [Neon](https://neon.tech) and copy the
   connection string (`…?sslmode=require`).
2. In Render, create a **Blueprint** from this repo — it reads `render.yaml`.
3. Set the dashboard env vars the blueprint marks `sync: false`:
   `DATABASE_URL`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`.
4. First deploy runs `build.sh` (install → `collectstatic` → `migrate`).
5. Create the admin user once: Render **Shell** → `python manage.py createsuperuser`,
   then `python manage.py seed_demo` if you want the placeholder content.

### Frontend → Vercel

1. Import the repo, set the project root to `frontend/`.
2. Env vars: `API_URL=https://<render-service>.onrender.com`,
   `NEXT_PUBLIC_SITE_URL=https://<your-domain>`.
3. Deploy. Pages use ISR (revalidate every 5 min) so content edits in Django
   Admin appear without a rebuild.

---

## Content to replace

Placeholder text is marked with `[brackets]` or `TODO` in
`backend/apps/projects/management/commands/seed_demo.py` and
`frontend/lib/mock-data.ts`. Real CV goes at
`frontend/public/kalambo-daniel-cv.pdf`.
```
