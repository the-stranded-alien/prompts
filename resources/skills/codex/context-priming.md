# Codex Context Priming

How to prime Codex with the right codebase context before asking it to make changes.

## Why Context Priming Matters

Codex doesn't have persistent memory. Each session starts fresh. If you don't give it context, it will:
- Use patterns inconsistent with your codebase
- Miss existing utilities it should reuse
- Introduce inconsistent naming or style
- Duplicate code that already exists

## Priming Checklist

Before any non-trivial task, give Codex:

### 1. Project Overview
```
"This is a Next.js 14 app with TypeScript, Prisma (PostgreSQL), 
and Tailwind CSS. API routes live in src/app/api/, React components 
in src/components/, shared utilities in src/lib/."
```

### 2. Relevant Files
```
"Read these files before we start:
- src/lib/db.ts (database client)
- src/types/index.ts (shared types)
- src/app/api/users/route.ts (example API route pattern)"
```

### 3. Conventions
```
"Conventions to follow:
- All DB queries use the `db` client from src/lib/db.ts — never import Prisma directly
- API routes return { data } on success, { error: string } on failure
- Use zod for input validation in API routes
- Components use named exports, not default exports"
```

### 4. What's Nearby
```
"Here's the test file for the module we're changing: [paste or reference]
Here's a similar module you can use as a style reference: [paste or reference]"
```

## Quick Context Template

```
Stack: [framework, language, key libraries]
Directory layout: [key dirs and what's in them]
Key conventions: [3–5 most important rules]
Files to read first: [list]
Task: [specific ask]
```

## Context Refresh

For long sessions, re-prime context when:
- Switching to a different part of the codebase
- After more than ~20 turns
- When Codex starts making stylistically inconsistent suggestions

```
"Reminder: we're now working in the payments module. 
Read src/lib/payments.ts before continuing."
```
