# Agent Tool Usage Eval

Evaluate the quality and correctness of an agent's tool selection and invocation pattern.

## Agent Task

{{AGENT_TASK}}

## Available Tools

{{AVAILABLE_TOOLS}}

## Agent's Tool Call Log

```
{{TOOL_CALL_LOG}}
```

---

## Evaluation Dimensions

### 1. Tool Selection Accuracy
For each tool call, was the right tool chosen?

| Call # | Tool Used | Correct Tool? | Alternative (if wrong) | Score |
|--------|-----------|--------------|----------------------|-------|
| 1 | | Yes / No | | /5 |
| 2 | | | | /5 |

### 2. Argument Quality
Were tool arguments well-formed, complete, and minimal?

| Call # | Args Quality | Issues |
|--------|-------------|--------|
| 1 | Good / Partial / Bad | |

Common issues to check:
- [ ] Missing required parameters
- [ ] Hallucinated parameter names
- [ ] Overly broad queries (should be narrower)
- [ ] Sensitive data in args (PII, credentials)

### 3. Call Sequencing
- Were dependent calls made in the correct order? Y / N
- Were independent calls made in parallel when possible? Y / N
- Any unnecessary sequential calls that could be parallelised?

### 4. Redundancy & Loops
- Duplicate calls with identical args: **count**
- Retry loops without backoff: **count**
- Calls that fetched data already retrieved: **count**

### 5. Error Recovery
- Tool errors encountered: **count**
- Recovered successfully: **count**
- Strategy used: retry / fallback / skip / halt

---

## Summary Scores

| Dimension | Score |
|-----------|-------|
| Selection accuracy | /20 |
| Argument quality | /20 |
| Sequencing | /20 |
| Redundancy avoidance | /20 |
| Error recovery | /20 |
| **Total** | **/100** |
