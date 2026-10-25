import axios from "axios";
import { BUG_API_URL, defaultHeaders } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function addSender(phone: string, mode?: string): Promise<ToolResult> {
  const start = Date.now();
  const clean = String(phone || "").replace(/\D/g, "");
  if (!clean) return { time: `${Date.now() - start}ms`, status: false, error: "Nomor sender wajib diisi" };
  const pairMode = mode && mode.toLowerCase() === "qr" ? "qr" : "code";
  try {
    const res = await axios.post(BUG_API_URL, { action: "add_sender", phone: clean, pairMode }, { headers: defaultHeaders, timeout: 20000 });
    const data = res.data;
    if (!data || !data.success) return { time: `${Date.now() - start}ms`, status: false, error: (data && data.error) || "Gagal menambahkan sender" };
    return {
      time: `${Date.now() - start}ms`,
      status: true,
      mode: pairMode,
      session_id: data.sessionId || null,
      pairing_code: data.code || null,
      qr_string: data.qr || null,
      qr_image_url: data.qr ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(data.qr)}` : null,
    };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}