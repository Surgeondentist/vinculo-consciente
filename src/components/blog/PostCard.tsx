import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const categoryLabels: Record<string, string> = {
  "salud-sexual": "Salud Sexual",
  relaciones: "Relaciones",
  educacion: "Educación",
  bienestar: "Bienestar",
  faqs: "FAQs",
};

const categoryColors: Record<string, string> = {
  "salud-sexual": "bg-rose-100 text-rose-700 hover:bg-rose-100",
  relaciones: "bg-pink-100 text-pink-700 hover:bg-pink-100",
  educacion: "bg-violet-100 text-violet-700 hover:bg-violet-100",
  bienestar: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  faqs: "bg-amber-100 text-amber-700 hover:bg-amber-100",
};

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

export default function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  const href = `/blog/${post.slug.current}`;
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <Card className="group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={href} className="block">
        <div className={`relative overflow-hidden bg-rose-50 ${featured ? "h-56" : "h-44"}`}>
          {post.coverImage?.asset?.url ? (
            <Image
              src={post.coverImage.asset.url}
              alt={post.coverImage.alt ?? post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl opacity-20">♥</span>
            </div>
          )}
          {post.category && (
            <div className="absolute left-3 top-3">
              <Badge className={`text-xs font-medium ${categoryColors[post.category] ?? "bg-neutral-100 text-neutral-700"}`}>
                {categoryLabels[post.category] ?? post.category}
              </Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-5">
        <Link href={href}>
          <h3 className={`mb-2 font-semibold leading-snug text-neutral-800 transition-colors group-hover:text-rose-600 ${featured ? "text-xl" : "text-base"}`}>
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-neutral-500">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-4 text-xs text-neutral-400">
          {date && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {date}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readTime} min
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
