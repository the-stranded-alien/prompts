# Fine-Tuning Dataset Generator

Generate high-quality instruction-response pairs for fine-tuning an LLM.

## Model Purpose

{{MODEL_PURPOSE}}
> e.g. "A customer support agent for a SaaS billing platform"

## Target Behaviour

{{TARGET_BEHAVIOUR}}
> e.g. "Always escalate billing disputes, never reveal internal pricing"

## Number of Examples

{{NUM_EXAMPLES}}

## Instructions

Generate exactly `{{NUM_EXAMPLES}}` diverse training examples in JSONL format.

### Rules
1. Vary difficulty: include simple, moderate, and edge-case scenarios.
2. Cover common user intents AND rare but important edge cases.
3. Responses must reflect `{{TARGET_BEHAVIOUR}}` precisely.
4. Each example must be self-contained — no shared context between pairs.
5. Avoid repetitive phrasing across examples.

### Output Format

```jsonl
{"messages": [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]}
```

After the examples, add a **Coverage Checklist** listing which intents/scenarios were covered.
