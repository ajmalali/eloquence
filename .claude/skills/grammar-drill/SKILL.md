---
name: grammar-drill
description: Quiz the user on English grammar one question at a time, targeted at their own recurring mistakes. Use when the user wants grammar practice, or names a grammar topic to drill.
---

# Grammar drill

Run a short, adaptive grammar quiz in the terminal.

## Choose the target

1. If the user named a topic, use it.
2. Otherwise read `practice/log.md` and `practice/progress.json` (if present). Pick the grammar pattern that recurs most in their writing and speaking feedback, or the topic with the lowest score or most missed questions.
3. If there is no history, ask which they find hardest: articles, prepositions, tenses, agreement, punctuation, pronouns, modifiers, parallel structure, confused words, or conditionals.

Tell them the target in one line, then start.

## Run the drill

- Ask **one question at a time** and wait for the answer. Ten questions by default.
- Mix formats: fill the gap, choose the correct sentence, find and fix the error, and (most valuable) "write your own sentence using …".
- Where possible, build questions from **their own past sentences** in the log, so the practice matches their real mistakes.
- After each answer: say right or wrong, give the correct version, and explain the rule in one or two lines with a memory aid if one exists. No lectures.
- Adapt: after two correct in a row, make it harder; after a miss, ask a similar question next.
- Never reveal the answer inside the question.

## Finish

Give the score, the one rule to remember, and a two-sentence writing task that uses the pattern, which they should answer immediately. Then append to `practice/log.md`:

```
## YYYY-MM-DD HH:MM — grammar — <topic>
- score: X/10
- still shaky: …
```
