import postsData from "./blog-posts-data.json";

export type BlogBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "image"; src: string; alt: string }
  | { type: "quote"; text: string }
  | { type: "youtube"; url: string };

/** blog-posts-data.json は手作業で更新されるため、表記ゆれや軽微な誤りでページが落ちないよう正規化する */
type RawBlock = Partial<Record<string, unknown>> & { type?: string };

/** YouTube ブロックは url / src どちらのキーでも受け付ける */
function normalizeBlock(block: RawBlock): RawBlock {
  if (block.type !== "youtube") return block;
  const url = block.url ?? block.src;
  return { type: "youtube", url: typeof url === "string" ? url : "" };
}

/** 画像パスは先頭スラッシュ必須（next/image が相対パスを受け付けないため） */
function normalizeImagePath(value: unknown) {
  if (typeof value !== "string" || value.length === 0) return "";
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return `/${value}`;
}

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
  relatedPosts?: string[];
};

export const blogNavCategories = [
  "All Posts",
  "プロジェクションマッピング",
  "3D映像制作",
  "デジタルサイネージ",
  "空間演出",
  "VR/ARコンテンツ",
];

export const blogPosts = (postsData as unknown as BlogPost[]).map((post) => ({
  ...post,
  eyecatch: normalizeImagePath(post.eyecatch),
  content: (post.content as unknown as RawBlock[]).map((block) => {
    const normalized = normalizeBlock(block);
    if (normalized.type === "image") {
      return { ...normalized, src: normalizeImagePath(normalized.src) };
    }
    return normalized;
  }),
})) as unknown as BlogPost[];

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
