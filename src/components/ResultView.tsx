"use client";
import CopyButton from "./CopyButton";

export default function ResultView({ result }: { result: unknown }) {
  if (!result) return null;
  const data = result as { status?: boolean };
  const ok = !!data.status;
  const pretty = JSON.stringify(result, null, 2);

  return (
    <div className="mt-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700">Respon</span>
        <CopyButton text={pretty} />
      </div>
      <pre
        className={`max-h-[300px] overflow-auto rounded-xl border p-3 font-mono text-xs ${
          ok
            ? "border-[#28e08a]/40 bg-[#28e08a]/10 text-slate-800"
            : "border-[#ff6b81]/40 bg-[#ff6b81]/10 text-slate-800"
        }`}
      >
        {pretty}
      </pre>
    </div>
  );
}
