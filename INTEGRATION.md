# Timeline component integration

## Current setup

- **Tailwind CSS**: Configured via `@tailwindcss/vite` in `vite.config.ts` and `@import "tailwindcss"` in `src/index.css`.
- **TypeScript**: Enabled; config in `tsconfig.app.json`.
- **Path alias**: `@/` resolves to `src/` (e.g. `@/components/ui/timeline` → `src/components/ui/timeline`). Set in `vite.config.ts` and `tsconfig.app.json`.
- **Component path**: UI components live in **`src/components/ui/`** (shadcn-style layout).

## Why `components/ui`?

Using a dedicated **`/components/ui`** folder (or `src/components/ui` here) is the usual shadcn pattern:

- **UI primitives** (Button, Card, Timeline, etc.) live in `components/ui`.
- **Page/section components** can stay in `components/` or `pages/`.
- This keeps copy-paste components from shadcn (or similar) in one place and makes it clear what is a reusable UI building block vs. app-specific layout.

If you didn’t use this folder, UI and layout components would mix and the structure would drift from what shadcn and the docs expect.

## Adding full shadcn (optional)

The project is **not** initialized with the shadcn CLI yet. To add the full shadcn setup (themes, primitives, etc.):

1. Install and run the CLI (from project root):
   ```bash
   npx shadcn@latest init
   ```
2. Choose **Vite** when asked for the framework.
3. Use the default `components.json` (or adjust paths if you want). The CLI will set up Tailwind, path aliases, and `components/ui` if needed.
4. Add components with:
   ```bash
   npx shadcn@latest add button
   ```
   (or any other component)

If you already have Tailwind and `@/` set up (as here), the init can reuse them; the CLI will prompt when there’s overlap.

## Dependencies

- **framer-motion**: Installed for the Timeline scroll/height animation. No extra providers required.

## Where the Timeline is used

- **Component**: `src/components/ui/timeline.tsx` — Aceternity-style Timeline (scroll progress beam, sticky titles, content on the right).
- **Demo**: `src/components/TimelineDemo.tsx` — sample data and Unsplash images; uses `<Timeline data={data} />`.
- **App**: `src/App.tsx` renders `<TimelineDemo />` so you can see the Timeline on load.

## Data / props

- **Props**: `Timeline` receives `data: TimelineEntry[]`.
- **`TimelineEntry`**: `{ title: string; content: React.ReactNode }`.
- No global state or context; all data is passed in via `data`.
- **Assets**: Demo uses Unsplash image URLs; no local image files required. For icons, you can add `lucide-react` and use it inside `content` nodes.

## Responsive behavior

- **Mobile**: Titles show above the content; beam and sticky behavior are adjusted.
- **Desktop**: Sticky left titles (`top-40`), content on the right, vertical progress beam that fills on scroll (via framer-motion `useScroll` / `useTransform`).

## Using the Timeline elsewhere

```tsx
import { Timeline } from "@/components/ui/timeline"

const entries = [
  { title: "2024", content: <p>...</p> },
  { title: "2023", content: <p>...</p> },
]
export function MyPage() {
  return <Timeline data={entries} />
}
```
