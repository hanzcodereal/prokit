import axios from "axios";
import { BUG_API_URL, defaultHeaders } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function deleteSender(senderId: string): Promise<ToolResult> {
  const start = Date.now();
  if (!senderId) return { time: `${Date.now() - start}ms`, status: false, error: "ID sender diperlukan" };
  try {
    const res = await axios.post(BUG_API_URL, { action: "delete_sender", senderId }, { headers: defaultHeaders, timeout: 15000 });
    const data = res.data;
    return {
      time: `${Date.now() - start}ms`,
      status: !!(data && data.success),
      message: (data && data.message) || (data && data.success ? "Sender berhasil dihapus" : "Gagal menghapus sender"),
    };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}