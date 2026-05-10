Write a blameless postmortem for the incident described below.

**Incident**: {{INCIDENT_DESCRIPTION}}
**Severity**: {{SEV1 | SEV2 | SEV3}}
**Duration**: {{DURATION}}
**Impact**: {{USER_IMPACT}}

---

# Incident Postmortem: {{TITLE}}

**Date**: {{DATE}}
**Duration**: {{DURATION}}
**Severity**: {{SEVERITY}}
**Incident Commander**: {{IC}}
**Authors**: {{AUTHORS}}
**Status**: Draft → In Review → Approved

---

## Impact

- **Users affected**: {{NUMBER}} ({{PERCENTAGE}}%)
- **Services affected**: {{SERVICES}}
- **Data loss**: {{yes/no — details}}
- **Revenue / SLA impact**: {{details}}

## Timeline

All times in UTC.

| Time | Event |
|------|-------|
| HH:MM | Monitoring alert fired |
| HH:MM | On-call engineer paged |
| HH:MM | Incident declared |
| HH:MM | Mitigation applied |
| HH:MM | Service restored |
| HH:MM | Incident closed |

## Root Cause

**Proximate cause**: The immediate trigger (what broke).

**Root cause**: The underlying systemic reason it could happen at all.

**Contributing factors**: Other conditions that made the impact worse or recovery slower.

## Detection

- How was the incident detected? (alert, customer report, manual observation)
- How long was the gap between first impact and detection?
- Why wasn't it caught sooner?

## Response

- What worked well?
- What slowed down the response?
- Were runbooks available and accurate?

## Resolution

Exact steps taken to restore service. What was the mitigation vs the fix?

## Action Items

| Action | Owner | Due Date | Priority |
|--------|-------|---------|---------|
| Add alert for X | | | High |
| Write runbook for Y | | | Medium |
| Refactor Z to be more resilient | | | Low |

## Lessons Learned

What does this incident teach us about our system, processes, or culture?

---

*This postmortem is blameless. The goal is to understand what happened and prevent recurrence, not to assign fault.*
