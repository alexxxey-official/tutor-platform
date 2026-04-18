# Skill: UI/UX & Design Guidelines 🎨🦊

This skill defines the visual identity, user experience principles, and styling standards for the Tutor Platform (v2).

## 1. Core Principles
- **Clarity over Cleverness:** Interfaces must be immediately understandable. Avoid ambiguous icons or hidden actions.
- **Immediate Feedback:** Every user action (especially in exercises) must have an immediate, obvious, and satisfying visual response.
- **No Spoilers & No Ellipses:** Placeholders must **never** contain the answer, hints, or trailing dots (ellipses). Always strictly use `"Enter answer"` (or `<option value="">Enter answer</option>` for dropdowns). Do not use variations like "Type here...", "To be...", or "Type answer...".

## 2. Visual Identity & Theme
- **Typography:**
  - Headers & Labels: `Unbounded` (adds a modern, gamified feel).
  - Body & Inputs: `DM Sans` (for high readability).
- **Color Palette (Tailwind):**
  - **Primary/Dark:** `indigo-950`, `slate-900` (used for heavy sections like Homework).
  - **Accents:** `amber-400` / `amber-500` (warnings, highlights), `blue-600` (informational).
  - **Success:** `emerald-500` / `emerald-50` (correct answers, completion).
  - **Error/Warning:** `amber-400` / `orange-500` (incorrect attempts, revealed answers).

## 3. Component Standards
- **Containers & Cards:**
  - Prefer rounded corners (`rounded-2xl`, `rounded-3xl`).
  - Use subtle borders (`border-slate-200`) and shadows (`shadow-sm`, `shadow-xl`) to create depth.
- **Inputs:**
  - Text color must be highly visible (`text-slate-900` for light backgrounds).
  - Empty inputs must disable submission/check buttons.
  - Consistent padding and chunky feel for mobile-friendliness.
- **Buttons:**
  - Bold, uppercase, tracking-widest (`uppercase tracking-widest font-black`).
  - Active states must feel tactile (`active:scale-[0.98]`, `active:scale-95`).

## 4. Layout Patterns
- **Gap-Fill / Transformation:** When mixing text and inputs, use flex-wrap containers (`flex flex-wrap items-center gap-3`) so the text naturally flows around the inputs. Use `variant="inline"` for these inputs.
- **Sectioning:** Clear visual separation between Theory (light, informative), Classwork (interactive, light/neutral), and Homework (dark mode, high stakes).

## 5. Microinteractions
- **Errors:** Shake animations (`animate-shake`) and background color flashes (`bg-amber-50`) when an answer is wrong.
- **Success:** Confetti for overall completion, glowing borders (`border-emerald-500`), and smooth transitions.
- **Loading States:** Pulse animations or spinners matching the primary brand colors.