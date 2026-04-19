# Skill: English Lesson Creation (Golden Standard v2.5) 🇬🇧🦊

## 1. Structural Integrity (The Anatomy of a Lesson)
Every English lesson MUST contain these four specific sections:
1.  **Header:** High-impact design with `unbounded` font, floating background text (e.g., "PRONOUNS"), and a concise intro.
2.  **Theory (Deep Dive):** Comprehensive explanations using:
    -   **Visual Cards:** Separate cards for different concepts.
    -   **Detailed Tables:** Comparison tables (Active vs Passive, Some vs Any) with specific columns for Formula and Examples.
    -   **Highlight Boxes:** `bg-teal-50` or `bg-amber-50` for "Gold Formulas" or "Watch Out" tips.
3.  **Classwork (CW):** Minimum 25-30 interactive items divided into blocks:
    -   **Block 1:** Concept check (Reading/MCQ).
    -   **Block 2:** Mechanical practice (Dropdowns/Gap-fills).
    -   **Block 3:** Sentence construction (Word Builder/Sentence Transformation).
4.  **Homework (HW):** Minimum 15-20 challenging items:
    -   Must include **Variant 2** (completely different set of 15-20 questions).
    -   Must utilize **Inline/Gap-fill** layouts for realistic practice.

## 2. Visual Identity (English Subject)
- **Primary Colors:** `indigo-950` (Header/HW), `amber-400` (Accents), `blue-600` (CW labels), `emerald-500` (Correctness).
- **Typography:** `unbounded` for all headers (Main, Section, Exercise labels). `DM Sans` for body.

## 3. Core Logic (The "Strict" System)
- **Classwork (CW):** Max Attempts: **2**. Scoring: `correct` + `revealed`.
- **Homework (HW):** Max Attempts: **3**. Scoring: **ONLY** `correct` counts.
- **The Retake (Variant 2):** Show "🚀 Пересдать ДЗ" button ONLY if `statsHW.isComplete && pctHW < 60 && variant === 1`.

## 4. UI Patterns (Gap Fill & Transformation)
- **Flex-Wrap Containers:** Use `<div className="flex flex-wrap items-center gap-3 ...">` for inline inputs.
- **Strict Placeholders:** ALWAYS use `placeholder="Enter answer"`. NO hints, NO ellipses.

## 5. File Naming & Registry
Keep English lessons under `src/app/lessons/english/[topic]/page.js`. Ensure `src/lib/lessons.js` has correct `totalCW` and `totalHW` counts.
