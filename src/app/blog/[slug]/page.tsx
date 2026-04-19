import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postsQuery } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const revalidate = 3600;

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: string;
  readTime?: number;
  publishedAt?: string;
  coverImage?: { asset: { url: string }; alt?: string };
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
};

const categoryLabels: Record<string, string> = {
  "salud-sexual": "Salud Sexual",
  relaciones: "Relaciones",
  educacion: "Educación",
  bienestar: "Bienestar",
  faqs: "FAQs",
};

export async function generateStaticParams() {
  try {
    const posts: Post[] = await client.fetch(postsQuery);
    return posts.map((p) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: { title: post.seoTitle ?? post.title, description: post.seoDescription ?? post.excerpt },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: Post | null = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch {
    notFound();
  }
  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="mb-8 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-rose-500">
        <ArrowLeft className="h-4 w-4" /> Volver a artículos
      </Link>

      {post.category && (
        <Badge className="mb-4 bg-rose-100 text-rose-600 hover:bg-rose-100">
          {categoryLabels[post.category] ?? post.category}
        </Badge>
      )}

      <h1 className="mb-4 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">{post.title}</h1>

      {post.excerpt && (
        <p className="mb-6 text-lg leading-relaxed text-neutral-500">{post.excerpt}</p>
      )}

      <div className="mb-8 flex items-center gap-5 text-sm text-neutral-400">
        {date && <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{date}</span>}
        {post.readTime && <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime} min de lectura</span>}
      </div>

      {post.coverImage?.asset?.url && (
        <div className="relative mb-10 h-72 w-full overflow-hidden rounded-2xl md:h-96">
          <Image
            src={post.coverImage.asset.url}
            alt={post.coverImage.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* AdSense placeholder — top of article */}
      <div className="mb-8 flex h-24 items-center justify-center rounded-xl bg-neutral-50 text-xs text-neutral-300 border border-dashed border-neutral-200">
        Espacio publicitario
      </div>

      <article className="prose prose-neutral prose-headings:font-semibold prose-a:text-rose-500 prose-a:no-underline hover:prose-a:underline max-w-none">
        {post.body && <PortableText value={post.body as Parameters<typeof PortableText>[0]["value"]} />}
      </article>

      {/* AdSense placeholder — bottom of article */}
      <div className="mt-10 flex h-24 items-center justify-center rounded-xl bg-neutral-50 text-xs text-neutral-300 border border-dashed border-neutral-200">
        Espacio publicitario
      </div>
    </main>
  );
}
