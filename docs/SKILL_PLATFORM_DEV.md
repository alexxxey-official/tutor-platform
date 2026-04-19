# Skill: Strategic & Tactical Platform Development 🏗️🦊

This skill outlines the architectural vision, technical standards, and development workflow for the Tutor Platform.

## 1. Strategic Vision (Platform v2)
- **Goal:** Fully migrate from legacy static HTML/iframes to a dynamic, React-based (Next.js) interactive learning platform.
- **Data-Driven:** Every interaction, attempt, and error must be trackable. We don't just score; we analyze *how* the student arrived at the answer.
- **Gamification:** Progress should feel rewarding (segmented progress bars, clear states of completion, visual rewards).

## 2. Architecture & Tech Stack
- **Framework:** Next.js 14 (App Router).
- **Styling:** Tailwind CSS.
- **State Management:** Custom React Hooks (e.g., `useLessonProgress.js`) to handle complex logic (attempts, modes, scoring, variants).
- **Backend/DB:** Supabase. We utilize a Service Role Key (stored in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`) for admin-level database operations and migrations.
- **Animations/Charts:** `framer-motion` for gamified UI elements (Skill Tree), `recharts` for admin analytics.

## 2.1 Database Schema (Planned)
To support deep analytics and tracking, the database follows this relational structure:
- `users`: Core user data (`id`, `role`, `name`).
- `lessons`: Metadata for lessons (`id`, `subject`, `title`, `order_index`).
- `user_progress`: Tracking completion (`user_id`, `lesson_id`, `score`, `status`, `attempts`, `variant_used`).

## 3. Tactical Execution Standards
- **Core Business Logic (Strict Separation):**
  - **Classwork (CW):** 2 attempts. 2nd error reveals the answer. Counts towards topic completion.
  - **Homework (HW):** 3 attempts. 3rd error reveals the answer. ONLY correct answers count towards the score.
  - **Variants:** Implement a fail-safe (Variant 2) for HW if the score is low (< 60%). Old data must be archived, not deleted.
- **Component Modularity:**
  - Keep logic out of the UI components where possible.
  - Use generic, highly reusable components (like `Exercise.js`) that handle their own micro-state (local attempts, shaking) but report back to the parent hook (`onUpdate`).
- **Defensive Programming:**
  - Always check for empty inputs before processing logic.
  - Handle hydration mismatches gracefully (e.g., loading states).
  - Ensure API calls / state updates use `upsert` patterns to avoid race conditions and duplicate entries.

## 4. Development Workflow (DevOps)
- **Local Verification:** NEVER push to production without running a local build (`npm run build`) to catch compilation or routing errors.
- **Continuous Deployment:** Every verified change MUST be committed and pushed to `main` immediately to trigger the Vercel build.
- **Reporting:** Post-implementation, document changes in `/отчеты/YYYY-MM-DD/log.md`.
- **Commit Standards:** Clear, descriptive commit messages (e.g., `fix(english): update placeholders`, `feat(core): add attempt history tracking`).

## 5. Decision Making
- When adding a feature, ask: Does this improve the student's learning loop? Does it give the admin/teacher better data?
- Prefer robust, tested patterns over clever hacks. If a component is getting too complex, break it down.