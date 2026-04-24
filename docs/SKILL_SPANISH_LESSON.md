# Skill: Spanish Lesson Creation (Fiesta Standard v1.2) 🇪🇸💃

## 1. Structural Integrity (The Anatomy of a Lesson)
Based on the Golden Standard v2.6, every Spanish lesson MUST contain:
1.  **Header:** High-impact design with `unbounded` font, floating background text (e.g., "SER Y ESTAR"), and a concise intro. Use Spanish flags 🇪🇸.
2.  **Theory (Deep Dive & Visuals):**
    -   **Detailed Color-Coded Tables:** MANDATORY. Conjugation tables, rules, and exceptions. Red/Rose for exceptions, Emerald for regular forms.
    -   **"Las Reglas" (Правила) Block:** A dark mode (`bg-slate-900`) section for strict rules, false friends, or pronunciation traps. NO "Secrets".
    -   **Audio Pronunciation:** Whenever introducing core vocabulary, conjugations, or tricky rules in the Theory section, use the `<AudioPlayer />` component (or standard HTML5 `<audio>` tags if custom component is unavailable) to provide native pronunciation. No Russian transcriptions.
    -   **Cheat Sheet (¡Ojo! / Внимание!):** Algorithm boxes in vibrant colors (e.g., `bg-rose-50`).
3.  **Classwork (CW):** Minimum 25-30 items (must NOT decrease from original).
    -   Must include immersive cultural context where possible.
    -   Heavy use of Gap-fills and Dropdowns.
4.  **Homework (HW):** Minimum 15-20 challenging items (must NOT decrease from original).
    -   Must include **Variant 2** for retakes.
    -   Heavy use of Inline/Gap-fill layouts.

## 1.1 Trainer Standard (Тренажёры)
For **trainer-type lessons** (e.g., `verbs-trainer`, `conjugation-drill`), use this simplified structure:

1.  **Header:** Same high-impact design as regular lessons, but emphasize "Тренажёр" / "Práctica Intensiva" in the badge.
2.  **NO Theory Section:** Trainers are pure practice. No explanations, just exercises.
3.  **NO Classwork (CW):** Trainers use only HW mode for all exercises.
4.  **Homework (HW) Only:** 30-50+ rapid-fire exercises.
    -   Max 3 attempts per item (correct only, no revealed answers).
    -   Auto-focus to next input on correct answer.
    -   Confetti celebration at 85%+ completion.
5.  **Custom Progress Bar:** Show single HW progress bar with:
    -   Large percentage display (e.g., "87%")
    -   Correct/Total count (e.g., "43 / 50")
    -   Gradient progress bar (rose-500 to rose-600)
    -   Completion message: "🎉 ¡Excelente!" at 85%+, "💪 Попробуй ещё раз" below 85%
6.  **Navigation:** Home button + Trainer status badge (Zap icon + "Тренажёр активен")
7.  **NO Retakes/Variants:** Trainers are single-pass intensive practice.

**Example:** `spa_verbs_trainer` - 50 verb conjugation exercises, HW only, no theory.

## 2. Visual Identity (Spanish Subject)
- **Primary Colors:** `rose-600` (Header/HW accents - represents passion/Spain), `amber-500` (Accents - sun/paella), `emerald-500` (Correctness).
- **Typography:** `unbounded` for all headers. `DM Sans` for body text.

## 3. Core Logic & Retakes
- CW max 2 attempts (correct+revealed), HW max 3 attempts (correct only).
- Retake button (Variant 2) shown if `statsHW.isComplete && pctHW < 60 && variant === 1`.
- **Strict Spelling:** Accents (`á, é, í, ó, ú, ñ`) are MANDATORY. Users MUST type them correctly to enforce memorization.

## 4. Checklist of Grammatical Lessons for Overhaul
1. [x] `spa_ser` (Урок 2: Местоимения и глагол SER) - V1.2
2. [x] `spa_articles` (Урок 3: Артикли и Род) - V1.2
3. [ ] `spa_tener` (Урок 4: Глагол TENER)
4. [ ] `spa_verbs` (Урок 5: Правильные глаголы)
5. [ ] `spa_estar` (Урок 6: ESTAR и Предлоги)
6. [ ] `spa_questions` (Урок 7: Вопросы и Порядок слов)
7. [ ] `spa_family` (Урок 8: Семья и Внешность)
8. [ ] `spa_gustar` (Урок 9: Глагол GUSTAR и Еда)
