import { NextResponse } from "next/server";
import { getSenders } from "@/tools/getSenders";
export async function POST() { return NextResponse.json(await getSenders()); }
