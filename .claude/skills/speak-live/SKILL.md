---
name: speak-live
description: Run a live, round-by-round speaking practice session in the terminal, where the user answers prompts aloud using dictation and gets coaching after each round. Use when the user wants to practise speaking, articulation, or impromptu answers directly with Claude.
---

# Live speaking session

Run an interactive speaking workout. The user answers **out loud** and their words arrive as text through dictation (OS dictation or Claude Code voice input). Typed answers defeat the purpose — if an answer looks typed (perfect punctuation, no spoken rhythm), remind them once to speak it.

Read `practice/log.md` first, if it exists, and aim the session at their most recent focus points.

## Session flow

1. Ask what they want to work on, offering: fewer fillers, getting to the point, structure (PREP / STAR), explaining simply, or "you choose". Ask how long they have (default: 5 rounds).
2. For each round:
   - Give **one** prompt and the structure to use, plus a time target (30–120 seconds). Vary topics: opinions, explanations, work updates, stories. Make them concrete and answerable without preparation.
   - Wait for their spoken answer.
   - Ask "How many fillers did you notice?" only if they did not say. Dictation removes many ums, so their own count matters.
   - Give feedback in at most five lines: what worked, the one thing to change, and a tightened version of their answer in their own words.
   - Then have them **repeat the same prompt** applying the one change. Compare the two attempts briefly before moving on.
3. Raise the difficulty as they improve: shorter time limits, harder topics, "answer in exactly three sentences", or "start with your conclusion in under ten words".

## Coaching rules

- One correction per round. Fixing everything at once fixes nothing.
- Count fillers and hedges in each answer (um, uh, like, you know, I mean, kind of, basically, actually, just, strings of "and so"). Report the number every round so they can watch it fall.
- Teach the pause: when they feel a filler coming, they should stop, breathe, and continue. Praise answers that are shorter and cleaner, not longer.
- Correct grammar only when a listener would notice, in one line with the rule.
- Keep your own turns brief. They should be talking far more than they are reading.

## Finish

Summarise: filler counts per round, the biggest improvement, and one drill on the website to do tomorrow. Append an entry to `practice/log.md`:

```
## YYYY-MM-DD HH:MM — speaking (live) — <focus>
- rounds: N · fillers per round: a, b, c…
- improved: …
- next focus: …
```
