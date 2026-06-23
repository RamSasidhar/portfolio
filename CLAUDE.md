# CLAUDE.md

Reference for working on this repo: the portfolio site for **Ram Sasidhar Putcha**.
This file is the source of truth for résumé content shown on the site. When site
copy and this file disagree, fix the site to match this file.

## The project

Single-page personal portfolio. **No framework, no build step** — plain
`index.html` + `styles.css` + `script.js`. Deploys as a static site (Vercel /
GitHub Pages). Keep it that way unless there's a strong reason not to.

- `index.html` — all markup
- `styles.css` — design tokens (`:root`) + all styling. `--primary` (cyan
  `#22d3ee`) and `--accent` (violet `#a78bfa`) drive the palette.
- `script.js` — boot sequence, typed hero, neural-net canvas, scroll reveals +
  progress + scroll-spy, stat counters, 3D-tilt cards, mobile nav, live GitHub
  repos, interactive terminal.
- `vercel.json` — static deploy config (clean URLs + cache headers).

## Who this is

**Ram Sasidhar Putcha** — final-year Integrated M.Tech (CSE) student at VIT
Chennai, graduating 2027. Builds real-world ML, computer-vision, IoT, and
real-time analytics systems. Born in **Detroit, Michigan, USA**; based in
Chennai, India.

- Email: **putcharamsasidhar@gmail.com**
- Phone: +91 63792 34114
- GitHub: **github.com/RamSasidhar**
- LinkedIn: **linkedin.com/in/ram-sasidhar**

## Education

| When | What | Where | Result |
|------|------|-------|--------|
| 2022 – 2027 | Integrated M.Tech, Computer Science & Engineering (Business Analytics focus) | Vellore Institute of Technology, Chennai | CGPA **8.60 / 10** |
| 2022 | Senior Secondary (XII), CBSE | Chettinad Vidyashram, Chennai | 85.20% |
| 2020 | Secondary (X), CBSE | Hindu Sr Sec School, Indira Nagar, Chennai | 93% |

## Experience

### AI Intern — AyuhTech (May 2025 – present)
Building a tracking application for **Southern Railways** as part of their
**Kavach** (train collision-avoidance) implementation. Stack: Next.js,
TypeScript, Tailwind CSS, React, MongoDB Atlas, Git. *(Keep this entry brief on
the site — high level only.)*

### Machine Learning Intern — Vizag Steel Plant (RINL), Visakhapatnam (Jun 2025 – Jul 2025)
- PPE detection system for live gate surveillance using YOLOv8, Python, OpenCV.
- Inference pipeline integrated with a Node.js backend + Firebase for real-time
  compliance monitoring.
- **91% detection accuracy**; automated safety reporting.
- Delivered a production-ready solution independently; received a Letter of
  Recommendation.

### UI/UX Design Intern — 3F (Virtual) (Jul 2024 – Oct 2024)
- Designed and prototyped mobile interfaces in Figma; iterative usability testing.
- Integrated AI-generated assets to accelerate design workflows.
- Optimized data conversion pipelines for cross-team collaboration.

### AI-ML Intern — Winfo Solutions Pvt Ltd, Hyderabad (May 2024 – Jul 2024)
- Curated and processed 500+ invoice documents for model training.
- Improved extraction accuracy from **50% to 85%** using Google Cloud Document AI.
- Implemented preprocessing and validation routines for model robustness.

## Projects

1. **Multi-Modal Road Condition Monitoring** — dashcam imagery + inertial sensing
   + geospatial event detection. Multi-modal data fusion for anomaly detection;
   Android-based crowdsourced collector streaming geo-tagged sensor data to
   Firebase; IMU jerk analysis for detection reliability.
   **Accepted at the 16th IEEE ICCCNT 2025.**
2. **IoT Smart Safety Helmet** — embedded wear-detection + real-time fall
   monitoring. Capacitive/proximity/IMU sensors; interrupt-driven firmware;
   low-power peer-to-peer ESP-NOW alerts for infrastructure-constrained sites.
3. **LLM-Based Emotional Analysis of Live YouTube Comments** — streaming
   analytics pipeline integrating APIs + LLMs for continuous inference on live
   data; latency-tuned for scalable real-time analytics and visualization.
4. **Intelligent OBD Vehicle Tracker** — connected diagnostics over a
   Bluetooth OBD-II module; live telemetry + lifecycle monitoring for predictive
   maintenance; offline-capable mobile architecture with synced cloud storage.
5. **RINL PPE Detection (production)** — see RINL experience above; YOLOv8,
   91% accuracy, deployed on factory gate cameras.

## Technical skills

- **Programming:** Python, C, C++, Java, JavaScript, TypeScript, SQL, Bash, R, HTML, CSS
- **Frameworks/Libraries:** PyTorch, TensorFlow, Keras, Scikit-learn, OpenCV,
  YOLOv8, Pandas, NumPy, Streamlit, React, Next.js, Tailwind CSS
- **Databases:** MySQL, Neo4j, Firebase, MongoDB Atlas
- **Tools:** Git, Databricks, Arduino/ESP32 toolchain, Google Cloud (Document AI), Figma
- **Data Viz:** Power BI, Tableau
- **Concepts:** Computer Vision, Deep Learning, NLP, EDA, Transfer Learning, Embedded IoT, Business Analytics

## Certifications

- Programming with JavaScript — Coursera (Jan 2025 – Mar 2025)
- Introduction to Front-End Development — Meta (Dec 2024 – Jan 2025)
- Quantum Machine Learning — KwantamG Research Labs (Jul 2024 – Aug 2024)
- Machine Learning A-Z: AI, Python & R — Udemy (May 2024 – Oct 2024)

## Extracurricular

- District Youth Coordinator & volunteer, Sri Sathya Sai Organization — food &
  clothing donation drives.
- Award recipient in Karate with advanced belt certifications.
- Multiple-time school-level winner in Bhagavad Gita recitation competitions.

## Editing conventions

- Lowercase, terminal-flavored UI copy is intentional — match the existing tone.
- Keep everything accessible: honor `prefers-reduced-motion`, keep `aria-*`
  labels, maintain keyboard support (terminal opens with backtick / `Esc` closes).
- No secrets in the repo. GitHub repos load live from the public API — no key.
