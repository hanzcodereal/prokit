import { NextResponse } from "next/server";
import { addSender } from "@/tools/addSender";
export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await addSender(b.phone, b.mode));
}
