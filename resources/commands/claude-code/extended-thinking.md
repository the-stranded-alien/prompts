# Extended Thinking

Unlock deep, multi-step reasoning for hard architectural and debugging problems.

## What It Is

Extended thinking gives Claude a private scratchpad to reason through complex problems before answering. The thinking is not shown directly in the response but dramatically improves answer quality for problems that need:
- Weighing multiple competing approaches
- Working through multi-step logic
- Catching your own errors mid-reasoning
- Exploring tradeoffs before committing

## When to Use It

**Use extended thinking for:**
- Architectural decisions with long-term consequences
- Debugging hard intermittent or concurrency bugs
- Reviewing security-sensitive code or designs
- Complex refactors with many moving parts
- Algorithm design where correctness matters
- Any time you've gotten a shallow answer and need depth

**Don't bother for:**
- Simple factual lookups
- Routine code edits
- Formatting or style changes
- Short, well-defined tasks

## How to Trigger It

Simply ask Claude to think deeply before answering:

```
Think carefully about the best approach before writing any code.
```

```
Before answering, reason through all the tradeoffs and edge cases.
```

```
This is a complex problem — take your time and think step by step before 
giving me a recommendation.
```

Or be explicit about what to reason through:

```
Before recommending an architecture, think through:
1. What happens at 10x our current load?
2. What are the failure modes for each option?
3. What's the operational complexity of each?
Then give me your recommendation.
```

## In the API

Enable extended thinking programmatically:

```python
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=16000,
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # thinking token budget
    },
    messages=[{
        "role": "user",
        "content": "Design the sharding strategy for our user database at 100M users."
    }]
)

# Thinking blocks come before text blocks
for block in response.content:
    if block.type == "thinking":
        print("THINKING:", block.thinking)
    elif block.type == "text":
        print("ANSWER:", block.text)
```

## Token Budget

The `budget_tokens` controls how much thinking is allowed:

| Budget | Use case |
|--------|---------|
| 1,000–5,000 | Moderate reasoning — most problems |
| 5,000–15,000 | Hard multi-step problems, architecture reviews |
| 15,000–32,000 | Extremely complex, research-grade problems |

Higher budget = better reasoning but higher cost and latency. Start at 5,000 and increase if you're getting shallow answers.

## Combining with Other Techniques

```
Think through the security implications step by step, then give me 
a ranked list of vulnerabilities with severity levels.
```

```
Reason through three different approaches to this problem, evaluate 
each one, then recommend the best with a clear rationale.
```

## Streaming Thinking

When streaming, thinking blocks arrive before text blocks. Render them as a collapsible "Reasoning" section in your UI so users can inspect the chain of thought.
