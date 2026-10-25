import { client } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function listDomains(): Promise<ToolResult> {
  const start = Date.now();
  try {
    const res = await client.post("", { action: "list_domains" });
    const data = res.data;
    if (!data || !data.success) {
      return { time: `${Date.now() - start}ms`, status: false, error: (data && data.error) || "Gagal mengambil daftar domain" };
    }
    const domains = Array.isArray(data.domains) ? data.domains : [];
    const alive = domains.filter((d: any) => d.alive);
    return {
      time: `${Date.now() - start}ms`,
      status: true,
      total: domains.length,
      alive_total: alive.length,
      alive_domains: alive.map((d: any) => d.domain),
      domains,
    };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
  }
