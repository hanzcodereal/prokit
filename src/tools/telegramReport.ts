import type { ToolResult } from "@/lib/types";

const REPORT_REASONS: Record<string, string> = {
  spam: "Spam / Unwanted Advertising",
  fake: "Fake Account / Scam / Impersonation",
  violence: "Violence / Threats of Violence",
  porn: "Pornography / Illegal Adult Content",
  childAbuse: "Child Abuse / CSAM",
  copyright: "Copyright Infringement",
  personal: "Publishing Personal Info / Doxxing",
};

const BASE = "https://flox-spamotp.vercel.app";

const HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Origin: BASE,
  Referer: `${BASE}/`,
  "Content-Type": "application/json",
};

function cleanTarget(target: string): string {
  if (!target) return "";
  let c = target.trim();
  if (c.startsWith("https://t.me/")) c = c.replace("https://t.me/", "");
  else if (c.startsWith("t.me/")) c = c.replace("t.me/", "");
  if (c.startsWith("@")) c = c.slice(1);
  return c.split("/")[0].split("?")[0];
}

async function reportViaTelegramSupport(username: string, reasonKey: string): Promise<{ success: boolean; httpStatus?: number; error?: string }> {
  try {
    const label = REPORT_REASONS[reasonKey] || REPORT_REASONS.spam;
    const targetUrl = `https://t.me/${username}`;
    const detail = `Please investigate this account/channel (${targetUrl}) for violating Telegram terms of service: ${label}.`;
    const body = new URLSearchParams({
      message: `${detail}\n\nTarget URL: ${targetUrl}\nReason: ${label}`,
      email: "security-report@vamxapi.my.id",
      phone: "+62812" + Math.floor(10000000 + Math.random() * 90000000),
      setln: "en",
    });
    const res = await fetch("https://telegram.org/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": HEADERS["User-Agent"],
        Referer: "https://telegram.org/support",
      },
      body: body.toString(),
      signal: AbortSignal.timeout(10000),
    });
    const text = await res.text().catch(() => "");
    const ok = res.status === 200 && (text.includes("Thank you") || text.includes("thanks") || text.includes("support"));
    return { success: ok || res.status === 200, httpStatus: res.status };
  } catch (e: any) {
    return { success: false, error: e?.message || "network" };
  }
}

export async function telegramReport(target: string, reason: string, thread: string | number): Promise<ToolResult> {
  const start = Date.now();
  const username = cleanTarget(target);
  if (!username) {
    return { time: `${Date.now() - start}ms`, status: false, error: "Target tidak valid" };
  }
  const reasonKey = REPORT_REASONS[reason] ? reason : "spam";
  const threadsCount = Math.max(1, Math.min(parseInt(String(thread)) || 25, 250));

  let paradox: any = null;
  try {
    const res = await fetch(`${BASE}/api/report`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        action: "start_report",
        target: `@${username}`,
        reason: reasonKey,
        thread: threadsCount,
        delay: 0.5,
      }),
      signal: AbortSignal.timeout(15000),
    });
    paradox = await res.json().catch(() => ({}));
  } catch (e: any) {
    paradox = { success: false, error: e?.message || "network" };
  }

  const tg = await reportViaTelegramSupport(username, reasonKey);
  const ok = (paradox && paradox.success) || tg.success;

  return {
    time: `${Date.now() - start}ms`,
    status: !!ok,
    target: { username: `@${username}`, url: `https://t.me/${username}` },
    report: { reason: reasonKey, description: REPORT_REASONS[reasonKey], threads: threadsCount },
    channels: {
      paradoxEngine: paradox?.success ? "Dispatched" : paradox?.error || "Unavailable",
      telegramSupportGateway: tg.success ? "Delivered" : tg.error || "Failed",
    },
  };
              }
