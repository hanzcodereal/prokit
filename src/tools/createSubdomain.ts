import { client } from "@/lib/client";
import type { ToolResult } from "@/lib/types";

export async function createSubdomain(domain: string, ip: string, panelHost: string, nodeHost: string): Promise<ToolResult> {
  const start = Date.now();
  if (!domain || !ip || !panelHost || !nodeHost) {
    return { time: `${Date.now() - start}ms`, status: false, error: "Argumen tidak lengkap" };
  }
  try {
    const res = await client.post("", {
      action: "create_subdomain",
      domain: domain.trim(),
      ip: ip.trim(),
      panelHost: panelHost.trim(),
      nodeHost: nodeHost.trim(),
    });
    const data = res.data;
    if (!data || !data.success) {
      return { time: `${Date.now() - start}ms`, status: false, error: (data && data.error) || "Gagal membuat subdomain" };
    }
    return {
      time: `${Date.now() - start}ms`,
      status: true,
      data: {
        parent_domain: data.domain || domain,
        ip: data.ip || ip,
        panel_domain: data.panelDomain || null,
        node_domain: data.nodeDomain || null,
      },
    };
  } catch (e: any) {
    return { time: `${Date.now() - start}ms`, status: false, error: e?.response?.data?.error || e?.message };
  }
}