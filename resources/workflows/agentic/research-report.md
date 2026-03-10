# Research Report Workflow

An end-to-end agentic workflow to produce a structured research report on any topic.

## Topic

{{RESEARCH_TOPIC}}

## Depth

{{DEPTH}}
> e.g. "Executive overview (1 page)", "Deep dive (5–10 pages)", "Academic-style with citations"

## Audience

{{AUDIENCE}}

---

## Workflow Phases

### Phase 1 — Scoping `[agent: planner]`
1. Decompose `{{RESEARCH_TOPIC}}` into 4–6 key questions.
2. Identify the most authoritative source types (academic, news, official docs, etc.).
3. Define the report outline (sections and expected word counts).

### Phase 2 — Data Gathering `[agent: researcher]`
For each key question:
1. Run targeted web searches (3–5 queries per question).
2. Extract relevant passages and record the source URL + date.
3. Flag contradictions across sources.

### Phase 3 — Synthesis `[agent: writer]`
1. Answer each key question using gathered evidence.
2. Cross-reference findings; resolve or surface contradictions.
3. Write the report following the Phase 1 outline.
4. Cite all sources inline `[Source N]` and compile a reference list.

### Phase 4 — Review `[agent: critic]`
1. Check factual claims against sources.
2. Identify gaps or unanswered questions.
3. Rate overall confidence: High / Medium / Low.
4. Produce a **Limitations** section.

### Phase 5 — Deliver
Output the final report in Markdown with:
- Executive summary (3–5 bullets)
- Full body sections
- Confidence rating
- References
