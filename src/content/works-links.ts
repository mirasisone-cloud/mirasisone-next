import works from "./home-works-data.json";

/**
 * /works の実績カードを、映像が見られるページへのリンクにする。
 *
 * 2026-11-25: クライアントから「ホームページから動画が見れるページに飛べない」と指摘があった。
 * 実際このページのカードは <article> のままで、どこにも飛べなかった。映像へ行く手段は
 * 構造化データの中に書かれたポートフォリオURLだけで、画面上には出ていなかった。
 *
 * 各作品の視聴URLはTOPと同じ home-works-data.json に入っているので、見出し（h3）で
 * 突き合わせてリンクにする。URLが無い作品はこれまでどおりリンクにしない。
 */

// /works 側の見出しと home-works-data.json のタイトルで表記が違うもの
const TITLE_ALIASES: Record<string, string> = {
  "小人シェフのレストラン @渋谷 Whitely": "小人レストラン Whitely",
  "KEN by Kamatsuda @Dubai": "KEN by Kamatsuda",
  "コスメCG": "コスメCG / クリエイター作品",
};

const HREF_BY_TITLE = new Map(works.map((w) => [w.title, w.href]));

const findHref = (title: string) => {
  const t = title.trim();
  return HREF_BY_TITLE.get(TITLE_ALIASES[t] ?? t);
};

const decode = (s: string) =>
  s.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">");

export function withWorkLinks(body: string) {
  return body.replace(/<article class="work-card"([^>]*)>([\s\S]*?)<\/article>/g, (tag, attrs: string, inner: string) => {
    const title = (inner.match(/<h3>([\s\S]*?)<\/h3>/) || [])[1];
    if (!title) return tag;
    const href = findHref(decode(title.replace(/<[^>]*>/g, "")));
    if (!href) return tag;
    const external = href.startsWith("http");
    const label = `${decode(title.replace(/<[^>]*>/g, ""))}の映像を見る${external ? "（新しいタブで開きます）" : ""}`;
    return `<article class="work-card is-linked"${attrs}><a class="work-card-link" href="${href}"${
      external ? ' target="_blank" rel="noopener"' : ""
    } aria-label="${label}">${inner}<span class="work-card-play" aria-hidden="true">映像を見る</span></a></article>`;
  });
}

export const workLinkStyles = `
  .work-card-link { display: block; height: 100%; color: inherit; text-decoration: none; }
  .work-card-link:focus-visible { outline: 2px solid var(--purple, #7B6CF6); outline-offset: 3px; }
  /*
    常に見える位置に置く。ホバーで初めて出る作りだと、そもそも押せることに気づけない
    （今回の指摘はまさにそれ）。カード下部の説明文とは重ならないよう右上に出す。
  */
  .work-card-play {
    position: absolute; z-index: 3; top: 12px; right: 12px;
    display: inline-flex; align-items: center; gap: 5px;
    border-radius: 100px; padding: 6px 11px;
    background: rgba(255,255,255,0.92);
    font: 700 10px/1 "Noto Sans JP", sans-serif; letter-spacing: .06em;
    color: #17182c; white-space: nowrap;
    box-shadow: 0 4px 14px rgba(11,13,28,.28);
    transition: background .25s ease, transform .25s ease;
  }
  .work-card-play::before { content: "▶"; font-size: 8px; }
  .work-card-link:hover .work-card-play,
  .work-card-link:focus-visible .work-card-play { background: #fff; transform: scale(1.05); }
  .work-card-link:hover h3 { text-decoration: underline; text-underline-offset: 3px; }
  .work-note { margin-top: 6px; color: rgba(255,255,255,0.6) !important; font-size: 11px; line-height: 1.5; }
  @media (max-width: 640px) {
    .work-card-play { top: 9px; right: 9px; padding: 5px 9px; font-size: 9px; }
  }
`;
