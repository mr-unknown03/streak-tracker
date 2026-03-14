// lib/streakLogic.ts

export interface StudyData {
  studyDates: string[];

}

export interface StreakInfo {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
}

export function todayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function subtractOneDay(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  const ny = date.getFullYear();
  const nm = String(date.getMonth() + 1).padStart(2, "0");
  const nd = String(date.getDate()).padStart(2, "0");
  return `${ny}-${nm}-${nd}`;
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
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
