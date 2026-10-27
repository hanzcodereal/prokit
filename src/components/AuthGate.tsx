"use client";
import { ReactNode, useEffect, useState } from "react";

const USER = "rotsec";
const PASS = "vip";
const KEY = "rotsec_auth";

export default function AuthGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setAuthed(localStorage.getItem(KEY) === "1");
    setReady(true);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (user.trim() === USER && pass === PASS) {
      localStorage.setItem(KEY, "1");
      setAuthed(true);
      setErr("");
    } else {
      setErr("Username atau password salah");
    }
  }

  function logout() {
    localStorage.removeItem(KEY);
    setAuthed(false);
  }

  if (!ready) return null;

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <form onSubmit={submit} className="glass w-full max-w-sm rounded-2xl p-6">
          <h1 className="font-orbitron text-xl font-bold tracking-widest neon-text">ROTSEC</h1>
          <p className="mb-4 mt-1 text-xs text-slate-500">Masuk untuk melanjutkan</p>

          <input
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="neon-input mb-2 w-full rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="neon-input mb-2 w-full rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400"
          />
          {err && <div className="mb-2 text-xs text-[#ff6b81]">{err}</div>}
          <button type="submit" className="neon-btn w-full rounded-xl px-3 py-2.5 text-sm font-semibold">
            Masuk
          </button>
        </form>
      </main>
    );
  }

  return (
    <>
      {children}
      <button
        onClick={logout}
        className="fixed bottom-4 right-4 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur hover:border-[#7cc8ff]"
      >
        Keluar
      </button>
    </>
  );
}
