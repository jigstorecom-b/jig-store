# Jig Store — System Architecture & Monorepo Specification

> A production-grade e-commerce platform built on the Business Engine white-label framework, specifically customized and deployed for Jig Storefront.

---

## 1. Executive Summary

Jig is a high-performance, warm-minimalist storefront powered by a modern headless architecture. By co-locating the content management system directly inside the Next.js runtime and utilizing Supabase as the storage and authentication backend, Jig achieves zero network overhead for server-side content queries while maintaining strict modularity.

```
┌────────────────────────────────────────────────────────┐
│                    Vercel Edge                         │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │             Next.js 15 (App Router)              │  │
│  │   [ Storefront UI ]          [ /admin Portal ]   │  │
│  └────────────────────────┬─────────────────────────┘  │
│                           │                            │
│  ┌────────────────────────▼─────────────────────────┐  │
│  │               Payload CMS 3.0 API                │  │
│  └────────────────────────┬─────────────────────────┘  │
└───────────────────────────┼────────────────────────────┘
                            │ (Direct pg Pool)
┌───────────────────────────▼────────────────────────────┐
│                  Supabase PostgreSQL                   │
│   [ Auth / Users ]   [ Products / Orders / Media ]     │
└────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack & Core Layers

| Layer | Technology | Primary Responsibility |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15.4** (App Router) | Server-side rendering, layout hierarchy, routing, and SEO metadata. |
| **Content Engine** | **Payload CMS 3.84** | Headless content models, admin UI, validation, and database abstraction. |
| **Database Backend** | **Supabase (PostgreSQL)** | Persistent storage via `@payloadcms/db-postgres` and connection pooling. |
| **Identity & Auth** | **Supabase Auth / SSR** | User sessions, role-based access control (RBAC), and JWT validation. |
| **Payment Gateway** | **Paystack** | Secure transactional processing and webhook order fulfillment. |
| **Design System** | **Tailwind CSS v4** | CSS-first utility styling, theme tokens, and warm-minimalist aesthetics. |
| **Build & Monorepo** | **Turborepo & pnpm 10/11** | Optimized task caching, dependency linking, and workspace isolation. |
| **Cloud Hosting** | **Vercel** | Serverless functions, static asset caching, and automated CI/CD. |

---

## 3. Monorepo Topology & Workspace Boundaries

Jig is structured as a Turborepo monorepo with explicit workspace boundaries. The root manages build coordination, while individual packages encapsulate discrete business logic.

```
business-engine/
├── apps/
│   └── web/                     # Primary Next.js Storefront & Co-located Payload CMS
│       ├── src/app/             # Next.js App Router (Pages, API Routes, /admin)
│       ├── collections/         # Payload CMS Schemas (Products, Orders, Media, Categories)
│       └── payload.config.ts    # Central CMS and Module Configuration
├── packages/
│   ├── auth/                    # @engine/auth: Lazy-initialized Supabase Auth & Admin Clients
│   ├── config/                  # @engine/config: Brand constants and exported configurations
│   ├── database/                # @engine/database: Shared database utilities & schema definitions
│   └── ui/                      # @engine/ui: Radix UI primitives and shared atomic components
├── turbo.json                   # Build pipeline and environment variable caching rules
├── vercel.json                  # Vercel deployment configuration (output directory mapping)
└── package.json                 # Workspace root orchestrator (pnpm 10.5.2 specification)
```

### Dependency Flow
- `apps/web` consumes `@engine/auth`, `@engine/config`, `@engine/database`, and `@engine/ui`.
- Workspace dependencies are linked dynamically at install time using `workspace:*`.

---

## 4. Data Lifecycle & Request Flow

### Storefront Page Render (Zero Network Cost)
Because Payload 3.x runs as part of Next.js, querying product data from server components bypasses HTTP REST/GraphQL serialization entirely:

```
[ User Request ] 
       │
       ▼
[ Next.js Server Component ] ──( getPayload() )──> [ Local Memory Execution ]
                                                          │
                                                ( pg Connection Pool )
                                                          │
                                                          ▼
                                            [ Supabase PostgreSQL ]
```

1. Request hits `/shop/[slug]`. Next.js executes the Server Component.
2. `getPayload({ config })` initializes the local Payload instance directly in memory.
3. `payload.find({ collection: 'products', ... })` queries Supabase PostgreSQL via local connection pool.
4. Raw data is returned, rendered into HTML/RSC payload, and streamed to the browser.

### Transactional Webhook Flow (Paystack)
```
[ Paystack Webhook ] ──> [ POST /api/webhooks/paystack ] ──> Verify Signature
                                                                  │
     ┌────────────────────────────────────────────────────────────┘
     ▼
[ Update Order Status: "Paid" ] ──> [ Send Customer Confirmation Email ]
```

---

## 5. Identity & Authentication Architecture

Jig utilizes a dual-layer authentication architecture combining Supabase SSR cookies with Payload's internal access control hooks.

- **Client/Server Auth:** Managed via `@engine/auth` (`@supabase/ssr`). Server actions and API routes securely extract user sessions from incoming HTTP cookies.
- **Admin Access:** Payload CMS hooks authenticate users against Supabase profiles to authorize access to `/admin` segments and restrict mutation permissions based on roles (`admin` vs. `customer`).
- **Lazy Initialization:** Supabase clients (`getSupabase`, `getSupabaseAdmin`) are initialized on-demand during runtime to prevent build-time crashes during Vercel static analysis.

---

## 6. Design System Architecture (Tailwind v4)

Jig utilizes **Tailwind CSS v4** with a pure CSS-first configuration, bypassing legacy Javascript configuration files entirely.

```css
/* src/app/globals.css */
@import "tailwindcss";
@source "../../packages/ui/src/**/*.{ts,tsx}";
@plugin "tailwindcss-animate";

@theme {
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);
  --color-primary: hsl(var(--primary));
  --color-accent: hsl(var(--accent)); /* Ember #E8501A */
  --max-width-content: 1280px;
}
```
- **Source Paths:** Monorepo package paths (`@engine/ui`) are imported explicitly using `@source`.
- **Theme Variables:** Colors, typography (`Syne` + `DM Sans`), and layout constraints (`1280px` max-width) are declared natively inside `@theme {}`.

---

## 7. CI/CD & Vercel Deployment Specification

Jig is deployed on Vercel with strict dependency and environment isolation rules:

1. **Root Directory Mapping:** Vercel is configured at the monorepo root. `vercel.json` directs output compilation to `apps/web/.next`.
2. **Lockfile Enforcement:** Vercel's build engine executes `pnpm install --frozen-lockfile`. The workspace root explicitly defines `"packageManager": "pnpm@10.5.2"` to match lockfile version `9.0` generation format perfectly.
3. **Turborepo Coordination:** `turbo.json` propagates required environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`) into the build cache key to guarantee correct static site generation.
