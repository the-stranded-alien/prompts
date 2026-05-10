# Structured Thinking

XML tags, scratchpads, and extended thinking for deeper model reasoning.

## Why Structure Matters

Unstructured prompts lead to unstructured thinking. Giving the model explicit sections for different types of content — context, instructions, scratchpad, output — produces more reliable, higher-quality results.

## XML Tag Delimiters (Claude)

Claude is trained to respect XML tags as semantic boundaries:

```xml
<system>
You are an expert code reviewer.
</system>

<context>
This is a Node.js Express app using Prisma with PostgreSQL.
Coding conventions: TypeScript strict mode, named exports, zod validation.
</context>

<code_to_review>
{{CODE}}
</code_to_review>

<instructions>
Review the code above. Focus on security and correctness.
Output findings as a numbered list ordered by severity.
</instructions>
```

Benefits: cleaner separation of concerns, easier to update individual sections, reduces prompt injection risk.

## Scratchpad Pattern

Give the model space to think before producing output:

```xml
<task>
Is this argument logically valid? {{ARGUMENT}}
</task>

<instructions>
First, work through your analysis in a <scratchpad>. 
Identify premises, logical structure, and potential flaws.
Then give your final verdict in <verdict>.
</instructions>
```

Model output:
```xml
<scratchpad>
Premise 1: All A are B
Premise 2: X is A
Therefore X is B
This is valid modus ponens...
</scratchpad>

<verdict>
The argument is logically valid. If the premises are true, the conclusion follows necessarily.
</verdict>
```

## Extended Thinking (Claude)

For Claude models with extended thinking enabled, you can request deeper reasoning:

```
Think deeply about the architecture tradeoffs before recommending an approach.
Consider at least 3 alternatives and their long-term implications.
```

In the API, enable via:
```json
{
  "thinking": {
    "type": "enabled",
    "budget_tokens": 10000
  }
}
```

Thinking tokens are internal — they don't appear in the output but improve answer quality significantly for hard problems.

## Structured Output with Schema

Force a specific output format:

```xml
<instructions>
Analyse the code and return a JSON object matching this schema exactly:

{
  "summary": "string — 1 sentence",
  "severity": "critical" | "high" | "medium" | "low",
  "issues": [
    {
      "type": "string",
      "location": "file:line",
      "description": "string",
      "fix": "string"
    }
  ]
}

Return only the JSON. No explanation outside the JSON.
</instructions>
```

## Combining Techniques

```xml
<role>You are a principal engineer reviewing architecture proposals.</role>

<context>{{PROJECT_CONTEXT}}</context>

<proposal>{{ARCHITECTURE_PROPOSAL}}</proposal>

<instructions>
In <analysis>, think through the proposal's strengths, weaknesses, 
scaling implications, and operational complexity.

Then in <verdict>, give a clear recommendation: approve / approve-with-changes / reject.

In <changes>, list specific required changes if applicable.
</instructions>
```

## Tips

- Use consistent tag names across your prompts — pick a convention and stick to it
- Don't over-structure simple prompts — XML tags are overhead for one-liners
- Claude handles XML naturally; GPT models may need JSON-style structure instead
- Always test whether the model respects your tags with adversarial inputs
