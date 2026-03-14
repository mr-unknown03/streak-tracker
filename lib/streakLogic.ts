// lib/streakLogic.ts

export interface StudyData {
  studyDates: string[];

}

export interface StreakInfo {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
}

import { format, subDays } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

const TIMEZONE = "Asia/Kolkata";

export function todayString(): string {
  // Always get the current date explicitly in IST
  return formatInTimeZone(new Date(), TIMEZONE, "yyyy-MM-dd");
}

function subtractOneDay(dateStr: string): string {
  // Parse the YYYY-MM-DD string as a local Indian date, then subtract 1 day natively
  const [y, m, d] = dateStr.split("-").map(Number);
  // Important: Month is 0-indexed in native Date
  const localDate = new Date(y, m - 1, d);
  const previousDay = subDays(localDate, 1);
  return format(previousDay, "yyyy-MM-dd");
}

export function calculateStreak(dates: string[]): StreakInfo {
  if (dates.length === 0) {
    return { currentStreak: 0, totalDays: 0, lastStudyDate: null };
  }

  const sorted = Array.from(new Set(dates)).sort((a, b) => (a > b ? -1 : 1));
  const totalDays = sorted.length;
  const lastStudyDate = sorted[0];

  const today = todayString();
  const yesterday = subtractOneDay(today);

  if (lastStudyDate !== today && lastStudyDate !== yesterday) {
    return { currentStreak: 0, totalDays, lastStudyDate };
  }

  let streak = 0;
  let cursor = lastStudyDate;

  for (const date of sorted) {
    if (date === cursor) {
      streak++;
      cursor = subtractOneDay(cursor);
    } else if (date < cursor) {
      break;
    }
  }

  return { currentStreak: streak, totalDays, lastStudyDate };
}

export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return format(date, "do MMMM yyyy"); // e.g., "15th March 2026"
}
