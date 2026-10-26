"use client";

export default function ResultView({ result }: { result: unknown }) {
  if (!result) return null;
  const data = result as { status?: boolean };
  const ok = !!data.status;
  return (
    <pre
      className={`mt-3 max-h-[300px] overflow-auto rounded-xl border p-3 font-mono text-xs ${
        ok
          ? "border-[#28e08a]/40 bg-[#28e08a]/10 text-slate-800"
          : "border-[#ff6b81]/40 bg-[#ff6b81]/10 text-slate-800"
      }`}
    >
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}
