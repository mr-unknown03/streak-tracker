"use client";

import { useState, useEffect, useCallback } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { todayString } from "@/lib/streakLogic";

export interface RealtimeClock {
  timeStr: string;
  dateStr: string;
  today: string;
}

export function useRealtime(onDateChange?: () => void): RealtimeClock {
  const getSnapshot = useCallback((): RealtimeClock => {
    const now = new Date();
    
    // Explicitly grab the time and date using date-fns in the correct timezone
    const timeStr = formatInTimeZone(now, "Asia/Kolkata", "hh:mm:ss a");
    const dateStr = formatInTimeZone(now, "Asia/Kolkata", "EEEE, do MMMM yyyy");
    
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
