# Codex Workflow Patterns

Multi-step Codex workflows for common engineering tasks.

## Pattern 1 — Read → Plan → Implement → Verify

The safest workflow for any non-trivial change:

```
Step 1: "Read src/api/orders.ts and describe the current structure"
         ↓ Review Codex's understanding before proceeding
Step 2: "Now outline what changes are needed to add order cancellation"
         ↓ Review the plan — correct it if wrong
Step 3: "Implement the plan — only the files we discussed"
         ↓ Review the diff
Step 4: "Run the tests and show me the output"
```

## Pattern 2 — Exploration First

Before implementing, ask Codex to explore:
```
"Find all places in the codebase that handle user authentication 
and summarise the current pattern"
```
This surfaces existing conventions you'd otherwise miss.

## Pattern 3 — Test-Driven

Write tests before implementation:
```
Step 1: "Write failing tests for the cancelOrder function we're about to add"
Step 2: "Now implement cancelOrder to make those tests pass"
```

Benefit: Codex's implementation is constrained to make specific tests pass — less creative liberty.

## Pattern 4 — Incremental Commits

For large changes, commit each sub-task:
```
"Add the DB migration for the orders.cancelled_at column, 
then stop and ask me to verify before continuing"
```
This gives you natural checkpoints without losing work.

## Pattern 5 — Parallel File Tasks

For independent changes across files:
```
"Make these three independent changes:
1. Add the UserRole type to src/types.ts
2. Update the User interface in src/models/user.ts  
3. Add the role column to db/schema.sql
Make all three changes now."
```

## Debugging with Codex

```
Step 1: "Here's the error: [paste stack trace]. Read the relevant file."
Step 2: "What are the likely causes?"
Step 3: "Implement the most likely fix."
Step 4: "What test would catch this bug in the future? Write it."
```

## Anti-Patterns

- **One giant prompt** — break large tasks into steps with human review between
- **Ambiguous ownership** — always specify which file/function owns the change
- **No verification step** — always run tests or at minimum re-read the diff
