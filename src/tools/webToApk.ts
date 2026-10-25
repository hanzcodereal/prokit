import { client } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function webToApk(targetUrl: string, appName: string): Promise<ToolResult> {
  const start = Date.now();
  if (!targetUrl || !appName) return { time: `${Date.now() - start}ms`, status: false, error: "URL dan nama wajib diisi" };
  try {
    const res = await client.post("", { action: "web_to_apk_trigger", url: targetUrl.trim(), name: appName.trim(), banner: null });
    const data = res.data;
    if (!data || !data.success) {
      return { time: `${Date.now() - start}ms`, status: false, error: (data && data.error) || "Gagal memulai build APK" };
    }
    return { time: `${Date.now() - start}ms`, status: true, run_id: data.run_id || null, name: appName.trim(), url: targetUrl.trim() };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}