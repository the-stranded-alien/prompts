# PR Review Skill

A structured skill for reviewing pull requests thoroughly and constructively.

## Trigger

Use when asked to "review this PR", "look at these changes", or given a diff/PR URL.

## Review Layers

### Layer 1 — Context (read first)
- What problem does this PR solve?
- Is the approach the right one for this problem?
- Are there simpler alternatives?

### Layer 2 — Correctness
- Does the code do what the PR description claims?
- Are all edge cases handled?
- Are there race conditions or concurrency issues?

### Layer 3 — Quality
- Is the code readable and well-named?
- Is there unnecessary complexity?
- Is logic duplication introduced?

### Layer 4 — Tests
- Are new tests added for new behaviour?
- Do existing tests still pass conceptually?
- Are tests meaningful (not just for coverage)?

### Layer 5 — Security & Performance
- Any new attack vectors introduced?
- Performance regressions?
- New dependencies — are they justified and trustworthy?

## Output Format

```markdown
### Summary
[Overall assessment in 2–3 sentences]

### Must Fix (blocking)
- [ ] Issue — suggested fix

### Should Fix (non-blocking)
- [ ] Issue — suggested improvement

### Nits
- [ ] Minor style/naming suggestions

### Praise
- What was done well
```

## Tone

- Constructive, not critical of the author
- Explain *why*, not just *what*
- Acknowledge trade-offs rather than demanding perfection
