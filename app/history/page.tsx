"use client";

import React from "react";
import HistoryList from "@/components/HistoryList";
import { useStudyData } from "@/hooks/useStudyData";
import { History, TrendingUp } from "lucide-react";

export default function HistoryPage() {
  const { studyDates, loading, currentStreak, totalDays } = useStudyData();

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="space-y-2 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-2">
          <History className="w-4 h-4" />
          <span>Your Journey</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Study{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            History
          </span>
        </h1>
        <p className="text-gray-400">
          Every entry here represents your commitment to growth.
        </p>
      </div>

      {!loading && totalDays > 0 && (
        <div className="flex flex-wrap gap-4 animate-fade-in">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-900/60 border border-gray-700/50">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Current Streak</p>
              <p className="text-lg font-bold text-white">{currentStreak} days</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-900/60 border border-gray-700/50">
            <History className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Sessions</p>
              <p className="text-lg font-bold text-white">{totalDays} days</p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-gray-900/40 border border-gray-700/40 p-6">
        <h2 className="text-lg font-semibold text-gray-300 mb-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
          All Study Sessions
        </h2>
        <HistoryList dates={studyDates} loading={loading} />
      </div>
    </div>
  );
}
