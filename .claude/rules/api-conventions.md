# API Conventions

## Architecture

This site has one backend endpoint: the contact form. It is an Astro API endpoint (`src/pages/api/contact.ts`) that runs as a Vercel serverless function and sends email to Prashant through Resend. There is no auth and no database. Adding any other endpoint is a scope change: ask first.

---

## Response envelope

```ts
export type ApiSuccess<T> = { data: T; error: null };
export type ApiError = { data: null; error: { message: string; code: string } };
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function ok<T>(data: T): ApiSuccess<T> { return { data, error: null }; }
export function err(message: string, code: string): ApiError { return { data: null, error: { message, code } }; }
```

Use these shapes for every response from the endpoint, success and failure.

---

## Contact form: spam protection (all four required)

Resend only sends email and does not filter anything. Spam protection lives in our endpoint, and each layer needs a test.

1. **Honeypot field.** A hidden input that people never fill in. If it has a value, return a normal-looking success and do not send. Never tell bots they were caught.
2. **Time check.** The form includes a render timestamp. Reject submissions faster than a minimum threshold (start at 3 seconds).
3. **Server-side validation.** Check type, shape, length and allowed values for every field. Require a valid email format, cap message length, and limit the number of links. Never trust client-side validation alone.
4. **Cloudflare Turnstile.** Verify the token server-side with Cloudflare's siteverify API before sending. Reject a missing or invalid token.

If spam still gets through, add rate limiting per IP (Vercel firewall rules or Upstash). The Resend free tier caps sends at 100 a day, so a flood would block real enquiries.

---

## Error handling

- Catch every error and return it in the envelope shape above.
- Never expose raw errors, Resend responses or stack traces to the client.
- Log errors server-side with enough context to debug. Never log the full message body or the visitor's email in plain logs.

---

## Secrets

- `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` are server-side Vercel env vars only.
- Never put secrets in `PUBLIC_*` env vars or any client-side code. Only the Turnstile site key may be public.

---

## Every endpoint must have

- CORS allowlist (the site's own origin only, no wildcard `*`), set in the handler
- Input validation, plus the spam layers above
- No secrets on the client
- A `/security` review before deployment
