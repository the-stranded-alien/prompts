# Codex Approval Modes

When to use suggest, auto-edit, and full-auto.

## The Three Modes

### `suggest` (safest)
Codex shows you what it wants to do — you decide whether to apply each change.

**Best for:**
- Unfamiliar codebases
- High-stakes changes (auth, payments, data migrations)
- Learning how Codex approaches a problem
- Any time you want full control

```bash
codex --approval-mode suggest "refactor the database connection pooling"
```

**Flow:**
```
Codex proposes change → You review → [y] apply / [n] skip / [e] edit → Codex continues
```

---

### `auto-edit` (recommended default)
Codex applies file edits automatically but asks before running shell commands.

**Best for:**
- Day-to-day coding tasks in your own codebase
- Iterative feature development
- When you trust the edits but want control over side effects (tests, builds, npm installs)

```bash
codex --approval-mode auto-edit "add zod validation to all POST routes"
```

**Flow:**
```
File edits → applied automatically
Shell commands → you approve each one
```

---

### `full-auto` (fastest)
Everything runs without prompting. Codex reads, writes, and executes.

**Best for:**
- CI/CD pipelines
- Scripted automation
- Trusted, well-defined, low-risk tasks
- When you've already validated the task pattern

```bash
codex --approval-mode full-auto "fix eslint errors and run tests"
```

**Safety tips for full-auto:**
- Run in a git branch — always
- Scope the task tightly — vague tasks + full-auto = broad changes
- Set up a post-run test check: `codex --approval-mode full-auto "..." && npm test`

---

## Decision Guide

```
Is this a new/unfamiliar codebase?           → suggest
Is this a high-risk change (auth, data)?     → suggest
Is this routine code in your own project?    → auto-edit
Is this in a CI pipeline or trusted script?  → full-auto
Are you unsure?                              → auto-edit (safe default)
```

## Setting a Default

```bash
# In your shell profile
export CODEX_APPROVAL_MODE=auto-edit
```

Or per project in `AGENTS.md`:
```
Default approval mode: auto-edit
```
