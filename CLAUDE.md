# Jig — Project CLAUDE.md

## Purpose & Philosophy

Jig is a modern e-commerce platform built for independent sellers and growing brands. It leverages the Business Engine stack to provide a fast, beautiful, and "editorial confidence" storefront experience.

**Core Principles for Jig:**
- **Warm Minimalism:** generative whitespace and intentional layout as defined in `_client/Philosophy.md`.
- **Merchant Empowerment:** Easy management via Payload CMS.
- **Paystack Integration:** Primary payment provider for the African market.
- **Vercel Deployment:** Optimized for performance and scale.

## System Overview

- **Stack:** TypeScript, Next.js 15.1.7 (App Router), Payload CMS 3.0, Supabase (PostgreSQL + Auth), Turborepo, pnpm.
- **Architecture:** Monorepo with shared packages.
- **Payment Provider:** Paystack.
- **Deployment Platform:** Vercel.

## Architectural Blueprints

Refer to `_client/` for Jig-specific context:
1. `_client/CLIENT.md`   — Business goals and sitemap.
2. `_client/MODULES.md`  — Active Payload CMS modules (Products, Payments, etc.).
3. `_client/BRAND.md`    — Chalk/Void/Ember palette and typography.
4. `_client/Philosophy.md` — Detailed UI/UX logic and design system.
5. `_client/PROGRESS.md` — Build history and current tasks.

## Critical Rules

### TypeScript & React
- Next.js 15 App Router patterns.
- Tailwind CSS for styling.

### Monorepo Workflow
- Use `pnpm` from the root.
- Shared packages via `@engine/*`.

### Database & Auth
- Supabase for Auth and PostgreSQL (via Payload).

## Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
# Ensure apps/web/.env.local has Supabase and Paystack keys

# 3. Start development
pnpm dev
```

## Deployment — Vercel

Jig is deployed to Vercel. Ensure all environment variables from `.env.example` are configured in the Vercel project dashboard.

