# Decision: Contact form via an Astro endpoint on Vercel, sending through Resend

**Date:** 2026-11-23
**Status:** Accepted

## Context

The site's only interactive feature is a contact form (see `2026-11-23-stack-astro-tailwind-vercel.md`). Submissions need to reach Prashant by email. There are two ways to do this: our own endpoint plus an email service, or a hosted form service.

## Decision

The form posts to an **Astro API endpoint in this project**. It runs as a **Vercel serverless function**, validates the submission and sends an email to Prashant through **Resend**.

## Why

- We control validation, spam protection, error handling and branding, all in code we can test (TDD is required).
- No third-party form service sits between the visitor and Prashant, and no monthly submission caps come from one.
- Cost: Resend's free tier (3,000 emails a month, 100 a day, up to 3 domains) is far above what a personal site's contact form will send. It never bills overage; sends above the limit just fail. Figures checked 2026-11-23 from third-party summaries. Confirm at resend.com/pricing.

## Alternatives considered

- **Hosted form service (Formspree, Web3Forms).** No backend code, but it adds an outside dependency and less control over spam and branding, and free tiers often cap submissions. Rejected.

## Consequences

- **Spam protection is our job.** Resend only sends email and does not filter submissions. Planned layers: a honeypot field, a minimum time-to-submit check, server-side validation (type, shape, length, allowed values), and Cloudflare Turnstile. Add rate limiting if spam gets through. This matters for more than tidiness: a bot flood could use up the 100-a-day Resend cap and block real enquiries until 00:00 UTC.
- **A verified sending domain is required.** Resend sends only from a domain verified by DNS records, so the form can't go live until Prashant's domain is set up.
- **Secrets stay on the server.** The Resend API key (and the Turnstile secret) are server-side Vercel env vars, never `PUBLIC_*` or client code.
- The endpoint follows the standard response shape and backend-endpoint rules, and needs a `/security` review before deployment.
