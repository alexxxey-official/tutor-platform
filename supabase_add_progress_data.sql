-- Добавляем колонку progress_data для хранения деталей ответов (какие задания решены правильно, а какие с ошибкой)
alter table public.student_lessons add column if not exists progress_data jsonb default '{}'::jsonb;
