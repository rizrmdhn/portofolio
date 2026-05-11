# portofolio

A fullstack personal portfolio site with an admin dashboard for managing profile content. Built as a Turborepo monorepo using TanStack Start (SSR), tRPC, Drizzle ORM, and PostgreSQL.

## Features

- **Public portfolio** — hero, projects, work experience, tech stack, certificates, and social links
- **Admin dashboard** — create, update, delete, and reorder all portfolio content
- **Drag-and-drop reordering** via dnd-kit
- **File uploads** via Uploadthing
- **Click tracking** on social links
- **SSR everywhere** — all data fetched server-side via TanStack Start loaders
- **Authentication** via Better Auth (single-user, email/password)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start + TanStack Router (file-based, SSR) |
| Data fetching | TanStack Query + tRPC |
| Database | PostgreSQL + Drizzle ORM |
| Auth | Better Auth (Argon2 password hashing) |
| Styling | TailwindCSS v4 + Shadcn/ui + Base UI |
| Uploads | Uploadthing |
| Monorepo | Turborepo + pnpm workspaces |
| Language | TypeScript |

## Project Structure

```
portofolio/
├── apps/
│   └── web/              # Fullstack app (React + TanStack Start)
└── packages/
    ├── api/              # tRPC router & business logic
    ├── db/               # Drizzle schema, migrations, queries
    ├── auth/             # Better Auth configuration
    ├── schema/           # Zod validation schemas
    ├── types/            # Shared TypeScript types
    ├── queries/          # Database query helpers
    ├── constants/        # Shared constants (icon maps, enums)
    ├── utils/            # Utility functions
    ├── uploadthing/      # Uploadthing wrapper
    ├── env/              # Environment variable validation
    ├── ui/               # Shared UI component library
    └── config/           # Shared ESLint & TypeScript configs
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create `apps/web/.env` based on the variables below:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/portofolio

# Single-user auth — the one account allowed to log in
ALLOWED_EMAIL_LOGIN=you@example.com
ALLOWED_EMAIL_PASSWORD=your-password

BETTER_AUTH_SECRET=<random string, min 32 chars>
BETTER_AUTH_URL=http://localhost:3001

UPLOADTHING_TOKEN=<token from uploadthing.com>

CORS_ORIGIN=http://localhost:3000,http://localhost:5174
```

### 3. Set up the database

```bash
pnpm run db:push    # push schema to your database
pnpm run db:seed    # seed initial data (optional)
```

### 4. Start the dev server

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the portfolio.
The dashboard is at [http://localhost:3001/dashboard](http://localhost:3001/dashboard).

## Available Scripts

| Script | Description |
|---|---|
| `pnpm run dev` | Start all apps in development mode |
| `pnpm run dev:web` | Start only the web app |
| `pnpm run build` | Build all apps |
| `pnpm run clean` | Clean build artifacts |
| `pnpm run lint` | Run ESLint across the monorepo |
| `pnpm run typecheck` | TypeScript type checking |
| `pnpm run db:push` | Sync Drizzle schema with the database |
| `pnpm run db:generate` | Generate Drizzle migration files |
| `pnpm run db:migrate` | Run pending migrations |
| `pnpm run db:pull` | Introspect the database |
| `pnpm run db:studio` | Open Drizzle Studio (database UI) |
| `pnpm run db:seed` | Seed the database |
| `pnpm run db:dump` | Export the database |
| `pnpm run regenerate:jwt` | Regenerate JWT secrets |
