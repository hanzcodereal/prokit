"use client";
import Header from "@/components/Header";
import ToolForm from "@/components/ToolForm";
import TerminalLog from "@/components/TerminalLog";
import ResultView from "@/components/ResultView";
import { getTool } from "@/lib/catalog";
import { makeLog } from "@/lib/log";
import type { LogEntry } from "@/lib/types";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = useMemo(() => getTool(params.slug), [params.slug]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [result, setResult] = useState<unknown>(null);

  if (!tool) notFound();

  function addLog(level: LogEntry["level"], text: string) {
    setLogs((l) => [...l, makeLog(level, text)]);
  }

  async function handleSubmit(values: Record<string, string>) {
    addLog("info", `run ${tool.slug} ${JSON.stringify(values)}`);
    try {
      const res = await fetch(tool.api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setResult(data);
      if (data && data.status) {
        addLog("ok", `${tool.slug} ok · ${data.time || ""}`);
      } else {
        addLog("err", `${tool.slug} fail · ${(data && data.error) || "unknown"}`);
      }
    } catch (e: any) {
      addLog("err", `${tool.slug} error · ${e?.message || "network"}`);
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="mb-4">
          <div className="text-xs text-neutral-500">Tool</div>
          <h1 className="text-2xl font-semibold tracking-tight">{tool.title}</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#1f1f24] bg-[#111114] p-5">
            <ToolForm
              fields={tool.fields}
              buttonLabel={tool.buttonLabel}
              extra={tool.extra}
              onSubmit={handleSubmit}
            />
            <ResultView result={result} />
          </div>
          <div className="rounded-2xl border border-[#1f1f24] bg-[#111114] p-5">
            <div className="mb-3 text-sm font-semibold text-neutral-200">Terminal</div>
            <TerminalLog logs={logs} />
          </div>
        </div>
      </section>
    </main>
  );
    }
