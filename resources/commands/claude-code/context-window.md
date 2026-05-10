# Context & Compaction

Manage context limits, use /compact wisely, and structure long sessions for success.

## Understanding the Context Window

Claude Code operates within a context window — a maximum number of tokens it can "see" at once. Everything in the conversation (your messages, tool results, file contents) counts toward this limit.

**Symptoms of a full context window:**
- Responses become shorter and less precise
- Claude starts "forgetting" earlier decisions
- Tool results get truncated
- Claude references something incorrectly from earlier in the session

## /compact

`/compact` compresses the conversation history into a dense summary, freeing up space for more work.

```
/compact
```

**What it does:** Summarises the conversation so far into a compact representation, preserving key decisions and current state while reducing token usage.

**When to use it:**
- You've been working for a long time and responses are degrading
- Before starting a new major sub-task in the same session
- After a large file read or tool dump you don't need verbatim any more

**Caution:** Compaction loses detail. If the earlier context is still critical, either don't compact yet, or summarise the key points in your next message after compacting.

## /compact with Instructions

You can tell Claude what to preserve:

```
/compact — keep the decisions we made about the auth architecture 
and the list of files we've already reviewed
```

## Proactive Context Management

### Don't load what you don't need
Instead of: "Read the entire codebase and tell me..."
Use: "Read src/lib/auth.ts and tell me..."

### Clear large tool results
After a big `find` or `git log` result you've used, you can note:
"We've processed that output — you can discard it from memory now."

### Use `#file` references sparingly in long sessions
Each `#file` loads the entire file. In a long session, this accumulates fast.

## Starting Fresh vs Continuing

**Start a new session when:**
- You've finished one complete task and starting an unrelated one
- Context has been compacted twice and precision is degrading
- You want a clean slate for a fresh perspective

**Continue the same session when:**
- You're mid-task with important in-session decisions to preserve
- You need context from earlier in the conversation to continue correctly

## Token-Efficient Patterns

### Reference rather than paste
```
See src/api/users.ts:42-78 for the current implementation
```
Rather than pasting the code directly (which costs tokens for both input and output).

### Ask for concise outputs
```
Give me just the list of affected files, no explanation needed.
```

### Summarise before proceeding
After a long exploration phase:
```
Before we continue — summarise the key findings from what we've read 
so far in 5 bullet points. We'll use that as our working context.
```
