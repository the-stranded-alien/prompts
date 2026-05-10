# Subagents & Parallel Work

Spawn specialised subagents and run independent tasks in parallel using git worktrees.

## What Subagents Are

When Claude Code runs the `Agent` tool, it spawns a separate Claude instance with its own context, tools, and task scope. The parent agent delegates work and waits for the result — or fires multiple agents in parallel.

## Why Use Subagents

- **Parallel execution** — run independent tasks simultaneously
- **Context isolation** — keep a large codebase exploration from polluting your main session
- **Specialisation** — give each agent a focused role (researcher, implementer, reviewer)
- **Context preservation** — delegate long sub-tasks so the main context stays clean

## Available Subagent Types

| Type | Best For |
|------|---------|
| `Explore` | Fast read-only search, file discovery, symbol lookup |
| `general-purpose` | Multi-step research, complex investigations |
| `Plan` | Architecture design, implementation planning |
| `claude-code-guide` | Claude Code / API / SDK questions |

## Parallel Worktrees Pattern

The most powerful pattern: run two Claude Code sessions simultaneously on isolated branches.

```bash
# Create isolated worktrees
git worktree add ../my-app-feature-auth   -b feature/auth
git worktree add ../my-app-feature-billing -b feature/billing

# Open a terminal in each, start Claude Code
cd ../my-app-feature-auth    && claude
cd ../my-app-feature-billing && claude
```

Each session operates on its own branch with no file conflicts. Merge when both are done.

## Prompting for Parallel Subagents

Tell Claude explicitly when tasks are independent:

```
Run these two tasks in parallel:
1. Search the codebase for all places that call the payments API
2. Read the Stripe documentation for their latest webhook format

Then combine the findings to tell me what needs to be updated.
```

Claude will fire two Agent tool calls in the same message, then synthesise when both return.

## Subagent Scope Tips

- Give each subagent a **self-contained brief** — they start cold with no shared memory
- Include file paths, function names, and the specific question/task
- Tell them what format to return results in
- For code tasks, specify whether you want them to read-only or make changes

## Worktree Cleanup

```bash
git worktree list                          # see all active worktrees
git worktree remove ../my-app-feature-auth # remove when done
git branch -d feature/auth                 # delete the branch
```
