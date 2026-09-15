import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/content/blog";
import { appUrl, postCanonicalUrl, APP_ORIGIN } from "@/content/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = true;

/** youtu.be/ID・watch?v=ID・/embed/ID・/shorts/ID のいずれからも動画IDを取り出す */
function extractYouTubeId(url: string | undefined) {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([\w-]{6,})/,
    /[?&]v=([\w-]{6,})/,
    /\/embed\/([\w-]{6,})/,
    /\/shorts\/([\w-]{6,})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  // Wix にもある記事は www、apex にしか無い記事は apex（ルールは site.ts 参照）
  const canonicalUrl = postCanonicalUrl(slug);

  return {
    // "| MIRASISONE" は layout.tsx の title.template が付けるので、ここでは付けない
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} | MIRASISONE`,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.revisedAt,
      images: [{ url: post.eyecatch }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const related =
  post.relatedPosts && post.relatedPosts.length > 0
    ? post.relatedPosts
        .map((slug) => blogPosts.find((item) => item.slug === slug))
        .filter((item): item is (typeof blogPosts)[number] => Boolean(item))
    : blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  const articleUrl = postCanonicalUrl(slug);

  // 構造化データ。FAQPage は一般サイトではリッチリザルト対象外のため入れない
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: [appUrl(post.eyecatch)],
      datePublished: post.publishedAt,
      dateModified: post.revisedAt || post.publishedAt,
      author: { "@type": "Organization", name: "MIRASISONE", url: APP_ORIGIN },
      publisher: { "@type": "Organization", name: "MIRASISONE", url: APP_ORIGIN },
      mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
      articleSection: post.category,
      inLanguage: "ja",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: APP_ORIGIN },
        { "@type": "ListItem", position: 2, name: "TOPICS・NEWS", item: appUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
      ],
    },
  ];

  return (
    <main className="wix-blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="wix-article">
        <Link className="wix-article-back" href="/blog">
          All Posts
        </Link>
        <div className="wix-article-meta">
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          <span>•</span>
          <Link href="/blog">{post.category}</Link>
        </div>
        <h1>{post.title}</h1>
        <p className="wix-article-lead">{post.description}</p>
        <div className="wix-article-image">
          <Image src={post.eyecatch} alt="" fill sizes="(max-width: 900px) 100vw, 860px" priority />
        </div>
        <div className="wix-article-body">
          {post.content.map((block, index) => {
            if (block.type === "heading") {
              if (block.level === 2) return <h2 key={index}>{block.text}</h2>;
              if (block.level === 3) return <h3 key={index}>{block.text}</h3>;
              return <h4 key={index}>{block.text}</h4>;
            }
            if (block.type === "p") {
              return <p key={index}>{block.text}</p>;
            }
            if (block.type === "youtube") {
  const videoId = extractYouTubeId(block.url);

  if (!videoId) return null;

  return (
    <div
      key={index}
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%",
        margin: "32px 0",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </div>
  );
}if (block.type === "list") {
              return (
                <ul key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "table") {
              const [header, ...rows] = block.rows;
              return (
                <div className="wix-article-table" key={index}>
                  <table>
                    {header ? (
                      <thead>
                        <tr>
                          {header.map((cell, cellIndex) => (
                            <th key={cellIndex}>{cell}</th>
                          ))}
                        </tr>
                      </thead>
                    ) : null}
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.type === "image") {
             const imageSrc =
  block.src.startsWith("http") || block.src.startsWith("/")
    ? block.src
    : `https://static.wixstatic.com/media/${block.src}`;
              return (
                <div className="wix-article-inline-image" key={index}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt={block.alt} />
                </div>
              );
            }
            if (block.type === "quote") {
              return <blockquote key={index}>{block.text}</blockquote>;
            }
            return null;
          })}
        </div>
        {post.tags && post.tags.length > 0 ? (
          <div className="wix-article-tags">
            {post.tags.map((tag) => (
              <span className="wix-article-tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        {related.length > 0 ? (
          <section className="wix-related" aria-label="関連記事">
            <h2>関連記事</h2>
            <div className="wix-related-list">
              {related.map((item) => (
                <Link href={`/post/${encodeURIComponent(item.slug)}`} key={item.slug}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
