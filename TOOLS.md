# TOOLS.md - Project Tools & Configuration

## Supabase
- **Project URL:** `https://wwdnddpuodfldbdykjmu.supabase.co`
- **Anon Key:** in `.env.local` and Vercel env vars
- **Service Role Key:** in `.env.local` and Vercel env vars (server-side only)
- **Dashboard:** https://supabase.com/dashboard/project/wwdnddpuodfldbdykjmu

### Key Tables
- `profiles` — user accounts (id, email, role)
- `student_lessons` — assigned lessons with progress (progress_data JSONB)
- `user_progress` — detailed exercise-level tracking

### SQL Functions
- `get_user_role(uid uuid)` — SECURITY DEFINER, returns role without RLS recursion

### Triggers
- `on_auth_user_created` — creates profile on new user registration

## Vercel
- **Project:** tutor-platform-seven
- **URL:** https://tutor-platform-seven.vercel.app
- **Auto-deploy:** on push to `main` branch
- **Framework:** Next.js 14

## GitHub
- **Repo:** https://github.com/alexxxey-official/tutor-platform
- **Branch:** `main` (production)
- **Auth:** `gh` CLI authenticated as alexxxey-official

## npm Workaround
On Alexei's machine, npm cache may have root-owned files:
```bash
npm install --cache /tmp/npm-cache-tutor
npm run build --cache /tmp/npm-cache-tutor
```

## Admin Access
- **Admin email:** gulaevl068@gmail.com (hardcoded in admin page + dashboard)
- **Admin role:** stored in `profiles.role = 'admin'`
- **Admin panel:** `/admin` route (middleware-protected)

## Key Files
- `src/lib/supabase.js` — singleton Supabase client
- `src/lib/lessons.js` — lesson metadata registry (LESSONS object)
- `src/hooks/useLessonProgress.js` — progress tracking hook
- `src/components/Exercise.js` — universal exercise component
- `src/components/AdvancedProgressBar.js` — CW/HW progress bars
- `middleware.js` — server-side route protection (admin only)
