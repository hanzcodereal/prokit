import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between px-4 py-4">
      <Link href="/" className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#22d3ee]" />
        <div>
          <div className="text-lg font-semibold tracking-tight">ProKit</div>
          <div className="text-xs text-neutral-500">All Tools</div>
        </div>
      </Link>
      <span className="rounded-full border border-[#1f1f24] px-3 py-1 text-xs text-neutral-400">
        by Hanzz Forum Grupp
      </span>
    </header>
  );
}