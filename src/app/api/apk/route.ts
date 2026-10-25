import { NextResponse } from "next/server";
import { webToApk } from "@/tools/webToApk";
export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await webToApk(b.url, b.name));
}
