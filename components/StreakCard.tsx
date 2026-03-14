"use client";

import React from "react";
import { Flame, BookOpen, Calendar, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/streakLogic";

interface StreakCardProps {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
  loading: boolean;
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 bg-gray-900/60 border border-gray-700/50 backdrop-blur-sm group hover:border-gray-500/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
    >
      <div
        className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 ${accent} group-hover:opacity-30 transition-opacity duration-300`}
      />
      <div className="relative flex items-start gap-4">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl ${accent} bg-opacity-20 border border-white/10`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold text-white truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function StreakCard({
  currentStreak,
  totalDays,
  lastStudyDate,
  loading,
}: StreakCardProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-gray-800/60" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
      <StatCard
        icon={<Flame className="w-6 h-6 text-orange-400" />}
        label="Current Streak"
        value={`${currentStreak} ${currentStreak === 1 ? "day" : "days"}`}
        accent="bg-orange-500"
      />
      <StatCard
        icon={<BookOpen className="w-6 h-6 text-blue-400" />}
        label="Total Study Days"
        value={`${totalDays} ${totalDays === 1 ? "day" : "days"}`}
        accent="bg-blue-500"
      />
      <StatCard
        icon={<Calendar className="w-6 h-6 text-purple-400" />}
        label="Last Studied"
        value={lastStudyDate ? formatDate(lastStudyDate) : "Never"}
        accent="bg-purple-500"
      />
    </div>
  );
}
