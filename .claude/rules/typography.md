# Typography Rules

## Quotation marks — code vs. content

### Code positions — always straight quotes `"` `'`

Straight quotes are required in all code contexts. Never replace these with curly quotes:

- Import paths: `import Foo from "./Foo"`
- JSX attribute values: `className="..."`, `variant="outline"`, `mode="wait"`
- TypeScript types and interfaces
- Variable declarations and assignments
- Any string that is a code identifier, path, or token

### Content positions — always curly (typographic) quotes

Use curly quotes in user-visible text content:

| Character | Unicode | Use for |
|-----------|---------|---------|
| `’` | U+2019 | Apostrophes in contractions (`don't`, `it's`) and possessives |
| `“` | U+201C | Opening double quotation mark in copy |
| `”` | U+201D | Closing double quotation mark in copy |

Content positions include:
- JSX text nodes: `<p>It’s a test</p>`
- String prop values for user-facing text: `heading="..."`, `a: "..."`, `q: "..."`
- Quoted phrases **inside** JS string values: `a: "Pick “none of these” and..."`

### Critical rule — quoted phrases inside JS strings

When a quoted phrase appears inside a JavaScript string value, use curly quotes for the inner phrase. Straight double quotes inside a straight-double-quoted string break the parser:

```tsx
// ❌ BROKEN — inner straight quotes terminate the outer string
a: "Pick "none of these feel right" and the tool generates more.",

// ✅ CORRECT — curly inner quotes are valid Unicode inside the string
a: "Pick “none of these feel right” and the tool generates more.",
```

### How to do the replacement safely

When replacing straight apostrophes with curly in bulk:
- Target contractions only: regex `([A-Za-z])'([A-Za-z])` → `\1’\2`
- Do NOT replace double quotes programmatically in `.tsx`/`.ts` files — the distinction between code and content strings is too subtle for automated replacement
- Fix inner double quotes manually, line by line, only in string values that contain quoted phrases

---

## Orphan prevention — text wrapping

### Rule

Every user-visible text element must use a wrapping utility to prevent orphaned words (single words on the last line).

| Element type | Utility | Notes |
|---|---|---|
| Headings (`h1`–`h4`, large display text) | `text-balance` | Balances line lengths across the whole element |
| Body paragraphs, subtitles, captions | `text-pretty` | Prevents orphan on final line only |
| Single-line labels, badges, buttons | Neither needed | They don't wrap |
| `whitespace-nowrap` elements | Neither needed | Wrapping is suppressed |

### Application

- Apply at the element level, not the container.
- Both utilities are Tailwind 3.4+ — already in the project.
- `text-balance` on body text degrades gracefully but is less performant; prefer `text-pretty` for paragraphs.
- When auditing, target: `<h1>`, `<h2>`, `<h3>`, `<p>` with more than ~6 words, motion text blocks, card descriptions, FAQ answers, eyebrow lines longer than one word.

---

## Apostrophes in contractions — automated fix

Use this Python pattern to fix contractions without touching code:

```python
import re
# Only matches apostrophes between letters — safe for contractions
CONTRACTION = re.compile(r"([A-Za-z])'([A-Za-z])")
fixed = CONTRACTION.sub(lambda m: m.group(1) + "’" + m.group(2), content)
```

Skip lines starting with `import`, `from`, `className=`, `export`, `const`, `interface`, `type`.
