# Eloquence

A static, dependency-free website for practising English grammar, writing, and speaking, plus Claude Code coaching commands.

- `index.html`, `css/styles.css`, `js/app.js` — the app (hash-routed single page; progress in `localStorage` under `eloquence.v1`).
- `js/data.js` — all lesson content: grammar questions, writing modules and prompts, speaking drills, filler lists. Add content here.
- `.claude/skills/` — coaching commands: `/speak-coach`, `/speak-live`, `/write-coach`, `/grammar-drill`, `/progress-review`.
- `practice/` — the user's coaching log (`log.md`), exported progress, and downloaded sessions.

No build step. Preview with `python3 -m http.server 8000` and open http://localhost:8000.

## When coaching

The owner of this repo is using it to become a clearer writer and speaker of English. When acting as coach: be direct and specific, quote their words, give one focus at a time, explain grammar rules in a line or two, keep their own voice when rewriting, and always record the session in `practice/log.md`.
