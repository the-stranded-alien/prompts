# Data Pipeline Workflow

An agentic workflow to design, build, and validate a data pipeline.

## Pipeline Goal

{{PIPELINE_GOAL}}
> e.g. "Ingest raw Stripe events → enrich with customer data → load into analytics DWH"

## Source Systems

{{SOURCE_SYSTEMS}}

## Destination

{{DESTINATION}}

## Freshness Requirement

{{FRESHNESS}}
> e.g. "Near real-time (<1 min lag)", "Daily batch by 6 AM UTC"

---

## Workflow Phases

### Phase 1 — Inventory `[agent: analyst]`
1. Map every source field to destination schema.
2. Identify transformations required (type coercion, joins, aggregations).
3. Flag PII fields requiring masking or encryption.

### Phase 2 — Design `[agent: architect]`
1. Choose pipeline pattern: Streaming / Micro-batch / Batch.
2. Justify against `{{FRESHNESS}}` and volume.
3. Draw the DAG (ASCII is fine):
```
Source → Extract → Transform → Validate → Load → Destination
```
4. Identify failure modes and retry strategy.

### Phase 3 — Implement `[agent: engineer]`
1. Write extraction logic for `{{SOURCE_SYSTEMS}}`.
2. Write transformation logic (typed, tested functions).
3. Write load logic with idempotency (upsert, dedup).
4. Add structured logging at each stage.

### Phase 4 — Validate `[agent: qa]`
1. Run pipeline against a sample dataset.
2. Verify row counts match source.
3. Check for nulls, duplicates, and type mismatches.
4. Measure end-to-end latency vs `{{FRESHNESS}}`.

### Phase 5 — Operationalise
1. Schedule via cron / orchestrator (Airflow, Prefect, etc.).
2. Set up alerting on failure and SLA breach.
3. Document runbook: how to backfill, replay, and debug.
