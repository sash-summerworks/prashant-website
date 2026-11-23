# Prashant website — resume and CV site for Prashant Rajkhowa

## What is this

A marketing website that works as Prashant Rajkhowa's resume and CV. Its core job is to show his work experience, which spans TV, writing, digital content, tech products and more. The site has several landing pages, each able to frame that experience for a different audience.

It is a pure marketing site: no sign-in, no user accounts, no app environment.

---

## Stack

- **Frontend:** Astro + TypeScript + Tailwind CSS. Static output, no client-side JavaScript unless a component needs it.
- **Auth:** None. No sign-in or accounts.
- **Database:** None. Content (work experience, landing-page copy) lives in the repo under `src/content/`.
- **Backend:** A contact form, and nothing else. The form posts to an Astro API endpoint that runs as a Vercel serverless function and emails Prashant through Resend. Spam protection is our endpoint's job, because Resend only sends. The Resend API key is a server-side env var only.
- **Hosting:** Vercel

---

## Codebase structure

```
src/
  pages/         # One .astro file per route / landing page
  layouts/       # Shared page shells (head, header, footer)
  components/    # Reusable .astro components, grouped by area
  content/       # Work experience and other structured content (Astro content collections)
  styles/        # Global CSS / Tailwind entry
public/          # Static assets served as-is (images, CV PDF, favicon)
```

---

## Code conventions

See `.claude/rules/` for detailed rules:
- `code-style.md` — TDD, DRY, Astro naming and structure, components, Tailwind, accessibility, TypeScript
- `typography.md` — quotation marks, orphan prevention
- `api-conventions.md` — the contact endpoint: response envelope, spam protection, errors, secrets

---

## Testing

**TDD is required for all code.** Write a failing test first, watch it fail, then write the minimum code to pass, then refactor. No production code without a test that drove it. Use the Superpowers `test-driven-development` skill.

- **Unit and integration:** Vitest, configured through Astro's `getViteConfig`. Covers utilities, content schemas, and the contact-form endpoint (validation, spam protection, error responses).
- **Components:** rendered in Vitest with the Astro Container API. Assert on output HTML, not implementation.
- **End to end:** Playwright for key journeys: landing pages load, navigation works, contact form submits.

Run tests: `npm test` [PROJECT: confirm once the Astro project is set up]

Pre-push hook: [PROJECT: add once the test setup exists — runs `npm test` and blocks the push on failure]

---

## Security

Every new feature, endpoint, or backend function requires a security audit before implementation and before deployment. Run `/security` and add the findings + resolution table to the feature doc before committing.

Every new backend endpoint must have:
- CORS allowlist (no wildcard `*`)
- Input validation: type, shape, length, allowed values
- Parameterised queries — no string interpolation in SQL
- Auth gate appropriate to the caller
- No secrets in client-side env vars

---

## When to ask before acting

If a task is ambiguous — scope unclear, right file not obvious, multiple valid interpretations — stop and ask.

Always ask before:
- Choosing which component or file to change when several candidates exist
- Applying a visual change globally vs to a specific page or context
- Any destructive or hard-to-reverse action not explicitly requested

---

## What I need to know at the start of each session

- What area are we working on today?
- Any constraints or decisions made since the last session?
