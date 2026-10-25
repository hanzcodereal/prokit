"use client";

export default function ResultView({ result }: { result: unknown }) {
  if (!result) return null;
  const data = result as { status?: boolean };
  const ok = !!data.status;
  return (
    <pre
      className={`mt-3 max-h-[300px] overflow-auto rounded-xl border p-3 font-mono text-xs ${
        ok
          ? "border-[#22c55e]/30 bg-[#22c55e]/5 text-neutral-200"
          : "border-[#ef4444]/30 bg-[#ef4444]/5 text-neutral-200"
      }`}
    >
      {JSON.stringify(result, null, 2)}
    </pre>
  );
      }
