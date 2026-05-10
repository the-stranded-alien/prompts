Design a memory and context management system for an AI agent with long-running tasks.

**Agent type**: {{AGENT_TYPE}}
**Context window**: {{TOKEN_LIMIT}}
**Memory persistence**: {{in-session only | database | vector store | file system}}
**Task horizon**: {{short (minutes) | medium (hours) | long (days+)}}

---

## Memory Taxonomy

### Working Memory (in-context)
What's actively in the prompt:
- Current task and sub-tasks
- Recent tool results (last N turns)
- Scratchpad for reasoning
- **Token budget**: reserve 20% for the final response

### Episodic Memory (session log)
Everything that happened, compressed:
- Summarise past turns when context fills up
- Use recursive summarisation: summarise summaries
- Preserve: decisions made, facts discovered, errors encountered

### Semantic Memory (knowledge base)
Facts the agent has learned or been given:
- Store in vector DB for fuzzy retrieval
- Store in key-value store for exact lookup
- Index by relevance, not by time

### Procedural Memory (skills)
How to do things:
- Reusable tool-use patterns
- Domain-specific workflows
- Stored as examples or instructions, retrieved when task type matches

## Context Management Strategy

### Sliding Window
Keep the last N turns in context. Simple but loses early context.

### Summarise-on-Overflow
When context exceeds 80% capacity:
1. Summarise oldest N turns into a compact memory block
2. Replace the raw turns with the summary
3. Append the summary to a persistent memory store

### RAG (Retrieval-Augmented Generation)
At each step, retrieve the K most relevant memory chunks:
```
query = embed(current_task + recent_observation)
memories = vector_store.search(query, k=5)
context = [system_prompt] + memories + [recent_turns] + [current_message]
```

### Memory Writing Rules
Write to long-term memory when:
- A fact is confirmed and will be needed again
- A decision was made that affects future steps
- An error was made so it isn't repeated
- A sub-task was completed

## Output
Memory schema, context assembly algorithm, eviction policy, and retrieval query design.
