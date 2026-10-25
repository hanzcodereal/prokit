import { client } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function subdomainHistory(): Promise<ToolResult> {
  const start = Date.now();
  try {
    const res = await client.post("", { action: "subdomain_history" });
    const data = res.data;
    return {
      time: `${Date.now() - start}ms`,
      status: true,
      history: data && Array.isArray(data.history) ? data.history : [],
    };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}