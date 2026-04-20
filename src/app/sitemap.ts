import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

type Post = {
  slug: { current: string };
  publishedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  let posts: Post[] = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch {
    posts = [];
  }

  const postEntries = posts.map((post) => ({
    url: `${base}/blog/${post.slug.current}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...postEntries,
  ];
}
