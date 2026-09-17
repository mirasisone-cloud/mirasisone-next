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
      ${works.map(work => `<article class="works-card real-work" data-tags="${work.category}" aria-label="${escapeHtml(work.title)}">
        <span class="real-work-photo"><img src="${work.image}" alt="${escapeHtml(work.alt)}" width="${work.width}" height="${work.height}" loading="lazy" decoding="async"></span>
        <span class="real-work-caption"><span class="real-work-category">${work.category}</span><span class="real-work-title">${escapeHtml(work.title)}</span></span>
      </article>`).join("")}
    </div>
    <p class="works-empty" id="works-empty" style="display:none">該当する実績が見つかりませんでした。</p>
  </div>
</section>`;

export const homeWorksStyles = String.raw`
body #home-page #venues .works-grid { grid-template-columns: repeat(3,minmax(0,1fr)) !important; gap: 28px 20px !important; }
body #home-page #venues .real-work { display: block; aspect-ratio: auto !important; background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; color: #27364e; overflow: visible !important; cursor: default; }
body #home-page #venues .real-work.is-hidden { display: none !important; }
body #home-page #venues .real-work-photo { display: block; position: relative; overflow: hidden; border-radius: 4px; aspect-ratio: 4/3; background: #10161f; }
body #home-page #venues .real-work-photo img { display: block; width: 100%; height: 100%; object-fit: cover; filter: none; transition: none; transform: none; }
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
}
`;
