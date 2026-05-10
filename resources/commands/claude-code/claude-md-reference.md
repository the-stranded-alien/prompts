# CLAUDE.md Reference

The complete guide to writing effective CLAUDE.md files.

## What CLAUDE.md Is

A markdown file that Claude Code reads automatically at the start of every session. It's your persistent, version-controlled instruction set — the single most impactful thing you can do to improve Claude Code's output quality in your project.

## File Locations & Load Order

Claude loads CLAUDE.md files from all of these locations, merging them:

```
~/.claude/CLAUDE.md            ← global (your personal defaults)
~/projects/CLAUDE.md           ← parent directory (monorepo root)
~/projects/my-app/CLAUDE.md    ← project root (most specific)
~/projects/my-app/src/CLAUDE.md ← subdirectory (for focused tasks)
```

More specific files take precedence. Use subdirectory files to scope instructions to specific modules.

## Full Template

```markdown
# Project: [Name]

## Overview
[1–2 sentences: what this is, what it does]
Stack: [framework, language, key libraries]

## Commands
\`\`\`bash
npm run dev          # start dev server (port 3000)
npm test             # jest — run all tests
npm run test:watch   # jest in watch mode
npm run lint         # eslint + prettier check
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm run db:migrate   # run pending Prisma migrations
npm run db:seed      # seed dev database
\`\`\`

## Architecture
\`\`\`
src/
  app/          Next.js app router pages and layouts
  components/   React components (named exports only)
  lib/          Shared utilities and helpers
  api/          API route handlers
  types/        Shared TypeScript types
  hooks/        React hooks
prisma/
  schema.prisma DB schema
  migrations/   Migration history
\`\`\`

## Coding Conventions
- TypeScript strict mode — no `any`
- Named exports everywhere, no default exports
- All DB queries via `lib/db.ts` — never import Prisma directly in routes
- API routes return `{ data }` on success, `{ error: string }` on failure
- Zod for all API input validation
- Components: colocate tests in `__tests__/` next to source file
- Imports: use `@/` alias for src/ root (configured in tsconfig)

## Key Patterns
- Auth: all authenticated routes use `withAuth` middleware from `lib/auth.ts`
- Errors: throw `AppError` from `lib/errors.ts`, never raw `Error`
- Logging: use `lib/logger.ts` — never `console.log` in committed code
- Feature flags: `lib/flags.ts` — not env vars directly
- Date handling: `dayjs` — never `date-fns` or native Date methods

## What NOT to Do
- Never use `any` in TypeScript — use `unknown` and narrow
- Never commit `.env` or `.env.local`
- Never import from `@prisma/client` directly outside `lib/db.ts`
- Never use `npm run` when `npx` would work — prefer npx for one-offs
- Never write `console.log` in source code

## Testing
- Unit tests: Jest + Testing Library
- Integration tests: hit real test DB (never mock the DB layer)
- E2E: Playwright in `e2e/`
- Test DB auto-resets between integration test runs (see `jest.setup.ts`)

## Environment
- Node 20+
- `.env.local` for local secrets (gitignored)
- `.env.example` for required vars with dummy values (committed)
```

## Minimal Starter

For a quick start, `/init` generates one automatically. Then trim it down:

```markdown
## Commands
npm test && npm run lint && npm run build

## Stack
Next.js 14, TypeScript, Prisma, PostgreSQL

## Key rule
All DB access via lib/db.ts. API routes return { data } or { error }.
```

## Tips

- **Update it** — when you make an architectural decision, add it to CLAUDE.md
- **Keep it honest** — wrong conventions in CLAUDE.md are worse than none
- **Link, don't repeat** — "See src/lib/auth.ts for the auth pattern" beats copying the code in
- **One line per rule** — dense lists are read; paragraphs are skimmed
- **Add gotchas** — non-obvious constraints ("we use dayjs not date-fns") are the most valuable content
