# ram.sasidhar — portfolio site

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

## ⚠️ before you deploy — add two files

The site links to these; drop them next to `index.html`:

1. **`ResumeUpdated.pdf`** — your résumé. The nav "résumé" button and the hero
   download button both point at `ResumeUpdated.pdf`. Until you add it, those
   links 404. (Use exactly that filename, or rename the links in `index.html`.)
2. **(Optional) `og.png`** — a 1200×630 social-preview image. Referenced by the
   Open Graph tags in `<head>`. Without it, links just won't show a preview card.

## deploying to Vercel

### option A — Vercel dashboard (no CLI)

1. Push this folder to a GitHub repo (see below), then go to
   [vercel.com/new](https://vercel.com/new) and **Import** the repo.
2. Framework preset: **Other** · Build command: *(leave empty)* ·
   Output directory: `.` (root). Vercel serves the static files as-is.
3. **Deploy.** You get a `*.vercel.app` URL in ~20 seconds. Add a custom
   domain later under Project → Settings → Domains.

### option B — Vercel CLI

```bash
cd /Users/ramsasidhar/Documents/Website
npx vercel          # first run links/creates the project (follow prompts)
npx vercel --prod   # promote to production
```

### pushing to GitHub first (for option A / version control)

```bash
cd /Users/ramsasidhar/Documents/Website
git init
git add .
git commit -m "portfolio site"
git branch -M main
git remote add origin https://github.com/ram-sasidhar/portfolio.git
git push -u origin main
```

## previewing locally

```bash
cd /Users/ramsasidhar/Documents/Website
python3 -m http.server 8000   # → http://localhost:8000
# or:  npx serve .
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
