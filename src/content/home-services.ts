const services = [
  {
    label: "INDOOR MAPPING", href: "#indoor-mapping",
    photo: "/service-chef-hero.png",
    title: "屋内<span>プロジェクションマッピング</span>",
    description: "店舗・ホテル・結婚式場の壁・床・テーブルを演出。常設から期間限定まで。",
    drawing: '<path d="M35 28 83 16v63L35 91Z M35 28v63L15 78V40Z M35 60l48-13 M35 60l48 19"/><circle cx="16" cy="60" r="5"/><path d="m21 57 14-20m-14 26 14 20"/>',
  },
  {
    label: "OUTDOOR MAPPING", href: "#outdoor-mapping",
    photo: "/images/blog/regional-revitalization-projection-mapping-historic-buildings-05.jpg",
    title: "屋外<span>イベントマッピング</span>",
    description: "建物の外壁・広場・観光地を舞台に、夜の集客イベントをつくります。",
    drawing: '<path d="M20 85V35l30-17 30 17v50M12 85h76M50 18v67M20 35l60 35M20 60l60-25M32 43v8m0 15v8m36-31v8m0 15v8"/><path d="M50 6v5m37 7-4 4M13 18l4 4"/>',
  },
  {
    label: "3DCG & FILM", href: "#3dcg",
    photo: "/images/home/service-cosmetics.webp",
    title: "3DCG<span>・映像制作</span>",
    description: "マッピング用コンテンツから3D広告・プロモーション映像まで制作します。",
    drawing: '<path d="m50 15 32 18v37L50 89 18 70V33Zm0 0v37m-32-19 32 19 32-19M50 52v37M18 70l32-18 32 18"/><circle cx="50" cy="52" r="10"/>',
  },
  {
    label: "AR / VR EXPERIENCE", href: "#arvr",
    photo: "/service-ar-xr.png",
    title: "AR/VR<span>・メタバース</span>",
    description: "空間と連動するARや没入型VRなど、次世代の体験を開発します。",
    drawing: '<path d="M24 38h52a8 8 0 0 1 8 8v17a8 8 0 0 1-8 8H61L50 61 39 71H24a8 8 0 0 1-8-8V46a8 8 0 0 1 8-8Z M30 38V28c0-15 40-15 40 0v10"/><circle cx="33" cy="53" r="6"/><circle cx="67" cy="53" r="6"/><path d="M8 30 3 25m89 5 5-5M31 84l-3 6m41-6 3 6"/>',
  },
];

export const homeServicesMarkup = `
<section class="service-overview" id="what-we-do" aria-labelledby="wwd-title">
  <div class="container">
    <header class="service-overview-head">
      <p class="service-overview-label">WHAT WE DO<span aria-hidden="true"></span>04 SERVICES</p>
      <h2 id="wwd-title"><span><span class="service-overview-phrase">プロジェクション</span><span class="service-overview-phrase">マッピングを中心に、</span></span><span class="service-overview-accent"><span class="service-overview-phrase">空間演出を</span><span class="service-overview-phrase">企画から設置まで。</span></span></h2>
      <p class="service-overview-scope">企画<span aria-hidden="true">—</span>制作<span aria-hidden="true">—</span>設置</p>
    </header>
    <div class="service-overview-grid">
      ${services.map((service, index) => `
      <a class="service-overview-card" href="${service.href}">
        <span class="service-overview-photo" aria-hidden="true"><img src="${service.photo}" alt="" loading="lazy" decoding="async"></span>
        <div class="service-overview-meta"><span>${service.label}</span><span class="service-overview-number">0${index + 1}</span></div>
        <svg class="service-overview-art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${service.drawing}</svg>
        <h3>${service.title}</h3>
        <p class="service-overview-description">${service.description}</p>
        <span class="service-overview-more">詳しく見る<span class="service-overview-arrow" aria-hidden="true">↗</span></span>
      </a>`).join("")}
    </div>
  </div>
</section>`;

export const homeServicesStyles = String.raw`
body #home-page #what-we-do { position: relative; isolation: isolate; overflow: hidden; padding: 96px 0 104px; background: radial-gradient(ellipse at 90% 12%, #cde8ec 0, transparent 56%), linear-gradient(135deg, #f8f5fc, #f1f6fa 58%, #edf7f5); }
/* A quiet projection scene adds depth behind the heading without competing with the copy. */
body #home-page #what-we-do::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: min(78%, 1100px);
  height: 580px;
  background: url('/top-value-spatial-v2.jpg') center / cover no-repeat;
  opacity: .28;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 75%), linear-gradient(180deg, transparent, #000 25%, #000 55%, transparent);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(90deg, transparent, #000 75%), linear-gradient(180deg, transparent, #000 25%, #000 55%, transparent);
  mask-composite: intersect;
  pointer-events: none;
  z-index: 0;
}
body #home-page #what-we-do > .container { position: relative; z-index: 1; }
body #home-page #what-we-do .service-overview-head { position: relative; margin-bottom: 48px; }
body #home-page #what-we-do .service-overview-label { display: flex; align-items: center; gap: 16px; margin: 0 0 28px; font: 500 10px/1.6 "Inter", sans-serif; letter-spacing: .16em; color: #66598a; -webkit-text-fill-color: #66598a; }
body #home-page #what-we-do .service-overview-label > span { width: 40px; height: 1px; background: #988ab580; }
body #home-page #what-we-do h2 { margin: 0; font: 400 clamp(26px, 2.65vw, 40px)/1.8 "Noto Serif JP", serif !important; letter-spacing: .035em !important; color: #27344d !important; -webkit-text-fill-color: #27344d !important; text-shadow: none !important; }
body #home-page #what-we-do h2 > span { display: block; color: inherit !important; -webkit-text-fill-color: currentColor !important; }
body #home-page #what-we-do h2 .service-overview-accent { color: #3d7d86 !important; -webkit-text-fill-color: #3d7d86 !important; }
body #home-page #what-we-do h2 .service-overview-phrase { display: inline-block; white-space: nowrap; color: inherit !important; -webkit-text-fill-color: currentColor !important; }
body #home-page #what-we-do .service-overview-scope { display: flex; align-items: center; gap: 12px; margin: 24px 0 0; font: 400 12px/1.8 "Noto Serif JP", serif; letter-spacing: .12em; color: #657186; -webkit-text-fill-color: #657186; }
body #home-page #what-we-do .service-overview-scope span { color: #94a3b3; -webkit-text-fill-color: #94a3b3; }
body #home-page #what-we-do .service-overview-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 20px; }
body #home-page #what-we-do .service-overview-card { --service-ink: #7663ad; --service-tint: #e9e3f580; display: flex; flex-direction: column; position: relative; isolation: isolate; padding: 30px 34px 24px; border: 1px solid #c9cadd90; border-radius: 3px; background: linear-gradient(120deg, #ffffffb8, var(--service-tint)); color: #27344d; text-decoration: none !important; transition: border-color .25s, background .25s, box-shadow .25s; }
body #home-page #what-we-do .service-overview-card:nth-child(2) { --service-ink: #607a9f; --service-tint: #e0eaf480; }
body #home-page #what-we-do .service-overview-card:nth-child(3) { --service-ink: #716ea5; --service-tint: #e8e7f480; }
body #home-page #what-we-do .service-overview-card:nth-child(4) { --service-ink: #32898b; --service-tint: #d7efeb80; }
body #home-page #what-we-do .service-overview-meta { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 28px; }
body #home-page #what-we-do .service-overview-meta > span { font: 500 10px/1.5 "Inter", sans-serif; letter-spacing: .12em; color: var(--service-ink) !important; -webkit-text-fill-color: var(--service-ink) !important; }
body #home-page #what-we-do .service-overview-meta .service-overview-number { font-size: 14px; font-weight: 400; letter-spacing: .03em; }
body #home-page #what-we-do .service-overview-art { position: absolute; top: 80px; right: 28px; width: 94px; height: 94px; color: var(--service-ink); opacity: .72; pointer-events: none; }
body #home-page #what-we-do h3 { position: relative; margin: 0 106px 20px 0 !important; min-height: 78px; font: 400 clamp(21px, 1.8vw, 26px)/1.6 "Noto Serif JP", serif !important; letter-spacing: .025em !important; color: #27344d !important; -webkit-text-fill-color: #27344d !important; text-shadow: none !important; }
body #home-page #what-we-do h3 span { display: block; font-size: .82em; color: inherit !important; -webkit-text-fill-color: currentColor !important; }
body #home-page #what-we-do .service-overview-description { flex: 1; margin: 0 0 24px; max-width: 34em; font: 400 14px/1.9 "Noto Sans JP", sans-serif !important; letter-spacing: .015em !important; color: #526078 !important; -webkit-text-fill-color: #526078 !important; text-shadow: none !important; }
body #home-page #what-we-do .service-overview-more { display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 48px; padding-top: 14px; border-top: 1px solid #b7becb60; font: 500 12px/1.6 "Noto Sans JP", sans-serif; letter-spacing: .06em; color: #53617a !important; -webkit-text-fill-color: #53617a !important; }
body #home-page #what-we-do .service-overview-arrow { display: grid; place-items: center; width: 32px; height: 32px; border: 1px solid #a6b2c480; border-radius: 50%; font-size: 18px; color: var(--service-ink) !important; -webkit-text-fill-color: var(--service-ink) !important; transition: background .25s, transform .25s; }
body #home-page #what-we-do .service-overview-photo { position: absolute; inset: 0; z-index: -1; border-radius: inherit; overflow: hidden; opacity: var(--service-photo-opacity, 0); transition: opacity .35s ease; pointer-events: none; }
body #home-page #what-we-do .service-overview-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center; transform: scale(var(--service-photo-scale, 1.035)); transition: transform .7s ease; }
body #home-page #what-we-do .service-overview-card[href="#outdoor-mapping"] .service-overview-photo { background: #080d10; }
body #home-page #what-we-do .service-overview-card[href="#outdoor-mapping"] .service-overview-photo img { object-fit: contain; object-position: right center; }
body #home-page #what-we-do .service-overview-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, #071225bd, #07122566), linear-gradient(0deg, #071225a6, transparent 75%); }
body #home-page #what-we-do .service-overview-card :is(h3, h3 span, .service-overview-description, .service-overview-more, .service-overview-arrow, .service-overview-meta > span) { -webkit-text-fill-color: var(--service-active-text, currentColor) !important; }
body #home-page #what-we-do .service-overview-card h3 { color: var(--service-active-text, #27344d) !important; }
body #home-page #what-we-do .service-overview-card h3 span { color: inherit !important; }
body #home-page #what-we-do .service-overview-card .service-overview-description { color: var(--service-active-text, #526078) !important; }
body #home-page #what-we-do .service-overview-card .service-overview-more { color: var(--service-active-text, #53617a) !important; border-color: var(--service-active-border, #b7becb60); }
body #home-page #what-we-do .service-overview-card :is(.service-overview-arrow, .service-overview-meta > span) { color: var(--service-active-text, var(--service-ink)) !important; }
body #home-page #what-we-do .service-overview-card .service-overview-arrow { border-color: var(--service-active-border, #a6b2c480); }
body #home-page #what-we-do .service-overview-art { opacity: var(--service-art-opacity, .72); transition: opacity .25s; }
body #home-page #what-we-do .service-overview-card:focus-visible { --service-photo-opacity: 1; --service-photo-scale: 1; --service-active-text: #fff; --service-art-opacity: 0; --service-active-border: #ffffff70; }
@media (hover: hover) {
  body #home-page #what-we-do .service-overview-card:hover { --service-photo-opacity: 1; --service-photo-scale: 1; --service-active-text: #fff; --service-art-opacity: 0; --service-active-border: #ffffff70; border-color: var(--service-ink); box-shadow: 0 12px 32px #3d536820; }
  body #home-page #what-we-do .service-overview-card:hover .service-overview-arrow { transform: translate(2px,-2px); background: #ffffff1a; }
}
@media (max-width: 1000px) {
  body #home-page #what-we-do .service-overview-card { padding-inline: 24px; }
  body #home-page #what-we-do .service-overview-art { width: 64px; height: 64px; right: 20px; }
  body #home-page #what-we-do h3 { margin-right: 66px !important; }
}
@media (max-width: 768px), (max-width: 1024px) and (max-height: 520px) {
  body #home-page #what-we-do { padding: 64px 0; }
  body #home-page #what-we-do .service-overview-head { margin-bottom: 32px; }
  body #home-page #what-we-do h2 { font-size: clamp(22px, 5.8vw, 32px) !important; line-height: 1.8 !important; letter-spacing: .01em !important; }
  body #home-page #what-we-do .service-overview-grid { grid-template-columns: minmax(0,1fr); gap: 16px; }
  body #home-page #what-we-do .service-overview-card { --service-active-text: #30455b !important; --service-active-border: #b7becb60 !important; padding: 24px 22px 20px; }
  body #home-page #what-we-do .service-overview-photo { position: relative; inset: auto; z-index: auto; opacity: 1; aspect-ratio: 16/9; margin: -24px -22px 24px; border-radius: 3px 3px 0 0; }
  body #home-page #what-we-do .service-overview-photo::after { display: none; }
  body #home-page #what-we-do .service-overview-photo img { transform: none; }
  body #home-page #what-we-do .service-overview-meta { margin-bottom: 22px; }
  body #home-page #what-we-do .service-overview-meta > span { font-size: 9px; }
  body #home-page #what-we-do .service-overview-art { display: none; }
  body #home-page #what-we-do h3 { font-size: 23px !important; min-height: 0; margin-right: 0 !important; padding-top: 0; }
  body #home-page #what-we-do h3 span { position: relative; margin-top: 8px; font-size: clamp(14px, 3.8vw, 18px); max-width: 100%; }
  body #home-page #what-we-do .service-overview-description { font-size: 14px !important; }
}
@media (min-width: 769px) and (max-width: 1024px) and (max-height: 520px) {
  body #home-page #what-we-do .service-overview-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  body #home-page #what-we-do :is(.service-overview-card,.service-overview-arrow,.service-overview-art,.service-overview-photo,.service-overview-photo img) { transition: none; }
}
`;
