-- Создаем таблицу профилей (связана с auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text default 'student' check (role in ('student', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Настраиваем RLS для profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by admin." on profiles for select using ( auth.uid() in (select id from profiles where role = 'admin') );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );
create policy "Users can read own profile." on profiles for select using ( auth.uid() = id );

-- Создаем функцию для автоматического создания профиля при регистрации
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, case when new.email = 'gulaevl068@gmail.com' then 'admin' else 'student' end);
  return new;
end;
$$ language plpgsql security definer;

-- Создаем триггер на создание пользователя
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Создаем таблицу назначенных уроков и прогресса
create table student_lessons (
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

-- Настраиваем RLS для student_lessons
alter table student_lessons enable row level security;
create policy "Admins can do everything on student_lessons" on student_lessons for all using ( auth.uid() in (select id from profiles where role = 'admin') );
create policy "Students can view their own lessons" on student_lessons for select using ( auth.uid() = student_id );
create policy "Students can update their own progress" on student_lessons for update using ( auth.uid() = student_id );

-- Создаем функцию для обновления updated_at
create extension if not exists moddatetime schema extensions;
create trigger handle_updated_at before update on student_lessons
  for each row execute procedure moddatetime (updated_at);
