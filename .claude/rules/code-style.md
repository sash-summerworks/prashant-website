# Code Style Rules

## TDD first

All code is test-driven: failing test → minimum code to pass → refactor. No production code without a test that drove it. See the Testing section in `CLAUDE.md` for tools.

## DRY: don't repeat yourself

- If the same UI pattern appears in two places, extract it to a component in `src/components/`.
- If the same logic appears twice, extract it to a utility in `src/lib/`.
- Work experience and other content live **once** in `src/content/` (Astro content collections). Landing pages query and filter it. Never copy a job description into a page.
- Page shells (head, header, footer) live in `src/layouts/`. Pages never repeat them.

## Naming

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase `.astro` | `ExperienceCard.astro` |
| Layouts | PascalCase `.astro` | `BaseLayout.astro` |
| Pages | kebab-case (becomes the URL) | `src/pages/tv-and-film.astro` |
| API endpoints | kebab-case `.ts` | `src/pages/api/contact.ts` |
| Utilities | camelCase `.ts` | `formatDateRange.ts` |
| Content entries | kebab-case | `src/content/experience/bbc-producer.md` |
| Types/interfaces | PascalCase | `ExperienceEntry` |
| Constants | SCREAMING_SNAKE_CASE | `MIN_SUBMIT_SECONDS` |
| Tests | same name + `.test.ts`, next to the file (page tests go in `src/pages/_tests/`, because `.ts` files in `src/pages/` become routes) | `formatDateRange.test.ts` |
| E2E tests | kebab-case `.spec.ts` in `e2e/` | `e2e/contact-form.spec.ts` |

## File organisation

- Components: `src/components/<area>/`
- Layouts: `src/layouts/`
- Pages and routes: `src/pages/`
- Content collections and their schemas: `src/content/` and `src/content.config.ts`
- Utilities: `src/lib/`
- Global styles: `src/styles/`
- Static assets: `public/`
- No barrel `index.ts` files. Import directly.

## Component rules

- One component per file, doing one thing.
- Keep components under ~150 lines. If longer, extract sub-components.
- Keep logic in the frontmatter or in `src/lib/`, not inline in the template.
- Type props with an `interface Props` in the frontmatter.
- **Static by default.** Only add a client directive (`client:visible`, `client:load`) when a component genuinely needs interactivity, and say why in a comment. Prefer `client:visible` over `client:load`.
- Use Astro's `<Image />` for images, not raw `<img>`.

## Styling

- Tailwind utility classes only. No custom class names unless they're unavoidable, and then only in `src/styles/`.
- Design tokens (colours, fonts, spacing scale) are defined once in the Tailwind/CSS theme. No hard-coded hex values in components.
- Mobile-first: base classes for small screens, then `sm:`, `md:` and `lg:` upward.

## Accessibility

- Semantic HTML first (`<nav>`, `<main>`, `<section>`, `<article>`, proper heading order).
- Every image has meaningful `alt` text, or `alt=""` if it's decorative.
- Form fields have visible labels. Errors are announced and linked to their field.
- Interactive elements are keyboard-reachable with a visible focus state.

## Icons vs emojis

- Use SVG icons for navigation, buttons, forms and interactive controls. No emojis there.
- Decorative emojis, if used at all, are wrapped in `<span aria-hidden="true">`.

## TypeScript

- `strict` mode on. No `any`, no `@ts-ignore`.
- Prefer `type` for unions and simple aliases, `interface` for object shapes.
- Content collection schemas use Zod (`astro:content`), so content is type-checked at build time.

## Imports

- Use path aliases from `src/` (configured in tsconfig).
- Group imports: Astro/framework → third party → internal → types.
- No unused imports, ever.
