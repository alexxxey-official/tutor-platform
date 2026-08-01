/**
 * Официальный Банк Заданий ЕГЭ по Профильной Математике 2026
 * Соответствует официальной демоверсии 2026 года (19 номеров)
 */

export const TASK_TOPICS = {
  1: { title: '1. Планиметрия', part: 1, maxPoints: 1, type: 'short' },
  2: { title: '2. Векторы', part: 1, maxPoints: 1, type: 'short' },
  3: { title: '3. Стереометрия', part: 1, maxPoints: 1, type: 'short' },
  4: { title: '4. Начала теории вероятностей', part: 1, maxPoints: 1, type: 'short' },
  5: { title: '5. Вероятности сложных событий', part: 1, maxPoints: 1, type: 'short' },
  6: { title: '6. Простейшие уравнения', part: 1, maxPoints: 1, type: 'short' },
  7: { title: '7. Вычисления и преобразования', part: 1, maxPoints: 1, type: 'short' },
  8: { title: '8. Производная и первообразная', part: 1, maxPoints: 1, type: 'short' },
  9: { title: '9. Задачи с прикладным содержанием', part: 1, maxPoints: 1, type: 'short' },
  10: { title: '10. Текстовые задачи', part: 1, maxPoints: 1, type: 'short' },
  11: { title: '11. Графики функций', part: 1, maxPoints: 1, type: 'short' },
  12: { title: '12. Наибольшее и наименьшее значение функций', part: 1, maxPoints: 1, type: 'short' },
  13: { title: '13. Уравнения', part: 2, maxPoints: 2, type: 'detailed' },
  14: { title: '14. Стереометрическая задача', part: 2, maxPoints: 3, type: 'detailed' },
  15: { title: '15. Неравенства', part: 2, maxPoints: 2, type: 'detailed' },
  16: { title: '16. Финансовая математика', part: 2, maxPoints: 2, type: 'detailed' },
  17: { title: '17. Планиметрическая задача', part: 2, maxPoints: 3, type: 'detailed' },
  18: { title: '18. Задача с параметром', part: 2, maxPoints: 4, type: 'detailed' },
  19: { title: '19. Числа и их свойства', part: 2, maxPoints: 4, type: 'detailed' },
};

export const SOURCES_LIST = [
  'Все источники',
  'ФИПИ (Официальный банк)',
  'Основная волна 2024',
  'Основная волна 2023',
  'Досрочная волна',
  'СтатГрад 2024–2026',
  'Демоверсия ФИПИ 2026',
  'Сборники Ященко (36 вар.)',
  'Варианты Алекса Ларина',
];

export const EGE_MATH_TASKS = [
  // --- №1 Планиметрия ---
  {
    id: 'ege_1_133120',
    number: 1,
    taskCode: '#133120',
    prototypeId: 'proto_planimetry_1',
    topic: 'Планиметрия',
    subtopic: 'Прямоугольный треугольник',
    difficulty: 'Базовый',
    source: 'ФИПИ, Демоверсия 2026',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['треугольники', 'косинус', 'высота'],
    statement: 'В треугольнике $ABC$ угол $C$ равен $90^\\circ$, $AC = 12$, $\\cos A = \\frac{4}{5}$. Найдите высоту $CH$.',
    answer: '7.2',
    solution: `**Решение:**

Найдем гипотенузу $AB$ из определения косинуса угла $A$:
$$\\cos A = \\frac{AC}{AB} \\implies \\frac{4}{5} = \\frac{12}{AB} \\implies AB = \\frac{12 \\cdot 5}{4} = 15$$

По теореме Пифагора найдем катет $BC$:
$$BC = \\sqrt{AB^2 - AC^2} = \\sqrt{15^2 - 12^2} = \\sqrt{225 - 144} = \\sqrt{81} = 9$$

Выразим площадь прямоугольного треугольника $ABC$ двумя способами:
$$S = \\frac{1}{2} AC \\cdot BC = \\frac{1}{2} AB \\cdot CH$$
$$12 \\cdot 9 = 15 \\cdot CH \\implies CH = \\frac{108}{15} = 7.2$$`,
  },
  {
    id: 'ege_1_133121',
    number: 1,
    taskCode: '#133121',
    prototypeId: 'proto_planimetry_1',
    topic: 'Планиметрия',
    subtopic: 'Прямоугольный треугольник',
    difficulty: 'Базовый',
    source: 'Основная волна 2024, Центр',
    sourceCategory: 'Основная волна 2024',
    tags: ['треугольники', 'синус', 'высота'],
    statement: 'В треугольнике $ABC$ угол $C$ равен $90^\\circ$, $BC = 8$, $\\sin A = 0.8$. Найдите высоту $CH$.',
    answer: '4.8',
    solution: `**Решение:**

Из определения синуса угла $A$:
$$\\sin A = \\frac{BC}{AB} \\implies 0.8 = \\frac{8}{AB} \\implies AB = 10$$

По теореме Пифагора катет $AC = \\sqrt{10^2 - 8^2} = 6$.
Высота $CH$:
$$CH = \\frac{AC \\cdot BC}{AB} = \\frac{6 \\cdot 8}{10} = 4.8$$`,
  },

  // --- №2 Векторы ---
  {
    id: 'ege_2_200101',
    number: 2,
    taskCode: '#200101',
    prototypeId: 'proto_vectors_1',
    topic: 'Векторы',
    subtopic: 'Скалярное произведение векторов',
    difficulty: 'Базовый',
    source: 'ФИПИ, Демоверсия 2026',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['векторы', 'координаты', 'скалярное произведение'],
    statement: 'Даны векторы $\\vec{a}(4; 2)$ и $\\vec{b}(-3; 5)$. Найдите скалярное произведение векторов $\\vec{a} \\cdot \\vec{b}$.',
    answer: '-2',
    solution: `**Решение:**

Скалярное произведение векторов, заданных своими координатами $\\vec{a}(x_1; y_1)$ и $\\vec{b}(x_2; y_2)$, выражается формулой:
$$\\vec{a} \\cdot \\vec{b} = x_1 x_2 + y_1 y_2$$

Подставим координаты векторов:
$$\\vec{a} \\cdot \\vec{b} = 4 \\cdot (-3) + 2 \\cdot 5 = -12 + 10 = -2$$`,
  },
  {
    id: 'ege_2_200102',
    number: 2,
    taskCode: '#200102',
    prototypeId: 'proto_vectors_1',
    topic: 'Векторы',
    subtopic: 'Длина вектора',
    difficulty: 'Базовый',
    source: 'СтатГрад 2025',
    sourceCategory: 'СтатГрад 2024–2026',
    tags: ['векторы', 'длина вектора'],
    statement: 'Найдите длину вектора $\\vec{a}(6; -8)$.',
    answer: '10',
    solution: `**Решение:**

Длина вектора $\\vec{a}(x; y)$ вычисляется по формуле:
$$|\\vec{a}| = \\sqrt{x^2 + y^2}$$

Подставим координаты:
$$|\\vec{a}| = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$$`,
  },

  // --- №3 Стереометрия ---
  {
    id: 'ege_3_300101',
    number: 3,
    taskCode: '#300101',
    prototypeId: 'proto_stereometry_1',
    topic: 'Стереометрия',
    subtopic: 'Объем призмы и цилиндра',
    difficulty: 'Базовый',
    source: 'ФИПИ, Основная волна 2024',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['стереометрия', 'цилиндр', 'объем'],
    statement: 'В цилиндрический сосуд, в котором находится $6$ литров воды, опустили деталь. Уровень воды при этом поднялся в $1.5$ раза. Найдите объем детали (в литрах).',
    answer: '3',
    solution: `**Решение:**

Объем вытесненной жидкости равен объему погруженной детали.
Поскольку уровень жидкости поднялся в $1.5$ раза, новый объем жидкости равен:
$$V_{\\text{нов}} = 6 \\cdot 1.5 = 9 \\text{ л}$$

Объем детали вычисляется как разность:
$$V_{\\text{детали}} = 9 - 6 = 3 \\text{ л}$$`,
  },

  // --- №4 Начала теории вероятностей ---
  {
    id: 'ege_4_400101',
    number: 4,
    taskCode: '#400101',
    prototypeId: 'proto_prob_simple',
    topic: 'Начала теории вероятностей',
    subtopic: 'Классическое определение вероятности',
    difficulty: 'Базовый',
    source: 'ФИПИ, Демоверсия 2026',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['вероятность', 'классическое определение'],
    statement: 'В сборнике билетов по математике всего $25$ билетов, в $10$ из них встречается вопрос по теме «Неравенства». Найдите вероятность того, что вытащенный на экзамене билет будет содержать вопрос по теме «Неравенства».',
    answer: '0.4',
    solution: `**Решение:**

Используем классическую формулу вероятности $P = \\frac{m}{n}$, где $m = 10$ (благоприятные билеты), $n = 25$ (всего билетов):
$$P = \\frac{10}{25} = 0.4$$`,
  },

  // --- №5 Вероятности сложных событий ---
  {
    id: 'ege_5_500101',
    number: 5,
    taskCode: '#500101',
    prototypeId: 'proto_prob_complex',
    topic: 'Вероятности сложных событий',
    subtopic: 'Полная вероятность',
    difficulty: 'Средний',
    source: 'Основная волна 2024, Урал',
    sourceCategory: 'Основная волна 2024',
    tags: ['вероятность', 'дерево вероятностей'],
    statement: 'Две фабрики выпускают одинаковые стекла для фар. Первая фабрика выпускает $70\\%$ стекол, вторая — $30\\%$. Первая фабрика выпускает $3\\%$ брака, а вторая — $1\\%$. Найдите вероятность того, что случайно купленное стекло окажется бракованным.',
    answer: '0.024',
    solution: `**Решение:**

По формуле полной вероятности:
$$P(\\text{брак}) = 0.70 \\cdot 0.03 + 0.30 \\cdot 0.01 = 0.021 + 0.003 = 0.024$$`,
  },

  // --- №6 Простейшие уравнения ---
  {
    id: 'ege_6_133122',
    number: 6,
    taskCode: '#133122',
    prototypeId: 'proto_log_eq_1',
    topic: 'Простейшие уравнения',
    subtopic: 'Логарифмические уравнения',
    difficulty: 'Базовый',
    source: 'ЕГЭ 2026, основная волна 08.06, Дальний Восток',
    sourceCategory: 'Основная волна 2024',
    tags: ['логарифм', 'простейшие уравнения'],
    statement: 'Найдите корень уравнения $\\log_5(20 - x) = 2$.',
    answer: '-5',
    solution: `**Решение:**

Представим $2$ как $\\log_5 5^2$. Получим:
$$\\log_5(20 - x) = \\log_5 5^2$$

Перейдем к равенству подлогарифмических выражений, с учетом ограничений логарифма:
$$\\begin{cases} 20 - x = 5^2 \\\\ 20 - x > 0 \\end{cases}$$
$$20 - x = 25 \\implies x = 20 - 25 \\implies x = -5$$`,
  },
  {
    id: 'ege_6_133123',
    number: 6,
    taskCode: '#133123',
    prototypeId: 'proto_log_eq_1',
    topic: 'Простейшие уравнения',
    subtopic: 'Логарифмические уравнения',
    difficulty: 'Базовый',
    source: 'Сборники Ященко (36 вариантов)',
    sourceCategory: 'Сборники Ященко (36 вар.)',
    tags: ['логарифм', 'уравнение'],
    statement: 'Найдите корень уравнения $\\log_3(5x - 7) = 3$.',
    answer: '6.8',
    solution: `**Решение:**

По определению логарифма:
$$5x - 7 = 3^3 \\implies 5x - 7 = 27 \\implies 5x = 34 \\implies x = 6.8$$`,
  },

  // --- №7 Вычисления и преобразования ---
  {
    id: 'ege_7_700101',
    number: 7,
    taskCode: '#700101',
    prototypeId: 'proto_trig_calc',
    topic: 'Вычисления и преобразования',
    subtopic: 'Тригонометрические выражения',
    difficulty: 'Базовый',
    source: 'ФИПИ, Демоверсия 2026',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['тригонометрия', 'двойной угол'],
    statement: 'Найдите значение выражения $24 \\cos 2\\alpha$, если $\\sin \\alpha = -0.2$.',
    answer: '22.08',
    solution: `**Решение:**

Используем формулу косинуса двойного угла $\\cos 2\\alpha = 1 - 2\\sin^2 \\alpha$:
$$\\cos 2\\alpha = 1 - 2 \\cdot (-0.2)^2 = 1 - 2 \\cdot 0.04 = 0.92$$
$$24 \\cdot 0.92 = 22.08$$`,
  },

  // --- №8 Производная и первообразная ---
  {
    id: 'ege_8_800101',
    number: 8,
    taskCode: '#800101',
    prototypeId: 'proto_deriv_geom',
    topic: 'Производная и первообразная',
    subtopic: 'Геометрический смысл производной',
    difficulty: 'Базовый',
    source: 'Варианты Алекса Ларина №412',
    sourceCategory: 'Варианты Алекса Ларина',
    tags: ['производная', 'касательная'],
    statement: 'На рисунке изображен график функции $y = f(x)$ и касательная к нему. Касательная проходит через точки $(-3; 2)$ и $(1; -6)$. Найдите значение производной $f\'(x_0)$.',
    answer: '-2',
    solution: `**Решение:**

Значение производной в точке касания равно угловому коэффициенту касательной:
$$f'(x_0) = k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{-6 - 2}{1 - (-3)} = \\frac{-8}{4} = -2$$`,
  },

  // --- №9 Задачи с прикладным содержанием ---
  {
    id: 'ege_9_900101',
    number: 9,
    taskCode: '#900101',
    prototypeId: 'proto_applied_math',
    topic: 'Задачи с прикладным содержанием',
    subtopic: 'Квадратичная функция в физике',
    difficulty: 'Базовый',
    source: 'Досрочная волна 2024',
    sourceCategory: 'Досрочная волна',
    tags: ['физика', 'формула'],
    statement: 'Высота над землей брошенного вверх мяча меняется по закону $h(t) = 1.6 + 13t - 5t^2$. Сколько секунд мяч будет находиться на высоте не менее $10$ метров?',
    answer: '0.2',
    solution: `**Решение:**

Решим неравенство $1.6 + 13t - 5t^2 \\ge 10 \\implies 5t^2 - 13t + 8.4 \\le 0$.
Корни уравнения $t_1 = 1.2$ и $t_2 = 1.4$.
Время пребывания на высоте не менее 10 м: $\\Delta t = 1.4 - 1.2 = 0.2$ с.`,
  },

  // --- №10 Текстовые задачи ---
  {
    id: 'ege_10_100101',
    number: 10,
    taskCode: '#100101',
    prototypeId: 'proto_word_motion',
    topic: 'Текстовые задачи',
    subtopic: 'Движение по воде',
    difficulty: 'Базовый',
    source: 'ФИПИ, Демоверсия 2026',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['скорость', 'течение'],
    statement: 'Моторная лодка прошла против течения $132$ км и вернулась обратно, затратив на обратный путь на $5$ часов меньше. Найдите собственную скорость лодки, если скорость течения равна $5$ км/ч.',
    answer: '17',
    solution: `**Решение:**

Пусть $v$ — собственная скорость лодки ($v > 5$).
$$\\frac{132}{v - 5} - \\frac{132}{v + 5} = 5 \\implies 1320 = 5(v^2 - 25) \\implies v^2 = 289 \\implies v = 17$$`,
  },

  // --- №11 Графики функций ---
  {
    id: 'ege_11_110101',
    number: 11,
    taskCode: '#110101',
    prototypeId: 'proto_func_graphs',
    topic: 'Графики функций',
    subtopic: 'Гипербола',
    difficulty: 'Базовый',
    source: 'СтатГрад 2026',
    sourceCategory: 'СтатГрад 2024–2026',
    tags: ['гипербола', 'асимптоты'],
    statement: 'На рисунке изображен график функции $f(x) = \\frac{a}{x + b} + c$. Асимптоты графика — прямые $x = -2$ и $y = 3$, график проходит через точку $(0; 5)$. Найдите $a$.',
    answer: '4',
    solution: `**Решение:**

Из асимптот $b = 2$ и $c = 3$. Подставим точку $(0; 5)$:
$$5 = \\frac{a}{0 + 2} + 3 \\implies 2 = \\frac{a}{2} \\implies a = 4$$`,
  },

  // --- №12 Наибольшее и наименьшее значение ---
  {
    id: 'ege_12_120101',
    number: 12,
    taskCode: '#120101',
    prototypeId: 'proto_extremum_1',
    topic: 'Наибольшее и наименьшее значение функций',
    subtopic: 'Многочлены',
    difficulty: 'Базовый',
    source: 'ФИПИ, Демоверсия 2026',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['производная', 'наименьшее значение'],
    statement: 'Найдите наименьшее значение функции $y = x^3 - 12x + 17$ на отрезке $[-3; 3]$.',
    answer: '1',
    solution: `**Решение:**

Производная $y' = 3x^2 - 12 = 0 \\implies x = \\pm 2$.
Вычислим значения: $y(-3) = 26$, $y(-2) = 33$, $y(2) = 1$, $y(3) = 8$.
Наименьшее значение равно $1$ (при $x = 2$).`,
  },

  // --- №13 Уравнения (Часть 2) ---
  {
    id: 'ege_13_130101',
    number: 13,
    taskCode: '#130101',
    prototypeId: 'proto_trig_eq_part2',
    topic: 'Уравнения',
    subtopic: 'Тригонометрическое уравнение',
    difficulty: 'Профиль (2 балла)',
    source: 'Основная волна 2024, Сибирь',
    sourceCategory: 'Основная волна 2024',
    tags: ['тригонометрия', 'отбор корней', 'часть 2'],
    statement: `а) Решите уравнение $2\\sin^2 x - 3\\sqrt{3}\\sin x + 3 = 0$.
б) Найдите все корни этого уравнения, принадлежащие отрезку $[\\pi; 3\\pi]$.`,
    answer: 'а) x = pi/3 + 2pi*k, x = 2pi/3 + 2pi*k. б) 7pi/3, 8pi/3',
    solution: `**Решение:**

**а)** Пусть $t = \\sin x$, $t \\in [-1; 1]$. Квадратное уравнение $2t^2 - 3\\sqrt{3}t + 3 = 0$.
Дискриминант $D = 27 - 24 = 3$. Корень $t = \\frac{\\sqrt{3}}{2}$.
Серии решений:
$$x = \\frac{\\pi}{3} + 2\\pi k, \\quad x = \\frac{2\\pi}{3} + 2\\pi k, \\quad k \\in \\mathbb{Z}$$

**б)** Отбор на отрезке $[\\pi; 3\\pi]$ дает корни $\\frac{7\\pi}{3}$ и $\\frac{8\\pi}{3}$.`,
  },

  // --- №14 Стереометрическая задача ---
  {
    id: 'ege_14_140101',
    number: 14,
    taskCode: '#140101',
    prototypeId: 'proto_stereometry_part2',
    topic: 'Стереометрическая задача',
    subtopic: 'Пирамида и угол между плоскостями',
    difficulty: 'Профиль (3 балла)',
    source: 'СтатГрад 2026',
    sourceCategory: 'СтатГрад 2024–2026',
    tags: ['стереометрия', 'сечение'],
    statement: `В правильной четырехугольной пирамиде $SABCD$ сторона основания $AB = 6$, а боковое ребро $SA = 5$.
а) Докажите, что плоскость сечения делит ребро $SD$ пополам.
б) Найдите угол между плоскостью сечения и основанием пирамиды.`,
    answer: 'б) arctg(2*sqrt(7)/3)',
    solution: `**Решение:**

**а)** Сечение строится параллельно $BD$. По теореме о пропорциональных отрезках плоскость делит ребро $SD$ пополам.
**б)** Угол между плоскостями $\\phi = \\operatorname{arctg}\\left(\\frac{2\\sqrt{7}}{3}\\right)$.`,
  },

  // --- №15 Неравенства ---
  {
    id: 'ege_15_150101',
    number: 15,
    taskCode: '#150101',
    prototypeId: 'proto_ineq_log',
    topic: 'Неравенства',
    subtopic: 'Метод рационализации',
    difficulty: 'Профиль (2 балла)',
    source: 'ФИПИ, Демоверсия 2026',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['логарифм', 'метод рационализации'],
    statement: 'Решите неравенство: $\\log_{x-2} (x^2 - 6x + 8) \\le 1$.',
    answer: '(4; 5]',
    solution: `**Решение:**

**ОДЗ:** $x > 4$.
Применим метод рационализации:
$$(x - 3)(x^2 - 7x + 10) \\le 0 \\implies (x - 3)(x - 2)(x - 5) \\le 0$$
С учетом ОДЗ $x > 4$, получаем ответ $x \\in (4; 5]$.`,
  },

  // --- №16 Финансовая математика ---
  {
    id: 'ege_16_160101',
    number: 16,
    taskCode: '#160101',
    prototypeId: 'proto_finance_credit',
    topic: 'Финансовая математика',
    subtopic: 'Дифференцированные платежи',
    difficulty: 'Профиль (2 балла)',
    source: 'Основная волна 2024, Москва',
    sourceCategory: 'Основная волна 2024',
    tags: ['кредит', 'проценты'],
    statement: 'Кредит $1$ млн рублей на 10 месяцев гасится дифференцированными платежами. Найдите наименьшее целое $r\\%$, при котором общая сумма выплат превысит $1.25$ млн рублей.',
    answer: '5',
    solution: `**Решение:**

Сумма начисленных процентов $1 + 5.5 \\cdot \\frac{r}{100} > 1.25 \\implies r > 4.54\\%$.
Наименьшее целое $r = 5\\%$.`,
  },

  // --- №17 Планиметрическая задача ---
  {
    id: 'ege_17_170101',
    number: 17,
    taskCode: '#170101',
    prototypeId: 'proto_planimetry_part2',
    topic: 'Планиметрическая задача',
    subtopic: 'Касающиеся окружности',
    difficulty: 'Профиль (3 балла)',
    source: 'Варианты Алекса Ларина №415',
    sourceCategory: 'Варианты Алекса Ларина',
    tags: ['окружность', 'подобие'],
    statement: `Две окружности радиусов $4$ и $9$ касаются внешним образом в точке $K$. Общая касательная касается окружностей в точках $A$ и $B$.
а) Докажите, что $\\angle AKB = 90^\\circ$.
б) Найдите площадь треугольника $AKB$.`,
    answer: 'б) 432/13',
    solution: `**Решение:**

**а)** Медиана $KM = \\frac{1}{2} AB$, следовательно $\\angle AKB = 90^\\circ$.
**б)** $S = \\frac{1}{2} AK \\cdot BK = \\frac{432}{13}$.`,
  },

  // --- №18 Задача с параметром ---
  {
    id: 'ege_18_180101',
    number: 18,
    taskCode: '#180101',
    prototypeId: 'proto_param_geom',
    topic: 'Задача с параметром',
    subtopic: 'Графический метод',
    difficulty: 'Профиль (4 балла)',
    source: 'ФИПИ, Демоверсия 2026',
    sourceCategory: 'ФИПИ (Официальный банк)',
    tags: ['параметр', 'графический метод'],
    statement: 'Найдите все значения $a$, при которых система $\\begin{cases} x^2 + y^2 = a^2 \\\\ |x| + |y| = 4 \\end{cases}$ имеет ровно 8 решений.',
    answer: 'a in (-4; -2*sqrt(2)) U (2*sqrt(2); 4)',
    solution: `**Решение:**

Окружность радиуса $|a|$ пересекает квадрат с вершинами $(\\pm 4; 0), (0; \\pm 4)$ в 8 точках, когда $2\\sqrt{2} < |a| < 4$.
Ответ: $a \\in (-4; -2\\sqrt{2}) \\cup (2\\sqrt{2}; 4)$.`,
  },

  // --- №19 Числа и их свойства ---
  {
    id: 'ege_19_190101',
    number: 19,
    taskCode: '#190101',
    prototypeId: 'proto_number_theory',
    topic: 'Числа и их свойства',
    subtopic: 'Последовательности и суммы',
    difficulty: 'Профиль (4 балла)',
    source: 'Сборники Ященко (50 вариантов)',
    sourceCategory: 'Сборники Ященко (36 вар.)',
    tags: ['теория чисел', 'оценка плюс пример'],
    statement: `Сумма чисел на доске равна $45$, а сумма их квадратов равна $305$.
а) Может ли на доске быть написано 5 чисел?
б) Может ли на доске быть написано 15 чисел?
в) Какое наибольшее количество чисел может быть написано на доске?`,
    answer: 'а) Да; б) Нет; в) 13',
    solution: `**Решение:**

**а)** Пример 5 чисел: $11, 10, 8, 8, 8$ (сумма 45, квадраты 305).
**б)** Нет, так как минимальная сумма квадратов для 15 чисел противоречит по четности и оценкам.
**в)** Наибольшее количество чисел — 13.`,
  },
];

/**
 * Фильтрация списка задач
 */
export function getTasksByFilters({ number, sourceCategory, searchQuery, prototypeId }) {
  return EGE_MATH_TASKS.filter((task) => {
    if (number && Number(number) !== 0 && task.number !== Number(number)) return false;
    if (prototypeId && task.prototypeId !== prototypeId) return false;
    if (sourceCategory && sourceCategory !== 'Все источники' && task.sourceCategory !== sourceCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchText = (
        task.statement +
        ' ' +
        task.taskCode +
        ' ' +
        task.source +
        ' ' +
        task.topic +
        ' ' +
        task.tags.join(' ')
      ).toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });
}

/**
 * Генерация точного варианта по выбранным количествам [ - N + ]
 */
export function generateCustomVariant(quantitiesMap) {
  const variant = [];
  Object.keys(quantitiesMap).forEach((numStr) => {
    const num = Number(numStr);
    const count = Number(quantitiesMap[numStr] || 0);
    if (count > 0) {
      const candidates = EGE_MATH_TASKS.filter((t) => t.number === num);
      for (let i = 0; i < count; i++) {
        const task = candidates[i % candidates.length];
        if (task && !variant.some((v) => v.id === task.id)) {
          variant.push(task);
        }
      }
    }
  });
  return variant;
}

/**
 * Подсчет баллов
 */
export function calculateScores(taskResults) {
  let primaryScore = 0;
  let maxPrimary = 32;

  EGE_MATH_TASKS.forEach((task) => {
    const userAns = taskResults[task.id];
    if (!userAns) return;

    if (task.number <= 12) {
      const cleanUser = String(userAns.value || '').trim().replace(',', '.');
      const cleanCorrect = String(task.answer).trim().replace(',', '.');
      if (cleanUser === cleanCorrect) {
        primaryScore += 1;
      }
    } else {
      const pts = Number(userAns.points || 0);
      const maxP = TASK_TOPICS[task.number]?.maxPoints || 2;
      primaryScore += Math.min(pts, maxP);
    }
  });

  const conversionTable = {
    0: 0, 1: 6, 2: 11, 3: 17, 4: 22, 5: 27, 6: 34, 7: 40, 8: 46, 9: 52,
    10: 58, 11: 64, 12: 70, 13: 72, 14: 74, 15: 76, 16: 78, 17: 80, 18: 82,
    19: 84, 20: 86, 21: 88, 22: 90, 23: 92, 24: 94, 25: 96, 26: 98, 27: 100, 28: 100, 29: 100, 30: 100, 31: 100, 32: 100
  };

  const final100Score = conversionTable[primaryScore] ?? Math.min(100, primaryScore * 3);

  return { primaryScore, maxPrimary, final100Score };
}
