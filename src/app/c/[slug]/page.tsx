import Header from "@/components/Header";
import BentoCard from "@/components/BentoCard";
import { getCategory, tools } from "@/lib/catalog";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) return notFound();

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="mb-6">
          <div className="text-xs text-neutral-500">Kategori</div>
          <h1 className="text-2xl font-semibold tracking-tight">{cat.title}</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cat.tools.map((slug) => {
            const t = tools[slug];
            if (!t) return null;
            return <BentoCard key={t.slug} title={t.title} subtitle="Buka tool" href={`/t/${t.slug}`} />;
          })}
        </div>
      </section>
    </main>
  );
}
