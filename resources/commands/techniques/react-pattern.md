# ReAct Pattern

Reason + Act: the canonical pattern for grounded, tool-using agents.

## What It Is

ReAct (Reason + Act) is a prompting pattern where the model alternates between:
- **Thought** — reasoning about what to do and why
- **Action** — calling a tool
- **Observation** — reading the tool result

This grounds the model's reasoning in real data, dramatically reducing hallucination.

## The Loop

```
Thought: [reasoning about the current state and next step]
Action: [tool_name]
Action Input: [{"param": "value"}]
Observation: [tool result]

... repeat ...

Thought: I have enough information to answer.
Final Answer: [grounded, accurate answer]
```

## Prompt Template

```
You have access to the following tools:
{{TOOL_LIST}}

Use this format exactly:

Thought: [your reasoning]
Action: [tool name]
Action Input: [JSON params]
Observation: [tool result — filled in by the system]

When you have enough information:
Thought: I can now answer.
Final Answer: [your answer]

---

Question: {{QUESTION}}
```

## Why It Works

1. **Grounding** — answers come from Observations, not memory
2. **Transparency** — every claim is traceable to a tool call
3. **Error recovery** — bad tool results are visible and reasoned about
4. **Auditability** — the full reasoning trace is inspectable

## Example

```
Question: What is the capital of the country with the highest GDP in Southeast Asia?

Thought: I need to find which country in Southeast Asia has the highest GDP, then find its capital.
Action: web_search
Action Input: {"query": "highest GDP country in Southeast Asia 2024"}
Observation: Indonesia has the highest GDP in Southeast Asia at approximately $1.4 trillion.

Thought: Now I need the capital of Indonesia.
Action: web_search
Action Input: {"query": "capital of Indonesia"}
Observation: Jakarta is the capital of Indonesia, though the new capital Nusantara is being built.

Thought: I have the answer.
Final Answer: The country with the highest GDP in Southeast Asia is Indonesia, and its capital is Jakarta (with the new capital Nusantara under construction).
```

## Implementation Tips

- **Parse strictly** — extract `Action:` and `Action Input:` with regex or structured output
- **Inject observations** — fill in `Observation:` from real tool calls, never let the model generate them
- **Set a max steps** — prevent infinite loops with a hard limit (typically 10–20 steps)
- **Include the trace** — feed previous Thought/Action/Observation back into each new turn
