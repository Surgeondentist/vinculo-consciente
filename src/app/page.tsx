import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Shield } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PostCard from "@/components/blog/PostCard";
import { client } from "@/sanity/lib/client";
import { latestPostsQuery } from "@/sanity/lib/queries";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

const categories = [
  { slug: "salud-sexual", label: "Salud Sexual", emoji: "🌸" },
  { slug: "relaciones", label: "Relaciones de Pareja", emoji: "💑" },
  { slug: "educacion", label: "Educación Sexual", emoji: "📚" },
  { slug: "bienestar", label: "Bienestar", emoji: "✨" },
];

const pillars = [
  { icon: BookOpen, title: "Basado en evidencia", desc: "Contenido respaldado por ciencia y profesionales certificados." },
  { icon: Heart, title: "Sin tabúes", desc: "Abordamos todos los temas con respeto, apertura y precisión." },
  { icon: Shield, title: "Espacio seguro", desc: "Tu privacidad importa. Información confiable, sin juzgar." },
];

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: string;
  readTime?: number;
  publishedAt?: string;
  coverImage?: { asset: { url: string }; alt?: string };
};

export default async function HomePage() {
  let posts: Post[] = [];
  try {
    posts = await client.fetch(latestPostsQuery);
  } catch {
    posts = [];
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/40 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <Badge className="mb-6 bg-rose-100 text-rose-600 hover:bg-rose-100">
            Vínculo Consciente
          </Badge>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-6xl">
            Tu salud sexual{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              importa
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-neutral-600">
            Artículos, guías y respuestas a las preguntas que te cuesta hacer. Información sexual honesta, basada en evidencia y sin tabúes.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/blog" className={cn(buttonVariants({ size: "lg" }), "bg-rose-500 hover:bg-rose-600 text-white px-8")}>
              Explorar artículos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="#categorias" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-neutral-600")}>
              Ver categorías
            </Link>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100">
                  <Icon className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-800">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section id="categorias" className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold text-neutral-800">Explora por tema</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="group flex flex-col items-center gap-2 rounded-2xl border bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-rose-200 hover:shadow-md"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-rose-600">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Últimos artículos */}
      {posts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-800">Artículos recientes</h2>
              <Link href="/blog" className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <PostCard key={post._id} post={post} featured={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA newsletter */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-500 py-16 text-white">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold">Recibe contenido en tu correo</h2>
          <p className="mb-8 opacity-90">Artículos nuevos, guías exclusivas y respuestas a tus preguntas.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="tu@correo.com"
              className="flex-1 rounded-xl px-4 py-3 text-neutral-800 outline-none"
            />
            <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-50">
              Suscribirme
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
