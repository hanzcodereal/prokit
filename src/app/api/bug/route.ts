import { NextResponse } from "next/server";
import { sendBug } from "@/tools/sendBug";
export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await sendBug(b.senderId, b.phone, b.type));
}
