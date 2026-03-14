// app/api/streak/route.ts
import { NextRequest, NextResponse } from "next/server";
import { calculateStreak } from "@/lib/streakLogic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datesParam = searchParams.get("dates");
    const dates: string[] = datesParam ? JSON.parse(datesParam) : [];
    const streakInfo = calculateStreak(dates);
    return NextResponse.json(streakInfo);
  } catch {
    return NextResponse.json(
      { currentStreak: 0, totalDays: 0, lastStudyDate: null },
      { status: 200 }
    );
  }
}
