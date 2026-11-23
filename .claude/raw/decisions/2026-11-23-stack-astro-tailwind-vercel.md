# Decision: Astro + Tailwind CSS on Vercel, TDD for all code

**Date:** 2026-11-23
**Status:** Accepted

## Context

This is a resume and CV website for Prashant Rajkhowa. It is a pure marketing site: no sign-in, no accounts, no app. Its job is to show work experience that spans TV, writing, digital content, tech products and more, across several landing pages. Each page draws on the same experience. The only interactive feature is a contact form.

## Decision

- **Framework: Astro + TypeScript.** It produces static HTML with no client-side JavaScript by default. Shared layouts mean the header, footer and page shell are written once. Content collections let the work experience live in one typed source that every landing page draws from, so job descriptions never get copied between pages and drift.
- **Styling: Tailwind CSS.** Fast to write, especially with AI assistance, and it keeps spacing and colour consistent. Plain CSS would also have worked. This was a preference, not a requirement.
- **Hosting: Vercel.** It supports Astro with no setup. The contact form's endpoint can run as a Vercel serverless function.
- **Testing: TDD for all code.** Vitest for logic and the contact endpoint. Astro's Container API for rendering components in tests. Playwright for end-to-end journeys.

## Alternatives considered

- **Plain HTML/CSS.** No build step, but every landing page would repeat the layout and the experience content. Rejected because of that duplication.
- **Next.js.** Also works on Vercel, but it is built for apps and is more than a marketing site needs.
- **Astro + plain CSS.** Viable. We chose Tailwind as a matter of preference.

## Costs (checked 2026-11-23 from third-party summaries; confirm on vendors' pages)

- Astro and Tailwind CSS: free, MIT licence.
- Tailwind Plus (paid component library, about $109–$299 one-time): not needed, not planned.
- Vercel Hobby: free, but personal and non-commercial use only. Vercel Pro: about $20 per user per month, needed for commercial or agency-owned hosting.
- Domain: about $10–20 a year.
- Recommended, not yet decided: host on a Hobby account in Prashant's name and give the developer access, so the running cost is just the domain.

## Consequences

- The site has one backend surface, the contact form. It needs input validation, spam protection, a CORS allowlist, no secrets on the client, and a `/security` review before deployment.
- How the contact form sends submissions (Vercel function + email service, or a hosted form service) is a separate decision that hasn't been made yet.
- The scaffold's React-oriented conventions (`code-style.md`) must be adapted to Astro.
