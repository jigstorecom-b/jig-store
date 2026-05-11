# Business Engine

> A production-grade, white-label web platform for African web agencies. Clone once, deploy for every client.

**Stack:** Next.js 15 · Payload CMS 3.0 · Supabase · Turborepo · pnpm · TypeScript

---

## What Is This?

Business Engine is a master monorepo designed to be **cloned, configured, and deployed** as a standalone application for each client. It eliminates the "build from scratch" cycle by accumulating good decisions once.

**Each client gets:**
- A Payload CMS admin panel (plain-English content management)
- Supabase authentication (login, roles, sessions)
- A modular Next.js frontend (enable/disable features per client)
- A private `_client/` folder with all project context for AI-assisted development

---

## Monorepo Structure

```
business-engine/
├── apps/
│   └── web/                  # Next.js app + Payload CMS admin
├── packages/
│   ├── auth/                 # Supabase auth utilities
│   ├── config/               # Shared build configs & brand tokens
│   ├── database/             # DB schema & Supabase client
│   └── ui/                   # Shared UI components
├── docs/
│   └── blueprints/           # Architecture guides (00–08)
├── .env.example              # Environment variable template
├── CLAUDE.md                 # AI agent instructions
└── pnpm-workspace.yaml
```

---

## First-Time Setup

> ⚠️ **Always run commands from the repo root.** Never `cd` into a package and install separately.

```bash
# 1. Clone
git clone https://github.com/mchlshot-code/business-engine
cd business-engine

# 2. Install all workspace dependencies
pnpm install

# 3. Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit apps/web/.env.local — fill in Supabase + Payload values

# 4. Start development (all packages run in parallel)
pnpm dev
```

Then open:
- `http://localhost:3000` — main application
- `http://localhost:3000/admin` — Payload CMS admin panel

---

## Environment Variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `PAYLOAD_SECRET` | Random secret string for Payload |
| `DATABASE_URI` | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | App URL (e.g. `http://localhost:3000`) |

---

## Available Commands

```bash
pnpm dev          # Start all apps in development mode
pnpm turbo build  # Production build (for deployment only)
pnpm lint         # Run linting across all packages
```

---

## Cloning for a New Client

After cloning this repo for a client:

1. Create a new GitHub repo for the client
2. Tell the AI agent: **"I am cloning this project for a new client: [Client Name]"**
3. The agent will create a `_client/` folder using the templates in `docs/blueprints/08-AGENT-PREPARATION.md`

---

## Documentation

All architectural blueprints live in `docs/blueprints/`:

| File | Description |
|---|---|
| `01-OVERVIEW.md` | System philosophy and goals |
| `02-STACK.md` | Technology choices |
| `03-MONOREPO.md` | Package structure |
| `04-PAYLOAD.md` | CMS configuration |
| `05-SUPABASE.md` | Database and auth |
| `06-MODULES.md` | Feature toggle system |
| `07-CLONING-GUIDE.md` | Client deployment workflow |
| `08-AGENT-PREPARATION.md` | AI agent context files |

---

## License

Private — internal use only.
