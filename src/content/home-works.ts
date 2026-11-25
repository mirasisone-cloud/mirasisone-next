import works from "./home-works-data.json";

const escapeHtml = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const filters = ["すべて", "プロジェクションマッピング", "3DCG", "ライブ映像"];

export const homeWorksMarkup = `
<section id="venues" class="works-section" aria-labelledby="home-works-title">
  <div class="container">
    <div class="works-header"><header class="refined-heading"><p>SCENES WE'VE BUILT</p><h2 id="home-works-title">私たちが作った景色</h2></header></div>
    <div class="works-filters" id="works-filters" role="group" aria-label="実績のカテゴリー">
      ${filters.map((filter, i) => `<button type="button" class="works-filter-btn${i === 0 ? " is-active" : ""}" data-filter="${filter}">${filter}</button>`).join("")}
    </div>
    <div class="works-grid" id="works-grid">
      ${works.map(work => {
        const external = work.href.startsWith("http");
        const note = "note" in work && work.note ? `<span class="real-work-note">${escapeHtml(work.note as string)}</span>` : "";
        // 自サイトの記事に飛ぶものだけは「映像」と言わない（和ノ音は解説記事）
        const label = external ? "映像を見る" : "詳しく見る";
        return `<article class="works-card real-work" data-tags="${work.category}">
        <a class="real-work-link" href="${work.href}"${external ? ` target="_blank" rel="noopener"` : ""} aria-label="${escapeHtml(work.title)}を${label}${external ? "（新しいタブで開きます）" : ""}">
          <span class="real-work-photo"><img src="${work.image}" alt="${escapeHtml(work.alt)}" width="${work.width}" height="${work.height}" loading="lazy" decoding="async"><span class="real-work-play" aria-hidden="true">${label}</span></span>
          <span class="real-work-caption"><span class="real-work-category">${work.category}</span><span class="real-work-title">${escapeHtml(work.title)}</span>${note}</span>
        </a>
      </article>`;
      }).join("")}
    </div>
    <p class="works-empty" id="works-empty" style="display:none">該当する実績が見つかりませんでした。</p>
  </div>
</section>`;

export const homeWorksStyles = String.raw`
body #home-page #venues .works-grid { grid-template-columns: repeat(3,minmax(0,1fr)) !important; gap: 28px 20px !important; }
body #home-page #venues .real-work { display: block; aspect-ratio: auto !important; background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; color: #27364e; overflow: visible !important; }
body #home-page #venues .real-work.is-hidden { display: none !important; }
/*
  2026-11-25: カードが <article> のままでどこにも飛べず、映像を見る手段が無かった
  （クライアントから「動画が見れるページに飛べない」と指摘）。素材には各作品の視聴URLが
  入っているので、カード全体をリンクにして、写真の上に「映像を見る」を出す。
*/
body #home-page #venues .real-work-link { display: block; color: inherit; text-decoration: none; }
body #home-page #venues .real-work-photo { display: block; position: relative; overflow: hidden; border-radius: 4px; aspect-ratio: 4/3; background: #10161f; }
body #home-page #venues .real-work-photo img { display: block; width: 100%; height: 100%; object-fit: cover; filter: none; transition: transform .4s ease; transform: none; }
/*
  常に見える位置に置くこと。ホバーで初めて出る作りだと「押せる」と気づけないので、
  今回の指摘（動画のページに辿り着けない）が再発する。
*/
body #home-page #venues .real-work-play {
  position: absolute; top: 9px; right: 9px; display: inline-flex; align-items: center; gap: 5px;
  border-radius: 100px; padding: 5px 10px; background: rgba(255,255,255,.92);
  font: 700 10px/1 "Noto Sans JP", sans-serif; letter-spacing: .05em; white-space: nowrap;
  color: #17182c; -webkit-text-fill-color: #17182c;
  box-shadow: 0 3px 12px rgba(11,13,28,.26); transition: background .25s ease, transform .25s ease;
}
body #home-page #venues .real-work-play::before { content: "▶"; font-size: 8px; }
body #home-page #venues .real-work-link:hover .real-work-play,
body #home-page #venues .real-work-link:focus-visible .real-work-play { background: #fff; transform: scale(1.05); }
body #home-page #venues .real-work-link:hover .real-work-photo img { transform: scale(1.03); }
body #home-page #venues .real-work-link:focus-visible { outline: 2px solid #7B6CF6; outline-offset: 3px; border-radius: 6px; }
body #home-page #venues .real-work-link:hover .real-work-title { text-decoration: underline; text-underline-offset: 3px; }
body #home-page #venues .real-work-note { font: 400 10px/1.5 "Noto Sans JP",sans-serif; color: #8b93a6; -webkit-text-fill-color: #8b93a6; }
body #home-page #venues .real-work-caption { display: grid; gap: 5px; padding: 13px 0 0; }
body #home-page #venues .real-work-category { font: 400 10px/1.6 "Noto Sans JP",sans-serif; letter-spacing: .07em; color: #6a5b91; -webkit-text-fill-color: #6a5b91; }
body #home-page #venues .real-work-title { font: 500 15px/1.65 "Noto Sans JP",sans-serif; color: #27364e; -webkit-text-fill-color: #27364e; overflow-wrap: anywhere; }
body #home-page #venues .works-filter-btn { color: #536179 !important; -webkit-text-fill-color: #536179 !important; }
body #home-page #venues .works-filter-btn.is-active { color: white !important; -webkit-text-fill-color: white !important; }
@media(max-width:767px) {
  body #home-page #venues .works-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; gap: 20px 12px !important; }
  body #home-page #venues .real-work-title { font-size: 12px; line-height: 1.65; }
  body #home-page #venues .real-work-category { font-size: 9px; letter-spacing: 0; }
  body #home-page #venues .real-work-caption { padding-top: 9px; gap: 3px; }
  body #home-page #venues .real-work-play { top: 7px; right: 7px; padding: 4px 8px; font-size: 9px; }
  body #home-page #venues .real-work-note { font-size: 9px; }
}
`;
