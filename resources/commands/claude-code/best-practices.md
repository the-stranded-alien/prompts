# Claude Code Best Practices

Power-user tips for getting the most out of Claude Code.

## CLAUDE.md is Your Force Multiplier

A good `CLAUDE.md` turns every session from cold-start to expert-in-context:
- Run `/init` once, then edit the output
- Include: commands, conventions, architecture, gotchas
- Add `~/.claude/CLAUDE.md` for your personal global preferences
- Update it as the project evolves — treat it like living docs

## Give Context Before Asking

Load files with `#filename` before complex requests:
```
#src/api/auth.ts #src/lib/jwt.ts Add refresh token rotation
```
Claude reads them immediately rather than spending turns discovering them.

## Be Specific About Scope

Vague: "Fix the bug in the auth system"
Specific: "Fix the null pointer exception in `src/api/auth.ts` line 47 when `req.user` is undefined"

Vague requests lead to over-broad changes. Specific requests produce surgical edits.

## Use the Edit/Write Split

- Use `Edit` (the default) for modifying existing files — it produces minimal diffs
- Use `Write` only when creating new files or doing a full rewrite
- Never ask Claude to "rewrite the whole file" unless you truly want that

## One Task at a Time

Claude does best with focused, bounded tasks. Chain them explicitly:
```
1. Add the database migration
→ verify, then:
2. Add the API endpoint
→ verify, then:
3. Add the frontend component
```

Rather than: "Add migration, endpoint, and frontend all at once."

## Verify Before Accepting

Always run:
```bash
git diff                  # what actually changed?
npm test                  # do tests still pass?
npm run lint              # any style regressions?
```

Don't trust the summary — read the diff.

## Use Hooks for Automatic Guardrails

Set up `PostToolUse` hooks to auto-run lint and tests after every edit. You get continuous feedback without asking for it.

## Parallel Agents for Independent Tasks

For independent workstreams, run Claude Code in multiple terminal tabs pointed at the same repo (use git worktrees to avoid conflicts):

```bash
git worktree add ../feature-auth -b feature/auth
git worktree add ../feature-payments -b feature/payments
# Open two Claude Code sessions, one per worktree
```

## Extended Thinking for Hard Problems

For architectural decisions or complex debugging, ask Claude to think:
```
Think deeply about the best approach to restructure the auth module 
before writing any code.
```

Claude will surface tradeoffs you might not have considered.

## Memory Between Sessions

Save important context to `CLAUDE.md` or the memory system so it persists:
```
Remember: we decided to use cursor-based pagination everywhere, 
not offset pagination. Add this to CLAUDE.md.
```

## The `!` Shortcut

Type `! command` to run a shell command directly in the session:
```
! git log --oneline -10
! npm test
```

The output lands in the conversation — useful for feeding Claude real data.
