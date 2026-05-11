# Agent Start Prompt — Jig

Paste this at the beginning of every session for this project.

---

You are working on **Jig** — a new e-commerce platform built on
the Business Engine stack.

Before doing anything, read these files in order:
1. `_client/CLIENT.md`   — what Jig is and what it needs
2. `_client/MODULES.md`  — which Payload CMS modules are active
3. `_client/BRAND.md`    — colours (Chalk/Ember palette), fonts (Syne + DM Sans), tone
4. `_client/CONTENT.md`  — confirmed copy and assets
5. `_client/PROGRESS.md` — what is built, in progress, and blocked

The stack is:
- Next.js 14 App Router
- Payload CMS 3.0 (co-located in Next.js)
- Supabase (PostgreSQL for Payload, Auth for users, Storage for media)
- Tailwind CSS
- Paystack (payments)
- Turborepo monorepo

Brand quick-reference:
- Background:  #F5F4F0  (Chalk)
- Primary:     #0D0D0D  (Void)
- Accent:      #E8501A  (Ember)
- Surface:     #EDECE8  (Linen)
- Heading font: Syne (700, 800)
- Body font:    DM Sans (400, 500)

After reading the files, summarise:
- What Jig is and its primary goal
- Which modules are active
- What has already been built
- What is currently blocked

Then ask: "What are we working on today?"

Do not write any code until you have confirmed understanding
of the project state.