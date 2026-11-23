# /conventions — Code Conventions & Scope Review

Run this command when reviewing any new or modified code, whoever wrote it. It checks scope, TDD, conventions and correctness against `CLAUDE.md` and `.claude/rules/`.

## What to check

### 1. Scope compliance
This is a pure marketing site. The following are out of scope and need explicit confirmation:
- Sign-in, user accounts, sessions or any auth
- A database or CMS
- Any backend endpoint other than the contact form (`src/pages/api/contact.ts`)
- Client-side frameworks (React, Vue and so on) or heavy client JavaScript
- Analytics, tracking or third-party scripts beyond Cloudflare Turnstile
- Paid services or plan upgrades (Vercel Pro, Resend Pro, Tailwind Plus)

If you find a scope violation, stop and don't go further without confirmation.

### 2. TDD
- Does every new or changed piece of logic, component and endpoint behaviour have a test?
- Is there evidence the test came first? (A test that would fail without the change, not one written to match existing code.)
- Do the tests assert on behaviour and output, not implementation details?
- Do `npm test` and the build pass?

### 3. Duplication
- Does this component already exist in `src/components/`?
- Is work experience or other content hardcoded in a page instead of coming from `src/content/`?
- Is a page repeating layout markup that belongs in `src/layouts/`?
- Is logic repeated that belongs in `src/lib/`?

### 4. Naming and structure
- Components and layouts are PascalCase `.astro`. Pages are kebab-case. Utilities are camelCase.
- No barrel `index.ts` files. No generic names like `Helper`, `Utils` or `Manager`.
- Constants are SCREAMING_SNAKE_CASE.

### 5. Astro and performance
- Static by default. Any `client:*` directive is justified, and `client:visible` is preferred.
- Images use `<Image />` with `alt` text.
- No hard-coded colours. Tailwind theme tokens only.

### 6. TypeScript
- No `any` or `@ts-ignore`. `interface Props` is typed in every component.
- Content collections have Zod schemas.
- No unused imports or variables.

### 7. Contact endpoint (if touched)
- All four spam layers are present and tested: honeypot, time check, server-side validation, Turnstile verification.
- Every response uses the `{ data, error }` envelope shape.
- CORS allowlist only, no `*`.
- `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` are server-only. No secrets in `PUBLIC_*` vars or client code.
- No raw errors or visitor data leak to the client or the logs.

### 8. Accessibility
- Semantic HTML and correct heading order.
- Labelled form fields with announced errors.
- Keyboard-reachable controls with a visible focus state.

### 9. Component complexity
- Flag any component over ~150 lines. It should be split.
- No logic inline in templates. Move it to the frontmatter or `src/lib/`.

## Output format

Report findings as:
- **BLOCK**: must fix before committing (scope violation, missing tests or code written before its test, secret exposure, missing spam layer, broken TypeScript or build)
- **WARN**: should fix soon (duplication, naming, complexity, accessibility gaps, unjustified client JS)
- **NOTE**: minor, fix when passing through

End with a one-line verdict: clean / needs work / blocked.
