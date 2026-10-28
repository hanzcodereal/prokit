"use client";
import { FormEvent, useState } from "react";
import type { Field } from "@/lib/catalog";

type Props = {
  fields: Field[];
  buttonLabel?: string;
  extra?: "bugType" | "senderMode" | "reportReason";
  onSubmit: (values: Record<string, string>) => Promise<void>;
};

const REASONS = ["spam", "fake", "violence", "porn", "childAbuse", "copyright", "personal"];

export default function ToolForm({ fields, buttonLabel = "Run", extra, onSubmit }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [bugType, setBugType] = useState("delay");
  const [senderMode, setSenderMode] = useState("code");
  const [reason, setReason] = useState("spam");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = { ...values };
      if (extra === "bugType") payload.type = bugType;
      if (extra === "senderMode") payload.mode = senderMode;
      if (extra === "reportReason") payload.reason = reason;
      await onSubmit(payload);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      {fields.map((f) => (
        <input
          key={f.name}
          type={f.type || "text"}
          placeholder={f.placeholder}
          value={values[f.name] || ""}
          onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
          className="neon-input w-full rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400"
        />
      ))}

      {extra === "bugType" && (
        <div className="flex gap-2">
          {["delay", "clear"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setBugType(t)}
              className={`flex-1 rounded-xl border px-3 py-2 text-xs transition ${
                bugType === t
                  ? "border-transparent bg-[#7cc8ff] text-white"
                  : "border-white/80 bg-white/50 text-slate-600 hover:border-[#7cc8ff]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {extra === "senderMode" && (
        <div className="flex gap-2">
          {["code", "qr"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSenderMode(t)}
              className={`flex-1 rounded-xl border px-3 py-2 text-xs transition ${
                senderMode === t
                  ? "border-transparent bg-[#7cc8ff] text-white"
                  : "border-white/80 bg-white/50 text-slate-600 hover:border-[#7cc8ff]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {extra === "reportReason" && (
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="neon-input w-full rounded-xl px-3 py-2.5 text-sm text-slate-800"
        >
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      )}

      <button
        type="submit"
        disabled={busy}
        className="neon-btn w-full rounded-xl px-3 py-2.5 text-sm font-semibold"
      >
        {busy ? "Running..." : buttonLabel}
      </button>
    </form>
  );
                }
