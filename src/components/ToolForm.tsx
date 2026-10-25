"use client";
import { FormEvent, useState } from "react";
import type { Field } from "@/lib/catalog";

type Props = {
  fields: Field[];
  buttonLabel?: string;
  extra?: "bugType" | "senderMode";
  onSubmit: (values: Record<string, string>) => Promise<void>;
};

export default function ToolForm({ fields, buttonLabel = "Run", extra, onSubmit }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [bugType, setBugType] = useState("delay");
  const [senderMode, setSenderMode] = useState("code");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = { ...values };
      if (extra === "bugType") payload.type = bugType;
      if (extra === "senderMode") payload.mode = senderMode;
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
          className="w-full rounded-lg border border-[#1f1f24] bg-[#0a0a0b] px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-[#7c5cff] focus:outline-none"
        />
      ))}

      {extra === "bugType" && (
        <div className="flex gap-2">
          {["delay", "clear"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setBugType(t)}
              className={`flex-1 rounded-lg border px-3 py-2 text-xs transition ${
                bugType === t ? "border-[#7c5cff] bg-[#7c5cff]/10 text-neutral-100" : "border-[#1f1f24] text-neutral-400"
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
              className={`flex-1 rounded-lg border px-3 py-2 text-xs transition ${
                senderMode === t ? "border-[#7c5cff] bg-[#7c5cff]/10 text-neutral-100" : "border-[#1f1f24] text-neutral-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-lg bg-[#7c5cff] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#6a4bff] disabled:opacity-50"
      >
        {busy ? "Running..." : buttonLabel}
      </button>
    </form>
  );
}