import { NextResponse } from "next/server";
import { installProtect } from "@/tools/installProtect";
export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await installProtect(b.host, b.password));
}
