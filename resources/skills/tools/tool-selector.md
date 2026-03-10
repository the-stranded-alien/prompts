# Tool Selector Skill

Given a task and a set of available tools, choose the optimal tool(s) and justify the selection.

## Task

{{TASK}}

## Available Tools

```
{{TOOLS_LIST}}
```
> Format: one tool per line as `tool_name: brief description`

## Constraints

- Max tool calls: {{MAX_CALLS}}
- Preferred tool if tie: {{PREFERRED_TOOL}}

## Skill Instructions

### Step 1 — Parse the task
Identify the core operation needed (read, write, search, transform, call API, etc.)

### Step 2 — Match tools
For each candidate tool, score it:

| Tool | Relevance | Cost | Reliability | Notes |
|------|-----------|------|-------------|-------|
| ... | High/Med/Low | ... | ... | |

### Step 3 — Select & sequence
Choose the minimum set of tools needed. If multiple calls are required, output a call sequence:

```
1. tool_name(arg1, arg2)   → produces: <description>
2. tool_name(arg1)         → produces: <description>
```

### Step 4 — Fallback plan
If the primary tool fails, what is the fallback?

### Step 5 — Output
Return a JSON action plan:
```json
{
  "primary_sequence": [...],
  "fallback": [...],
  "estimated_calls": 0
}
```
