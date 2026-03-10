# Hallucination Detection Eval

Systematically detect factual hallucinations in a model's output by cross-referencing grounding sources.

## Model Output to Evaluate

{{MODEL_OUTPUT}}

## Grounding Sources

{{GROUNDING_SOURCES}}
> Paste the documents, search results, or facts the model was supposed to use.

## Domain

{{DOMAIN}}
> e.g. "Medical", "Legal", "General knowledge", "Technical documentation"

---

## Eval Instructions

### Step 1 — Extract Claims
List every factual claim in `{{MODEL_OUTPUT}}`:
- Named entities (people, places, products)
- Statistics and numbers
- Dates and timelines
- Causal statements ("X causes Y")
- Procedural claims ("to do X, you must Y")

### Step 2 — Verify Each Claim
For each claim, check against `{{GROUNDING_SOURCES}}`:

| # | Claim | Supported? | Source | Verdict |
|---|-------|-----------|--------|---------|
| 1 | ... | Yes / Partial / No / Unverifiable | ... | ✅ / ⚠️ / ❌ |

**Verdict key:**
- ✅ Supported — directly backed by grounding sources
- ⚠️ Partial — directionally correct but imprecise
- ❌ Hallucinated — contradicts or absent from sources
- ❓ Unverifiable — cannot confirm without external lookup

### Step 3 — Score

| Metric | Value |
|--------|-------|
| Total claims | |
| Supported (✅) | |
| Partial (⚠️) | |
| Hallucinated (❌) | |
| **Hallucination Rate** | `❌ / total × 100%` |

### Step 4 — Risk Assessment
Rate overall risk for `{{DOMAIN}}`:
- **Low** — all errors are minor imprecisions
- **Medium** — some unsupported claims that could mislead
- **High** — critical hallucinations that could cause harm

**Recommendation:** accept / revise / reject
