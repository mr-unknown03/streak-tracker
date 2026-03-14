"use client";

import { useState, useEffect, useCallback } from "react";
import { todayString } from "@/lib/streakLogic";

export interface RealtimeClock {
  timeStr: string;
  dateStr: string;
  today: string;
}

export function useRealtime(onDateChange?: () => void): RealtimeClock {
  const getSnapshot = useCallback((): RealtimeClock => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const dateStr = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return { timeStr, dateStr, today: todayString() };
  }, []);

  const [clock, setClock] = useState<RealtimeClock>({
    timeStr: "--:--:--",
    dateStr: "Loading...",
    today: "",
  });

  useEffect(() => {
    const initialSnap = getSnapshot();
    setClock(initialSnap);
    let lastDate = initialSnap.today;

    const tick = () => {
      const snap = getSnapshot();
      setClock(snap);

      if (snap.today !== lastDate) {
        lastDate = snap.today;
        onDateChange?.();
      }
    };

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [getSnapshot, onDateChange]); // eslint-disable-line react-hooks/exhaustive-deps

  return clock;
}
