# Taskflow — Your Simple, Smart Task Manager

Taskflow is a lightweight project & task management web app built with Next.js, Tailwind CSS, and shadcn/ui. It provides an intuitive interface to create projects, manage tasks, collaborate, and prototype workflow UIs quickly using local state (Zustand-based store).

---

## Table of contents

- [Taskflow — Your Simple, Smart Task Manager](#taskflow--your-simple-smart-task-manager)
  - [Table of contents](#table-of-contents)
  - [What it is](#what-it-is)
  - [Key features](#key-features)
  - [Tech stack](#tech-stack)
  - [Quick start](#quick-start)
  - [Development workflow \& scripts](#development-workflow--scripts)
  - [Project structure](#project-structure)
  - [Important internals \& symbols](#important-internals--symbols)
  - [Tips and best practices](#tips-and-best-practices)
  - [Contributing](#contributing)
  - [License](#license)

---

## What it is

Taskflow helps you organize projects and tasks in a simple kanban-like UI with support for:

- Creating projects and inviting members
- Adding tasks to columns with positions
- Archiving and deleting projects
- Local persistence using a persisted Zustand store

It is intended as a small, fast prototype app and a good starting point for experimenting with UI patterns and local-first data flows.

---

## Key features

- Multi-project support with project-level members and roles
- Task creation, ordering, moving between columns
- Commenting on tasks
- Project archival and deletion (cascade removes tasks/comments)
- Persistent local store (persisted by Zustand)
- Component library via shadcn/ui and iconography with lucide-react

---

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (UI primitives)
- Zustand + zustand/middleware for app store
- lucide-react (icons)
- dnd-kit (drag & drop foundations)
- Optional: Supabase (planned integration in README)

---

## Quick start

Prerequisites:

- Node 18+ recommended
- npm or pnpm

1. Clone the repo

   ```sh
   git clone <repo-url>
   cd task-flow
   ```

2. Install dependencies

   ```sh
   npm install
   # or
   pnpm install
   ```

3. Copy environment example

   ```sh
   cp .env.example .env.local
   # Edit .env.local if needed
   ```

4. Run development server

   ```sh
   npm run dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

5. Build / preview

   ```sh
   npm run build
   npm run start
   ```

---

## Development workflow & scripts

Common scripts (see `package.json`):

- npm run dev — start dev server with Fast Refresh
- npm run build — production build
- npm run start — start production server (after build)
- npm run lint — run ESLint
- npm run format — run Prettier (if configured)

Always run lint/format before committing.

---

## Project structure

- app/ — Next.js App Router pages and layouts
  - app/(app)/projects/[projectId]/page.tsx — project detail page
- components/ — shared UI components (sidebar, modals, nav, etc.)
- store.ts — central Zustand store and actions
- store/ — additional seed data and app-store helpers
- types.tsx — main app data types
- lib/ — app utilities (e.g., `lib/constants`)
- public/ — static assets
- .env.example / .env.local — environment variables

---

## Important internals & symbols

- The app uses a persisted Zustand store exposed as `useTaskFlowStore`. See store.ts for all state and actions.
  - Notable actions: `addProject`, `addTask`, `moveTask`, `archiveProject`, `deleteProject`.
- Seed/demo data is available in store/app-store.ts.
- Types are centralized in types.tsx (Project, Task, Comment, User, etc.).
- Static column definitions: `STATIC_COLUMNS` (imported in store.ts).

Examples:

- Creating a project uses the store action `addProject` (creates project, adds current user as member).
- The project detail page is implemented in app/(app)/projects/[projectId]/page.tsx.

---

## Tips and best practices

- Use feature branches (`feature/xyz`) and small PRs.
- Commit messages: use Conventional Commits style for clarity.
- Keep UI components small, presentational vs container separation.
- Prefer immutable updates (the store already uses immutability patterns).
- For adding real auth or persistence, consider Supabase or your backend:
  - Keep the Zustand store as a local cache and implement sync layers.
- Use the `.env.example` as canonical reference for any required keys.

Debugging suggestions:

- Log store contents: call `useTaskFlowStore.getState()` in the console (dev only).
- When tasks reorder unexpectedly, inspect `position` values in the store.
- Use browser devtools to inspect network & console for SSR vs client-only issues.

Accessibility & UX:

- Ensure interactive elements have accessible labels.
- Confirm modals trap focus and keyboard navigation works (Tab/Esc).

Performance:

- Memoize expensive list renders.
- Keep heavy packages lazy-loaded where appropriate.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/awesome`
3. Implement and test locally
4. Open a pull request with a clear description

Please run linters and formatters before submitting. Refer to this README's development scripts.

---

## License

This project is MIT licensed — see LICENSE file (if included) or add desired license.

---

If you need a short developer onboarding checklist or CI suggestions (GitHub Actions for lint/test/build), I can add recommended workflow YAML and branch protection rules.

Relevant files and symbols:

- `useTaskFlowStore` — central store and actions
- store.ts
- types.tsx
- store/app-store.ts
- app/(app)/projects/[projectId]/page.tsx
- components/
