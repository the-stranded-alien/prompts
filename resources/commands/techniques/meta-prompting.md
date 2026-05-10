# Meta-Prompting

Use the model to generate, refine, and critique its own prompts.

## What It Is

Meta-prompting treats prompt engineering as a task for the model itself. Instead of writing the perfect prompt manually, you describe the task and let the model generate or improve the prompt.

## Pattern 1 — Prompt Generation

Ask the model to write a prompt for a task:

```
Write a system prompt for an AI assistant that helps junior developers 
review their code before opening a PR. 

The assistant should:
- Check for common mistakes (missing error handling, SQL injection, hardcoded secrets)
- Give feedback in a constructive, non-condescending tone
- Output a checklist format with severity levels

Write the full system prompt.
```

## Pattern 2 — Prompt Improvement

Give the model a prompt and ask it to make it better:

```
Here is a prompt I'm using:

"Summarise this article."

This prompt produces summaries that are too long and miss the key takeaways.

Rewrite the prompt to:
1. Produce a 3-bullet TL;DR
2. Always include the "so what" / implication
3. Be suitable for a busy executive audience
```

## Pattern 3 — Prompt Critique

Ask the model to find flaws in your prompt:

```
Here is a prompt I'm using. Tell me what's wrong with it and how to fix it:

[YOUR PROMPT]

Focus on: ambiguity, missing constraints, likely failure modes, and output format issues.
```

## Pattern 4 — Adversarial Testing

Generate test cases that will break your prompt:

```
Here is my prompt: [PROMPT]

Generate 10 test inputs that are most likely to cause this prompt to fail, 
produce wrong output, or behave unexpectedly. For each, explain why it's 
likely to cause a problem.
```

## Pattern 5 — Prompt Chaining Design

Ask the model to design a multi-step prompt pipeline:

```
I need to build a pipeline that:
1. Takes a raw customer support ticket
2. Classifies the issue type
3. Extracts key entities (product, error code, user action)
4. Generates a draft response

Design the prompts for each step. Each prompt should be self-contained 
and work with the output of the previous step.
```

## When Meta-Prompting Excels

- You know what you want but struggle to describe it in a prompt
- Your current prompt has inconsistent or low-quality output
- You need to generate many variants to A/B test
- You're building a system that dynamically constructs prompts at runtime

## Limitation

The model generates prompts that work for itself — they may not be optimal for other models or model versions. Always test the generated prompts with real inputs.
