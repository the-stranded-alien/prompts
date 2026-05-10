Write a technical RFC (Request For Comments) or design document for the change described below.

**Change**: {{CHANGE_DESCRIPTION}}
**Author**: {{AUTHOR}}
**Status**: Draft
**Reviewers**: {{REVIEWERS}}

---

# RFC: {{TITLE}}

## Summary

One paragraph. What is this change, why is it needed, and what does it enable?

## Motivation

- What problem are we solving?
- Why does it need to be solved now?
- What is the cost of inaction?
- Link to relevant issues, metrics, or user feedback.

## Detailed Design

### Overview
High-level architecture of the proposed solution.

### Key Decisions
For each significant decision, document:
- **Decision**: what was chosen
- **Why**: the driving reason
- **Alternatives considered**: what was ruled out and why

### API / Interface Changes
Any new or modified public interfaces, APIs, or schemas.

### Data Model Changes
New tables, columns, or schema migrations required.

### Migration Path
How existing users/data transition to the new behaviour.
Specify: is this backwards-compatible? How long is the compatibility window?

### Performance Impact
Expected effect on latency, throughput, memory, or storage.

### Security Implications
New attack surface introduced. Auth/authz changes. Data exposure risk.

## Drawbacks

Be honest about the downsides:
- Added complexity
- Performance tradeoffs
- Maintenance burden
- Lock-in risks

## Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|-------------|
| Option A | ... | ... | ... |
| Option B | ... | ... | ... |

## Open Questions

Unresolved issues that need input from reviewers:
- [ ] Question 1
- [ ] Question 2

## Implementation Plan

Phases, milestones, and who owns each piece.
Timeline estimate and go/no-go criteria.

## References

Related RFCs, ADRs, external docs, and prior art.
