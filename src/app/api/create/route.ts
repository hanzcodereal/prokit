import { NextResponse } from "next/server";
import { createSubdomain } from "@/tools/createSubdomain";
export async function POST(req: Request) {
  const b = await req.json();
  return NextResponse.json(await createSubdomain(b.domain, b.ip, b.panelHost, b.nodeHost));
                           }
