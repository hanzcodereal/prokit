import { NextResponse } from "next/server";
import { skipLink } from "@/tools/skipLink";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await skipLink(b.url));
}
