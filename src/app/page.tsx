import type { Metadata } from "next";
import { StaticHtmlPage } from "@/components/StaticHtmlPage";
import { topPage } from "@/content/top";
import { blogPosts } from "@/content/blog";
import { WIX_ORIGIN } from "@/content/site";

const TOP_TITLE = "プロジェクションマッピング・空間演出の企画制作｜MIRASISONE（東京）";
const TOP_DESCRIPTION =
  "MIRASISONEは東京のプロジェクションマッピング・空間演出の企画制作会社です。店舗・ホテル・商業施設・イベントの空間を、企画から3DCG映像制作・機材設置まで一貫して手がけます。";

export const metadata: Metadata = {
  // 社名だけだと何の会社か伝わらないため、template（"%s | MIRASISONE"）を使わず全文を指定する
  title: { absolute: TOP_TITLE },
  description: TOP_DESCRIPTION,
  alternates: {
    // 本番の TOP は Wix(www) が配信している（src/content/site.ts 参照）
    canonical: WIX_ORIGIN,
  },
  openGraph: {
    title: TOP_TITLE,
    description: TOP_DESCRIPTION,
    url: WIX_ORIGIN,
    type: "website",
    images: [{ url: "/top-hero-pm-poster.webp" }],
  },
};

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
  // StaticHtmlPage は表示後に document.title を page.title で上書きするため、metadata と同じタイトルを渡す
  const page = { ...topPage, title: TOP_TITLE, body: withLatestNews(topPage.body) };
  return <StaticHtmlPage page={page} contactLinks />;
}
