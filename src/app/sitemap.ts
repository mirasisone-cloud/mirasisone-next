import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { APP_ORIGIN, isWixPost } from "@/content/site";

/**
 * apex(このアプリ)が正規URLになっているページだけを載せる。
 * TOP などの固定ページと、Wix にもある旧記事は www が正規URLで、
 * Wix 側の sitemap（https://www.mirasisone.com/sitemap.xml）に載っている。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const postPages = blogPosts
    .filter((post) => !isWixPost(post.slug))
    .map((post) => ({
      url: `${APP_ORIGIN}/post/${encodeURIComponent(post.slug)}`,
      lastModified: new Date(post.revisedAt || post.publishedAt || "2026-07-31"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: `${APP_ORIGIN}/blog`,
      lastModified: new Date("2026-07-31"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postPages,
    {
      url: `${APP_ORIGIN}/contact`,
      lastModified: new Date("2026-07-31"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
