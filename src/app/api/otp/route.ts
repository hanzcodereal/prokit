import { NextResponse } from "next/server";
import { requestOtp } from "@/tools/requestOtp";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const b = await req.json();
  const phones = String(b.phones || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  return NextResponse.json(await requestOtp(phones));
}
