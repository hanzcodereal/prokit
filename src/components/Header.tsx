import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between px-4 py-5">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00b3ff] to-[#7c5cff] shadow-[0_8px_24px_-8px_rgba(0,179,255,0.7)]">
          <span className="font-orbitron text-sm font-bold text-white">R</span>
        </div>
        <div>
          <div className="font-orbitron text-lg font-bold tracking-widest neon-text">ROTSEC</div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">All Tools</div>
        </div>
      </Link>
      <span className="glass rounded-full px-3 py-1 text-xs text-slate-600">
        by Hanzz Forum Grupp
      </span>
    </header>
  );
}
