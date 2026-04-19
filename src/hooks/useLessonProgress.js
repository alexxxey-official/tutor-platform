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
      try {
        const { data, error: authError } = await supabase.auth.getUser();
        const user = data?.user;
        if (user) {
          setUserId(user.id);
          const { data: lessonData, error } = await supabase
            .from('student_lessons')
            .select('*')
            .eq('student_id', user.id)
            .eq('lesson_id', lessonId)
            .single();
            
          if (error && error.code !== 'PGRST116') {
              console.error("Ошибка загрузки прогресса:", error.message);
          }
  
          if (lessonData) {
            let currentVariant = lessonData.variant_id || 1;
            
            if (lessonData.progress_data) {
              const validData = { cw: {}, hw: {}, ...lessonData.progress_data };
              
              // FIX: Если ДЗ пустое, но вариант 2 — сбрасываем на вариант 1
              const hwKeys = Object.keys(validData.hw || {});
              if (hwKeys.length === 0 && currentVariant === 2) {
                currentVariant = 1;
                setVariant(1);
                // Синхронизируем с базой, чтобы убрать "зависание"
                supabase
                  .from('student_lessons')
                  .update({ variant_id: 1 })
                  .eq('student_id', user.id)
                  .eq('lesson_id', lessonId)
                  .then();
              } else {
                setVariant(currentVariant);
              }
              
              setProgress(validData);
            }
            
            if ((!lessonData.total_score || lessonData.total_score === 0) && totalExercises > 0) {
              supabase
                .from('student_lessons')
                .update({ total_score: totalExercises })
                .eq('student_id', user.id)
                .eq('lesson_id', lessonId)
                .then(() => {});
            }
          }
        }
      } catch (err) {
        console.error("Hook error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [lessonId]);

  const updateProgress = (exerciseId, mode, status, attempts, value = null) => {
    setProgress(prev => {
      const safePrev = { cw: {}, hw: {}, ...prev };
      const currentModeData = { ...safePrev[mode] };
      const currentItem = currentModeData[exerciseId] || { history: [] };

      const newHistory = [
        ...(currentItem.history || []),
        { value, status, at: new Date().toISOString(), attemptNum: attempts }
      ];

      const newState = { 
        ...safePrev, 
        [mode]: { 
          ...currentModeData, 
          [exerciseId]: { status, attempts, value, history: newHistory } 
        } 
      };
      
      // Calculate score
      const cwData = newState.cw || {};
      const hwData = newState.hw || {};
      const cwCorrect = Object.values(cwData).filter(ex => ex && (ex.status === 'correct' || ex.status === 'revealed')).length;
      const hwCorrect = Object.values(hwData).filter(ex => ex && ex.status === 'correct').length;
      const currentScore = cwCorrect + hwCorrect;

      if (userId) {
        // Используем upsert, чтобы запись создалась, если её ещё нет
        supabase
          .from('student_lessons')
          .upsert({ 
            student_id: userId,
            lesson_id: lessonId,
            score: currentScore,
            total_score: totalExercises, 
            status: currentScore >= totalExercises ? 'completed' : 'in_progress',
            progress_data: newState,
            variant_id: variant, // Сохраняем текущий вариант
            updated_at: new Date().toISOString()
          }, { onConflict: 'student_id, lesson_id' })
          .then();
      }
      
      return newState;
    });
  };

  const resetHW = async () => {
    if (!userId || variant !== 1) return;
    const newVariant = 2;
    
    const safePrev = { cw: {}, hw: {}, ...progress };
    const newState = { 
      ...safePrev, 
      hw_v1: safePrev.hw, // Сохраняем историю варианта 1
      hw: {} 
    };
    
    setProgress(newState);
    setVariant(newVariant);

    await supabase
      .from('student_lessons')
      .update({ 
        progress_data: newState,
        variant_id: newVariant,
        score: Object.values(newState.cw || {}).filter(ex => ex && (ex.status === 'correct' || ex.status === 'revealed')).length, 
        updated_at: new Date().toISOString()
      })
      .eq('student_id', userId)
      .eq('lesson_id', lessonId);
  };

  const getStats = (mode) => {
    const data = (progress && progress[mode]) || {};
    const exercises = Object.values(data);
    const correct = exercises.filter(ex => ex && ex.status === 'correct').length;
    const revealed = exercises.filter(ex => ex && ex.status === 'revealed').length;
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
