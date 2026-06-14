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
- **Backend/DB:** Supabase with Service Role Key for admin DB operations.
- **Animations/Charts:** `framer-motion` for gamified UI elements (Skill Tree), `recharts` for admin analytics.
- **Deployment:** Vercel (auto-deploy on push to `main`).

## 2.1 Authentication Architecture
- **Client-side auth:** Each page uses `supabase` client directly from `src/lib/supabase.js`.
- **NO AuthProvider/Context:** React Strict Mode conflicts with Supabase gotrue-js locks.
- **Login flow:** `supabase.auth.signInWithPassword()` → `router.push('/dashboard')`
- **Session check:** `supabase.auth.getUser()` in each protected page's `useEffect`.
- **Middleware:** Only protects `/admin` route (checks role via `get_user_role()` function).
- **Registration:** `supabase.auth.signUp()` → email confirmation → trigger creates profile.

### Auth Anti-Patterns (DO NOT)
- ❌ Don't create AuthProvider/useAuth context — breaks with React Strict Mode
- ❌ Don't use `router.push()` immediately after `signIn()` — race condition with auth state
- ❌ Don't redirect in useEffect based on `authLoading` — blocks login form rendering

## 2.2 Database Schema
- **profiles:** `id` (uuid, FK auth.users), `email`, `role` (student/admin), `created_at`
- **student_lessons:** `id`, `student_id`, `lesson_id`, `status`, `score`, `total_score`, `progress_data` (JSONB), `variant_id`, `assigned_at`, `updated_at`
- **user_progress:** Detailed exercise-level progress (RLS enabled, policies for user access)

### RLS Policies
- Use `SECURITY DEFINER` functions to avoid infinite recursion when checking roles
- `get_user_role(uid)` function returns role without recursive policy check
- Admin access: `public.get_user_role(auth.uid()) = 'admin'`
- User access: `auth.uid() = id` (own data only)

### Trigger: handle_new_user
- Fires on `auth.users` INSERT
- Creates matching row in `profiles` with role='student' (or 'admin' for gulaevl068@gmail.com)
- If trigger is missing, new registrations won't appear in admin panel

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

## 6. Common Pitfalls & Solutions
- **Builder Type Missing Handler:** Always ensure `handleBuilderClick` function exists in Exercise component when using `type="builder"`. This function manages word movement between bank and construction zone.
- **Builder State Sync:** Use `useEffect` to sync `builderZone` array with `input` string for proper progress tracking.
- **Missing Functions:** Before deploying, verify all event handlers referenced in JSX are actually defined in the component.
- **React Strict Mode + Supabase:** Never use AuthProvider pattern. Use supabase client directly in each page.
- **RLS Recursion:** Never reference the same table in a SELECT subquery within its own RLS policy. Use SECURITY DEFINER functions.
- **Next Lesson Links:** Always check if the next lesson is assigned before showing navigation links.
- **npm cache permissions:** Use `npm install --cache /tmp/npm-cache-tutor` to bypass root-owned cache files.

## 7. Environment Variables (Vercel)
Required in Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Project URL from Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon public key
- `SUPABASE_SERVICE_ROLE_KEY` — service_role key (server-side only)

Note: `NEXT_PUBLIC_` vars are inlined at build time. If changed AFTER deploy, must trigger redeploy.
