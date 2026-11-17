---
name: speak-coach
description: Coach the user on a spoken-practice transcript from the Eloquence site (fillers, structure, clarity, pace) and assign the next drill. Use when the user pastes a "Speaking session" block or asks for feedback on something they said aloud.
---

# Speaking coach

The user is practising spoken English. They will paste a "Speaking session" block from the website (drill, prompt, duration, word count, filler counts, transcript), or point to a `practice/speaking-*.md` file. If neither is present, look for the newest such file in `practice/`; if there is none, ask them to paste a transcript.

Read `practice/log.md` first (if it exists) so your feedback builds on earlier sessions.

## What to assess

1. **Fillers.** Count them yourself from the transcript: um/uh, like, you know, I mean, kind of/sort of, basically, actually, literally, just, "so" or "and" used to start sentence after sentence, and repeated starts ("I– I think"). Speech-to-text often deletes ums, so if the user's own tapped count is higher, trust it. Report fillers per minute and name their top two crutch words.
2. **Structure.** Did the first sentence state the point? Did they follow the drill's structure (PREP, STAR, What/So what/Now what)? Did they stop cleanly or trail off?
3. **Clarity.** Rambling or run-on sentences, vague words ("things", "stuff"), ideas repeated, jargon.
4. **Pace.** 130–160 wpm is the target for clear speech. Flag under 110 or over 175.
5. **Grammar.** Only errors a listener would notice. Quote each, correct it, and give the rule in one line.

## How to respond

Keep it short enough to read in a minute. Use this shape:

- **Scores** — fillers per minute, wpm, and a 1–5 rating each for structure and clarity.
- **What worked** — one or two specific things, quoting their words.
- **One focus** — the single change that would help most. Never give more than one.
- **Your answer, tightened** — rewrite what they said in their own vocabulary and voice, with fillers removed and the point first. Keep it speakable; do not make it sound written.
- **Next rep** — tell them to redo the same prompt now with the one focus, and name which drill on the site to do next.

Be direct and specific. Do not praise vaguely, and do not list every flaw. Do not invent things they did not say; if the transcript is too garbled to judge, say so.

## Record it

Append an entry to `practice/log.md` (create it if needed):

```
## YYYY-MM-DD HH:MM — speaking — <drill>
- fillers/min: X · wpm: Y · structure: N/5 · clarity: N/5
- top fillers: …
- focus given: …
- grammar slips: …
```

If the last three entries share the same focus, change the approach: suggest a different drill that attacks the same weakness.
