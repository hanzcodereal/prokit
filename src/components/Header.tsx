import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between px-4 py-5">
      <Link href="/">
        <div className="font-orbitron text-lg font-bold tracking-widest neon-text">ROTSEC</div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">All Tools</div>
      </Link>
      <span className="glass rounded-full px-3 py-1 text-xs text-slate-600">
        by Hanzz Forum Grupp
      </span>
    </header>
  );
}
