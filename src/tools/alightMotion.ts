import { client } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function alightMotion(email: string, verifyLink?: string): Promise<ToolResult> {
  const start = Date.now();
  if (!email) return { time: `${Date.now() - start}ms`, status: false, error: "Email diperlukan" };
  try {
    if (verifyLink) {
      const res = await client.post("", { action: "free_alight_verify", email: email.trim(), link: verifyLink.trim() });
      const data = res.data;
      return { time: `${Date.now() - start}ms`, status: !!(data && data.success), message: (data && data.message) || null, data };
    }
    const res = await client.post("", { action: "free_alight_send", email: email.trim() });
    const data = res.data;
    return { time: `${Date.now() - start}ms`, status: !!(data && data.success), message: (data && data.message) || null, email: email.trim() };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}