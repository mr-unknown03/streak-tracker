"use client";

import React from "react";
import toast from "react-hot-toast";
import StreakCard from "@/components/StreakCard";
import StudyButton from "@/components/StudyButton";
import { useStudyData } from "@/hooks/useStudyData";
import { useRealtime } from "@/hooks/useRealtime";
import { Flame, Clock } from "lucide-react";

export default function DashboardPage() {
  const { currentStreak, totalDays, lastStudyDate, loading, studiedToday, markStudied, refresh } =
    useStudyData();

  const { timeStr, dateStr } = useRealtime(refresh);

  const handleMark = async () => {
    const result = await markStudied();
    if (result.success) {
      toast.success(result.message, { duration: 3000 });
    } else {
      toast.error(result.message, { duration: 3000 });
    }
    return result;
  };

  return (
    <div className="space-y-10 animate-slide-up">
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-2">
          <Flame className="w-4 h-4" />
          <span>Keep the streak alive!</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Daily Learning{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-lg mx-auto">
          Build consistent study habits, one day at a time.
        </p>

        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gray-900/60 border border-gray-700/50 backdrop-blur-sm mt-2">
          <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <div className="text-left">
            <p className="text-xs text-gray-500 font-medium leading-none mb-0.5">{dateStr}</p>
            <p className="text-lg font-bold text-white font-mono tracking-widest leading-none">
              {timeStr}
            </p>
          </div>
        </div>
      </div>

      <StreakCard
        currentStreak={currentStreak}
        totalDays={totalDays}
        lastStudyDate={lastStudyDate}
        loading={loading}
      />

      {!loading && currentStreak >= 3 && (
        <div className="flex justify-center animate-fade-in">
          <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <span className="text-3xl">
              {currentStreak >= 30 ? "🔥🔥🔥" : currentStreak >= 7 ? "🔥🔥" : "🔥"}
            </span>
            <p className="text-orange-300 font-semibold">
              {currentStreak >= 30
                ? "Legendary streak! Unstoppable!"
                : currentStreak >= 7
                ? "On fire! Amazing consistency!"
                : "Great streak! Keep it up!"}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <StudyButton
          studiedToday={studiedToday}
          loading={loading}
          onMark={handleMark}
        />
        {!loading && !studiedToday && (
          <p className="text-gray-500 text-sm animate-fade-in">
            📅 Click to log your study session for today
          </p>
        )}
      </div>

      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-700/40">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/5 rounded-full blur-2xl" />
        <blockquote className="relative text-center">
          <p className="text-gray-300 text-base italic leading-relaxed">
            &ldquo;The secret of getting ahead is getting started. The secret of getting started is
            breaking your complex overwhelming tasks into small manageable tasks, and starting on
            the first one.&rdquo;
          </p>
          <footer className="mt-3 text-gray-500 text-sm font-medium">— Mark Twain</footer>
        </blockquote>
      </div>
    </div>
  );
}
