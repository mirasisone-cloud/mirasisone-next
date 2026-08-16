import postsData from "./blog-posts-data.json";

export type BlogBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "image"; src: string; alt: string }
  | { type: "quote"; text: string }
  | { type: "youtube"; url: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categories: string[];
  tags: string[];
  publishedAt: string;
  revisedAt: string;
  eyecatch: string;
  content: readonly BlogBlock[];
};

export const blogNavCategories = [
  "All Posts",
  "プロジェクションマッピング",
  "3D映像制作",
  "デジタルサイネージ",
  "空間演出",
  "VR/ARコンテンツ",
];

export const blogPosts = postsData as unknown as BlogPost[];

export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category))
).sort();

export function getBlogPost(slug: string) {
  const decoded = (() => {
    try {
      return decodeURIComponent(slug);
    } catch {
      return slug;
    }
  })();
  return blogPosts.find((post) => post.slug === decoded);
}
