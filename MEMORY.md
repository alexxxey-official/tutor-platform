![alt text](image.png)# MEMORY.md - Tutor Platform Long-Term Memory

## Rules
- Never present new features with "tech-labels" (e.g., "Duolingo mechanic", "MCQ format"). Just implement them naturally — Alexei sees and appreciates them without presentation. [ses_Telegram_2026-04-14]
- Every lesson must have 25-30 minutes of content — lots of exercises and varied formats, a mix of everything. [ses_Telegram_2026-04-14]
- Always run `npm run build` locally before pushing to production. [AGENTS.md, SKILL_PLATFORM_DEV.md]
- After every deployment, create a detailed report in `reports/YYYY-MM-DD/log.md`. [AGENTS.md]
- Update `src/lib/lessons.js` metadata (totalCW/totalHW/totalScore) immediately after expanding lessons. [memory/2026-04-25.md]
- Spanish accent marks (á, é, í, ó, ú, ñ) are MANDATORY in exercises — strict spelling enforced. [SKILL_SPANISH_LESSON.md]

## Architecture decisions
- **Framework:** Next.js 14 (App Router) with Tailwind CSS, deployed on Vercel (tutor-platform-seven.vercel.app). [2026-04-14]
- **Backend:** Supabase with Service Role Key for admin DB operations. Placeholder values in `src/lib/supabase.js` when no `.env.local`. [2026-04-14, ses_13d2a40a]
- **State management:** Custom `useLessonProgress` hook handles attempts, modes, scoring, variants. [SKILL_PLATFORM_DEV.md]
- **Lesson anatomy (Fiesta Standard v1.2):** Header (unbounded font + floating text) → Theory (color-coded tables, Las Reglas, Cheat Sheet) → Classwork (min 25-30, CW 2 attempts) → Homework (min 15-20, HW 3 attempts, Variant 2 if < 60%). [SKILL_SPANISH_LESSON.md]
- **Trainer standard:** No theory, no CW, HW-only 30-50+ exercises, max 3 attempts, confetti at 85%+. [SKILL_SPANISH_LESSON.md v1.2]
- **Exercise types:** Fill-in-blank, Dropdown, Builder (Drag & Drop / word click), MCQ buttons, Audio quiz (Web Speech API — free, browser-native). [memory/2026-04-14-task-types.md]

## Discovered durable knowledge
- **Builder bug pattern:** Missing `handleBuilderClick` function in Exercise component breaks word builder exercises. Always verify event handlers exist before deploying. Builder requires `handleBuilderClick(word, fromBank)`, `builderBank`, `builderZone` state, and `useEffect` to sync `builderZone` array → `input` string. [AGENTS.md, SKILL_PLATFORM_DEV.md — 2026-04-24]
- **Dark mode contrast:** Always check how parent styles (e.g., `bg-slate-900`) affect reusable components like Exercise.js. Ensure text contrast is explicitly handled. [AGENTS.md — 2026-04-24]
- **React string props:** String props in React components don't evaluate JSX-style escaping (`{'->'}`). Use literal symbols or template literals. [AGENTS.md]
- **Attempt history (Platform v2):** Full attempt history tracking with V1 archiving during retakes. Progress is strictly tracked with high-fidelity history data. [memory/2026-04-18]
- **npm cache permission issue:** On Alexei's machine, npm cache may have root-owned files. Workaround: use `npm install --cache /tmp/npm-cache-$(whoami)` to bypass. [ses_13d2a40a]
- **Hebrew lessons:** RTL support via `dir="rtl"`, font: Assistant, colors: blue (#2563eb) + cyan (#0891b2). Only 2 lessons implemented (intro + alphabet-1), 8 more planned. [HEBREW_PROGRESS.md]
- **Math/Physics:** Minimal exercises (3-8 items per lesson). Legacy HTML content exists in `math/`, `physics/` directories but most content is in Next.js pages. [lessons.js, file structure]

## Patterns
- **Deploy pipeline:** `npm run build` → `git add .` → `git commit` → `git push main` → Vercel auto-deploys → create report in `reports/YYYY-MM-DD/`. [AGENTS.md]
- **Lesson expansion workflow:** Create/expand lesson → update `lessons.js` metadata → `npm run build` → deploy → report. [memory/2026-04-25.md]
- **New lesson formats (from Telegram brainstorm):** Dropdown, sentence builder (Duolingo-style), flashcards/memory match, MCQ buttons, audio quiz. All implemented in Lesson 6 (Questions & Word Order). [memory/2026-04-14-task-types.md]

## Gotchas
- `next.config.js` has a rewrite for legacy `english_passive_voice.html` → new React page. Don't break rewrites when adding routes. [next.config.js]
- `canvas-confetti` is used for celebrations — ensure it's imported only client-side (dynamic import or `'use client'`). [package.json]
- Supabase placeholders in `src/lib/supabase.js`: `'https://placeholder-url.supabase.co'` and `'placeholder-key'`. Real keys go in `.env.local` which is gitignored. [ses_13d2a40a]
- Legacy HTML files in `english/`, `math/`, `physics/`, `spanish/` directories are originals before Next.js migration. They still exist but routes are served by React pages. [file structure]
