# Skill: Spanish Lesson Creation (Fiesta Standard v1.0) 🇪🇸💃

## 1. Structural Integrity (The Anatomy of a Lesson)
Based on the Golden Standard v2.6, every Spanish lesson MUST contain:
1.  **Header:** High-impact design with `unbounded` font, floating background text (e.g., "SER Y ESTAR"), and a concise intro. Use Spanish flags 🇪🇸.
2.  **Theory (Deep Dive & Visuals):**
    -   **Step-by-Step Logic:** Clear breakdowns.
    -   **Icon Cards:** Use emojis inside `bg-slate-50` cards (e.g., 💃, 🌮, 🇪🇸).
    -   **Detailed Color-Coded Tables:** e.g., Conjugation tables. Red/Rose for exceptions, Emerald for regular forms.
    -   **"Los Secretos" Block:** A dark mode (`bg-slate-900`) section for exceptions, false friends, or pronunciation traps.
    -   **Cheat Sheet (¡Ojo! / Внимание!):** Algorithm boxes in vibrant colors (e.g., `bg-rose-50`).
3.  **Classwork (CW):** Minimum 25-30 items.
    -   Must include immersive cultural context where possible.
    -   Mix of Dropdowns, Text Inputs, and Gap-fills.
4.  **Homework (HW):** Minimum 15-20 challenging items.
    -   Must include **Variant 2** for retakes.
    -   Heavy use of Inline/Gap-fill layouts.

## 2. Visual Identity (Spanish Subject)
- **Primary Colors:** `rose-600` (Header/HW accents - represents passion/Spain), `amber-500` (Accents - sun/paella), `emerald-500` (Correctness).
- **Typography:** `unbounded` for all headers. `DM Sans` for body text.
- **Vibe:** Vibrant, warm, energetic.

## 3. Core Logic & Retakes
- Same as English: CW max 2 attempts (correct+revealed), HW max 3 attempts (correct only).
- Retake button (Variant 2) shown if `statsHW.isComplete && pctHW < 60 && variant === 1`.

## 4. Specific Spanish Quirks
- **Special Characters:** Always remind or provide buttons for `á, é, í, ó, ú, ñ, ¿, ¡` if necessary, or accept variations (e.g., n for ñ if configured). For now, ensure answers accept standard keyboard inputs or provide strict instructions.
- **Context:** Sentences should feel like they are from Madrid, Barcelona, or Latin America (mention tapas, siesta, playa, etc.).
