# Chain of Thought (CoT) Prompting

Elicit step-by-step reasoning to improve model accuracy on complex problems.

## What It Is

Instead of asking for an answer directly, you ask the model to reason through the problem step by step before concluding. This improves performance on maths, logic, multi-step reasoning, and coding problems.

## Basic Pattern

```
Problem: [your question]

Let's think through this step by step:
```

Or instruct it directly:
```
Before giving your answer, reason through each step explicitly.
```

## Zero-Shot CoT

Just append "Let's think step by step" to any prompt:

```
Q: A train leaves at 9am travelling at 60mph. Another train leaves the same 
station at 11am travelling at 90mph in the same direction. When does the 
second train catch the first?

Let's think step by step.
```

## Few-Shot CoT

Provide worked examples that demonstrate the reasoning process:

```
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. 
Each can has 3 balls. How many does he have?

A: Roger started with 5 balls. He bought 2 cans × 3 balls = 6 new balls. 
5 + 6 = 11 balls. The answer is 11.

---

Q: [your actual question]

A: [model continues with same pattern]
```

## For Code Problems

```
Problem: Debug this function — it returns wrong results for negative inputs.

[code here]

Approach this by:
1. Trace through the execution with a negative input example
2. Identify where the logic diverges from expected behaviour
3. Explain the fix before writing any code
```

## Self-Consistency

Generate multiple reasoning chains, then pick the majority answer:

```
Generate 3 independent solutions to this problem, each with different reasoning. 
Then identify which answer appears most often.
```

## When CoT Helps Most

- Multi-step maths or logic problems
- Debugging complex code
- Architectural trade-off analysis
- Any task where intermediate steps need to be right for the final answer to be right

## When It Doesn't Help Much

- Simple factual retrieval
- Translation or paraphrasing
- Classification with obvious patterns
- Tasks where speed matters more than accuracy
