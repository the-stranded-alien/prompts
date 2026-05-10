# Init CLAUDE.md Skill

Bootstrap a `CLAUDE.md` file that gives Claude Code persistent project context.

## When to Use

Run `/init` in a new project, or when Claude Code lacks context about your codebase conventions.

## What a Good CLAUDE.md Contains

### 1. Project Overview (2–3 sentences)
What is this project, what does it do, and what stack does it use?

### 2. Commands
The exact commands to build, test, lint, and run the project:
```bash
npm run dev          # start dev server
npm test             # run test suite
npm run lint         # lint + type check
npm run build        # production build
```

### 3. Architecture
Key directories and what they contain:
```
src/
  components/   UI components
  lib/          shared utilities
  api/          server-side handlers
config/         configuration files
```

### 4. Conventions
- Naming: `PascalCase` for components, `camelCase` for functions
- Tests: colocated in `__tests__/` next to source
- Imports: absolute paths from `src/`
- State: Zustand for global, useState for local

### 5. Important Patterns
Gotchas, non-obvious choices, or constraints the agent should know:
- We use `dayjs` not `date-fns` — don't switch
- All DB queries go through `lib/db.ts`, never raw SQL in routes
- Feature flags via `lib/flags.ts`, not env vars directly

### 6. What NOT to Do
- Don't use `any` in TypeScript
- Don't commit `.env` files
- Don't modify `package-lock.json` manually

## Output

Claude Code will produce a `CLAUDE.md` at the project root. Review and edit it — it persists across all future sessions.
