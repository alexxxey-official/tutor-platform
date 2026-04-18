# Skill: English Lesson Creation (Golden Standard v2.3) 🇬🇧🦊

## 1. Visual Identity (English Subject)
- **Primary Colors:** `indigo-950` (Header/HW), `amber-400` (Accents), `blue-600` (CW labels), `emerald-500` (Correctness).
- **Typography:** `unbounded` for all headers (Main, Section, Exercise labels). `DM Sans` for body.
- **Sections:**
  - **Theory:** White cards, blue/amber left border markers.
  - **Classwork:** White/Light background.
  - **Homework:** `bg-slate-900` (Dark Mode).

## 2. Core Logic (The "Strict" System)
- **Classwork (CW):**
  - Max Attempts: **2**.
  - Scoring: `correct` + `revealed` (counts as completion).
- **Homework (HW):**
  - Max Attempts: **3**.
  - Scoring: **ONLY** `correct` counts for the score.
- **The Retake (Variant 2):**
  - Show "🚀 Пересдать ДЗ" button ONLY if `statsHW.isComplete && pctHW < 60 && variant === 1`.
  - When `variant === 2`, display a completely new set of exercises for HW.
  - Disable retake after the second attempt is used.

## 3. Advanced UI Patterns
- **Multi-Input Exercises (Questions/Transformations):**
  - Wrap in a card: `bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50`.
  - Use `compact` prop for the `Exercise` components inside.
  - Structure: `[Topic Label] -> [Original Sentence (Italic)] -> [Inputs]`.
- **Feedback:**
  - Blocks must turn **YELLOW** (`bg-amber-50`) and **SHAKE** on incorrect attempt (if attempts left).
  - Status messages: "AGAIN! 🧐" for errors, "OK! ✨" for success.

## 4. Technical Integration
```javascript
const { progress, updateProgress, resetHW, variant, getStats, loading } = useLessonProgress(id, TOTAL_CW, TOTAL_HW)

// Use variant to switch content
{variant === 1 ? (
  <Exercise id="hw1" ... />
) : (
  <Exercise id="hw1_v2" ... />
)}
```

## 5. File Naming
Keep English lessons under `src/app/lessons/english/[topic]/page.js`.
Ensure `src/lib/lessons.js` is updated with correct totals.
