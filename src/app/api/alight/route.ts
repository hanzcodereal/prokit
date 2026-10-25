import { NextResponse } from "next/server";
import { alightMotion } from "@/tools/alightMotion";
export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await alightMotion(b.email, b.verifyLink));
}
