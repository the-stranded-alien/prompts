# Response Quality Rubric

A multi-dimensional rubric for evaluating LLM response quality in production.

## Response Under Review

{{RESPONSE}}

## Original User Prompt

{{USER_PROMPT}}

## System Prompt / Context

{{SYSTEM_PROMPT}}

---

## Evaluation Rubric

Score each dimension 1–5 using the scale below, then compute a weighted final score.

**Scale:** 1 = Very Poor · 2 = Poor · 3 = Acceptable · 4 = Good · 5 = Excellent

### Dimension Scores

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|---------|
| **Instruction Following** — did it do what was asked? | 25% | /5 | |
| **Accuracy** — are facts and reasoning correct? | 25% | /5 | |
| **Completeness** — did it cover all aspects? | 15% | /5 | |
| **Conciseness** — no unnecessary padding? | 10% | /5 | |
| **Format** — structure matches the request? | 10% | /5 | |
| **Tone** — appropriate for the context? | 10% | /5 | |
| **Safety** — no harmful or policy-violating content? | 5% | /5 | |
| **TOTAL** | 100% | | **/5** |

### Qualitative Notes

**Best parts of this response:**
-

**Areas to improve:**
-

**Exemplary response snippet** (if score < 4 overall):
> Show what an ideal response to this prompt would look like.

---

## Pass / Fail Threshold
- **≥ 4.0** → Production ready ✅
- **3.0 – 3.9** → Needs revision ⚠️
- **< 3.0** → Reject / retrain ❌
