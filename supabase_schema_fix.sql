-- Создаем таблицу назначенных уроков и прогресса, если её еще нет
create table if not exists student_lessons (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references profiles(id) on delete cascade not null,
  lesson_id text not null,
  status text default 'assigned' check (status in ('assigned', 'in_progress', 'completed')),
  score integer default 0,
  total_score integer default 0,
  assigned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(student_id, lesson_id)
);

-- Настраиваем RLS для student_lessons (если еще не настроено)
alter table student_lessons enable row level security;

do $$
begin
    if not exists (select 1 from pg_policies where tablename = 'student_lessons' and policyname = 'Admins can do everything on student_lessons') then
        create policy "Admins can do everything on student_lessons" on student_lessons for all using ( auth.uid() in (select id from profiles where role = 'admin') );
    end if;
    if not exists (select 1 from pg_policies where tablename = 'student_lessons' and policyname = 'Students can view their own lessons') then
        create policy "Students can view their own lessons" on student_lessons for select using ( auth.uid() = student_id );
    end if;
    if not exists (select 1 from pg_policies where tablename = 'student_lessons' and policyname = 'Students can update their own progress') then
        create policy "Students can update their own progress" on student_lessons for update using ( auth.uid() = student_id );
    end if;
end
$$;

-- Создаем функцию для обновления updated_at
create extension if not exists moddatetime schema extensions;

do $$
begin
    if not exists (select 1 from pg_trigger where tgname = 'handle_updated_at' and tgrelid = 'student_lessons'::regclass) then
        create trigger handle_updated_at before update on student_lessons
        for each row execute procedure moddatetime (updated_at);
    end if;
end
$$;
