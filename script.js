/* ============================================================
   ram.sasidhar — portfolio site script
   - boot sequence
   - typed tagline
   - neural-net canvas background
   - scroll reveals + nav state
   - stat counters
   - 3D tilt on project cards
   - live github repos
   - interactive terminal
============================================================ */

(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- boot sequence ----------
  const bootEl = $('#boot');
  const bootText = $('#boot-text');
  const bootLines = [
    '> initializing portfolio.exe ...',
    '> loading modules: [vision] [iot] [analytics] ... ok',
    '> resolving identity: ram.sasidhar ... ok',
    '> system ready. welcome.',
  ];

  async function runBoot() {
    if (reducedMotion) {
      bootEl.classList.add('is-done');
      setTimeout(() => bootEl.remove(), 700);
      return;
    }
    for (const line of bootLines) {
      await typeInto(bootText, line + '\n', 18);
      await sleep(120);
    }
    await sleep(350);
    bootEl.classList.add('is-done');
    setTimeout(() => bootEl.remove(), 700);
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  async function typeInto(el, str, perChar = 25) {
    for (const ch of str) {
      el.textContent += ch;
      await sleep(perChar);
    }
  }

  // ---------- typed hero tagline ----------
  const phrases = [
    'building real-time ML systems.',
    'AI intern @ AyuhTech · on the Southern Railways Kavach rollout.',
    'wiring sensors that wake up when something moves.',
    'shipping vision models that run on factory gates.',
    'turning live data streams into something useful.',
    'final-year M.Tech CS @ VIT Chennai · Class of 2027.',
  ];
  const typedEl = $('#typed');

  async function typeLoop() {
    if (reducedMotion) {
      typedEl.textContent = phrases[0];
      return;
    }
    let i = 0;
    while (true) {
      const phrase = phrases[i % phrases.length];
      for (let k = 1; k <= phrase.length; k++) {
        typedEl.textContent = phrase.slice(0, k);
        await sleep(38);
      }
      await sleep(1800);
      for (let k = phrase.length; k >= 0; k--) {
        typedEl.textContent = phrase.slice(0, k);
        await sleep(18);
      }
      await sleep(200);
      i++;
    }
  }

  // ---------- year ----------
  $('#year').textContent = new Date().getFullYear();

  // ---------- nav scroll state + progress + scroll-spy ----------
  const nav = $('#nav');
  const progressBar = $('#scroll-progress');
  const navLinkEls = $$('#nav-links a');
  const spyTargets = navLinkEls
    .map(a => ({ link: a, sec: document.querySelector(a.getAttribute('href')) }))
    .filter(t => t.sec);

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 30);

    // progress bar
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (y / docH) * 100 : 0;
    progressBar.style.width = pct + '%';

    // scroll-spy: highlight the section nearest the top third of the viewport
    const line = y + window.innerHeight * 0.3;
    let active = spyTargets[0];
    for (const t of spyTargets) {
      if (t.sec.offsetTop <= line) active = t;
    }
    navLinkEls.forEach(a => a.classList.toggle('is-active', active && a === active.link));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- mobile nav toggle ----------
  const navToggle = $('#nav-toggle');
  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinkEls.forEach(a => a.addEventListener('click', closeNav));

  // ---------- scroll-reveal ----------
  const revealTargets = $$('.stat, .about-card, .tl-item, .proj-card, .skill-group, .edu-card, .cert, .repo-card, .contact-card, .section-head');
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
          if (entry.target.classList.contains('stat')) {
            animateCounter(entry.target);
          }
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
    $$('.stat').forEach(animateCounter);
  }

  // ---------- stat counters ----------
  function animateCounter(statEl) {
    const target = parseFloat(statEl.dataset.target);
    const counterEl = statEl.querySelector('.counter');
    if (!target || !counterEl) return;
    const dur = 1500;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.floor(eased * target);
      counterEl.textContent = val;
      if (t < 1) requestAnimationFrame(step);
      else counterEl.textContent = target;
    }
    requestAnimationFrame(step);
  }

  // ---------- 3D tilt on project cards ----------
  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    $$('[data-tilt]').forEach(card => {
      let rafId = null;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -6;
        const ry = (px - 0.5) * 6;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        });
      });
      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = '';
      });
    });
  }

  // ---------- neural-net canvas background ----------
  const canvas = $('#bg-canvas');
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let mouse = { x: -1000, y: -1000 };
  let raf = null;

  function setupCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initNodes();
  }
  function initNodes() {
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.3 + 0.4,
    }));
  }
  function drawFrame() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // update + draw nodes
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > window.innerWidth)  n.vx *= -1;
      if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34,211,238,0.55)';
      ctx.fill();
    }
    // links
    const maxDist = 120;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < maxDist * maxDist) {
          const alpha = 1 - Math.sqrt(d2) / maxDist;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167,139,250,${alpha * 0.22})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // mouse links
      const dx = nodes[i].x - mouse.x, dy = nodes[i].y - mouse.y;
      const d2 = dx * dx + dy * dy;
      const mDist = 160;
      if (d2 < mDist * mDist) {
        const alpha = 1 - Math.sqrt(d2) / mDist;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34,211,238,${alpha * 0.5})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
    raf = requestAnimationFrame(drawFrame);
  }
  function startCanvas() {
    if (reducedMotion) {
      // draw a single static frame so the bg isn't blank
      setupCanvas();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,211,238,0.4)';
        ctx.fill();
      }
      return;
    }
    setupCanvas();
    raf = requestAnimationFrame(drawFrame);
  }
  window.addEventListener('resize', () => {
    if (raf) cancelAnimationFrame(raf);
    setupCanvas();
    if (!reducedMotion) raf = requestAnimationFrame(drawFrame);
  });
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  // Pause canvas when tab hidden, to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf); raf = null;
    } else if (!document.hidden && !raf && !reducedMotion) {
      raf = requestAnimationFrame(drawFrame);
    }
  });

  // ---------- live github repos ----------
  const repoGrid = $('#repo-grid');
  const LANG_COLORS = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    'Jupyter Notebook': '#DA5B0B',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    TeX: '#3D6117',
    Shell: '#89e051',
    C: '#555555',
    'C++': '#f34b7d',
  };

  async function loadRepos() {
    try {
      const res = await fetch('https://api.github.com/users/ram-sasidhar/repos?per_page=20&sort=updated');
      if (!res.ok) throw new Error('GitHub API: ' + res.status);
      const data = await res.json();
      const filtered = data
        .filter(r => !r.archived)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);
      renderRepos(filtered);
    } catch (err) {
      repoGrid.innerHTML = `
        <div class="repo-card" style="grid-column: 1 / -1;">
          <p class="repo-desc">Couldn't load repos live (${err.message}).
          See them directly at <a href="https://github.com/ram-sasidhar" target="_blank" rel="noopener" style="color: var(--primary)">github.com/ram-sasidhar</a>.</p>
        </div>`;
    }
  }

  function renderRepos(repos) {
    if (!repos.length) {
      repoGrid.innerHTML = `<p class="section-lede">No public repos yet — coming soon.</p>`;
      return;
    }
    repoGrid.innerHTML = repos.map(r => {
      const langColor = LANG_COLORS[r.language] || '#94a3b8';
      const desc = r.description || 'No description provided.';
      const updated = new Date(r.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return `
        <a class="repo-card reveal is-visible" href="${r.html_url}" target="_blank" rel="noopener">
          <h3 class="repo-name">
            ${escapeHtml(r.name)}
            ${r.fork ? '<span class="repo-fork-icon">fork</span>' : ''}
          </h3>
          <p class="repo-desc">${escapeHtml(desc)}</p>
          <div class="repo-meta">
            ${r.language ? `<span class="repo-lang"><span class="repo-lang-dot" style="background:${langColor}"></span>${r.language}</span>` : ''}
            <span>★ ${r.stargazers_count}</span>
            <span>updated ${updated}</span>
          </div>
        </a>`;
    }).join('');
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // ---------- interactive terminal ----------
  const term      = $('#terminal');
  const termBody  = $('#term-body');
  const termForm  = $('#term-form');
  const termInput = $('#term-input');
  const openBtn   = $('#open-terminal');
  const hintBtn   = $('#hint-terminal');
  const closeBtn  = $('#close-terminal');

  const history = [];
  let histIdx = -1;
  let hasGreeted = false;

  function openTerm() {
    term.hidden = false;
    if (!hasGreeted) {
      printLines([
        { text: 'ram@portfolio v1.0 — interactive shell', cls: 'term-line-acc' },
        { text: "type 'help' to see what I can do.", cls: '' },
        { text: '' },
      ]);
      hasGreeted = true;
    }
    setTimeout(() => termInput.focus(), 30);
  }
  function closeTerm() { term.hidden = true; }

  openBtn.addEventListener('click', openTerm);
  hintBtn.addEventListener('click', openTerm);
  closeBtn.addEventListener('click', closeTerm);

  // backtick toggle, ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === '`' && document.activeElement !== termInput) {
      e.preventDefault();
      term.hidden ? openTerm() : closeTerm();
    } else if (e.key === 'Escape' && !term.hidden) {
      closeTerm();
    }
  });

  function printLines(lines) {
    for (const line of lines) {
      const p = document.createElement('p');
      if (line.cls) p.className = line.cls;
      p.textContent = line.text;
      termBody.appendChild(p);
    }
    termBody.scrollTop = termBody.scrollHeight;
  }

  function printRaw(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    termBody.appendChild(div);
    termBody.scrollTop = termBody.scrollHeight;
  }

  termForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = termInput.value.trim();
    if (!raw) return;
    history.push(raw);
    histIdx = history.length;
    printRaw(`<p><span class="term-line-cmd">guest@ram:~$</span> ${escapeHtml(raw)}</p>`);
    runCommand(raw);
    termInput.value = '';
  });

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx > 0) histIdx--;
      termInput.value = history[histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        histIdx++;
        termInput.value = history[histIdx] || '';
      } else {
        histIdx = history.length;
        termInput.value = '';
      }
    }
  });

  // command implementations
  const commands = {
    help() {
      printRaw(`
        <p><span class="term-line-acc">available commands:</span></p>
        <p>  <span class="term-line-cmd">help</span>       this list</p>
        <p>  <span class="term-line-cmd">about</span>      who I am, short version</p>
        <p>  <span class="term-line-cmd">now</span>        what I'm working on right now</p>
        <p>  <span class="term-line-cmd">skills</span>     full skill matrix</p>
        <p>  <span class="term-line-cmd">projects</span>   project list</p>
        <p>  <span class="term-line-cmd">experience</span> internship history</p>
        <p>  <span class="term-line-cmd">education</span>  schooling + cgpa</p>
        <p>  <span class="term-line-cmd">contact</span>    how to reach me</p>
        <p>  <span class="term-line-cmd">socials</span>    linkedin / github</p>
        <p>  <span class="term-line-cmd">resume</span>     where to view the PDF</p>
        <p>  <span class="term-line-cmd">goto &lt;section&gt;</span> scroll to a section (e.g. goto projects)</p>
        <p>  <span class="term-line-cmd">theme</span>      site looks (it's all good · cyan/violet)</p>
        <p>  <span class="term-line-cmd">whoami</span>     guest</p>
        <p>  <span class="term-line-cmd">date</span>       current time</p>
        <p>  <span class="term-line-cmd">clear</span>      clear screen</p>
        <p>  <span class="term-line-cmd">sudo</span>       try it.</p>
        <p>&nbsp;</p>
      `);
    },
    about() {
      printRaw(`
        <p>Ram Sasidhar Putcha · born Detroit, MI · based Chennai, IN</p>
        <p>Integrated M.Tech CS @ VIT Chennai (2022–2027, final year) · CGPA 8.60</p>
        <p>Focus: business analytics · computer vision · embedded IoT · real-time data.</p>
        <p>Now: AI intern @ AyuhTech (Southern Railways Kavach tracking app).</p>
        <p>Recently: IEEE ICCCNT 2025 publication on multi-modal road monitoring.</p>
        <p>&nbsp;</p>
      `);
    },
    now() {
      printRaw(`
        <p><span class="term-line-acc">currently</span> · AI intern @ AyuhTech (since May 2025)</p>
        <p>building a real-time tracking app for <span class="term-line-ok">Southern Railways</span> — Kavach rollout</p>
        <p>stack · next.js · typescript · react · tailwind · mongodb atlas</p>
        <p>&nbsp;</p>
      `);
    },
    skills() {
      printRaw(`
        <p><span class="term-line-acc">languages</span>  python, c, c++, java, javascript, typescript, sql, bash, r, html, css</p>
        <p><span class="term-line-acc">ml/data</span>    pytorch, tensorflow, keras, sklearn, opencv, yolov8, pandas, numpy, streamlit</p>
        <p><span class="term-line-acc">web</span>        react, next.js, tailwind, node.js</p>
        <p><span class="term-line-acc">cloud</span>      firebase, gcp document ai, databricks</p>
        <p><span class="term-line-acc">data</span>       mysql, neo4j, mongodb atlas</p>
        <p><span class="term-line-acc">embedded</span>   arduino, esp32, esp-now</p>
        <p><span class="term-line-acc">tools</span>      git, figma</p>
        <p><span class="term-line-acc">viz</span>        power bi, tableau</p>
        <p><span class="term-line-acc">concepts</span>   cv, dl, nlp, eda, transfer learning, embedded iot</p>
        <p>&nbsp;</p>
      `);
    },
    projects() {
      printRaw(`
        <p><span class="term-line-acc">1.</span> Multi-Modal Road Condition Monitoring   <span class="term-line-ok">[IEEE ICCCNT 2025]</span></p>
        <p><span class="term-line-acc">2.</span> IoT Smart Safety Helmet (ESP32 + ESP-NOW)</p>
        <p><span class="term-line-acc">3.</span> Live YouTube Comment Emotion Analysis (LLM streaming)</p>
        <p><span class="term-line-acc">4.</span> Intelligent OBD Vehicle Tracker (BT telemetry)</p>
        <p><span class="term-line-acc">5.</span> RINL PPE Detection — YOLOv8, 91% acc, production-deployed</p>
        <p>type <span class="term-line-cmd">goto projects</span> to scroll there.</p>
        <p>&nbsp;</p>
      `);
    },
    experience() {
      printRaw(`
        <p><span class="term-line-acc">May 2025-now</span> · AI Intern · AyuhTech <span class="term-line-ok">[current]</span></p>
        <p><span class="term-line-acc">Jun-Jul 2025</span> · ML Intern · Vizag Steel Plant (RINL)</p>
        <p><span class="term-line-acc">Jul-Oct 2024</span> · UI/UX Design Intern · 3F</p>
        <p><span class="term-line-acc">May-Jul 2024</span> · AI/ML Intern · Winfo Solutions, Hyderabad</p>
        <p>&nbsp;</p>
      `);
    },
    education() {
      printRaw(`
        <p>Integrated M.Tech, CSE (Business Analytics) · VIT Chennai · 2022-2027 · CGPA <span class="term-line-ok">8.60</span></p>
        <p>XII CBSE · Chettinad Vidyashram · 2022 · <span class="term-line-ok">85.2%</span></p>
        <p>X  CBSE · Hindu Sr Sec School · 2020 · <span class="term-line-ok">93%</span></p>
        <p>&nbsp;</p>
      `);
    },
    contact() {
      printRaw(`
        <p>Email · <a href="mailto:putcharamsasidhar@gmail.com" style="color: var(--primary)">putcharamsasidhar@gmail.com</a></p>
        <p>Or reach out on LinkedIn / GitHub (see <span class="term-line-cmd">socials</span>).</p>
        <p>&nbsp;</p>
      `);
    },
    socials() {
      printRaw(`
        <p>LinkedIn · <a href="https://linkedin.com/in/ram-sasidhar" target="_blank" rel="noopener" style="color: var(--primary)">/in/ram-sasidhar</a></p>
        <p>GitHub   · <a href="https://github.com/ram-sasidhar" target="_blank" rel="noopener" style="color: var(--primary)">@ram-sasidhar</a></p>
        <p>&nbsp;</p>
      `);
    },
    resume() {
      printRaw(`
        <p>Full PDF · <a href="ResumeUpdated.pdf" target="_blank" rel="noopener" style="color: var(--primary)">ResumeUpdated.pdf</a> (also the résumé button in the nav).</p>
        <p>Everything in it is also reflected in the sections above.</p>
        <p>&nbsp;</p>
      `);
    },
    goto(args) {
      const target = (args[0] || '').toLowerCase();
      const valid = ['about','experience','projects','skills','repos','education','contact'];
      if (!valid.includes(target)) {
        printLines([{ text: `usage: goto <${valid.join('|')}>`, cls: 'term-line-err' }, { text: '' }]);
        return;
      }
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      printLines([{ text: `→ scrolling to #${target}`, cls: 'term-line-ok' }, { text: '' }]);
    },
    theme() {
      printLines([
        { text: 'palette: cyan #22d3ee · violet #a78bfa', cls: 'term-line-acc' },
        { text: 'font: Space Grotesk + JetBrains Mono', cls: '' },
        { text: '' },
      ]);
    },
    whoami() { printLines([{ text: 'guest' }, { text: '' }]); },
    date() { printLines([{ text: new Date().toString() }, { text: '' }]); },
    clear() { termBody.innerHTML = ''; },
    sudo() {
      printLines([
        { text: 'guest is not in the sudoers file. this incident will be reported.', cls: 'term-line-err' },
        { text: '(jk. nothing happens here, this is a static site.)', cls: 'term-line-acc' },
        { text: '' },
      ]);
    },
    ls() {
      printRaw(`
        <p>about/  experience/  projects/  skills/  repos/  education/  contact/</p>
        <p>&nbsp;</p>
      `);
    },
    exit() { closeTerm(); },
  };

  // aliases
  commands.cd = commands.goto;
  commands.pwd = () => printLines([{ text: '/home/ram/portfolio' }, { text: '' }]);
  commands.echo = (args) => printLines([{ text: args.join(' ') }, { text: '' }]);
  commands.man = commands.help;

  function runCommand(raw) {
    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      printLines([
        { text: `command not found: ${cmd}`, cls: 'term-line-err' },
        { text: "type 'help' to see what's available." },
        { text: '' },
      ]);
    }
  }

  // ---------- kick off ----------
  startCanvas();
  loadRepos();
  runBoot().then(() => typeLoop());

})();
