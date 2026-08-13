import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogNavCategories, blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "TOPICS・NEWS",
  description:
    "MIRASISONEのブログ記事一覧です。プロジェクションマッピング、3D映像制作、デジタルサイネージ、空間演出に関する記事を掲載しています。",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "TOPICS・NEWS | MIRASISONE",
    description:
      "MIRASISONEのブログ記事一覧です。プロジェクションマッピング、3D映像制作、デジタルサイネージ、空間演出に関する記事を掲載しています。",
    url: "/blog",
  },
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;

  const visiblePosts =
    category && category !== "All Posts"
      ? blogPosts.filter(
          (post) =>
            post.category === category ||
            (post.categories && post.categories.includes(category))
        )
      : blogPosts;

  return (
    <main className="wix-blog-page" id="top">
      <nav className="wix-blog-nav" aria-label="Blog categories">
        {blogNavCategories.map((cat) => (
          <Link
            href={
              cat === "All Posts"
                ? "/blog"
                : `/blog?category=${encodeURIComponent(cat)}`
            }
            key={cat}
            className={
              (!category && cat === "All Posts") || category === cat
                ? "active"
                : undefined
            }
          >
            {cat}
          </Link>
        ))}
      </nav>

      <section className="wix-post-list" aria-label="ブログ記事一覧">
        {visiblePosts.map((post, index) => (
          <article className="wix-post-card" key={`${post.slug}-${index}`}>
            <Link className="wix-post-image" href={`/post/${encodeURIComponent(post.slug)}`}>
              <Image src={post.eyecatch} alt="" fill sizes="(max-width: 900px) 100vw, 454px" priority={index === 0} />
            </Link>
            <div className="wix-post-body">
              <div className="wix-post-topline">
                <span>{post.publishedAt}</span>
                <button type="button" aria-label="記事メニュー">
                  ⋮
                </button>
              </div>
              <Link
                  className="wix-post-category"
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                >
                {post.category}
              </Link>
              <Link className="wix-post-title" href={`/post/${encodeURIComponent(post.slug)}`}>
                {post.title}
              </Link>
              <p>{post.description}</p>
            </div>
          </article>
        ))}
      </section>

      <a className="wix-page-top" href="#top" aria-label="ページ上部へ戻る">
        ⌃
      </a>
    </main>
  );
}
