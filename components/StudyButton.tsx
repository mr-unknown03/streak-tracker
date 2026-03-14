"use client";

import React, { useState } from "react";
import { CheckCircle, Loader2, Zap } from "lucide-react";

interface StudyButtonProps {
  studiedToday: boolean;
  loading: boolean;
  onMark: () => Promise<{ success: boolean; message: string }>;
}

export default function StudyButton({
  studiedToday,
  loading,
  onMark,
}: StudyButtonProps) {
  const [processing, setProcessing] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleClick = async () => {
    if (processing || studiedToday) return;
    setProcessing(true);
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    await onMark();
    setProcessing(false);
  };

  if (loading) {
    return (
      <div className="h-16 w-full max-w-xs rounded-2xl bg-gray-800/60 animate-pulse" />
    );
  }

  if (studiedToday) {
    return (
      <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-400 font-semibold text-lg animate-fade-in">
        <CheckCircle className="w-6 h-6" />
        <span>You&apos;ve studied today! 🎉</span>
      </div>
    );
  }

  return (
    <button
      id="study-button"
      onClick={handleClick}
      disabled={processing}
      className={`
        relative overflow-hidden flex items-center gap-3 px-10 py-4 rounded-2xl
        font-bold text-lg text-white cursor-pointer
        bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600
        hover:from-violet-500 hover:via-indigo-500 hover:to-blue-500
        shadow-lg shadow-indigo-900/40
        hover:shadow-indigo-800/60 hover:shadow-xl
        transition-all duration-300 hover:-translate-y-0.5
        disabled:opacity-70 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-indigo-500/40
      `}
    >
      {ripple && (
        <span className="absolute inset-0 animate-ping rounded-2xl bg-white/10" />
      )}
      {processing ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <Zap className="w-6 h-6" />
      )}
      <span>{processing ? "Recording..." : "I Studied Today"}</span>
    </button>
  );
}
