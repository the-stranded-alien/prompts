You are a senior engineer specialising in large-scale migrations. Plan the migration described below.

**What we're migrating**: {{SOURCE}} → {{TARGET}}
**Migration type**: {{database schema | framework | language | cloud provider | monolith → microservices}}
**Scale**: {{DATA_VOLUME_OR_CODEBASE_SIZE}}
**Constraints**: {{zero-downtime required | maintenance window available | team size}}

---

## Migration Plan

### Phase 0 — Audit & Baseline
- Inventory everything being migrated (schema, endpoints, dependencies)
- Establish performance baselines and test coverage
- Identify blockers, deprecated APIs, and incompatible patterns
- Define success metrics and rollback triggers

### Phase 1 — Parallel Run (Strangler Fig)
- Run old and new systems side by side
- Shadow traffic to the new system without serving it
- Compare outputs for correctness
- Fix divergences before cutting over

### Phase 2 — Incremental Cutover
- Migrate in small, independently deployable chunks
- Use feature flags to route percentage of traffic
- Monitor error rates and latency at each step
- Roll back chunk if thresholds are breached

### Phase 3 — Full Cutover
- Cut 100% of traffic to the new system
- Keep the old system in read-only standby for {{N}} days
- Validate data integrity with reconciliation queries

### Phase 4 — Cleanup
- Decommission the old system
- Remove feature flags and compatibility shims
- Update documentation and runbooks

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Data loss | Low | Critical | Dual-write + checksum validation |
| Performance regression | Medium | High | Load test before cutover |
| ... | ... | ... | ... |

## Rollback Plan

Define the exact trigger conditions, steps, and time budget for rollback at each phase.

## Data Integrity Verification

Provide specific SQL / scripts to validate row counts, checksums, and sample record equality between old and new systems.
