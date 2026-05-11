# Deployment Guide — Jig Store

Your store is ready to go live on Vercel. Follow these steps to ensure a smooth transition from development to production.

## 1. Prerequisites
- A **Vercel** account.
- A **GitHub** repository (private recommended) containing the Jig codebase.
- Your **Supabase** (PostgreSQL) `DATABASE_URI`.
- Your **Paystack** Live Secret/Public keys.

## 2. Environment Variables in Vercel
Add the following variables to your Vercel Project Settings:

| Variable | Value |
| :--- | :--- |
| `PAYLOAD_SECRET` | Generate a long random string |
| `DATABASE_URI` | Your Supabase connection string |
| `PAYSTACK_SECRET_KEY` | Your Paystack **Live** Secret Key |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Your Paystack **Live** Public Key |
| `NEXT_PUBLIC_APP_URL` | Your production URL (e.g., `https://jigstore.com`) |
| `R2_BUCKET_NAME` | Your Cloudflare R2 bucket name |
| `R2_ACCESS_KEY_ID` | Your R2 Access Key |
| `R2_SECRET_ACCESS_KEY` | Your R2 Secret Key |
| `R2_ACCOUNT_ID` | Your Cloudflare Account ID |

## 3. Build Settings
Vercel should automatically detect the Next.js project. Use these settings:
- **Framework Preset:** Next.js
- **Root Directory:** `apps/web` (or let Vercel find the monorepo root)
- **Build Command:** `pnpm build`
- **Install Command:** `pnpm install`

## 4. Paystack Webhook (Optional but Recommended)
To ensure orders are marked as "Paid" even if a customer closes their browser too early:
1. Go to Paystack Dashboard > Settings > API Keys & Webhooks.
2. Set the Webhook URL to: `https://yourdomain.com/api/paystack-webhook`.
3. (Note: We can implement this endpoint if you need maximum reliability).

## 5. Domain Connection
1. In Vercel, go to **Settings** > **Domains**.
2. Add your custom domain (e.g., `jigstore.com`).
3. Follow the DNS instructions provided by Vercel.

## 6. Final Step: Live Mode
Once the site is live, perform one test purchase using your own card to ensure the Paystack **Live** integration is working.
