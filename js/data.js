/* Eloquence — all lesson and drill content. Edit freely: add questions, prompts, or whole topics. */

// Question format: [stem (HTML allowed), [options], index of correct option, explanation]
const GRAMMAR = [
  {
    id: 'agreement', title: 'Subject–verb agreement', blurb: 'Make the verb match its real subject.',
    rule: 'Find the true subject, ignore the words between it and the verb, then match the verb to it. <em>Each, every, everyone, neither</em> and <em>either</em> are singular. With <em>or / nor</em>, the verb agrees with the nearer subject.',
    ex: ['The <b>list</b> of items <b>is</b> on the desk.', 'Neither the manager nor the <b>employees were</b> told.'],
    qs: [
      ['The list of action items ___ on your desk.', ['is', 'are', 'were', 'have been'], 0, 'The subject is <em>list</em> (singular), not <em>items</em>.'],
      ['Neither the manager nor the employees ___ aware of the change.', ['were', 'was', 'is', 'has been'], 0, 'With <em>neither … nor</em>, the verb agrees with the nearer subject: <em>employees were</em>.'],
      ['Each of the students ___ a laptop.', ['has', 'have', 'are having', 'were having'], 0, '<em>Each</em> is singular, even when followed by a plural noun.'],
      ['There ___ several reasons for the delay.', ['are', 'is', 'was', 'has been'], 0, 'In <em>there is / there are</em>, the subject comes after the verb: <em>reasons are</em>.'],
      ['Everyone in both offices ___ the new policy.', ['knows', 'know', 'are knowing', 'have known'], 0, '<em>Everyone</em> is singular.'],
      ['The quality of these reports ___ improved a lot.', ['has', 'have', 'are', 'were'], 0, 'The subject is <em>quality</em>, not <em>reports</em>.'],
    ],
  },
  {
    id: 'tenses', title: 'Verb tenses', blurb: 'Place actions clearly in time.',
    rule: 'Use the <b>past simple</b> for a finished time (<em>yesterday, in 2020</em>). Use the <b>present perfect</b> for something that started in the past and still matters or continues (<em>since, for, already</em>). Use the <b>past perfect</b> for the earlier of two past events. Do not switch tense mid-story without a reason.',
    ex: ['I <b>have lived</b> here since 2019. (still true)', 'When I arrived, they <b>had</b> already <b>left</b>.'],
    qs: [
      ['I ___ in this city since 2019.', ['have lived', 'live', 'am living', 'lived'], 0, '<em>Since</em> + a starting point takes the present perfect.'],
      ['When I arrived, the meeting ___.', ['had already started', 'has already started', 'already starts', 'was already start'], 0, 'The meeting started before another past event, so use the past perfect.'],
      ['I ___ him at the conference yesterday.', ['saw', 'have seen', 'had seen', 'see'], 0, 'A finished time (<em>yesterday</em>) takes the past simple, not the present perfect.'],
      ['By next June, I ___ my degree.', ['will have finished', 'will finish', 'have finished', 'am finishing'], 0, '<em>By</em> + a future time takes the future perfect.'],
      ['I ___ dinner when the phone rang.', ['was cooking', 'cooked', 'have cooked', 'am cooking'], 0, 'A longer action interrupted by a short one takes the past continuous.'],
      ['Which sentence keeps its tense consistent?', ['She walked in, sat down, and started talking.', 'She walked in, sits down, and started talking.', 'She walks in, sat down, and starts talking.', 'She walked in, sat down, and starts talking.'], 0, 'All three verbs describe the same past sequence, so all three stay in the past.'],
    ],
  },
  {
    id: 'articles', title: 'Articles: a, an, the', blurb: 'The smallest words, the most common mistakes.',
    rule: 'Use <b>a / an</b> for one of many, mentioned for the first time. Choose by <em>sound</em>: <em>an hour, a university</em>. Use <b>the</b> when the listener knows which one. Use <b>no article</b> for general ideas and uncountable nouns: <em>advice, information, music, life</em>.',
    ex: ['I need <b>advice</b>. (not <s>an advice</s>)', 'It took <b>an</b> hour to reach <b>a</b> university in Ohio.'],
    qs: [
      ['She is ___ honest person.', ['an', 'a', 'the', '(no article)'], 0, '<em>Honest</em> begins with a vowel sound, so use <em>an</em>.'],
      ['He teaches at ___ university in Ohio.', ['a', 'an', 'the', '(no article)'], 0, '<em>University</em> begins with a “y” sound, so use <em>a</em>.'],
      ['Which sentence is correct?', ['I need some advice.', 'I need an advice.', 'I need advices.', 'I need the advices.'], 0, '<em>Advice</em> is uncountable: no <em>an</em>, no plural.'],
      ['___ sun rises in the east.', ['The', 'A', 'An', '(no article)'], 0, 'There is only one sun in our sky, so the listener knows which one.'],
      ['Which is correct as a general statement?', ['Life is short.', 'The life is short.', 'A life is short.', 'Lifes are short.'], 0, 'General, abstract ideas take no article.'],
      ['This is ___ best decision we made this year.', ['the', 'a', 'an', '(no article)'], 0, 'Superlatives (<em>best, largest, most useful</em>) take <em>the</em>.'],
    ],
  },
  {
    id: 'prepositions', title: 'Prepositions', blurb: 'In, on, at — and the pairs you must memorise.',
    rule: 'Time: <b>at</b> a clock time, <b>on</b> a day or date, <b>in</b> a month, year, or long period. Place: <b>at</b> a point, <b>on</b> a surface, <b>in</b> an enclosed space. Many verbs and adjectives take a fixed preposition (<em>depend on, interested in, good at</em>) — and some take none (<em>discuss the plan</em>).',
    ex: ['The call is <b>at</b> 3 pm <b>on</b> Monday <b>in</b> July.', 'We <b>discussed</b> the budget. (not <s>discussed about</s>)'],
    qs: [
      ['I am interested ___ learning more.', ['in', 'on', 'at', 'for'], 0, 'The fixed pair is <em>interested in</em>.'],
      ['The meeting is ___ Monday.', ['on', 'in', 'at', 'by the'], 0, 'Days and dates take <em>on</em>.'],
      ['It depends ___ the weather.', ['on', 'of', 'from', 'at'], 0, 'The fixed pair is <em>depend on</em>.'],
      ['Which sentence is correct?', ['We discussed the plan.', 'We discussed about the plan.', 'We discussed on the plan.', 'We discussed for the plan.'], 0, '<em>Discuss</em> takes a direct object with no preposition.'],
      ['She is very good ___ explaining ideas.', ['at', 'in', 'on', 'with'], 0, 'The fixed pair is <em>good at</em>.'],
      ['We arrived ___ the airport two hours early.', ['at', 'to', 'in', 'on'], 0, 'Use <em>arrive at</em> a place (a point) and <em>arrive in</em> a city or country. Never <em>arrive to</em>.'],
    ],
  },
  {
    id: 'punctuation', title: 'Commas, run-ons, fragments', blurb: 'Build sentences that stand up on their own.',
    rule: 'A sentence needs a subject, a verb, and a complete thought. Two complete sentences cannot be joined by a comma alone (a <b>comma splice</b>): use a period, a semicolon, or a comma + <em>and / but / so</em>. Put a comma after an introductory phrase, and around extra information that could be removed.',
    ex: ['I was tired, <b>so</b> I went to bed.', 'My brother<b>,</b> who lives in Dubai<b>,</b> is visiting.'],
    qs: [
      ['Which fixes the comma splice in “I was tired, I went to bed”?', ['I was tired, so I went to bed.', 'I was tired I went to bed.', 'I was tired, went to bed I.', 'I was tired, I went, to bed.'], 0, 'Join two complete sentences with a comma + conjunction, a semicolon, or a period.'],
      ['Which is a complete sentence?', ['The report was late because the data arrived on Friday.', 'Because the report was late.', 'Although we tried our best.', 'Which is why the launch slipped.'], 0, 'The others are fragments: they begin with a linking word and never finish the thought.'],
      ['Which is punctuated correctly?', ['After the meeting, we went to lunch.', 'After the meeting we, went to lunch.', 'After, the meeting we went to lunch.', 'After the meeting we went, to lunch.'], 0, 'Put a comma after an introductory phrase.'],
      ['Which is punctuated correctly?', ['The deadline moved; however, the scope stayed the same.', 'The deadline moved, however the scope stayed the same.', 'The deadline moved however, the scope stayed the same.', 'The deadline moved, however, the scope stayed the same.'], 0, '<em>However</em> joining two sentences needs a semicolon (or period) before it and a comma after it.'],
      ['You have one brother. Which is correct?', ['My brother, who lives in Dubai, is visiting.', 'My brother who lives in Dubai, is visiting.', 'My brother, who lives in Dubai is visiting.', 'My brother who, lives in Dubai is visiting.'], 0, 'Extra, removable information gets a comma on both sides.'],
      ['Which is punctuated correctly?', ['We need eggs, milk, and bread.', 'We need, eggs, milk and bread.', 'We need eggs milk, and bread.', 'We need eggs, milk, and, bread.'], 0, 'Separate list items with commas; no comma before the first item or after <em>and</em>.'],
    ],
  },
  {
    id: 'pronouns', title: 'Pronouns', blurb: 'I or me, who or whom — and who “she” really is.',
    rule: 'Use <b>I, he, she, we, they</b> as subjects and <b>me, him, her, us, them</b> as objects (including after prepositions). Test it by removing the other person: <em>“…gave it to (Sara and) me.”</em> Use <em>myself</em> only when <em>I</em> is already the subject. Make sure every pronoun points to exactly one noun.',
    ex: ['Between you and <b>me</b>, the plan is risky.', '<b>He and I</b> wrote the proposal.'],
    qs: [
      ['Between you and ___, this plan is risky.', ['me', 'I', 'myself', 'mine'], 0, '<em>Between</em> is a preposition, so it takes the object form <em>me</em>.'],
      ['Which is correct?', ['He and I wrote the proposal.', 'Me and him wrote the proposal.', 'Him and I wrote the proposal.', 'Myself and he wrote the proposal.'], 0, 'Both pronouns are subjects. Test: “He wrote… I wrote…”.'],
      ['To ___ should I send the invoice?', ['whom', 'who', 'whose', 'who’s'], 0, 'After a preposition (<em>to</em>), use the object form <em>whom</em>.'],
      ['Please contact Sarah or ___ with any questions.', ['me', 'myself', 'I', 'mine'], 0, 'Test: “Please contact me.” <em>Myself</em> only works when <em>I</em> is the subject.'],
      ['Which sentence is clear about who was nervous?', ['Sara was nervous when she met Lina.', 'When Sara met Lina, she was nervous.', 'Sara met Lina and she was nervous.', 'She was nervous when Sara met Lina.'], 0, 'In the other versions, <em>she</em> could be Sara or Lina.'],
      ['___ laptop is this?', ['Whose', 'Who’s', 'Whom', 'Who'], 0, '<em>Whose</em> shows possession. <em>Who’s</em> means <em>who is</em>.'],
    ],
  },
  {
    id: 'modifiers', title: 'Modifiers', blurb: 'Keep describing words next to what they describe.',
    rule: 'A describing phrase attaches to the nearest noun. If the thing it describes is missing or far away, the sentence says something you did not mean. An opening <em>-ing</em> phrase must describe the subject that follows the comma. Use adverbs (<em>well, fluently</em>) to describe verbs.',
    ex: ['<s>Walking in, the lights were bright.</s> → Walking in, <b>I</b> noticed the bright lights.', 'She drove her kids to school <b>almost every day</b>.'],
    qs: [
      ['Which sentence is correct?', ['Walking into the room, I noticed the bright lights.', 'Walking into the room, the lights were bright.', 'Walking into the room, the lights seemed bright to me.', 'The lights, walking into the room, were bright.'], 0, 'The person walking must be the subject right after the comma.'],
      ['Which says she made the trip on most days?', ['She drove her kids to school almost every day.', 'She almost drove her kids to school every day.', 'Almost she drove her kids to school every day.', 'She drove almost her kids to school every day.'], 0, '<em>Almost drove</em> means she never actually drove. Put <em>almost</em> next to <em>every day</em>.'],
      ['Which sentence is clear?', ['I washed the dog, which was covered in mud.', 'Covered in mud, I washed the dog.', 'I washed, covered in mud, the dog.', 'Covered in mud, the dog I washed.'], 0, 'In the second version, <em>I</em> am the one covered in mud.'],
      ['Which sentence is correct?', ['To improve the results, we repeated the experiment.', 'To improve the results, the experiment was repeated.', 'To improve the results, repeating the experiment happened.', 'The experiment, to improve the results, repeated.'], 0, 'Someone must be doing the improving: <em>we</em>.'],
      ['Which sentence is clear?', ['Driving to work, we saw a deer.', 'We saw a deer driving to work.', 'We saw, driving to work a deer.', 'A deer was seen driving to work.'], 0, 'Otherwise the deer is driving.'],
      ['He speaks English ___.', ['fluently', 'fluent', 'more fluent', 'good'], 0, 'An adverb describes how he speaks.'],
    ],
  },
  {
    id: 'parallel', title: 'Parallel structure', blurb: 'Items in a list should wear the same uniform.',
    rule: 'When you list or compare things, give each item the same grammatical form: all nouns, all <em>-ing</em> words, or all <em>to</em> verbs. With pairs like <em>not only … but also</em> and <em>either … or</em>, the same kind of word must follow each half.',
    ex: ['She likes hiking, swimming, and <b>riding</b> her bike.', 'The report was clear, concise, and <b>accurate</b>.'],
    qs: [
      ['She likes hiking, swimming, and ___.', ['riding her bike', 'to ride her bike', 'she rides her bike', 'bike rides are fun'], 0, 'Three <em>-ing</em> forms in a row.'],
      ['Which is parallel?', ['He is not only smart but also hardworking.', 'He not only is smart but also hardworking.', 'He is not only smart but also works hard.', 'Not only he is smart but hardworking also.'], 0, 'An adjective follows each half: <em>not only smart … but also hardworking</em>.'],
      ['Which is parallel?', ['The report was clear, concise, and accurate.', 'The report was clear, concise, and it was accurate.', 'The report was clear, concisely, and accurate.', 'The report was clear, had concision, and accurate.'], 0, 'Three adjectives.'],
      ['Which is parallel?', ['You can either email me or call me.', 'You can either email me or calling me.', 'Either you can email me or call me.', 'You either can email me or to call me.'], 0, 'A verb follows each half: <em>either email … or call</em>.'],
      ['The role requires patience, attention to detail, and ___.', ['strong communication', 'to communicate strongly', 'you communicate well', 'communicating'], 0, 'Three nouns (or noun phrases).'],
      ['Which is parallel?', ['It is easier to ask than to guess.', 'It is easier to ask than guessing.', 'It is easier asking than to guess.', 'Asking is easier than to guess.'], 0, 'Compare like with like: <em>to ask … to guess</em>.'],
    ],
  },
  {
    id: 'confused', title: 'Commonly confused words', blurb: 'Its/it’s, affect/effect, fewer/less, and friends.',
    rule: '<b>It’s</b> = it is; <b>its</b> = belonging to it. <b>Affect</b> is usually the verb; <b>effect</b> is usually the noun. <b>Fewer</b> for things you can count; <b>less</b> for amounts. <b>Than</b> compares; <b>then</b> is about time. <b>Advise</b> is the verb; <b>advice</b> is the noun.',
    ex: ['The company changed <b>its</b> policy. <b>It’s</b> a big change.', 'The weather <b>affects</b> my mood; it has a strong <b>effect</b>.'],
    qs: [
      ['The company updated ___ privacy policy.', ['its', 'it’s', 'its’', 'their’s'], 0, '<em>Its</em> (no apostrophe) shows possession.'],
      ['Lack of sleep can ___ your judgment.', ['affect', 'effect', 'affects', 'effects'], 0, '<em>Affect</em> is the verb: to influence.'],
      ['We received ___ complaints this month.', ['fewer', 'less', 'lesser', 'more few'], 0, 'Complaints can be counted, so use <em>fewer</em>.'],
      ['This version is faster ___ the last one.', ['than', 'then', 'that', 'as'], 0, '<em>Than</em> makes a comparison.'],
      ['I ___ told you earlier.', ['should have', 'should of', 'should had', 'should has'], 0, '<em>Should’ve</em> sounds like “should of”, but it is always <em>should have</em>.'],
      ['Can you ___ me on this contract?', ['advise', 'advice', 'advices', 'advising'], 0, '<em>Advise</em> is the verb; <em>advice</em> is the noun.'],
    ],
  },
  {
    id: 'conditionals', title: 'Conditionals', blurb: 'If this, then that — in the right tenses.',
    rule: '<b>Real future:</b> <em>if</em> + present, <em>will</em> + verb. <b>Imaginary present:</b> <em>if</em> + past, <em>would</em> + verb. <b>Imaginary past:</b> <em>if</em> + past perfect, <em>would have</em> + past participle. Never put <em>will</em> or <em>would</em> in the <em>if</em> half.',
    ex: ['If it <b>rains</b> tomorrow, we <b>will cancel</b>.', 'If I <b>had</b> more time, I <b>would learn</b> Spanish.'],
    qs: [
      ['If it ___ tomorrow, we will cancel the picnic.', ['rains', 'will rain', 'would rain', 'rained'], 0, 'Real future: present tense in the <em>if</em> half.'],
      ['If I ___ more time, I would learn Spanish.', ['had', 'have', 'would have', 'will have'], 0, 'Imaginary present: past tense in the <em>if</em> half.'],
      ['If she had studied, she ___ the exam.', ['would have passed', 'would pass', 'will pass', 'had passed'], 0, 'Imaginary past: <em>would have</em> + past participle.'],
      ['I wish I ___ taller.', ['were', 'am', 'would be', 'will be'], 0, 'Wishes about the present use the past form; formal English prefers <em>were</em>.'],
      ['Unless you ___, you will miss the train.', ['hurry', 'will hurry', 'hurried', 'would hurry'], 0, '<em>Unless</em> works like <em>if … not</em>: present tense.'],
      ['If I had taken that job, I ___ in London now.', ['would be living', 'would have lived', 'will be living', 'am living'], 0, 'A past condition with a present result: <em>would</em> + verb.'],
    ],
  },
];

// Writing modules. `mc` uses the same question format as grammar.
// Prompts: strings, or {t, model} for rewrite drills with a model answer.
const WRITING = [
  {
    id: 'opening', title: 'Openings', blurb: 'Earn the next sentence.',
    lead: 'Your first lines decide whether the rest gets read. A good opening tells the reader what this is about and why they should care — immediately.',
    principles: [
      ['Lead with the point', 'Put your main message in the first two sentences. If the reader stops there, they still got it.'],
      ['Hook with something concrete', 'A specific number, a short scene, a tension, or a real question beats a general statement.'],
      ['Cut the throat-clearing', 'Delete warm-up lines like “In today’s fast-paced world” or “I am writing to inform you that”.'],
      ['Make a promise', 'Tell the reader what they will get from reading on.'],
    ],
    before: 'In today’s fast-paced world, communication is more important than ever. In this email, I would like to take a moment to discuss some thoughts about our meetings.',
    after: 'We spend eleven hours a week in meetings, and half of them end without a decision. I’d like to cut three recurring meetings — here is which ones and why.',
    mc: [
      ['Which opening is strongest for an email asking for a budget increase?', ['I’m asking for $8,000 to replace our test servers, which failed four times last month.', 'I hope this email finds you well. I wanted to reach out regarding a matter.', 'As you may know, technology is always changing in today’s world.', 'This email is about the budget and some things related to it.'], 0, 'It states the request and the reason in one sentence, with specifics.'],
      ['Which opening is strongest for an essay on remote work?', ['My commute used to cost me 400 hours a year. Then, in one week, it cost me none.', 'Remote work is a topic that many people have many different opinions about.', 'Since the dawn of time, humans have worked.', 'In this essay I will be discussing remote work and its pros and cons.'], 0, 'A concrete number and a turn create curiosity. The others are generic or announce instead of starting.'],
      ['Which line is throat-clearing you should delete?', ['It is worth noting at the outset that there are many factors to consider.', 'Our churn doubled in March.', 'Three customers left this week for the same reason.', 'We should stop offering the free tier.'], 0, 'It delays the point and says nothing specific.'],
    ],
    prompts: [
      'Write the opening two sentences of an email asking your manager for a day off next Friday.',
      'Write the first three sentences of an essay arguing that everyone should learn to cook.',
      'Open a message to a busy stranger asking for 15 minutes of career advice.',
      'Write the opening of a short talk about a mistake that taught you something.',
      'Open a project update for people who will read only the first two lines.',
      'Write three different one-sentence openings for an article about sleep. Then mark the best one.',
      'Open a cover letter for a job you would love, without using “I am writing to apply”.',
    ],
    checklist: ['My main point appears in the first two sentences.', 'There is at least one concrete detail (number, name, example).', 'I deleted every warm-up phrase.', 'A stranger would know why this matters to them.'],
  },
  {
    id: 'body', title: 'Body paragraphs', blurb: 'One idea, proved and explained.',
    lead: 'The body is where you earn belief. Each paragraph should make one point, support it, and connect it to the next.',
    principles: [
      ['One paragraph, one idea', 'If you cannot summarise the paragraph in one sentence, it holds more than one idea. Split it.'],
      ['Topic sentence first', 'Start with the claim. A reader skimming only first sentences should follow your whole argument.'],
      ['Point → Evidence → Explain → Link', 'State the point, give an example or fact, explain why it proves the point, then link to what comes next.'],
      ['Signal your logic', 'Use transitions that say what you mean: <em>because, so, however, for example, as a result</em>.'],
    ],
    before: 'Exercise is good. Many people do not exercise. There are gyms in most cities. I started running last year and it was hard. Studies show benefits.',
    after: 'Regular exercise improves focus as well as fitness. When I began running three mornings a week, I stopped needing a second coffee by ten o’clock. That matches the research: even twenty minutes of movement raises alertness for hours. So if your afternoons feel slow, the fix may be your morning.',
    mc: [
      ['Which is the best topic sentence for a paragraph about why a team should write things down?', ['Written decisions prevent the same argument from happening twice.', 'There are many things to say about writing.', 'Last Tuesday we had a meeting about the roadmap.', 'Writing, which people have done for centuries, is interesting.'], 0, 'It makes one clear claim that the rest of the paragraph can prove.'],
      ['A paragraph says: “Our app is slow. [?] Users leave after three seconds of waiting.” Which sentence best fills the gap?', ['The home screen takes six seconds to load on an average phone.', 'Speed is a very important thing in apps.', 'We also need a new logo.', 'Many apps exist in the store.'], 0, 'It is specific evidence that connects the claim to the consequence.'],
      ['Which transition fits? “The trial cut costs by 20%. ___, customer complaints rose.”', ['However', 'Therefore', 'For example', 'Similarly'], 0, 'The second sentence contrasts with the first.'],
    ],
    prompts: [
      'Write one paragraph (4–6 sentences) proving this claim: “Reading fiction makes you a better colleague.” Use Point → Evidence → Explain → Link.',
      'Write a paragraph explaining one reason your city is a good (or bad) place to live. Include one specific example.',
      'Write a paragraph that compares two tools, apps, or habits you have used. End with a clear verdict.',
      'Explain one cause of a problem at work or school, with evidence, in one paragraph.',
      'Write a paragraph that argues against a popular opinion you disagree with. Give the opposing view one fair sentence first.',
      'Describe a process you know well (making tea, deploying code, parallel parking) in one ordered paragraph.',
    ],
    checklist: ['The first sentence states the paragraph’s one idea.', 'I gave at least one specific example or fact.', 'I explained why the evidence supports the point.', 'Each sentence connects to the one before it.'],
  },
  {
    id: 'ending', title: 'Endings', blurb: 'Land the plane.',
    lead: 'The ending is what people remember and act on. Do not fade out, and do not start a new argument.',
    principles: [
      ['Answer “so what?”', 'Say what your points add up to, and why that matters to this reader.'],
      ['Ask for one thing', 'If you want action, name it: who, what, by when.'],
      ['Echo the opening', 'Returning to your first image or question makes the piece feel complete.'],
      ['Stop when you are done', 'End on your strongest line. Cut “In conclusion”, apologies, and anything new.'],
    ],
    before: 'In conclusion, there are many pros and cons to consider, and I hope this has been helpful. There are also other issues, like pricing, that we could look at. Let me know your thoughts.',
    after: 'Cutting these three meetings gives each of us four hours back every week. If you agree, reply by Thursday and I will cancel them from Monday.',
    mc: [
      ['Which is the strongest ending for a request email?', ['Could you approve the budget by Friday so we can order before the price rises?', 'Anyway, let me know what you think whenever you get a chance.', 'Sorry for the long email!', 'There are also several other issues I haven’t mentioned.'], 0, 'One clear action, a deadline, and a reason.'],
      ['Which ending best closes an essay that opened with “My commute used to cost me 400 hours a year”?', ['I spent those 400 hours this year learning the piano. I am not giving them back.', 'In conclusion, remote work has both advantages and disadvantages.', 'Another point is that offices are expensive.', 'That is all I have to say about remote work.'], 0, 'It echoes the opening and ends on a strong, concrete line.'],
      ['What should a conclusion NOT do?', ['Introduce a new argument', 'State the takeaway', 'Name a next step', 'Return to the opening image'], 0, 'New arguments belong in the body. The ending closes.'],
    ],
    prompts: [
      'Write the final two sentences of an email asking a colleague to review your document by Wednesday.',
      'Write a closing paragraph for an essay arguing that everyone should learn to cook.',
      'End a short talk about a mistake that taught you something. Finish on one memorable line.',
      'Write the last three sentences of a project update: the result, what it means, and what happens next.',
      'Write three different final sentences for an article about sleep. Then mark the strongest.',
      'End a cover letter without using “Thank you for your time and consideration”.',
    ],
    checklist: ['The takeaway is stated in one sentence.', 'If I want action, I named who, what, and when.', 'I introduced no new argument.', 'My last line is the strongest line in the ending.'],
  },
  {
    id: 'clarity', title: 'Clarity & concision', blurb: 'Say it in fewer, stronger words.',
    lead: 'Clear writing is edited writing. In these drills you rewrite a weak sentence, then compare with a model answer.',
    principles: [
      ['Prefer the active voice', '“The team missed the deadline” is clearer than “The deadline was missed.”'],
      ['Use verbs, not noun phrases', '“We decided” beats “We made a decision”. “Analyse” beats “conduct an analysis of”.'],
      ['Cut filler and hedges', 'Delete <em>very, really, just, basically, in order to, I think that</em> unless they change the meaning.'],
      ['One sentence, one idea', 'If a sentence runs past about 25 words, look for a place to put a period.'],
    ],
    before: 'It is my personal opinion that a decision should be made by us in the near future with regard to the implementation of the new system.',
    after: 'I think we should decide soon whether to adopt the new system.',
    mc: [
      ['Which is the most concise version?', ['We decided to delay the launch because testing found two serious bugs.', 'A decision was made by us to delay the launch due to the fact that two serious bugs were found in testing.', 'Basically, we just made the decision that we would really need to delay the launch.', 'The launch, for reasons related to bugs, has been the subject of a delay decision.'], 0, 'Active voice, a real verb (<em>decided</em>), and <em>because</em> instead of <em>due to the fact that</em>.'],
      ['Which words can be cut from “In order to be able to finish on time, we really need to start right now”?', ['“In order”, “be able to”, “really”, “right”', '“finish on time”', '“we need to start”', 'Nothing — it is already tight'], 0, '“To finish on time, we need to start now.”'],
    ],
    prompts: [
      { t: 'Rewrite: “Due to the fact that the weather was bad, the decision was made to postpone the event.”', model: 'We postponed the event because of bad weather.' },
      { t: 'Rewrite: “There are a large number of customers who are of the opinion that the app is slow.”', model: 'Many customers think the app is slow.' },
      { t: 'Rewrite: “I just wanted to quickly reach out and basically check if you might possibly have some time to meet.”', model: 'Do you have time to meet this week?' },
      { t: 'Rewrite: “The implementation of the new policy will be carried out by the HR team at the beginning of next month.”', model: 'HR will introduce the new policy early next month.' },
      { t: 'Rewrite: “It is important to note that mistakes were made in the course of the process of testing.”', model: 'We made mistakes during testing.' },
      { t: 'Rewrite: “At this point in time, we are not in a position to be able to provide a refund.”', model: 'We cannot offer a refund right now.' },
      { t: 'Rewrite: “She gave an explanation of the reasons why the project had experienced a failure.”', model: 'She explained why the project failed.' },
      { t: 'Rewrite: “In my honest opinion, I really do think that the meeting was kind of a waste of time.”', model: 'The meeting wasted our time.' },
    ],
    checklist: ['The person doing the action is the subject.', 'I replaced noun phrases with verbs.', 'I cut every word that added nothing.', 'The meaning is the same as the original.'],
  },
  {
    id: 'ideas', title: 'Articulating ideas', blurb: 'Know your point before you write it.',
    lead: 'Unclear writing usually comes from unclear thinking. These drills force you to find your point first, then give it a shape.',
    principles: [
      ['One-sentence test', 'Before writing, finish this sentence: “The one thing I want you to know is…”. If you cannot, keep thinking.'],
      ['Answer first, then reasons', 'Give your conclusion, then the two or three reasons that support it, then the details.'],
      ['What? So what? Now what?', 'State the fact, say why it matters, and say what should happen next.'],
      ['Explain it to a twelve-year-old', 'Plain words and one good example expose whether you truly understand the idea.'],
    ],
    before: 'So there’s been a lot going on with the project, and we looked at several things, and some went well, and there were some issues with the vendor, which we’re handling, kind of.',
    after: 'The project is two weeks late because our vendor missed a delivery. We have a replacement arriving Monday, so the new launch date is 14 March.',
    mc: [
      ['A colleague asks, “Should we hire a contractor?” Which reply is best structured?', ['Yes. We are three weeks behind, nobody on the team knows the payment system, and a contractor costs less than the delay.', 'Well, it depends. There are a lot of factors, and I have been thinking about it for a while now.', 'So, last month we looked at the timeline, and then the payment system came up, and then…', 'Contractors are people who work on contracts, and many companies use them.'], 0, 'Answer first, then three reasons.'],
      ['Which summary passes the one-sentence test?', ['We should move support to chat because it resolves issues twice as fast as email.', 'This document is about customer support channels.', 'Support, email, chat, speed, and customers are all discussed.', 'There are many ways to think about support.'], 0, 'It states a position and the reason for it.'],
    ],
    prompts: [
      'Pick a book, film, or article you finished recently. Summarise its main idea in exactly one sentence, then explain it in three more.',
      'Use “What? So what? Now what?” to describe one thing that happened at work or school this week.',
      'Explain how the internet works to a twelve-year-old in five sentences. No technical terms.',
      'State an opinion you hold strongly. Give your answer in one sentence, then exactly three reasons.',
      'Describe your job (or your studies) to someone at a dinner party in three sentences, so they would want to ask a follow-up question.',
      'Write the strongest fair version of a view you disagree with, in four sentences.',
      'Explain a decision you made recently: the options, what you chose, and why — in under 80 words.',
    ],
    checklist: ['I can state my point in one sentence.', 'The answer comes before the explanation.', 'I used plain words a non-expert would understand.', 'I included one concrete example.'],
  },
];

const TOPICS = [
  'Should people learn to cook?', 'The best advice you have ever received', 'Is remote work better than office work?',
  'A skill everyone should learn', 'Why (or why not) read fiction?', 'What makes a good manager?',
  'Should schools teach personal finance?', 'A technology you could not live without', 'Is it better to rent or to own a home?',
  'What makes a city a good place to live?', 'A habit that changed your life', 'Should meetings have a time limit?',
  'The most overrated thing people spend money on', 'What would you change about your industry?', 'Are social networks good for friendships?',
  'What makes a great teacher?', 'A place everyone should visit once', 'Should everyone learn a second language?',
  'What is the best way to learn something new?', 'Morning person or night person — which is better?',
];
const CONCEPTS = [
  'how a bank makes money', 'what the cloud is', 'why the sky is blue', 'how vaccines work', 'what inflation is',
  'how a search engine finds things', 'what your job is', 'how aeroplanes stay in the air', 'what compound interest is',
  'why we have time zones', 'how a password keeps things safe', 'what an algorithm is', 'why seasons change',
  'how recycling works', 'what a budget is',
];
const STORIES = [
  'a time you solved a difficult problem', 'a time you disagreed with someone and handled it well', 'a mistake that taught you something',
  'a time you had to learn something quickly', 'a project you are proud of', 'a time you helped someone succeed',
  'a time you changed your mind', 'a moment you had to deliver bad news', 'the hardest decision you made last year',
  'a time you received difficult feedback',
];

// Speaking drills. `secs` is the speaking time. `pool` is a list of prompts; `prefix` is put in front of each.
const SPEAKING = [
  {
    id: 'filler', title: 'Filler-free minute', secs: 60, focus: 'Filler words',
    goal: 'Speak for one minute with zero fillers. Whenever you feel an “um” coming, close your mouth and pause instead.',
    how: ['Speak slower than feels natural.', 'Finish each sentence, stop, breathe, then start the next.', 'Tap the filler button (or press Space) every time you catch yourself — noticing is the skill.'],
    prefix: 'Talk about: ', pool: TOPICS,
  },
  {
    id: 'prep', title: 'PREP impromptu', secs: 90, focus: 'Structure',
    goal: 'Answer on the spot using PREP: Point, Reason, Example, Point again.',
    how: ['Point: answer the question in one sentence.', 'Reason: “Because…”', 'Example: one short, specific story or fact.', 'Point: repeat your answer in fresh words and stop.'],
    prefix: 'Give your view: ', pool: TOPICS,
  },
  {
    id: 'simple', title: 'Explain it simply', secs: 90, focus: 'Clarity',
    goal: 'Explain an idea so a twelve-year-old would understand it. No jargon; one comparison to everyday life.',
    how: ['Start with a one-sentence answer.', 'Use one comparison: “It is like…”.', 'Use short sentences and common words.', 'End by repeating the one-sentence answer.'],
    prefix: 'Explain ', pool: CONCEPTS,
  },
  {
    id: 'headline', title: 'Headline first', secs: 30, focus: 'Getting to the point',
    goal: 'Thirty seconds. Your first sentence must be your conclusion; then give two reasons and stop.',
    how: ['Take five seconds of silence to choose your headline.', 'Say it as a complete sentence.', 'Add “First…” and “Second…”.', 'Stop talking when you are done, even if time remains.'],
    prefix: 'Your position on: ', pool: TOPICS,
  },
  {
    id: 'story', title: 'Tell a story (STAR)', secs: 120, focus: 'Storytelling',
    goal: 'Tell a two-minute story with a clear shape: Situation, Task, Action, Result.',
    how: ['Situation and Task: two sentences each, no more.', 'Action: spend most of your time here, and say “I”, not “we”.', 'Result: give a number or a concrete outcome.', 'Finish with one sentence on what you learned.'],
    prefix: 'Tell me about ', pool: STORIES,
  },
  {
    id: 'pace', title: 'Read aloud: pace & pauses', secs: 75, focus: 'Pace and pausing', passage: true,
    goal: 'Read the passage aloud at a calm 130–160 words per minute. Pause briefly at each / and fully at each //.',
    how: ['Stand or sit tall and breathe before you begin.', 'Stress the words in bold with your voice.', 'Let silence do the work at each pause mark.', 'Listen to the recording afterwards: do you sound rushed?'],
    prefix: '', pool: [
      'Most people think **clear speaking** is a talent. // It is not. / It is a **habit**, / built one small choice at a time. // Choose a **shorter** word. / Choose a **shorter** sentence. / And when you do not know what comes next, / choose **silence**. // A pause feels long to the speaker, / but to the listener / it sounds like **confidence**. // So slow down. / Say **one thing**. / Then stop.',
      'When you explain an idea, / start with the **end**. // Tell people where you are going / **before** you take them there. // Give them **one** reason, / then another, / then a **story** they can see. // If you lose your place, / do not apologise. / **Breathe**, / find your next sentence, / and continue. // Nobody remembers the pause. / They remember **the point**.',
      'Good writing and good speaking / share a **secret**: // they respect the listener’s **time**. // Every extra word / is a small **tax** on attention. // So cut the warm-up. / Cut the apology. / Cut the sentence that says what you are **about** to say. // What remains / is the thing you **meant**. // Say **that**, / clearly, / and trust it to be **enough**.',
    ],
  },
  {
    id: 'articulation', title: 'Articulation warm-up', secs: 60, focus: 'Diction', passage: true,
    goal: 'Repeat each line three times: first slowly and exaggerated, then at normal speed, then fast — without losing any consonants.',
    how: ['Open your mouth wider than usual.', 'Hit the final sounds of each word: t, d, k, s.', 'If you stumble, slow down rather than push through.', 'Do this before any important call or talk.'],
    prefix: '', pool: [
      'Red leather, yellow leather. // Unique New York, unique New York. // She sells seashells by the seashore. // The lips, the teeth, the tip of the tongue.',
      'Truly rural, truly rural. // Three free throws. // A proper copper coffee pot. // Which wristwatches are Swiss wristwatches?',
      'Peter Piper picked a peck of pickled peppers. // Eleven benevolent elephants. // Toy boat, toy boat, toy boat. // Betty bought a bit of better butter.',
    ],
  },
  {
    id: 'wsn', title: 'What? So what? Now what?', secs: 90, focus: 'Articulating ideas',
    goal: 'Give a spoken update in three clear parts: what happened, why it matters, what should happen next.',
    how: ['What: the facts in two sentences.', 'So what: the consequence for your listener.', 'Now what: one recommendation or next step.', 'Say the three labels out loud the first few times you practise.'],
    prefix: 'Give an update on: ', pool: [
      'something you worked on this week', 'a piece of news you read recently', 'a problem you noticed at work or at home',
      'a goal you are working towards', 'a decision you need to make soon', 'something you learned this month',
      'a change you would like your team or family to make', 'a recent purchase and whether it was worth it',
    ],
  },
];

// Words and phrases flagged in spoken transcripts. `soft` ones are sometimes legitimate — check the context.
const FILLERS = [
  ['um / uh', /\b(?:u+m+|u+h+|er+m*|a+h+|h+m+)\b/gi],
  ['like', /\blike\b/gi, 'soft'],
  ['you know', /\byou know\b/gi],
  ['I mean', /\bi mean\b/gi],
  ['kind of / sort of', /\b(?:kind of|kinda|sort of|sorta)\b/gi],
  ['basically', /\bbasically\b/gi],
  ['actually', /\bactually\b/gi, 'soft'],
  ['literally', /\bliterally\b/gi],
  ['honestly', /\b(?:honestly|to be honest)\b/gi],
  ['just', /\bjust\b/gi, 'soft'],
  ['okay so / so yeah', /\b(?:okay so|ok so|so yeah|and yeah|yeah so)\b/gi],
  ['and stuff / or something', /\b(?:and stuff|or something|or whatever|and things like that)\b/gi],
];

// Phrases flagged in written drafts, with a suggested replacement.
const WORDY = {
  'in order to': 'to', 'due to the fact that': 'because', 'at this point in time': 'now', 'in the event that': 'if',
  'a large number of': 'many', 'is able to': 'can', 'are able to': 'can', 'has the ability to': 'can',
  'make a decision': 'decide', 'made a decision': 'decided', 'with regard to': 'about', 'with regards to': 'about',
  'for the purpose of': 'to', 'it is important to note that': 'cut it', 'needless to say': 'cut it',
  'in my opinion': 'cut it', 'the fact that': 'cut or rephrase', 'in the near future': 'soon',
  'on a daily basis': 'daily', 'in spite of the fact that': 'although', 'in conclusion': 'cut it',
  'i am writing to': 'cut it', 'i would like to': 'cut it', 'take into consideration': 'consider',
};
const HEDGES = ['very', 'really', 'just', 'quite', 'basically', 'actually', 'literally', 'somewhat', 'perhaps', 'maybe', 'kind of', 'sort of', 'a bit', 'i think', 'i believe', 'i feel like', 'i guess', 'pretty much'];
