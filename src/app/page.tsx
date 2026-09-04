import { StaticHtmlPage } from "@/components/StaticHtmlPage";
import { topPage } from "@/content/top";
import { blogPosts } from "@/content/blog";

const NEWS_COUNT = 3;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** 公開日の新しい順に最新記事を取り出し、TOPの「最新情報」カードを組み立てる */
function buildNewsGrid() {
  const latest = [...blogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, NEWS_COUNT);

  const cards = latest
    .map((post) => {
      const date = post.publishedAt.replaceAll("-", ".");
      const href = `/post/${encodeURIComponent(post.slug)}`;
      return `<a class="news-card" style="display:block;color:inherit;text-decoration:none" href="${href}">
                <div class="news-img-wrap img-reveal-wrap"><div class="img-reveal-filter"><div class="irf-rect irf-rect-1"></div></div>
                    <img src="${escapeHtml(post.eyecatch)}" alt="${escapeHtml(post.title)}">
                </div>
                <div class="news-meta">
                    <span class="news-date font-en">${date}</span>
                    <span class="news-tag tag-case">${escapeHtml(post.category)}</span>
                </div>
                <h3 class="news-title font-serif">${escapeHtml(post.title)}</h3>
            </a>`;
    })
    .join("\n            ");

  return `<div class="news-grid">\n            ${cards}\n        </div>`;
}

function withLatestNews(body: string) {
  const pattern = /<div class="news-grid">[\s\S]*?<\/article>\s*<\/div>/;
  if (!pattern.test(body)) return body;
  return body.replace(pattern, buildNewsGrid());
}

export default function HomePage() {
  const page = { ...topPage, body: withLatestNews(topPage.body) };
  return <StaticHtmlPage page={page} contactLinks />;
}
