import Header from "@/components/Header";
import BentoCard from "@/components/BentoCard";
import { categories } from "@/lib/catalog";

const info: Record<string, string> = {
  "spam-otp": "OTP · WhatsApp & SMS",
  "bug-wa": "WhatsApp Tools",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold tracking-wide text-slate-900">
            Pilih <span className="neon-text">Kategori</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">Pilih kategori lalu pilih tool.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <BentoCard key={c.slug} title={c.title} subtitle={info[c.slug]} href={`/c/${c.slug}`} />
          ))}
        </div>
      </section>
    </main>
  );
}
