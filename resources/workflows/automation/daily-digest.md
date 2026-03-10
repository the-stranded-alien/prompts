# Daily Digest Automation

Automatically compile a personalised daily briefing from multiple sources.

## Sources to Monitor

{{SOURCES}}
> e.g. "Hacker News top 10, arXiv cs.AI new submissions, GitHub trending, my RSS feeds"

## Interests / Filter Keywords

{{INTERESTS}}

## Digest Format

{{FORMAT}}
> e.g. "Slack message", "Markdown email", "Notion page"

---

## Workflow Steps

### Step 1 — Fetch `[tool: web_search / rss_reader]`
For each source in `{{SOURCES}}`:
1. Retrieve today's items (since last run timestamp).
2. Store: title, URL, summary snippet, source, timestamp.

### Step 2 — Filter & Rank `[agent: curator]`
1. Score each item for relevance to `{{INTERESTS}}` (0–10).
2. Remove duplicates (same story from multiple sources).
3. Keep top 10–15 items total.
4. Group by theme (e.g. "AI Research", "Dev Tools", "Industry News").

### Step 3 — Summarise `[agent: writer]`
For each kept item:
1. Write a 1–2 sentence plain-English summary.
2. Add a "Why it matters" line if score ≥ 8.

### Step 4 — Compose & Deliver
Format output per `{{FORMAT}}`:

```
📅 Daily Digest — {{DATE}}

## 🧠 AI Research
- [Title](url) — Summary. _Why it matters: ..._

## 🛠 Dev Tools
...

## 📰 Industry
...
```

Deliver via the configured channel (email, Slack webhook, API, etc.).
