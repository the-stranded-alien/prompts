# Summarise Skill

Condense any content — articles, docs, transcripts, codebases — into a clear, structured summary.

## Trigger

Use when asked to "summarise", "TL;DR", "give me the gist of", or "what does X say".

## Input

Accepts: URLs, pasted text, file paths, or topic names.

## Steps

1. **Identify** the type of content (article, technical doc, meeting notes, code, etc.)
2. **Extract** the core argument or purpose
3. **Pull** key points (limit to 5–7)
4. **Note** important caveats or limitations
5. **Flag** anything that requires the user's attention

## Output Format

```markdown
**TL;DR**: [1 sentence]

**Key Points**
1. ...
2. ...
3. ...

**Worth Noting**
- [Caveat or limitation]

**Action Items** *(if applicable)*
- [ ] ...
```

## Tone

- Match the audience: technical for devs, plain English for general content
- Objective — no editorialising unless asked
- Length: aim for 20% of the original
