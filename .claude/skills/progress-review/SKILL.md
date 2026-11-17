---
name: progress-review
description: Review the user's Eloquence practice history (coaching log and exported progress) and produce a focused plan for the next week. Use when the user asks how they are doing or what to practise next.
---

# Progress review

Read `practice/log.md` and `practice/progress.json` (exported from the website's Claude coach page), plus any `practice/speaking-*.md` and `practice/writing-*.md` files. If nothing exists yet, say so and suggest doing one drill in each area first.

Report, briefly:

1. **Consistency** — days practised, current streak, which area is being skipped.
2. **Speaking trend** — fillers per minute and words per minute over time (first sessions against the latest), the top crutch words, and whether structure is improving.
3. **Writing trend** — recurring feedback themes; whether openings, bodies, or endings are weakest.
4. **Grammar** — topics below 100%, missed questions, and patterns that keep appearing in real writing and speech.
5. **The one priority** — the single weakness that, if fixed, would most improve how they come across.

Then give a **7-day plan**: about 15 minutes a day, naming specific drills on the site (by section and title) and which coaching command to run on which days. Weight it toward the one priority.

Use real numbers from the files. Do not guess at trends the data does not show; with fewer than three sessions in an area, say there is not enough data yet.

Append a short summary to `practice/log.md` under `## YYYY-MM-DD — review`.
