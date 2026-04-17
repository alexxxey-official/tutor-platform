'use client'
import { useState } from 'react'
import Exercise from '../../../../components/Exercise'
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar'
import { useLessonProgress } from '../../../../hooks/useLessonProgress'
import { LESSONS } from '../../../../lib/lessons'
import { RefreshCcw, Star, BookOpen, GraduationCap } from 'lucide-react'
import confetti from 'canvas-confetti'

const CW_DATA = [
  {
    id: 'cw_1',
    type: 'text',
    problem: 'Решить уравнение: \\(x^2 - 9 = 0\\)',
    correctAnswer: '3,-3',
    hint: 'Перенеси 9 вправо: \\(x^2 = 9\\). Какое число в квадрате даёт 9?',
    solution: 'Переносим 9 в правую часть: \\(x^2 = 9\\). Извлекаем квадратный корень: \\(x = \\pm \\sqrt{9}\\). Получаем два корня: \\(3\\) и \\(-3\\).'
  },
  {
    id: 'cw_2',
    type: 'text',
    problem: 'Решить уравнение: \\(x^2 - 7x + 10 = 0\\)',
    correctAnswer: '2,5',
    hint: 'По теореме Виета: сумма равна 7, произведение 10.',
    solution: 'Используем дискриминант: \\(D = (-7)^2 - 4 \\cdot 1 \\cdot 10 = 49 - 40 = 9\\). <br /> \\(x = \\frac{7 \\pm 3}{2}\\). <br /> \\(x_1 = 5, x_2 = 2\\).'
  },
  {
    id: 'cw_3',
    type: 'text',
    problem: 'Решить уравнение: \\(2x^2 - 3x - 5 = 0\\)',
    correctAnswer: '2.5,-1',
    hint: '\\(D = (-3)^2 - 4(2)(-5) = 9 + 40 = 49\\).',
    solution: '\\(D = 49\\), корень из \\(D\\) равен 7. <br /> \\(x = \\frac{3 \\pm 7}{4}\\). <br /> \\(x_1 = 2.5, x_2 = -1\\).'
  }
];

const HW_VARIANTS = {
  1: [
    {
      id: 'hw_1',
      type: 'text',
      problem: 'Решить уравнение: \\(x^2 + 5x = 0\\)',
      correctAnswer: '0,-5',
      hint: 'Вынеси \\(x\\) за скобку: \\(x(x+5)=0\\).'
    },
    {
      id: 'hw_2',
      type: 'text',
      problem: 'Решить уравнение: \\(x^2 + 6x + 9 = 0\\)',
      correctAnswer: '-3',
      hint: 'Используй формулу квадрата суммы: \\((x+3)^2 = 0\\).'
    },
    {
      id: 'hw_3',
      type: 'text',
      problem: '★ Решить: \\(x + \\frac{4}{x} = 5\\)',
      correctAnswer: '1,4',
      hint: 'Умножь на \\(x\\), чтобы получить квадратное уравнение.'
    }
  ],
  2: [
    {
      id: 'hw_1',
      type: 'text',
      problem: 'Решить уравнение: \\(x^2 - 4x = 0\\)',
      correctAnswer: '0,4',
      hint: 'Вынеси \\(x\\) за скобку: \\(x(x-4)=0\\).'
    },
    {
      id: 'hw_2',
      type: 'text',
      problem: 'Решить уравнение: \\(x^2 - 10x + 25 = 0\\)',
      correctAnswer: '5',
      hint: 'Это полный квадрат: \\((x-5)^2 = 0\\).'
    },
    {
      id: 'hw_3',
      type: 'text',
      problem: '★ Решить: \\(x + \\frac{9}{x} = 6\\)',
      correctAnswer: '3',
      hint: 'Умножь на \\(x\\), получится \\(x^2 - 6x + 9 = 0\\).'
    }
  ]
};

export default function QuadraticEquationsPage() {
  const lessonId = 'math_quadratic';
  const { progress, updateProgress, resetHW, variant, getStats, loading } = useLessonProgress(lessonId, 3, 3);
  const [activeTab, setActiveTab] = useState('theory');

  if (loading) return <div className="p-20 text-center font-mono animate-pulse">Загрузка урока...</div>;

  const cwStats = getStats('cw');
  const hwStats = getStats('hw');

  const handleHWSuccess = (id, attempts, status) => {
    updateProgress(id, 'hw', status, attempts);
    
    // Check if homework is finished and high score
    const newHwStats = getStats('hw'); // This might be slightly stale due to setState, but it's a good proxy
    // In a real app we'd calculate from the new data directly
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#10b981', '#f59e0b']
    });
  };

  // Check for confetti condition when HW is completed
  if (hwStats.isComplete && hwStats.pct >= 85 && !progress.confettiTriggered) {
    triggerConfetti();
    // We would ideally save that confetti was triggered, but for now we just fire it
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      {/* HERO */}
      <div className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-indigo-400 font-bold uppercase tracking-[4px] text-xs mb-4">Mathematics · YR10</div>
          <h1 className="text-5xl font-black mb-6 tracking-tight">Quadratic <span className="text-indigo-400">Equations</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">Квадратные уравнения — фундамент алгебры. Учимся находить корни через дискриминант и теорему Виета.</p>
          
          <div className="flex gap-4 mt-8">
            <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/10 italic">Unit 4 · Equations</div>
            <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20">Active Lesson</div>
          </div>
        </div>
        <div className="absolute right-[-5%] top-[-10%] text-[20rem] font-black text-white/[0.03] select-none pointer-events-none">x²</div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* TABS */}
        <div className="flex gap-2 p-1 bg-slate-200/50 rounded-2xl mt-8 mb-8 sticky top-4 z-40 backdrop-blur-md shadow-sm">
          <button 
            onClick={() => setActiveTab('theory')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'theory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <BookOpen size={18} /> Теория
          </button>
          <button 
            onClick={() => setActiveTab('classwork')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'classwork' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <GraduationCap size={18} /> Классная
          </button>
          <button 
            onClick={() => setActiveTab('homework')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'homework' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Star size={18} /> Домашка
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-8">
          {activeTab === 'theory' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Основные формулы</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-indigo-600 mb-3 uppercase tracking-wider text-xs">Общий вид</h3>
                    <div className="text-xl font-mono text-center my-4">ax² + bx + c = 0</div>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-600 mb-3 uppercase tracking-wider text-xs">Дискриминант</h3>
                    <div className="text-xl font-mono text-center my-4">D = b² - 4ac</div>
                  </div>
                </div>

                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <h3 className="font-bold text-amber-600 mb-3 uppercase tracking-wider text-xs">Важное правило</h3>
                  <p className="text-slate-700 leading-relaxed">Если <b>D &gt; 0</b>, уравнение имеет 2 корня. Если <b>D = 0</b> — один корень. Если <b>D &lt; 0</b> — корней нет.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classwork' && (
            <div className="space-y-6">
              <AdvancedProgressBar data={progress.cw} total={3} title="Прогресс классной работы" />
              {CW_DATA.map(ex => (
                <Exercise 
                  key={ex.id}
                  {...ex}
                  mode="cw"
                  savedState={progress.cw?.[ex.id]}
                  onSuccess={(attempts, status) => updateProgress(ex.id, 'cw', status, attempts)}
                />
              ))}
            </div>
          )}

          {activeTab === 'homework' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">Вариант {variant}</h3>
                  <p className="text-slate-500 text-sm">Всего 1 возможность пересдачи</p>
                </div>
                {variant === 1 && (
                  <button 
                    onClick={resetHW}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"
                  >
                    <RefreshCcw size={16} /> Другой вариант
                  </button>
                )}
              </div>

              <AdvancedProgressBar data={progress.hw} total={3} title="Прогресс домашней работы" />
              
              {HW_VARIANTS[variant].map(ex => (
                <Exercise 
                  key={ex.id}
                  {...ex}
                  mode="hw"
                  savedState={progress.hw?.[ex.id]}
                  onSuccess={handleHWSuccess}
                />
              ))}

              {hwStats.isComplete && (
                <div className="bg-indigo-600 p-8 rounded-3xl text-white text-center shadow-xl shadow-indigo-200 mt-12">
                  <h3 className="text-3xl font-black mb-2">Урок завершен!</h3>
                  <p className="text-indigo-100 opacity-80 mb-6">Твой результат за домашнюю работу: {hwStats.pct}%</p>
                  {hwStats.pct >= 85 && <div className="text-5xl mb-4">🎉</div>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
