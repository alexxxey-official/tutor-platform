'use client'
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function AdvancedProgressBar({ statsCW, statsHW }) {
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const total = (statsCW?.total || 0) + (statsHW?.total || 0);
  const correct = (statsCW?.correct || 0) + (statsHW?.correct || 0);
  const revealedCW = statsCW?.revealed || 0;
  const revealedHW = statsHW?.revealed || 0;

  // В CW revealed считается "пройденным" (зеленым или светло-зеленым), 
  // в HW revealed — это "красная зона" (ошибка без балла).
  const progressPct = total > 0 ? Math.round(((correct + revealedCW) / total) * 100) : 0;
  const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;

  useEffect(() => {
    if (progressPct >= 90 && !hasCelebrated) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b']
      });
      setHasCelebrated(true);
    }
  }, [progressPct, hasCelebrated]);

  return (
    <div className="sticky top-4 z-50 mb-8 transition-all duration-300">
      <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg border border-white/20">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h3 className="text-sm md:text-lg font-bold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              Ваш прогресс
            </h3>
            <p className="hidden md:block text-[10px] text-gray-500 uppercase tracking-wider font-bold">
              Решено верно: {correct} из {total}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl md:text-3xl font-black text-blue-600 unbounded">{progressPct}%</span>
          </div>
        </div>

        {/* Многослойный прогресс-бар */}
        <div className="h-3 w-full bg-gray-100/50 rounded-full overflow-hidden flex shadow-inner">
        {/* Зеленый - Верно */}
        <div 
          className="h-full bg-green-500 transition-all duration-1000" 
          style={{ width: `${(correct / total) * 100}%` }}
        />
        {/* Светло-зеленый - CW revealed (зачтено) */}
        <div 
          className="h-full bg-green-300 transition-all duration-1000" 
          style={{ width: `${(revealedCW / total) * 100}%` }}
        />
        {/* Красный - HW revealed (не зачтено) */}
        <div 
          className="h-full bg-red-400 transition-all duration-1000" 
          style={{ width: `${(revealedHW / total) * 100}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wider font-bold text-gray-400">
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full" /> Верно
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-green-300 rounded-full" /> Разобрано (CW)
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-red-400 rounded-full" /> Ошибки (HW)
        </div>
      </div>

      {scorePct < 60 && statsHW?.isComplete && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
          💡 Результат меньше 60%. У вас есть возможность **сбросить ДЗ** и попробовать другой вариант!
        </div>
      )}
    </div>
  );
}
