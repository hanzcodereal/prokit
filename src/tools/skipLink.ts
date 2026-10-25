import axios from "axios";
import type { ToolResult } from "@/lib/types";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function extractFinalUrlFromHtml(html: string, originalUrl: string): string | null {
  const patterns = [
    /window\.location(?:\.href)?\s*=\s*["']([^"']+)["']/i,
    /location\.replace\(\s*["']([^"']+)["']\s*\)/i,
    /<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"']+)["']/i,
    /<meta[^>]+content=["'][^"']*url=([^"']+)["'][^>]+http-equiv=["']refresh["']/i,
    /href=["'](https?:\/\/[^"']+)["'][^>]*>\s*(?:klik|click|lanjut|continue|here|disini)/i,
    /data-url=["'](https?:\/\/[^"']+)["']/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m && m[1]) {
      const c = m[1].trim();
      if (c.startsWith("http") && c !== originalUrl && !/sfl\.gl/i.test(c)) return c;
    }
  }
  const hrefs = html.match(/href=["'](https?:\/\/[^"']+)["']/gi) || [];
  for (const h of hrefs) {
    const m = h.match(/href=["'](https?:\/\/[^"']+)["']/i);
    if (m && m[1] && !/sfl\.gl|google|facebook|twitter|whatsapp|instagram/i.test(m[1])) return m[1];
  }
  return null;
}

function extractUrlFromQuery(targetUrl: string): string | null {
  try {
    const u = new URL(targetUrl);
    for (const p of ["url", "u", "target", "dest", "redirect", "to", "r", "link"]) {
      const v = u.searchParams.get(p);
      if (v && /^https?:\/\//i.test(v)) return decodeURIComponent(v);
    }
  } catch {}
  return null;
}

export async function skipLink(targetUrl: string): Promise<ToolResult> {
  const start = Date.now();
  if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
    return { time: `${Date.now() - start}ms`, status: false, error: "URL tidak valid" };
  }
  const fallback = extractUrlFromQuery(targetUrl);
  if (fallback) return { time: `${Date.now() - start}ms`, status: true, original_url: targetUrl, final_url: fallback };

  try {
    const direct = await axios.get(targetUrl, { maxRedirects: 10, headers: { "User-Agent": UA }, timeout: 15000 });
    const resolved = (direct.request && direct.request.res && direct.request.res.responseUrl) || direct.config.url;
    if (resolved && resolved !== targetUrl && !/sfl\.gl/i.test(resolved)) {
      return { time: `${Date.now() - start}ms`, status: true, original_url: targetUrl, final_url: resolved };
    }
    const html = typeof direct.data === "string" ? direct.data : "";
    const ex = extractFinalUrlFromHtml(html, targetUrl);
    if (ex) return { time: `${Date.now() - start}ms`, status: true, original_url: targetUrl, final_url: ex };
  } catch {}

  const proxies = [
    "https://api.allorigins.win/raw?url=",
    "https://corsproxy.io/?",
    "https://api.codetabs.com/v1/proxy?quest=",
  ];
  for (const proxy of proxies) {
    try {
      const r = await axios.get(`${proxy}${encodeURIComponent(targetUrl)}`, { headers: { "User-Agent": UA }, timeout: 10000 });
      const body = typeof r.data === "string" ? r.data : "";
      const m = extractFinalUrlFromHtml(body, targetUrl);
      if (m) return { time: `${Date.now() - start}ms`, status: true, original_url: targetUrl, final_url: m };
    } catch {}
  }
  return { time: `${Date.now() - start}ms`, status: false, error: "URL tujuan tidak ditemukan" };
}