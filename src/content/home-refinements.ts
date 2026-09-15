import { homeWhyUsMarkup, homeWhyUsStyles } from "./home-why-us";

const spaces = [
  { title: "人が集う空間", en: "CULTURE & COMMERCE", image: "/service-immersive.png", types: "店舗・商業施設 / ショッピングモール・複合施設 / 文化施設・ミュージアム", copy: "足を運びたくなる、記憶に残る場所へ。" },
  { title: "滞在を楽しむ空間", en: "HOSPITALITY", image: "/service-chef-hero.png", types: "ホテル・旅館 / 結婚式場・披露宴会場", copy: "食事やお祝いの時間を、特別な体験へ。" },
  { title: "学び・働く空間", en: "WORK & LEARNING", image: "/top-value-planning-v2.jpg", types: "オフィス・コーポレート空間 / 医療・教育施設", copy: "伝える、学ぶ、つながる。そのきっかけを空間に。" },
  { title: "街とつながる空間", en: "CITY & OUTDOOR", image: "/images/blog/regional-revitalization-projection-mapping-historic-buildings-02.jpg", types: "パブリックスペース・広場 / 建築外壁・ファサード / フェス・野外イベント / 観光地・地域振興", copy: "いつもの景色に、新しい物語を。" },
];

const spacesMarkup = `
<section class="space-guide" id="spaces" aria-labelledby="space-guide-title">
  <div class="container">
    <header class="refined-heading"><p>ANY SPACE, ANY STORY</p><h2 id="space-guide-title">どんな空間にも、<span>物語を。</span></h2><div class="refined-lead">屋内から屋外まで。場所の特性に合わせて、体験を企画します。</div></header>
    <div class="space-guide-grid">${spaces.map((space, index) => `
      <a class="space-guide-card" href="/contact">
        <span class="space-guide-photo" aria-hidden="true"><img src="${space.image}" alt="" loading="lazy" decoding="async"></span>
        <span class="space-guide-top"><span>${space.en}</span><span>0${index + 1}</span></span>
        <h3>${space.title}</h3>
        <p class="space-guide-copy">${space.copy}</p>
        <p class="space-guide-types">${space.types}</p>
        <span class="space-guide-more">この空間について相談する<span aria-hidden="true">↗</span></span>
      </a>`).join("")}</div>
  </div>
</section>`;

function refineHeadings(body: string) {
  // Avoid legacy scripts that inject inline layout rules into .pov-* headings.
  const openings = /<div class="pov-heading-wrap[^"]*"[^>]*>/g;
  let cursor = 0;
  let result = "";
  let opening: RegExpExecArray | null;
  while ((opening = openings.exec(body))) {
    const tags = /<\/?div\b[^>]*>/g;
    tags.lastIndex = opening.index;
    let depth = 0;
    let end = 0;
    let tag: RegExpExecArray | null;
    while ((tag = tags.exec(body))) {
      depth += tag[0].startsWith("</") ? -1 : 1;
      if (depth === 0) { end = tags.lastIndex; break; }
    }
    if (!end) break;
    const original = body.slice(opening.index, end);
    const en = original.match(/class="pov-en[^"]*"[^>]*>([^<]*)/i)?.[1] ?? "";
    let ja = original.match(/class="pov-ja[^"]*"[^>]*>([^<]*)/i)?.[1] ?? "";
    if (en === "QUESTIONS") ja = "よくあるご質問";
    if (en === "WORK FLOW") ja = "企画から実施まで、<br>8ステップで伴走します。";
    result += body.slice(cursor, opening.index) + '<header class="refined-heading"><p>' + en + '</p>' + (ja ? '<h2>' + ja + '</h2>' : '') + '</header>';
    cursor = end;
    openings.lastIndex = end;
  }
  return result + body.slice(cursor);
}

/** Changes apply only to the homepage, leaving the original imported source intact. */
export function refineHomeContent(body: string) {
  const strengthImages = ["/top-value-planning-v2.jpg", "/top-value-spatial-v2.jpg", "/top-value-technical-v2.jpg"];
  const serviceImages: Record<string, [string, string, string]> = {
    "屋内PM": ["/service-immersive.png", "/top-value-spatial-v2.jpg", "壁と床に映像が広がる屋内空間のイメージ"],
    "屋外PM": [spaces[3].image, spaces[3].image, "歴史的建造物への屋外マッピングのイメージ"],
    "3DCG": ["/service-3dcg-visual-v2.png", "/service-3dcg-visual-v2.png", "金属とガラスの立体造形がワイヤーフレームへつながる3DCG・映像制作のイメージ"],
    "ARVR": ["/service-ar-xr.png", "/service-ar-xr.png", "スマートフォンを通じたAR空間体験のイメージ"],
  };
  return refineHeadings(body)
    .replace(/<section class="ia-section" id="why-us">[\s\S]*?<\/section>/, homeWhyUsMarkup)
    .replace(/<img class="svc-img svc-img-(main|hover)" src="[^"]*" alt="(屋内PM|屋外PM|3DCG|ARVR) [12]">/g, (_, state: string, type: string) => {
      const photos = serviceImages[type];
      return `<img class="svc-img svc-img-${state}" src="${photos[state === "main" ? 0 : 1]}" alt="${state === "main" ? photos[2] : ""}" loading="lazy" decoding="async">`;
    })
    .replace(/<section class="venues-section">[\s\S]*?<\/section>/, spacesMarkup)
    .replace('<section class="str2-section">', '<section class="str2-section" id="our-value">')
    .replace('<section class="news-section">', '<section class="news-section" id="updates">')
    .replace(/<div class="str2-item" data-img="([0-2])">/g, (_, index: string) => `<div class="str2-item" data-img="${index}" tabindex="0"><img class="strength-mobile-photo" src="${strengthImages[Number(index)]}" alt="" loading="lazy" decoding="async">`)
    .replace(/<div class="about-ceo-placeholder-inner">[\s\S]*?<\/div>/, '<div class="about-brand-panel"><span class="about-brand-label">OUR VISION</span><span class="about-brand-word">空間に、<br>まだない体験を。</span><span class="about-brand-sign">MIRASISONE</span></div>')
    .replace('※ CEO略歴・メッセージを別途入稿', '')
    .replace('<a href="/">STORY</a>', '<a href="#ss-p3">STORY</a>')
    .replace('<a href="/">VALUE</a>', '<a href="#our-value">VALUE</a>')
    .replaceAll('href="#top"', 'href="#home-intro"');
}

export const homeRefinementStyles = String.raw`
/* Shared visual rhythm for the rest of the homepage. */
body #home-page :is(.str2-section,.ia-section,.services-section,.works-section,.testimonials-section,.news-section,.process-section,.faq-section,.about-section,.space-guide) { padding: 88px 0 !important; }
body #home-page :is(.str2-section,.services-section,.news-section,.faq-section,.space-guide) { background: linear-gradient(135deg,#f5f3fbea,#edf7f7ea) !important; }
body #home-page :is(.ia-section,.works-section,.testimonials-section,.process-section,.about-section) { background: #f5f7fbe8 !important; }
body #home-page .pov-multi-reveal { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
body #home-page .pov-en { font: 500 11px/1.8 "Inter",sans-serif !important; letter-spacing: .17em !important; background: none !important; color: #6a5b91 !important; -webkit-text-fill-color: #6a5b91 !important; text-shadow: none !important; }
body #home-page .pov-ja { font: 400 clamp(26px,3vw,40px)/1.65 "Noto Serif JP",serif !important; letter-spacing: .045em !important; color: #27364e !important; -webkit-text-fill-color: #27364e !important; text-shadow: none !important; }
body #home-page .pov-divider, body #home-page .pov-dot { display: none !important; }
body #home-page .pov-heading-wrap { margin-bottom: 40px !important; }
body #home-page .pov-line-wrap { width: 72px !important; height: 1px !important; margin: 22px 0 0 !important; }
body #home-page .pov-line { width: 72px !important; height: 1px !important; box-shadow: none !important; background: linear-gradient(90deg,#8e7ab5,#58a6a7) !important; }
body #home-page :is(.services-side-h1,.venues-side-h1) { font: 400 clamp(26px,3vw,40px)/1.65 "Noto Serif JP",serif !important; letter-spacing: .06em !important; color: #354263 !important; -webkit-text-fill-color: #354263 !important; text-shadow: none !important; background: none !important; }
body #home-page :is(.str2-item-title,.ia-row-title,.ia-row-catchcopy,.svc-new-h2,.htl-title,.about-ceo-heading,.about-info-title) { font-family: "Noto Serif JP",serif !important; font-weight: 400 !important; letter-spacing: .035em !important; text-shadow: none !important; }
body #home-page :is(.str2-item-desc,.about-ceo-message,.about-ceo-message p) { font: 400 15px/2 "Noto Sans JP",sans-serif !important; letter-spacing: .015em !important; color: #4e5e74 !important; -webkit-text-fill-color: #4e5e74 !important; }
body #home-page :is(.str2-item,.ia-row,.svc-new-card,.voice-card,.news-card,.htl-step,.vs-card) { border: 1px solid #cbd3df !important; border-radius: 4px !important; box-shadow: none !important; }
body #home-page .str2-item { padding: 24px !important; background: #ffffff70 !important; }
body #home-page .str2-item:is(:hover,:focus-visible,.is-default) { background: linear-gradient(120deg,#eee8fa,#e4f2f4) !important; border-color: #9c97bc !important; }
body #home-page .str2-item-title { font-size: 28px !important; line-height: 1.6 !important; }
body #home-page .str2-item-en { font-size: 10px !important; letter-spacing: .13em !important; color: #706087 !important; -webkit-text-fill-color: #706087 !important; }
body #home-page .str2-num { font: 400 14px/1.6 "Inter",sans-serif !important; }
body #home-page .str2-image-wrap { border-radius: 4px !important; }
body #home-page .strength-mobile-photo { display: none; }
body #home-page .ia-row { padding: 32px !important; min-height: 0 !important; }
body #home-page .ia-row-content { gap: 24px !important; }
body #home-page .ia-row-issue, body #home-page .ia-row-approach { border-radius: 3px !important; box-shadow: none !important; }
body #home-page .svc-new-card { padding: 24px !important; background: #ffffff70 !important; }
body #home-page .services-header { display: block !important; width: 100% !important; grid-column: 1 / -1; }
/* The imported scripts add this obsolete decorative title after initialization. */
body #home-page .services-side-h1 { position: absolute !important; content-visibility: hidden !important; width: 0 !important; height: 0 !important; min-height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: 0 !important; }
body #home-page .svc-new-visual { border-radius: 3px !important; }
body #home-page .svc-new-visual::before { font: 500 11px/1.6 "Inter",sans-serif !important; letter-spacing: .12em !important; color: #fff !important; -webkit-text-fill-color: #fff !important; -webkit-text-stroke: 0 !important; text-shadow: none !important; background: #0a1831b3 !important; padding: 8px 12px !important; width: fit-content !important; }
body #home-page .svc-new-text { margin-block: 20px !important; font: 400 14px/1.9 "Noto Sans JP",sans-serif !important; }
body #home-page :is(.svc-new-cta,.process-cta-btn,.news-view-all,.venues-cta-btn) { border: 1px solid #9c9fb8 !important; border-radius: 3px !important; background: #ffffff80 !important; box-shadow: none !important; color: #42667a !important; -webkit-text-fill-color: #42667a !important; min-height: 48px; }
body #home-page .svc-new-cta * { color: inherit !important; -webkit-text-fill-color: currentColor !important; }
body #home-page .voice-grid { gap: 24px !important; }
body #home-page .voice-card { background: #ffffff80 !important; }
body #home-page .voice-body { padding: 24px !important; }
body #home-page .voice-quote { font: 400 16px/1.9 "Noto Serif JP",serif !important; color: #35445d !important; -webkit-text-fill-color: #35445d !important; }
body #home-page .voice-company { border-top: 1px solid #cdd6e0 !important; padding-top: 20px !important; }
body #home-page .news-header { align-items: flex-end !important; }
body #home-page .news-card { background: #ffffff80 !important; overflow: hidden; padding: 18px !important; }
body #home-page .news-img-wrap { border-radius: 3px !important; aspect-ratio: 16/10; height: auto !important; overflow: hidden; }
body #home-page .news-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
body #home-page .news-title { font-family: "Noto Serif JP",serif !important; font-weight: 400 !important; }
body #home-page .news-view-all { padding: 10px 18px; font-size: 11px !important; letter-spacing: .12em !important; }
body #home-page .htl-step { background: #ffffff85 !important; text-align: left !important; position: relative; }
body #home-page .htl-dot { position: relative !important; inset: auto !important; transform: none !important; width: 40px !important; height: 40px !important; margin: 0 0 24px !important; background: transparent !important; border: 1px solid #9caac4 !important; box-shadow: none !important; }
body #home-page .htl-dot i { color: #647c94 !important; -webkit-text-fill-color: #647c94 !important; font-size: 18px !important; }
body #home-page .htl-num { position: absolute !important; top: 28px !important; right: 22px !important; margin: 0 !important; font: 400 13px/1.6 "Inter",sans-serif !important; color: #766b9a !important; -webkit-text-fill-color: #766b9a !important; }
body #home-page .htl-title { min-height: 58px; margin: 0 0 12px !important; }
body #home-page .htl-desc { margin: 0 !important; font: 400 14px/1.9 "Noto Sans JP",sans-serif !important; }
body #home-page .htl-step::before, body #home-page .htl-step::after { display: none !important; }
body #home-page .process-section .vtl-wrap { display: none !important; }
body #home-page .process-section .htl-wrap { display: block !important; }
body #home-page .faq-section > .container { display: grid !important; grid-template-columns: minmax(0, .7fr) minmax(0,1.3fr) !important; gap: 56px !important; align-items: start !important; }
body #home-page .faq-intro { width: 100% !important; }
body #home-page .refined-faq-title { font: 400 clamp(26px,3vw,40px)/1.65 "Noto Serif JP",serif !important; margin-top: -16px; color: #27364e !important; -webkit-text-fill-color: #27364e !important; }
body #home-page .faq-list { width: 100% !important; margin: 0 !important; }
body #home-page .faq-list details { background: #ffffff60 !important; border: 1px solid #cbd3df !important; border-radius: 3px !important; box-shadow: none !important; margin-bottom: 12px !important; }
body #home-page .faq-list details[open] { background: #fff9 !important; border-color: #a9b2c8 !important; }
body #home-page .faq-list summary { font: 400 17px/1.8 "Noto Serif JP",serif !important; padding: 22px 24px !important; color: #35445d !important; -webkit-text-fill-color: #35445d !important; }
body #home-page .faq-list summary::before { background: none !important; border: 0 !important; box-shadow: none !important; color: #8270a8 !important; -webkit-text-fill-color: #8270a8 !important; }
body #home-page .faq-answer { padding: 0 24px 24px !important; font: 400 14px/2 "Noto Sans JP",sans-serif !important; }
body #home-page .about-top { gap: 56px !important; align-items: center !important; }
body #home-page .about-ceo-placeholder { background: linear-gradient(135deg,#e6e0f6,#d6eeee) !important; border-radius: 4px !important; border: 1px solid #c0cadc !important; box-shadow: none !important; }
body #home-page .about-brand-panel { position: relative; display: flex; flex-direction: column; justify-content: center; gap: 32px; padding: 40px; height: 100%; min-height: 320px; }
body #home-page .about-brand-label, body #home-page .about-brand-sign { font: 500 10px/1.8 "Inter",sans-serif !important; letter-spacing: .19em !important; color: #6d638e !important; -webkit-text-fill-color: #6d638e !important; }
body #home-page .about-brand-word { font: 400 clamp(24px,2.1vw,30px)/1.8 "Noto Serif JP",serif !important; letter-spacing: .04em; color: #426b7b !important; -webkit-text-fill-color: #426b7b !important; }
body #home-page .about-info-row { background: #ffffff60 !important; border: 0 !important; border-bottom: 1px solid #d1d9e3 !important; border-radius: 0 !important; }
body #home-page .about-info-row dt { font-size: 13px !important; color: #696284 !important; -webkit-text-fill-color: #696284 !important; }
body #home-page .about-info-row dd { font-size: 14px !important; color: #43516a !important; -webkit-text-fill-color: #43516a !important; }
body #home-page .contact-cta-card { border-radius: 4px !important; border: 1px solid #b6c9d6 !important; box-shadow: none !important; }
body #home-page .contact-cta-title { font-family: "Noto Serif JP",serif !important; font-weight: 400 !important; }
/* Space categories preserve all eleven venue types while making the visuals useful. */
body #home-page .refined-heading { display: block !important; width: 100% !important; text-align: left !important; margin-bottom: 40px; }
body #home-page .refined-heading > p { font: 500 11px/1.8 "Inter",sans-serif !important; letter-spacing: .17em !important; color: #6a5b91 !important; -webkit-text-fill-color: #6a5b91 !important; margin-bottom: 18px; }
body #home-page .refined-heading h2 { display: block !important; margin: 0 !important; text-align: left !important; font: 400 clamp(28px,3vw,40px)/1.7 "Noto Serif JP",serif !important; color: #27364e !important; -webkit-text-fill-color: #27364e !important; }
body #home-page .refined-heading h2 span { display: inline-block; color: #3d7d86 !important; -webkit-text-fill-color: #3d7d86 !important; }
body #home-page .refined-lead { margin-top: 20px; font: 400 14px/1.9 "Noto Sans JP",sans-serif; color: #526078; }
body #home-page .space-guide-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 24px; }
body #home-page .space-guide-card { position: relative; isolation: isolate; display: flex; flex-direction: column; padding: 30px; min-width: 0; border: 1px solid #c3cfdb; border-radius: 4px; background: linear-gradient(120deg,#ffffffc0,#e1edf180); text-decoration: none; }
body #home-page .space-guide-photo { position: absolute; inset: 0; z-index: -1; overflow: hidden; border-radius: inherit; opacity: var(--space-photo,0); transition: opacity .35s; }
body #home-page .space-guide-photo img { width: 100%; height: 100%; object-fit: cover; }
body #home-page .space-guide-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg,#071225c9,#07122580); }
body #home-page .space-guide-top { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 26px; }
body #home-page .space-guide-top > span { font: 500 10px/1.6 "Inter",sans-serif; letter-spacing: .12em; color: var(--space-text,#736591) !important; -webkit-text-fill-color: currentColor !important; }
body #home-page .space-guide-card h3 { font: 400 28px/1.6 "Noto Serif JP",serif !important; color: var(--space-text,#30455b) !important; -webkit-text-fill-color: currentColor !important; margin: 0 0 16px; }
body #home-page .space-guide-copy { font: 400 15px/1.9 "Noto Serif JP",serif !important; color: var(--space-text,#526078) !important; -webkit-text-fill-color: currentColor !important; margin: 0 0 16px; }
body #home-page .space-guide-types { flex: 1; font: 400 12px/2 "Noto Sans JP",sans-serif !important; color: var(--space-text,#637188) !important; -webkit-text-fill-color: currentColor !important; margin: 0 0 26px; }
body #home-page .space-guide-more { display: flex; align-items: center; justify-content: space-between; min-height: 48px; padding-top: 12px; border-top: 1px solid #aebfc280; font: 400 12px/1.8 "Noto Sans JP",sans-serif; color: var(--space-text,#52677d) !important; -webkit-text-fill-color: currentColor !important; }
body #home-page .space-guide-more > span { font-size: 24px; color: inherit !important; -webkit-text-fill-color: currentColor !important; }
body #home-page .space-guide-card:focus-visible { --space-photo: 1; --space-text: #fff; }
@media (hover:hover) {
  body #home-page .space-guide-card:hover { --space-photo: 1; --space-text: #fff; }
  body #home-page .news-card:hover img { transform: scale(1.035); }
  body #home-page :is(.svc-new-cta,.process-cta-btn,.news-view-all):hover { background: #e4edf5 !important; }
}
@media (max-width: 1000px) {
  body #home-page .faq-section > .container { grid-template-columns: minmax(0,1fr) !important; gap: 24px !important; }
  body #home-page .about-top { gap: 28px !important; }
}
@media (max-width: 768px), (max-width: 1024px) and (max-height: 520px) {
  body #home-page :is(.str2-section,.ia-section,.services-section,.works-section,.testimonials-section,.news-section,.process-section,.faq-section,.about-section,.space-guide) { padding: 64px 0 !important; }
  body #home-page .pov-heading-wrap { margin-bottom: 32px !important; }
  body #home-page .pov-ja { font-size: 26px !important; }
  body #home-page .str2-list { gap: 20px !important; }
  body #home-page .str2-item { display: flex !important; flex-wrap: wrap; gap: 16px !important; padding: 18px !important; }
  body #home-page .strength-mobile-photo { display: block; width: 100%; height: auto; aspect-ratio: 16/10; object-fit: cover; border-radius: 3px; order: -1; }
  body #home-page .str2-item-desc { display: block !important; width: 100% !important; max-height: none !important; height: auto !important; opacity: 1 !important; visibility: visible !important; margin: 0 !important; font-size: 14px !important; }
  body #home-page .str2-section .str2-image-wrap { display: none !important; }
  body #home-page .ia-row { padding: 16px !important; }
  body #home-page .svc-new-card { padding: 16px !important; }
  body #home-page .svc-new-h2 { font-size: 18px !important; line-height: 1.8 !important; letter-spacing: .01em !important; }
  body #home-page .htl-title { min-height: 0; }
  body #home-page .htl-step { padding: 24px !important; min-height: 0 !important; height: auto !important; }
  body #home-page .faq-list summary { font-size: 16px !important; padding: 18px 16px !important; }
  body #home-page .faq-answer { padding: 0 16px 20px !important; }
  body #home-page .news-header { flex-wrap: wrap !important; gap: 16px !important; }
  body #home-page .about-brand-panel { min-height: 250px; padding: 28px; gap: 24px; }
  body #home-page .space-guide-grid { grid-template-columns: minmax(0,1fr); gap: 20px; }
  body #home-page .space-guide-card { --space-text: #30455b !important; padding: 20px; }
  body #home-page .space-guide-photo { position: relative; inset: auto; z-index: auto; opacity: 1; aspect-ratio: 16/9; margin: -20px -20px 24px; border-radius: 3px 3px 0 0; }
  body #home-page .space-guide-photo::after { display: none; }
  body #home-page .space-guide-card h3 { font-size: 25px !important; }
}
@media (min-width: 769px) and (max-width: 1024px) and (max-height: 520px) {
  body #home-page .space-guide-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
@media (prefers-reduced-motion:reduce) {
  body #home-page .space-guide-photo, body #home-page .news-img-wrap img { transition: none; }
}
` + homeWhyUsStyles;
