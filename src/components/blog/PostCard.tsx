import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryLabels: Record<string, string> = {
  "salud-sexual": "Salud Sexual",
  relaciones: "Relaciones",
  educacion: "Educación",
  bienestar: "Bienestar",
  faqs: "FAQs",
};

const categoryColors: Record<string, string> = {
  "salud-sexual": "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  relaciones: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  educacion: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300",
  bienestar: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  faqs: "bg-secondary text-secondary-foreground",
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
    ? new Date(post.publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
    : null;

  return (
    <Link href={href} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
      <div className={`relative overflow-hidden bg-secondary ${featured ? "h-52" : "h-44"}`}>
        {post.coverImage?.asset?.url ? (
          <Image
            src={post.coverImage.asset.url}
            alt={post.coverImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary">
            <Sparkle />
          </div>
        )}
        {post.category && (
          <div className="absolute left-3 top-3">
            <Badge className={`text-xs font-medium border-0 ${categoryColors[post.category] ?? "bg-secondary text-secondary-foreground"}`}>
              {categoryLabels[post.category] ?? post.category}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className={`mb-2 font-heading font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary ${featured ? "text-xl" : "text-base"}`}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mb-4 flex-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> {date}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {post.readTime} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function Sparkle() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="opacity-20 text-primary" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}
