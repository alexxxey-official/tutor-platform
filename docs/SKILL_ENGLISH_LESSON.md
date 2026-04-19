# Skill: English Lesson Creation (Golden Standard v2.6) 🇬🇧🦊

## 1. Structural Integrity (The Anatomy of a Lesson)
Every English lesson MUST contain these four specific sections:
1.  **Header:** High-impact design with `unbounded` font, floating background text (e.g., "PRONOUNS"), and a concise intro.
2.  **Theory (Deep Dive & Visuals):** This is the MOST CRITICAL part. Theory MUST be exhaustive, heavily styled, and based on detailed pedagogical materials (like provided PDFs). It MUST include:
    -   **Step-by-Step Logic:** Break rules down into "Step 1", "Step 2", etc.
    -   **Icon Cards:** Use emojis or Lucide icons inside `bg-slate-50` cards to represent concepts (e.g., 👤 for people, 🌍 for places).
    -   **Detailed Color-Coded Tables:** Comparison tables with distinct colors for each row/concept (e.g., Blue for SOME, Amber for ANY, Rose for NO). Include columns for Category, Rule/Type, Translation, and Example.
    -   **"The Secrets" Block:** A visually distinct (usually dark mode `bg-slate-900`) section highlighting edge cases, common traps, or advanced rules (e.g., "Секрет №1: ANY в утверждении").
    -   **Cheat Sheet (Шпаргалка):** A quick-reference algorithm box (e.g., `bg-teal-50`) with numbered steps on how to choose the right answer.
3.  **Classwork (CW):** Minimum 25-30 interactive items divided into logical blocks:
    -   **Block 1:** Concept check (Reading/MCQ).
    -   **Block 2:** Mechanical practice (Dropdowns/Gap-fills).
    -   **Block 3:** Sentence construction (Word Builder/Sentence Transformation).
4.  **Homework (HW):** Minimum 15-20 challenging items:
    -   Must include **Variant 2** (completely different set of 15-20 questions).
    -   Must utilize **Inline/Gap-fill** layouts for realistic practice.

## 2. Visual Identity (English Subject)
- **Primary Colors:** `indigo-950` (Header/HW), `amber-400` (Accents), `blue-600` (CW labels), `emerald-500` (Correctness).
- **Typography:** `unbounded` for all headers (Main, Section, Exercise labels). `DM Sans` for body text.

## 3. Core Logic (The "Strict" System)
- **Classwork (CW):** Max Attempts: **2**. Scoring: `correct` + `revealed`.
- **Homework (HW):** Max Attempts: **3**. Scoring: **ONLY** `correct` counts.
- **The Retake (Variant 2):** Show "🚀 Пересдать ДЗ" button ONLY if `statsHW.isComplete && pctHW < 60 && variant === 1`.

## 4. UI Patterns (Gap Fill & Transformation)
- **Flex-Wrap Containers:** Use `<div className="flex flex-wrap items-center gap-3 ...">` for inline inputs within sentences.
- **Strict Placeholders:** ALWAYS use `placeholder="Enter answer"`. NO hints, NO ellipses in the placeholder.
- **JSX Escaping:** When using arrows in text or code blocks, ALWAYS escape them like this: `{'->'}` to prevent build errors.

## 5. File Naming & Registry
Keep English lessons under `src/app/lessons/english/[topic]/page.js`. Ensure `src/lib/lessons.js` has correct `totalCW` and `totalHW` counts that perfectly match the number of rendered `<Exercise>` components.
