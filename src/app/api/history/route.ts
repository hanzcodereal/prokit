import { NextResponse } from "next/server";
import { subdomainHistory } from "@/tools/subdomainHistory";
export async function POST() { return NextResponse.json(await subdomainHistory()); }
