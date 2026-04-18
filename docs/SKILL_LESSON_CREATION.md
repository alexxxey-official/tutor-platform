# Skill: Lesson Creation (Golden Standard v2.0) 🦊

## 1. Visual Identity
- **Header (Hero):** `bg-indigo-950`, text `white`. Title must use `unbounded` font, `text-4xl` to `text-6xl`, `font-black`, `uppercase`.
- **Accents:** 
  - `amber-400` for italic highlights and key emphasis.
  - `blue-600` for primary actions/labels.
  - `teal-500` for success/correctness.
- **Backgrounds:** 
  - Main page: `bg-[#f8fafc]`.
  - Theory cards: `bg-white` with `border-slate-200`.
  - Homework section: **ALWAYS** `bg-slate-900` (Dark Mode) to separate from classwork.

## 2. Core Components
- **Progress:** Use `AdvancedProgressBar` right after the header.
- **Interaction:** Use `Exercise` component for EVERYTHING that requires input.
  - `type="text"`: For single word answers (V3 forms, etc.).
  - `type="mcq"`: For multiple choice.
  - `type="dropdown"`: For tense selection (is/are/was).
  - `type="builder"`: For sentence ordering.

## 3. Logic & Rules
- **CW (Classwork):**
  - `maxAttempts: 2`.
  - Content: Theory checks, Reading, Guided practice.
  - Scoring: Both `correct` and `revealed` count towards completion.
- **HW (Homework):**
  - `maxAttempts: 3`.
  - Content: Independent practice.
  - Scoring: **ONLY** `correct` counts for the final score.
  - Reset: Always provide a `resetHW` button in the HW header.

## 4. Code Structure Template
```javascript
'use client'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import Exercise from '../../../../components/Exercise'
// ... icons

export default function LessonPage() {
  const lessonId = 'subject_topic'
  const { progress, updateProgress, resetHW, getStats, loading } = useLessonProgress(lessonId, TOTAL_CW, TOTAL_HW)
  
  // ... Loading state
  // ... Header with Unbounded font
  // ... AdvancedProgressBar stats
  // ... Theory Sections (White cards)
  // ... Classwork Section (White/Light)
  // ... Homework Section (Dark bg-slate-900)
}
```

## 5. Metadata Sync
Always update `src/lib/lessons.js` after creating a new lesson to ensure the Dashboard shows correct progress.
