# Codex Best Practices

Task structure, context, and prompting patterns that get the best results from Codex.

## Write an AGENTS.md

Like `CLAUDE.md` for Claude Code, `AGENTS.md` is Codex's persistent context file:

```markdown
# Project: MyApp

## Stack
Next.js 14, TypeScript, Prisma (PostgreSQL), Tailwind CSS

## Commands
npm run dev        # dev server
npm test           # jest + vitest
npm run lint       # eslint + tsc
npm run db:migrate # run pending migrations

## Conventions
- DB queries: always use `lib/db.ts`, never import Prisma directly
- API routes: return { data } or { error: string }
- Components: named exports, no default exports
- Validation: zod in API routes, react-hook-form in components

## What NOT to do
- Never use `any` in TypeScript
- Never hardcode credentials
- Don't modify package-lock.json manually
```

## Task Prompting Patterns

### Imperative, bounded tasks
```
Fix the null pointer exception in `createUser` when `email` is undefined
```
Not: "The createUser function has issues"

### Reference exact locations
```
In src/api/users.ts, in the `updateUser` function, add a check that 
the requesting user can only update their own profile unless they have admin role
```

### State constraints
```
Add pagination to the `/api/posts` endpoint. Use cursor-based pagination.
Do not change the response schema for existing fields.
```

### Scope the output
```
Only modify src/api/posts.ts and src/types/api.ts.
Do not touch the frontend.
```

## Working with Codex Iteratively

1. **Start with exploration**: "What files handle authentication in this project?"
2. **Confirm understanding**: "Describe how the current auth flow works"
3. **Then implement**: "Now add refresh token support to this flow"

Skipping to implementation without confirmation → higher chance of wrong assumptions.

## Use Git as Your Safety Net

Always work in a branch:
```bash
git checkout -b codex/feature-name
codex --approval-mode auto-edit "implement the feature"
git diff           # review changes
npm test           # verify
git add -p         # stage selectively
```

If Codex goes sideways: `git checkout .` to reset.

## Provide Before/After Examples

For style-sensitive tasks:
```
Convert these callback-style functions to async/await.

Before example:
function getUser(id, callback) {
  db.find(id, (err, user) => callback(err, user))
}

After example:
async function getUser(id) {
  return await db.find(id)
}

Now apply this to all functions in src/lib/db.ts.
```

## Handling Multi-File Changes

Explicitly order file changes to respect dependencies:
```
Make these changes in order:
1. Add UserRole type to src/types.ts
2. Add role field to User model in src/models/user.ts
3. Update createUser in src/api/users.ts to accept role
4. Update UserForm component in src/components/UserForm.tsx

Confirm each file change before moving to the next.
```
