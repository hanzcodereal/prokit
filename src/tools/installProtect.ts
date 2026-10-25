import { client } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function installProtect(host: string, password: string): Promise<ToolResult> {
  const start = Date.now();
  if (!host || !password) return { time: `${Date.now() - start}ms`, status: false, error: "Host dan Password diperlukan" };
  try {
    const res = await client.post("", { action: "install_protect", host: host.trim(), password: password.trim() });
    const data = res.data;
    return {
      time: `${Date.now() - start}ms`,
      status: !!(data && data.success),
      message: (data && data.message) || null,
      detail: (data && data.detail) || null,
    };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}