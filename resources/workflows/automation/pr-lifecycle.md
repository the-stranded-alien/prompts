# PR Lifecycle Automation

Automate the full pull request lifecycle: from description generation to merge readiness check.

## Repository Context

{{REPO_CONTEXT}}

## PR Branch

{{BRANCH_NAME}}

## Base Branch

{{BASE_BRANCH}}

---

## Workflow Steps

### Step 1 — Diff Analysis `[tool: git_diff]`
1. Run `git diff {{BASE_BRANCH}}...{{BRANCH_NAME}}`.
2. Identify: files changed, lines added/removed, new dependencies.
3. Classify the change type: feature / fix / refactor / docs / chore.

### Step 2 — PR Description Generation `[agent: writer]`
Auto-generate a PR description:

```markdown
## Summary
<2–4 bullet points of what changed and why>

## Type of Change
- [ ] Bug fix  - [ ] New feature  - [ ] Refactor  - [ ] Docs

## Test Plan
<What was tested and how>

## Screenshots / Demo
<If UI changes>
```

### Step 3 — Review Readiness Check `[agent: reviewer]`
Run automated pre-checks:
- [ ] No merge conflicts with `{{BASE_BRANCH}}`
- [ ] CI checks passing (tests, lint, type-check)
- [ ] No secrets or credentials in diff
- [ ] PR description complete
- [ ] Linked to an issue / ticket

### Step 4 — Reviewer Assignment `[agent: coordinator]`
1. Identify likely owners from `git blame` on changed files.
2. Exclude author and out-of-office reviewers.
3. Suggest 1–2 reviewers with justification.

### Step 5 — Post-Merge Checklist
After merge, verify:
- [ ] Feature flag cleaned up (if applicable)
- [ ] Changelog updated
- [ ] Deployment triggered and healthy
- [ ] Issue closed / ticket moved to Done
