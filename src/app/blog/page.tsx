import { client } from "@/sanity/lib/client";
import { postsQuery, postsByCategory } from "@/sanity/lib/queries";
import PostCard from "@/components/blog/PostCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Artículos",
  description: "Todos los artículos de sexología, salud sexual y relaciones de pareja.",
};

const categories = [
  { slug: "", label: "Todos" },
  { slug: "salud-sexual", label: "Salud Sexual" },
  { slug: "relaciones", label: "Relaciones" },
  { slug: "educacion", label: "Educación" },
  { slug: "bienestar", label: "Bienestar" },
  { slug: "faqs", label: "FAQs" },
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  let posts: Post[] = [];
  try {
    posts = await client.fetch(
      category ? postsByCategory : postsQuery,
      category ? { category } : {}
    );
  } catch {
    posts = [];
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-neutral-800">
          {category ? categories.find((c) => c.slug === category)?.label ?? "Artículos" : "Todos los artículos"}
        </h1>
        <p className="text-neutral-500">Información sexual honesta, basada en evidencia.</p>
      </div>

      {/* Filtros */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Link key={cat.slug} href={cat.slug ? `/blog?category=${cat.slug}` : "/blog"}>
            <Badge
              className={`cursor-pointer px-4 py-1.5 text-sm transition-colors ${
                (category ?? "") === cat.slug
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-neutral-100 text-neutral-600 hover:bg-rose-100 hover:text-rose-600"
              }`}
            >
              {cat.label}
            </Badge>
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center text-neutral-400">
          <p className="text-lg">Próximamente artículos en esta categoría.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post._id} post={post} featured={i === 0} />
          ))}
        </div>
      )}
    </main>
  );
}
