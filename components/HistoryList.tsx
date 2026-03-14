"use client";

import React from "react";
import { CalendarDays } from "lucide-react";
import { formatDate, todayString } from "@/lib/streakLogic";

interface HistoryListProps {
  dates: string[]; // ISO "YYYY-MM-DD", newest first
  loading: boolean;
}

export default function HistoryList({ dates, loading }: HistoryListProps) {
  const today = todayString();

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 rounded-xl bg-gray-800/60" />
        ))}
      </div>
    );
  }

  if (dates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500 gap-3">
        <CalendarDays className="w-12 h-12 opacity-40" />
        <p className="text-lg font-medium">No study sessions yet.</p>
        <p className="text-sm opacity-70">Start tracking your learning journey!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 animate-fade-in">
      {dates.map((date, idx) => {
        const isToday = date === today;
        return (
          <li
            key={date}
            className={`
              flex items-center gap-4 px-5 py-4 rounded-xl border
              transition-all duration-200 hover:-translate-x-1
              ${
                isToday
                  ? "bg-indigo-500/15 border-indigo-500/40 shadow-sm shadow-indigo-900/20"
                  : "bg-gray-900/50 border-gray-700/50 hover:border-gray-600/70"
              }
            `}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                ${isToday ? "bg-indigo-500/30 text-indigo-300" : "bg-gray-700/60 text-gray-400"}`}
            >
              {idx + 1}
            </span>
            <CalendarDays
              className={`w-5 h-5 flex-shrink-0 ${isToday ? "text-indigo-400" : "text-gray-500"}`}
            />
            <span
              className={`text-base font-medium ${isToday ? "text-indigo-300" : "text-gray-300"}`}
            >
              {formatDate(date)}
            </span>
            {isToday && (
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/30">
                Today
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
