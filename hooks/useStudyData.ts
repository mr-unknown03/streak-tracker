"use client";

import { useState, useEffect, useCallback } from "react";
import { calculateStreak, todayString, StreakInfo } from "@/lib/streakLogic";

const STORAGE_KEY = "streak_tracker_dates";

export interface StudyState extends StreakInfo {
  studyDates: string[];
  loading: boolean;
  studiedToday: boolean;
}

export function useStudyData() {
  const [state, setState] = useState<StudyState>({
    studyDates: [],
    currentStreak: 0,
    totalDays: 0,
    lastStudyDate: null,
    loading: true,
    studiedToday: false,
  });

  const refresh = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const dates: string[] = raw ? JSON.parse(raw) : [];
      const streakInfo = calculateStreak(dates);
      const today = todayString();
      setState({
        studyDates: dates,
        ...streakInfo,
        loading: false,
        studiedToday: dates.includes(today),
      });
    } catch {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markStudied = useCallback(async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const today = todayString();
    const current = state.studyDates;

    if (current.includes(today)) {
      return { success: false, message: "You have already marked today." };
    }

    try {
      const response = await fetch("/api/study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates: current }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.dates));
        setState({
          studyDates: data.dates,
          currentStreak: data.currentStreak,
          totalDays: data.totalDays,
          lastStudyDate: data.lastStudyDate,
          loading: false,
          studiedToday: true,
        });
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch {
      const updated = [today, ...current].sort((a, b) => (a > b ? -1 : 1));
      const streakInfo = calculateStreak(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setState({
        studyDates: updated,
        ...streakInfo,
        loading: false,
        studiedToday: true,
      });
      return { success: true, message: "Study session recorded!" };
    }
  }, [state.studyDates]);

  return { ...state, markStudied, refresh };
}
