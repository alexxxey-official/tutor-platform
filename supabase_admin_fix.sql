-- Если в таблице profiles нет твоего аккаунта, давай добавим его!
-- Для этого нам нужно взять твой ID из таблицы auth.users.
-- Выполни этот скрипт в SQL Editor.

insert into public.profiles (id, email, role)
select id, email, 'admin'
from auth.users
where email = 'gulaevl068@gmail.com'
on conflict (id) do update set role = 'admin';

-- А чтобы в админке было с кем тестировать, давай временно сделаем
-- так, чтобы ты видел СВОЙ ЖЕ аккаунт в списке учеников, пока нет настоящих:
create or replace view admin_view_students as
select * from profiles; -- Убрали фильтр "eq('role', 'student')", теперь ты увидишь всех, включая себя!
