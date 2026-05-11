# Brand Reference — Jig

## Brand Positioning
Jig sits between the corporate heaviness of Shopify and the
simplicity of Big Cartel. The brand should feel: sharp, modern,
confident, and human. Not a tech giant. Not a startup cliché.
Something people trust immediately.

---

## Colour Palette

### Core
| Role         | Name          | Hex       | Usage                                      |
|--------------|---------------|-----------|--------------------------------------------|
| Primary      | Void          | #0D0D0D   | Main text, logo, primary buttons           |
| Background   | Chalk         | #F5F4F0   | Page backgrounds — warm off-white, not cold|
| Surface      | Linen         | #EDECE8   | Cards, input fields, secondary surfaces    |
| Border       | Ash           | #DDDBD4   | Dividers, outlines, subtle borders         |

### Accent (the signature colour)
| Role         | Name          | Hex       | Usage                                      |
|--------------|---------------|-----------|--------------------------------------------|
| Accent       | Ember         | #E8501A   | CTAs, highlights, hover states, badges     |
| Accent Light | Ember Tint    | #FDEEE8   | Accent backgrounds, tags, alerts           |

### Utility
| Role         | Name          | Hex       | Usage                                      |
|--------------|--------------|-----------|---------------------------------------------|
| Success      | Sage          | #2D6A4F   | Order confirmed, payment success            |
| Warning      | Amber         | #D97706   | Low stock, pending status                   |
| Error        | Crimson       | #C0392B   | Form errors, failed payments                |
| Muted Text   | Stone         | #737068   | Captions, metadata, secondary labels        |

### Why This Palette Beats the Competition
- Shopify uses a cold blue-green (#008060) — feels like a bank.
- WooCommerce uses corporate purple — dated and heavy.
- Big Cartel uses flat grey — forgettable.
- Jig uses a warm neutral base (Chalk/Linen) with a bold Ember
  accent. It feels editorial, confident, and warm. Like a premium
  magazine built a store.

---

## Typography

### Fonts
| Role     | Font                    | Source        | Weight     |
|----------|-------------------------|---------------|------------|
| Heading  | Syne                    | Google Fonts  | 700, 800   |
| Body     | DM Sans                 | Google Fonts  | 400, 500   |
| Mono     | JetBrains Mono          | Google Fonts  | 400        |

**Why Syne:** Geometric, bold, modern — stands out from the
Playfair Display / Inter combos everyone else uses. Strong at
large display sizes. Memorable.

**Why DM Sans:** Highly legible at small sizes. Friendly without
being childish. Pairs with Syne without competing.

### Type Scale (Tailwind)
- Display:  text-6xl / font-extrabold / tracking-tight
- H1:       text-4xl / font-bold
- H2:       text-2xl / font-semibold
- H3:       text-xl  / font-medium
- Body:     text-base / font-normal
- Caption:  text-sm  / text-[#737068]
- Mono:     text-sm  / font-mono (prices, codes, order IDs)

---

## Logo
File:         /public/logo.svg
Dark version: /public/logo-dark.svg
Favicon:      /public/favicon.svg

**Logo concept:** The word "jig" in Syne ExtraBold, lowercase,
with the dot of the "j" replaced by a small filled circle in
Ember (#E8501A). Clean. Recognisable at small sizes.

---

## Tone of Voice

**Personality:** Confident. Direct. A little dry wit.
Not corporate. Not try-hard startup.

**Write like:** A sharp friend who actually knows what they're
doing — not a press release, not a chatbot.

**Examples:**
- ✅ "Your store is live. Go sell something."
- ✅ "Payment failed. Try a different card."
- ❌ "Congratulations! Your transaction could not be processed
      at this time. Please try again later."
- ❌ "We're so excited to have you onboard!"

**Principles:**
1. Short sentences over long ones.
2. Active voice always.
3. No exclamation marks in system messages.
4. Numbers, not words: "3 items" not "three items".
5. Honest over polished. If something fails, say it plainly.

---

## Motion & Interaction

- Transitions: 150ms ease-out for UI interactions
- Page transitions: subtle fade — 200ms
- Hover on buttons: background lightens 10%, no scale
- Hover on product cards: image scales to 103%, shadow lifts
- Loading states: skeleton screens, not spinners
- No bouncy animations — feels cheap for a commerce product

---

## What to Avoid
- No gradients on primary backgrounds
- No drop shadows heavier than shadow-md
- No rounded-full buttons (pill buttons feel too SaaS-y)
- No stock photo illustration style (Shopify/Mailchimp trap)
- No purple, bright blue, or neon anything
- No more than 2 font families on any page