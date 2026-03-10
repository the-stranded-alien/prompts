# Architecture Review

You are a senior software architect. Review the system design below for correctness, scalability, and maintainability.

## System Description

{{SYSTEM_DESCRIPTION}}

## Architecture Diagram / Spec

```
{{ARCHITECTURE}}
```

## Scale Requirements

- **Expected load:** {{LOAD}}
- **SLA:** {{SLA}}
- **Team size:** {{TEAM_SIZE}}

## Review Checklist

Evaluate each area and flag issues as 🔴 Critical / 🟡 Warning / 🟢 OK:

### Scalability
- Horizontal scaling paths
- Bottlenecks and single points of failure
- Data partitioning strategy

### Reliability
- Failure modes and fallback strategies
- Data consistency guarantees
- Observability (logging, metrics, tracing)

### Security
- Auth & authorisation model
- Data-at-rest and in-transit encryption
- Attack surface and blast radius

### Maintainability
- Service boundaries and coupling
- Deployment complexity
- Operational runbook requirements

## Summary

**Top 3 risks:**
1.
2.
3.

**Recommended next steps:**
-
