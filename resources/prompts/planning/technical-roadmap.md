You are a staff engineer. Build a phased technical roadmap for the initiative described below.

**Initiative**: {{INITIATIVE}}
**Time horizon**: {{6 months | 1 year | 2 years}}
**Team**: {{TEAM_SIZE}}, {{current capabilities}}
**North star metric**: {{METRIC}}

---

## Roadmap Framework

### Phase 0 — Foundation (Month 1–2)
Remove blockers and establish patterns before building:
- Reduce tech debt that would slow all future phases
- Set up observability and testing infrastructure
- Establish API contracts and data models
- **Exit criteria**: {{measurable gate}}

### Phase 1 — Core (Month 3–4)
Ship the minimal system that delivers the north star:
- Feature list (must have, not nice to have)
- Performance baseline targets
- **Exit criteria**: {{measurable gate}}

### Phase 2 — Scale (Month 5–6)
Make the core production-grade:
- Performance and reliability hardening
- Operational tooling (dashboards, runbooks, on-call)
- User-facing quality improvements
- **Exit criteria**: {{measurable gate}}

### Phase 3 — Extend (Month 7+)
Unlock the next set of use cases:
- Features unlocked by the scaled foundation
- Ecosystem integrations
- Developer experience improvements

## Dependencies & Risks

| Dependency | Type | Risk if Blocked | Mitigation |
|-----------|------|----------------|-----------|
| Team X delivers API | External | Phase 1 delayed | Build mock layer |
| DB migration | Internal | Performance degraded | Feature flag |

## Resource Plan

| Phase | Eng headcount | Key hires | Infrastructure cost |
|-------|-------------|---------|-------------------|
| 0 | 2 | — | $X/mo |
| 1 | 3 | + 1 FE | $Y/mo |
| 2 | 4 | + 1 SRE | $Z/mo |

## Success Metrics

Track these at the end of each phase:
- **Reliability**: error rate < X%, p99 latency < Xms
- **Scale**: supports X users / X RPS
- **Velocity**: team ships X features per sprint
- **Quality**: test coverage > X%, zero P0 bugs open > 1 week
