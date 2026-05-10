# AGENTS.md Reference

The complete guide to writing the AGENTS.md / CODEX.md context file for Codex.

## What AGENTS.md Is

A markdown file at the project root that Codex reads automatically before every task. It's the equivalent of Claude Code's CLAUDE.md — your persistent project context that prevents Codex from making style-inconsistent or uninformed edits.

## File Name Priority

Codex checks for context files in this order:
1. `AGENTS.md` (preferred)
2. `CODEX.md`
3. Custom path via `--project-doc path/to/file.md`

## Full Template

```markdown
# Project: [Name]

## Stack
- Language: TypeScript 5.x (strict mode)
- Framework: Next.js 14 (App Router)
- Database: PostgreSQL via Prisma ORM
- Testing: Jest + Testing Library
- Styling: Tailwind CSS

## Project Structure
src/
  app/          Next.js pages and API routes
  components/   React components
  lib/          Shared utilities
  types/        TypeScript type definitions
prisma/         Schema and migrations

## Build & Test Commands
npm run dev          # development server
npm test             # run all tests
npm run lint         # eslint check
npm run typecheck    # tsc --noEmit
npm run build        # production build

## Coding Style
- 2-space indentation, single quotes, semicolons
- Named exports only — no default exports
- Prefer `const` over `let`; never `var`
- TypeScript strict mode — no `any` allowed
- One component per file

## Architecture Rules
- All database queries go through `src/lib/db.ts`
- Never import `@prisma/client` directly in route handlers
- API routes: return `{ data: T }` on success, `{ error: string }` on failure
- All user input validated with zod before DB operations
- Auth: check `getServerSession()` at the top of every protected route

## Testing Rules
- Tests live in `__tests__/` directory next to the source file
- Integration tests use a real test database — do NOT mock the DB layer
- Each test file resets DB state in `beforeEach`
- Test files end in `.test.ts` or `.test.tsx`

## What NOT to Do
- Do not use `any` — use `unknown` and narrow the type
- Do not write `console.log` in production code
- Do not install new packages without noting them here
- Do not modify `prisma/migrations/` manually — always use `prisma migrate`
- Do not use default exports

## Packages to Prefer
- Date handling: `dayjs` (not `date-fns`, not native `Date`)
- HTTP client: native `fetch` (not `axios`)
- Validation: `zod`
- Env vars: `@t3-oss/env-nextjs`
```

## Tips for Effective AGENTS.md

**Be specific about the one-right-way rules.** "Use dayjs not date-fns" is more valuable than "handle dates carefully."

**List what NOT to do.** Codex has strong opinions — knowing your forbidden patterns prevents the most common regressions.

**Include exact command strings.** Copy-paste from your package.json — don't paraphrase.

**Update when you add packages or change patterns.** A stale AGENTS.md is worse than none.

**Keep it under 300 lines.** Codex reads the whole file; very long files dilute focus.

## Scoping with --project-doc

For tasks in a specific subsystem:

```bash
codex --project-doc docs/payments-context.md "refactor the checkout flow"
```

Useful when the root AGENTS.md is too general for a specialised deep dive.
