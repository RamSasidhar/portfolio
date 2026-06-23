# ram.sasidhar — portfolio site

https://ram-sasidhar-portfolio.vercel.app

Personal portfolio for **Ram Sasidhar Putcha**. Single-page, no frameworks, no
build step — just HTML, CSS, and vanilla JS. Deploys to Vercel in one click.

## what's inside

```
.
├── index.html         # all the markup
├── styles.css         # all the styling (edit :root for colors)
├── script.js          # boot sequence, typed hero, neural-net canvas, scroll
│                       # progress + scroll-spy, stat counters, 3D-tilt cards,
│                       # mobile nav, live GitHub repos, interactive terminal
├── vercel.json         # static deploy config (clean URLs + cache headers)
├── CLAUDE.md           # résumé content / source-of-truth for site copy
├── .nojekyll           # harmless; only relevant if also hosting on GitHub Pages
└── ResumeUpdated.pdf   # ← ADD THIS FILE (see below)
```


## features

- **Boot sequence** — terminal-style intro on first load.
- **Typed hero tagline** — cycles through phrases (incl. current AyuhTech role).
- **Live neural-net canvas background** — particles that react to the cursor.
- **Scroll progress bar + scroll-spy nav** — the active section highlights as you scroll.
- **Mobile slide-in menu** — hamburger nav on small screens.
- **3D-tilt project cards**, **animated stat counters**, scroll reveals.
- **Live GitHub repos** — pulled from `api.github.com/users/ram-sasidhar/repos`
  at load (public endpoint, no key).
- **Interactive terminal** — press `` ` `` or the `›_` button. Try `help`,
  `about`, `now`, `projects`, `skills`, `experience`, `goto <section>`.
- **Honors `prefers-reduced-motion`**.

## customizing

- **Colors**: `:root` in `styles.css` — `--primary` (cyan) / `--accent` (violet).
- **Content**: every section in `index.html` is plain HTML. Keep it in sync with
  `CLAUDE.md`, which is the résumé source of truth.
- **Terminal commands**: the `commands` object in `script.js`.

## license

Personal site, but if it's useful as a starting point — go for it.
