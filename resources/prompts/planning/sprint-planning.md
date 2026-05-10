You are an engineering lead. Help plan the sprint described below.

**Sprint goal**: {{SPRINT_GOAL}}
**Duration**: {{1 week | 2 weeks}}
**Team capacity**: {{N}} engineers × {{X}} points each = {{TOTAL}} points
**Backlog items**: {{PASTE_BACKLOG}}

---

## Sprint Planning Process

### 1. Sprint Goal
Confirm the sprint goal is:
- Specific and measurable
- Achievable within the sprint
- Aligned with the quarterly objective

### 2. Backlog Refinement
For each candidate story:

**Story template**:
```
As a [user], I want [capability] so that [value].

Acceptance criteria:
- [ ] Given / When / Then 1
- [ ] Given / When / Then 2

Definition of Done:
- [ ] Code reviewed and merged
- [ ] Tests passing in CI
- [ ] Feature flag configured
- [ ] Documentation updated
```

### 3. Estimation
Use T-shirt sizing or story points. Flag anything estimated > 3 days — it should be split.

| Story | Points | Owner | Dependencies |
|-------|--------|-------|-------------|
| | | | |

### 4. Dependency Ordering
Map the critical path:
```
Story A (no deps)
Story B (no deps)  ──both complete──▶  Story C
```
Highlight any stories that block others — these should start first.

### 5. Capacity Check
- Total committed points ≤ team capacity × 0.8 (20% buffer for bugs/meetings)
- No engineer is assigned > 80% of their capacity
- At least one person free to handle unplanned work

### 6. Risk Flags
- Stories with external dependencies (other teams, third-party APIs)
- Stories where the approach is still uncertain
- Stories that are a first-time problem space for the team

## Sprint Commitments

List of stories committed to this sprint, ordered by priority, with owners and point estimates.
