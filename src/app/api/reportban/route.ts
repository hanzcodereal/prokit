import { NextResponse } from "next/server";
import { telegramReport } from "@/tools/telegramReport";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await telegramReport(b.target, b.reason, b.thread));
}
