import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { appUrl, postCanonicalUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: appUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: appUrl("/works"), changeFrequency: "monthly", priority: 0.9 },
    { url: appUrl("/company"), changeFrequency: "yearly", priority: 0.7 },
    { url: appUrl("/recruit"), changeFrequency: "monthly", priority: 0.6 },
    { url: appUrl("/privacy-policy"), changeFrequency: "yearly", priority: 0.3 },
    { url: appUrl("/blog"), changeFrequency: "weekly", priority: 0.9 },
    { url: appUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
  ];
  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: postCanonicalUrl(post.slug),
    lastModified: new Date(post.revisedAt || post.publishedAt || "2026-07-31"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...new Map([...pages, ...posts].map((page) => [page.url, page])).values()];
}
