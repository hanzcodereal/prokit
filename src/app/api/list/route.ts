import { NextResponse } from "next/server";
import { listDomains } from "@/tools/listDomains";
export async function POST() { return NextResponse.json(await listDomains()); }
