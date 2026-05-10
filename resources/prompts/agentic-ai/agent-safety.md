Design safety guardrails and human-in-the-loop controls for an autonomous AI agent deployment.

**Agent capability**: {{WHAT_THE_AGENT_CAN_DO}}
**Deployment context**: {{CONTEXT}} (e.g. customer-facing, internal tool, fully automated pipeline)
**Risk tolerance**: {{low | medium | high}}

---

## Risk Classification

Classify every action the agent can take:

| Action | Reversibility | Blast Radius | Risk Level |
|--------|--------------|-------------|-----------|
| Read file | Reversible | None | Low |
| Write file | Reversible (with backup) | Local | Medium |
| Delete file | Irreversible | Local | High |
| Send email | Irreversible | External | High |
| Execute code | Varies | Varies | High |
| API write | Varies | External system | High |
| Database write | Reversible (with backup) | Varies | Medium-High |

## Guardrail Layers

### Layer 1 — Scope Constraints (in system prompt)
Explicitly tell the agent what it is and is not allowed to do:
```
ALLOWED: read files in /workspace, run tests, search the web
NOT ALLOWED: delete files, make network requests outside approved domains, 
             modify system configuration, access files outside /workspace
```

### Layer 2 — Tool-Level Controls
- Wrap risky tools with confirmation gates
- Log every tool call with timestamp, parameters, and result
- Rate-limit destructive operations

### Layer 3 — Human-in-the-Loop (HITL) Gates
Require human approval before:
- Any irreversible action
- Any action affecting external systems
- Any action outside the agent's stated scope
- Any action when confidence is below threshold

### Layer 4 — Automated Circuit Breakers
Auto-halt the agent if:
- Error rate exceeds {{THRESHOLD}} in {{WINDOW}}
- Spend exceeds {{BUDGET}}
- Unusual action sequence detected (e.g. mass deletion loop)
- Agent exits defined scope

### Layer 5 — Audit & Monitoring
- Full action trace logged and immutable
- Alert on any High-risk action
- Weekly review of agent behaviour for drift
- Red-team testing monthly

## Prompt Injection Defence
- Never interpolate user-supplied content into system instructions
- Validate all tool outputs before using them as inputs to the next step
- If a web page or document instructs the agent to take actions, treat as adversarial

## Output
Risk matrix for all agent actions, HITL gate definitions, circuit breaker thresholds, and audit log schema.
