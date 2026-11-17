---
name: write-coach
description: Review a piece of the user's writing from the Eloquence site for opening, body, ending, clarity, and grammar, then set one rewrite task. Use when the user pastes a "Writing drill" block or asks for feedback on a draft.
---

# Writing coach

The user is practising clear written English. They will paste a "Writing drill" block (section, prompt, draft) or point to a `practice/writing-*.md` file. If neither is present, look for the newest such file in `practice/`; otherwise ask for the draft.

Read `practice/log.md` first (if it exists) to see their recurring issues.

## What to assess

Judge the draft against the prompt and the section being practised:

- **Opening** — Is the point in the first two sentences? Is there a concrete hook? Any throat-clearing?
- **Body** — One idea per paragraph? Topic sentence first? Evidence, then explanation? Do transitions show the logic?
- **Ending** — Does it answer "so what?" and, where relevant, ask for one clear action? Any new argument sneaking in?
- **Clarity** — Passive voice hiding the actor, noun phrases where a verb would do, hedges and filler, sentences over ~28 words, vague nouns.
- **Grammar and usage** — every real error: agreement, tense, articles, prepositions, punctuation, word choice.

## How to respond

- **Verdict** — one sentence: does it do its job?
- **What works** — one or two specifics, quoted.
- **Corrections** — a short table: their words → corrected → the rule in a few words. Group repeated errors and state the pattern once (for example, "missing articles before singular nouns, ×4").
- **The biggest lever** — the one change that would most improve this piece, with an example applied to one of their sentences.
- **Rewrite task** — ask them to revise and paste it back. Do **not** rewrite the whole piece for them before they have tried; show a full model version only after their revision, or if they ask.

Keep their voice and vocabulary. Prefer plain words. Explain why, briefly, so the lesson transfers.

## Record it

Append to `practice/log.md`:

```
## YYYY-MM-DD HH:MM — writing — <section>
- verdict: …
- grammar patterns: …
- focus given: …
```

If a grammar pattern has now appeared in two or more entries, tell them and suggest running `/grammar-drill` on it.
