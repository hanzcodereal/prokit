"use client";
import type { LogEntry } from "@/lib/types";
import { useEffect, useRef } from "react";

export default function TerminalLog({ logs }: { logs: LogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [logs]);

  return (
    <div
      ref={ref}
      className="h-[340px] overflow-y-auto rounded-xl border border-[#1f1f24] bg-black/60 p-3 font-mono text-xs leading-relaxed"
    >
      {logs.length === 0 ? (
        <div className="text-neutral-600">// waiting for activity...</div>
      ) : (
        logs.map((l) => (
          <div key={l.id} className="flex gap-2">
            <span className="shrink-0 text-neutral-600">[{l.at}]</span>
            <span
              className={`shrink-0 ${
                l.level === "ok" ? "text-[#22c55e]" : l.level === "err" ? "text-[#ef4444]" : "text-[#22d3ee]"
              }`}
            >
              {l.level.toUpperCase()}
            </span>
            <span className="whitespace-pre-wrap break-all text-neutral-300">{l.text}</span>
          </div>
        ))
      )}
    </div>
  );
}