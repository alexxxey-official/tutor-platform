'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useLessonProgress(lessonId, totalExercises) {
  const [progress, setProgress] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Загружаем предыдущий балл и детальный прогресс (если он есть в базе)
        const { data, error } = await supabase
          .from('student_lessons')
          .select('score, progress_data')
          .eq('student_id', user.id)
          .eq('lesson_id', lessonId)
          .single();
          
        if (data && data.progress_data) {
          // Если есть детализация, восстанавливаем галочки
          setProgress(data.progress_data);
        }
      }
    };
    fetchUser();
  }, [lessonId]);

  const markCorrect = (exerciseId, isCorrect) => {
    setProgress(prev => {
      const newState = { ...prev, [exerciseId]: isCorrect };
      const currentCorrectCount = Object.values(newState).filter(Boolean).length;
      
      if (userId) {
        // Фоновое сохранение прогресса и ДЕТАЛИЗАЦИИ
        supabase
          .from('student_lessons')
          .update({ 
            score: currentCorrectCount,
            status: currentCorrectCount === totalExercises ? 'completed' : 'in_progress',
            progress_data: newState, // Сохраняем каждый конкретный ответ
            updated_at: new Date().toISOString()
          })
          .eq('student_id', userId)
          .eq('lesson_id', lessonId)
          .then(({ error }) => {
            if (error) console.error("Ошибка сохранения прогресса:", error.message);
          });
      }
      
      return newState;
    });
  };

  const correctCount = Object.values(progress).filter(Boolean).length;
  const pct = (correctCount / totalExercises) * 100;

  return { progress, markCorrect, correctCount, pct };
}
