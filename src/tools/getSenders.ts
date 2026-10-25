import axios from "axios";
import { BUG_API_URL, defaultHeaders } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function getSenders(): Promise<ToolResult> {
  const start = Date.now();
  try {
    const res = await axios.post(BUG_API_URL, { action: "get_senders" }, { headers: defaultHeaders, timeout: 15000 });
    const data = res.data;
    return {
      time: `${Date.now() - start}ms`,
      status: !!(data && data.success),
      is_owner: !!(data && data.isOwner),
      senders: data && Array.isArray(data.senders) ? data.senders : [],
    };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}