// app/api/study/route.ts
import { NextRequest, NextResponse } from "next/server";
import { todayString, calculateStreak } from "@/lib/streakLogic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Client sends its localStorage dates array for server-side validation
    const dates: string[] = Array.isArray(body.dates) ? body.dates : [];
    const today = todayString();

    if (dates.includes(today)) {
      return NextResponse.json(
        { success: false, message: "You have already marked today." },
        { status: 200 }
      );
    }

    const updatedDates = [today, ...dates].sort((a, b) => (a > b ? -1 : 1));
    const streakInfo = calculateStreak(updatedDates);

    return NextResponse.json({
      success: true,
      message: "Study session recorded!",
      dates: updatedDates,
      ...streakInfo,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }
}
