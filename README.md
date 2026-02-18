# HyreLog Marketing Site

Marketing/brochure site for [HyreLog](https://hyrelog.com): compliance-grade audit logging — immutable trails, multi-region residency, auditor-ready exports.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**, **Tailwind CSS**
- **shadcn-style UI** (Radix primitives + Tailwind)
- **next-themes** (light/dark, system-aware)
- **File-based blog** (Markdown in `content/blog/`, rendered with a minimal server-side parser)
- **Forms (Server Actions only)**: Contact, newsletter (double opt-in), lead magnet, book demo — Resend + Turnstile + honeypot + rate limiting. All submissions persisted to **Prisma** (PostgreSQL).

## Setup

### Package manager

The project is set up for **pnpm**. From the repo root:

```bash
pnpm install
```

If you use npm, run `npm install` (and ignore `packageManager` in `package.json` if needed).

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `SITE_URL` | Canonical site URL (e.g. `https://hyrelog.com`) for SEO and links |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for sending contact form emails |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | Sender address (must be a [verified domain](https://resend.com/docs/dashboard/domains/introduction) in Resend) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (server) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (client) |
| `RATE_LIMIT_MAX` | Max requests per window (default 5) |
| `RATE_LIMIT_WINDOW_SEC` | Rate limit window in seconds (default 60) |
| `DATABASE_URL` | PostgreSQL connection string for Prisma |

- Without Resend keys, form submissions will fail to send email.
- Without Turnstile keys, forms still work; the server logs a warning and skips token verification.
- **Database (Prisma 7):** The project uses Prisma 7 with the `prisma-client` generator and `@prisma/adapter-pg`. The connection URL is configured in `prisma.config.ts` (not in the schema). Run `pnpm db:generate` or `npm run db:generate` after clone to generate the client into `generated/prisma`. Run `prisma migrate dev` or `prisma db push` to apply the schema. The `pg` package is required for the adapter.

### Brand assets

Add your logos under `public/brand/`:

- `hyrelog-logo-dark.png` — used on light backgrounds (e.g. light theme header)
- `hyrelog-logo-light.png` — used on dark backgrounds (e.g. dark theme header)

If these are missing, the header shows a fallback “H” initial. See `public/brand/.gitkeep` for a short note.

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

## Content

### Blog

- **Location**: `content/blog/` — one file per post (`.md` or `.mdx`).
- **Frontmatter**: `title`, `description`, `date`, `tags` (array), `published` (boolean), optional `author`.
- **RSS**: `/rss.xml` (generated from published posts).

Add or edit Markdown/MDX files; no CMS. Rebuild or rely on dev server to pick up changes.

## SEO

- **Metadata**: Each route sets `title`, `description`, canonical URL, Open Graph, and Twitter tags via `lib/seo.ts` and `generateMetadata` where applicable.
- **Sitemap**: `/sitemap.xml` (dynamic, includes blog slugs).
- **Robots**: `/robots.txt` (allow all, disallow `/api/`, link to sitemap).
- **JSON-LD**: Organization and SoftwareApplication on the root layout; BlogPosting on each blog post.
- **OG image**: Default is `SITE_URL/og-default.png`. Add a static image at `public/og-default.png` or implement a dynamic OG route if you prefer.

## Project structure (high level)

- `app/` — App Router routes (home, product, security, pricing, blog, contact, book-demo, resources, newsletter/confirm, terms, privacy, compare).
- `app/actions/` — Server Actions only (contact, newsletter, lead-magnet, book-demo). No `/api` routes for these forms.
- `components/marketing/` — Header, footer, contact form, newsletter form, blog search.
- `components/forms/` — Turnstile widget.
- `components/ui/` — Reusable UI (Button, Card, Badge, Input, Textarea, Accordion, Tabs, Dialog, Separator).
- `components/providers/` — Theme provider (next-themes).
- `lib/` — `seo.ts`, `blog.ts`, `db.ts` (Prisma 7 + adapter), `zod-error.ts` (Zod 4–compatible helpers), `lib/security/` (ip, ua, rate-limit, honeypot, turnstile), `lib/email/resend.ts`, `lib/crypto/tokens.ts`.
- `prisma.config.ts` — Prisma 7 config (datasource URL, schema path). Env is loaded via `dotenv/config`.
- `generated/prisma/` — Generated Prisma client (gitignored; create with `db:generate`).
- `content/blog/` — Blog posts (`.md` / `.mdx`).
- `public/resources/` — Add `soc2-audit-trail-checklist.pdf` for the lead magnet download (only linked after redemption).

## Deploy (e.g. Vercel)

- Set the env vars in the Vercel project.
- Optional: use [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for distributed rate limiting by extending `lib/security/rate-limit.ts`. Default is in-memory (serverless-safe; state may reset between invocations).

---

© HyreLog. Compliance-grade audit logging for modern SaaS.
