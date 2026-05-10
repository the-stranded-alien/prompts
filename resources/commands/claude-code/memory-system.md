# Claude Code Memory System

Persist knowledge, preferences, and project context across sessions.

## How It Works

Claude Code has a file-based memory system. Memories are markdown files stored in a dedicated directory. An index file (`MEMORY.md`) is loaded automatically at the start of every session — giving Claude persistent context without re-explaining things each time.

## Memory Location

```
~/.claude/projects/<project-path>/memory/
  MEMORY.md          ← index (auto-loaded every session)
  user_role.md       ← who you are
  feedback_style.md  ← how you like to work
  project_context.md ← ongoing project state
  ...
```

## Memory Types

| Type | What to store | Example |
|------|-------------|---------|
| `user` | Your role, expertise, preferences | "Senior backend engineer, strong in Go, learning React" |
| `feedback` | How Claude should behave | "No trailing summaries. Terse responses." |
| `project` | Ongoing work, decisions, context | "Auth rewrite driven by compliance, not tech debt" |
| `reference` | Where to find things | "Bug tracker: Linear project INFRA" |

## Asking Claude to Remember

```
Remember that we use cursor-based pagination everywhere — add this to memory.
```

```
From now on, don't add trailing summaries at the end of responses. Save this.
```

```
Remember the context: we're mid-way through migrating from REST to tRPC. 
The API layer is partially migrated. Save this as a project memory.
```

## Asking Claude to Recall

```
Check your memory for any context about this project before we start.
```

```
What do you remember about my preferences for code reviews?
```

## Memory File Format

```markdown
---
name: Feedback: terse responses
description: User wants short, direct responses with no padding
type: feedback
---

No trailing summaries after tool use. No "I've completed..." closings.
One sentence updates during work. Match the pace the user sets.

**Why:** User finds verbose responses slow and distracting.
**How to apply:** Every response — check length before sending.
```

## What NOT to Store

- Code patterns (just read the code)
- Git history (use `git log`)
- In-progress task details (use TodoWrite / task list instead)
- Things already in CLAUDE.md

## Keeping Memory Fresh

Memory can go stale. Before acting on a recalled memory, verify:
- File paths still exist
- Functions / flags are still in the code
- Project state hasn't changed

If a memory conflicts with what you see in the code, trust the code and update the memory.
