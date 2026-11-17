/* Eloquence — app logic. No build step, no dependencies. Progress lives in localStorage. */
(() => {
  const main = document.getElementById('main');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, not) => { if (a.length < 2) return a[0]; let x; do { x = a[Math.floor(Math.random() * a.length)]; } while (x === not); return x; };
  const dayKey = (d = new Date()) => d.toLocaleDateString('en-CA');
  const stamp = () => new Date().toLocaleString('en-CA', { hour12: false }).slice(0, 17).replace(',', '');
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  // ---------- state ----------
  const KEY = 'eloquence.v1';
  const blank = () => ({ grammar: {}, missed: [], writing: [], speaking: [], days: {} });
  let S = blank();
  try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch { /* storage unavailable: run without saving */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* ignore */ } };
  const touch = kind => { (S.days[dayKey()] ||= {})[kind] = true; save(); };

  function streak() {
    let n = 0; const d = new Date();
    if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1);
    while (S.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  // ---------- helpers ----------
  function toast(msg) {
    document.querySelector('.toast')?.remove();
    const t = Object.assign(document.createElement('div'), { className: 'toast', textContent: msg });
    t.setAttribute('role', 'status'); document.body.append(t); setTimeout(() => t.remove(), 2200);
  }
  async function copy(text, msg = 'Copied — paste it into Claude Code') {
    try { await navigator.clipboard.writeText(text); toast(msg); }
    catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove(); toast(msg);
    }
  }
  function download(name, text, type = 'text/markdown') {
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([text], { type })), download: name });
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // All multiple-choice questions, keyed by id, so missed ones can be replayed.
  const QS = {};
  const mkQs = (prefix, list) => list.map((q, i) => (QS[`${prefix}:${i}`] = { id: `${prefix}:${i}`, q: q[0], opts: q[1], a: q[2], why: q[3] }));
  GRAMMAR.forEach(t => { t.questions = mkQs(t.id, t.qs); });
  WRITING.forEach(m => { m.questions = mkQs('w-' + m.id, m.mc); });

  function quiz(el, questions, onDone, kind) {
    const qs = questions.map(q => ({ ...q, opts: shuffle(q.opts.map((t, k) => ({ t, ok: k === q.a }))) }));
    let i = 0, right = 0;
    const show = () => {
      const q = qs[i], last = i === qs.length - 1;
      el.innerHTML = `<div class="quiz"><div class="qmeta"><span>Question ${i + 1} of ${qs.length}</span><span>${right} correct</span></div>
        <p class="qstem">${q.q}</p>
        <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o.t)}</button>`).join('')}</div>
        <div class="fb" aria-live="polite"></div></div>`;
      const btns = [...el.querySelectorAll('.opt')];
      btns.forEach(b => b.onclick = () => {
        const ok = q.opts[b.dataset.k].ok;
        btns.forEach((x, k) => { x.disabled = true; if (q.opts[k].ok) x.classList.add('ok'); });
        if (ok) right++; else b.classList.add('no');
        S.missed = S.missed.filter(id => id !== q.id); if (!ok) S.missed.push(q.id);
        if (kind) touch(kind); else save();
        const fb = el.querySelector('.fb');
        fb.innerHTML = `<p><strong>${ok ? 'Correct.' : 'Not quite.'}</strong> ${q.why}</p><button class="btn primary">${last ? 'See result' : 'Next question'}</button>`;
        const next = fb.querySelector('button');
        next.onclick = () => { if (last) done(); else { i++; show(); } };
        next.focus();
      });
    };
    const done = () => {
      const pct = Math.round(100 * right / qs.length);
      el.innerHTML = `<div class="quiz result"><b>${right}/${qs.length}</b>
        <p class="muted">${pct === 100 ? 'Perfect. Come back in a few days to check it stuck.' : pct >= 70 ? 'Solid. The ones you missed are saved under Weak spots.' : 'Re-read the rule above, then try again. Missed questions are saved under Weak spots.'}</p>
        <div class="row" style="justify-content:center"><button class="btn primary" data-a="again">Try again</button></div></div>`;
      el.querySelector('[data-a=again]').onclick = () => quiz(el, questions, onDone, kind);
      onDone?.(right, qs.length);
    };
    show();
  }

  // ---------- Today ----------
  function home() {
    const today = S.days[dayKey()] || {};
    const g = GRAMMAR.find(t => !S.grammar[t.id]) || GRAMMAR.slice().sort((a, b) => S.grammar[a.id].best - S.grammar[b.id].best)[0];
    const n = Math.floor(Date.now() / 864e5);
    const w = WRITING[n % WRITING.length], sp = SPEAKING[n % SPEAKING.length];
    const mastered = GRAMMAR.filter(t => S.grammar[t.id]?.best === 100).length;
    const recent = S.speaking.slice(-12);
    const max = Math.max(1, ...recent.map(r => r.fpm));
    const step = (num, kind, href, title, sub) => `<li><a href="${href}"><span class="n ${today[kind] ? 'done' : ''}">${today[kind] ? '✓' : num}</span><span>${title}<small>${sub}</small></span><span class="go">${today[kind] ? 'Done today' : 'Start →'}</span></a></li>`;
    main.innerHTML = `
      <p class="eyebrow">${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      <h1>Fifteen minutes to a clearer you.</h1>
      <p class="lead">Clear writing and clear speaking are habits. Do one small drill in each area every day, and let Claude Code coach the parts a web page cannot.</p>
      <div class="stats">
        <div class="stat"><b>${streak()}</b><span>day streak</span></div>
        <div class="stat"><b>${mastered}/${GRAMMAR.length}</b><span>grammar topics at 100%</span></div>
        <div class="stat"><b>${S.writing.length}</b><span>writing drills saved</span></div>
        <div class="stat"><b>${S.speaking.length}</b><span>speaking sessions</span></div>
      </div>
      <h2>Today’s practice</h2>
      <ol class="plan">
        ${step(1, 'grammar', '#/grammar/' + g.id, 'Grammar: ' + g.title, '6 questions · about 3 minutes')}
        ${step(2, 'writing', '#/writing/' + w.id, 'Writing: ' + w.title, 'One prompt · about 6 minutes')}
        ${step(3, 'speaking', '#/speaking/' + sp.id, 'Speaking: ' + sp.title, `${mmss(sp.secs)} of speaking · focus on ${sp.focus.toLowerCase()}`)}
      </ol>
      ${S.missed.length ? `<p><a href="#/grammar/weak">Review your ${S.missed.length} weak-spot question${S.missed.length > 1 ? 's' : ''} →</a></p>` : ''}
      <h2>Fillers per minute</h2>
      ${recent.length ? `<p class="muted small">Your last ${recent.length} speaking session${recent.length > 1 ? 's' : ''}, oldest first. Lower is better; under 1 is excellent.</p>
        <div class="bars" role="img" aria-label="Fillers per minute: ${recent.map(r => r.fpm).join(', ')}">${recent.map(r => `<div style="height:${Math.max(4, 100 * r.fpm / max)}%" title="${esc(r.date)} · ${r.fpm} per minute"></div>`).join('')}</div>
        <p class="small muted">Latest: <b>${recent.at(-1).fpm}</b> per minute at ${recent.at(-1).wpm} words per minute.</p>`
        : '<p class="muted">No speaking sessions yet. Your trend appears here after the first one.</p>'}
      <h2>How to use this</h2>
      <div class="principles">
        <div><b>Learn the rule</b><span>Each section opens with the few principles that matter, plus a before-and-after example.</span></div>
        <div><b>Drill it</b><span>Short, repeatable exercises. Missed grammar questions come back as weak spots.</span></div>
        <div><b>Get coached</b><span>Send any draft or transcript to Claude Code for feedback and custom drills. See <a href="#/coach">Claude coach</a>.</span></div>
      </div>`;
  }

  // ---------- Grammar ----------
  function grammar(id) {
    if (id === 'weak') return weak();
    const t = GRAMMAR.find(x => x.id === id);
    if (!t) {
      main.innerHTML = `<h1>Grammar</h1><p class="lead">Ten topics that cause most everyday errors. Each has one rule to remember and six questions. Aim for 100% on every topic.</p>
        ${S.missed.length ? `<div class="grid"><a class="card" href="#/grammar/weak" style="border-color:var(--warn)"><h3>Weak spots</h3><p>Replay the ${S.missed.length} question${S.missed.length > 1 ? 's' : ''} you last got wrong.</p><div class="meta"><span class="pill warn">${S.missed.length} to fix</span></div></a></div>` : ''}
        <div class="grid">${GRAMMAR.map(t => { const r = S.grammar[t.id]; return `<a class="card" href="#/grammar/${t.id}"><h3>${t.title}</h3><p>${t.blurb}</p><div class="meta">${r ? `<span class="pill ${r.best === 100 ? 'good' : 'warn'}">Best ${r.best}%</span><span>${r.tries} attempt${r.tries > 1 ? 's' : ''}</span>` : '<span class="pill">Not started</span>'}</div></a>`; }).join('')}</div>
        <p class="muted small">Want harder or more personal questions? Run <code>/grammar-drill</code> in Claude Code — see <a href="#/coach">Claude coach</a>.</p>`;
      return;
    }
    main.innerHTML = `<a class="back" href="#/grammar">← All grammar topics</a><h1>${t.title}</h1>
      <div class="rule"><p class="eyebrow">The rule</p><p>${t.rule}</p><ul>${t.ex.map(e => `<li>${e}</li>`).join('')}</ul></div>
      <div id="q"></div>`;
    quiz(main.querySelector('#q'), t.questions, (right, total) => {
      const pct = Math.round(100 * right / total), r = S.grammar[t.id] ||= { best: 0, tries: 0 };
      r.best = Math.max(r.best, pct); r.tries++; r.last = pct; save();
    }, 'grammar');
  }
  function weak() {
    const qs = shuffle(S.missed.map(id => QS[id]).filter(Boolean)).slice(0, 10);
    main.innerHTML = `<a class="back" href="#/grammar">← All grammar topics</a><h1>Weak spots</h1>
      <p class="lead">${qs.length ? 'Questions you last answered wrong. Get one right and it leaves this list.' : 'Nothing here. Every question you have tried, you last answered correctly.'}</p><div id="q"></div>`;
    if (qs.length) quiz(main.querySelector('#q'), qs, null, 'grammar');
  }

  // ---------- Writing ----------
  const wordyRe = Object.keys(WORDY).sort((a, b) => b.length - a.length).join('|');
  const flagRe = new RegExp(`\\b(?:(?<w>${wordyRe})|(?<p>(?:am|is|are|was|were|be|been|being)\\s+(?:\\w+ly\\s+)?(?:\\w{3,}ed|done|made|given|taken|written|seen|known|held|sent|shown|found|told|kept|built|paid|sold|brought|chosen|broken|spoken))|(?<h>${HEDGES.join('|')}))\\b`, 'gi');

  function analyse(text) {
    const norm = text.replace(/[’‘]/g, "'");
    const words = (norm.match(/[A-Za-z0-9'-]+/g) || []).length;
    const sents = norm.split(/[.!?]+(?:\s|$)/).map(s => s.trim()).filter(Boolean);
    const lens = sents.map(s => (s.match(/[A-Za-z0-9'-]+/g) || []).length);
    const count = { w: 0, p: 0, h: 0 }; let html = '', at = 0;
    for (const m of norm.matchAll(flagRe)) {
      const k = m.groups.w ? 'w' : m.groups.p ? 'p' : 'h'; count[k]++;
      const tip = k === 'w' ? `Wordy. Try: ${WORDY[m[0].toLowerCase()]}` : k === 'p' ? 'Possibly passive. Who is doing this?' : 'Hedge or filler. Does the sentence need it?';
      html += esc(text.slice(at, m.index)) + `<mark class="${k}" title="${esc(tip)}">${esc(text.slice(m.index, m.index + m[0].length))}</mark>`;
      at = m.index + m[0].length;
    }
    html += esc(text.slice(at));
    return { words, sentences: sents.length, avg: sents.length ? Math.round(words / sents.length) : 0, longest: Math.max(0, ...lens), long: lens.filter(n => n > 28).length, count, html };
  }

  function writing(id) {
    const m = WRITING.find(x => x.id === id);
    if (!m) {
      main.innerHTML = `<h1>Writing</h1><p class="lead">A piece of writing has three jobs: open so people keep reading, build a body they believe, and end so they remember or act. Practise each part on its own, then tighten every sentence.</p>
        <div class="grid">${WRITING.map(m => { const n = S.writing.filter(d => d.module === m.id).length; return `<a class="card" href="#/writing/${m.id}"><h3>${m.title}</h3><p>${m.blurb}</p><div class="meta">${n ? `<span class="pill good">${n} saved</span>` : '<span class="pill">Not started</span>'}<span>${m.prompts.length} prompts</span></div></a>`; }).join('')}</div>`;
      return;
    }
    let prompt = pick(m.prompts);
    const P = p => typeof p === 'string' ? p : p.t;
    main.innerHTML = `<a class="back" href="#/writing">← All writing sections</a><h1>${m.title}</h1><p class="lead">${m.lead}</p>
      <div class="principles">${m.principles.map(p => `<div><b>${p[0]}</b><span>${p[1]}</span></div>`).join('')}</div>
      <div class="ba"><div class="b"><small>Before</small>${m.before}</div><div class="a"><small>After</small>${m.after}</div></div>
      <h2>Drill 1 · Spot the stronger version</h2><div id="q"></div>
      <h2>Drill 2 · Write it yourself</h2>
      <div class="prompt"><p class="eyebrow">Your prompt</p><span id="pt"></span></div>
      <div class="row"><button class="btn" id="np">Different prompt</button><span class="muted small" id="tm"></span></div>
      <label class="small muted" for="tx">Your draft</label>
      <textarea class="write" id="tx" placeholder="Write here. Do not edit while drafting — get it down, then tighten."></textarea>
      <div class="chips" id="st"></div>
      <div class="row"><button class="btn primary" id="ck">Check my draft</button><button class="btn" id="sv">Save</button><button class="btn" id="cp">Copy for Claude Code</button><button class="btn" id="dl">Download .md</button></div>
      <div id="rv"></div>
      <h2>Your saved drafts</h2><div id="hist"></div>`;
    quiz(main.querySelector('#q'), m.questions);
    const $ = s => main.querySelector(s), tx = $('#tx');
    let t0 = null;
    const setPrompt = () => { $('#pt').textContent = P(prompt); tx.value = ''; $('#rv').innerHTML = ''; t0 = null; stats(); };
    const stats = () => { const a = analyse(tx.value); $('#st').innerHTML = `<span>${a.words} words</span><span>${a.sentences} sentence${a.sentences === 1 ? '' : 's'}</span><span>avg ${a.avg} words/sentence</span>`; };
    tx.oninput = () => { t0 ??= Date.now(); stats(); };
    $('#np').onclick = () => { prompt = pick(m.prompts, prompt); setPrompt(); };
    const md = () => `# Writing drill — ${m.title}\n- Date: ${stamp()}\n- Prompt: ${P(prompt)}\n\n## My draft\n${tx.value.trim()}\n`;
    const need = () => tx.value.trim() ? true : (toast('Write something first'), false);
    $('#ck').onclick = () => {
      if (!need()) return;
      const a = analyse(tx.value);
      $('#rv').innerHTML = `<div class="review">${a.html}</div>
        <div class="legend"><span><mark class="w">wordy</mark> ${a.count.w}</span><span><mark class="h">hedge / filler</mark> ${a.count.h}</span><span><mark class="p">possibly passive</mark> ${a.count.p}</span><span>longest sentence: ${a.longest} words${a.long ? ` (${a.long} over 28 — consider splitting)` : ''}</span></div>
        <p class="small muted">Hover a highlight for a suggestion. These are prompts to think, not errors — keep a flagged word if it earns its place.</p>
        ${prompt.model ? `<details><summary>Compare with a model answer</summary><div class="model">${esc(prompt.model)}</div></details>` : ''}
        <h3 style="margin-top:1.2em">Self-check</h3>
        <ul class="checks">${m.checklist.map(c => `<li><label><input type="checkbox"> <span>${c}</span></label></li>`).join('')}</ul>
        <p class="small muted">For feedback on meaning, structure, and grammar, press <b>Copy for Claude Code</b> and paste it into your terminal.</p>`;
      touch('writing');
    };
    $('#sv').onclick = () => {
      if (!need()) return;
      S.writing.push({ date: stamp(), module: m.id, prompt: P(prompt), text: tx.value.trim(), words: analyse(tx.value).words, secs: t0 ? Math.round((Date.now() - t0) / 1000) : 0 });
      touch('writing'); hist(); toast('Saved');
    };
    $('#cp').onclick = () => need() && copy('/write-coach\n\n' + md());
    $('#dl').onclick = () => need() && download(`writing-${m.id}-${dayKey()}.md`, md());
    const hist = () => {
      const list = S.writing.map((d, i) => ({ ...d, i })).filter(d => d.module === m.id).reverse().slice(0, 8);
      $('#hist').innerHTML = list.length ? list.map(d => `<details><summary>${esc(d.date)} · ${d.words} words</summary><p class="small muted">${esc(d.prompt)}</p><div class="review">${esc(d.text)}</div><button class="btn danger" data-del="${d.i}">Delete</button></details>`).join('') : '<p class="muted">Nothing saved yet.</p>';
      $('#hist').querySelectorAll('[data-del]').forEach(b => b.onclick = () => { S.writing.splice(+b.dataset.del, 1); save(); hist(); });
    };
    setPrompt(); hist();
  }

  // ---------- Speaking ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let session = null; // the live recording, if any
  function endSession() { session?.cleanup(); session = null; }

  function fillers(text) {
    const by = []; let total = 0;
    for (const [label, re, soft] of FILLERS) {
      const n = (text.match(re) || []).length;
      if (n) { by.push({ label, n, soft: !!soft }); total += n; }
    }
    return { total, by: by.sort((a, b) => b.n - a.n) };
  }
  const passageHtml = p => esc(p).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/ \/\/ /g, ' <span class="pz">‖</span><br>').replace(/ \/ /g, ' <span class="pz">|</span> ');
  const passageText = p => p.replace(/\*\*/g, '').replace(/ \/\/? /g, ' ');

  function speaking(id) {
    const d = SPEAKING.find(x => x.id === id);
    if (!d) {
      main.innerHTML = `<h1>Speaking</h1><p class="lead">Record yourself, see your pace and filler words, listen back, then send the transcript to Claude Code for coaching. Speaking improves only by speaking — out loud, on a timer, every day.</p>
        <div class="rule"><p class="eyebrow">Five habits of clear speakers</p><ul style="color:inherit">
          <li><b>Pause instead of filling.</b> Silence sounds confident; “um” does not. Close your mouth between sentences.</li>
          <li><b>Answer first.</b> Give your conclusion in the first sentence, then your reasons.</li>
          <li><b>Use a structure.</b> PREP, STAR, or What? So what? Now what? — so you always know what comes next.</li>
          <li><b>Slow down.</b> Aim for 130–160 words per minute, in short sentences.</li>
          <li><b>Record and review.</b> You cannot fix what you do not hear. Listen to every recording once.</li></ul></div>
        <div class="grid">${SPEAKING.map(d => { const n = S.speaking.filter(r => r.drill === d.id).length; return `<a class="card" href="#/speaking/${d.id}"><h3>${d.title}</h3><p>${d.goal}</p><div class="meta"><span class="pill accent">${d.focus}</span><span>${mmss(d.secs)}</span>${n ? `<span>· ${n} done</span>` : ''}</div></a>`; }).join('')}</div>
        <h2>Session history</h2>${historyTable()}`;
      return;
    }
    let prompt = pick(d.pool);
    main.innerHTML = `<a class="back" href="#/speaking">← All speaking drills</a><h1>${d.title}</h1><p class="lead">${d.goal}</p>
      <div class="rule"><p class="eyebrow">How to do it</p><ul>${d.how.map(h => `<li>${h}</li>`).join('')}</ul></div>
      <div class="prompt"><p class="eyebrow">${d.passage ? 'Read this aloud' : 'Your prompt'}</p><span id="pt"></span></div>
      <div class="row"><button class="btn" id="np">Different ${d.passage ? 'passage' : 'prompt'}</button></div>
      <div class="stage" id="stage">
        <div class="clock" id="clock">${mmss(d.secs)}</div>
        <div class="track"><i id="bar"></i></div>
        <div class="row" style="justify-content:center">
          <button class="btn primary big" id="go">Start speaking</button>
          <button class="tap" id="tap" hidden>I said a filler · <span id="taps">0</span></button>
        </div>
        <p class="small muted" id="hint">Take a few seconds to think first. The clock starts when you press Start.</p>
        <div class="live-text" id="live" hidden></div>
      </div>
      ${SR ? '' : '<div class="note">Live transcription is not available in this browser (it works in Chrome, Edge, and Safari). You can still record, listen back, and type or paste what you said.</div>'}
      <div id="out"></div>`;
    const $ = s => main.querySelector(s);
    const showPrompt = () => { $('#pt').innerHTML = d.passage ? passageHtml(prompt) : esc(d.prefix + prompt); };
    const promptText = () => d.passage ? passageText(prompt) : d.prefix + prompt;
    showPrompt();
    $('#np').onclick = () => { if (session) return; prompt = pick(d.pool, prompt); showPrompt(); $('#out').innerHTML = ''; };

    $('#go').onclick = () => session ? session.stop() : start();

    async function start() {
      const st = { on: true, taps: 0, final: '', interim: '', chunks: [], url: null };
      session = st;
      $('#out').innerHTML = ''; $('#go').disabled = true;
      try {
        st.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        st.rec = new MediaRecorder(st.stream);
        st.rec.ondataavailable = e => e.data.size && st.chunks.push(e.data);
        st.rec.start();
      } catch { $('#hint').textContent = 'Microphone unavailable — the timer still runs, and you can type what you said afterwards.'; }
      if (session !== st) { st.stream?.getTracks().forEach(t => t.stop()); return; } // navigated away while asking for the mic
      if (SR) {
        const r = st.sr = new SR(); r.continuous = true; r.interimResults = true; r.lang = 'en-US';
        r.onresult = e => {
          let interim = '';
          for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) st.final += t.trim() + ' '; else interim += t; }
          st.interim = interim; $('#live').textContent = st.final + interim;
        };
        r.onend = () => { if (st.on) { st.final += st.interim ? st.interim.trim() + ' ' : ''; st.interim = ''; try { r.start(); } catch { /* already running */ } } };
        r.onerror = () => {};
        try { r.start(); } catch { /* ignore */ }
      }
      st.t0 = Date.now();
      $('#go').disabled = false; $('#go').textContent = 'Stop';
      $('#stage').classList.add('live'); $('#tap').hidden = false; $('#taps').textContent = '0';
      $('#live').hidden = !SR; $('#live').textContent = SR ? 'Listening…' : '';
      $('#hint').textContent = 'Press Space (or the dashed button) every time you catch a filler.';
      const tap = () => { st.taps++; $('#taps').textContent = st.taps; };
      $('#tap').onclick = tap;
      st.key = e => { if (e.code === 'Space' && !/TEXTAREA|INPUT/.test(e.target.tagName)) { e.preventDefault(); tap(); } };
      document.addEventListener('keydown', st.key);
      st.timer = setInterval(() => {
        const el = (Date.now() - st.t0) / 1000, left = Math.max(0, d.secs - el);
        $('#clock').textContent = mmss(Math.ceil(left)); $('#bar').style.width = Math.min(100, 100 * el / d.secs) + '%';
        if (left <= 0) st.stop();
      }, 200);
      st.cleanup = () => {
        st.on = false; clearInterval(st.timer); document.removeEventListener('keydown', st.key);
        try { st.sr?.stop(); } catch { /* ignore */ }
        try { if (st.rec?.state !== 'inactive') st.rec?.stop(); } catch { /* ignore */ }
        st.stream?.getTracks().forEach(t => t.stop());
      };
      st.stop = () => {
        if (!st.on) return;
        const secs = Math.max(1, Math.round((Date.now() - st.t0) / 1000));
        const audio = st.rec && st.rec.state !== 'inactive' ? new Promise(res => { st.rec.onstop = () => res(st.chunks.length ? URL.createObjectURL(new Blob(st.chunks, { type: st.rec.mimeType })) : null); }) : Promise.resolve(null);
        st.cleanup(); session = null;
        $('#go').textContent = 'Start again'; $('#stage').classList.remove('live'); $('#tap').hidden = true; $('#live').hidden = true;
        $('#clock').textContent = mmss(d.secs); $('#bar').style.width = '0';
        $('#hint').textContent = 'Review your session below, or go again.';
        // give the recogniser a moment to deliver its last words
        setTimeout(async () => results(secs, st.taps, (st.final + st.interim).trim(), await audio), 600);
      };
    }

    function results(secs, taps, transcript, audioUrl) {
      const out = $('#out');
      if (!out) return;
      out.innerHTML = `<h2>Your session</h2>
        ${audioUrl ? `<p class="small muted">Listen back once before you read anything. Where did you rush? Where did a pause work?</p><audio controls src="${audioUrl}"></audio>` : ''}
        <label class="small muted" for="tr">Transcript — ${transcript ? 'correct anything the browser misheard, and add back any “um”s it removed' : 'type or paste what you said'}</label>
        <textarea id="tr" rows="6">${esc(transcript)}</textarea>
        <div class="stats" id="ss"></div><div id="fl"></div>
        ${SR ? '<p class="small muted">Browsers often clean “um” and “uh” out of transcripts, so trust the larger of the two filler counts.</p>' : ''}
        <label class="small muted" for="nt">One thing to do better next time</label>
        <input type="text" id="nt" placeholder="e.g. pause after my first sentence">
        <div class="row"><button class="btn primary" id="sv">Save session</button><button class="btn" id="cp">Copy for Claude Code</button><button class="btn" id="dl">Download .md</button></div>`;
      const tr = $('#tr');
      const calc = () => {
        const words = (tr.value.match(/[A-Za-z0-9'’-]+/g) || []).length, f = fillers(tr.value);
        const count = Math.max(f.total, taps);
        return { words, f, wpm: Math.round(words / secs * 60), fpm: Math.round(count / secs * 600) / 10, count };
      };
      const paint = () => {
        const c = calc(), paceOk = c.wpm >= 120 && c.wpm <= 170;
        $('#ss').innerHTML = `<div class="stat"><b>${mmss(secs)}</b><span>spoken</span></div>
          <div class="stat"><b>${c.words ? c.wpm : '–'}</b><span>words per minute ${c.words ? (paceOk ? '· good pace' : c.wpm < 120 ? '· a little slow' : '· slow down') : ''}</span></div>
          <div class="stat"><b>${c.f.total}</b><span>fillers in transcript</span></div>
          <div class="stat"><b>${taps}</b><span>fillers you caught</span></div>
          <div class="stat"><b>${c.fpm}</b><span>fillers per minute</span></div>`;
        $('#fl').innerHTML = c.f.by.length ? `<div class="chips">${c.f.by.map(x => `<span>${esc(x.label)} × ${x.n}${x.soft ? ' <span class="muted">(check context)</span>' : ''}</span>`).join('')}</div>` : (c.words ? '<p class="small"><span class="pill good">No fillers found in the transcript</span></p>' : '');
      };
      tr.oninput = paint; paint();
      const md = () => {
        const c = calc();
        return `# Speaking session — ${d.title}\n- Date: ${stamp()}\n- Drill goal: ${d.goal}\n- Prompt: ${promptText()}\n- Duration: ${secs}s of ${d.secs}s\n- Words: ${c.words} (${c.wpm} wpm)\n- Fillers found in transcript: ${c.f.total}${c.f.by.length ? ' (' + c.f.by.map(x => `${x.label} ×${x.n}`).join(', ') + ')' : ''}\n- Fillers I caught myself while speaking: ${taps}\n- My note: ${$('#nt').value.trim() || '—'}\n\n## Transcript${SR ? ' (browser speech-to-text; may have dropped ums)' : ''}\n${tr.value.trim() || '(none)'}\n`;
      };
      $('#sv').onclick = () => {
        const c = calc();
        S.speaking.push({ date: stamp(), drill: d.id, prompt: promptText().slice(0, 120), secs, words: c.words, wpm: c.wpm, fillers: c.f.total, taps, fpm: c.fpm, note: $('#nt').value.trim(), transcript: tr.value.trim() });
        touch('speaking'); $('#sv').disabled = true; $('#sv').textContent = 'Saved'; toast('Session saved');
      };
      $('#cp').onclick = () => copy('/speak-coach\n\n' + md());
      $('#dl').onclick = () => download(`speaking-${d.id}-${dayKey()}.md`, md());
      out.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function historyTable() {
    if (!S.speaking.length) return '<p class="muted">No sessions yet.</p>';
    const name = id => SPEAKING.find(d => d.id === id)?.title || id;
    return `<div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Drill</th><th class="num">Time</th><th class="num">WPM</th><th class="num">Fillers</th><th class="num">Per min</th><th>Note</th></tr></thead><tbody>
      ${S.speaking.slice().reverse().slice(0, 20).map(r => `<tr><td>${esc(r.date)}</td><td>${esc(name(r.drill))}</td><td class="num">${mmss(r.secs)}</td><td class="num">${r.wpm || '–'}</td><td class="num">${Math.max(r.fillers, r.taps)}</td><td class="num">${r.fpm}</td><td>${esc(r.note || '')}</td></tr>`).join('')}
      </tbody></table></div>`;
  }

  // ---------- Claude coach ----------
  function coach() {
    const cmds = [
      ['/speak-coach', 'Paste a transcript from the Speaking page (use “Copy for Claude Code”). Claude counts fillers, checks structure and clarity, shows a tighter version of what you said, and assigns your next drill.'],
      ['/speak-live', 'A live session in the terminal. Claude gives you a prompt, you answer out loud using dictation, and Claude coaches you round by round.'],
      ['/write-coach', 'Paste a draft from the Writing page. Claude reviews the opening, body, and ending, corrects grammar with explanations, and gives you one rewrite task.'],
      ['/grammar-drill', 'Claude quizzes you one question at a time on the grammar you get wrong most, using your own past mistakes.'],
      ['/progress-review', 'Export your progress below, then run this. Claude reads it with your coaching log and plans your next week.'],
    ];
    main.innerHTML = `<h1>Claude coach</h1>
      <p class="lead">This page drills you; Claude Code coaches you. The project includes five coaching commands that give feedback a web page cannot: on meaning, structure, tone, and your personal patterns over time.</p>
      <h2>Set up once</h2>
      <ol class="steps">
        <li>Open a terminal in this project’s folder and run <code>claude</code>.</li>
        <li>Type one of the commands below. They live in <code>.claude/skills/</code>, so Claude Code finds them automatically.</li>
        <li>Claude keeps a coaching log in <code>practice/log.md</code>, so each session builds on the last.</li>
      </ol>
      <h2>Commands</h2>
      ${cmds.map(c => `<div class="cmd"><code>${c[0]}</code><p>${c[1]}</p><button class="btn" data-c="${c[0]}">Copy</button></div>`).join('')}
      <h2>The speaking loop</h2>
      <ol class="steps">
        <li><b>Record</b> a drill on the <a href="#/speaking">Speaking</a> page and tap Space whenever you catch a filler.</li>
        <li><b>Listen back</b> once, and fix the transcript where the browser misheard you.</li>
        <li><b>Copy for Claude Code</b>, paste into your terminal, and press Enter.</li>
        <li><b>Redo the same prompt</b> straight away using Claude’s one focus point. The second attempt is where you improve.</li>
      </ol>
      <p class="muted small">For <code>/speak-live</code>, speak your answers with your operating system’s dictation (macOS: press the microphone key or Fn twice; Windows: Win + H) or Claude Code’s own voice input if your version has it. Dictation tools tend to remove “um” and “uh”, so Claude will also ask how many you noticed.</p>
      <h2>Your data</h2>
      <p>Progress is stored only in this browser. Export it so Claude Code can read it, or to move it to another device.</p>
      <div class="row"><button class="btn primary" id="ex">Export progress for Claude</button><button class="btn" id="im">Import progress</button><button class="btn danger" id="rs">Reset all progress</button><input type="file" id="f" accept="application/json" hidden></div>
      <p class="small muted">Save the exported file as <code>practice/progress.json</code> in this project, then run <code>/progress-review</code>.</p>`;
    main.querySelectorAll('[data-c]').forEach(b => b.onclick = () => copy(b.dataset.c, 'Copied'));
    const $ = s => main.querySelector(s);
    $('#ex').onclick = () => {
      const g = Object.fromEntries(GRAMMAR.map(t => [t.title, S.grammar[t.id] || 'not started']));
      const missed = S.missed.map(id => QS[id]).filter(Boolean).map(q => ({ question: q.q.replace(/<[^>]+>/g, ''), answer: q.opts[q.a] }));
      download('progress.json', JSON.stringify({ exported: stamp(), streak: streak(), grammar: g, grammarMissed: missed, writing: S.writing, speaking: S.speaking, _raw: S }, null, 2), 'application/json');
    };
    $('#im').onclick = () => $('#f').click();
    $('#f').onchange = async e => {
      try { const j = JSON.parse(await e.target.files[0].text()); S = Object.assign(blank(), j._raw || j); save(); toast('Progress imported'); }
      catch { toast('That file could not be read'); }
    };
    $('#rs').onclick = () => { if (confirm('Delete all saved progress, drafts, and speaking sessions from this browser?')) { S = blank(); save(); toast('Progress reset'); } };
  }

  // ---------- router ----------
  const views = { '': home, grammar, writing, speaking, coach };
  function route() {
    endSession();
    const [, view = '', sub] = location.hash.split('/');
    (views[view] || home)(sub);
    document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', a.dataset.v === (views[view] ? view : '')));
    window.scrollTo(0, 0);
  }
  addEventListener('hashchange', route);
  route();
})();
