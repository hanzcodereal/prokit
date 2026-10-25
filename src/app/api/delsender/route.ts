import { NextResponse } from "next/server";
import { deleteSender } from "@/tools/deleteSender";
export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await deleteSender(b.senderId));
}
