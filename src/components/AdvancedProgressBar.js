'use client'
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function AdvancedProgressBar({ statsCW, statsHW, onReset, variant }) {
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Расчеты для CW
  const totalCW = statsCW?.total || 0;
  const correctCW = statsCW?.correct || 0;
  const revealedCW = statsCW?.revealed || 0;
  const pctCW = totalCW > 0 ? Math.round(((correctCW + revealedCW) / totalCW) * 100) : 0;

  // Расчеты для HW
  const totalHW = statsHW?.total || 0;
  const correctHW = statsHW?.correct || 0;
  const revealedHW = statsHW?.revealed || 0;
  const pctHW = totalHW > 0 ? Math.round((correctHW / totalHW) * 100) : 0;
  const totalProgressHW = totalHW > 0 ? Math.round(((correctHW + revealedHW) / totalHW) * 100) : 0;

  const canReset = statsHW?.isComplete && pctHW < 60 && variant === 1;

  // Общий прогресс для конфетти
  useEffect(() => {
    if (totalProgressHW >= 90 && statsHW?.isComplete && !hasCelebrated) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b']
      });
      setHasCelebrated(true);
    }
  }, [totalProgressHW, statsHW?.isComplete, hasCelebrated]);

  return (
    <div className="sticky top-4 z-50 mb-8 transition-all duration-300">
      <div className="bg-white/90 backdrop-blur-md p-4 md:p-5 rounded-2xl shadow-xl border border-indigo-50">
        
        {/* PROGRESS BARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CLASSWORK BAR */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-400">Classwork</span>
              <span className="text-sm font-bold text-indigo-900 unbounded">{pctCW}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000" 
                style={{ width: `${(correctCW / totalCW) * 100}%` }}
              />
              <div 
                className="h-full bg-emerald-300 transition-all duration-1000" 
                style={{ width: `${(revealedCW / totalCW) * 100}%` }}
              />
            </div>
          </div>

          {/* HOMEWORK BAR */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-500">Homework</span>
              <span className="text-sm font-bold text-blue-900 unbounded">{pctHW}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000" 
                style={{ width: `${(correctHW / totalHW) * 100}%` }}
              />
              <div 
                className="h-full bg-red-400 transition-all duration-1000" 
                style={{ width: `${(revealedHW / totalHW) * 100}%` }}
              />
            </div>
          </div>

        </div>

        {/* Legend & Actions */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-50 pt-3">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Верно
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full" /> Разбор
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full" /> Ошибка
            </div>
          </div>
          
          {canReset ? (
            <button 
              onClick={onReset}
              className="text-[10px] font-black text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-all animate-pulse flex items-center gap-2 uppercase tracking-widest"
            >
              🚀 Пересдать ДЗ (Вариант 2)
            </button>
          ) : variant === 2 ? (
             <div className="text-[9px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-md">
               Вторая попытка использована
             </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
