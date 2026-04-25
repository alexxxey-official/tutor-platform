# Отчет: Расширение урока ESTAR (Lección 6)

**Дата:** 2026-04-25  
**Урок:** Spanish / ESTAR (`spa_estar`)  
**Задача:** Расширить минималистичный урок (4 CW + 4 HW) до стандарта Fiesta (20 CW + 15 HW)

## Что было сделано

### 1. Расширение теории

**Добавлен блок: Предлоги места (Preposiciones de lugar)**
- 8 предлогов с примерами: en, sobre, debajo de, al lado de, delante de, detrás de, cerca de, lejos de
- Цветовое кодирование: синие карточки (blue-50)
- Примеры использования с ESTAR

**Добавлен блок: Временные состояния (Estados temporales)**
- Эмоции: feliz, triste, enojado, nervioso, tranquilo
- Физические состояния: cansado, enfermo, ocupado, libre, listo
- Примеры предложений с ESTAR
- Цветовое кодирование: фиолетовые карточки (purple-500)

**Расширена секция Las Reglas (1→3 правила)**
- Regla №1: SER vs ESTAR (было)
- Regla №2: Местоположение = ESTAR (новое)
- Regla №3: Прилагательные меняют значение (новое)
  - ser listo vs estar listo
  - ser aburrido vs estar aburrido

### 2. Расширение Classwork (4→20 упражнений)

**Блок 1: Формы ESTAR (6 упражнений)**
- Dropdown выбор правильной формы глагола
- Все 6 форм: estoy, estás, está, estamos, estáis, están

**Блок 2: SER vs ESTAR (6 упражнений)**
- Dropdown выбор между SER и ESTAR
- Контрастные пары: профессия vs состояние, характеристика vs местоположение

**Блок 3: Предлоги места (5 упражнений)**
- Dropdown выбор правильного предлога
- Практика: sobre, debajo de, al lado de, cerca de, delante de

**Блок 4: Перевод с русского (3 упражнения)**
- Text input для перевода предложений
- Примеры: "Я в школе" → "Estoy en la escuela"

### 3. Расширение Homework (4→15 упражнений × 2 варианта)

**Вариант 1 (15 упражнений):**
- 5 упражнений: формы ESTAR (text input)
- 5 упражнений: SER vs ESTAR (dropdown)
- 3 упражнения: предлоги места (dropdown)
- 2 упражнения: перевод с русского (text input)

**Вариант 2 (15 упражнений):**
- Полностью новый набор из 15 упражнений
- Та же структура, другие примеры

## Технические детали

### Изменения в коде
- **Файл:** `src/app/lessons/spanish/estar/page.js`
- **Размер:** 298 → ~554 строки (+256 строк)
- **Bundle size:** 4.26 kB → 6.17 kB
- **CW:** 4 → 20 упражнений
- **HW:** 4 → 15 упражнений на вариант

### Метаданные обновлены
- `src/lib/lessons.js`: totalCW: 4→20, totalHW: 4→15, totalScore: 8→35

### Цветовая схема
- Primary: amber-500 (сохранена)
- Новые акценты: blue-500 (предлоги), purple-500 (состояния), rose-500 (SER)
- Следует Fiesta Standard v1.2

## Проверка

- ✅ Сборка проекта успешна (`npm run build`)
- ✅ Все 27 страниц сгенерированы корректно
- ✅ Размер бандла в норме (6.17 kB)
- ✅ 20 CW упражнений интегрированы с прогрессом
- ✅ 15 HW упражнений на каждый вариант

## Коммит
```
feat(spa_estar): expand lesson from 4 to 20 CW and 15 HW exercises

Theory additions:
- Add prepositions of place (en, sobre, debajo de, al lado de, etc.)
- Add temporary states (emotions and physical states)
- Add SER vs ESTAR with adjectives that change meaning
- Expand Las Reglas with 3 detailed rules

Classwork expansion (4→20):
- Block 1: ESTAR conjugation (6 dropdown exercises)
- Block 2: SER vs ESTAR (6 dropdown exercises)
- Block 3: Prepositions of place (5 dropdown exercises)
- Block 4: Translation from Russian (3 text input exercises)

Homework expansion (4→15 per variant):
- 5 ESTAR conjugation exercises
- 5 SER vs ESTAR exercises
- 3 prepositions exercises
- 2 translation exercises

Metadata update:
- totalCW: 4→20, totalHW: 4→15, totalScore: 8→35
```

## Педагогическая ценность

После расширения студент получает:
1. **Полное понимание спряжения ESTAR** — 6 упражнений на все формы
2. **Четкое различие SER vs ESTAR** — 6 упражнений с контрастными парами
3. **Практику предлогов места** — 5 упражнений + теория с 8 предлогами
4. **Навык перевода** — 3 упражнения на активное использование
5. **Понимание временных состояний** — теория + примеры

Урок теперь соответствует важности темы ESTAR для уровня A1.

## Статус
**Готово и задеплоено.** Урок ESTAR расширен с 4 до 20 CW и с 4 до 15 HW упражнений.
