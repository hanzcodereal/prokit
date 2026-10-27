"use client";
import { useState } from "react";

export default function CopyButton({ text, label = "Salin" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-lg border border-white/80 bg-white/60 px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition hover:border-[#7cc8ff] hover:text-[#3aa7e6]"
    >
      {copied ? "Tersalin" : label}
    </button>
  );
        }
