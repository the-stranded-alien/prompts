# Codex Agent Pattern

Structure tasks for Codex to get accurate, minimal, well-targeted completions.

## What Codex Needs

Codex works best when it has:
1. **Exact task** — what to do, not what to think about
2. **Relevant context** — the files it needs, not the whole repo
3. **Output constraints** — format, scope, what not to touch

## Task Structure Template

```
Task: [one clear imperative sentence]

Context:
- File: path/to/file.ts
- Function: functionName (lines 42–78)
- Related: path/to/types.ts

Constraints:
- Only modify [specific function/file]
- Match existing style (tabs, single quotes)
- Do not add new dependencies

Expected output:
- Modified function with [specific change]
- No other files changed
```

## Anti-Patterns to Avoid

| Anti-pattern | Better |
|-------------|--------|
| "Improve this code" | "Add input validation for the `email` param in `createUser`" |
| "Fix the bug" | "Fix the null pointer in `getUserById` when user doesn't exist" |
| "Rewrite this file" | "Extract the auth logic from `app.ts` lines 40–80 into `lib/auth.ts`" |
| Open-ended | Specific + bounded |

## Context Files to Include

Always include:
- The file being modified
- Type definitions it uses
- The test file (if exists)
- Any interface/schema it must conform to

Don't include:
- Unrelated files
- Large auto-generated files
- Full node_modules (obviously)

## Approval Modes

| Mode | Use When |
|------|---------|
| `suggest` | Unfamiliar codebase, or high-risk change |
| `auto-edit` | Routine changes in well-understood code |
| `full-auto` | Fully automated pipelines, low-risk tasks |

## Verifying Output

After Codex makes a change:
```bash
git diff             # review what changed
npm test             # run tests
npm run lint         # check style
```

If something looks wrong, provide a correction prompt referencing the specific issue rather than asking for a full retry.
