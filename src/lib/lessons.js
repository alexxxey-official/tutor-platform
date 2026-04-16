export const LESSONS = {
  spanish: [
    {
      id: 'spa_intro',
      title: 'Введение: Карта грамматики',
      subject: 'Español',
      path: '/lessons/spanish/intro',
      color: '#e63946',
      totalScore: 0, // Теория, нет баллов
    },
    {
      id: 'spa_phonetics',
      title: 'Урок 1: Правила чтения (Фонетика)',
      subject: 'Español',
      path: '/lessons/spanish/phonetics',
      color: '#f4a261',
      totalScore: 5,
    },
    {
      id: 'spa_ser',
      title: 'Урок 2: Местоимения и глагол SER',
      subject: 'Español',
      path: '/lessons/spanish/ser',
      color: '#e63946',
      totalScore: 10,
    },
    {
      id: 'spa_articles',
      title: 'Урок 3: Артикли и Род',
      subject: 'Español',
      path: '/lessons/spanish/articles',
      color: '#e63946',
      totalScore: 10,
    },
    {
      id: 'spa_tener',
      title: 'Урок 4: Глагол TENER',
      subject: 'Español',
      path: '/lessons/spanish/tener',
      color: '#f4a261',
      totalScore: 15,
    },
    {
      id: 'spa_verbs',
      title: 'Урок 5: Правильные глаголы',
      subject: 'Español',
      path: '/lessons/spanish/verbs',
      color: '#f4a261',
      totalScore: 15,
    },
    {
      id: 'spa_estar',
      title: 'Урок 6: ESTAR и Предлоги',
      subject: 'Español',
      path: '/lessons/spanish/estar',
      color: '#f4a261',
      totalScore: 8,
    },
    {
      id: 'spa_questions',
      title: 'Урок 7: Вопросы и Порядок слов',
      subject: 'Español',
      path: '/lessons/spanish/questions',
      color: '#f4a261',
      totalScore: 23,
    },
    {
      id: 'spa_family',
      title: 'Урок 8: Семья и Внешность',
      subject: 'Español',
      path: '/lessons/spanish/family',
      color: '#f4a261',
      totalScore: 25,
    },
    {
      id: 'spa_gustar',
      title: 'Урок 9: Глагол GUSTAR и Еда',
      subject: 'Español',
      path: '/lessons/spanish/gustar',
      color: '#f4a261',
      totalScore: 25,
    },
    {
      id: 'spa_verbs_trainer',
      title: 'Тренажёр: 50 глаголов',
      subject: 'Español',
      path: '/lessons/spanish/verbs-trainer',
      color: '#e63946',
      totalScore: 50,
    },
    {
      id: 'spa_vocab',
      title: 'Мега-словарь A1',
      subject: 'Español',
      path: '/lessons/spanish',
      color: '#2a9d8f',
      totalScore: 0,
    },
    {
      id: 'spa_listening',
      title: 'Интерактивный Диктант',
      subject: 'Español',
      path: '/lessons/spanish/listening',
      color: '#e63946',
      totalScore: 5,
    },
    {
      id: 'spa_reading_intro',
      title: 'Чтение: Карта текстов',
      subject: 'Español',
      path: '/lessons/spanish/reading/intro',
      color: '#f4a261',
      totalScore: 0,
    },
    {
      id: 'spa_reading_hola',
      title: 'Чтение: Hola, me llamo...',
      subject: 'Español',
      path: '/lessons/spanish/reading/hola',
      color: '#f4a261',
      totalScore: 5,
    }
  ],
  english: [
    {
      id: 'eng_nobody',
      title: 'Nobody & Anyone (B1)',
      subject: 'English',
      path: '/lessons/english/indefinite-pronouns',
      color: '#2a9d8f',
      totalScore: 10,
    },
    {
      id: 'eng_passive',
      title: 'Passive Voice (B1-B2)',
      subject: 'English',
      path: '/legacy-lessons/english/english_passive_voice.html',
      color: '#2a9d8f',
      totalScore: 0, // Legacy
    }
  ],
  math: [
    {
      id: 'math_quadratic',
      title: 'Квадратные уравнения',
      subject: 'Math',
      path: '/legacy-lessons/math/quadratic_equations.html',
      color: '#e63946',
      totalScore: 0,
    },
    {
      id: 'math_inequal',
      title: 'Неравенства',
      subject: 'Math',
      path: '/legacy-lessons/math/inequalities.html',
      color: '#e63946',
      totalScore: 0,
    }
  ],
  physics: [
    {
      id: 'phys_dc',
      title: 'Постоянный ток (DC)',
      subject: 'Physics',
      path: '/legacy-lessons/physics/physics_dc.html',
      color: '#9333ea', // Purple
      totalScore: 0,
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
