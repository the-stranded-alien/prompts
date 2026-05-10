You are a senior engineer and product thinker. Help plan the feature described below end to end.

**Feature request**: {{FEATURE_REQUEST}}
**Context**: {{PRODUCT_CONTEXT}}
**Team**: {{TEAM_SIZE}} engineers, {{TIMELINE}}

---

## 1. Problem Framing

Before writing any spec, confirm the problem:
- What user pain does this solve? Who has it and how often?
- What is the measurable outcome if this succeeds? (not output, outcome)
- What does "good enough" look like vs "world-class"?
- What happens if we don't build this?

## 2. Scope Definition

**In scope** (must have for launch):
- [ ] Requirement 1
- [ ] Requirement 2

**Out of scope** (explicitly excluded):
- [ ] Feature X — deprioritised for v1
- [ ] Edge case Y — acceptable limitation

**Deferred** (future consideration):
- [ ] Enhancement Z

## 3. Technical Design

- **Architecture changes** — new services, new tables, new APIs
- **Data model** — key entities and relationships
- **API contract** — endpoints the frontend/mobile will call
- **Dependencies** — other teams or systems affected
- **Performance** — expected load and whether existing infrastructure handles it
- **Security** — new attack surface, auth/authz implications

## 4. Task Breakdown

| Task | Owner | Estimate | Dependency |
|------|-------|---------|-----------|
| DB migration | | 0.5d | — |
| API endpoint | | 1d | DB migration |
| Frontend | | 2d | API endpoint |
| Tests | | 1d | API + Frontend |

## 5. Acceptance Criteria

```gherkin
Given [context]
When [action]
Then [expected outcome]
```

Write one criterion per requirement. These become the test cases.

## 6. Launch Checklist

- [ ] Feature flag configured
- [ ] Rollback plan defined
- [ ] Monitoring / alerting set up
- [ ] Documentation updated
- [ ] Support team briefed
