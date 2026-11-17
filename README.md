# Eloquence

Daily drills to write and speak English more clearly — with Claude Code as your coach.

## Open it

```
python3 -m http.server 8000
```

Then visit http://localhost:8000 in Chrome, Edge, or Safari. (Opening `index.html` directly also works, but browsers handle the microphone more smoothly on `localhost`.)

## What is inside

| Section | What you practise |
| --- | --- |
| **Today** | A 15-minute plan: one grammar topic, one writing drill, one speaking drill. Streak and filler trend. |
| **Grammar** | 10 topics × 6 questions, each with the rule and an explanation. Missed questions return as *Weak spots*. |
| **Writing** | Openings, body paragraphs, endings, clarity & concision, articulating ideas. Each has principles, a before/after, a "spot the stronger version" quiz, and writing prompts with an automatic check for wordy phrases, hedges, and passive voice. |
| **Speaking** | 8 timed drills (filler-free minute, PREP, explain it simply, headline first, STAR stories, pacing, articulation, What/So what/Now what). Records you, transcribes live, counts fillers and words per minute, and lets you listen back. |
| **Claude coach** | How to send drafts and transcripts to Claude Code. |

## Coaching with Claude Code

Run `claude` in this folder, then:

| Command | Use it to |
| --- | --- |
| `/speak-coach` | Get feedback on a transcript (press **Copy for Claude Code** on the Speaking page and paste). |
| `/speak-live` | Practise speaking live: Claude prompts, you answer aloud with dictation, Claude coaches each round. |
| `/write-coach` | Get a draft reviewed, with grammar corrections and one rewrite task. |
| `/grammar-drill` | Be quizzed on the grammar you personally get wrong. |
| `/progress-review` | Get a 7-day plan from your history (export progress on the Claude coach page into `practice/progress.json` first). |

Claude keeps a running record in `practice/log.md` so each session builds on the last.

## Add your own content

Everything is in `js/data.js`: questions, prompts, drills, and the filler-word list.

## Privacy

Progress is stored only in your browser. Audio never leaves your device. Live transcription uses your browser's built-in speech recognition, which in Chrome and Edge sends audio to the browser vendor's speech service.
