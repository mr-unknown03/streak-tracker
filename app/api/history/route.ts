// app/api/history/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datesParam = searchParams.get("dates");
    const dates: string[] = datesParam ? JSON.parse(datesParam) : [];
    // Return sorted descending (newest first)
    const sorted = Array.from(new Set(dates)).sort((a, b) => (a > b ? -1 : 1));
    return NextResponse.json({ dates: sorted });
  } catch {
    return NextResponse.json({ dates: [] });
  }
}
