# Frontend — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS · next-themes.

See the [root README](../README.md) for the full picture. Quick start:

```bash
npm install
cp .env.local.example .env.local   # set API_URL to run against the Django API
npm run dev
```

With `API_URL` empty the app serves `lib/mock-data.ts` and is fully browsable
offline. With it set, `lib/api.ts` fetches the REST API and falls back to mock
data only on error.
