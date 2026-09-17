import type { Metadata } from "next";
import { StaticHtmlPage } from "@/components/StaticHtmlPage";
import { topPage } from "@/content/top";
import { blogPosts } from "@/content/blog";
import { APP_ORIGIN } from "@/content/site";
import { homeLayoutStyles } from "@/content/home-layout-styles";
import { HomeIntro } from "@/components/HomeIntro";
import { homeServicesMarkup, homeServicesStyles } from "@/content/home-services";
import { refineHomeContent, homeRefinementStyles } from "@/content/home-refinements";
import { HomeAnchorRecovery } from "@/components/HomeAnchorRecovery";
import { HomeMotion } from "@/components/HomeMotion";
import { homeMediaStyles } from "@/content/home-media-styles";
import { compactHomeContent, homeMobileStyles } from "@/content/home-mobile";
import { homeWorksMarkup, homeWorksStyles } from "@/content/home-works";

const TOP_TITLE = "プロジェクションマッピング・空間演出の企画制作｜MIRASISONE（東京）";
const TOP_DESCRIPTION =
  "MIRASISONEは東京のプロジェクションマッピング・空間演出の企画制作会社です。店舗・ホテル・商業施設・イベントの空間を、企画から3DCG映像制作・機材設置まで一貫して手がけます。";

export const metadata: Metadata = {
  // 社名だけだと何の会社か伝わらないため、template（"%s | MIRASISONE"）を使わず全文を指定する
  title: { absolute: TOP_TITLE },
  description: TOP_DESCRIPTION,
  alternates: {
    canonical: APP_ORIGIN,
  },
  openGraph: {
    title: TOP_TITLE,
    description: TOP_DESCRIPTION,
    url: APP_ORIGIN,
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

function withOriginalStory(body: string) {
  return body.replace(
    /<!-- ===== SCROLL STORY ===== -->[\s\S]*?<!-- \/#scroll-story -->/,
    (intro) => {
      // Keep the original two designs after the new opening film.
      const start = intro.indexOf('<div class="ss-phase" id="ss-p2">');
      const end = intro.indexOf('</div><!-- /.ss-sticky -->');
      if (start < 0 || end < 0) return intro;
      const story = intro.slice(start, end)
        .replace('<span class="ss-hero-kicker">プロジェクションマッピングで、</span>', '<span class="ss-hero-kicker">テクノロジーで、</span>')
        .replace('src="p2-right-illustration-20260608.png"', 'src="/p2-right-photos-v2.png"')
        .replaceAll('class="ss-phase"', 'class="ss-phase is-active"')
        .replace('<div class="ss-p3-body-block">', `
          <figure class="story-concept" aria-labelledby="story-concept-caption">
            <p class="story-concept-label">FROM VISION TO EXPERIENCE</p>
            <ol class="story-concept-steps" aria-label="体験づくりの流れ">
              <li><span class="story-concept-word">企画</span><span class="story-concept-en">VISION</span></li>
              <li><span class="story-concept-word">空間</span><span class="story-concept-en">SPACE</span></li>
              <li><span class="story-concept-word">体験</span><span class="story-concept-en">EXPERIENCE</span></li>
            </ol>
            <figcaption id="story-concept-caption">想いを描き、空間に映し、心を動かす。</figcaption>
          </figure>
          <div class="ss-p3-body-block">`)
        .replace(/<video[\s\S]*?<\/video>/g, "")
        .replace('<h1 class="ss-hero-title">', '<h2 class="ss-hero-title">')
        .replace("</h1>", "</h2>");
      return `<div id="original-home-story">${story}</div>`;
    },
  );
}

export default function HomePage() {
  // StaticHtmlPage は表示後に document.title を page.title で上書きするため、metadata と同じタイトルを渡す
  const body = compactHomeContent(refineHomeContent(withOriginalStory(withLatestNews(topPage.body)).replace(
    /<section class="wwd-section"[\s\S]*?<\/section>/,
    homeServicesMarkup,
  ))).replace(/<section class="testimonials-section">[\s\S]*?<\/section>/, "")
    .replace(/<section id="venues" class="works-section">[\s\S]*?<\/section>/, homeWorksMarkup);
  // Preserve phrase boundaries instead of letting the imported copy script flatten the titles.
  const scriptTags = topPage.scriptTags?.map(script => ({
    ...script,
    content: 'content' in script ? script.content
      .replace("setText(card.querySelector('.svc-new-h2'), item.title);", "")
      .replace("btn.classList.toggle('is-active', btn.dataset.filter === tag);", `btn.classList.toggle('is-active', btn.dataset.filter === tag);
                btn.setAttribute('aria-pressed', String(btn.dataset.filter === tag));
                btn.style.removeProperty('color');
                btn.style.removeProperty('-webkit-text-fill-color');`) : undefined,
  }));
  const page = { ...topPage, title: TOP_TITLE, style: topPage.style + homeLayoutStyles + homeServicesStyles + homeRefinementStyles + homeMobileStyles + homeMediaStyles + homeWorksStyles, body, scriptTags };
  return <><HomeIntro /><StaticHtmlPage page={page} contactLinks pageId="home-page" /><HomeAnchorRecovery /><HomeMotion /></>;
}
