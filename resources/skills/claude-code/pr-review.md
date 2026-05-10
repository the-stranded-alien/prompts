# PR Review Skill (Claude Code)

Use `/review` to run a thorough multi-angle code review on the current branch.

## How It Works

Claude Code reads the diff between your branch and the base branch, then produces a structured review covering correctness, security, performance, and style.

## Trigger

```bash
/review                     # review current branch vs main
/review --base develop      # review against a different base
/review PR#123              # review a specific GitHub PR
```

## What Claude Code Reviews

### Layer 1 — Correctness
- Does the code do what the PR claims?
- Edge cases and boundary conditions covered?
- Are there logical errors or race conditions?

### Layer 2 — Security
- New attack surface introduced?
- Input validation present?
- Secrets or credentials exposed?
- Auth/authz implications checked?

### Layer 3 — Performance
- N+1 queries introduced?
- Inefficient algorithms in hot paths?
- Missing caching for expensive operations?

### Layer 4 — Tests
- New behaviour covered by tests?
- Meaningful assertions, not just coverage?

### Layer 5 — Style & Maintainability
- Follows project conventions?
- Readable names and structure?
- Unnecessary complexity?

## Output Format

```
### Summary
[2–3 sentence overall assessment]

### Must Fix
- [ ] [issue + location + suggested fix]

### Should Fix
- [ ] [non-blocking improvement]

### Nits
- [ ] [minor style suggestion]

### Praise
- [what was done well]
```

## Tips

- Run `/review` before requesting human review — fix the obvious issues first
- Use `#` to provide additional context: `/review #this fixes the auth bug from last week`
- Combine with `/security-review` for security-sensitive changes
