# Instant Quote Calculator

Multi-tenant Next.js app for interactive quote funnels with server routes for lead capture, PDF generation, and integrations.

## Tech
- Next.js 14 (App Router), React 18, TypeScript
- TailwindCSS, React Hook Form, Zod, Zustand
- Placeholder server routes for PDFs, payments, email (wire in Supabase/Stripe/Resend later)

## Quick Start
1. Copy `.env.example` to `.env.local` and fill values as needed.
2. Install deps: `npm install`
3. Dev server: `npm run dev`

## Structure
- `app/(site)` pages: landing, quote, thank-you
- `app/api` server routes: `POST /api/quotes` etc.
- `src/lib` pricing, tenants, pdf
- `src/store` zustand store

## Environment
See `.env.example` for variables used by integrations. This starter keeps them optional.

## Deployment
- Vercel recommended; add wildcard domain for microsites and set env vars.

## Next Steps
- Hook Supabase: save quotes and upload PDFs
- Wire Resend/SendGrid for emails
- Add Stripe PaymentIntent in pay route and webhook verification
