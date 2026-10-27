"use client";
import type { LogEntry } from "@/lib/types";
import { useEffect, useRef } from "react";
import CopyButton from "./CopyButton";

export default function TerminalLog({ logs }: { logs: LogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [logs]);

  const plain = logs
    .map((l) => `[${l.at}] ${l.level.toUpperCase()} ${l.text}`)
    .join("\n");

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="font-orbitron text-sm font-semibold tracking-wide text-slate-800">
          Terminal
        </div>
        <CopyButton text={plain} />
      </div>
      <div
        ref={ref}
        className="terminal h-[340px] overflow-y-auto rounded-xl p-3 font-mono text-xs leading-relaxed"
      >
        {logs.length === 0 ? (
          <div className="text-[#5b87b0]">// waiting for activity...</div>
        ) : (
          logs.map((l) => (
            <div key={l.id} className="flex gap-2">
              <span className="shrink-0 text-[#5b87b0]">[{l.at}]</span>
              <span
                className={`shrink-0 font-bold ${
                  l.level === "ok" ? "text-[#28e08a]" : l.level === "err" ? "text-[#ff6b81]" : "text-[#7cc8ff]"
                }`}
              >
                {l.level.toUpperCase()}
              </span>
              <span className="whitespace-pre-wrap break-all text-[#d6efff]">{l.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
      }
