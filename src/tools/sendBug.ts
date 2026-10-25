import axios from "axios";
import { BUG_API_URL, defaultHeaders } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function sendBug(senderId: string, targetPhone: string, type?: string): Promise<ToolResult> {
  const start = Date.now();
  const valid = ["delay", "clear"];
  const bugType = (type || "delay").toLowerCase();
  if (!senderId) return { time: `${Date.now() - start}ms`, status: false, error: "senderId diperlukan" };
  if (!targetPhone) return { time: `${Date.now() - start}ms`, status: false, error: "Nomor target diperlukan" };
  if (!valid.includes(bugType)) return { time: `${Date.now() - start}ms`, status: false, error: "Type harus: delay atau clear" };

  const clean = String(targetPhone).replace(/\D/g, "");
  try {
    const res = await axios.post(
      BUG_API_URL,
      { action: "send_bug", senderId, phone: clean, type: bugType },
      { headers: defaultHeaders, timeout: 30000 },
    );
    const data = res.data;
    return {
      time: `${Date.now() - start}ms`,
      status: !!(data && data.success),
      type: bugType,
      sender_id: senderId,
      target: clean,
      message: (data && data.message) || (data && data.success ? `Bug ${bugType} terkirim` : "Gagal"),
      error: data && !data.success ? (data && data.error) || "Gagal mengirim bug" : undefined,
    };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}