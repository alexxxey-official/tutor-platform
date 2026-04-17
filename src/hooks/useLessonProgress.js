'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useLessonProgress(lessonId, totalExercisesCW, totalExercisesHW) {
  const [progress, setProgress] = useState({ cw: {}, hw: {} });
  const [userId, setUserId] = useState(null);
  const [variant, setVariant] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalExercises = (totalExercisesCW || 0) + (totalExercisesHW || 0);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data, error } = await supabase
          .from('student_lessons')
          .select('score, progress_data, variant_id')
          .eq('student_id', user.id)
          .eq('lesson_id', lessonId)
          .single();
          
        if (data) {
          if (data.progress_data) {
            setProgress(data.progress_data);
          }
          if (data.variant_id) {
            setVariant(data.variant_id);
          }
          
          // FIX: Если total_score в базе 0, а у нас есть totalExercises, обновим в базе
          if ((!data.total_score || data.total_score === 0) && totalExercises > 0) {
            supabase
              .from('student_lessons')
              .update({ total_score: totalExercises })
              .eq('student_id', user.id)
              .eq('lesson_id', lessonId)
              .then(() => {});
          }
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [lessonId]);

  const updateProgress = (exerciseId, mode, status, attempts, value = null) => {
    setProgress(prev => {
      const newState = { 
        ...prev, 
        [mode]: { 
          ...prev[mode], 
          [exerciseId]: { status, attempts, value } 
        } 
      };
      
      // Calculate score
      const cwCorrect = Object.values(newState.cw).filter(ex => ex.status === 'correct' || ex.status === 'revealed').length;
      const hwCorrect = Object.values(newState.hw).filter(ex => ex.status === 'correct').length;
      const currentScore = cwCorrect + hwCorrect;

      if (userId) {
        supabase
          .from('student_lessons')
          .update({ 
            score: currentScore,
            total_score: totalExercises, 
            status: currentScore >= totalExercises ? 'completed' : 'in_progress',
            progress_data: newState,
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

  const resetHW = async () => {
    if (!userId) return;
    const newVariant = variant === 1 ? 2 : 1;
    
    // Clear HW progress only
    const newState = { ...progress, hw: {} };
    setProgress(newState);
    setVariant(newVariant);

    await supabase
      .from('student_lessons')
      .update({ 
        progress_data: newState,
        variant_id: newVariant,
        score: Object.values(newState.cw).filter(ex => ex.status === 'correct' || ex.status === 'revealed').length, 
        updated_at: new Date().toISOString()
      })
      .eq('student_id', userId)
      .eq('lesson_id', lessonId);
  };

  const getStats = (mode) => {
    const data = progress[mode] || {};
    const exercises = Object.values(data);
    const correct = exercises.filter(ex => ex.status === 'correct').length;
    const revealed = exercises.filter(ex => ex.status === 'revealed').length;
    const total = mode === 'cw' ? totalExercisesCW : totalExercisesHW;
    
    return {
      correct,
      revealed,
      total,
      pct: total > 0 ? Math.round((correct / total) * 100) : 0,
      isComplete: (correct + revealed) >= total && total > 0
    };
  };

  return { progress, updateProgress, resetHW, variant, getStats, loading };
}
