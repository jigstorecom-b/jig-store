# Build Progress — Jig

Last updated: 2026-05-11

## Phase 1 — Core Store

### Setup
- [x] Monorepo cloned from master
- [x] Supabase project created
- [x] Environment variables configured (.env.local)
- [x] Module toggles set in payload.config.ts
- [x] Brand tokens updated (colours, fonts in tailwind.config)
- [ ] Payload migrations run
- [x] Google Fonts imported (Syne, DM Sans, JetBrains Mono)

### Pages
- [x] Homepage
- [x] Shop / Product Listing
- [x] Product Detail Page
- [x] Cart (slide-out drawer)
- [x] Checkout
- [x] Order Confirmation
- [x] About
- [x] Contact

### Merchant Dashboard
- [x] Products CRUD
- [x] Orders list and status management
- [x] Media uploads
- [x] Categories management

### Integrations
- [x] Paystack test mode connected
- [ ] Paystack live keys configured
- [x] Webhook for order confirmation email (implemented)

### Launch
- [ ] Deployed to Vercel
- [ ] Domain connected
- [ ] Paystack live mode enabled
- [ ] Final QA pass (mobile + desktop)
- [ ] Client sign-off

---

## In Progress
- [x] Linting passed in WSL (turbo lint)
- Brand configuration complete (brand.ts, globals.css, layout.tsx, tailwind.config.ts)
- Next: Supabase project creation and module toggle configuration

## Blocked
[What cannot proceed — usually missing content or credentials]

## Decisions Made
- Using Ember (#E8501A) as primary accent — warm, bold, distinctive
- Syne + DM Sans font pairing — avoids generic Shopify-adjacent feel
- Cart as slide-out drawer — avoids full-page interruption on product browse
- Orders collection is custom in Payload (not a third-party plugin)

## Client Feedback Log
[Empty — no reviews yet]