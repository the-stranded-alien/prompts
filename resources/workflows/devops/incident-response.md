# Incident Response Workflow

Structured playbook for diagnosing, mitigating, and resolving production incidents.

**Incident**: {{INCIDENT_DESCRIPTION}}
**Severity**: {{SEV1 | SEV2 | SEV3}}
**Services affected**: {{SERVICES}}

---

## Immediate Response (0–5 min)

### 1. Acknowledge
- Acknowledge the alert to stop re-paging
- Join the incident channel / bridge
- Assign roles: Incident Commander (IC), Technical Lead (TL), Comms

### 2. Assess Severity

| Severity | Definition |
|----------|-----------|
| SEV1 | Full outage, data loss, security breach |
| SEV2 | Degraded service affecting >10% users |
| SEV3 | Minor degradation, workaround available |

### 3. Declare
- Post in #incidents: "SEV{N} declared: {brief description}. IC: @person. Bridge: {link}"
- Start a timer — all times logged from here

---

## Diagnosis (5–20 min)

Work these in parallel, don't go deep on one thread alone:

### Check the Four Golden Signals
```
1. Latency    — is p99 elevated? Which service?
2. Error rate — what is erroring? 5xx? specific endpoint?
3. Traffic    — is traffic normal, spiked, or dropped to zero?
4. Saturation — CPU, memory, disk, connection pool near limit?
```

### Narrow the Blast Radius
- Which regions/pods/instances are affected?
- Did it start at a deploy? Check deploy times vs incident start.
- Is it correlated with a specific input, user, or request type?

### Check Recent Changes
```bash
git log --since="2 hours ago" --oneline
# Check deployment logs, config changes, dependency updates
```

---

## Mitigation (make it stop)

Mitigation ≠ fix. Mitigation stops the bleeding:
- **Rollback**: `git revert` + deploy if a bad deploy is the cause
- **Feature flag off**: disable the new feature
- **Scale up**: add instances if traffic spike
- **Shed load**: enable rate limiting or disable non-critical features
- **Failover**: switch to backup region or replica

**Apply the fastest mitigation first, even if it's not the root cause.**

---

## Communication

Every 30 minutes during a SEV1/2, post a status update:
```
Status update [HH:MM UTC]:
- Current state: [still investigating / mitigation applied / recovering]
- What we know: [brief]
- What we're doing: [next actions]
- ETA to resolution: [estimate or "unknown"]
```

---

## Resolution & Recovery

- Verify service is fully recovered (not just partially)
- Run smoke tests
- Monitor for 30 minutes post-recovery before declaring resolved
- Announce resolution in all channels where incident was declared

---

## Post-Incident

Within 48 hours:
- Write blameless postmortem (use the Postmortem template)
- Assign action items with owners and due dates
- Schedule a 30-min review meeting for SEV1/2
