import { client } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function requestOtp(phones: string[]): Promise<ToolResult> {
  const start = Date.now();
  const list = Array.isArray(phones) ? phones : [phones];
  if (!list.length || !list[0]) return { time: `${Date.now() - start}ms`, status: false, error: "Minimal 1 nomor HP" };

  const results: any[] = [];
  const totalStats = { success: 0, ratelimit: 0, bad: 0, error: 0 };

  for (const num of list) {
    const numStart = Date.now();
    try {
      const res = await client.post("", { action: "request_otp", phone: String(num).trim() });
      const data = res.data;
      const st = (data && data.stats) || {};
      totalStats.success += st.success || 0;
      totalStats.ratelimit += (st.ratelimit || 0) + (st.bypass || 0);
      totalStats.bad += st.bad || 0;
      totalStats.error += (st.error || 0) + (st.timeout || 0);
      results.push({ phone: num, time: `${Date.now() - numStart}ms`, status: !!(data && (data.success || data.stats)), message: (data && data.message) || null, stats: st });
    } catch (e: any) {
      totalStats.error++;
      results.push({ phone: num, time: `${Date.now() - numStart}ms`, status: false, error: e?.response?.data?.error || e?.message });
    }
  }

  return { time: `${Date.now() - start}ms`, status: true, total_numbers: list.length, total_stats: totalStats, results };
}