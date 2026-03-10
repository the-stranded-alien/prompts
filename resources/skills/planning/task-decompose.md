# Task Decomposition Skill

Break a complex goal into a structured, executable plan with dependencies and success criteria.

## Goal

{{GOAL}}

## Context & Constraints

{{CONTEXT}}

## Skill Instructions

### Step 1 — Clarify
Identify ambiguities in `{{GOAL}}`. List any assumptions you're making.

### Step 2 — Decompose
Break the goal into subtasks. Each subtask must be:
- **Atomic** — completable in one focused session
- **Verifiable** — has a clear done state
- **Ordered** — dependencies are explicit

### Step 3 — Produce a Plan

Output in this format:

```
PLAN: {{GOAL}}

Phase 1: <Phase Name>
  [T1] <Task title>
       Inputs:  <what is needed>
       Output:  <what is produced>
       Depends: -
  [T2] <Task title>
       Inputs:  T1 output
       Output:  <what is produced>
       Depends: T1

Phase 2: ...
```

### Step 4 — Risk Assessment
List the top 3 risks and a one-line mitigation for each.

### Step 5 — Success Criteria
Define measurable criteria that confirm the overall goal is complete.
