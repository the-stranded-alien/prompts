# Code Feature Workflow

An agentic workflow for implementing a new feature end-to-end: from spec to reviewed, tested code.

## Feature Request

{{FEATURE_REQUEST}}

## Codebase Context

{{CODEBASE_CONTEXT}}
> e.g. "Next.js 15 app, TypeScript, Prisma ORM, Postgres"

## Acceptance Criteria

{{ACCEPTANCE_CRITERIA}}

---

## Workflow Phases

### Phase 1 — Understand `[agent: analyst]`
1. Parse `{{FEATURE_REQUEST}}` and restate it in one sentence.
2. Ask clarifying questions (if any ambiguities — list them, don't block).
3. Identify files likely to be touched based on `{{CODEBASE_CONTEXT}}`.
4. Confirm `{{ACCEPTANCE_CRITERIA}}` are measurable.

### Phase 2 — Design `[agent: architect]`
1. Propose implementation approach (2–3 options if non-trivial).
2. Select the preferred approach with rationale.
3. List all files to create / modify.
4. Identify risks (breaking changes, migrations, performance).

### Phase 3 — Implement `[agent: engineer]`
1. Implement changes file by file.
2. Follow existing code style and conventions.
3. Add inline comments only where logic is non-obvious.
4. Avoid scope creep — implement exactly `{{ACCEPTANCE_CRITERIA}}`.

### Phase 4 — Test `[agent: qa]`
1. Write unit tests covering the happy path.
2. Write at least one edge-case / error-path test.
3. Run the test suite; surface any failures.

### Phase 5 — Review `[agent: reviewer]`
Perform a self-review against this checklist:
- [ ] Acceptance criteria met
- [ ] No unintended side effects
- [ ] No secrets or debug code left in
- [ ] Types correct, no `any`
- [ ] Tests pass

Output a concise PR description ready to copy.
