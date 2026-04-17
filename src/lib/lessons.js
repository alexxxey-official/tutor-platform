export const LESSONS = {
  spanish: [
    {
      id: 'spa_intro',
      title: 'Введение: Карта грамматики',
      subject: 'Español',
      path: '/lessons/spanish/intro',
      color: '#e63946',
      totalCW: 0,
      totalHW: 0,
    },
    {
      id: 'spa_phonetics',
      title: 'Урок 1: Правила чтения (Фонетика)',
      subject: 'Español',
      path: '/lessons/spanish/phonetics',
      color: '#f4a261',
      totalCW: 3,
      totalHW: 2,
    },
    {
      id: 'spa_ser',
      title: 'Урок 2: Местоимения и глагол SER',
      subject: 'Español',
      path: '/lessons/spanish/ser',
      color: '#e63946',
      totalCW: 5,
      totalHW: 5,
    },
    {
      id: 'spa_articles',
      title: 'Урок 3: Артикли и Род',
      subject: 'Español',
      path: '/lessons/spanish/articles',
      color: '#e63946',
      totalCW: 5,
      totalHW: 5,
    },
    {
      id: 'spa_tener',
      title: 'Урок 4: Глагол TENER',
      subject: 'Español',
      path: '/lessons/spanish/tener',
      color: '#f4a261',
      totalCW: 7,
      totalHW: 8,
    },
    {
      id: 'spa_verbs',
      title: 'Урок 5: Правильные глаголы',
      subject: 'Español',
      path: '/lessons/spanish/verbs',
      color: '#f4a261',
      totalCW: 7,
      totalHW: 8,
    },
    {
      id: 'spa_estar',
      title: 'Урок 6: ESTAR и Предлоги',
      subject: 'Español',
      path: '/lessons/spanish/estar',
      color: '#f4a261',
      totalCW: 4,
      totalHW: 4,
    },
    {
      id: 'spa_questions',
      title: 'Урок 7: Вопросы и Порядок слов',
      subject: 'Español',
      path: '/lessons/spanish/questions',
      color: '#f4a261',
      totalCW: 10,
      totalHW: 13,
    },
    {
      id: 'spa_family',
      title: 'Урок 8: Семья и Внешность',
      subject: 'Español',
      path: '/lessons/spanish/family',
      color: '#f4a261',
      totalCW: 10,
      totalHW: 15,
    },
    {
      id: 'spa_gustar',
      title: 'Урок 9: Глагол GUSTAR и Еда',
      subject: 'Español',
      path: '/lessons/spanish/gustar',
      color: '#f4a261',
      totalCW: 10,
      totalHW: 15,
    },
    {
      id: 'spa_verbs_trainer',
      title: 'Тренажёр: 50 глаголов',
      subject: 'Español',
      path: '/lessons/spanish/verbs-trainer',
      color: '#e63946',
      totalCW: 0,
      totalHW: 50,
    },
    {
      id: 'spa_vocab',
      title: 'Мега-словарь A1',
      subject: 'Español',
      path: '/lessons/spanish',
      color: '#2a9d8f',
      totalCW: 0,
      totalHW: 0,
    },
    {
      id: 'spa_listening',
      title: 'Интерактивный Диктант',
      subject: 'Español',
      path: '/lessons/spanish/listening',
      color: '#e63946',
      totalCW: 0,
      totalHW: 5,
    },
    {
      id: 'spa_reading_intro',
      title: 'Чтение: Карта текстов',
      subject: 'Español',
      path: '/lessons/spanish/reading/intro',
      color: '#f4a261',
      totalCW: 0,
      totalHW: 0,
    },
    {
      id: 'spa_reading_hola',
      title: 'Чтение: Hola, me llamo...',
      subject: 'Español',
      path: '/lessons/spanish/reading/hola',
      color: '#f4a261',
      totalCW: 2,
      totalHW: 3,
    }
  ],
  english: [
    {
      id: 'eng_nobody',
      title: 'Nobody & Anyone (B1)',
      subject: 'English',
      path: '/lessons/english/indefinite-pronouns',
      color: '#2a9d8f',
      totalCW: 5,
      totalHW: 5,
    },
    {
      id: 'eng_passive',
      title: 'Passive Voice (B1-B2)',
      subject: 'English',
      path: '/lessons/english/passive-voice',
      color: '#2a9d8f',
      totalCW: 8,
      totalHW: 15,
    }
  ],
  math: [
    {
      id: 'math_quadratic',
      title: 'Квадратные уравнения',
      subject: 'Math',
      path: '/lessons/math/quadratic-equations',
      color: '#e63946',
      totalCW: 3,
      totalHW: 3,
    },
    {
      id: 'math_inequal',
      title: 'Неравенства',
      subject: 'Math',
      path: '/lessons/math/inequalities',
      color: '#e63946',
      totalCW: 6,
      totalHW: 8,
    }
  ],
  physics: [
    {
      id: 'phys_dc',
      title: 'Постоянный ток (DC)',
      subject: 'Physics',
      path: '/lessons/physics/dc-circuits',
      color: '#9333ea',
      totalCW: 2,
      totalHW: 2,
    }
  ]
};

// Функция для поиска урока по ID
export const getLessonById = (id) => {
  for (const subject of Object.keys(LESSONS)) {
    const lesson = LESSONS[subject].find(l => l.id === id);
    if (lesson) return lesson;
  }
  return null;
};
