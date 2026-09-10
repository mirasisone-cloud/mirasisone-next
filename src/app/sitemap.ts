import type { MetadataRoute } from "next";
import { seoUrlInventory } from "@/content/seo-url-inventory";
import { blogPosts } from "@/content/blog";
import { APP_ORIGIN, WIX_ORIGIN } from "@/content/site";

/** Wix(www) が配信する固定ページ。ここに載るパスだけ www の URL で出力する */
const wixServedPaths = new Set(["/", "/works", "/company", "/recruit", "/privacy-policy"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedPages = seoUrlInventory
    .filter((entry) => entry.type === "pages")
    .filter((entry) => wixServedPaths.has(entry.path))
    .map((entry) => ({
      url: `${WIX_ORIGIN}${entry.path === "/" ? "" : entry.path}`,
      lastModified: new Date(entry.lastmod || "2026-07-31"),
      changeFrequency: "monthly" as const,
      priority: entry.path === "/" ? 1 : 0.9,
    }));

  // 以下は apex がこのアプリで配信する（www 側には存在しない or 別ページ）
  const postPages = blogPosts.map((post) => ({
    url: `${APP_ORIGIN}/post/${encodeURIComponent(post.slug)}`,
    lastModified: new Date(post.revisedAt || post.publishedAt || "2026-07-31"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...fixedPages,
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
